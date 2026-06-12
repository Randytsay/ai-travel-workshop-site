export interface PptScenario {
  title: string;
  emoji: string;
  visualStyle: string;
  prompt: string;
}

export interface MapStyle {
  name: string;
  emoji: string;
  target: string;
  prompt: string;
}

export interface GeneralTemplate {
  name: string;
  emoji: string;
  target: string;
  prompt: string;
}

export interface PosterStyle {
  name: string;
  emoji: string;
  target: string;
  role: string;
  material: string;
  tone: string;
  bg: string;
  note: string;
}

export const pptScenarios: Record<string, PptScenario> = {
  family: {
    title: '家族親情版',
    emoji: '🏠',
    visualStyle: '溫馨手繪風',
    prompt: `請讀取我提供的行程資料，並撰寫一份 20 頁的簡報大綱。要求如下：
1. 輸出格式：必須為 YAML 程式碼區塊。
2. 頁數限制：嚴格執行 20 頁。
3. 視覺風格：溫馨手繪風。
4. 目標觀眾：長輩與家人。
5. 情境設定：向家人說明這次旅遊的舒適度、安全性與溫馨亮點。
6. 分頁結構建議：
   - Slide 1: 封面 (溫暖的家族旅行主題)
   - Slide 2: 為什麼選擇這條路線 (強調安全、節奏慢、不累人)
   - Slide 3: 住宿亮點 (重點介紹寬敞與便利性)
   - Slide 4-12: 每日精選行程 (每日一頁，強調美食、美景與少步行)
   - Slide 13: 交通銜接說明 (強調包車或免提行李的舒適感)
   - Slide 14: 美食特輯 (針對長輩口味挑選的餐廳)
   - Slide 15: 伴手禮推薦 (長輩最愛的在地特產)
   - Slide 16: 預算概覽 (開銷分析，強調價值感)
   - Slide 17: 健康與安全保障 (醫藥準備、溫差提醒)
   - Slide 18: 準備清單 (行李建議、換匯、網卡)
   - Slide 19: 常見問題 FAQ
   - Slide 20: 結語與 Q&A (充滿心意的邀請)`
  },
  business: {
    title: '商務考察版',
    emoji: '💼',
    visualStyle: '簡約商務風',
    prompt: `請讀取我提供的行程資料，並撰寫一份 20 頁的簡報大綱。要求如下：
1. 輸出格式：必須為 YAML 程式碼區塊。
2. 頁數限制：嚴格執行 20 頁。
3. 視覺風格：簡約商務風。
4. 目標觀眾：公司同事或上司。
5. 情境設定：為了考察、團體建設或商務合作，展示行程的效率、CP 值與產業連結亮點。
6. 分頁結構建議：
   - Slide 1: 執行摘要 (Executive Summary)
   - Slide 2: 規劃願景與關鍵指標 (節省時間 vs 體驗價值)
   - Slide 3-11: 每日路徑分析 (強調地理銜接優化、推薦考察點)
   - Slide 12: 關鍵地標與其產業意義 (或團隊合影推薦點)
   - Slide 13: 交通工具與動線管理 (Logic & Efficiency)
   - Slide 14: 科技應用 (我們如何運用 AI 優化此行程)
   - Slide 15: 成本結構分析 (ROI 分析)
   - Slide 16: 後勤支援與應變計畫 (風險控管)
   - Slide 17: 團隊建設活動建議
   - Slide 18: 回國後的加值產出目標
   - Slide 19: 時程總覽 (Gantt Chart 風格)
   - Slide 20: 行動呼籲與決策請求 (Next Steps)`
  },
  friends: {
    title: '熱血好友版',
    emoji: '🥂',
    visualStyle: '現代流行風',
    prompt: `請讀取我提供的行程資料，並撰寫一份 20 頁的簡報大綱。要求如下：
1. 輸出格式：必須為 YAML 程式碼區塊。
2. 頁數限制：嚴格執行 20 頁。
3. 視覺風格：現代流行風。
4. 目標觀眾：熱血好友或死黨。
5. 情境設定：點燃大家的旅遊魂！強調必拍位、極限美食、潮流體驗與 IG 爆紅點。
6. 分頁結構建議：
   - Slide 1: 最終出團公告 (超酷視覺風格)
   - Slide 2: 全場最期待 3 大亮點 (High Lights)
   - Slide 3-12: 每日狂暴行程 (Emphasis on activities, vibes, photo spots)
   - Slide 13: 隱藏版深夜食堂與酒吧 (Secret Slots)
   - Slide 14: 社群素材攻略 (哪些點必錄 Reels/限動)
   - Slide 15: 敗家清單預測 (Must-buy)
   - Slide 16: 穿搭建議 (每日拍照 OOTD)
   - Slide 17: 總預算分析 (窮遊 vs 豪遊)
   - Slide 18: 行前注意事項 (必帶小物)
   - Slide 19: 分工表 (誰負責什麼)
   - Slide 20: 出發口號與群組連結`
  },
  kids: {
    title: '親子探險版',
    emoji: '🎈',
    visualStyle: '可愛黏土風',
    prompt: `請讀取我提供的行程資料，並撰寫一份 20 頁的簡報大綱。要求如下：
1. 輸出格式：必須為 YAML 程式碼區塊。
2. 頁數限制：嚴格執行 20 頁。
3. 視覺風格：可愛黏土風。
4. 目標觀眾：兒童與親子家庭。
5. 情境設定：將旅遊包裝成一場「史詩冒險挑戰」，讓孩子充滿參與感。
6. 分頁結構建議：
   - Slide 1: 冒險地圖開啟 (Adventure Awaits!)
   - Slide 2: 我們的超能力與隊友 (角色分配)
   - Slide 3-12: 每日冒險地圖 (每日一關卡，尋寶景點、任務關鍵字)
   - Slide 13: 動物與魔法世界 (行程中的主題樂園或動物驚喜)
   - Slide 14: 補給站大解析 (孩子最愛的甜點與特色餐廳)
   - Slide 15: 收集印章與貼紙任務區
   - Slide 16: 冒險小百科 (當地的簡單常識與語言教學)
   - Slide 17: 趣味小測驗 (Travel Quiz)
   - Slide 18: 英雄行李打包清單 (兒童專屬)
   - Slide 19: 旅行日記模板 (每日記錄框)
   - Slide 20: 冒險家宣誓與啟程`
  }
};

