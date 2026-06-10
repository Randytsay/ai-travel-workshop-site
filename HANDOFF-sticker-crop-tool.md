# 貼圖裁切工具 — 完整交接文件

> 給接手開發的 AI Agent。請從頭讀到尾，所有決策、已完成項目、未完成項目、演算法細節、踩過的坑都在這裡。

---

## 0. 用戶與專案背景

- **用戶**：Randy Tsai（台灣，視覺偏好 pastel 粉彩、簡潔溝通）
- **原始對話來源**：Telegram
- **用途**：教學工具 — Randy 教同學用 Gemini 生成 4×4 LINE 貼圖母圖，這個工具把母圖自動切成 16 張 LINE 規格 PNG，讓學生打包去上架
- **目標網站**：`ai-travel-workshop-site`（位於 `github.com/Randytsay/ai-travel-workshop-site`）
  - **技術棧**：Astro 5.8 + TypeScript（嚴格模式，`verbatimModuleSyntax`）
  - **設計系統**：珊瑚橘 (`--sunset`/`--coral`) + 天空藍 (`--ocean`/`--sky`) + 奶油白 (`--sand`/`--cream`) + 夜色 (`--night`) + 棕櫚綠 (`--palm`)、芒果 (`--mango`)
  - **Mobile-first**，360px 最小寬度
  - **設計來源**：`src/styles/theme.css`（已有 CSS 變數，直接用）
- **導覽**：已內建 `/sticker-crop-tool`（navigation.ts 第 13 行）— 不用改

---

## 1. 參考資源（必讀）

| 用途 | 連結 |
|------|------|
| 原始工具 | https://github.com/cidercoder/Crop-tool-rmbg （單一 `index.html`，1080 行 vanilla JS） |
| 原始工具 demo | https://cidercoder.github.io/Crop-tool-rmbg/ |
| Gemini 浮水印移除實作 | https://github.com/GargantuaX/gemini-watermark-remover |
| Gemini 浮水印演算法教學 | https://davidyat.es/2026/05/29/gemini-watermark-removal |
| LINE 貼圖規格（含尺寸） | https://davidyat.es ... 2026/05/29/gemini-watermark-removal（內含 catalog 表格） |
| 原始工具本地備份 | `/tmp/crop-tool.html`（46KB，我下載過） |
| 開源實作備份 | `/tmp/gemini-watermark-remover/`（我 clone 過） |

---

## 2. 最終確定規格（討論完成共識）

### 2.1 頁面
- **路徑**：`/sticker-crop-tool`（獨立頁面，**不是**章節嵌入）
- **navigation.ts 已內建**（不用改）
- **頁面結構**：Hero + 工具 + 步驟說明 + FAQ

### 2.2 切割控制
- **3 層微調模式**（自動 / 單格微調 / 自由繪製）— **❌ 未實作**
- 當前只有 **第 1 層：自動偵測（4×4）+ 手動拖框 + X/Y/W/H 數字微調**

### 2.3 網格設定
- **4 個選項按鈕**（固定）：2×4=8、3×3=9、4×4=16、5×4=20
- **預設**：4×4

### 2.4 輸出規格
- **每張 PNG**：370×240（**非 1:1**，這是 LINE 主圖規格）
- **格式**：PNG，背景透明
- **單檔上限**：1 MB（LINE 上架限制）
- **檔名**：`{原檔名}_sticker{NN}.png`（NN 從 01 起，2 位數）
- **ZIP 檔名**：`line_stickers_{packId}_{YYYY-MM-DD}.zip`（含日期）
- **ZIP 結構**：`{zip}/LineSticker/{檔名}.png`（有些實作沒建子資料夾，確認一下 StickerCropApp 的 zipExport.ts）

### 2.5 演算法
- **去背**：純 JS 色彩距離（角落取樣 + 直方圖山谷 + flood-fill + 1px 羽化 + 小元件清除 + 孔洞填補）
- **去浮水印**：Reverse Alpha Blending（無損）
- **自動偵測**：行/列投影 + 高斯平滑 + ±30% 容差（容忍 AI 偏差）
- **3D 容忍**：✓

