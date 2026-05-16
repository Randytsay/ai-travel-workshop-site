# AI 旅遊規劃師工作坊教學網站｜Codex 開發交接包 v1

**文件用途**：本文件可直接交給 Codex / Claude Code 作為網站開發任務說明。\
**專案名稱**：AI 旅遊規劃師工作坊教學網站\
**文件版本**：v1.0\
**專案定位**：工作坊現場操作系統 + 課後互動式講義網站 + 成果展示與投票平台。

---

# 0. 給開發 Agent 的最高優先指示

請先完整理解這個網站不是一般活動 landing page，而是一個要在 **3.5 小時實體工作坊現場使用** 的教學平台。

網站必須做到：

1. **手機適配優先**，桌機也要精緻。
2. 學員能依照網站流程一步步完成任務。
3. 所有提示詞都要具備 **一鍵複製**。
4. 重要教學頁需具備 **ChatGPT / Gemini 備援說明**。
5. 網站共 10 個分頁，內容可模組化維護。
6. 技術架構採 **Astro 靜態網站 + 局部互動元件**。
7. 第一階段先完成可運作 MVP；Firebase 即時投票與 GDrive 成果牆同步可先預留架構，再進一步串接。
8. 程式碼需清楚、可維護、易擴充，不要把全部內容硬寫死在單一頁面中。
9. 提示詞、時間表、FAQ、貼圖風格包、工具說明等內容，應獨立放在 `src/content/` 或等價資料模組中。
10. 每個頁面與元件都應考慮未來可換成其他工作坊主題，而不是完全寫死成不可重用的版型。

---

# 1. 專案背景

## 1.1 工作坊概述

這是一場面向 AI 初學者與美安夥伴朋友的實體工作坊。學員以女性居多，約 8 成；一半以上可能是 AI 新手。

正式課程時間：

- **13:30–17:00，共 3.5 小時**
- **17:00–17:30 為現場彈性時間，不要列入網站正式課程表**

工作坊希望讓學員在輕鬆、有成就感、有互動的氛圍中，完成以下成果：

1. 生成一張自己的 **AI 3D 可愛公仔圖**。
2. 使用 **AI 旅遊規劃師｜工作坊版 GPT** 整理自己的旅遊需求。
3. 知道如何將需求接續交給 NotebookLM 做深入研究、簡報與資訊圖表。
4. 完成至少一組 **旅行主題 LINE 貼圖素材**。
5. 參與成果分享、作品投票與小獎品互動。
6. 最後以溫和方式理解「旅行消費與現金回饋」的商機概念。

---

# 2. 開發目標

## 2.1 核心產品目標

請打造一個教學網站，使其同時具備：

- 活動介紹頁
- 課前準備清單
- 現場教學操作頁
- 提示詞素材庫
- 備援路徑說明
- 即時互動投票頁
- 成果牆頁
- 課後問卷與 LINE 講義領取頁

## 2.2 學員成功標準

網站必須支援學員：

- 快速看懂下一步要做什麼。
- 能直接複製提示詞。
- 遇到 ChatGPT / GPT 額度不足時，不會卡住。
- 能上傳作品至 LINE 群組，並理解作品可能被放入成果牆與投票頁。
- 課後知道如何透過 LINE 官方 AI 助教領取講義。

---

# 3. 技術架構要求

## 3.1 建議技術棧

### 前端

- Astro
- TypeScript 優先
- CSS 可採原生 CSS / Tailwind 擇一；若沒有特別必要，建議採容易維護的 utility-first 或模組化 CSS 策略
- 少量互動元件可用 React / Preact / Solid 其中之一，但不要過度複雜

### 互動模組

- 一鍵複製提示詞
- 進度勾選
- FAQ accordion
- 小測驗互動
- 投票 UI
- 成果牆篩選與 Modal

### 第二階段串接

- Firebase Realtime Database：即時投票
- Google Drive / Apps Script：成果牆資料同步
- LINE 官方 AI 助教：講義領取流程文案已規劃，實際 API 由外部系統處理

---

# 4. 專案資料夾結構

請採用類似以下結構：

