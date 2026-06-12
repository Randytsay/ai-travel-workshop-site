export const siteConfig = {
  surveyUrl: '#',
  surveyApiUrl: '', // 貼上 Google Apps Script 部署後取得的網頁應用程式 URL
  officialLineUrl: '#',
  workshopGroupUrl: '#',
  cashbackInterestUrl: '#',
  externalLinks: {
    travelPlannerGptUrl:
      'https://chatgpt.com/g/g-6a0829f788b88191ac0643f6ee0d615d-ai-lu-you-gui-hua-shi-gong-zuo-fang-ban',
    geminiUrl: 'https://gemini.google.com/',
    travelPlannerGemUrl: 'https://gemini.google.com/gem/1tBw-WprmTYo9C-j9-nV0SqiEtWWbg1iI?usp=sharing',
    notebookLmUrl: 'https://notebooklm.google.com/'
  },
  featureFlags: {
    enableCashbackBridgeCard: true,
    enableVoting: false,
    enableGallery: false
  }
} as const;