### 2.6 浮水印規則（已驗證）
- 位置：圖片**右下角**
- 大小：依圖片尺寸
  - W ≤ 1024 或 H ≤ 1024：**48×48** px，邊距 **32px**
  - W > 1024 且 H > 1024：**96×96** px，邊距 **64px**
- 例外：2816×1536 用 96×96 邊距 192px（罕見）
- 完整 catalog 在 `GargantuaX/gemini-watermark-remover/src/core/geminiSizeCatalog.js`

### 2.7 互動功能
- **拖曳/選檔上傳**（桌機）
- **手機自動切換**為「從相簿選擇」（UA 偵測 iOS/Android）
- **Drag-drop 視覺提示**（邊框變紫）
- **去背 toggle**（預設開）
- **去浮水印 toggle**（預設開，**即時重處理**）
- **背景色自動偵測** + **手動選色**（點 swatch 開 color picker）
- **每張縮圖**：hover 顯示 ⬇ 下載 + ✕ 刪除
- **Lightbox**：點縮圖放大，下載/刪除/關閉
- **下載全部 PNG**：16 個獨立檔觸發瀏覽器下載
- **下載 ZIP**：打包全部

### 2.8 批次策略
- 學生做完一組（4×4 母圖 → 16 張）→ 下載 → 清空 → 換下一組母圖
- **不做**：IndexedDB 持久化（重新整理會清空）

### 2.9 不做（明確排除）
- AI 去背（純 JS 演算法即可）
- 自訂網格大小（只用 4 個固定選項）
- 主圖 240×240 生成（學生用手機 LINE 貼圖 APP 加）
- Tab icon 96×74 生成（同上）
- IndexedDB 持久化
- 登入/分享/session

### 2.10 i18n
- **全中文化**：所有 UI、按鈕、toast、警告、錯誤訊息
- 字串集中在 `src/content/stickerToolConfig.ts` 的 `STRINGS` 物件

---

## 3. 檔案結構

### 3.1 新增檔案（11 個）

```
src/
├── lib/sticker-tool/
│   ├── bgRemoval.ts         355 行  直方圖偵測 + flood-fill + 羽化 + 孔洞
│   ├── canvasUtils.ts        90 行  共用 canvas 工具
│   ├── gridDetector.ts      150 行  N×M 自動偵測
│   ├── lineSpec.ts           92 行  trim + 縮放 370×240
│   ├── watermarkRemoval.ts  134 行  Reverse Alpha Blending
│   └── zipExport.ts          67 行  JSZip + 批次下載
├── components/sticker-tool/
│   └── StickerCropApp.astro 799 行  主元件（HTML + script）
├── pages/
│   └── sticker-crop-tool.astro 78 行  頁面 wrapper
├── styles/
│   └── sticker-tool.css     611 行  工具樣式（沿用 theme.css 變數）
└── content/
    └── stickerToolConfig.ts 166 行  i18n + 預設值

public/
└── gemini-watermark.png    8.2KB   96×96 浮水印參考（從開源 repo 拿）
```

### 3.2 不用改的檔案
- `src/content/navigation.ts`（已內建 `/sticker-crop-tool`）
- `src/components/navigation/DesktopSidebar.astro`（已自動渲染）
- `src/components/navigation/MobileBottomNav.astro`（已自動渲染）
- `src/styles/theme.css`（直接用 CSS 變數）
- `docs/`（規格文件，source of truth，不要改）

---

## 4. 已實作功能（✅ 13 / 16）

