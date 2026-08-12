var PROGRESS_ITEMS = [
  { key: "clearance", label: "电气间隙", url: "pages/clearance.html" },
  { key: "creepage", label: "爬电距离", url: "pages/creepage.html" },
  { key: "surge", label: "雷击浪涌", url: "pages/surge.html" },
  { key: "hipot", label: "耐压测试", url: "pages/hipot.html" },
  { key: "knowledge", label: "补充知识", url: "pages/knowledge.html" },
  { key: "materials", label: "材料库", url: "pages/materials.html" },
  { key: "tools", label: "计算工具", url: "pages/tools.html" },
  { key: "quiz", label: "小测验", url: "pages/quiz.html" }
];
var PROGRESS_KEY = "angui-progress-v1";

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}

function saveProgress(p) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
}

function refreshButtons() {
  var p = getProgress();
  document.querySelectorAll("[data-progress-key]").forEach(function (btn) {
    var key = btn.getAttribute("data-progress-key");
    var done = !!p[key];
    btn.textContent = done ? "✓ 已读" : "标记已读";
    btn.classList.toggle("btn-primary", !done);
  });
}


function exportProgress() {
  var p = getProgress();
  var done = PROGRESS_ITEMS.filter(function (i) { return p[i.key]; });
  var text = "学习进度（安规知识课堂）\n已完成 " + done.length + " / " + PROGRESS_ITEMS.length + "\n" + PROGRESS_ITEMS.map(function (i) { return (p[i.key] ? "☑ " : "☐ ") + i.label; }).join("\n");
  function fin() { if (window.AnGuiUX) window.AnGuiUX.toast("进度已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(fin).catch(fin); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); fin(); }
}
function renderHomeProgress() {
  var card = document.getElementById("progressCard");
  if (!card) return;
  var p = getProgress();
  var done = PROGRESS_ITEMS.filter(function (i) { return p[i.key]; }).length;
  var next = PROGRESS_ITEMS.filter(function (i) { return !p[i.key]; })[0];
  var pct = Math.round((done / PROGRESS_ITEMS.length) * 100);
  var html =
    '<p style="margin:0 0 8px"><b>已读 ' + done + " / " + PROGRESS_ITEMS.length + "</b>（" + pct + "%）</p>" +
    '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
    '<p style="margin:10px 0 0">' +
    (next ? '下一步：<a href="' + next.url + '">' + next.label + "</a>" : "全部完成，去小测验巩固吧！") +
    "</p>";
  card.innerHTML = html + '<p style="margin-top:10px"><button type="button" class="btn" id="exportProgressBtn">导出进度</button></p>';
  var ep = document.getElementById("exportProgressBtn");
  if (ep) ep.addEventListener("click", exportProgress);
}

document.querySelectorAll("[data-progress-key]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var key = btn.getAttribute("data-progress-key");
    var p = getProgress();
    if (p[key]) { delete p[key]; } else { p[key] = true; }
    saveProgress(p);
    refreshButtons();
    renderHomeProgress();
  });
});

refreshButtons();
renderHomeProgress();
