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

interface Bounds {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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

  const bounds = findContentBounds(fg, W, H, cols, rows);
  const workW = bounds.x2 - bounds.x1 + 1;
  const workH = bounds.y2 - bounds.y1 + 1;
  if (workW <= GRID_DETECT.minCellPx || workH <= GRID_DETECT.minCellPx) {
    return [];
  }

  // Row projection
  const rowProj = new Float32Array(workH);
  for (let y = 0; y < workH; y++) {
    let s = 0;
    for (let x = bounds.x1; x <= bounds.x2; x++) s += fg[(bounds.y1 + y) * W + x];
    rowProj[y] = s / workW;
  }
  const rowCuts = findCuts(rowProj, workH, rows).map(y => y + bounds.y1);

  // Per-row band column projection
  const rects: CellRect[] = [];
  for (let ri = 0; ri < rows; ri++) {
    const y1 = rowCuts[ri];
    const y2 = rowCuts[ri + 1];
    const bandH = y2 - y1;
    if (bandH <= 0) continue;
    const colProj = new Float32Array(workW);
    for (let x = 0; x < workW; x++) {
      let s = 0;
      for (let y = y1; y < y2; y++) s += fg[y * W + bounds.x1 + x];
      colProj[x] = s / bandH;
    }
    const colCuts = findCuts(colProj, workW, cols).map(x => x + bounds.x1);
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

function findContentBounds(fg: Float32Array, W: number, H: number, cols: number, rows: number): Bounds {
  const rowProj = new Float32Array(H);
  const colProj = new Float32Array(W);

  for (let y = 0; y < H; y++) {
    let s = 0;
    for (let x = 0; x < W; x++) {
      const v = fg[y * W + x];
      s += v;
      colProj[x] += v;
    }
    rowProj[y] = s / W;
  }
  for (let x = 0; x < W; x++) colProj[x] /= H;

  const rowMax = Math.max(...rowProj);
  const colMax = Math.max(...colProj);
  if (rowMax <= 0 || colMax <= 0) return { x1: 0, y1: 0, x2: W - 1, y2: H - 1 };

  // 調降閥值（降到 3% 與 0.005），讓對邊緣字體、細小裝飾的偵測極為敏銳，不把文字當作背景過濾
  const rowThreshold = Math.max(0.005, rowMax * 0.03);
  const colThreshold = Math.max(0.005, colMax * 0.03);
  let y1 = 0, y2 = H - 1, x1 = 0, x2 = W - 1;
  while (y1 < H && rowProj[y1] < rowThreshold) y1++;
  while (y2 > y1 && rowProj[y2] < rowThreshold) y2--;
  while (x1 < W && colProj[x1] < colThreshold) x1++;
  while (x2 > x1 && colProj[x2] < colThreshold) x2--;

  const minW = cols * GRID_DETECT.minCellPx;
  const minH = rows * GRID_DETECT.minCellPx;
  if (x2 - x1 + 1 < minW || y2 - y1 + 1 < minH) {
    return { x1: 0, y1: 0, x2: W - 1, y2: H - 1 };
  }

  // 增加邊界留白緩衝（改為 3% 並外加 12px 固定邊距），防止切割網格貼得太死切到文字
  const padX = Math.round((x2 - x1 + 1) * 0.03) + 12;
  const padY = Math.round((y2 - y1 + 1) * 0.03) + 12;
  return {
    x1: Math.max(0, x1 - padX),
    y1: Math.max(0, y1 - padY),
    x2: Math.min(W - 1, x2 + padX),
    y2: Math.min(H - 1, y2 + padY),
  };
}

// ─── Aliases for StickerCropApp ──────────────────────────────────────────────
export type Rect = CellRect;
