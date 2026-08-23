/* 结构设计安规检查表（structural-checklist.html）
 * 交设计/评审前逐项自查：checkbox 状态存 localStorage，可导出文本/打印
 */
(function () {
  "use strict";
  var KEY = "angui-struct-check-v1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }

  function update() {
    var st = load();
    var boxes = document.querySelectorAll(".sc-item input[type=checkbox]");
    var done = 0;
    boxes.forEach(function (cb) { if (st[cb.dataset.sc]) done++; });
    var total = boxes.length;
    var el = document.getElementById("scProgress");
    if (el) el.textContent = "已完成 " + done + " / " + total + "（" + Math.round(done / total * 100) + "%）";
    var bar = document.getElementById("scBar");
    if (bar) bar.style.width = (done / total * 100) + "%";
    var all = document.getElementById("scAllDone");
    if (all) all.hidden = done < total;
  }

  function bind() {
    var st = load();
    document.querySelectorAll(".sc-item input[type=checkbox]").forEach(function (cb) {
      cb.checked = !!st[cb.dataset.sc];
      cb.addEventListener("change", function () {
        var s = load();
        if (this.checked) s[this.dataset.sc] = 1; else delete s[this.dataset.sc];
        save(s);
        update();
      });
    });
    var ex = document.getElementById("scExport");
    if (ex) ex.addEventListener("click", function () {
      var st2 = load();
      var lines = [];
      document.querySelectorAll(".sc-group").forEach(function (g) {
        var title = g.querySelector("h3").textContent.trim();
        lines.push("【" + title + "】");
        g.querySelectorAll(".sc-item").forEach(function (it) {
          var id = it.querySelector("input").dataset.sc;
          var label = it.querySelector(".sc-label").textContent.trim();
          lines.push((st2[id] ? "☑ " : "☐ ") + label);
        });
        lines.push("");
      });
      var txt = "结构设计安规检查表（安规与可靠性知识课堂）\n" + lines.join("\n");
      function fin() { if (window.AnGuiUX) window.AnGuiUX.toast("检查结果已复制"); }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(fin).catch(fin); }
      else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); fin(); }
    });
    var rs = document.getElementById("scReset");
    if (rs) rs.addEventListener("click", function () {
      save({});
      document.querySelectorAll(".sc-item input[type=checkbox]").forEach(function (cb) { cb.checked = false; });
      update();
      if (window.AnGuiUX) window.AnGuiUX.toast("已重置");
    });
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
