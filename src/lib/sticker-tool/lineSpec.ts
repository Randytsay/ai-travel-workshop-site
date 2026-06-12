/**
 * LINE 貼圖規格輸出
 * - 自動 trim 留白（透明邊）
 * - 縮放到 370×240
 * - 若原圖小於目標則放大（保持比例 + 透明 padding）
 * - 保持透明背景
 */

import { LINE_STICKER_SPEC } from '../../content/stickerToolConfig';
import { autoTrimCanvas, removeBackground, type RgbColor } from './bgRemoval';
import { createCanvas } from './canvasUtils';

export interface OutputResult {
  canvas: HTMLCanvasElement;
  wasUpscaled: boolean;
  originalSize: { w: number; h: number };
}

export interface FitOptions {
  trim?: boolean;
}

/** StickerCropApp 用的介面：吃 canvas + 選項，回傳結果 */
export function fitToLineSpec(
  src: HTMLCanvasElement,
  _options: FitOptions = {},
): OutputResult {
  return normalizeToLineSpec(src);
}

/** 把任意 canvas 轉成 LINE 規格：trim + resize + 透明背景填補 */
export function normalizeToLineSpec(
  srcCanvas: HTMLCanvasElement,
  _bgColor?: RgbColor,
): OutputResult {
  // Step 1: trim transparent edges (always, to clean up before resize)
  const { ctx: srcCtx } = { ctx: srcCanvas.getContext('2d')! };
  let trimmedCanvas: HTMLCanvasElement;
  try {
    trimmedCanvas = autoTrimCanvas(srcCtx, srcCanvas.width, srcCanvas.height, 2);
  } catch {
    trimmedCanvas = srcCanvas;
  }

  const tw = trimmedCanvas.width;
  const th = trimmedCanvas.height;
  const targetW = LINE_STICKER_SPEC.width;
  const targetH = LINE_STICKER_SPEC.height;

  // Step 2: scale to fit within 370×240 (preserve aspect, don't crop)
  const scale = Math.min(targetW / tw, targetH / th, 1);
  const wasUpscaled = scale > 1; // we never upscale — we only fit (so wasUpscaled = false)
  // But we DO need to render at some size. For LINE spec, fit-and-center is best.
  const scaledW = Math.round(tw * scale);
  const scaledH = Math.round(th * scale);

  // Step 3: create 370×240 canvas with transparent bg, paste centered
  const { canvas: out, ctx: oCtx } = createCanvas(targetW, targetH);
  const offX = Math.floor((targetW - scaledW) / 2);
  const offY = Math.floor((targetH - scaledH) / 2);
  oCtx.imageSmoothingEnabled = true;
  oCtx.imageSmoothingQuality = 'high';
  oCtx.drawImage(trimmedCanvas, offX, offY, scaledW, scaledH);

  return {
    canvas: out,
    wasUpscaled,
    originalSize: { w: tw, h: th },
  };
}

export function cropAndNormalize(
  img: HTMLImageElement,
  rect: { x: number; y: number; w: number; h: number },
  enableRmbg: boolean,
  bgColor: RgbColor,
  thresh: number,
): { canvas: HTMLCanvasElement; wasTrimmed: boolean } {
  // 擴展單格裁剪邊界（往外擴張 16px）。去背時，多餘的鄰格背景像素會被去背清除，
  // 但原本因為超出切割線而被截斷的字體，會因為這 16px 的緩衝而被完美保留！
  const pad = enableRmbg ? 16 : 0;
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const x1 = Math.max(0, rect.x - pad);
  const y1 = Math.max(0, rect.y - pad);
  const x2 = Math.min(imgW, rect.x + rect.w + pad);
  const y2 = Math.min(imgH, rect.y + rect.h + pad);
  const cw = x2 - x1;
  const ch = y2 - y1;

  const { canvas: off, ctx: offCtx } = createCanvas(cw, ch);
  offCtx.drawImage(img, x1, y1, cw, ch, 0, 0, cw, ch);

  if (enableRmbg) {
    removeBackground(offCtx, cw, ch, bgColor, thresh);
    const trimmed = autoTrimCanvas(offCtx, cw, ch, 2);
    const result = normalizeToLineSpec(trimmed, bgColor);
    return { canvas: result.canvas, wasTrimmed: true };
  } else {
    const result = normalizeToLineSpec(off);
    return { canvas: result.canvas, wasTrimmed: false };
  }
}