```text
src/
├─ layouts/
│  └─ WorkshopLayout.astro
│
├─ pages/
│  ├─ index.astro
│  ├─ prep.astro
│  ├─ ai-basics.astro
│  ├─ doll-maker.astro
│  ├─ travel-planner.astro
│  ├─ notebooklm.astro
│  ├─ sticker-lab.astro
│  ├─ voting.astro
│  ├─ gallery.astro
│  └─ survey.astro
│
├─ components/
│  ├─ navigation/
│  │  ├─ SiteHeader.astro
│  │  ├─ DesktopSidebar.astro
│  │  └─ MobileBottomNav.astro
│  │
│  ├─ common/
│  │  ├─ HeroSection.astro
│  │  ├─ SectionTitle.astro
│  │  ├─ BenefitCard.astro
│  │  ├─ TimelineSchedule.astro
│  │  ├─ FAQAccordion.tsx
│  │  └─ ExternalToolButton.astro
│  │
│  ├─ prompts/
│  │  ├─ PromptCard.tsx
│  │  ├─ PromptPlatformTabs.tsx
│  │  └─ FallbackNoticeCard.astro
│  │
│  ├─ learning/
│  │  ├─ StepCard.astro
│  │  ├─ StepChecklist.tsx
│  │  ├─ ProgressTracker.tsx
│  │  └─ QuizCard.tsx
│  │
│  ├─ voting/
│  │  ├─ LiveVoteBoard.tsx
│  │  ├─ VoteWorkCard.tsx
│  │  ├─ LeaderboardPanel.tsx
│  │  └─ VoteAdminPanel.tsx
│  │
│  ├─ gallery/
│  │  ├─ GalleryGrid.tsx
│  │  ├─ GalleryFilter.tsx
│  │  └─ GalleryModal.tsx
│  │
│  └─ survey/
│     ├─ SurveyCTA.astro
│     ├─ LineMaterialClaimCard.astro
│     └─ CashbackBridgeCard.astro
│
├─ content/
│  ├─ schedule.ts
│  ├─ workshopHighlights.ts
│  ├─ prepChecklist.ts
│  ├─ toolCards.ts
│  ├─ aiIntroCards.ts
│  ├─ quizzes.ts
│  ├─ dollPrompts.ts
│  ├─ travelPlannerPrompt.ts
│  ├─ notebooklmPrompts.ts
│  ├─ stickerPromptPacks.ts
│  ├─ voteCategories.ts
│  ├─ galleryCategories.ts
│  ├─ faqs.ts
│  ├─ surveyConfig.ts
│  └─ lineClaimConfig.ts
│
├─ integrations/
│  ├─ firebase/
│  │  ├─ client.ts
│  │  ├─ voteService.ts
│  │  └─ types.ts
│  ├─ google-drive/
│  │  └─ galleryFeed.ts
│  └─ line/
│     └─ lineClaimCopy.ts
│
├─ styles/
│  ├─ theme.css
│  ├─ layout.css
│  ├─ components.css
│  └─ responsive.css
│
└─ assets/
   ├─ images/
   ├─ videos/
   └─ icons/
```

---

# 5. 全站設計系統

## 5.1 視覺風格

**溫暖旅行感 × 輕盈 AI 未來感**

## 5.2 色彩建議

- 主色：珊瑚橘 / 暖粉
- 輔色：天空藍 / 湖水青
- 背景：奶油白 / 淡米色
- 文字：深靛藍 / 炭灰色
- 成功：柔和綠
- 提醒：暖黃

## 5.3 UI 風格

- 大圓角卡片
- 輕陰影
- 友善插圖
- 優先保證手機閱讀與點擊舒適
- CTA 明顯，尤其是：
  - 開啟 GPT
  - 複製提示詞
  - 開啟 Gemini
  - 加入 LINE AI 助教
  - 投票

---

# 6. 10 個頁面開發規格

---

## 6.1 Page 01｜工作坊首頁 `/`

### 目的

- 說清楚活動價值。
- 顯示今日 3 大成果。
- 顯示 3.5 小時正式課程表。
- 預告互動活動。

### 必做區塊

1. Hero 主視覺
2. 三大成果卡
3. 適合誰參加
4. 正式課程時間軸
5. 現場互動預告
6. CTA：前往課前準備

### 正式課程時間表資料

