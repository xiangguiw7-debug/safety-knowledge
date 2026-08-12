(function () {
  "use strict";
  var root = document.getElementById("sopRoot");
  var id = document.body.getAttribute("data-sop-id");
  if (!root || !id || typeof SOP_DATA === "undefined") return;

  var sop = null;
  for (var i = 0; i < SOP_DATA.length; i++) {
    if (SOP_DATA[i].id === id) { sop = SOP_DATA[i]; break; }
  }
  if (!sop) {
    root.innerHTML = '<div class="callout callout-warn">未找到 SOP：' + id + '</div>';
    return;
  }

  var conceptLinks = {
    "ip": "knowledge.html#ip",
    "glow-wire": "knowledge.html#glowwire-detail",
    "needle-flame": "knowledge.html#needleflame-detail",
    "ball-pressure": "knowledge.html#ballpressure-detail",
    "ul94": "knowledge.html#flame",
    "ul94-5v": "knowledge.html#flame",
    "hwi": "knowledge.html#flame",
    "hai": "knowledge.html#flame",
    "cti-test": "knowledge.html#cti",
    "rti": "knowledge.html#flame",
    "gwit": "knowledge.html#glowwire-detail",
    "cold": "knowledge.html#environment",
    "dry-heat": "knowledge.html#environment",
    "temp-cycling": "knowledge.html#environment",
    "damp-heat-steady": "knowledge.html#environment",
    "damp-heat-cyclic": "knowledge.html#environment",
    "vibration-sine": "knowledge.html#environment",
    "vibration-random": "knowledge.html#environment",
    "shock": "knowledge.html#environment",
    "drop": "knowledge.html#environment",
    "salt-mist": "knowledge.html#environment",
    "endurance": "knowledge.html#environment",
    "temperature-operation": "knowledge.html#environment",
    "post-env-safety": "knowledge.html#environment",
    "thermal-aging-rti": "knowledge.html#environment"
  };

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }
  function list(arr) {
    return (arr || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
  }
  function table(rows, headers) {
    var head = headers ? "<thead><tr>" + headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead>" : "";
    var body = rows.map(function (r) {
      return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
    }).join("");
    return '<div class="table-wrap"><table>' + head + "<tbody>" + body + "</tbody></table></div>";
  }

  var metaRows = [
    ["SOP 编号", sop.code],
    ["版本 / 日期", sop.version + " / " + sop.date],
    ["类别", sop.categoryName],
    ["依据标准", sop.standard]
  ];

  var html = "";
  html += '<div class="sop-actions" style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">';
  html += '<button type="button" class="btn" id="printSop">🖨 打印 / 存 PDF</button>';
  html += '<button type="button" class="btn" onclick="location.href=&quot;./sop.html&quot;">返回 SOP 中心</button>';
  if (conceptLinks[sop.id]) html += '<a class="btn" href="' + conceptLinks[sop.id] + '">查看概念知识卡</a>';
  html += "</div>";

  html += "<h1>" + esc(sop.title) + "</h1>";
  html += table(metaRows);
  html += "<h2>目的</h2><p>" + esc(sop.purpose) + "</p>";
  html += "<h2>适用范围</h2><p>" + esc(sop.scope) + "</p>";

  html += '<div class="callout callout-danger"><strong>安全警告</strong><ul>' + list(sop.safety) + "</ul></div>";

  if (sop.knowledgeDetail) {
    html += "<h2>📖 详细标准知识（知识卡片库同款）</h2>";
    html += '<div class="knowledge-detail">' + sop.knowledgeDetail + "</div>";
  }

  html += "<h2>环境要求</h2><p>" + esc(sop.environment) + "</p>";

  html += "<h2>样品准备</h2><ul>" + list(sop.sample) + "</ul>";

  html += "<h2>设备与工具</h2>";
  html += table(sop.equipment.map(function (e) { return [e.name, e.spec, e.cal]; }), ["设备 / 工具", "规格 / 量程", "校准 / 检查"]);

  html += "<h2>操作步骤</h2><ol>" + list(sop.steps) + "</ol>";

  html += "<h2>判定标准</h2><ul>" + list(sop.acceptance) + "</ul>";

  html += "<h2>记录表</h2>";
  html += table(sop.records.fields.map(function (f) { return [f, ""]; }), ["记录项目", "记录内容"]);
  html += '<p class="note" style="color:var(--muted);font-size:13px">打印后手写或转成电子表格使用；所有原始记录需保存并按实验室要求归档。</p>';

  html += "<h2>检查表</h2>";
  html += '<div class="sop-checklist">' + sop.checklist.map(function (c) {
    return '<label class="sop-check"><input type="checkbox"> ' + esc(c) + "</label>";
  }).join("") + "</div>";

  html += "<h2>注意事项</h2><ul>" + list(sop.notes) + "</ul>";

  root.innerHTML = html;

  var printBtn = document.getElementById("printSop");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
