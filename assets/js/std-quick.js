
var STD_INDUSTRY_MAP = {
  lighting: ["灯具"],
  consumer: ["消费"],
  appliance: ["家电"],
  medical: ["医疗"],
  machinery: ["工业"],
  tools: ["工具"],
  power: ["电源"],
  battery: ["电池"],
  automotive: ["汽车"],
  ict: ["通信"],
  iot: ["IoT"],
  robotics: ["机器人"],
  charging: ["充电桩"],
  drone: ["无线", "玩具", "电池"],
  escooter: ["电池"],
  lab: ["测量仪器"],
  solar: ["光伏"],
  "portable-power": ["电源", "电池"],
  beauty: ["家电"],
  cleaning: ["家电"],
  security: ["IoT", "消费"],
  wearable: ["无线", "电池"],
  server: ["消费", "电源"],
  automation: ["工业"],
  "low-voltage": ["低压电器"],
  toy: ["玩具"],
  powerbank: ["电池", "电源"]
};

function stdMatchesIndustry(s, id) {
  if (!id || id === "all") return true;
  var keys = STD_INDUSTRY_MAP[id];
  if (!keys) return true;
  return keys.some(function (k) { return s.industry.indexOf(k) !== -1; });
}
function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderStdQuick() {
  var q = (document.getElementById("stdQuickSearch") || { value: "" }).value.trim().toLowerCase();
  var box = document.getElementById("stdQuickBody");
  if (!box) return;
  var list = STANDARDS_DATA.filter(function (s) {
    if (!stdMatchesIndustry(s, window.industryFilter)) return false;
    return !q || (s.code + " " + s.topic + " " + s.gb + " " + s.industry).toLowerCase().indexOf(q) !== -1;
  });
  box.innerHTML = list.length ? list.map(function (s) {
    return '<tr id="' + s.id + '">' +
      "<td>" + esc(s.code) + "</td>" +
      "<td>" + esc(s.topic) + "</td>" +
      "<td>" + esc(s.gb) + "</td>" +
      "<td>" + esc(s.industry) + "</td>" +
      "<td>" + s.links.map(function (l) {
        return '<a href="' + l.u + '" target="_blank" rel="noopener">' + esc(l.l) + "</a>";
      }).join(" · ") + "</td>" +
    "</tr>";
  }).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--muted)">没有匹配标准，试试搜“61010”或“浪涌”。</td></tr>';
  var c = document.getElementById("stdQuickCount");
  if (c) c.textContent = "共 " + STANDARDS_DATA.length + " 条，显示 " + list.length + " 条" + (window.industryFilter && window.industryFilter !== "all" ? "（行业：' + window.industryFilterName + '）" : "");
}

var stdQuickInput = document.getElementById("stdQuickSearch");
if (stdQuickInput) stdQuickInput.addEventListener("input", renderStdQuick);
renderStdQuick();
