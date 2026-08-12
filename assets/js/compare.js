var CMP_STDS = [
  { id: "60335", label: "IEC 60335-1 家电" },
  { id: "62368", label: "IEC 62368-1 IT/AV" },
  { id: "60601", label: "IEC 60601-1 医疗" },
  { id: "61010", label: "IEC 61010-1 测量控制" },
  { id: "60204", label: "IEC 60204-1 机械" }
];

var CMP_ROWS = [
  {
    topic: "标准定位", diff: "决定后续所有条款与数值的出发点",
    cols: { "60335": "家用电器，传统结构条款", "62368": "音视频/ICT，基于危害（HBSE）", "60601": "医用电气，安全+基本性能+监管", "61010": "测量、控制、实验室设备", "60204": "机械电气设备" }
  },
  {
    topic: "防触电总思路", diff: "医疗要求单一故障仍安全，IT 按能源分级",
    cols: { "60335": "绝缘类型 + 距离 + 接地", "62368": "能源分级（ES1–ES3）+ 防护", "60601": "MOPP / MOOP，单一故障仍安全", "61010": "按测量类别 + 污染等级", "60204": "按 IEC 60664 绝缘配合" }
  },
  {
    topic: "电气间隙条款", diff: "条款位置不同，查表逻辑一致",
    cols: { "60335": "第 29 章", "62368": "第 5.4 节", "60601": "第 8.7 节", "61010": "对应表格", "60204": "引用 IEC 60664-1" }
  },
  {
    topic: "爬电距离条款", diff: "都要污染等级与材料组，但表格编号不同",
    cols: { "60335": "第 29 章（含污染/材料组）", "62368": "第 5.4 节", "60601": "第 8.7 节", "61010": "对应表格", "60204": "引用 IEC 60664-1" }
  },
  {
    topic: "耐压示例（市电 ≤250V）", diff: "数值差异明显，务必查表",
    cols: { "60335": "基本示例 1250V AC", "62368": "基本 1500V、加强 3000V AC", "60601": "1 MOPP 示例 1500V、2 MOPP 示例 4000V", "61010": "按表格", "60204": "2×Un + 1000V（最低约 1500V）" }
  },
  {
    topic: "泄漏电流", diff: "医疗患者漏电流限值最严",
    cols: { "60335": "第 13/16 章，按器具类型", "62368": "泄漏电流条款", "60601": "患者漏电流，含单一故障", "61010": "按等级", "60204": "—" }
  },
  {
    topic: "温升", diff: "限值对象相同，具体数值按各自表格",
    cols: { "60335": "第 11 章", "62368": "热安全章节", "60601": "温度与超温条款", "61010": "温升条款", "60204": "温升条款" }
  },
  {
    topic: "防火", diff: "IT 标准有 PS 分级，家电按第 30 章",
    cols: { "60335": "第 30 章耐热耐燃", "62368": "防火章节（PS 分级）", "60601": "外壳防火要求", "61010": "阻燃要求", "60204": "—" }
  },
  {
    topic: "机械危险", diff: "机械标准强调防护与功能安全等级",
    cols: { "60335": "机械危险章节", "62368": "机械危害章节", "60601": "机械安全条款", "61010": "机械条款", "60204": "机械防护 + PL/SIL" }
  },
  {
    topic: "EMC 引用", diff: "不同产品用不同 EMC 标准族",
    cols: { "60335": "CISPR 14-1/-2", "62368": "CISPR 32/35", "60601": "IEC 60601-1-2", "61010": "CISPR 11/32", "60204": "IEC 61000-6 系列" }
  }
];

function $(id) { return document.getElementById(id); }

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

var cmpScenario = "all";

function renderCompare() {
  var head = $("cmpHead");
  var body = $("cmpBody");
  var showAll = cmpScenario === "all";

  var cols = showAll ? CMP_STDS : CMP_STDS.filter(function (s) { return s.id === cmpScenario; });
  head.innerHTML = "<tr><th>主题</th>" + cols.map(function (s) { return "<th>" + esc(s.label) + "</th>"; }).join("") + "<th>关键差异</th></tr>";

  body.innerHTML = CMP_ROWS.map(function (r) {
    return "<tr><td><b>" + esc(r.topic) + "</b></td>" +
      cols.map(function (s) { return "<td>" + esc(r.cols[s.id]) + "</td>"; }).join("") +
      "<td>" + esc(r.diff) + "</td></tr>";
  }).join("");
}

document.querySelectorAll("[data-cmp]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    cmpScenario = btn.getAttribute("data-cmp");
    document.querySelectorAll("[data-cmp]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderCompare();
  });
});

renderCompare();
