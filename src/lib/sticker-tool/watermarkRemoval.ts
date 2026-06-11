// Gemini 浮水印移除 — Reverse Alpha Blending
// 原理：Gemini 浮水印是「固定圖案 + Alpha 透明度」疊加
// 公式：原始像素 = (浮水印後像素 - α × 浮水印原圖像素) / (1 - α)
// 參考：GargantuaX/gemini-watermark-remover (MIT)
//       davidyat.es/2026/05/29/gemini-watermark-removal/

export interface WatermarkConfig {
  logoSize: number;     // 48 或 96
  marginRight: number;  // 距右邊
  marginBottom: number; // 距下邊
}

export interface WatermarkRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** 依圖片尺寸決定浮水印設定（簡化版，覆蓋 90% 案例） */
export function detectWatermarkConfig(
  imageWidth: number,
  imageHeight: number,
): WatermarkConfig {
  // 經驗法則：雙邊都 > 1024 → 96px + 64px margin
  // 否則 → 48px + 32px margin
  if (imageWidth > 1024 && imageHeight > 1024) {
    return { logoSize: 96, marginRight: 64, marginBottom: 64 };
  }
  return { logoSize: 48, marginRight: 32, marginBottom: 32 };
}

export function getWatermarkRegion(
  imageWidth: number,
  imageHeight: number,
  config: WatermarkConfig,
): WatermarkRegion {
  return {
    x: imageWidth - config.marginRight - config.logoSize,
    y: imageHeight - config.marginBottom - config.logoSize,
    width: config.logoSize,
    height: config.logoSize,
  };
}

/**
 * 載入 Gemini 浮水印參考圖（96×96 全 alpha 版本）
 * 來源：https://github.com/GargantuaX/gemini-watermark-remover/blob/main/src/assets/bg_96.png
 * 本地路徑：/gemini-watermark.png
 */
let cachedRef: HTMLCanvasElement | null = null;
export async function loadWatermarkRef(): Promise<HTMLCanvasElement> {
  if (cachedRef) return cachedRef;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);
      cachedRef = c;
      resolve(c);
    };
    img.onerror = () => reject(new Error('無法載入浮水印參考圖'));
    img.src = '/gemini-watermark.png';
  });
}

