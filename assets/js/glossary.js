var GLOSSARY = [
  { t: "CTI", f: "相对漏电起痕指数", d: "IEC 60112 滴液试验测得的抗漏电起痕能力，材料组划分依据。", u: "pages/knowledge.html#cti" },
  { t: "PLC", f: "漏电起痕等级（UL）", d: "UL 黄卡上的 CTI 分级：PLC0 ≥600 … PLC5 <100。", u: "pages/knowledge.html#cti" },
  { t: "MOPP / MOOP", f: "患者防护 / 操作者防护方式", d: "医疗设备中保护患者和操作者的绝缘/间距要求，医用安规核心。", u: "pages/hipot.html" },
  { t: "SELV", f: "安全特低电压", d: "与危险电压可靠隔离、可触摸的低压电路。", u: "pages/knowledge.html#selv" },
  { t: "PELV", f: "保护特低电压", d: "类似 SELV，但电路一点接地或可触及导体接地。", u: "pages/knowledge.html#selv" },
  { t: "ES1 / ES2 / ES3", f: "电气能源分级", d: "IEC 62368-1 按可触及能量对电气源分级，决定防护要求。", u: "pages/knowledge.html#energy" },
  { t: "OVC", f: "过电压类别（Ⅰ–Ⅳ）", d: "按安装位置划分的暂态过电压等级，决定电气间隙。", u: "pages/clearance.html" },
  { t: "污染等级（PD）", f: "Pollution Degree 1–3", d: "绝缘表面环境脏污程度，决定爬电距离。", u: "pages/creepage.html" },
  { t: "SPD", f: "浪涌保护器", d: "限制浪涌电压的器件或组合，如 MOV、GDT。", u: "pages/surge.html" },
  { t: "MOV", f: "压敏电阻", d: "电源口常用第一级浪涌保护，老化后可能短路着火。", u: "pages/surge.html" },
  { t: "GDT", f: "气体放电管", d: "泄放能力大、响应较慢，适合第一级，注意续流。", u: "pages/surge.html" },
  { t: "TVS", f: "瞬态抑制二极管", d: "响应最快、能量小，适合末级精确钳位。", u: "pages/surge.html" },
  { t: "TSS", f: "半导体放电管", d: "信号端口浪涌保护，导通后近似短路。", u: "pages/surge.html" },
  { t: "Hipot", f: "耐压测试", d: "在绝缘两端施加高电压验证介电强度。", u: "pages/hipot.html" },
  { t: "ESD", f: "静电放电", d: "人体/设备接触放电，抗扰试验之一。", u: "pages/knowledge.html#emc" },
  { t: "EFT", f: "电快速瞬变脉冲群", d: "继电器/电机换向产生的脉冲串骚扰。", u: "pages/knowledge.html#emc" },
  { t: "Surge", f: "浪涌", d: "雷击感应/操作过电压产生的高能脉冲。", u: "pages/surge.html" },
  { t: "RoHS", f: "有害物质限制指令", d: "限制铅、镉、汞、六价铬、PBB、PBDE 及 4 种邻苯。", u: "pages/knowledge.html#rohs" },
  { t: "REACH", f: "化学品注册评估许可", d: "欧盟化学品法规，SVHC 候选清单持续更新。", u: "pages/knowledge.html#rohs" },
  { t: "SVHC", f: "高关注物质", d: "REACH 清单中的高度关注物质，超阈值需通报/声明。", u: "pages/knowledge.html#rohs" },
  { t: "WEEE", f: "电子废弃物指令", d: "电子电气产品回收、登记与标志要求。", u: "pages/knowledge.html#rohs" },
  { t: "RTI", f: "相对温度指数", d: "材料长期使用温度（电气/机械），黄卡栏位。", u: "pages/materials.html" },
  { t: "HWI", f: "热丝引燃", d: "黄卡栏位，数值越低抗引燃越好。", u: "pages/materials.html" },
  { t: "HAI", f: "高电流电弧引燃", d: "黄卡栏位，数值越低抗电弧引燃越好。", u: "pages/materials.html" },
  { t: "UL94 V-0/V-1/V-2", f: "阻燃等级", d: "垂直燃烧试验分级，V-0 最严；还有 5VA/5VB。", u: "pages/knowledge.html#flame" },
  { t: "IP", f: "防护等级（IPXX）", d: "防尘（0–6）与防水（0–8）代码。", u: "pages/knowledge.html#ip" },
  { t: "RMS", f: "有效值", d: "持续电压的发热等效值，爬电与耐压查表用。", u: "pages/clearance.html" },
  { t: "Peak", f: "峰值", d: "电压瞬时最大值，间隙看峰值/冲击。", u: "pages/clearance.html" },
  { t: "CB", f: "IECEE CB 体系", d: "国际互认的测试证书，可转多国认证。", u: "pages/certification.html" },
  { t: "CCC", f: "中国强制性产品认证", d: "中国强制目录内产品的认证标志。", u: "pages/certification.html" },
  { t: "CE-LVD", f: "欧盟低压指令", d: "欧盟电子电气产品安全指令，配合 EMC/RED 等。", u: "pages/certification.html" },
  { t: "RED", f: "欧盟无线电设备指令", d: "无线设备的射频、EMC 与安全要求。", u: "pages/certification.html" },
  { t: "EMC", f: "电磁兼容", d: "发射不超标、抗扰不失效。", u: "pages/knowledge.html#emc" },
  { t: "SAR", f: "比吸收率", d: "人体吸收射频能量的速率，无线设备限值要求。", u: "pages/knowledge.html#emc" },
  { t: "LPL", f: "雷电防护等级（Ⅰ–Ⅳ）", d: "建筑物防雷等级，决定外部防雷参数。", u: "pages/surge.html" },
  { t: "UN 38.3", f: "锂电池运输试验", d: "锂电池空运/海运前的 8 项运输试验。", u: "pages/knowledge.html#battery" },
  { t: "IEC 60664-1", f: "绝缘配合总则", d: "间隙、爬电、污染、海拔、过电压的母标准。", u: "pages/standards.html" },
  { t: "IEC 60335-1", f: "家用电器安全通用要求", d: "家电安全标准，对应 GB 4706.1。", u: "pages/standards.html" },
  { t: "IEC 62368-1", f: "音视频与 IT 设备安全", d: "基于危害的安全标准，对应 GB 4943.1。", u: "pages/standards.html" },
  { t: "IEC 60601-1", f: "医用电气设备安全", d: "医用设备安全与基本性能，对应 GB 9706.1。", u: "pages/standards.html" },
  { t: "Class I / II / III", f: "设备类别", d: "I 类接地保护、II 类双重绝缘、III 类 SELV 供电。", u: "pages/knowledge.html#protection" },
  { t: "双重绝缘", f: "基本 + 附加绝缘", d: "II 类产品的典型结构，不依赖保护接地。", u: "pages/hipot.html" },
  { t: "功能绝缘", f: "Functional Insulation", d: "仅保证正常工作，不提供防触电保护。", u: "pages/hipot.html" },
  { t: "接地连续性", f: "Ground Continuity", d: "保护接地回路阻抗测试，I 类产品关键试验。", u: "pages/knowledge.html#grounding" },
  { t: "PFC", f: "功率因数校正", d: "降低谐波电流的手段，LED 驱动/电源常见。", u: "pages/knowledge.html#harmonic" },
  { t: "GWFI", f: "灼热丝可燃性指数", d: "材料 30s 不持续燃烧的最高温度档。", u: "pages/knowledge.html#firetests" },
  { t: "GWIT", f: "灼热丝起燃温度", d: "材料起燃温度的判定值，常与 GWFI 配套使用。", u: "pages/knowledge.html#firetests" },
  { t: "针焰", f: "Needle Flame Test", d: "模拟小火焰引燃，验证火焰不蔓延（IEC 60695-2-2）。", u: "pages/knowledge.html#firetests" },
  { t: "球压", f: "Ball Pressure Test", d: "验证热塑件受热受压变形 ≤ 2mm（IEC 60695-10-2）。", u: "pages/knowledge.html#firetests" }
];


