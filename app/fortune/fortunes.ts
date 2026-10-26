export type Fortune = {
  level: string;
  color: string;
  message: string;
  good: string;
  bad: string;
};

export const FORTUNES: Fortune[] = [
  { level: "大吉", color: "#d92d20", message: "萬事順心，貴人相助，今天做什麼都容易成功。", good: "開啟新計畫、表達心意", bad: "驕傲自滿" },
  { level: "中吉", color: "#e8590c", message: "穩中有進，付出的努力會看見回報。", good: "持續累積、整理待辦", bad: "拖延" },
  { level: "小吉", color: "#f08c00", message: "平順之中有小確幸，留意身邊的好事。", good: "與朋友聚餐、學習新事物", bad: "與人比較" },
  { level: "吉", color: "#2f9e44", message: "平安順遂，照著節奏走就好。", good: "處理例行事務", bad: "衝動消費" },
  { level: "末吉", color: "#1c7ed6", message: "先苦後甘，耐心等候，好事在後頭。", good: "多做準備、早點休息", bad: "急著下決定" },
  { level: "凶", color: "#7048e8", message: "事情容易遇到阻礙，放慢腳步、謹慎行事。", good: "檢查細節、請教他人", bad: "簽約、與人爭執" },
  { level: "大凶", color: "#495057", message: "今天諸事不宜，保守為上，撐過今天就好。", good: "休息、少出門", bad: "冒險、做重大決定" },
];
