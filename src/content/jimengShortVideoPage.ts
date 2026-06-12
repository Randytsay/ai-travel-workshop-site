export const setupSummary = [
  {
    title: 'iPhone',
    text: '先確認 Apple 帳號是否適合切換地區，再到中國大陸 App Store 搜尋「即夢AI」與「抖音」，完成手機驗證登入。'
  },
  {
    title: 'Android',
    text: '用手機瀏覽器開啟官方網站下載 APK，安裝「即夢AI」與「抖音」，允許一次性的安裝權限後登入。'
  },
  {
    title: '課堂體驗',
    text: '從即夢或抖音找到想模仿的範例，點「做同款」，替換照片或提示詞，先產出一支可保存、不急著公開的短影音。'
  }
];

export const iosSteps = [
  {
    title: '打開 Apple ID 設定',
    text: '首先我們打開 iPhone 的「設定」，點擊上方的「Apple ID」＞「媒體與購買項目」。',
    shot: '媒體與購買項目選單',
    filename: 'ios-region-01-account.webp'
  },
  {
    title: '進入檢視帳號',
    text: '接下來點選「檢視帳號」，進行驗證或輸入解鎖密碼，再按下「國家或地區」的選項。',
    shot: '進入國家與地區畫面',
    filename: 'ios-region-02-country.jpg'
  },
  {
    title: '切換國家或地區',
    text: '按下「更改國家或地區」＞「中國大陸」，並確認條款沒問題後，點選「同意」。',
    shot: '同意條款與選擇中國大陸',
    filename: 'ios-region-03-china-mainland.jpg'
  },
  {
    title: '填寫付款與郵編資訊',
    text: '接下來我們在「付款方式」的地方選擇「無」，下方的「郵政編碼」請任意輸入「6位數字」，其他必填項目皆不必提供真實資訊；輸入好點選「下一頁」。',
    shot: '付款方式選無，輸入六位郵政編碼',
    filename: 'ios-region-04-billing.jpg'
  },
  {
    title: '無法選擇「無」的排除方法',
    text: '而有些人的付款方式無法選擇「無」，可能是因為你目前有購買紀錄尚未付清款項（例如：iCloud 雲端空間），才會遭到系統拒絕；沒問題的話，只要按下「完成」就OK了！',
    shot: '付款方式若無「無」選項的排除提示',
    filename: 'ios-region-05-no-none.jpg'
  },
  {
    title: '跨區下載抖音與即夢',
    text: '最後前往 App Store，就會發現介面變成簡體中文，代表你成功跨區了！只要搜尋「抖音」、「即夢」，就可以下載陸版的 App 啦！',
    shot: 'App Store 中搜尋並下載即夢與抖音',
    filename: ''
  }
];

export const androidSteps = [
  {
    title: '下載與開啟安裝',
    text: '在手機下載完 APK 檔案後，於瀏覽器下載清單或檔案管理員點擊開啟，開始進行安裝。',
    shot: '下載完成開啟安裝',
    filename: 'step-01.png'
  },
  {
    title: '同意服務協定',
    text: '首次啟動抖音，請閱讀並點擊「同意並繼續」以載入應用程式。',
    shot: '抖音隱私協定同意',
    filename: 'step-02.png'
  },
  {
    title: '系統安裝安全提示',
    text: '若手機系統跳出安裝安全提示，請點擊「繼續安裝」，確認安裝抖音應用程式。',
    shot: '繼續安裝提示',
    filename: 'step-03.png'
  },
  {
    title: '開啟允許安裝未知來源',
    text: '當系統提示安全警示時，點選設定並開啟「允許來自此來源的應用程式」，以便順利安裝外部 APK 檔。',
    shot: '允許安裝未知來源',
    filename: 'step-04.png'
  },
  {
    title: '抖音登入介面',
    text: '安裝完成後開啟抖音，進入登入介面，準備進行帳號驗證。',
    shot: '抖音登入介面',
    filename: 'step-05.png'
  },
  {
    title: '手機驗證碼登入',
    text: '輸入手機號碼並獲取簡訊驗證碼，輸入後即可順利完成抖音帳號登入。',
    shot: '手機驗證登入',
    filename: 'step-06.png'
  },
  {
    title: '即夢 AI 同意服務協定',
    text: '安裝並開啟即夢 AI（Dreamina）後，勾選並同意用戶協定與隱私政策。',
    shot: '即夢同意協定',
    filename: 'step-07.png'
  },
  {
    title: '選擇抖音快捷登入',
    text: '在即夢登入畫面中，選擇「抖音登入」選項，此方式最為方便快速。',
    shot: '即夢登入畫面',
    filename: 'step-08.png'
  },
  {
    title: '授權登入即夢 AI',
    text: '系統會跳轉至抖音授權頁，請點擊「同意」以授權即夢 AI 連結您的抖音帳號登入。',
    shot: '抖音授權登入即夢',
    filename: 'step-09.png'
  },
  {
    title: '建立 AI 分身頭像',
    text: '首次進入即夢，可依指示建立個人 AI 分身或頭像，為後續的同款演繹做準備。',
    shot: '建立 AI 分身',
    filename: 'step-10.png'
  },
  {
    title: '選擇「拍同款」進行創作',
    text: '進入即夢 AI 首頁或探索頁，選擇您喜歡的影片範本，點選「拍同款」即可開始上傳素材生成您的 AI 短影音。',
    shot: '拍同款畫面',
    filename: 'step-11.png'
  }
];

export const screenshotAssetFolder = '/images/jimeng/';

export const tutorialReferences = [
  {
    label: '即夢 AI 完整操作手冊',
    href: 'https://runyoung0613.github.io/jimeng-tutorial/',
    source: '外部圖文教學',
    note: '包含即夢平台簡介、快速上手、影片生成、動作模仿、提示詞與運鏡等完整章節。'
  },
  {
    label: 'Dreamina AI / 即夢 AI 教學',
    href: 'https://futureweb.pro/tools/ai/dreamina-ai/',
    source: '外部圖文教學',
    note: '適合補充說明即夢 / Dreamina 的圖片與影片生成能力、基本功能與使用場景。'
  },
  {
    label: '即夢AI | 視頻生成 V1.2 全站教程',
    href: 'https://articles.waytoagi.com/docs/S2rAwESKkiK1DkkCmglcGRU9nAg/',
    source: '外部知識庫',
    note: '可作為助教備課參考，補充圖生影片、首尾幀與影片模型設定的操作概念。'
  },
  {
    label: '抖音官方：如何拍同款',
    href: 'https://www.douyin.com/video/6946396406894710024',
    source: '抖音影片',
    note: '抖音官方帳號的拍同款教學影片，適合放給學員自行點開觀看。'
  }
];
