var DB_KEYS = ["angui-progress-v1", "angui-know-notes-v1", "angui-wrong-v1", "angui-theme", "angui-tool-tab", "angui-tool-recent", "angui-site-recent", "angui-feynman-v1", "angui-feynman-draft-v1"];

function dbExport() {
  var data = {};
  DB_KEYS.forEach(function (k) {
    try { var v = localStorage.getItem(k); if (v !== null) data[k] = JSON.parse(v); } catch (e) { /* ignore */ }
  });
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "angui-data-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  var st = document.getElementById("dbStatus");
  if (st) st.textContent = "已导出 " + DB_KEYS.length + " 项数据。";
}

function dbImport(file) {
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var data = JSON.parse(reader.result);
      var n = 0;
      DB_KEYS.forEach(function (k) {
        if (data[k] !== undefined) { localStorage.setItem(k, JSON.stringify(data[k])); n += 1; }
      });
      var st = document.getElementById("dbStatus");
      if (st) st.textContent = "导入成功：" + n + " 项数据已恢复，刷新页面生效。";
    } catch (e) {
      var st2 = document.getElementById("dbStatus");
      if (st2) st2.textContent = "导入失败：文件格式不正确。";
    }
  };
  reader.readAsText(file);
}

/* ===== 手机 / 电脑同步：复制文本 + 合并导入 ===== */
function dbIdentityOf(key, v) {
  if (key === "angui-wrong-v1") return v && v.q;
  if (key === "angui-know-notes-v1") return v && (v.id || v.key);
  if (key === "angui-feynman-v1") return v && (v.id + "|" + v.date + "|" + v.text);
  if (key === "angui-tool-recent" || key === "angui-site-recent") return String(v);
  return JSON.stringify(v);
}
function dbMergeInto(key, incoming) {
  try {
    var cur = JSON.parse(localStorage.getItem(key) || "null");
    if (cur === null) { localStorage.setItem(key, JSON.stringify(incoming)); return; }
    if (Array.isArray(cur) && Array.isArray(incoming)) {
      var seen = {};
      cur.forEach(function (x) { var id2 = dbIdentityOf(key, x); if (id2 !== undefined) seen[id2] = 1; });
      incoming.forEach(function (x) {
        var id2 = dbIdentityOf(key, x);
        if (id2 !== undefined && !seen[id2]) { cur.push(x); seen[id2] = 1; }
      });
      localStorage.setItem(key, JSON.stringify(cur));
    } else if (cur && typeof cur === "object" && !Array.isArray(cur) && incoming && typeof incoming === "object" && !Array.isArray(incoming)) {
      Object.keys(incoming).forEach(function (k) { if (cur[k] === undefined) cur[k] = incoming[k]; });
      localStorage.setItem(key, JSON.stringify(cur));
    } else {
      // 标量（主题、工具 Tab 等）：以导入值为准
      localStorage.setItem(key, JSON.stringify(incoming));
    }
  } catch (e) { /* ignore */ }
}
function dbExportText() {
  var data = {};
  DB_KEYS.forEach(function (k) {
    try { var v = localStorage.getItem(k); if (v !== null) data[k] = JSON.parse(v); } catch (e) { /* ignore */ }
  });
  var text = JSON.stringify(data);
  function fin() { if (window.AnGuiUX) window.AnGuiUX.toast("同步文本已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(fin).catch(fin); }
  else {
    var ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta); fin();
  }
  return text;
}
function dbImportText(text) {
  var data;
  try { data = JSON.parse(text); } catch (e) { return { ok: false, msg: "文本不是有效的 JSON" }; }
  if (!data || typeof data !== "object" || Array.isArray(data)) return { ok: false, msg: "JSON 结构不正确" };
  var n = 0;
  DB_KEYS.forEach(function (k) {
    if (data[k] !== undefined && data[k] !== null) { dbMergeInto(k, data[k]); n++; }
  });
  return { ok: true, msg: "合并导入成功：" + n + " 项数据（本机已有记录已保留）" };
}

var eb = document.getElementById("dbExport");
if (eb) eb.addEventListener("click", dbExport);
var ib = document.getElementById("dbImport");
if (ib) ib.addEventListener("change", function () { if (this.files && this.files[0]) dbImport(this.files[0]); });
var ebText = document.getElementById("dbExportText");
if (ebText) ebText.addEventListener("click", dbExportText);
var ibText = document.getElementById("dbImportText");
if (ibText) ibText.addEventListener("click", function () {
  var box = document.getElementById("dbPaste");
  var res = dbImportText(box ? box.value : "");
  var st = document.getElementById("dbSyncStatus");
  if (st) st.textContent = res.msg;
  if (window.AnGuiUX) window.AnGuiUX.toast(res.msg);
});
