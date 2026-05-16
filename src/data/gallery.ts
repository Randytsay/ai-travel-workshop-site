export type GalleryItem = { id: string; type: 'doll' | 'sticker' | 'planner'; title: string; owner: string; preview: string; desc: string };
export const galleryFilters = [{key:'all',label:'全部'},{key:'doll',label:'公仔'},{key:'sticker',label:'貼圖'},{key:'planner',label:'旅遊規劃'}] as const;
export const galleryItems: GalleryItem[] = [
{id:'g1',type:'doll',title:'沖繩親子公仔',owner:'Wendy',preview:'🧒',desc:'溫暖旅行感 3D 公仔成果。'},
{id:'g2',type:'sticker',title:'出國倒數貼圖',owner:'Iris',preview:'🎒',desc:'8 格旅行日常貼圖素材。'},
{id:'g3',type:'planner',title:'京都三日散步計畫',owner:'Tina',preview:'🗺️',desc:'AI 旅遊需求整理與行程草案。'},
{id:'g4',type:'doll',title:'毛孩機場時尚款',owner:'Lisa',preview:'🐾',desc:'寵物主題可愛公仔。'},
{id:'g5',type:'sticker',title:'姐妹旅拍語錄',owner:'Momo',preview:'📸',desc:'輕鬆分享型貼圖。'}
];
