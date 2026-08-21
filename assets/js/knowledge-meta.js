// 知识卡元数据：难度、用时、推荐学习顺序（主线）
// 在 knowledge-index.js 之前加载
var DIFF_LABEL = { 1: "入门", 2: "进阶", 3: "拔高" };

// 推荐学习顺序（随主线学习）：框架 → 防电击主线 → 能量/防火/热量 → 机械/辐射/化学 → EMC → 通用/医疗 → 认证
var RECOMMENDED_ORDER = [
  "stdguide", "protection", "productclass", "access", "cti", "leakage", "grounding", "selv",
  "energy", "components", "temperature", "firetests", "flame", "fire-design", "battery",
  "mechanical", "functional", "optical", "radhaz", "emc", "dmcm", "harmonic", "transient",
  "ip", "ik", "environment", "rohs", "explosion", "biocompat", "risk", "software", "certprocess"
];

// 每张卡：难度（1 入门 / 2 进阶 / 3 拔高）、用时（分钟）
var CARD_META = {
  stdguide: { diff: 1, time: 10 },
  protection: { diff: 1, time: 15 },
  productclass: { diff: 1, time: 15 },
  access: { diff: 1, time: 10 },
  cti: { diff: 2, time: 15 },
  leakage: { diff: 2, time: 15 },
  grounding: { diff: 2, time: 10 },
  selv: { diff: 2, time: 10 },
  energy: { diff: 2, time: 10 },
  components: { diff: 2, time: 15 },
  temperature: { diff: 2, time: 15 },
  firetests: { diff: 2, time: 15 },
  flame: { diff: 2, time: 10 },
  "fire-design": { diff: 3, time: 15 },
  battery: { diff: 2, time: 15 },
  mechanical: { diff: 2, time: 10 },
  functional: { diff: 3, time: 15 },
  optical: { diff: 2, time: 10 },
  radhaz: { diff: 2, time: 10 },
  emc: { diff: 2, time: 15 },
  dmcm: { diff: 2, time: 10 },
  harmonic: { diff: 2, time: 10 },
  transient: { diff: 3, time: 10 },
  ip: { diff: 1, time: 10 },
  ik: { diff: 1, time: 10 },
  environment: { diff: 2, time: 15 },
  rohs: { diff: 2, time: 10 },
  explosion: { diff: 3, time: 15 },
  biocompat: { diff: 3, time: 10 },
  risk: { diff: 3, time: 15 },
  software: { diff: 3, time: 10 },
  certprocess: { diff: 2, time: 15 }
};

// 返回某张卡在主线里的前置/后续
function mainLineNeighbors(id) {
  var i = RECOMMENDED_ORDER.indexOf(id);
  return {
    prev: i > 0 ? RECOMMENDED_ORDER[i - 1] : null,
    next: i >= 0 && i < RECOMMENDED_ORDER.length - 1 ? RECOMMENDED_ORDER[i + 1] : null
  };
}

