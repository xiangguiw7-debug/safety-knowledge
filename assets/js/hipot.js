var HIPOT_DATA = {
  "62368": {
    basic: 1500, supplementary: 1500, reinforced: 3000,
    label: "IEC 62368-1 / GB 4943.1（IT/AV，市电 ≤250V 常用值）"
  },
  "60335": {
    basic: 1250, supplementary: null, reinforced: 3000,
    label: "IEC 60335-1 / GB 4706.1（≤250V 教学示例；附加绝缘请查标准表格）"
  },
  "60601": {
    basic: 1500, supplementary: 1500, reinforced: 4000,
    label: "IEC 60601-1 / GB 9706.1（市电端口教学示例：1 MOPP 1500 / 2 MOPP 4000）"
  },
  "61010": null,
  "60204": {
    basic: 1500, supplementary: null, reinforced: null,
    label: "IEC 60204-1 教学示例：2×Un + 1000V（230V ≈ 1500V，最低约 1500V）"
  }
};

function updateHipot() {
  var std = $("htStd").value;
  var ins = $("htIns").value;
  var mode = $("htMode").value;
  var out = $("htResult");
  var note = $("htNote");
  var d = HIPOT_DATA[std];

  if (!d) {
    out.textContent = "--";
    note.textContent = "IEC 61010-1 的具体试验电压暂未收录，请到标准文件入口核对对应表格，或按耐压页“5 步法”确定。";
    return;
  }

  var ac = d[ins];
  if (ac === null || ac === undefined) {
    out.textContent = "--";
    note.textContent = d.label + "：该绝缘类型请查标准表格确认。";
    return;
  }

  var dc = Math.round(ac * 1.414);
  var value = mode === "ac" ? ac + " V AC" : dc + " V DC";
  out.textContent = value;
  note.textContent =
    d.label + "；" +
    (ins === "reinforced" ? "加强/双重绝缘" : "基本/附加绝缘") +
    " → " + ac + " V AC（" + dc + " V DC）。保持时间常见 60s，升压速率建议不超过 500 V/s 量级（以标准为准）。" +
    " 教学示例值，正式数值以标准原文为准。";
}

document.querySelectorAll("[data-hipot]").forEach(function (el) {
  el.addEventListener("change", updateHipot);
  el.addEventListener("input", updateHipot);
});
updateHipot();

var HIPOT_STEPS = [
  { t: "预检", d: "外观、接地连续性、样品数量、环境条件（温度湿度）确认。" },
  { t: "接线", d: "高压端接被测绝缘一端，另一端接地/机壳；确认极性正确。" },
  { t: "升压", d: "从零平稳升到试验电压（常见建议不超过 500 V/s 量级，以标准为准）。" },
  { t: "保持", d: "保持规定时间（型式试验常见 60s），观察泄漏电流与是否击穿/闪络。" },
  { t: "判读", d: "无击穿、无闪络、泄漏不超限即合格；超限进入失败排查。" },
  { t: "放电", d: "降压到零再断开；直流测试后必须对被测部位放电确认。" }
];
var hipotStep = 0;
function renderHipotSteps() {
  var title = document.getElementById("hipotStepTitle");
  var desc = document.getElementById("hipotStepDesc");
  var bar = document.getElementById("hipotStepBar");
  var prev = document.getElementById("hipotStepPrev");
  var next = document.getElementById("hipotStepNext");
  if (!title) return;
  var s = HIPOT_STEPS[hipotStep];
  title.textContent = "步骤 " + (hipotStep + 1) + " / " + HIPOT_STEPS.length + "：" + s.t;
  desc.textContent = s.d;
  bar.style.width = ((hipotStep + 1) / HIPOT_STEPS.length * 100) + "%";
  prev.disabled = hipotStep === 0;
  next.textContent = hipotStep === HIPOT_STEPS.length - 1 ? "重新开始" : "下一步 →";
}
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "hipotStepNext") {
    hipotStep = (hipotStep + 1) % HIPOT_STEPS.length;
    renderHipotSteps();
  }
  if (e.target && e.target.id === "hipotStepPrev" && hipotStep > 0) {
    hipotStep -= 1;
    renderHipotSteps();
  }
});
renderHipotSteps();