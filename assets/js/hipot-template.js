var HT_KEY = "hipot-template-v1";

function htSave() {
  var data = {};
  document.querySelectorAll("[data-hipot-cell]").forEach(function (input) {
    data[input.getAttribute("data-hipot-cell")] = input.value;
  });
  try {
    localStorage.setItem(HT_KEY, JSON.stringify(data));
    var btn = document.getElementById("htSaveBtn");
    if (btn) {
      btn.textContent = "已保存";
      setTimeout(function () { btn.textContent = "保存模板到本地"; }, 1800);
    }
  } catch (e) {
    alert("本地存储不可用（file:// 下部分浏览器限制），可截图保存。");
  }
}

function htLoad() {
  try {
    var raw = localStorage.getItem(HT_KEY);
    if (!raw) return;
    var data = JSON.parse(raw);
    document.querySelectorAll("[data-hipot-cell]").forEach(function (input) {
      var key = input.getAttribute("data-hipot-cell");
      if (data[key] !== undefined) input.value = data[key];
    });
  } catch (e) {
    /* 忽略损坏数据 */
  }
}

function htReset() {
  document.querySelectorAll("[data-hipot-cell]").forEach(function (input) {
    input.value = input.getAttribute("data-default") || "";
  });
  try { localStorage.removeItem(HT_KEY); } catch (e) { /* ignore */ }
}

document.querySelectorAll("[data-hipot-cell]").forEach(function (input) {
  input.addEventListener("input", function () {
    var btn = document.getElementById("htSaveBtn");
    if (btn) btn.textContent = "保存模板到本地";
  });
});

var htSaveBtn = document.getElementById("htSaveBtn");
if (htSaveBtn) htSaveBtn.addEventListener("click", htSave);
var htResetBtn = document.getElementById("htResetBtn");
if (htResetBtn) htResetBtn.addEventListener("click", htReset);
htLoad();


// ===== 7.1 测试流程步骤条（交互演示） =====
var HIPOT_STEPS = [
  { t: "预检", d: "外观检查、接地连续性、样品数量、环境条件（温度/湿度）记录；确认测试仪互锁与防护罩。", w: 16 },
  { t: "接线", d: "高压端接被测绝缘一端，另一端接地/机壳；确认极性无误，人体远离被测件。", w: 32 },
  { t: "升压", d: "从零平稳升压到试验电压，常见建议不超过 500 V/s 量级，具体按标准。", w: 50 },
  { t: "保持", d: "到规定时间（型式试验常见 60s），观察泄漏电流与是否击穿/闪络。", w: 68 },
  { t: "降压", d: "先降压到零再断开；直流测试后必须对被测部位放电确认。", w: 84 },
  { t: "记录", d: "记录电压、时间、泄漏电流、结果，归档到认证档案。", w: 100 }
];
(function () {
  var bar = document.getElementById("hipotStepBar");
  var title = document.getElementById("hipotStepTitle");
  var desc = document.getElementById("hipotStepDesc");
  var prev = document.getElementById("hipotStepPrev");
  var next = document.getElementById("hipotStepNext");
  if (!bar || !title || !desc || !prev || !next) return;
  var idx = 0;
  function render() {
    var st = HIPOT_STEPS[idx];
    title.textContent = "步骤 " + (idx + 1) + " / " + HIPOT_STEPS.length + "：" + st.t;
    desc.textContent = st.d;
    bar.style.width = st.w + "%";
    prev.disabled = idx === 0;
    next.disabled = idx === HIPOT_STEPS.length - 1;
  }
  prev.addEventListener("click", function () { if (idx > 0) { idx--; render(); } });
  next.addEventListener("click", function () { if (idx < HIPOT_STEPS.length - 1) { idx++; render(); } });
  render();
})();
