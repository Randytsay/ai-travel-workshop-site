export interface PptScenario {
  title: string;
  emoji: string;
  visualStyle: string;
  prompt: string;
}

export interface InfographicStyle {
  name: string;
  emoji: string;
  target: string;
  prompt: string;
}

export interface PodcastScenario {
  title: string;
  emoji: string;
  focusRole: string;
  prompt: string;
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

export const infographicStyles: Record<string, InfographicStyle> = {
  watercolor: {
    name: '日式水彩',
    emoji: '🌸',
    target: '經典款・溫馨旅遊',
    prompt: '溫暖、迷人、手繪水彩插畫。絕非照片寫實風格。使用柔和的輪廓線、溫潤的紋理，以及舒適的色調（粉彩、暖黃、藍色與粉色，並帶有花卉裝飾）。氛圍：營造浪漫溫馨的感覺。'
  },
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
  }
};

export const podcastScenarios: Record<string, PodcastScenario> = {
  family: {
    title: '家族親情版',
    emoji: '🏠',
    focusRole: '引導者與溫馨小助手',
    prompt: `你現在是 NotebookLM 語音摘要的主持人。這趟旅行是專為長輩與家人設計的。
在對談中，請兩位主持人表現出以下風格：
- 主持人 A（引導者）：語氣成熟穩重、充滿耐心，著重解說行程中的慢活步調、無障礙舒適度與在地文化。
- 主持人 B（小助手）：語氣熱情孝順，著重分享行程中適合長輩的傳統美食、拍照點與溫馨安排。
請著重討論：行程中「不趕路、免提重物」的慢活安排；精選適合長輩的餐點口味與伴手禮；並以溫馨親切、如同在客廳聊天的氛圍來介紹。不可使用冷酷的商務口氣。`
  },
  business: {
    title: '商務考察版',
    emoji: '💼',
    focusRole: '分析師與亮點觀察家',
    prompt: `你現在是 NotebookLM 語音摘要的主持人。這趟旅行是商務考察與團隊建設。
在對談中，請兩位主持人表現出以下風格：
- 主持人 A（分析師）：語氣理性、語速沉穩，著重分析行程的效率、CP值、後勤管理與路徑規劃的邏輯。
- 主持人 B（觀察家）：專業敏銳，著重分享景點的市場趨勢、團隊凝聚力亮點與值得借鑒的創新體驗。
請著重討論：商務考量與團隊成長機會；交通與時間運用的優化；行程的預算效益與投資報酬率。整體要像一檔專業的矽谷科技談話節目。`
  },
  friends: {
    title: '熱血好友版',
    emoji: '🥂',
    focusRole: '高能量死黨默契組合',
    prompt: `你現在是 NotebookLM 語音摘要的主持人。這趟旅行是死黨朋友的出團狂歡。
在對談中，請兩位主持人表現出以下風格：
- Host A & B：兩人像是一對極有默契、愛開玩笑的死黨，對談高能量、幽默、充滿興奮感，偶爾會為了爭論哪天行程最酷而鬥嘴。
請著重討論：IG 與抖音的拍照打卡熱點；絕對不能錯過的特色美食與深夜酒吧；穿搭與血拼清單。對話中可使用時下流行語，營造出「我們明天就要出發了」的興奮派對氣氛！`
  },
  kids: {
    title: '親子探險版',
    emoji: '🎈',
    focusRole: '冒險隊長與好奇小夥伴',
    prompt: `你現在是 NotebookLM 語音摘要的主持人。這趟旅行是帶孩子出發的親子冒險之旅。
在對談中，請兩位主持人表現出以下風格：
- 主持人 A（冒險隊長）：充滿童心與活力，稱呼聽眾為「小小冒險家」，語氣像主持受歡迎的兒童節目。
- 主持人 B（好奇小隊員）：語氣單純好奇，會經常發問，引導出旅行小常識。
請著重討論：如何將景點包裝成好玩的尋寶遊戲；孩子會興奮的樂園、手作體驗或動物驚喜；以及必備的補給餐點與安全小提醒。語氣要生動活潑，充滿故事感與童趣。`
  }
};
