# AI 旅遊規劃師工作坊教學網站｜頁面線框與元件清單 v1

**文件用途**：將《完整產品規格書 v1》進一步轉化為可執行的網站頁面規劃、區塊線框、共用元件清單、MVP 開發優先順序與素材準備表。  
**建議開發架構**：Astro 靜態網站 + 局部互動元件 + Firebase 即時投票 + LINE／Google Drive 串接預留。

---

# 1. 全站版型總覽

## 1.1 桌機版 Layout

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Top Header：Logo / 活動名稱 / 快速入口 / 問卷 / 講義領取提醒          │
├───────────────┬──────────────────────────────────────────────────────┤
│ Left Sidebar  │ Main Content                                         │
│               │                                                      │
│ 01 首頁       │ 依分頁顯示內容                                        │
│ 02 課前準備   │                                                      │
│ 03 AI 入門    │                                                      │
│ 04 3D 公仔    │                                                      │
│ 05 旅遊規劃   │                                                      │
│ 06 NotebookLM │                                                      │
│ 07 LINE 貼圖  │                                                      │
│ 08 互動投票   │                                                      │
│ 09 成果牆     │                                                      │
│ 10 問卷講義   │                                                      │
│               │                                                      │
│ 進度條        │                                                      │
│ 今日任務      │                                                      │
├───────────────┴──────────────────────────────────────────────────────┤
│ Footer：活動資訊 / LINE AI 助教 / 隱私與成果牆說明                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 桌機版設計重點
- 側邊欄固定，方便課堂快速切換。
- 主內容最大寬度建議 1100–1240px，閱讀舒服。
- 左側欄可顯示：
  - 分頁導覽
  - 學習進度
  - 當前課程區塊
  - 「我卡住了」入口

---

## 1.2 手機版 Layout

```text
┌──────────────────────────────┐
│ Mobile Header                 │
│ 活動名稱 / 漢堡選單           │
├──────────────────────────────┤
│ Main Content                  │
│ 單欄垂直閱讀                   │
│ 卡片式步驟                     │
│ 大按鈕                         │
│ 提示詞一鍵複製                 │
├──────────────────────────────┤
│ Bottom Nav                    │
│ 首頁｜任務｜提示詞｜投票       │
└──────────────────────────────┘
```

### 手機版設計重點
- 所有按鈕高度至少 44px。
- 卡片單欄排列。
- 提示詞區塊採「摘要 + 展開」模式，避免頁面過長。
- 操作影片採 16:9 或直式手機錄影 9:16 自適應。
- 投票卡片可一欄或兩欄切換；手機預設一欄較清楚。

---

# 2. 全站共用元件清單

## 2.1 導覽元件

### `SiteHeader`
**用途**：全站上方主導覽。

**內容**：
- 工作坊 Logo／名稱
- 「今日流程」快捷鍵
- 「加入 LINE 群」或「加入 AI 助教」按鈕
- 手機漢堡選單

---

### `DesktopSidebar`
**用途**：桌機版 10 頁導覽。

**內容**：
- 分頁清單
- 當前頁高亮
- 課程進度視覺條
- 今日已完成任務數

---

### `MobileBottomNav`
**用途**：手機下方固定快捷列。

**建議 4 格**：
1. 首頁
2. 任務
3. 提示詞
4. 投票

---

## 2.2 內容展示元件

### `HeroSection`
適用頁面：首頁、成果牆、問卷頁。

**內容**：
- 標題
- 副標
- CTA 按鈕
- 主視覺圖

---

### `SectionTitle`
**用途**：每個區塊標題標準化。

**內容**：
- 小標籤，例如「STEP 1」「互動時間」
- 主標題
- 補充說明

---

### `BenefitCard`
**用途**：首頁三大成果、工具介紹、學習重點。

**內容**：
- Icon
- 標題
- 一句說明

---

### `TimelineSchedule`
**用途**：首頁 3.5 小時正式時程表。

**桌機**：水平或雙欄 Timeline。  
**手機**：垂直時間軸。

---

### `StepCard`
**用途**：操作教學步驟。

**內容**：
- Step 編號
- 步驟標題
- 一句指示
- 截圖或影片
- 勾選完成按鈕

---

### `ToolCompareCard`
**用途**：ChatGPT / Gemini / NotebookLM 工具定位比較。

---

### `FAQAccordion`
**用途**：常見問題折疊區。

---

## 2.3 提示詞與操作元件

