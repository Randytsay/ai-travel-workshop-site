// ZIP 打包 & 批次下載
// 使用 JSZip（從 CDN 載入）

declare global {
  interface Window { JSZip: any; }
}

let jszipLoading: Promise<void> | null = null;

/** 載入 JSZip CDN（保證只載一次） */
export function loadJSZip(): Promise<void> {
  if (typeof window.JSZip !== 'undefined') return Promise.resolve();
  if (jszipLoading) return jszipLoading;
  jszipLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('JSZip 載入失敗'));
    document.head.appendChild(s);
  });
  return jszipLoading;
}

export interface ZipItem {
  name: string;
  dataUrl: string;
}

/** 打包成 ZIP Blob */
export async function buildZip(items: ZipItem[]): Promise<Blob> {
  await loadJSZip();
  const zip = new window.JSZip();
  const folder = zip.folder('LineSticker');
  for (const it of items) {
    const raw = dataUrlToUint8(it.dataUrl);
    folder.file(it.name, raw);
  }
  return zip.generateAsync({ type: 'blob', compression: 'STORE' });
}

function dataUrlToUint8(dataUrl: string): Uint8Array {
  const raw = atob(dataUrl.split(',')[1]);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

/** 觸發瀏覽器下載 */
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

/** 批次觸發多檔下載（瀏覽器會依序彈出，間隔 200ms 避擋） */
export async function downloadAllPng(items: ZipItem[]): Promise<void> {
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const blob = await (await fetch(it.dataUrl)).blob();
    triggerDownload(blob, it.name);
    if (i < items.length - 1) {
      await new Promise(r => setTimeout(r, 250));
    }
  }
}