export const mapStyles: Record<string, MapStyle> = {
  claymorphism: {
    name: '親子黏土風',
    emoji: '🧸',
    target: '適合親子族群・媽媽會瘋傳',
    prompt: '3D 等距視角、黏土擬真質感 (Claymorphism)、馬卡龍色調，像微縮模型玩具。所有元素都像用黏土捏製而成，圓潤可愛。'
  },
  pixel: {
    name: '像素復古風',
    emoji: '👾',
    target: '適合動漫/年輕族群・IG 限動',
    prompt: '16-bit 復古像素藝術 (Pixel Art)。類似 90 年代 RPG 遊戲畫面或超級瑪利歐地圖，將景點設為關卡。色彩鮮豔明快，邊緣鋸齒狀，帶有可愛與懷舊的感覺。'
  },
  ukiyo: {
    name: '浮世繪風',
    emoji: '🎎',
    target: '適合長輩/文青・超有質感',
    prompt: '日本傳統浮世繪風格 (Ukiyo-e)。模仿葛飾北齋或歌川廣重的筆觸。使用大膽的輪廓線、平塗的色彩（普魯士藍、朱紅、赭黃）。背景加入海浪或富士山紋樣。泛黃紙張質感、靛藍與米色主調。'
  },
  cyberpunk: {
    name: '賽博龐克',
    emoji: '🌃',
    target: '適合都會年輕人・東京夜景',
    prompt: '賽博龐克 (Cyberpunk) 與未來主義。深色背景，搭配高對比的霓虹光（粉紅、青色、紫色）。建築物帶有科技感與發光招牌，營造東京夜景的科幻氛圍。'
  },
  minimalist: {
    name: '極簡線條',
    emoji: '✏️',
    target: '適合文青/極簡控・雜誌風',
    prompt: '現代極簡主義 (Minimalist Line Art)。類似 Kinfolk 雜誌風格。大量留白，使用黑色細線條描繪輪廓，僅在重點處點綴低飽和度的莫蘭迪色系。'
  },
  watercolor: {
    name: '日式水彩',
    emoji: '🌸',
    target: '經典款・溫馨旅遊',
    prompt: '溫暖、迷人、手繪水彩插畫。絕非照片寫實風格。使用柔和的輪廓線、溫潤的紋理，以及舒適的色調（粉彩、暖黃、藍色與粉色，並帶有花卉裝飾）。氛圍：營造浪漫溫馨的感覺。'
  }
};