### `PromptCard`
**網站最重要共用元件之一。**

**內容**：
- 提示詞名稱
- 適合情境
- 簡短摘要
- 展開全文
- 複製按鈕
- 平台標籤：ChatGPT / Gemini / NotebookLM
- 難度標籤：新手友善 / 進階

**互動**：
- 點擊複製後顯示「已複製」Toast。
- 長提示詞支援收合。

---

### `PromptPlatformTabs`
**用途**：同一提示詞的 ChatGPT / Gemini 版本切換。

---

### `FallbackNoticeCard`
**用途**：額度不足或工具無法使用時的備案說明。

**例如**：
- GPTs 額度不足 → 複製一般 ChatGPT 版
- ChatGPT 圖片額度不足 → 切換 Gemini 備案

---

### `ExternalToolButton`
**用途**：開啟 GPT、Gemini、NotebookLM、LINE 拍貼等外部工具。

---

## 2.4 互動與活動元件

### `QuizCard`
**用途**：AI 入門小測驗。

**內容**：
- 題目
- 選項
- 選擇後立即回饋
- 主持人模式可公布答案

---

### `LiveVoteBoard`
**用途**：投票頁核心元件。

**內容**：
- 作品卡片
- 投票按鈕
- 即時票數
- 類別篩選

---

### `LeaderboardPanel`
**用途**：TOP 5 排行。

**效果**：
- 第 1 名皇冠
- 名次變動動畫
- 距離第一名差幾票提示

---

### `VoteWorkCard`
**用途**：單一作品卡片。

**內容**：
- 作品圖
- 作者暱稱
- 作品類型
- 票數
- 投票按鈕

---

### `GalleryGrid`
**用途**：成果牆瀑布流。

---

### `GalleryModal`
**用途**：點開單張作品放大查看。

---

## 2.5 轉換與引導元件

### `SurveyCTA`
**用途**：問卷完成率提升。

**內容**：
- 問卷價值說明
- 可領取講義項目
- 問卷按鈕
- QR Code

---

### `LineMaterialClaimCard`
**用途**：講義領取方式說明。

**內容**：
1. 加 LINE 官方 AI 助教
2. 輸入「我要講義」
3. 收到互動式講義連結與 PDF 重點版

---

### `CashbackBridgeCard`
**用途**：最後商機橋段的網站輔助區。

**說明方向**：
- 旅行花費不少。
- 若日常消費能創造現金回饋，是否值得了解？
- 保持溫和，不講太多制度。

---

# 3. Page 01｜工作坊首頁線框

## 3.1 頁面目標
- 傳達價值。
- 讓學員知道今日成果。
- 呈現 3.5 小時正式課程表。
- 預告互動投票與小禮物。

## 3.2 線框

```text
[HeroSection]
  標題：AI 旅遊規劃師工作坊
  副標：一個下午，完成 AI 公仔、旅遊規劃、LINE 貼圖素材
  CTA：查看今日流程 / 開始課前準備
  主視覺：旅行感 × AI 圖像

[三大成果 Benefit Cards]
  01 AI 3D 可愛公仔
  02 專屬旅遊規劃提示詞
  03 旅行主題 LINE 貼圖素材

[適合誰參加]
  4 張卡片：AI 新手 / 想規劃旅行 / 喜歡創作 / 想和朋友一起體驗

[TimelineSchedule]
  13:30–17:00 正式時程表

[現場互動預告]
  公仔快閃秀 / 貼圖人氣票選 / 有獎問答 / 成果牆

[Quick CTA]
  按鈕：先完成課前準備
```

## 3.3 MVP 必做
- Hero
- 三大成果
- 時間表
- 互動預告

## 3.4 第二階段可加
- 活動倒數
- 主持人／講師介紹卡
- 報名資訊回顧區

---

# 4. Page 02｜課前準備線框

## 4.1 頁面目標
- 降低現場技術卡關。
- 引導先安裝與登入。
- 讓學員知道有備案。

## 4.2 線框

```text
[SectionTitle]
  課前準備：先把工具準備好，現場更順

[Checklist Panel]
  □ 已登入 ChatGPT
  □ 可開啟 Gemini
  □ 可開啟 NotebookLM
  □ 已下載 LINE 拍貼
  □ 已加入工作坊 LINE 群組

[工具說明 Tool Cards]
  ChatGPT / Gemini / NotebookLM / LINE 拍貼

[免費額度提醒 FallbackNoticeCard]
  今天會控制圖像生成次數；若額度不足有備案

[教學截圖 StepCards]
  1 ChatGPT 登入
  2 Gemini 開啟
  3 NotebookLM 開啟
  4 LINE 拍貼下載

[QR Code 區]
  LINE 群組 / LINE 拍貼下載 / AI 助教好友

[FAQAccordion]
  忘記密碼怎麼辦？
  沒有 ChatGPT 帳號怎麼辦？
  額度不足怎麼辦？
```