var EN_MAP = {
  CTI: "Comparative Tracking Index", PLC: "Performance Level Category",
  MOPP: "Means of Patient Protection", MOOP: "Means of Operator Protection",
  SELV: "Safety Extra-Low Voltage", PELV: "Protective Extra-Low Voltage",
  ES1: "Energy Source Class 1", OVC: "Overvoltage Category",
  SPD: "Surge Protective Device", MOV: "Metal Oxide Varistor",
  GDT: "Gas Discharge Tube", TVS: "Transient Voltage Suppressor",
  TSS: "Thyristor Surge Suppressor", Hipot: "High Potential Test",
  ESD: "Electrostatic Discharge", EFT: "Electrical Fast Transient",
  Surge: "Surge / Transient Overvoltage", RoHS: "Restriction of Hazardous Substances",
  REACH: "Registration, Evaluation, Authorisation and Restriction of Chemicals",
  SVHC: "Substances of Very High Concern", WEEE: "Waste Electrical and Electronic Equipment",
  RTI: "Relative Thermal Index", HWI: "Hot Wire Ignition",
  HAI: "High Amp Arc Ignition", IP: "Ingress Protection",
  RMS: "Root Mean Square", Peak: "Peak Value",
  CB: "Certification Body", CCC: "China Compulsory Certification",
  RED: "Radio Equipment Directive", EMC: "Electromagnetic Compatibility",
  SAR: "Specific Absorption Rate", LPL: "Lightning Protection Level",
  "UN 38.3": "UN Manual of Tests and Criteria 38.3", PFC: "Power Factor Correction"
};

function normGloss(u) {
  if (u.indexOf("pages/") === 0 || u.indexOf("en/") === 0) return "../" + u;
  return u;
}
function $(id) { return document.getElementById(id); }

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderGlossary() {
  var q = $("gSearch").value.trim().toLowerCase();
  var rows = GLOSSARY.filter(function (g) {
    if (!q) return true;
    return (g.t + " " + g.f + " " + g.d).toLowerCase().indexOf(q) !== -1;
  });
  $("gBody").innerHTML = rows.map(function (g) {
    return "<tr><td><b>" + esc(g.t) + "</b></td><td>" + esc(g.f) + "</td><td>" + esc(EN_MAP[g.t] || "") + "</td><td>" + esc(g.d) + ' <a href="' + normGloss(g.u) + '">→ 详情</a></td></tr>';
  }).join("");
  $("gCount").textContent = "显示 " + rows.length + " / " + GLOSSARY.length + " 个术语";
}

$("gSearch").addEventListener("input", renderGlossary);
renderGlossary();