/** 將 96×96 參考圖縮放至指定尺寸 */
function scaleRef(ref: HTMLCanvasElement, size: number): ImageData {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(ref, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function estimateRegionBackground(
  ctx: CanvasRenderingContext2D,
  imageWidth: number,
  imageHeight: number,
  region: WatermarkRegion,
): number {
  const pad = Math.max(8, Math.round(region.width * 0.2));
  const x1 = Math.max(0, region.x - pad);
  const y1 = Math.max(0, region.y - pad);
  const x2 = Math.min(imageWidth, region.x + region.width + pad);
  const y2 = Math.min(imageHeight, region.y + region.height + pad);
  const sample = ctx.getImageData(x1, y1, x2 - x1, y2 - y1).data;
  let sum = 0, count = 0;

  for (let y = 0; y < y2 - y1; y++) {
    for (let x = 0; x < x2 - x1; x++) {
      const absoluteX = x1 + x;
      const absoluteY = y1 + y;
      const insideRegion =
        absoluteX >= region.x &&
        absoluteX < region.x + region.width &&
        absoluteY >= region.y &&
        absoluteY < region.y + region.height;
      if (insideRegion) continue;
      const p = (y * (x2 - x1) + x) * 4;
      if (sample[p + 3] < 128) continue;
      sum += luminance(sample[p], sample[p + 1], sample[p + 2]);
      count++;
    }
  }

  if (!count) {
    const target = ctx.getImageData(region.x, region.y, region.width, region.height).data;
    for (let i = 0; i < region.width * region.height; i++) {
      const p = i * 4;
      if (target[p + 3] < 128) continue;
      sum += luminance(target[p], target[p + 1], target[p + 2]);
      count++;
    }
  }

  return count ? sum / count : 255;
}

/** 偵測預期位置是否有 Gemini 星號浮水印 */
export async function detectWatermarkPresence(
  ctx: CanvasRenderingContext2D,
  imageWidth: number,
  imageHeight: number,
  refCanvas?: HTMLCanvasElement,
): Promise<boolean> {
  const config = detectWatermarkConfig(imageWidth, imageHeight);
  const region = getWatermarkRegion(imageWidth, imageHeight, config);
  if (region.x < 0 || region.y < 0 ||
      region.x + region.width > imageWidth ||
      region.y + region.height > imageHeight) {
    return false;
  }

  const ref = refCanvas ?? await loadWatermarkRef();
  const refData = ref.width === config.logoSize
    ? ref.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, ref.width, ref.height)
    : scaleRef(ref, config.logoSize);
  const target = ctx.getImageData(region.x, region.y, region.width, region.height).data;
  const rd = refData.data;
  const bgLum = estimateRegionBackground(ctx, imageWidth, imageHeight, region);

  let weightedLift = 0;
  let alphaWeight = 0;
  let brightMatches = 0;
  let alphaPixels = 0;

  for (let i = 0; i < region.width * region.height; i++) {
    const p = i * 4;
    const a = rd[p + 3] / 255;
    if (a < 0.08 || target[p + 3] < 128) continue;
    const lift = luminance(target[p], target[p + 1], target[p + 2]) - bgLum;
    weightedLift += lift * a;
    alphaWeight += a;
    alphaPixels++;
    if (lift > 6) brightMatches++;
  }

  if (!alphaWeight || !alphaPixels) return false;
  const avgLift = weightedLift / alphaWeight;
  const matchRatio = brightMatches / alphaPixels;
  return avgLift > 7 && matchRatio > 0.18;
}

/** 在指定 ctx 區域上套用 reverse alpha blending */
export async function removeWatermark(
  ctx: CanvasRenderingContext2D,
  imageWidth: number,
  imageHeight: number,
  refCanvas?: HTMLCanvasElement,
): Promise<boolean> {
  const config = detectWatermarkConfig(imageWidth, imageHeight);
  const region = getWatermarkRegion(imageWidth, imageHeight, config);
  if (region.x < 0 || region.y < 0 ||
      region.x + region.width > imageWidth ||
      region.y + region.height > imageHeight) {
    return false;
  }

  const ref = refCanvas ?? await loadWatermarkRef();
  // 取得對應尺寸的 alpha map
  const refData = ref.width === config.logoSize
    ? ref.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, ref.width, ref.height)
    : scaleRef(ref, config.logoSize);

  const w = config.logoSize, h = config.logoSize;
  const target = ctx.getImageData(region.x, region.y, w, h);
  const td = target.data;
  const rd = refData.data;

  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    // Reverse alpha: original = (watermarked - alpha*ref) / (1 - alpha)
    // ref 的 RGB 是純白星號，alpha 決定混合程度
    const aR = rd[p + 3] / 255;     // 參考的 R 通道 alpha
    const aG = rd[p + 3] / 255;     // （假設 RGBA alpha 相同）
    const aB = rd[p + 3] / 255;
    const refR = rd[p];
    const refG = rd[p + 1];
    const refB = rd[p + 2];

    if (aR > 0 && aR < 1) {
      td[p]     = Math.max(0, Math.min(255, Math.round((td[p]     - aR * refR) / (1 - aR))));
      td[p + 1] = Math.max(0, Math.min(255, Math.round((td[p + 1] - aG * refG) / (1 - aG))));
      td[p + 2] = Math.max(0, Math.min(255, Math.round((td[p + 2] - aB * refB) / (1 - aB))));
      // alpha 保持不變
    } else if (aR === 0) {
      // 純透明，原樣保留
    } else {
      // aR === 1，浮水印完全覆蓋此像素 → 視為不透明星號
      // 無法還原，設為透明（讓背景偵測後填補）
      td[p + 3] = 0;
    }
  }
  ctx.putImageData(target, region.x, region.y);
  return true;
}