## 4.3 MVP 必做
- Checklist
- 工具卡
- 額度提醒
- QR Code 佔位
- FAQ

---

# 5. Page 03｜AI 入門線框

## 5.1 頁面目標
- 簡單講清楚 AI。
- 介紹三大工具定位。
- 安排第一輪互動問答。

## 5.2 線框

```text
[SectionTitle]
  AI 到底是什麼？

[三張圖解卡]
  理解需求 / 整理資訊 / 協助創作

[AI 幫助生活 6 宮格]
  旅遊 / 文案 / 圖片 / 簡報 / 整理 / 學習

[三大工具比較]
  ChatGPT / Gemini / NotebookLM

[QuizBlock]
  題目 1：哪一件事不適合直接相信 AI？
  題目 2：哪個工具適合做資料研究整理？

[主持人提示卡]
  此處可發放小禮物
```

## 5.3 MVP 必做
- AI 圖解卡
- 工具比較
- 2 題互動問答

---

# 6. Page 04｜我的 3D 可愛公仔線框

## 6.1 頁面目標
- 創造 Wow Moment。
- 讓學員完成第一個作品。
- 引導上傳到 LINE 群組。

## 6.2 線框

```text
[Hero / Example Compare]
  左：原始照片
  右：AI 公仔成果

[StepCards]
  1 開啟 ChatGPT
  2 上傳照片
  3 複製提示詞
  4 送出生成
  5 下載作品
  6 上傳 LINE 群組

[Prompt Tabs]
  A 個人公仔
  B 親子公仔
  C 寵物公仔

[PromptCard]
  每個提示詞可複製

[Gemini Fallback Card]
  ChatGPT 額度不足？改用 Gemini 版

[Share CTA]
  做好了嗎？傳到群組參加人氣展示！

[Mini Preview Gallery]
  顯示幾張預設範例
```

## 6.3 MVP 必做
- 3 種公仔提示詞卡
- 6 步驟操作區
- 分享 CTA
- Gemini 備援區

## 6.4 待補素材
- 個人、公仔、寵物成果範例圖
- ChatGPT 上傳照片螢幕錄影

---

# 7. Page 05｜AI 旅遊規劃師線框

## 7.1 頁面目標
- 引導使用 GPT。
- 額度不足時能迅速切換備援。
- 讓學員知道下一步是 NotebookLM。

## 7.2 線框

```text
[SectionTitle]
  把「想出去玩」變成一份可研究的旅行需求

[三軌入口卡]
  1 開啟專屬 GPT（主推）
  2 複製提示詞到 ChatGPT（備援）
  3 複製提示詞到 Gemini（備援）

[正式 GPT 連結卡]
  顯示 GPT 名稱
  按鈕：開啟 AI 旅遊規劃師｜工作坊版

[工作坊流程視覺]
  回答 3 輪問題 → 確認摘要 → 取得 NotebookLM 提示詞

[PromptCard：ChatGPT 完整備援版]
  長提示詞折疊 + 複製

[PromptCard：Gemini 備援版]
  長提示詞折疊 + 複製

[學員回答範例]
  例：日本大阪、4 天 3 夜、親子 4 人...

[下一步 CTA]
  已得到需求摘要？前往 NotebookLM 研究升級
```

## 7.3 MVP 必做
- GPT 開啟按鈕
- ChatGPT 備援提示詞
- Gemini 備援提示詞
- 流程圖

## 7.4 需填入正式 GPT 連結
- 已建立：AI 旅遊規劃師｜工作坊版

---

# 8. Page 06｜NotebookLM 研究升級線框

## 8.1 頁面目標
- 教學員把 ChatGPT 產出的需求接給 NotebookLM。
- 展示研究、簡報、資訊圖表的價值。

## 8.2 線框