| # | 功能 | 實作位置 | 備註 |
|---|------|---------|------|
| 1 | 拖曳/選檔/手機相簿上傳 | `StickerCropApp.astro` L271-302 | |
| 2 | 響應式 canvas | `StickerCropApp.astro` L405-431 | 手機直橫切換 |
| 3 | X/Y/W/H 數字 + 拖框 + 4 角 marker | `StickerCropApp.astro` L440-503 | |
| 4 | 去背 toggle + 純 JS 演算法 | `bgRemoval.ts` + L255-260 | 預設開 |
| 5 | 浮水印 toggle + 即時重處理 | `watermarkRemoval.ts` + L262-268 | 預設開 |
| 6 | Pack size 4 按鈕 | `StickerCropApp.astro` L22-28 + L235-248 | 預設 4×4 |
| 7 | N×M 自動偵測（±30% 容差） | `gridDetector.ts` | |
| 8 | 自動偵測 + 手動拖框裁切 | `StickerCropApp.astro` L568-629 | |
| 9 | 個別 PNG 下載（每張縮圖 ⬇） | `StickerCropApp.astro` L679-683 | |
| 10 | 下載全部 PNG（16 獨立檔） | `StickerCropApp.astro` L770-782 + `zipExport.ts` | |
| 11 | 下載 ZIP（含 LineSticker/ 資料夾） | `StickerCropApp.astro` L753-768 | 含日期 |
| 12 | Lightbox 預覽 + 刪除/下載 | `StickerCropApp.astro` L737-750 | |
| 13 | 背景色偵測 + 顯示 + 手動選色 | `bgRemoval.ts` + L375-402 | 點 swatch 換色 |
| 14 | 錯誤訊息全中文化 | `stickerToolConfig.ts` STRINGS | toast / 警告 |
| 15 | Mobile-first RWD（360px） | `sticker-tool.css` L579-611 | |
| 16 | ZIP 檔名含日期 | `StickerCropApp.astro` L759-760 | `line_stickers_4x4_2026-06-10.zip` |

---

## 5. 未實作（❌ 接手必補）

### 5.1 3 層微調模式（最高優先）

| 模式 | 當前狀態 | 需新增 |
|------|---------|--------|
| **第 1 層：自動偵測** | ✅ 已做 | — |
| **第 2 層：單格微調** | ❌ 沒做 | 點任一偵測格 → 顯示 4 角 + 4 邊 handles → 拖曳調整單格 |
| **第 3 層：自由繪製** | ❌ 沒做 | 點 4 角畫一個 cell，重複 N 次 |
| **切割線拖曳** | ❌ 沒做 | 拖 3 條橫線 + 3 條直線（會連動 4 格） |

**實作建議**：
- 加一個 mode 切換工具列：「自動 / 單格 / 自由」
- 單格微調：點擊偵測格 → 高亮 → 畫 8 個 handles → mousedown/move/up 拖曳 → 寫回 `cells[i]`
- 自由繪製：模式切到「自由」→ 等使用者點 4 下（4 角）→ push 一個 cell
- 切割線拖曳：在 main canvas 畫 2 條水平 + 2 條垂直（4 條，分 3 格），拖曳時動態重算 16 個 cell
- 詳見原始工具 `/tmp/crop-tool.html` 內的 drag line / corner handle 實作

### 5.2 浮水印「智慧跳過重疊」邏輯
- **狀態**：**不需要做**（用戶確認 Reverse Alpha Blending 完美還原，無需跳過）
- 接手 Agent 不要畫蛇添足

### 5.3 進度條
- **狀態**：**沒做**（當前只有 button 內的 ⏳ 文字）
- 用戶沒要求，不一定要做

### 5.4 浮水印自動偵測「有/無」
- **狀態**：**沒做**（永遠執行）
- 進階優化：先偵測該位置是否有浮水印（用戶上傳非 Gemini 圖時不執行）
- 不影響功能，可選

---

## 6. 演算法細節（接手必讀）

### 6.1 去背 — `bgRemoval.ts`

