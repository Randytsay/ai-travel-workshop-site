/**
 * 貼圖裁切工具 — i18n 字串與預設值
 */

export const PACK_SIZE_OPTIONS = [
  { id: '2x4', label: '2×4 = 8 張', cols: 2, rows: 4, count: 8, total: 8 },
  { id: '3x3', label: '3×3 = 9 張', cols: 3, rows: 3, count: 9, total: 9 },
  { id: '4x4', label: '4×4 = 16 張', cols: 4, rows: 4, count: 16, total: 16 },
  { id: '5x4', label: '5×4 = 20 張', cols: 5, rows: 4, count: 20, total: 20 },
] as const;

export const DEFAULT_PACK_ID = '4x4' as const;

export const LINE_STICKER_SPEC = {
  width: 370,
  height: 240,
  format: 'image/png' as const,
  maxBytes: 1024 * 1024,
};

export const TOOL_STRINGS = {
  title: '貼圖裁切工具',
  subtitle: '把 AI 生成的 4×4 母圖裁成 LINE 貼圖素材',
  // Header
  brandName: 'StickerCrop',
  brandTag: 'LINE 貼圖・4×4 裁切工具',
  // Upload
  dropTitle: '拖曳圖片到這裡',
  dropSubDesktop: '或點選下方按鈕匯入',
  dropSubMobile: '點下方按鈕從相簿匯入',
  dropButton: '選擇圖片',
  // Toggles
  toggleRmbg: '去背',
  toggleRmbgOff: '保留背景',
  toggleWatermark: '去除 Gemini 浮水印',
  toggleWatermarkOn: '已開啟',
  toggleWatermarkOff: '已關閉',
  // Pack size
  packSizeLabel: '網格設定',
  packSizeDefault: '預設 4×4',
  // Buttons
  btnAuto: '✦ 自動偵測貼圖',
  btnCrop: '✂ 手動裁切並加入',
  btnNext: '↑ 上傳下一張',
  btnReset: '↺ 重設框選',
  btnDownloadZip: '⬇ 下載 ZIP',
  btnDownloadAll: '⬇ 下載全部 PNG',
  btnClear: '✕ 清空',
  btnReload: '↺ 全部重來',
  // Control panel
  xLabel: 'X',
  yLabel: 'Y',
  wLabel: '寬',
  hLabel: '高',
  // Preview
  previewTitle: '已裁切預覽',
  previewEmpty: '尚未裁切任何圖片',
  previewCount: (n: number, max: number) => `${n} / ${max}`,
  previewFull: '已達上限',
  // Info bar
  fileLabel: '檔案',
  sizeLabel: '尺寸',
  dash: '—',
  // Manual adjustment modes
  modeAuto: '自動偵測',
  modeSingleCell: '單格微調',
  modeFreeDraw: '自由繪製',
  // Status / placeholder text
  phdr: '一次上傳一張，下一張請按「上傳下一張」',
  phdrEdit: '偵測錯誤可手動畫框裁切',
  // Lightbox
  lightboxClose: '✕ 關閉',
  // Cell labels
  deleteCell: '刪除此格',
  resetCell: '重設此格',
  redetectCell: '重新偵測此格',
  downloadCell: '下載此格 PNG',
  // BG color
  bgDetected: '偵測背景色',
  bgAutoThresh: (n: number) => `自動容差 ${n}`,
  bgClickHint: '點擊手動選色',
  // Status messages
  statusAutoDetecting: '⏳ 分析中…',
  statusPacking: '⏳ 打包中…',
  statusDownAll: (n: number) => `✓ 已下載 ZIP（${n} 張）`,
  // Toasts
  toastAutoDetected: (n: number) => `✓ 偵測到 ${n} 張`,
  toastAutoDetectedRmbg: (n: number) => `✓ 偵測到 ${n} 張（已去背）`,
  toastAutoFail: '⚠ 未偵測到貼圖，請手動框選',
  toastAutoError: (msg: string) => `❌ 偵測失敗：${msg}`,
  toastCropped: (n: number) => `✓ 已加入第 ${n} 張`,
  toastCroppedRmbg: (n: number) => `✓ 已加入第 ${n} 張（已去背）`,
  toastMaxItems: '已達上限！',
  toastCleared: '已清空所有裁切',
  toastZipError: '❌ 打包失敗',
  toastPngError: '❌ 下載失敗',
  toastDownloaded: (n: number) => `✓ 已下載 ${n} 個 PNG 檔案`,
  // Errors
  errNoImage: '請先上傳圖片',
  errInvalidImage: '圖片格式不支援',
  errImageTooLarge: (mb: number) => `圖片太大（${mb} MB），上限 20 MB`,
  errImageTooWide: (w: number, h: number) => `圖片尺寸過大（${w}×${h}），上限 8000×8000`,
  errLoadFailed: '圖片讀取失敗',
  errEmptyImage: '圖片內容空白',
  // Cell status
  cellStatusEmpty: '空白格',
  cellStatusOk: '有效',
  // Scroll hint (mobile)
  scrollHintMobile: '↓ 往下滑查看選單按鈕與裁切預覽',
};

