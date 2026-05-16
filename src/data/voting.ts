export type VoteWork = { id: string; type: 'doll' | 'sticker'; title: string; author: string; votes: number; image: string };
export const voteTabs = [{ key: 'all', label: '全部作品' },{ key: 'doll', label: '公仔作品' },{ key: 'sticker', label: '貼圖作品' }] as const;
export const voteWorks: VoteWork[] = [
{id:'d1',type:'doll',title:'出發吧！海島旅人',author:'Mia',votes:38,image:'🧳'},
{id:'d2',type:'doll',title:'親子東京冒險團',author:'Kelly',votes:32,image:'👨‍👩‍👧'},
{id:'d3',type:'doll',title:'毛孩旅行家',author:'Nina',votes:29,image:'🐶'},
{id:'s1',type:'sticker',title:'出發中！旅行貼圖包',author:'Joy',votes:41,image:'✈️'},
{id:'s2',type:'sticker',title:'姐妹玩翻沖繩',author:'Amy',votes:34,image:'🌺'},
{id:'s3',type:'sticker',title:'今天也要放假',author:'Chloe',votes:27,image:'🏖️'}
];
