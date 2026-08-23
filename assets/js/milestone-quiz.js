/* 里程碑自测（knowledge.html 主线分段测验）
 * 数据源：CARD_QUIZ（每卡 1–2 题）+ CARD_MILESTONES（主线分段）
 * 全部答对即通过；结果存 localStorage "angui-milestone-v1"
 */
(function () {
  "use strict";
  if (typeof CARD_QUIZ === "undefined" || typeof CARD_MILESTONES === "undefined") return;
  var MS_KEY = "angui-milestone-v1";
  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }
  function load() { try { return JSON.parse(localStorage.getItem(MS_KEY) || "{}"); } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(MS_KEY, JSON.stringify(s)); } catch (e) {} }
  function cardTitle(cid) {
    return (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[cid] && KNOWLEDGE_DETAILS[cid].title) || cid;
  }
  function collect(mi) {
    var m = CARD_MILESTONES[mi] || { name: "", ids: [] };
    var list = [];
    (m.ids || []).forEach(function (cid) {
      (CARD_QUIZ[cid] || []).forEach(function (q, qi) {
        list.push({ qid: mi + "::" + cid + "::" + qi, cid: cid, q: q });
      });
    });
    return list;
  }
  function updateSummary() {
    var st = load();
    var n = 0;
    CARD_MILESTONES.forEach(function (m, mi) { if (st[mi] && st[mi].passed) n++; });
    var el = document.getElementById("msSummary");
    if (el) el.textContent = "已通过 " + n + " / " + CARD_MILESTONES.length + " 段";
  }
  function render() {
    var box = document.getElementById("milestoneList");
    if (!box) return;
    var st = load();
    var html = CARD_MILESTONES.map(function (m, mi) {
      var qs = collect(mi);
      var s = st[mi] || {};
      var passed = !!s.passed;
      var answered = 0;
      qs.forEach(function (x) { if (s.sel && s.sel[x.qid] != null) answered++; });
      var badge = passed
        ? '<span class="ms-badge ms-pass">✓ 已通过</span>'
        : (answered > 0 ? '<span class="ms-badge">进行中 ' + answered + '/' + qs.length + '</span>' : '');
      var body;
      if (!qs.length) {
        body = '<p class="ms-q" style="margin-top:14px">该段暂无私测题。</p>';
      } else {
        body = qs.map(function (x, qi) {
          var q = x.q;
          var sel = (s.sel && s.sel[x.qid] != null) ? s.sel[x.qid] : -1;
          var opts = (q.o || []).map(function (o, oi) {
            return '<label class="ms-opt"><input type="radio" name="msq' + mi + '_' + qi + '" value="' + oi + '"' + (sel === oi ? ' checked' : '') + '> ' + esc(o) + '</label>';
          }).join("");
          return '<div class="ms-q" data-qid="' + x.qid + '" data-a="' + q.a + '">' +
            '<p class="ms-q-title">' + (qi + 1) + '. ' + esc(q.q) + ' <span class="ms-q-cardsrc">（' + esc(cardTitle(x.cid)) + '）</span></p>' +
            opts +
            (q.e ? '<p class="ms-exp">解析：' + esc(q.e) + '</p>' : '') +
            '</div>';
        }).join("");
        body += '<div class="ms-actions">' +
          (passed
            ? '<button type="button" class="ms-submit" data-action="retest" data-mi="' + mi + '">↻ 重测本段</button>'
            : '<button type="button" class="ms-submit" data-action="grade" data-mi="' + mi + '">提交本段</button>') +
          '<span class="ms-result' + (passed ? ' ok' : '') + '" data-mi="' + mi + '">' + (passed ? '✓ 本段已通过' : '') + '</span></div>';
      }
      return '<div class="ms-block' + (passed ? ' passed' : '') + (mi === 0 ? ' open' : '') + '" data-mi="' + mi + '">' +
        '<div class="ms-head"><span class="ms-name">' + esc(m.name) + '</span>' +
        '<span class="ms-meta">' + qs.length + ' 题 · ' + (m.ids || []).length + ' 张卡</span>' + badge +
        '<span class="ms-toggle">▼</span></div>' +
        '<div class="ms-body">' + body + '</div></div>';
    }).join("");
    box.innerHTML = html;

    box.querySelectorAll(".ms-head").forEach(function (h) {
      h.addEventListener("click", function () {
        var b = h.parentNode;
        var nowOpen = b.classList.toggle("open");
        if (nowOpen) {
          box.querySelectorAll(".ms-block.open").forEach(function (o) { if (o !== b) o.classList.remove("open"); });
        }
      });
    });
    box.querySelectorAll('.ms-submit[data-action="grade"]').forEach(function (btn) {
      btn.addEventListener("click", function () { grade(Number(btn.getAttribute("data-mi"))); });
    });
    box.querySelectorAll('.ms-submit[data-action="retest"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mi = Number(btn.getAttribute("data-mi"));
        var st2 = load();
        delete st2[mi];
        save(st2);
        render();
      });
    });
    updateSummary();
  }

  function grade(mi) {
    var st = load();
    var s = st[mi] || { sel: {} };
    var qs = collect(mi);
    var all = true;
    qs.forEach(function (x) {
      var q = x.q;
      var node = document.querySelector('.ms-q[data-qid="' + x.qid + '"]');
      if (!node) return;
      var checked = node.querySelector('input[type="radio"]:checked');
      var v = checked ? Number(checked.value) : -1;
      s.sel[x.qid] = v;
      node.classList.remove("correct", "wrong");
      if (v === q.a) { node.classList.add("correct"); } else { node.classList.add("wrong"); all = false; }
    });
    var res = document.querySelector('.ms-result[data-mi="' + mi + '"]');
    var blk = document.querySelector('.ms-block[data-mi="' + mi + '"]');
    if (all) {
      s.passed = true;
      st[mi] = s;
      save(st);
      if (res) { res.className = "ms-result ok"; res.textContent = "🎉 全部答对，本段通过！"; }
      if (blk) {
        blk.classList.add("passed");
        var bd = blk.querySelector(".ms-badge");
        if (bd) bd.outerHTML = '<span class="ms-badge ms-pass">✓ 已通过</span>';
      }
      updateSummary();
    } else {
      if (res) { res.className = "ms-result bad"; res.textContent = "还有答错的题，对照解析再学一遍～"; }
      st[mi] = s;
      save(st);
    }
  }

  render();
})();
