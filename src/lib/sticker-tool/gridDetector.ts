/**
 * N×M 網格自動偵測
 * 1. 行/列投影
 * 2. 高斯平滑
 * 3. 在每個等分點 ±30% 範圍內找局部最低
 */

import { createCanvas } from './canvasUtils';
import type { RgbColor } from './bgRemoval';
import { GRID_DETECT } from '../../content/stickerToolConfig';

export interface CellRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function smooth1D(arr: Float32Array, sigma: number): Float32Array {
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

/** 找 N 等分的 (N-1) 個切割線 */
function findCuts(proj: Float32Array, N: number, divisions: number): number[] {
  const sm = smooth1D(proj, GRID_DETECT.smoothingSigma);
  const iw = N / divisions;
  const search = Math.round(iw * GRID_DETECT.searchRatio);
  const cuts: number[] = [0];
  for (let c = 1; c < divisions; c++) {
    const ideal = Math.round(c * iw);
    const lo = Math.max(0, ideal - search);
    const hi = Math.min(N, ideal + search);
    let minVal = Infinity;
    let minIdx = ideal;
    for (let x = lo; x < hi; x++) {
      if (sm[x] < minVal) {
        minVal = sm[x];
        minIdx = x;
      }
    }
    cuts.push(minIdx);
  }
  cuts.push(N);
  return cuts;
}

/** 主函式：自動偵測 N×M 網格 */
export function autoDetectGrid(
  img: HTMLImageElement,
  bg: RgbColor,
  thresh: number,
  cols: number,
  rows: number,
): CellRect[] {
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const { ctx: imgCtx } = createCanvas(W, H);
  imgCtx.drawImage(img, 0, 0, W, H);
  const data = imgCtx.getImageData(0, 0, W, H).data;
  return detectGridFromData(W, H, data, bg, thresh, cols, rows);
}

/**
 * 從 ImageData 直接做網格偵測（StickerCropApp 用的介面）
 */
export function detectGrid(
  data: ImageData | Uint8ClampedArray,
  bg: RgbColor,
  thresh: number,
  cols: number,
  rows: number,
): CellRect[] {
  const bytes = data instanceof Uint8ClampedArray ? data : data.data;
  // 我們需要寬高 — 從 ImageData 取
  const W = data instanceof Uint8ClampedArray ? 0 : (data as ImageData).width;
  const H = data instanceof Uint8ClampedArray ? 0 : (data as ImageData).height;
  if (!W || !H) {
    throw new Error('detectGrid: 必須傳入 ImageData 才能取得尺寸');
  }
  return detectGridFromData(W, H, bytes, bg, thresh, cols, rows);
}

function detectGridFromData(
  W: number,
  H: number,
  data: Uint8ClampedArray,
  bg: RgbColor,
  thresh: number,
  cols: number,
  rows: number,
): CellRect[] {
  // Build fg mask
  const fg = new Float32Array(W * H);
  const t2 = thresh * thresh;
  for (let i = 0; i < W * H; i++) {
    const p = i * 4;
    if (data[p + 3] < 128) continue;
    const dr = data[p] - bg.r, dg = data[p + 1] - bg.g, db = data[p + 2] - bg.b;
    fg[i] = dr * dr + dg * dg + db * db > t2 ? 1 : 0;
  }

  // Row projection
  const rowProj = new Float32Array(H);
  for (let y = 0; y < H; y++) {
    let s = 0;
    for (let x = 0; x < W; x++) s += fg[y * W + x];
    rowProj[y] = s / W;
  }
  const rowCuts = findCuts(rowProj, H, rows);

  // Per-row band column projection
  const rects: CellRect[] = [];
  for (let ri = 0; ri < rows; ri++) {
    const y1 = rowCuts[ri];
    const y2 = rowCuts[ri + 1];
    const bandH = y2 - y1;
    if (bandH <= 0) continue;
    const colProj = new Float32Array(W);
    for (let x = 0; x < W; x++) {
      let s = 0;
      for (let y = y1; y < y2; y++) s += fg[y * W + x];
      colProj[x] = s / bandH;
    }
    const colCuts = findCuts(colProj, W, cols);
    for (let ci = 0; ci < cols; ci++) {
      const x1 = colCuts[ci];
      const x2 = colCuts[ci + 1];
      if (x2 - x1 > GRID_DETECT.minCellPx && y2 - y1 > GRID_DETECT.minCellPx) {
        rects.push({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });
      }
    }
  }
  rects.sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));
  return rects;
}

// ─── Aliases for StickerCropApp ──────────────────────────────────────────────
export type Rect = CellRect;