// 七大安全因素学习主线（顶部可切换标签）：核心问题 → 步骤 → 一句话记住
var MAIN_LINES = [
  { id: "shock", emoji: "⚡", title: "防电击", color: "#7a4e2d",
    question: "碰到危险电压会不会出事？",
    steps: [
      { t: "定类别", d: "I 类接地 / II 类双重 / III 类 SELV", href: "knowledge-detail.html?id=productclass" },
      { t: "定绝缘", d: "基本 / 附加 / 加强 / 双重", href: "knowledge-detail.html?id=protection" },
      { t: "查距离", d: "爬电 + 间隙（加强 = 2×）", href: "./clearance.html" },
      { t: "定耐压", d: "基本 1500 / 加强 3000V", href: "./hipot.html" },
      { t: "测泄漏", d: "I 类对地 / II 类接触", href: "knowledge-detail.html?id=leakage" }
    ],
    memo: "绝缘类型是总开关——它同时决定爬电、间隙、耐压三个数值。" },
  { id: "energy", emoji: "💥", title: "能量危险", color: "#ff9f0a",
    question: "能量源会不会灼伤、点燃？",
    steps: [
      { t: "找能量源", d: "大电容、低压大电流、电池", href: "knowledge-detail.html?id=energy" },
      { t: "分 ES 级", d: "ES1 / ES2 / ES3", href: "knowledge-detail.html?id=energy" },
      { t: "限能 / 保护", d: "泄放、保险丝、限流", href: "knowledge-detail.html?id=components" },
      { t: "电池热失控", d: "BMS 四道防线", href: "knowledge-detail.html?id=battery" }
    ],
    memo: "低压大电流、大电容、电池短路，能量照样能伤人——先限能，再谈其他。" },
  { id: "fire", emoji: "🔥", title: "防火", color: "#ff3b30",
    question: "起火后烧不烧得大、传不传得开？",
    steps: [
      { t: "找点火源", d: "过载、短路、电弧、热失控", href: "knowledge-detail.html?id=fire-design" },
      { t: "断起火链", d: "保险丝、限能、热保护", href: "knowledge-detail.html?id=fire-design" },
      { t: "选阻燃材料", d: "V-0 / 灼热丝 / CTI", href: "knowledge-detail.html?id=flame" },
      { t: "三件套验证", d: "灼热丝 / 针焰 / 球压", href: "knowledge-detail.html?id=firetests" }
    ],
    memo: "防火不是选个 V-0，而是沿起火链逐段断链。" },
  { id: "thermal", emoji: "🌡️", title: "热量危险", color: "#d6a400",
    question: "发热会不会烫伤、让材料老化？",
    steps: [
      { t: "定基准温度", d: "25℃ 还是 40℃", href: "knowledge-detail.html?id=temperature" },
      { t: "算温升", d: "ΔT = P×Rth 或 P/(h·A)", href: "./tools.html" },
      { t: "对照限值", d: "绕组 / 外壳 / 结温", href: "knowledge-detail.html?id=temperature" },
      { t: "耐热验证", d: "球压 + RTI", href: "./materials.html" }
    ],
    memo: "先搞清楚标准用 25℃ 还是 40℃ 基准，否则温升判定全错。" },
  { id: "mechanical", emoji: "⚙️", title: "机械危险", color: "#4fb8e8",
    question: "运动、锐边、不稳会不会伤人？",
    steps: [
      { t: "找危险源", d: "运动件、锐边、跌落、不稳", href: "knowledge-detail.html?id=mechanical" },
      { t: "防护 / 联锁", d: "失效要安全", href: "knowledge-detail.html?id=mechanical" },
      { t: "安全距离", d: "ISO 13857", href: "./tools.html" },
      { t: "功能安全", d: "防护等级与验证", href: "knowledge-detail.html?id=functional" }
    ],
    memo: "联锁必须失效安全——断线/断电回安全状态，复位后不能自动重启。" },
  { id: "radiation", emoji: "☢️", title: "辐射危险", color: "#bf5af2",
    question: "光、射频、激光会不会伤身？",
    steps: [
      { t: "辨辐射类型", d: "光生物 / 射频 / 激光 / 电离", href: "knowledge-detail.html?id=radhaz" },
      { t: "分级", d: "RG / Class / SAR", href: "knowledge-detail.html?id=optical" },
      { t: "防护", d: "标签、屏蔽、距离", href: "knowledge-detail.html?id=radhaz" },
      { t: "验证", d: "按标准测量", href: "knowledge-detail.html?id=radhaz" }
    ],
    memo: "等级按危险度分、不是按亮度分——看不见的红外高功率激光最危险。" },
  { id: "chemical", emoji: "🧪", title: "化学危险", color: "#34c759",
    question: "有害物质是否合规？",
    steps: [
      { t: "辨有害物", d: "RoHS 十项 / SVHC", href: "knowledge-detail.html?id=rohs" },
      { t: "均质判定", d: "拆到均质材料", href: "knowledge-detail.html?id=rohs" },
      { t: "供应链文件", d: "报告对应物料批次", href: "knowledge-detail.html?id=rohs" },
      { t: "持续合规", d: "豁免 + 清单更新", href: "knowledge-detail.html?id=rohs" }
    ],
    memo: "RoHS 按均质材料判定，整机测一个样不算数。" }
];
