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
