export interface NavItem { label: string; path: string; short: string }

export const navItems: NavItem[] = [
  { label: '工作坊首頁', path: '/', short: '首頁' },
  { label: '課前準備', path: '/prep', short: '任務' },
  { label: 'AI 入門', path: '/ai-basics', short: 'AI' },
  { label: '3D 公仔', path: '/doll-maker', short: '公仔' },
  { label: '旅遊規劃師', path: '/travel-planner', short: '提示詞' },
  { label: 'NotebookLM', path: '/notebooklm', short: '研究' },
  { label: 'LINE 貼圖工坊', path: '/sticker-lab', short: '貼圖' },
  { label: '現場投票', path: '/voting', short: '投票' },
  { label: '成果牆', path: '/gallery', short: '成果' },
  { label: '問卷與講義', path: '/survey', short: '問卷' }
];
