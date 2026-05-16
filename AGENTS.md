# AI 旅遊規劃師工作坊網站 — 開發指南

## 這是什麼網站
互動式教學網站，服務 AI 旅遊規劃師工作坊的課前、課中、課後體驗。
10 個分頁，3 個核心成果（3D 公仔圖、旅遊需求整理、貼圖素材）。
詳細規格見 `docs/01-product-spec-v1.md`。

## 技術棧
- **Astro** + TypeScript（靜態網站 + 局部互動 islands）
- **Firebase Realtime Database**（即時投票，待實作）
- **Google Drive API**（成果牆素材讀取，待實作）
- **LINE 官方帳號**（講義領取，待實作）

## Source of Truth (開發準則)
Before planning or implementing, read these documents in order:

1. `docs/01-product-spec-v1.md`
2. `docs/02-wireframes-components-v1.md`
3. `docs/03-codex-dev-handoff-v1.md`

If there is any conflict:
- The latest development handoff document has the highest priority for implementation details.
- The product spec has the highest priority for product intent.

## MVP Priorities
Phase 1:
- Astro project scaffold
- 10 page routes
- Shared layout
- Desktop sidebar and mobile navigation
- Homepage, prep page, travel-planner page, survey page
- Prompt card component and copy button
- Placeholder slots for images and videos

Phase 2:
- Complete remaining static pages
- Build AI basics, doll maker, NotebookLM, sticker lab
- Add FAQs, progress tracker, quiz UI

Phase 3:
- Voting UI
- Gallery UI
- Firebase and GDrive integration placeholders

## 觸發詞與對應流程

### 開始新頁面
1. 讀 `docs/01-product-spec-v1.md` 確認該頁定位與必要元素
2. 讀 `docs/02-wireframes-components-v1.md` 確認該頁 wireframe 與所需元件
3. 讀 `docs/03-codex-dev-handoff-v1.md` 了解既有程式碼結構與 convention
4. 在 `src/pages/` 對應路由建立 `.astro` 檔
5. 從 `src/content/` 引入對應的內容模組（如 `dollPrompts.ts`）

### 改既有頁面
1. 確認改動範圍，列出涉及檔案
2. 若涉及 `src/content/` 模組，先改模組再改頁面
3. 跑 `npm run dev` 驗證
4. 不要改 `docs/` 裡的規格文件——那是 source of truth

### 新增內容模組
內容放 `src/content/{moduleName}.ts`，
格式見 `docs/01-product-spec-v1.md` §14 內容資料模組化原則。

### 設計系統
- 色彩：`src/styles/theme.css`（珊瑚橘主色、天空藍輔色、奶油白背景）
- 元件：讀 `docs/02-wireframes-components-v1.md` 的元件列表
- RWD：360px 最小寬度，底部導覽不遮內容

## Non-negotiable UX Rules
- Mobile-first
- Large readable text
- Clear CTAs
- Backup paths for ChatGPT/GPT/Gemini
- All prompts must have one-click copy
- Formal schedule only shows 13:30–17:00
- Do not list 17:00–17:30 in the published timetable

## 禁止事項
- 不要 hardcode 提示詞在 `.astro` 裡——統一放 `src/content/`
- 不要刪 `docs/` 裡的文件
- 不要把私人金鑰、Token 寫進程式碼——用 `.env`
- 不要破壞 Mobile RWD（每個元件都要在 360px 寬度測試）

## Official GPT Link
The travel-planner page must prominently link to:
https://chatgpt.com/g/g-6a0829f788b88191ac0643f6ee0d615d-ai-lu-you-gui-hua-shi-gong-zuo-fang-ban