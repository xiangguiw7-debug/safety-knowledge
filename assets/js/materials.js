var MATERIALS = [
  { family: "PC", name: "PC 通用（非阻燃）", fr: "HB", cti: "250–400V", group: "Ⅱ～Ⅲa（常见 Ⅲa）", rti: "120–130", note: "透明、耐冲击；阻燃型 CTI 明显下降" },
  { family: "PC", name: "PC 阻燃（V-0）", fr: "V-0", cti: "175–250V", group: "Ⅲa～Ⅲb", rti: "115–125", note: "阻燃剂拉低 CTI，需按 Ⅲa 档设计" },
  { family: "ABS", name: "ABS 通用", fr: "HB", cti: "400–600V", group: "Ⅰ～Ⅱ", rti: "60–80", note: "成本低；批次差异需看报告" },
  { family: "ABS", name: "ABS 阻燃（V-0）", fr: "V-0", cti: "200–350V", group: "Ⅱ～Ⅲa", rti: "60–75", note: "CTI 波动大，先要报告再定档" },
  { family: "PC+ABS", name: "PC+ABS 通用", fr: "HB", cti: "250–600V", group: "Ⅱ～Ⅲa", rti: "80–110", note: "按配方变化大" },
  { family: "PC+ABS", name: "PC+ABS 阻燃（V-0）", fr: "V-0", cti: "200–300V", group: "Ⅲa", rti: "80–100", note: "消费电子外壳常见" },
  { family: "PMMA", name: "PMMA（亚克力）", fr: "HB", cti: "400–600V", group: "Ⅰ～Ⅱ", rti: "50–70", note: "透明件；注意应力开裂" },
  { family: "PA66", name: "PA66 未增强", fr: "V-2/HB", cti: "500–600V", group: "Ⅰ～Ⅱ", rti: "105–125", note: "吸湿影响表面特性" },
  { family: "PA66", name: "PA66 + GF30", fr: "HB/V-0", cti: "400–500V", group: "Ⅰ～Ⅱ", rti: "120–140", note: "玻纤配方差异大" },
  { family: "PBT", name: "PBT 未增强", fr: "HB/V-0", cti: "500–600V", group: "Ⅰ～Ⅱ", rti: "120–130", note: "电气性能稳定" },
  { family: "PBT", name: "PBT + GF30", fr: "HB/V-0", cti: "400–500V", group: "Ⅰ～Ⅱ", rti: "130–150", note: "连接器/骨架性价比料" },
  { family: "PPS", name: "PPS + GF", fr: "V-0", cti: "175–300V", group: "Ⅲa（约）", rti: "200–240", note: "耐高温；CTI 因配方差异大" },
  { family: "LCP", name: "LCP", fr: "V-0", cti: "150–250V", group: "Ⅲb～Ⅲa（约）", rti: "220–260", note: "高温薄壁；CTI 偏低" },
  { family: "陶瓷/云母", name: "陶瓷 / 云母", fr: "不燃", cti: "≥600V", group: "Ⅰ", rti: "高", note: "高压隔离首选；脆、加工难" },
  { family: "FR-4", name: "FR-4 玻纤环氧（PCB 基材）", fr: "HB/V-0", cti: "175–300V", group: "Ⅲa（约）", rti: "130–140", note: "阻焊层不能计入爬电距离" }
];

function $(id) {
  return document.getElementById(id);
}

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderMaterials() {
  var family = $("mFamily").value;
  var fr = $("mFr").value;
  var q = $("mSearch").value.trim().toLowerCase();
  var rows = MATERIALS.filter(function (m) {
    if (family !== "all" && m.family !== family) return false;
    if (fr !== "all" && m.fr.split("/").indexOf(fr) === -1) return false;
    if (q) {
      var hay = (m.name + " " + m.family + " " + m.note).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });

  if (rows.length === 0) {
    $("mBody").innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted)">没有匹配材料，试试搜“PC”“V-0”或“陶瓷”。</td></tr>';
  } else {
    $("mBody").innerHTML = rows.map(function (m) {
      return "<tr>" +
        "<td>" + esc(m.family) + "</td>" +
        "<td>" + esc(m.name) + "</td>" +
        "<td>" + esc(m.fr) + "</td>" +
        "<td class=\"num\">" + esc(m.cti) + "</td>" +
        "<td>" + esc(m.group) + "</td>" +
        "<td class=\"num\">" + esc(m.rti) + "°C</td>" +
        "<td>" + esc(m.note) + "</td>" +
      "</tr>";
    }).join("");
  }
  $("mCount").textContent = "显示 " + rows.length + " / " + MATERIALS.length + " 条材料";
}

document.querySelectorAll("[data-mfamily]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    $("mFamily").value = btn.getAttribute("data-mfamily");
    document.querySelectorAll("[data-mfamily]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderMaterials();
  });
});

$("mFr").addEventListener("change", renderMaterials);
$("mSearch").addEventListener("input", renderMaterials);
renderMaterials();
