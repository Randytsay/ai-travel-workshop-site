export const progressTasks = [
  { id: 'doll-maker-complete', label: '3D 公仔圖', path: '/doll-maker' },
  { id: 'travel-planner-complete', label: '旅遊需求', path: '/travel-planner' },
  { id: 'notebooklm-complete', label: '研究報告', path: '/notebooklm' },
  { id: 'sticker-lab-complete', label: '貼圖素材', path: '/sticker-lab' },
  { id: 'voting-complete', label: '參與投票', path: '/voting' },
  { id: 'survey-complete', label: '領取講義', path: '/survey' }
] as const;

export type TaskId = typeof progressTasks[number]['id'];