**核心流程**：
1. **角落取樣**：取圖片 4 角 ±5% margin 的像素平均值
2. **直方圖山谷偵測**：算每個像素到 bg color 的距離，建 200 bin 直方圖，高斯平滑，找第一個 peak 之後的第一個 valley
3. **閾值**：valley 位置 = 色彩距離閾值（5-60 範圍）
4. **嚴格 bg mask**：像素到 bg color 距離 < 閾值² 視為候選 bg
5. **邊緣 flood-fill**：從圖片 4 邊開始，只標記「從邊緣連通」的 bg（避免主體內部同色被誤刪）
6. **1px fringe 羽化**：被刪除區域相鄰的像素 alpha 降至 25%（避免硬邊）
7. **小元件清除**：所有連通元件 < 0.25% 總像素則刪除（清掉殘影）
8. **孔洞填補**：再次 flood-fill 找「沒連到邊緣的透明區」，恢復原色（避免主體內洞）

**關鍵設定**（在 `stickerToolConfig.ts` BG_REMOVAL）：
- `opaqueAlpha: 30`（alpha 閾值）
- `fringeAlpha: 0.25`（羽化強度）
- `minComponentRatio: 0.0025`（小元件 0.25%）
- `histogramBins: 200`、`histogramMaxDist: 200`

### 6.2 浮水印移除 — `watermarkRemoval.ts`

**核心**：Reverse Alpha Blending
```
original = (watermarked - α × 255) / (1 - α)
```

**步驟**：
1. 偵測圖片尺寸 → 決定浮水印大小（48 或 96）
2. 從 `/gemini-watermark.png`（96×96）載入 reference alpha map
3. 計算浮水印位置：`(W - 64 - 96, H - 64 - 96)` 或 `(W - 32 - 48, H - 32 - 48)`
4. 對每個像素：取對應 alpha、套用反算公式
5. 寫回 canvas

**Alpha map 來源**：bundled in `public/gemini-watermark.png`（從 `GargantuaX/src/assets/bg_96.png` 拿）

### 6.3 自動偵測網格 — `gridDetector.ts`

**核心**：行/列投影 + 局部最低
1. **fg mask**：每像素算到 bg color 距離，超過閾值 = 前景
2. **行投影**：每行 fg 像素數 / 寬度
3. **高斯平滑**（sigma=3）
4. **找切割線**：N 等分基準（4×4 = 3 條橫線 + 3 條直線）
5. **±30% 容差**：在基準點 ±30% 範圍內找平滑後的最低點
6. **輸出**：4 個 row band × 各 4 個 col cut = 最多 16 個 CellRect

**關鍵設定**：
- `searchRatio: 0.30`（±30%）
- `minCellPx: 10`（太小視為無效）
- `smoothingSigma: 3`

### 6.4 輸出到 LINE 規格 — `lineSpec.ts`

**流程**：
1. trim 透明留白（2px padding）
2. 計算縮放：取寬高比的 min，限制 ≤ 1（不放大，避免模糊）
3. 縮放後貼到 370×240 透明 canvas 中心
4. 輸出 PNG

**重要決策**：
- **不放大**：原圖小於 370×240 時，**不放大**（避免模糊），貼在中央
- **不裁切**：保留完整比例

---

## 7. 接手 Agent 必須知道的坑

### 7.1 TypeScript 配置
- `tsconfig.json` 繼承 `astro/tsconfigs/strict`，**啟用 `verbatimModuleSyntax`**
- **type 必須用 `import type`**：
  ```ts
  import type { RgbColor } from './bgRemoval';
  // 不能寫：
  import { RgbColor } from './bgRemoval';
  ```
- Linter 報 stale errors 是常態，**用 `npm run check` 為準**

### 7.2 import 名稱 alias
StickerCropApp.astro 用簡短名稱，lib 檔提供 alias：
| StickerCropApp 用 | lib 實際提供 |
|---|---|
| `PACK_SIZES` | `PACK_SIZE_OPTIONS` |
| `LINE_SPEC` | `LINE_STICKER_SPEC` |
| `STRINGS` | `TOOL_STRINGS`（不同結構！）+ 自有 STRINGS |
| `detectBackground(ctx, w, h, opts)` | `detectBackground` wrapper |
| `autoTrim` | `autoTrimCanvas` |
| `BgColor` | `RgbColor`（type alias）|
| `detectGrid(ImageData, ...)` | `autoDetectGrid`（吃 img）+ `detectGrid`（吃 ImageData）|
| `Rect` | `CellRect` |
| `fitToLineSpec` | `normalizeToLineSpec` + `fitToLineSpec` wrapper |