```text
[SectionTitle]
  讓 NotebookLM 接手深度研究

[流程圖]
  旅遊需求總表 → Note → Source → Deep Research → 研究報告 → 行程 / 簡報 / 圖表

[StepCards]
  1 建立筆記本
  2 貼入旅客需求總表
  3 轉成 Source
  4 貼入 Deep Research prompt
  5 匯入研究報告
  6 產出最終行程

[PromptCard]
  Deep Research prompt
  匯入來源後追問 prompt

[延伸成果區]
  旅遊簡報提示詞
  資訊圖表提示詞

[Preview Cards]
  NotebookLM 研究報告示意
  簡報示意
  資訊圖表示意
```

## 8.3 MVP 必做
- NotebookLM 流程圖
- 4 類提示詞卡
- 步驟教學

---

# 9. Page 07｜LINE 貼圖工坊線框

## 9.1 頁面目標
- 完成一組貼圖素材。
- 快者可進入 LINE 拍貼裁切送審。
- 讓成果可以立即分享到群組參賽。

## 9.2 線框

```text
[Hero]
  做出專屬旅行主題 LINE 貼圖素材

[最低成果與進階成果]
  必達：8 格素材總圖
  進階：LINE 拍貼裁切 / 送審

[6 款風格包 Grid]
  1 我的旅遊小分身
  2 親子旅行歡樂包
  3 全家一起旅行包
  4 毛孩旅行日記
  5 姐妹閨蜜出遊包
  6 幸福雙人旅行包

[每一款 StylePackCard]
  適合照片 / 風格說明 / 8 個台詞 / ChatGPT 提示詞 / Gemini 備援提示詞

[LINE 拍貼流程 StepCards]
  1 下載
  2 建專案
  3 匯入總圖
  4 裁切
  5 填資料
  6 送審

[Upload CTA]
  把素材總圖上傳 LINE 群組，參加人氣票選！
```

## 9.3 MVP 必做
- 6 款風格包卡片
- 每款提示詞複製
- LINE 拍貼流程
- 上傳群組 CTA

## 9.4 待補素材
- 6 款示意圖
- LINE 拍貼手機操作影片

---

# 10. Page 08｜現場互動投票線框

## 10.1 頁面目標
- 提升現場刺激感與參與感。
- 票數最高直接獲獎。

## 10.2 線框

```text
[Hero]
  作品人氣戰｜為你喜歡的作品投票

[投票規則]
  每人可以投給多件作品，同一件作品限投一次

[Category Tabs]
  公仔作品 / 貼圖作品

[LeaderboardPanel]
  TOP 5 即時排行榜

[VoteWorkGrid]
  作品卡片：縮圖 / 暱稱 / 類別 / 票數 / 投票按鈕

[獎項說明]
  最萌公仔獎 / 最想收藏獎 / 親子溫馨獎 / 毛孩人氣獎

[Admin Controls - 可隱藏]
  開始投票 / 暫停投票 / 公布名次
```

## 10.3 MVP 必做
- 投票頁 UI
- 作品卡片
- 排行榜 UI
- 可先用 mock data

## 10.4 第二階段串接
- Firebase 即時票數
- 管理員控制
- 現場投影專用模式

---

# 11. Page 09｜成果牆線框

## 11.1 頁面目標
- 展示活動成果。
- 課後可以持續回顧與分享。

## 11.2 線框

```text
[Hero]
  今天，我們一起完成了這些作品

[Filter Chips]
  全部 / 3D 公仔 / 貼圖素材 / 旅遊規劃

[GalleryGrid]
  瀑布流作品牆

[GalleryModal]
  點開放大
  顯示作品類型 / 暱稱 / 簡短說明

[成果來源說明]
  作品來自工作坊 LINE 群組上傳

[CTA]
  想領完整講義？前往問卷頁
```

## 11.3 MVP 必做
- Gallery UI
- 分類篩選
- Modal 放大

## 11.4 第二階段串接
- GDrive / Apps Script 自動資料載入
- 管理員審核作品

---

# 12. Page 10｜課後問卷與講義領取線框

## 12.1 頁面目標
- 提高問卷完成率。
- 導流到 LINE 官方 AI 助教。
- 清楚告知講義怎麼領。

## 12.2 線框

```text
[Hero]
  謝謝你參加今天的工作坊

[Feedback Value]
  你的回饋會幫助我們把下一場做得更好

[講義內容 Benefit Cards]
  1 全部提示詞
  2 操作步驟
  3 NotebookLM 流程
  4 LINE 貼圖延伸

[Survey CTA]
  按鈕：立即填寫課後問卷
  QR Code

[LineMaterialClaimCard]
  Step 1 加入 Randy 的官方 LINE AI 助教
  Step 2 輸入「我要講義」
  Step 3 收到講義網站連結與 PDF 摘要版

[講義領取示意圖]

[Closing CTA]
  歡迎分享今天成果到群組
```

