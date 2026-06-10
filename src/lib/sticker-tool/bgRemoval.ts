/**
 * 背景移除模組 — 純 JS 色彩距離演算法
 * 1. 角落取樣偵測背景色
 * 2. 直方圖山谷偵測決定閾值
 * 3. 邊緣 flood-fill 標記背景
 * 4. 1px 羽化避免鋸齒
 * 5. 小元件清除
 * 6. 孔洞填補
 */

import { BG_REMOVAL } from '../../content/stickerToolConfig';
import { createCanvas } from './canvasUtils';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface BgDetectResult {
  detectedBg: RgbColor;
  autoThresh: number;
}

// 注意：原 detectBackgroundAndThreshold 已重構成下方版本（共用 detectBgFromImageData）

function gaussianSmooth1D(arr: Float32Array, sigma: number): Float32Array {
  const r = Math.round(sigma * 2);
  const N = arr.length;
  const out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let s = 0, w = 0;
    for (let j = Math.max(0, i - r); j <= Math.min(N - 1, i + r); j++) {
      const g = Math.exp((-0.5 * (i - j) * (i - j)) / (sigma * sigma));
      s += arr[j] * g;
      w += g;
    }
    out[i] = s / w;
  }
  return out;
}

/** 主要去背流程 — 直接修改傳入 canvas 的像素資料 */
export function removeBackground(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  bgColor: RgbColor,
  thresh: number,
): void {
  const imageData = ctx.getImageData(0, 0, W, H);
  const d = imageData.data;
  const orig = new Uint8ClampedArray(d);

  const { r: bgR, g: bgG, b: bgB } = bgColor;
  const t2 = thresh * thresh;

  // Build strict bg candidate mask
  const isBg = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const p = i * 4;
    if (d[p + 3] < BG_REMOVAL.opaqueAlpha) {
      isBg[i] = 1;
      continue;
    }
    const dr = d[p] - bgR, dg = d[p + 1] - bgG, db = d[p + 2] - bgB;
    isBg[i] = dr * dr + dg * dg + db * db <= t2 ? 1 : 0;
  }

  // Edge flood fill
  const removed = new Uint8Array(W * H);
  const stack: number[] = [];
  const pushBg = (x: number, y: number) => {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const i = y * W + x;
    if (removed[i] || !isBg[i]) return;
    removed[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < W; x++) {
    pushBg(x, 0);
    pushBg(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    pushBg(0, y);
    pushBg(W - 1, y);
  }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % W, y = Math.floor(i / W);
    pushBg(x - 1, y);
    pushBg(x + 1, y);
    pushBg(x, y - 1);
    pushBg(x, y + 1);
  }

  // Apply removal + 1px fringe feather
  for (let i = 0; i < W * H; i++) {
    if (removed[i]) {
      d[i * 4 + 3] = 0;
      continue;
    }
    const x = i % W, y = Math.floor(i / W);
    if (
      (x > 0 && removed[i - 1]) ||
      (x < W - 1 && removed[i + 1]) ||
      (y > 0 && removed[i - W]) ||
      (y < H - 1 && removed[i + W])
    ) {
      d[i * 4 + 3] = Math.round(d[i * 4 + 3] * BG_REMOVAL.fringeAlpha);
    }
  }

  // Clean: remove isolated small components
  const minSize = Math.max(10, Math.round(W * H * BG_REMOVAL.minComponentRatio));
  const compId = new Int32Array(W * H).fill(-1);
  const compSizes: number[] = [];
  let nextId = 0;
  for (let i = 0; i < W * H; i++) {
    if (d[i * 4 + 3] <= BG_REMOVAL.opaqueAlpha || compId[i] >= 0) continue;
    const cStack: number[] = [i];
    compId[i] = nextId;
    let sz = 0;
    while (cStack.length) {
      const ci = cStack.pop()!;
      sz++;
      const cx = ci % W, cy = Math.floor(ci / W);
      const deltas: Array<[number, number]> = [
        [cx - 1, cy],
        [cx + 1, cy],
        [cx, cy - 1],
        [cx, cy + 1],
      ];
      for (let k = 0; k < deltas.length; k++) {
        const nx = deltas[k][0];
        const ny = deltas[k][1];
        if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
        const ni = ny * W + nx;
        if (d[ni * 4 + 3] > BG_REMOVAL.opaqueAlpha && compId[ni] < 0) {
          compId[ni] = nextId;
          cStack.push(ni);
        }
      }
    }
    compSizes.push(sz);
    nextId++;
  }
  for (let i = 0; i < W * H; i++) {
    if (compId[i] >= 0 && compSizes[compId[i]] < minSize) {
      d[i * 4 + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Hole fill — restore original colors inside enclosed transparent regions
  const id2 = ctx.getImageData(0, 0, W, H);
  const d2 = id2.data;
  const isTr = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) isTr[i] = d2[i * 4 + 3] < BG_REMOVAL.opaqueAlpha ? 1 : 0;
  const edgBg = new Uint8Array(W * H);
  const hSt: number[] = [];
  const pushH = (x: number, y: number) => {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const i = y * W + x;
    if (edgBg[i] || !isTr[i]) return;
    edgBg[i] = 1;
    hSt.push(i);
  };
  for (let x = 0; x < W; x++) {
    pushH(x, 0);
    pushH(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    pushH(0, y);
    pushH(W - 1, y);
  }
  while (hSt.length) {
    const i = hSt.pop()!;
    const x = i % W, y = Math.floor(i / W);
    pushH(x - 1, y);
    pushH(x + 1, y);
    pushH(x, y - 1);
    pushH(x, y + 1);
  }
  for (let i = 0; i < W * H; i++) {
    if (!isTr[i] || edgBg[i]) continue;
    d2[i * 4] = orig[i * 4];
    d2[i * 4 + 1] = orig[i * 4 + 1];
    d2[i * 4 + 2] = orig[i * 4 + 2];
    d2[i * 4 + 3] = 255;
  }
  ctx.putImageData(id2, 0, 0);
}

/** 自動裁切到內容邊界（移除透明留白） */
export function autoTrimCanvas(
  srcCtx: CanvasRenderingContext2D,
  W: number,
  H: number,
  padPx = 2,
): HTMLCanvasElement {
  const d = srcCtx.getImageData(0, 0, W, H).data;
  let x1 = W, y1 = H, x2 = 0, y2 = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (d[(y * W + x) * 4 + 3] > 10) {
        if (x < x1) x1 = x;
        if (x > x2) x2 = x;
        if (y < y1) y1 = y;
        if (y > y2) y2 = y;
      }
    }
  }
  if (x1 > x2 || y1 > y2) return srcCtx.canvas;
  x1 = Math.max(0, x1 - padPx);
  y1 = Math.max(0, y1 - padPx);
  x2 = Math.min(W - 1, x2 + padPx);
  y2 = Math.min(H - 1, y2 + padPx);
  const nw = x2 - x1 + 1, nh = y2 - y1 + 1;
  const { canvas: out, ctx: oCtx } = createCanvas(nw, nh);
  oCtx.drawImage(srcCtx.canvas, x1, y1, nw, nh, 0, 0, nw, nh);
  return out;
}

// ─── Aliases / Wrappers for StickerCropApp ──────────────────────────────────
export type BgColor = RgbColor;

/** 別名：原 StickerCropApp 用 autoTrim() */
export const autoTrim = autoTrimCanvas;

export interface DetectBackgroundOptions {
  manual?: RgbColor | null;
}

/**
 * 內部共用：從 ImageData 直接算背景色 + 閾值（純像素運算，不依賴 Image 物件）
 */
function detectBgFromImageData(
  W: number,
  H: number,
  data: Uint8ClampedArray,
  manual: RgbColor | null,
): { bg: RgbColor; threshold: number } {
  const SAMP = Math.min(W, H, 600);
  const ssc = SAMP / Math.max(W, H);
  const sW = Math.max(1, Math.round(W * ssc));
  const sH = Math.max(1, Math.round(H * ssc));

  let detectedBg: RgbColor;
  if (manual) {
    detectedBg = manual;
  } else {
    // 角落取樣（在縮放後的座標上）
    const MARGIN = Math.max(3, Math.round(Math.min(sW, sH) * BG_REMOVAL.cornerMarginRatio));
    let rS = 0, gS = 0, bS = 0, cnt = 0;
    const corners: ReadonlyArray<readonly [number, number]> = [
      [0, 0],
      [sW - 1, 0],
      [0, sH - 1],
      [sW - 1, sH - 1],
    ];
    for (let dy = 0; dy < MARGIN; dy++) {
      for (let dx = 0; dx < MARGIN; dx++) {
        for (let k = 0; k < corners.length; k++) {
          const cx: number = corners[k][0];
          const cy: number = corners[k][1];
          const px: number = cx + (cx === 0 ? dx : -dx);
          const py: number = cy + (cy === 0 ? dy : -dy);
          // 將縮放後座標映射回原圖座標取樣
          const ox = Math.floor(px / ssc);
          const oy = Math.floor(py / ssc);
          if (ox < 0 || ox >= W || oy < 0 || oy >= H) continue;
          const p = (oy * W + ox) * 4;
          if (data[p + 3] < 128) continue;
          rS += data[p];
          gS += data[p + 1];
          bS += data[p + 2];
          cnt++;
        }
      }
    }
    if (!cnt) {
      return { bg: { r: 255, g: 255, b: 255 }, threshold: 40 };
    }
    detectedBg = {
      r: Math.round(rS / cnt),
      g: Math.round(gS / cnt),
      b: Math.round(bS / cnt),
    };
  }

  // Build distance histogram
  const BINS = BG_REMOVAL.histogramBins;
  const MAX_DIST = BG_REMOVAL.histogramMaxDist;
  const hist = new Float32Array(BINS);
  const { r: bgR, g: bgG, b: bgB } = detectedBg;
  for (let i = 0; i < W * H; i++) {
    const p = i * 4;
    if (data[p + 3] < 128) continue;
    const dr = data[p] - bgR, dg = data[p + 1] - bgG, db = data[p + 2] - bgB;
    const d = Math.sqrt(dr * dr + dg * dg + db * db);
    const bin = Math.min(BINS - 1, Math.floor((d / MAX_DIST) * BINS));
    hist[bin]++;
  }

  // Gaussian smooth
  const sm = gaussianSmooth1D(hist, BG_REMOVAL.gaussianSigma);

  // Find bg peak in first 50 bins
  let bgPeak = 0;
  for (let i = 1; i < BG_REMOVAL.bgPeakMaxBin; i++) {
    if (sm[i] > sm[bgPeak]) bgPeak = i;
  }
  let valley = bgPeak;
  for (let i = bgPeak + 1; i < Math.min(bgPeak + BG_REMOVAL.bgValleySearchBins, BINS - 1); i++) {
    if (sm[i] < sm[i - 1] && sm[i] < sm[i + 1]) {
      valley = i;
      break;
    }
  }
  const valleyDist = ((valley + 0.5) / BINS) * MAX_DIST;
  const threshold = Math.max(
    BG_REMOVAL.threshMin,
    Math.min(BG_REMOVAL.threshMax, Math.round(valleyDist)),
  );

  return { bg: detectedBg, threshold };
}

/** StickerCropApp 用的偵測介面：吃 canvas ctx，同步回 {bg, threshold} */
export function detectBackground(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  options: DetectBackgroundOptions = {},
): { bg: RgbColor; threshold: number } {
  const id = ctx.getImageData(0, 0, W, H);
  return detectBgFromImageData(W, H, id.data, options.manual ?? null);
}

/** 讓舊的 detectBackgroundAndThreshold(img, manualBg) 也走共用核心 */
export function detectBackgroundAndThreshold(
  img: HTMLImageElement,
  manualBg: RgbColor | null = null,
): BgDetectResult {
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const tmp = document.createElement('canvas');
  tmp.width = W; tmp.height = H;
  const tmpCtx = tmp.getContext('2d', { willReadFrequently: true })!;
  tmpCtx.drawImage(img, 0, 0);
  const id = tmpCtx.getImageData(0, 0, W, H);
  const { bg, threshold } = detectBgFromImageData(W, H, id.data, manualBg);
  return { detectedBg: bg, autoThresh: threshold };
}