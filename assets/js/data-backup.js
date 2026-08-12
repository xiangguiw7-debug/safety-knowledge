var DB_KEYS = ["angui-progress-v1", "angui-know-notes-v1", "angui-wrong-v1", "angui-theme", "angui-tool-tab", "angui-tool-recent", "angui-site-recent"];

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

var eb = document.getElementById("dbExport");
if (eb) eb.addEventListener("click", dbExport);
var ib = document.getElementById("dbImport");
if (ib) ib.addEventListener("change", function () { if (this.files && this.files[0]) dbImport(this.files[0]); });
