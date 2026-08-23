/* 技术文件模板编辑器（templates.html）
 * CDF 可编辑表格：名称/型号/证书等全部可改，可增删行、排序、导出；数据存 localStorage。
 * DoC / 铭牌：字段可填并保存，铭牌实时预览，支持打印。
 */
(function () {
  "use strict";
  var CDF_KEY = "angui-cdf-v1";
  var DOC_KEY = "angui-doc-v1";
  var LABEL_KEY = "angui-label-v1";
  var CDF_COLS = ["元件名称", "型号", "制造商", "认证标志", "证书编号", "有效期", "对应标准"];

  function load(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch (e) { return def; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function toast(m) { if (window.AnGuiUX && window.AnGuiUX.toast) window.AnGuiUX.toast(m); }
  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }

  /* ================= CDF ================= */
  var DEFAULT_CDF = [
    ["保险丝", "F2A250V", "Littelfuse 0217002", "cURus", "E123456", "2027-06", "IEC 60127"],
    ["X 电容", "0.1µF X2", "WIMA", "ENEC", "40012345", "2028-03", "IEC 60384-14"],
    ["Y 电容", "1nF Y2", "TDK", "CQC", "CQC2000xxxx", "2027-12", "IEC 60384-14"],
    ["开关电源变压器", "EE20", "自制（随机文件）", "—", "—", "—", "IEC 61558 / 62368"],
    ["电源线 / 插头", "10A 250V", "示例线材厂", "CCC", "CCC123456", "2027-08", "GB 2099 / IEC 60320"],
    ["外壳材料", "PC V-0", "示例塑胶", "UL94", "E456789", "—", "UL 94 / IEC 60695"],
    ["光耦", "PC817", "Sharp", "UL", "E654321", "2026-11", "IEC 62368（间距）"],
    ["继电器", "HF46F", "宏发", "cURus", "E789012", "2028-01", "IEC 61810"],
    ["热敏电阻", "MF72 5D-9", "示例电子", "cURus", "E234567", "2027-05", "IEC 60738"],
    ["电池（如适用）", "18650", "示例电池", "CB / UN38.3", "—", "—", "IEC 62133 / UN 38.3"]
  ];

  var cdfBox = document.getElementById("cdfBox");
  if (cdfBox) {
    var cdf = load(CDF_KEY, DEFAULT_CDF);

    function cdfRender() {
      var html = '<div class="table-wrap"><table class="cdf-table"><thead><tr>';
      CDF_COLS.forEach(function (c) { html += "<th>" + esc(c) + "</th>"; });
      html += "<th>操作</th></tr></thead><tbody>";
      cdf.forEach(function (row, ri) {
        html += '<tr data-i="' + ri + '">';
        row.forEach(function (v, ci) {
          html += '<td><input data-r="' + ri + '" data-c="' + ci + '" value="' + esc(v) + '" placeholder="填写"></td>';
        });
        html += '<td class="cdf-ops">' +
          '<button type="button" class="btn cdf-move" data-dir="-1" title="上移">↑</button> ' +
          '<button type="button" class="btn cdf-move" data-dir="1" title="下移">↓</button> ' +
          '<button type="button" class="btn cdf-del" title="删除此行">🗑</button></td></tr>';
      });
      html += "</tbody></table></div>";
      html += '<p style="margin-top:10px">' +
        '<button type="button" class="btn btn-primary" id="cdfAdd">➕ 添加一行</button> ' +
        '<button type="button" class="btn" id="cdfCopy">📋 复制为文本</button> ' +
        '<button type="button" class="btn" id="cdfCsv">⬇ 下载 CSV</button> ' +
        '<button type="button" class="btn" id="cdfReset">↺ 恢复示例</button></p>';
      cdfBox.innerHTML = html;
      bindCdf();
    }

    function cdfCollect() {
      cdfBox.querySelectorAll("tbody tr[data-i]").forEach(function (tr) {
        var ri = Number(tr.getAttribute("data-i"));
        cdf[ri] = CDF_COLS.map(function (_, ci) {
          var inp = tr.querySelector('input[data-r="' + ri + '"][data-c="' + ci + '"]');
          return inp ? inp.value : "";
        });
      });
      save(CDF_KEY, cdf);
    }

    function bindCdf() {
      cdfBox.querySelectorAll("input").forEach(function (inp) {
        inp.addEventListener("input", cdfCollect);
      });
      cdfBox.querySelectorAll(".cdf-move").forEach(function (b) {
        b.addEventListener("click", function () {
          var ri = Number(b.closest("tr").getAttribute("data-i"));
          var dir = Number(b.getAttribute("data-dir"));
          var ni = ri + dir;
          if (ni < 0 || ni >= cdf.length) return;
          cdfCollect();
          var t = cdf[ri]; cdf[ri] = cdf[ni]; cdf[ni] = t;
          save(CDF_KEY, cdf);
          cdfRender();
        });
      });
      cdfBox.querySelectorAll(".cdf-del").forEach(function (b) {
        b.addEventListener("click", function () {
          var ri = Number(b.closest("tr").getAttribute("data-i"));
          cdfCollect();
          cdf.splice(ri, 1);
          if (!cdf.length) cdf.push(["", "", "", "", "", "", ""]);
          save(CDF_KEY, cdf);
          cdfRender();
        });
      });
      var add = document.getElementById("cdfAdd");
      if (add) add.addEventListener("click", function () {
        cdfCollect();
        cdf.push(["", "", "", "", "", "", ""]);
        save(CDF_KEY, cdf);
        cdfRender();
      });
      var copy = document.getElementById("cdfCopy");
      if (copy) copy.addEventListener("click", function () {
        cdfCollect();
        var txt = "关键元器件清单（CDF）\n" + CDF_COLS.join("\t") + "\n" +
          cdf.map(function (r) { return r.join("\t"); }).join("\n");
        copyText(txt, "CDF 已复制");
      });
      var csv = document.getElementById("cdfCsv");
      if (csv) csv.addEventListener("click", function () {
        cdfCollect();
        var rows = [CDF_COLS].concat(cdf).map(function (r) {
          return r.map(function (v) { return '\"' + String(v || "").replace(/\"/g, '\"\"') + '\"'; }).join(",");
        });
        var blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "CDF-" + new Date().toISOString().slice(0, 10) + ".csv";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        toast("CSV 已下载");
      });
      var reset = document.getElementById("cdfReset");
      if (reset) reset.addEventListener("click", function () {
        if (!window.confirm("恢复为示例清单？当前内容会被覆盖。")) return;
        cdf = DEFAULT_CDF.map(function (r) { return r.slice(); });
        save(CDF_KEY, cdf);
        cdfRender();
        toast("已恢复示例");
      });
    }

    function copyText(txt, msg) {
      function fin() { toast(msg || "已复制"); }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(fin).catch(fin); }
      else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); fin(); }
    }

    cdfRender();
  }

  /* ================= DoC 字段 ================= */
  var DOC_FIELDS = ["product", "model", "manufacturer", "address", "standards", "signer", "place", "date"];
  var docBox = document.getElementById("docBox");
  if (docBox) {
    var doc = load(DOC_KEY, {});
    DOC_FIELDS.forEach(function (f) {
      var inp = docBox.querySelector("[data-doc='" + f + "']");
      if (inp) {
        inp.value = doc[f] || "";
        inp.addEventListener("input", function () {
          var d = load(DOC_KEY, {});
          d[f] = inp.value;
          save(DOC_KEY, d);
        });
      }
    });
  }

  /* ================= 铭牌 ================= */
  var LABEL_FIELDS = ["pname", "model", "voltage", "current", "power", "freq", "maker", "origin", "marks", "warn"];
  var labelBox = document.getElementById("labelBox");
  if (labelBox) {
    var lb = load(LABEL_KEY, {});
    function labelPreview() {
      var pre = document.getElementById("labelPreview");
      if (!pre) return;
      var v = function (k) { var i = labelBox.querySelector("[data-label='" + k + "']"); return i ? i.value : ""; };
      pre.innerHTML = "<b>" + esc(v("pname") || "产品名称 / Product") + "</b><br>" +
        "型号 Model：" + esc(v("model") || "＿＿＿") + "<br>" +
        "额定电压 Rated Voltage：" + esc(v("voltage") || "220–240V~") + "　频率：" + esc(v("freq") || "50/60Hz") + "<br>" +
        "额定电流 Rated Current：" + esc(v("current") || "0.3A") + "　额定功率：" + esc(v("power") || "≤ 65W") + "<br>" +
        "制造商 Manufacturer：" + esc(v("maker") || "＿＿＿＿") + "<br>" +
        "产地 Made in：" + esc(v("origin") || "China") + "<br>" +
        "认证标志位：" + esc(v("marks") || "CE / CCC / UL / PSE …") + "<br>" +
        (v("warn") ? esc(v("warn")) + "<br>" : "");
    }
    LABEL_FIELDS.forEach(function (f) {
      var inp = labelBox.querySelector("[data-label='" + f + "']");
      if (inp) {
        inp.value = lb[f] || "";
        inp.addEventListener("input", function () {
          var d = load(LABEL_KEY, {});
          d[f] = inp.value;
          save(LABEL_KEY, d);
          labelPreview();
        });
      }
    });
    labelPreview();
  }

  /* ================= 打印 ================= */
  var printBtn = document.getElementById("tplPrint");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