## 12.3 MVP 必做
- 問卷 CTA
- LINE AI 助教加入引導
- 關鍵字「我要講義」流程卡
- 講義內容說明

---

# 13. 內容資料模組規劃

## 13.1 建議資料檔案

```text
src/content/
├─ schedule.ts
├─ workshopHighlights.ts
├─ prepChecklist.ts
├─ toolCards.ts
├─ aiIntroCards.ts
├─ quizzes.ts
├─ dollPrompts.ts
├─ travelPlannerPrompt.ts
├─ notebooklmPrompts.ts
├─ stickerPromptPacks.ts
├─ voteCategories.ts
├─ galleryCategories.ts
├─ faqs.ts
├─ surveyConfig.ts
└─ lineClaimConfig.ts
```

## 13.2 資料與頁面分離的好處
- 調整課程時間不需動頁面結構。
- 改提示詞不需修改元件。
- 未來換另一場工作坊，只需替換內容資料。
- Codex 可更安全地維護。

---

# 14. MVP 開發優先級

## P0｜一定要先完成
1. Astro 專案骨架
2. 全站 Layout、桌機側欄、手機底部導覽
3. 10 頁路由
4. 首頁、課前準備、3D 公仔、旅遊規劃師、LINE 貼圖、問卷頁
5. PromptCard 與一鍵複製功能
6. 旅遊 GPT 正式連結入口
7. ChatGPT / Gemini 備援提示詞區
8. RWD 手機適配

## P1｜活動前強烈建議完成
1. AI 入門頁
2. NotebookLM 頁
3. 成果牆 UI
4. 投票牆 UI
5. 小測驗 UI
6. 全站 FAQ
7. 全站媒體素材插槽

## P2｜可在第一場前視時間完成，或留第二階段
1. Firebase 即時投票
2. 成果牆自動同步
3. 管理員模式
4. 問卷完成狀態判定
5. 作品審核後上牆
6. PDF 講義產出頁或下載頁

---

# 15. 素材待補清單

## 15.1 必備圖像素材
- 首頁 Hero 圖
- 三大成果示意圖
- 個人 3D 公仔範例
- 親子 3D 公仔範例
- 寵物 3D 公仔範例
- 6 款 LINE 貼圖風格包範例
- NotebookLM 研究 / 簡報 / 資訊圖表示例
- 投票牆 mockup
- 成果牆 mockup
- LINE 講義領取流程圖

## 15.2 必備截圖
- ChatGPT 登入與上傳圖
- GPT 開啟頁
- NotebookLM 建筆記本
- NotebookLM Note 轉 Source
- NotebookLM Deep Research
- LINE 拍貼下載與操作

## 15.3 必備錄影
- 3D 公仔生成示範
- 旅遊 GPT 三輪問答示範
- NotebookLM 接續研究示範
- LINE 拍貼裁切與送審示範

---

# 16. 建議的網站內容導航方式

## 16.1 現場課程模式
導覽應提供「依課程順序前進」：
- 下一段教學
- 回到上一段
- 當前階段進度

## 16.2 自主複習模式
課後講義頁應允許學員自由跳轉：
- 想重做公仔
- 想重用旅遊 GPT
- 想複製貼圖提示詞
- 想看 NotebookLM 操作

---

# 17. 後續開發最推薦路線

## Step 1｜先建立網站骨架
- Astro 初始化
- Layout 完成
- 10 頁空白模板
- 導覽完成

## Step 2｜填入核心教學內容
- 首頁
- 課前準備
- 公仔頁
- 旅遊規劃師頁
- LINE 貼圖頁
- 問卷講義頁

## Step 3｜補齊互動元件
- PromptCard
- Copy 按鈕
- QuizCard
- Progress Tracker

## Step 4｜補 NotebookLM 與成果互動
- NotebookLM 頁
- 投票 UI
- 成果牆 UI

## Step 5｜串接外部系統
- Firebase 投票
- 成果牆資料源
- LINE 講義領取話術與回覆訊息

---

# 18. 一句話給開發者

> 這個網站不是一般活動頁，而是「一場 3.5 小時工作坊的現場操作系統」。請優先確保手機易用、任務清楚、提示詞好複製、額度不足有備案、作品成果能被展示與互動。