| 時間          | 內容                                 |
| ----------- | ---------------------------------- |
| 13:30–13:45 | 開場：今天你會帶走什麼                        |
| 13:45–14:10 | AI 是什麼？AI 對生活與工作的幫助                |
| 14:10–14:25 | 常用 AI 工具：ChatGPT、Gemini、NotebookLM |
| 14:25–14:40 | ChatGPT 介面與操作入門                    |
| 14:40–15:05 | 生成自己的 3D 可愛公仔                      |
| 15:05–15:15 | 休息                                 |
| 15:15–15:55 | AI 旅遊規劃師實作                         |
| 15:55–16:15 | NotebookLM：把需求變成研究、簡報與資訊圖表         |
| 16:15–16:50 | 製作旅行主題 LINE 貼圖素材                   |
| 16:50–17:00 | 成果分享＋旅行消費與現金回饋的小啟發                 |

---

## 6.2 Page 02｜課前準備 `/prep`

### 目的

- 降低現場卡關。
- 提前完成登入、安裝、加入群組。

### 必做區塊

1. 課前 Checklist
2. 工具說明卡：ChatGPT / Gemini / NotebookLM / LINE 拍貼
3. 免費版額度提醒
4. 截圖式登入教學區
5. QR Code 區
6. FAQ

### Checklist

- 已登入 ChatGPT
- 可開啟 Gemini
- 可開啟 NotebookLM
- 已下載 LINE 拍貼
- 已加入工作坊 LINE 群組

---

## 6.3 Page 03｜AI 入門 `/ai-basics`

### 目的

- 幫新手建立對 AI 的理解。
- 介紹本次只用 3 個主工具。
- 加入有獎問答。

### 必做區塊

1. AI 是什麼？三張圖解卡
2. AI 對生活的幫助 6 宮格
3. ChatGPT / Gemini / NotebookLM 比較卡
4. QuizCard × 2
5. 小禮物提示小卡

### Quiz 題目

1. 哪一件事不適合直接完全相信 AI？
2. 哪個工具最適合依據資料做整理與研究？

---

## 6.4 Page 04｜我的 3D 可愛公仔 `/doll-maker`

### 目的

- 創造第一個驚喜成果。
- 完成作品後引導上傳 LINE 群組。

### 必做區塊

1. 原圖 → 公仔圖成果示意
2. 6 步驟操作卡
3. 3 款提示詞卡：
   - 個人 3D 公仔
   - 親子 3D 公仔
   - 寵物 3D 公仔
4. ChatGPT 與 Gemini 備援說明
5. 上傳 LINE 群組 CTA
6. 「我已完成」進度勾選

### 待補圖像素材

- 個人、公仔、親子、寵物範例圖
- ChatGPT 上傳照片示意截圖

---

## 6.5 Page 05｜AI 旅遊規劃師 `/travel-planner`

### 目的

- 引導使用正式 GPT。
- 若額度不足，立刻切換備援流程。

### 正式 GPT 連結

- 名稱：AI 旅遊規劃師｜工作坊版
- URL：`https://chatgpt.com/g/g-6a0829f788b88191ac0643f6ee0d615d-ai-lu-you-gui-hua-shi-gong-zuo-fang-ban`

### 必做區塊

1. 說明：把模糊旅遊想法轉成可研究需求
2. 三軌入口卡：
   - 方法 1：開啟專屬 GPT
   - 方法 2：複製提示詞到 ChatGPT
   - 方法 3：複製提示詞到 Gemini
3. 旅遊規劃流程圖
4. GPT 備援提示詞 PromptCard
5. Gemini 備援提示詞 PromptCard
6. 學員回答範例
7. 下一步 CTA：前往 NotebookLM

### 重要 UX

- 正式 GPT 入口應最醒目。
- 備援提示詞不要藏太深，必須明顯可見。
- 長提示詞採收合區，但複製按鈕始終可見。

---

## 6.6 Page 06｜NotebookLM 研究升級 `/notebooklm`

### 目的

- 將 AI 旅遊規劃結果接力轉為深度研究。
- 展示 NotebookLM 的簡報與資訊圖表價值。

### 必做區塊

1. 研究流程圖：需求總表 → Note → Source → Deep Research → 研究報告 → 行程 / 簡報 / 圖表
2. 6 步驟操作卡
3. 4 個 PromptCard：
   - Deep Research prompt
   - 匯入來源後追問 prompt
   - 旅遊簡報生成 prompt
   - 資訊圖表生成 prompt
4. 範例成果卡
5. 截圖與短影片插槽