export const generalTemplates: Record<string, GeneralTemplate> = {
  multiday: {
    name: '多天總覽',
    emoji: '📅',
    target: '3–7 天行程・IG/小紅書',
    prompt: `請根據上面這份行程表，幫我生成一張「插畫風格」的旅遊攻略圖。

構圖需求：
- 版面比例：16:9 橫式（適合 IG / 小紅書）
- 排版風格：travel itinerary infographic、card layout，每一天一個卡片區塊
- 每個 Day 都要用大字標示：Day1、Day2…，搭配主要景點小插圖
- 圖中要畫出我提到的景點、街景、美食、飯店外觀

文字與圖像風格：
- 所有標題與標註「全部使用台灣繁體中文」
- 顏色：pastel color、warm tone
- 插畫風格：cute illustration、watercolor style
- 資訊清楚可讀、不擁擠，保留適當留白

整體氛圍：
- 像一本可愛又實用的「旅遊攻略 travel guide」
- 看起來適合分享到 IG / 小紅書 的旅遊懶人包圖卡

---

**以下是我的詳細行程：**`
  },
  oneday: {
    name: '一日時間軸',
    emoji: '🕐',
    target: '一日遊・半日遊',
    prompt: `請根據這份一日行程，生成一張「一日遊視覺化行程圖」。

構圖需求：
- 版面比例：9:16（適合 IG 限時動態）
- 排版方式：timeline infographic，以時間為主軸，由上到下
- 在圖上畫出簡化版 travel map，並用路線箭頭連接各景點
- 每個時間點搭配一個小插畫 icon（寺廟、展望台、購物街、餐廳）

風格設定：
- 文字全部使用繁體中文，時間與地名清楚易讀
- 插畫風格：flat illustration、bright colors、minimal style
- 整體偏 modern、簡潔，不要太多細節，以資訊清楚為主

請幫我設計成「旅行資訊圖 travel infographic」風格，看起來專業又好看。

---

**以下是我的詳細行程：**`
  },
  cheatsheet: {
    name: '懶人包',
    emoji: '📋',
    target: '景點/美食/住宿/交通',
    prompt: `請幫我生成一張旅遊懶人包資訊圖。

內容請包含四大區塊：
1. 必去景點：列出 4–5 個代表性景點
2. 必吃美食：列出 4–5 種代表性料理或店家類型
3. 建議住宿區域：說明 2–3 個適合住宿的地區
4. 交通方式：簡單介紹交通工具或票券

構圖與風格：
- 版面比例：1:1 square（適合 IG 貼文）
- 左側放大主視覺插畫：目的地地標（天際線、著名建築）
- 右側用 4 個卡片或方框區塊呈現文字資訊（card layout、checklist style）
- 風格：pastel color、kawaii illustration、clean layout

文字設定：
- 全部使用繁體中文標題與內容
- 標題字體大而清楚，內文字體略小但保持可讀
- 每個區塊用不同顏色標題列（section header）

---

**以下是我的詳細行程：**`
  },
  poster: {
    name: '復古海報',
    emoji: '🖼️',
    target: '掛畫・封面圖',
    prompt: `請幫我設計一張「旅行海報 Travel Poster」。

構圖與主題：
- 畫面中央為目的地代表場景（著名景點、地標）
- 前景可以有旅人剪影或裝飾元素
- 上方以大字寫城市名（全大寫）
- 下方小字寫一行英文標語

風格要求：
- art style: retro travel poster、vintage airline poster、mid-century modern、flat vector art
- 顏色: vintage color palette、warm tone、slightly faded
- 線條乾淨、形狀幾何化，不要太多小細節

版面與文字：
- 版面比例：2:3（適合海報印刷）
- 圖中英文字用全大寫、字體粗一點
- 左下角加上繁體中文補充說明

整體氛圍：
- 像老電影宣傳海報或老航空公司旅遊海報 (vintage airline poster)
- 風格一致，適合作為掛畫 / 縮圖使用

---

**以下是我的目的地資訊：**`
  },
  routemap: {
    name: '路線地圖',
    emoji: '🗺️',
    target: '跨城市・交通規劃',
    prompt: `請根據我的旅遊路線，生成一張地圖式旅遊攻略圖。

構圖需求：
- 版面比例：16:9
- 中央繪製簡化地圖（illustrated map）
- 在地圖上標示各城市位置，用圓點或地標圖示標記
- 用曲線箭頭連接各城市，箭頭上標示交通方式與時間

視覺風格：
- 地圖風格：hand-drawn、watercolor
- 顏色：bright colors、每個城市用不同顏色標示
- 每個城市旁邊用小卡片列出 2–3 個主要活動或景點
- 標註全部使用繁體中文

文字與資訊：
- 圖上方或左上角標題：旅遊路線名稱
- 每個城市名稱清楚標示
- 交通時間與方式標註在路線上

整體氛圍：
- 像旅遊書內頁的 route map
- 清楚、易讀、適合簡報或社群分享

---

**以下是我的路線規劃：**`
  },
  ppt: {
    name: '商業簡報',
    emoji: '💼',
    target: 'PPT・提案用',
    prompt: `請根據我提供的行程表，設計一張適合放在簡報裡的「視覺化行程總覽圖」。

構圖與排版：
- 比例：16:9，橫式，留白多，適合 PowerPoint / Google Slides
- 左側用簡化版地圖（城市位置標示）
- 右側用水平區塊，分別標題：Day 1, Day 2, Day 3...
- 每個 Day 區塊內，只列出 2–3 個關鍵活動與地點，搭配小圖示 icon

風格設定：
- 設計風格：clean presentation、minimal design、professional infographic
- 色彩：深藍＋金色，穩重但不老氣
- 圖示使用簡約線條圖示 (line icons)，不要太可愛風

文字：
- 標題使用繁體中文，如「○○ 5 天行程總覽」
- 英文關鍵字可以放在小標：Itinerary Overview, Highlight Activities
- 全部文字保持易讀，不要太小，不用手寫體

請讓整張圖看起來像專業旅遊顧問簡報中的行程總覽頁。

---

**以下是我的詳細行程：**`
  }
};