**未來改名**：建議改 lib 檔為 StickerCropApp 用的名稱，把 `TOOL_STRINGS` 併入 `STRINGS`，移除 alias 層。

### 7.3 Astro 環境
- `<script>` 區塊**在 client side 跑**（不會在 SSR 跑）
- 不用擔心 SSR 對 `document` 的抱怨
- CSS 用 `import '../../styles/sticker-tool.css'`

### 7.4 已知 bug 已修
- ~~StickerCropApp.astro:518 `$('id')` → `$(id)`~~ ✅ 已修
- ~~`activePack` 型別太窄~~ ✅ 已加 `type PackSize`

### 7.5 Build / Test 指令
```bash
cd ai-travel-workshop-site
npm install           # 第一次
npm run check         # TypeScript check（0 errors, 0 warnings）
npm run build         # Build 13 pages
npm run dev           # 開發伺服器 localhost:4321
```

### 7.6 浮水印 reference 載入
- `public/gemini-watermark.png`（96×96）→ 自動服務於 `/gemini-watermark.png`
- 不要移到 `src/assets/`（會被 Vite 處理路徑，麻煩）
- 要 48×48 版本時複製 `GargantuaX/src/assets/bg_48.png` 並更新載入路徑

---

## 8. 接手 SOP

### 8.1 驗證現有版本
1. `cd /tmp/ai-travel-workshop-site`（或從 Randy 自己的 repo clone）
2. `npm install`
3. `npm run check` → 期待 0 errors
4. `npm run build` → 期待 13 pages built
5. `npm run dev` → 開 `http://localhost:4321/sticker-crop-tool`
6. 測試流程：
   - 上傳 1 張 4×4 圖（1024×1024 以上測 96px 浮水印、512×512 測 48px 浮水印）
   - 按「自動偵測」→ 預覽出現 16 格
   - 切浮水印 toggle 開/關 → 預覽即時改變
   - 按「下載 ZIP」→ 下載檔
   - 解壓 → 確認 16 張 370×240 PNG
7. 桌機 + 360px 手機寬度各測一次

### 8.2 補 3 層微調模式

**優先順序**：
1. 切割線拖曳（最直覺，3 條橫 + 3 條直）
2. 單格微調（進階，4 角 + 4 邊 handles）
3. 自由繪製（救援，4 角點擊）

**建議架構**：
- 加 `mode` state：`'auto' | 'single' | 'free'`
- 加 mode 切換 UI（toolbar 三選一按鈕）
- 重新設計 `autoDetect` 後的 overlay：
  - auto 模式：顯示 16 格 + 切割線（線可拖）
  - single 模式：點任一格 → 該格高亮 + 8 個 handles
  - free 模式：等待 4 次點擊畫一個 cell

**參考原始實作**：
- `/tmp/crop-tool.html` 有完整 free-draw 4 角邏輯
- 原站主要是 auto + 手動拖框，沒有 3 層

### 8.3 Commit 進 Randy 的 repo

```bash
cd ~/your/path/to/ai-travel-workshop-site
# 確認 navigation.ts 第 13 行已有 sticker-crop-tool（已內建）
# 複製以下檔案：
cp -r src/lib/sticker-tool/ ./
mkdir -p src/components/sticker-tool
cp src/components/sticker-tool/StickerCropApp.astro ./
cp src/pages/sticker-crop-tool.astro ./
cp src/styles/sticker-tool.css ./
cp src/content/stickerToolConfig.ts ./
cp public/gemini-watermark.png ./

# 確認 navigation.ts 已有 sticker-crop-tool：
grep "sticker-crop-tool" src/content/navigation.ts
# 期待看到：{ label: '貼圖裁切工具', path: '/sticker-crop-tool', short: '裁切' },

git add src/lib/sticker-tool/ src/components/sticker-tool/ src/pages/sticker-crop-tool.astro \
        src/styles/sticker-tool.css src/content/stickerToolConfig.ts public/gemini-watermark.png
git commit -m "feat: 新增貼圖裁切工具，符合 LINE 370×240 上架規格"
git push
```