export const TOOL_LIMITS = {
  maxItems: 32,
  maxFileBytes: 20 * 1024 * 1024,
  maxPixels: 8000,
};

export const GRID_DETECT = {
  searchRatio: 0.30, // ±30% of cell size for cut snap (tolerate AI variance)
  minCellPx: 10,
  smoothingSigma: 3,
};

export const BG_REMOVAL = {
  histogramBins: 200,
  histogramMaxDist: 200,
  bgPeakMaxBin: 50,
  bgValleySearchBins: 80,
  gaussianSigma: 2,
  threshMin: 5,
  threshMax: 60,
  cornerMarginRatio: 0.05,
  minComponentRatio: 0.0025,
  fringeAlpha: 0.25,
  opaqueAlpha: 30,
  opaqueAlphaBgSample: 128,
};

// ─── StickerCropApp 用的 STRINGS（與 TOOL_STRINGS 對應的 alias）─────────────
export const STRINGS = {
  warnUnsupportedFile: '不支援的檔案格式，請選擇圖片',
  warnImageTooBig: (mb: number) => `圖片太大（${mb.toFixed(1)} MB），上限 20 MB`,
  warnImageTooWide: '圖片尺寸過大，上限 8000×8000',
  warnNoImage: '請先上傳圖片',
  warnMaxItems: (n: number) => `已達上限 ${n} 張！`,
  warnNoDetect: '⚠ 未偵測到貼圖，請手動框選',
  warnDetectFail: (msg: string) => `❌ 偵測失敗：${msg}`,
  warnCanvasFail: '❌ 裁切失敗',
  warnEmptyPack: '❌ 沒有可下載的貼圖',
  warnZipFail: '❌ 打包失敗',
  btnAutoBusy: '⏳ 分析中…',
  zipPackaging: '⏳ 打包中…',
  addedItem: (n: number, rmbg: boolean) => `✓ 已加入第 ${n} 張${rmbg ? '（已去背）' : ''}`,
  detectedItems: (n: number, rmbg: boolean) => `✓ 偵測到 ${n} 張${rmbg ? '（已去背）' : ''}`,
  previewFull: '已達上限',
  cleared: '已清空所有裁切',
  downloaded: (n: number) => `✓ 已下載 ${n} 個檔案`,
  zipDone: (n: number) => `✓ 已下載 ZIP（${n} 張）`,
  bgColorLabel: '背景色',
  bgColorAutoThresh: (n: number) => `自動容差 ${n}`,
  bgClickHint: '點擊手動選色',
};

// ─── Aliases（讓 StickerCropApp 可用不同 import 名稱）────────────────────────
export const PACK_SIZES = PACK_SIZE_OPTIONS;
export const LINE_SPEC = LINE_STICKER_SPEC;