---

## 6.7 Page 07｜LINE 貼圖工坊 `/sticker-lab`

### 目的

- 每位學員至少產出一組 8 格貼圖素材總圖。
- 快者可進一步使用 LINE 拍貼裁切與送審。

### 必做區塊

1. 頁面 Hero
2. 成果層級說明：
   - 必達：8 格素材總圖
   - 進階：LINE 拍貼裁切 / 送審
3. 6 款貼圖風格包：
   - 我的旅遊小分身
   - 親子旅行歡樂包
   - 全家一起旅行包
   - 毛孩旅行日記
   - 姐妹閨蜜出遊包
   - 幸福雙人旅行包
4. 每款風格包內容：
   - 適合照片
   - 風格說明
   - 8 個貼圖台詞／情境
   - ChatGPT 提示詞
   - Gemini 備援提示詞
   - 複製按鈕
5. LINE 拍貼流程 StepCard
6. 上傳群組 CTA

---

## 6.8 Page 08｜現場互動投票 `/voting`

### 目的

- 讓現場更有刺激感。
- 全員可用手機參與作品票選。

### MVP 先完成

1. 投票頁 UI
2. 分類 Tab：公仔作品 / 貼圖作品
3. 作品卡片
4. TOP 5 排行榜 UI
5. 獎項說明
6. 可用 mock data 演示

### 第二階段

- 接 Firebase Realtime Database
- 每台裝置對同一作品限投 1 次
- 每人可投多件作品
- 票數即時更新
- 排名動畫與第一名皇冠
- 管理員開始／暫停／公布名次功能

---

## 6.9 Page 09｜成果牆 `/gallery`

### 目的

- 展示當天作品。
- 課後可作回顧與招生素材。

### MVP 先完成

1. Hero
2. 篩選 Chips：全部 / 公仔 / 貼圖 / 旅遊規劃
3. 瀑布流 GalleryGrid
4. Modal 放大
5. 成果來源說明
6. CTA：填問卷領講義

### 第二階段

- 串 LINE Bot → Google Drive → JSON feed / API
- 後台審核後上牆

---

## 6.10 Page 10｜課後問卷與講義領取 `/survey`

### 目的

- 提高問卷完成率。
- 導入 LINE 官方 AI 助教。
- 以關鍵字「我要講義」領取教材。

### 必做區塊

1. 感謝參與 Hero
2. 為什麼要填問卷
3. 完成問卷可獲得什麼講義
4. 問卷按鈕與 QR Code 插槽
5. 加入 LINE 官方 AI 助教說明
6. 關鍵字「我要講義」三步驟流程卡
7. 講義建議呈現方式：
   - 主講義：互動式網頁連結
   - 附加：PDF 重點整理版
8. 結尾 CTA：歡迎分享成果到群組

---

# 7. 提示詞資料結構要求

所有提示詞建議統一格式：

```ts
export type PromptItem = {
  id: string;
  title: string;
  description: string;
  platform: 'chatgpt' | 'gemini' | 'notebooklm';
  audience?: string[];
  prompt: string;
  notes?: string[];
  tags?: string[];
};
```

## 7.1 公仔提示詞

`dollPrompts.ts`

- person-doll
- parent-child-doll
- pet-doll

## 7.2 旅遊規劃提示詞

`travelPlannerPrompt.ts`

- chatgpt-workshop-fallback
- gemini-workshop-fallback

## 7.3 NotebookLM 提示詞

`notebooklmPrompts.ts`

- deep-research
- final-itinerary-followup
- slide-deck
- infographic

## 7.4 貼圖風格包

`stickerPromptPacks.ts` 每個 pack 應至少包含：

- id
- title
- suitedPhotos
- styleDescription
- stickerLines[8]
- chatgptPrompt
- geminiPrompt
- sampleImagePlaceholder

---

# 8. 互動功能開發規格

## 8.1 一鍵複製

- 所有 PromptCard 都必須有複製按鈕。
- 複製成功顯示 Toast：「已複製，可直接貼上使用」。

## 8.2 學習進度

- 可先用 localStorage 保存。
- 頁面任務勾選後，桌機側欄進度更新。

## 8.3 Quiz

- 用資料驅動。
- 可重複選答。
- 顯示正確答案與簡短說明。

## 8.4 投票

### MVP

