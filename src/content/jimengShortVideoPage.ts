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
    title: '下載 APK 安裝包',
    text: '使用上方 Android 快捷下載通道，點擊按鈕或直接用手機掃描 QR Code 下載 APK。若瀏覽器提示「檔案可能有害」或「可能有風險」，請選擇「仍要下載」或「繼續下載」。',
    shot: '',
    filename: ''
  },
  {
    title: '允許安裝未知來源',
    text: '第一次安裝 APK 時，Android 可能會要求允許此瀏覽器或檔案管理員安裝應用程式。請開啟「允許來自此來源」設定，安裝完成後可再關閉。',
    shot: '',
    filename: ''
  },
  {
    title: '完成安裝與登入',
    text: '依序安裝即夢AI與抖音，開啟後使用手機號碼登入並完成簡訊驗證。如果安裝被擋，請檢查系統版本、儲存空間或系統安全防護設定。',
    shot: '',
    filename: ''
  }
];

export const sameStyleSteps = [
  {
    title: '找範例',
    text: '在即夢AI的「探索」或抖音影片中找到想跟做的短影音範例。課堂建議先選畫面簡單、人物少、時長短的範例。',
    shot: '拍探索頁或範例作品頁，畫面中能看到作品封面與入口。',
    filename: 'same-style-01-template.webp'
  },
  {
    title: '點做同款',
    text: '在作品頁找到「做同款」或相近按鈕，進入範本頁。即夢AI的 App Store 介紹也列出「做同款」作為功能之一。',
    shot: '拍「做同款」按鈕或進入同款流程的頁面。',
    filename: 'same-style-02-button.webp'
  },
  {
    title: '換成自己的素材',
    text: '依畫面提示上傳照片、替換文字或調整提示詞。人物照片建議用正面、光線充足、背景簡單的照片。',
    shot: '拍上傳照片、替換素材或提示詞設定畫面，照片請用測試素材。',
    filename: 'same-style-03-replace.webp'
  },
  {
    title: '生成與保存',
    text: '送出生成後等待完成，先保存到手機相簿，再決定是否分享到抖音或其他平台。上課時不需要公開發布。',
    shot: '拍生成等待頁與完成作品頁，避免露出個人帳號資訊。',
    filename: 'same-style-04-export.webp'
  }
];

export const screenshotChecklist = [
  'iOS：ios-region-01-account.webp 到 ios-region-05-no-none.jpg。',
  '做同款：same-style-01-template.webp 到 same-style-04-export.webp。',
  '截圖請放在 public/images/jimeng/，並遮住完整手機號、驗證碼、付款資料、Apple ID 信箱與個人照片原圖。'
];

export const screenshotAssetFolder = '/images/jimeng/';

export const faqItems = [
  {
    q: 'iPhone 一定要把自己的 Apple ID 改到中國大陸嗎？',
    a: '不一定。若學員擔心訂閱、付款或既有 App 受到影響，課堂更穩的做法是準備一個只用來下載 App 的教學用 Apple 帳號。'
  },
  {
    q: 'Android 可以從第三方 APK 站下載嗎？',
    a: '不建議。工作坊面向一般學員，優先走官方網站或手機品牌商店；第三方 APK 站可能有版本、簽章與安全風險。'
  },
  {
    q: '沒有中國大陸手機號可以登入嗎？',
    a: '登入頁通常可以切換國碼，但實際可用性會隨平台政策變動。課前最好用主辦方準備的測試手機完整走一次。'
  },
  {
    q: '可以直接使用別人教學網站的截圖嗎？',
    a: '建議不要。最安全的方式是依照本頁的截圖清單，用自己的手機重拍流程圖，再放進工作坊頁面。'
  }
];

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

export const officialLinks = [
  {
    label: 'Apple 官方：更改 Apple 帳戶國家或地區',
    href: 'https://support.apple.com/zh-tw/118283',
    note: 'Apple 說明更改地區前需處理帳戶餘額、訂閱、付款方式等限制。'
  },
  {
    label: '即夢AI App Store 中國大陸頁',
    href: 'https://apps.apple.com/cn/app/%E5%8D%B3%E6%A2%A6ai-%E6%8A%96%E9%9F%B3%E6%97%97%E4%B8%8Bai%E5%9B%BE%E7%89%87%E5%92%8C%E8%A7%86%E9%A2%91%E5%B7%A5%E5%85%B7/id6503676563',
    note: '確認 iPhone 需求、開發者、功能描述與「做同款」功能。'
  },
  {
    label: '即夢AI 官方網站',
    href: 'https://www.jimeng.com/',
    note: '官方介紹文 / 圖生影片、中文創作、首尾幀控制與 AI 繪圖功能。'
  },
  {
    label: '抖音 App Store 中國大陸頁',
    href: 'https://apps.apple.com/cn/app/%E6%8A%96%E9%9F%B3/id1142110895',
    note: '確認 iOS 需求、開發者與 App 介紹。'
  },
  {
    label: '抖音官方下載頁',
    href: 'https://www.douyin.com/downloadpage/app',
    note: '官方列出 iOS、Android 行動端下載入口與執行環境。'
  }
];
