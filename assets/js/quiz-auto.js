(function () {
  "use strict";
  function buildAutoQuestions() {
    var out = [];
    try {
      var cards = window.KNOWLEDGE_DETAILS || {};
      var order = window.KNOWLEDGE_ORDER || [];
      var stds = window.STANDARDS_DATA || [];
      var tests = window.RELIABILITY_TESTS || [];
      var codes = [];
      stds.forEach(function (s) { if (s && s.code) codes.push(String(s.code).replace(/\s+/g, " ").trim()); });
      function stripHtml(h) { var d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent || ""; }
      function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
      function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
      function pick(arr, n, r) { var a = arr.slice(); var res = []; while (res.length < n && a.length) { res.push(a.splice(Math.floor(r() * a.length), 1)[0]); } return res; }
      function shuffle(arr, r) { for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
      var groupNames = { shock: "防电击", energy: "能量危险", fire: "防火", thermal: "热量危险", mechanical: "机械危险", radiation: "辐射危险", chemical: "化学危险", emc: "EMC 与认证", medical: "医疗专项", cert: "认证流程", general: "通用环境" };
      var groupIds = Object.keys(groupNames);
      var titles = order.map(function (id) { return cards[id] ? cards[id].title : id; });

      order.forEach(function (id) {
        var c = cards[id];
        if (!c) return;
        var r = rng(hash(id));
        var hazard = c.hazard;
        // 主题 -> 分组
        var gOthers = groupIds.filter(function (g) { return g !== hazard && groupNames[g]; });
        var gOpts = pick(gOthers, 3, r);
        gOpts.push(hazard);
        gOpts = shuffle(gOpts, r);
        out.push({ module: "auto", auto: true, q: "“" + c.title + "”属于哪个安全因素分组？", options: gOpts.map(function (g) { return groupNames[g]; }), answer: gOpts.indexOf(hazard), explain: "该主题归入「" + groupNames[hazard] + "」分组；先按危害定位，再深入学标准与测试。" });

        // 卡片 -> 标准
        var text = stripHtml(c.html);
        var myCodes = codes.filter(function (code) { return text.indexOf(code) !== -1; });
        if (myCodes.length) {
          var code = myCodes[0];
          var others = codes.filter(function (x) { return myCodes.indexOf(x) === -1; });
          var opts = pick(others, 3, r);
          opts.push(code);
          opts = shuffle(opts, r);
          out.push({ module: "auto", auto: true, q: "“" + c.title + "”通常依据哪个标准？", options: opts, answer: opts.indexOf(code), explain: "该知识卡内容依据 " + code + " 整理；正式判定以标准原文为准。" });
        }
      });

      // 标准 -> 主题（唯一对应）
      codes.forEach(function (code) {
        var hits = order.filter(function (id) { return cards[id] && stripHtml(cards[id].html).indexOf(code) !== -1; });
        if (hits.length !== 1) return;
        var correct = cards[hits[0]].title;
        var r = rng(hash("std-" + code));
        var others = titles.filter(function (t) { return t !== correct; });
        var opts = pick(others, 3, r);
        opts.push(correct);
        opts = shuffle(opts, rng(hash("std-" + code) + 7));
        out.push({ module: "auto", auto: true, q: "标准 " + code + " 主要对应哪个知识主题？", options: opts, answer: opts.indexOf(correct), explain: "在知识卡「" + correct + "」中引用了该标准。" });
      });

      // 可靠性试验 -> 标准
      tests.forEach(function (t) {
        var r = rng(hash("t-" + t.id));
        var stdText = String(t.standards || "");
        var code = (stdText.match(/(?:IEC|ISO|GB\/T|UL|UN|CISPR|AEC)[ \/-]?[\dA-Za-z.\/-]+/) || [])[0] || stdText.split(/[、,]/)[0];
        if (!code || code.length < 3) return;
        var others = tests.map(function (x) { return (String(x.standards || "").match(/(?:IEC|ISO|GB\/T|UL|UN|CISPR|AEC)[ \/-]?[\dA-Za-z.\/-]+/) || [])[0]; }).filter(function (x) { return x && x !== code; });
        var opts = pick(others, 3, r);
        opts.push(code);
        opts = shuffle(opts, r);
        out.push({ module: "auto", auto: true, q: "「" + t.name + "」的标准依据是？", options: opts, answer: opts.indexOf(code), explain: t.standards + "；具体条件与判据以标准原文为准。" });
      });
    } catch (e) { /* 自动题生成失败不影响精选题库 */ }
    return out;
  }
  window.buildAutoQuestions = buildAutoQuestions;
})();