- Mock data。
- 票數可做前端假互動，或暫不啟用真計票。

### 正式版

- Firebase 即時同步。
- 同裝置對同作品限投一次。
- 支援多作品投票。

## 8.5 成果牆

### MVP

- 靜態 sample data。
- Gallery modal。

### 正式版

- 讀取後端 JSON feed 或 Google Apps Script endpoint。

---

# 9. 素材插槽需求

請所有涉及圖片與影片的頁面，都先做出可替換的 placeholder 區塊，不要因素材尚未準備而延誤版面開發。

## 9.1 圖像 Placeholder

- 首頁 Hero 圖
- 三大成果圖
- 公仔範例圖
- 貼圖風格包示意圖
- NotebookLM 範例成果圖
- 投票 UI mockup
- 成果牆 mockup
- 講義領取流程圖

## 9.2 影片 Placeholder

- ChatGPT 公仔生成
- 旅遊 GPT 問答示範
- NotebookLM 接續研究
- LINE 拍貼裁切與送審

---

# 10. 驗收標準

## 10.1 功能驗收

- 10 頁路由全部可開。
- 導覽正常。
- 手機與桌機版正常。
- Prompt 複製按鈕可用。
- FAQ 可開合。
- Quiz 可作答。
- 成果牆 UI 可瀏覽。
- 投票牆 UI 可展示。
- 問卷頁與 LINE 講義領取流程清楚。

## 10.2 UX 驗收

- 新手不需要太多解釋就知道下一步。
- 一頁中最主要 CTA 明顯。
- 備援路徑不難找。
- 文字大小適合熟齡與一般使用者閱讀。
- 手機按鈕間距足夠。

## 10.3 開發品質驗收

- 程式碼模組化。
- 不把所有資料寫死在頁面內。
- 有基本 TypeScript 型別。
- 元件可重用。
- 版面在 360px / 768px / 1280px 下正常。

---

# 11. 開發順序建議

## Phase 1｜專案骨架

1. 初始化 Astro。
2. 建立 Layout。
3. 建立 10 頁路由。
4. 建立導覽。
5. 建立 theme 與基礎 RWD。

## Phase 2｜靜態內容頁

1. 首頁
2. 課前準備
3. AI 入門
4. 3D 公仔
5. 旅遊規劃師
6. NotebookLM
7. LINE 貼圖
8. 問卷頁

## Phase 3｜互動元件

1. PromptCard
2. Copy button / Toast
3. FAQ
4. Quiz
5. Progress tracker

## Phase 4｜成果互動頁

1. 投票頁 UI
2. 成果牆 UI
3. Gallery modal

## Phase 5｜外部串接預留或實作

1. Firebase 投票
2. GDrive 成果牆 feed
3. LINE 講義領取相關 UI 文案確認

---

# 12. 需要開發 Agent 特別注意的內容

## 12.1 正式 GPT 入口必須放入

請在旅遊規劃頁加入明顯按鈕：

```text
開啟 AI 旅遊規劃師｜工作坊版
```

連結：

```text
https://chatgpt.com/g/g-6a0829f788b88191ac0643f6ee0d615d-ai-lu-you-gui-hua-shi-gong-zuo-fang-ban
```

## 12.2 正式時間表只顯示 3.5 小時

不要在首頁正式時間表列出 17:00–17:30。

## 12.3 講義領取方式必須寫清楚

流程：

1. 完成問卷。
2. 加入 LINE 官方 AI 助教。
3. 輸入：我要講義。
4. 接收互動式網頁講義與 PDF 重點版。

## 12.4 投票機制規則

- 一人可投多件作品。
- 同作品同裝置限投一次。
- 票數最高可直接獲獎。

---

# 13. 專案完成後應交付的內容

1. 完整 Astro 專案。
2. 本地可執行方式。
3. 建置與部署方式。
4. 所有頁面截圖。
5. 手機版與桌機版簡要檢查結果。
6. TODO list：
   - 尚待補齊圖片素材
   - 尚待補齊影片素材
   - 尚待串接 Firebase
   - 尚待接 Google Drive 成果牆 Feed

---

# 14. 最終一句話要求

> 請把這個網站做成一個「學員打開就知道現在做什麼、講師投影也好用、課後重看仍然有價值」的工作坊數位平台，而不是只有漂亮但不實用的活動頁。