export const posterStyles: Record<string, PosterStyle> = {
  fairy: {
    name: '童話布偶繪本',
    emoji: '🧸',
    target: '療癒・高級手作感',
    role: '可愛布偶娃娃',
    material: '毛氈、絨布與刺繡線',
    tone: '溫暖粉彩色調（粉色、米白、蜜桃）',
    bg: '柔和粉彩天空、可愛雲朵與童話花園裝飾',
    note: '整體像高級手作立體繪本海報，圓潤溫馨、充滿童趣'
  },
  zakka: {
    name: '日系療癒雜貨',
    emoji: '☕',
    target: '手帳・票券・雜貨感',
    role: '日系雜貨風布偶',
    material: '柔軟奶茶色絨布與和紙感布料',
    tone: '奶茶色系、淡米色、莫蘭迪中性色',
    bg: '和紙紋理、手帳票券、旅行印章與行李吊牌',
    note: '整體像日系生活雜貨店的療癒插畫，有溫暖的手作手帳感'
  },
  luxury: {
    name: '高級精品海報',
    emoji: '💎',
    target: '品牌・大氣・光影',
    role: '精緻布偶角色（身著高級訂製造型服裝）',
    material: '高級訂製感毛氈與絨布',
    tone: '深淺強烈對比，搭配金色或象牙白點綴',
    bg: '精準留白背景、戲劇性聚光燈光影',
    note: '整體像精品品牌旅遊廣告主視覺，大器、簡潔、有國際感'
  },
  adventure: {
    name: 'Q版冒險地圖',
    emoji: '🗺️',
    target: '桌遊・任務・路線圖',
    role: 'Q版探險布偶隊（每個場景換不同造型）',
    material: '毛絨、縫線、鈕扣與刺繡表情',
    tone: '鮮明活潑的桌遊色彩（綠、棕、藍、紅）',
    bg: '地圖節點、任務路標、章印與路線箭頭',
    note: '整體像兒童冒險書封面地圖，活潑討喜'
  },
  candy: {
    name: '玻璃糖果色夢幻',
    emoji: '🍬',
    target: '透明感・果凍・夢境',
    role: '透明糖果色布偶',
    material: '透明感柔亮布料、粉嫩毛氈',
    tone: '糖果色、漸層光暈、柔焦夢幻色調',
    bg: '玻璃感光暈、糖果與果凍裝飾元素',
    note: '整體如玻璃糖果與果凍夢境世界，清透甜美'
  },
  collage: {
    name: '復古拼貼雜誌',
    emoji: '📰',
    target: '貼紙・票根・手作',
    role: '毛氈拼貼玩偶',
    material: '毛氈搭配撕紙、貼紙、票根與膠帶',
    tone: '暖色紙張質地、顆粒感復古印刷色調',
    bg: '手作拼貼元素：塗鴉、剪報、章印、Washi Tape',
    note: '整體像旅遊雜誌封面加手帳拼貼，適合收藏'
  },
  anime: {
    name: '動畫劇場海報',
    emoji: '🎬',
    target: '電影感・舞台・戲劇',
    role: '動畫角色風布偶（每幕換裝換臉）',
    material: '絨布與刺繡，姿勢誇張有戲劇性',
    tone: '鮮豔動畫色彩，富有層次感與戲劇感',
    bg: '舞台場景：鐵道、神社、商店街、城市夜景動畫化背景',
    note: '整體像動畫電影宣傳主視覺，精彩吸睛'
  },
  notebook: {
    name: '手帳插畫排版',
    emoji: '📓',
    target: '便利貼・doodle・日記',
    role: '手帳插畫貼紙風布偶',
    material: '布偶貼紙感呈現，仍保有毛絨縫線質感',
    tone: '螢光筆圈選色調搭配淡雅底色',
    bg: '便利貼、印章、星星圖案與可愛 doodle 裝飾',
    note: '整體像旅行手帳攤開的紀錄頁，適合收藏'
  },
  oriental: {
    name: '國風雅致可愛',
    emoji: '🏮',
    target: '和風・刺繡・質感',
    role: '和風雅緻布偶（身著簡化和服或刺繡服飾）',
    material: '米白絨布搭配淡金色刺繡',
    tone: '柔和米色、淡金、淺綠與粉色',
    bg: '櫻花、雲紋、紙燈籠、庭園元素',
    note: '整體像高雅溫暖的旅遊宣傳畫，既可愛又有文化氣息'
  },
  street: {
    name: '潮流街頭貼圖',
    emoji: '🧢',
    target: '年輕・社群・吸睛',
    role: '潮流布偶（換上帽子、墨鏡、球鞋造型）',
    material: '毛絨玩具搭配潮流配件貼紙感',
    tone: '強烈色塊（霓虹黃、電藍、珊瑚橙）',
    bg: 'sticker collage 拼貼、粗線條路線標記',
    note: '整體年輕吸睛，動感斜切構圖，適合社群爆紅'
  },
  dream: {
    name: '夢境水彩風',
    emoji: '🌊',
    target: '輕柔・空氣感・詩意',
    role: '水彩夢境布偶',
    material: '毛氈圓潤造型，背景水彩暈染質感',
    tone: '輕柔水彩色調（薰衣草、天藍、粉橙）空氣感強',
    bg: '水彩暈染城市線條、山景與海景',
    note: '整體色彩輕柔詩意，像夢裡的旅行日記，視覺舒服'
  },
  popup: {
    name: '兒童繪本立體場景',
    emoji: '📖',
    target: '立體童書・舞台模型',
    role: '立體紙雕布偶（立體紙雕加絨布玩偶混合質感）',
    material: '立體紙雕加絨布混合，像小型舞台模型',
    tone: '溫暖童書色調（奶油黃、天空藍、草地綠）',
    bg: '立體舞台模型場景：地標、花朵、雲朵與夜景燈光',
    note: '整體像翻開立體童書，溫暖親切非常討喜'
  }
};