### 8.4 部署後測試
- Cloudflare Pages / 任何 host
- 在 iPhone Safari 測一次（mobile UX 是 primary）
- 用真實 Gemini 圖跑一次（4×4 母圖 + 看右下角浮水印）
- 把 ZIP 丟手機 LINE 貼圖 APP 看能不能上架

---

## 9. 關鍵決策 log（給接手 AI 知道用戶偏好）

| 決策 | 為什麼 | 來源 |
|------|--------|------|
| 370×240 而非 1:1 | LINE 官方主圖規格 | LINE Creators Market + 瘋先生 2025 文 |
| 純 JS 去背 | 速度快、不下載模型、學生圖通常乾淨 | 用戶確認 |
| Reverse Alpha Blending | 無損、純 JS | davidyat.es 教學 + GargantuaX repo |
| 不生成主圖/Tab | 用戶用手機 LINE 貼圖 APP | 用戶確認 |
| 不做 IndexedDB | 一次性工具，做完下載 | 用戶確認 |
| 4 選項固定 pack size | 學生只要 4×4 主力 | 用戶選項 C |
| 即時 toggle 效果 | 不用並排對比，省 UI 空間 | 用戶選項 4A |
| 全中文化 | 教學網，學生中文 | 用戶明確要求 |
| 智慧跳過重疊浮水印 | **不做**，RAB 完美還原 | 用戶反問釐清 |
| 沿用教學站色系 | 不重新定義，符合設計系統 | 用戶過去偏好 |
| 沿用教學站 .ts / .astro 結構 | 與既有程式碼一致 | AGENTS.md |
| 不抽出 component | 寫死快，不要 over-engineer | 假設 #3 |

---

## 10. 開放問題 / 我不確定的事

接手 Agent 最好跟 Randy 確認：

1. **ZIP 內子資料夾**：`LineSticker/` 還是平鋪？`zipExport.ts` 實作是建子資料夾
2. **檔名 padding**：`sticker01` 還是 `sticker_01`？當前是 `sticker01`（無下劃線）
3. **手機預覽 layout**：360px 寬度有測過嗎？需要實機測試
4. **AI 去背 fallback**：用戶圖非純色背景時純 JS 會失敗，要不要加「AI 去背（@imgly/background-removal）」當進階選項？（用戶說不要，但實測後可能改變想法）
5. **浮水印 reference 96 還是 48**：當前永遠用 96（向下相容），如果學生用 0.5K 圖（≤1024px）應該用 48 — 需要驗證「用 96 算 48 的位置」是否準確
6. **3 層微調 UI 設計**：用戶只說「要做」，沒指定 UI 細節，要先畫 wireframe 確認

---

## 11. 檔案位置備忘

- **本交接文件**：`/tmp/ai-travel-workshop-site/HANDOFF-sticker-crop-tool.md`
- **已實作的程式碼**：`/tmp/ai-travel-workshop-site/src/{lib,components,pages,styles,content}/sticker-tool/`
- **原始工具**：`/tmp/crop-tool.html`
- **開源實作**：`/tmp/gemini-watermark-remover/`

如需把這整包交給 Randy 本機 repo，請把以下路徑整個複製過去：
```
src/lib/sticker-tool/             (6 檔)
src/components/sticker-tool/      (1 檔)
src/pages/sticker-crop-tool.astro (1 檔)
src/styles/sticker-tool.css       (1 檔)
src/content/stickerToolConfig.ts  (1 檔)
public/gemini-watermark.png       (1 檔)
HANDOFF-sticker-crop-tool.md      (本文件，給接手 AI 看的)
```

---

**最後更新**：2026-06-10
**目前狀態**：Build 通過（0 errors），功能 13/16 實作，**未做 3 層微調模式**
**預估完成時間**：補完 3 層約 +2-3 小時
