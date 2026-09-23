/* ============================================================================
   安规示意图库（离线 SVG，无外部请求）
   ----------------------------------------------------------------------------
   用法：页面里放一个占位标记，图会自动渲染进去
     <figure class="dgm" data-dgm="creepage-clearance">
       <figcaption>图 1 · 爬电距离沿表面走，电气间隙穿空气</figcaption>
     </figure>
   可选属性：
     data-dgm="名称"          图库里的图名（见下方 DIAGRAMS）
     data-dgm-alt="…"         无障碍描述（默认取 figcaption 文本）
   在 JS 里取图： window.AnguiDiagram.get("creepage-clearance") → SVG 字符串
   样式在 assets/css/diagrams.css；颜色全部走 CSS 变量，深色主题自动适配。

   排版约定（避免图上文字重叠或被裁）：
   - SVG 文本不会自动换行 → 长句一律交给 para() / paraList() 折行；
   - 底部注释用 paraList()，它返回实际占用高度，viewBox 高度按它动态计算。
   ========================================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function n2(v) { return Math.round(v * 100) / 100; }

  /* ---------- 基础图形 helper ---------- */
  function T(x, y, s, cls, anchor) {
    return '<text class="' + (cls || "d-t") + '" x="' + x + '" y="' + y + '"' +
      (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + esc(s) + "</text>";
  }
  // 折行：CJK 记 1 宽、ASCII 记 0.55 宽，优先在标点处断行
  function wrap(s, max) {
    s = String(s);
    var out = [], rest = s, punct = "，。；：、！？）】》」』,.;:!?)>]";
    while (rest.length) {
      var w = 0, i = 0;
      while (i < rest.length && w < max) {
        w += rest.charCodeAt(i) < 128 ? 0.55 : 1;
        i++;
      }
      if (i >= rest.length) { out.push(rest); break; }
      var cut = -1;
      for (var j = i; j > Math.max(0, i - 12); j--) {
        if (punct.indexOf(rest[j - 1]) !== -1) { cut = j; break; }
      }
      if (cut < 0) cut = i;
      // 避免标点被甩到下一行行首
      while (cut < rest.length && punct.indexOf(rest[cut]) !== -1) cut++;
      out.push(rest.slice(0, cut));
      rest = rest.slice(cut);
    }
    return out;
  }
  function para(x, y, s, cls, max) {
    return wrap(s, max || 46).map(function (t, i) { return T(x, y + i * 20, t, cls); }).join("");
  }
  // 多段注释：返回 { svg, bottom }，bottom 是最后一行基线 y
  function paraList(x, y, items, max, lh) {
    max = max || 46; lh = lh || 20;
    var out = "", cy = y;
    items.forEach(function (it) {
      var txt = typeof it === "string" ? it : it.t;
      var cls = typeof it === "string" ? "d-t" : (it.cls || "d-t");
      wrap(txt, max).forEach(function (line) { out += T(x, cy, line, cls); cy += lh; });
      cy += 8;
    });
    return { svg: out, bottom: cy - 8 };
  }
  function box(x, y, w, h, title, sub, cls, rx) {
    var o = '<rect class="' + (cls || "d-box") + '" x="' + x + '" y="' + y + '" width="' + w +
      '" height="' + h + '" rx="' + (rx == null ? 9 : rx) + '"/>';
    if (title && sub) {
      o += T(x + w / 2, y + h / 2 - 3, title, "d-tb", "middle") + T(x + w / 2, y + h / 2 + 15, sub, "d-tm", "middle");
    } else if (title) {
      o += T(x + w / 2, y + h / 2 + 5, title, "d-tb", "middle");
    }
    return o;
  }
  function arr(x1, y1, x2, y2, cls) {
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / len, uy = dy / len, s = 8, w = 4.2;
    var bx = x2 - ux * s, by = y2 - uy * s, px = -uy, py = ux;
    var c = cls || "d-arr";
    return '<line class="' + c + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + n2(bx) + '" y2="' + n2(by) + '"/>' +
      '<polygon class="' + c + '" points="' + x2 + "," + y2 + " " + n2(bx + px * w) + "," + n2(by + py * w) +
      " " + n2(bx - px * w) + "," + n2(by - py * w) + '"/>';
  }
  function drop(x, y, s) {
    return '<path class="d-water" d="M' + x + " " + (y - s) + " q" + n2(s * 0.9) + " " + n2(s * 1.1) + " 0 " + n2(s * 1.6) +
      " q-" + n2(s * 0.9) + " -" + n2(s * 0.5) + " 0 -" + n2(s * 1.6) + 'Z"/>';
  }
  function dots(x, y, n, gap) {
    var o = "";
    for (var i = 0; i < n; i++) o += '<circle class="d-dust" cx="' + (x + i * gap) + '" cy="' + (y + (i % 2 ? 5 : 0)) + '" r="2.2"/>';
    return o;
  }
  function earth(x, y) {
    return '<line class="d-line" x1="' + x + '" y1="' + (y - 14) + '" x2="' + x + '" y2="' + y + '"/>' +
      '<line class="d-line" x1="' + (x - 13) + '" y1="' + y + '" x2="' + (x + 13) + '" y2="' + y + '"/>' +
      '<line class="d-line" x1="' + (x - 8) + '" y1="' + (y + 5) + '" x2="' + (x + 8) + '" y2="' + (y + 5) + '"/>' +
      '<line class="d-line" x1="' + (x - 3) + '" y1="' + (y + 10) + '" x2="' + (x + 3) + '" y2="' + (y + 10) + '"/>';
  }
  function wire(pts, cls) { return '<polyline class="' + (cls || "d-line") + '" points="' + pts + '"/>'; }
  function cap(x, y, cls) {
    var c = cls || "d-line";
    return '<line class="' + c + '" x1="' + x + '" y1="' + (y - 9) + '" x2="' + x + '" y2="' + (y + 9) + '"/>' +
      '<line class="' + c + '" x1="' + (x + 7) + '" y1="' + (y - 9) + '" x2="' + (x + 7) + '" y2="' + (y + 9) + '"/>';
  }
  function res(x, y, cls) { return '<rect class="' + (cls || "d-box") + '" x="' + x + '" y="' + (y - 6) + '" width="26" height="12" rx="2"/>'; }
  // 统一出口：按正文内容高度生成 svg
  function svgOut(s, bottom) { return '<svg viewBox="0 0 720 ' + n2(bottom) + '" role="img">' + s + "</svg>"; }

  var DIAGRAMS = {};

  /* ==========================================================================
     1) 爬电距离 vs 电气间隙
     ========================================================================== */
  DIAGRAMS["creepage-clearance"] = {
    caption: "爬电距离沿绝缘表面走，电气间隙穿空气走",
    svg: function () {
      var s = "";
      s += T(360, 24, "同一对导体，两条不同的“最短路径”", "d-tb", "middle");
      s += '<rect class="d-air" x="60" y="50" width="600" height="100" rx="10"/>';
      s += T(72, 70, "空气（会被击穿）", "d-tm");
      s += '<line class="d-clear d-dash" x1="242" y1="109" x2="478" y2="109"/>';
      s += arr(242, 109, 330, 109, "d-arr-clear");
      s += arr(478, 109, 390, 109, "d-arr-clear");
      s += T(360, 88, "电气间隙（Clearance）", "d-tb", "middle");
      s += T(360, 134, "空间最短直线距离", "d-tm", "middle");
      // 基板 → 开槽 → 爬电路径（顺序保证路径可见）
      s += '<rect class="d-sub" x="60" y="150" width="600" height="38" rx="6"/>';
      s += '<rect class="d-notch" x="344" y="150" width="34" height="30"/>';
      s += T(72, 174, "绝缘基板 / 外壳表面", "d-tm");
      s += T(361, 198, "开槽 / 凹槽", "d-tm", "middle");
      s += box(110, 96, 132, 26, "", "", "d-cond");
      s += box(478, 96, 132, 26, "", "", "d-cond");
      s += T(176, 113, "导体 A", "d-tb", "middle");
      s += T(544, 113, "导体 B", "d-tb", "middle");
      s += '<path class="d-creep d-dash" d="M242 122 L242 150 L344 150 L344 180 L378 180 L378 150 L478 150 L478 122"/>';
      s += T(360, 222, "爬电距离（Creepage）＝ 沿绝缘表面的最短路径", "d-tb", "middle");
      var n = paraList(60, 246, [
        { t: "表面开槽、加筋会把路径拉长，爬电距离随之变大——上图绕槽比走直线多约 60 个单位。", cls: "d-tm" },
        { t: "判定口径：爬电看“表面污染 + 电压有效值”，间隙看“峰值 / 冲击电压”。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     2) 绝缘配合参数链
     ========================================================================== */
  DIAGRAMS["insulation-chain"] = {
    caption: "绝缘配合参数链：从工作电压一路推到爬电 / 间隙",
    svg: function () {
      var s = "", y = 34, i;
      var steps = [
        ["① 工作电压（有效值）", "电路上实际出现的最高电压"],
        ["② 过电压类别 OVC", "I / II / III / IV，由供电位置决定"],
        ["③ 额定冲击电压 Uimp", "由 OVC + 标称电压查表得到"],
        ["④ 污染等级 PD", "微观环境：PD1–PD4"],
        ["⑤ 材料组（CTI）", "Ⅰ / Ⅱ / Ⅲa / Ⅲb，由材料实测 CTI 定"],
        ["⑥ 海拔修正", "＞2000m 只放大电气间隙"],
        ["⑦ 查表得结果", "爬电距离 · 电气间隙（必要时再看耐压）"]
      ];
      var notes = ["", "装在配电入口 → 往往 III / IV", "这一列决定间隙（空气击穿）", "户外 / 凝露 / 导电粉尘 → 更严",
        "CTI 越低，爬电要求越长", "爬电距离不受海拔影响", "两项都要满足，取更严者"];
      var tones = ["", "warn", "", "warn", "", "warn", "ok"];
      for (i = 0; i < steps.length; i++) {
        s += box(56, y, 300, 44, steps[i][0], steps[i][1], "d-box" + (tones[i] ? " d-box-" + tones[i] : ""));
        if (notes[i]) s += T(372, y + 26, "↳ " + notes[i], i === steps.length - 1 ? "d-tw" : "d-tm");
        if (i < steps.length - 1) s += arr(206, y + 44, 206, y + 66, "d-arr");
        y += 66;
      }
      s += '<line class="d-div" x1="360" y1="34" x2="360" y2="' + (y - 22) + '"/>';
      s += T(56, 22, "绝缘配合的参数链（缺一环就查错表）", "d-tb");
      return svgOut(s, y + 8);
    }
  };

  /* ==========================================================================
     3) 污染等级 PD1–PD4
     ========================================================================== */
  DIAGRAMS["pollution-degree"] = {
    caption: "污染等级 PD1–PD4：看绝缘表面的微观环境",
    svg: function () {
      var s = "", x0 = 40, y0 = 34, w = 312, h = 132, i;
      var items = [
        ["PD1", "洁净、干燥、密封腔体", "无污染或只有干燥非导电污染", "d-box-ok"],
        ["PD2", "一般室内环境", "仅非导电污染，偶发凝露", "d-box"],
        ["PD3", "导电粉尘 / 凝露环境", "导电污染，或干非导电污染 + 凝露", "d-box-warn"],
        ["PD4", "户外淋雨 / 盐雾", "污染持续存在（如导电水膜）", "d-box-danger"]
      ];
      for (i = 0; i < 4; i++) {
        var x = x0 + (i % 2) * (w + 16), y = y0 + Math.floor(i / 2) * (h + 16);
        s += box(x, y, w, h, "", "", items[i][3], 12);
        s += T(x + 16, y + 30, items[i][0], "d-ta");
        s += T(x + 62, y + 30, items[i][1], "d-tb");
        s += T(x + 16, y + 54, items[i][2], "d-tm");
        var cx = x + 60, cy = y + 96;
        if (i === 0) {
          s += '<rect class="d-box" x="' + (cx - 46) + '" y="' + (cy - 26) + '" width="92" height="40" rx="8"/>';
          s += box(cx - 26, cy - 12, 52, 14, "", "", "d-cond", 3);
          s += T(cx, cy + 30, "密封 = 内部微环境干净", "d-tm", "middle");
        } else if (i === 1) {
          s += '<rect class="d-box" x="' + (cx - 46) + '" y="' + (cy - 26) + '" width="92" height="40" rx="4"/>';
          s += '<polyline class="d-line" points="' + (cx - 54) + "," + (cy - 26) + " " + cx + "," + (cy - 36) + " " + (cx + 54) + "," + (cy - 26) + '"/>';
          s += box(cx - 26, cy - 14, 52, 12, "", "", "d-cond", 3);
          s += T(cx, cy + 30, "干燥室内、无导电粉尘", "d-tm", "middle");
        } else if (i === 2) {
          s += '<rect class="d-box" x="' + (cx - 46) + '" y="' + (cy - 26) + '" width="92" height="40" rx="4"/>';
          s += dots(cx - 34, cy - 18, 6, 13);
          s += drop(cx + 24, cy - 22, 7);
          s += T(cx, cy + 30, "导电粉尘 + 凝露/水膜", "d-tm", "middle");
        } else {
          s += '<rect class="d-box-danger" x="' + (cx - 46) + '" y="' + (cy - 26) + '" width="92" height="40" rx="4"/>';
          s += '<path class="d-water" d="M' + (cx - 40) + " " + (cy - 6) + ' q12 -8 24 0 q12 8 24 0 q12 -8 22 0"/>';
          s += '<path class="d-water" d="M' + (cx - 40) + " " + (cy + 6) + ' q12 -8 24 0 q12 8 24 0 q12 -8 22 0"/>';
          s += T(cx, cy + 30, "持续导电污染（雨/盐雾）", "d-tm", "middle");
        }
      }
      var n = paraList(40, y0 + 2 * (h + 16) + 24, [
        { t: "等级越高 → 爬电距离要求越长；PD 判的是“绝缘表面”，不是整个房间。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     4) 双重绝缘 / 加强绝缘
     ========================================================================== */
  DIAGRAMS["double-insulation"] = {
    caption: "双重绝缘 = 基本 + 附加；加强绝缘 = 单层等效",
    svg: function () {
      var s = "";
      s += T(180, 26, "双重绝缘（两层分开）", "d-tb", "middle");
      s += T(540, 26, "加强绝缘（单层等效）", "d-tb", "middle");
      s += box(40, 64, 270, 24, "", "", "d-cond");
      s += T(175, 80, "带电导体", "d-tb", "middle");
      s += '<rect class="d-ins-basic" x="40" y="100" width="270" height="34" rx="4"/>';
      s += T(175, 122, "基本绝缘（Basic）", "d-tb", "middle");
      s += '<rect class="d-ins-supp" x="40" y="146" width="270" height="34" rx="4"/>';
      s += T(175, 168, "附加绝缘（Supplementary）", "d-tb", "middle");
      s += '<line class="d-line" x1="40" y1="192" x2="310" y2="192"/>';
      s += T(175, 212, "可触及表面（SELV / 外壳）", "d-tm", "middle");
      s += T(175, 236, "两层都要能各自承受耐压", "d-ta", "middle");
      s += T(360, 150, "＝", "d-eq", "middle");
      s += box(410, 64, 270, 24, "", "", "d-cond");
      s += T(545, 80, "带电导体", "d-tb", "middle");
      s += '<rect class="d-ins-reinf" x="410" y="100" width="270" height="80" rx="4"/>';
      s += T(545, 146, "加强绝缘（Reinforced）", "d-tb", "middle");
      s += '<line class="d-line" x1="410" y1="192" x2="680" y2="192"/>';
      s += T(545, 212, "可触及表面", "d-tm", "middle");
      s += T(545, 236, "厚度 / 距离按“加强”档取值", "d-ta", "middle");
      var n = paraList(40, 270, [
        { t: "有接地的 I 类设备：基本绝缘 + 保护接地；II 类设备：双重或加强绝缘，且不允许依赖接地。", cls: "d-tm" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     5) MOPP / MOOP
     ========================================================================== */
  DIAGRAMS["mopp-moop"] = {
    caption: "MOPP 面向患者，MOOP 面向操作者",
    svg: function () {
      var s = "";
      s += T(360, 24, "同一台医疗设备上，患者侧与操作者侧的防护要求不同", "d-tb", "middle");
      s += '<circle class="d-line" cx="52" cy="118" r="13"/>';
      s += '<line class="d-line" x1="52" y1="131" x2="52" y2="170"/>';
      s += '<line class="d-line" x1="30" y1="148" x2="74" y2="148"/>';
      s += T(52, 196, "患者", "d-tb", "middle");
      s += box(96, 120, 74, 44, "应用部分", "Applied part", "d-box-warn");
      s += box(200, 112, 116, 60, "一次侧", "网电源", "d-box");
      s += box(346, 112, 116, 60, "二次侧", "SELV 电路", "d-box");
      s += box(492, 112, 106, 60, "外壳", "可触及", "d-box");
      s += '<line class="d-div d-dash" x1="330" y1="96" x2="330" y2="196"/>';
      s += T(330, 88, "1 × MOPP", "d-ta", "middle");
      s += T(300, 218, "爬电 4.0", "d-tw", "middle");
      s += T(300, 234, "间隙 2.5 mm", "d-tw", "middle");
      s += T(300, 250, "耐压 1500 V AC", "d-tm", "middle");
      s += '<line class="d-div d-dash" x1="472" y1="96" x2="472" y2="196"/>';
      s += T(472, 88, "1 × MOOP", "d-ta", "middle");
      s += T(512, 218, "爬电 2.5", "d-tw", "middle");
      s += T(512, 234, "间隙 2.0 mm", "d-tw", "middle");
      s += T(512, 250, "耐压 1500 V AC", "d-tm", "middle");
      s += arr(170, 142, 198, 142, "d-arr");
      s += arr(316, 142, 344, 142, "d-arr");
      s += arr(462, 142, 490, 142, "d-arr");
      s += arr(598, 142, 626, 142, "d-arr");
      s += T(654, 146, "操作者", "d-tb", "middle");
      var n = paraList(40, 282, [
        { t: "2 × MOPP 要在 1 MOPP 之上再叠一层：爬电 8.0 / 间隙 5.0 mm、耐压 4000 V AC（250V 工作电压、PD2、材料组 Ⅲb 教学值）。", cls: "d-ta" },
        { t: "数 MOPP 要顺着“患者可触及 → 带电部分”这条路径数，不是数元件个数。", cls: "d-tm" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     6) I / II / III 类设备结构
     ========================================================================== */
  DIAGRAMS["insulation-classes"] = {
    caption: "I 类靠接地，II 类靠双重/加强绝缘，III 类靠 SELV 供电",
    svg: function () {
      var s = "", i, x0 = 36, w = 208, gap = 16;
      var titles = ["I 类：基本绝缘 + 接地", "II 类：双重 / 加强绝缘", "III 类：SELV 供电"];
      var colors = ["d-box", "d-box-ok", "d-box-warn"];
      for (i = 0; i < 3; i++) {
        var x = x0 + i * (w + gap), y = 40;
        s += box(x, y, w, 176, "", "", colors[i], 12);
        s += T(x + w / 2, y + 26, titles[i], "d-tb", "middle");
        s += '<rect class="d-box" x="' + (x + 22) + '" y="' + (y + 44) + '" width="' + (w - 44) + '" height="104" rx="8"/>';
        if (i === 0) {
          s += box(x + 46, y + 62, w - 92, 20, "", "", "d-cond", 3);
          s += T(x + w / 2, y + 76, "带电部分", "d-tb", "middle");
          s += '<rect class="d-ins-basic" x="' + (x + 36) + '" y="' + (y + 88) + '" width="' + (w - 72) + '" height="16" rx="3"/>';
          s += T(x + w / 2, y + 100, "基本绝缘", "d-tm", "middle");
          s += earth(x + w / 2, y + 138);
          s += T(x + w / 2, y + 168, "断地 = 只剩基本绝缘", "d-tw", "middle");
        } else if (i === 1) {
          s += box(x + 46, y + 62, w - 92, 20, "", "", "d-cond", 3);
          s += T(x + w / 2, y + 76, "带电部分", "d-tb", "middle");
          s += '<rect class="d-ins-reinf" x="' + (x + 36) + '" y="' + (y + 88) + '" width="' + (w - 72) + '" height="30" rx="3"/>';
          s += T(x + w / 2, y + 107, "双重或加强绝缘", "d-tb", "middle");
          s += T(x + w / 2, y + 138, "回字符号：不依赖接地", "d-tm", "middle");
          s += T(x + w / 2, y + 168, "接地可保留但不算防护", "d-tw", "middle");
        } else {
          s += box(x + 34, y + 58, w - 68, 26, "SELV 电源", "≤42.4V peak", "d-box", 6);
          s += box(x + 46, y + 98, w - 92, 22, "", "", "d-cond", 3);
          s += T(x + w / 2, y + 113, "低压电路", "d-tb", "middle");
          s += T(x + w / 2, y + 138, "不按市电距离约束", "d-tm", "middle");
          s += T(x + w / 2, y + 168, "来源本身仍须隔离", "d-tw", "middle");
        }
      }
      var n = paraList(36, 242, [
        { t: "中间那张最容易踩坑：II 类不是“多加一层胶带”，而是每层都要按标准单独考核。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     7) SELV / PELV 电压分区
     ========================================================================== */
  DIAGRAMS["selv-limits"] = {
    caption: "SELV 的关键是“电压上限 + 隔离来源”",
    svg: function () {
      var s = "";
      s += T(360, 24, "按电压分区（教学值）", "d-tb", "middle");
      s += '<rect class="d-zone-ok" x="60" y="60" width="260" height="54" rx="8"/>';
      s += '<rect class="d-zone-mid" x="320" y="60" width="110" height="54" rx="8"/>';
      s += '<rect class="d-zone-bad" x="430" y="60" width="230" height="54" rx="8"/>';
      s += T(190, 92, "SELV / PELV 允许区", "d-tb", "middle");
      s += T(375, 92, "TNV 等", "d-tb", "middle");
      s += T(545, 92, "危险电压", "d-tb", "middle");
      s += '<line class="d-div" x1="320" y1="48" x2="320" y2="128"/>';
      s += T(320, 142, "42.4 V peak / 60 V DC", "d-ta", "middle");
      s += '<line class="d-div" x1="430" y1="48" x2="430" y2="128"/>';
      s += T(115, 46, "12V / 24V / 48V", "d-tm", "middle");
      s += T(640, 46, "220V 市电", "d-tw", "middle");
      var n = paraList(60, 176, [
        { t: "成立三条件：① 电压不超过上限；② 由安全隔离变压器 / 等效隔离供电；③ 与危险带电部分之间满足隔离与距离要求。", cls: "d-t" },
        { t: "→ 只做到“电压低”不算 SELV：电池、USB 口如果来自一次侧且无隔离，仍要按危险电压考核。", cls: "d-ta" },
        { t: "→ 48V 车规 / 通信电源常落在上限附近，需按峰值与纹波核算，不能只看标称值。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     8) 耐压（Hipot）试验接线
     ========================================================================== */
  DIAGRAMS["hipot-setup"] = {
    caption: "耐压试验接线：高压端接被短接的带电部分，另一端接次级/外壳",
    svg: function () {
      var s = "";
      s += T(360, 24, "型式试验接线（教学示意）", "d-tb", "middle");
      s += box(250, 70, 230, 170, "", "", "d-box", 12);
      s += T(365, 92, "被试设备", "d-tb", "middle");
      s += box(272, 108, 90, 34, "L / N 短接", "一次侧", "d-cond", 6);
      s += box(272, 190, 90, 34, "次级 / 外壳", "短接后接回", "d-box-ok", 6);
      s += '<rect class="d-ins-reinf" x="378" y="108" width="84" height="116" rx="6"/>';
      s += T(420, 172, "被考核", "d-tb", "middle");
      s += T(420, 190, "绝缘", "d-tb", "middle");
      s += '<circle class="d-box" cx="120" cy="140" r="34"/>';
      s += T(120, 138, "高压", "d-tb", "middle");
      s += T(120, 156, "源", "d-tb", "middle");
      s += T(120, 194, "0 – 5 kV", "d-tm", "middle");
      s += T(120, 210, "AC / DC", "d-tm", "middle");
      s += wire("154,124 200,124 200,125 272,125", "d-acc-line");
      s += wire("362,207 500,207 500,268 120,268 120,174", "d-line");
      s += wire("154,156 180,156 180,207 272,207", "d-line");
      s += T(222, 114, "高压端", "d-ta", "middle");
      s += T(516, 240, "回路（接地端）", "d-tm");
      s += box(520, 70, 170, 108, "", "", "d-box-warn", 12);
      s += T(535, 94, "判定", "d-tb");
      s += T(535, 116, "· 无击穿、无飞弧", "d-t");
      s += T(535, 134, "· 漏电流 < 限值", "d-t");
      s += T(535, 152, "· 试验后功能正常", "d-t");
      var n = paraList(40, 292, [
        { t: "时间：型式试验通常 60 s；产线例行试验多为 1 s，电压可略高——以产品标准为准。", cls: "d-t" },
        { t: "常见错误：把 L 和 N 分开各打一次（绝缘承受的应力与真实工况不符）；忘记把次级与外壳短接后再加高压。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     9) 泄漏电流测量网络（IEC 60990 简化）
     ========================================================================== */
  DIAGRAMS["leakage-network"] = {
    caption: "泄漏电流要用加权网络测，不是普通电流表",
    svg: function () {
      var s = "";
      s += T(360, 24, "测量网络（IEC 60990 教学简化）", "d-tb", "middle");
      s += box(40, 90, 130, 80, "被测设备", "EUT", "d-box");
      s += T(105, 200, "可触及部件接出", "d-tm", "middle");
      s += wire("170,130 236,130", "d-acc-line");
      s += box(236, 74, 300, 112, "", "", "d-box", 12);
      s += T(386, 96, "测量网络", "d-tb", "middle");
      s += res(258, 130);
      s += T(271, 116, "1.5 kΩ", "d-tm", "middle");
      s += cap(320, 130);
      s += T(324, 116, "0.22 µF", "d-tm", "middle");
      s += res(370, 130);
      s += T(383, 116, "500 Ω", "d-tm", "middle");
      s += wire("271,130 314,130", "d-line");
      s += wire("327,130 370,130", "d-line");
      s += wire("396,130 440,130", "d-line");
      s += wire("420,130 420,176 300,176", "d-line");
      s += wire("258,130 236,130 236,160 300,160", "d-line");
      s += T(410, 168, "U₂", "d-ta");
      s += '<circle class="d-box" cx="470" cy="130" r="26"/>';
      s += T(470, 136, "mV", "d-tb", "middle");
      s += T(470, 196, "U₂ 除以 500 Ω 得泄漏电流", "d-ta", "middle");
      s += box(548, 90, 132, 80, "", "", "d-box-ok", 12);
      s += T(562, 118, "I = U₂ / 500 Ω", "d-t");
      s += T(562, 140, "单位 A（再换 mA）", "d-t");
      s += T(562, 160, "取最不利极性", "d-tm");
      var n = paraList(40, 232, [
        { t: "为什么不用普通电流表：人体对 50/60 Hz 电流的反应是频率相关的，标准规定用加权网络模拟人体阻抗；普通万用表测到的是“真有效值”，既不能反映感知 / 反应阈值，也无法复现不同标准的判据。", cls: "d-t" },
        { t: "测量条件：最不利电压（通常 1.06 倍额定）、最不利极性、以及断开保护接地 / 中性线等故障状态。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     10) 电源初次级隔离链路
     ========================================================================== */
  DIAGRAMS["isolation-chain"] = {
    caption: "电源的每一处跨隔离都被考核：变压器、Y 电容、光耦、反馈",
    svg: function () {
      var s = "";
      s += T(360, 24, "反激式开关电源的隔离链路（安规视角）", "d-tb", "middle");
      s += '<rect class="d-zone-bad-soft" x="26" y="64" width="330" height="180" rx="12"/>';
      s += '<rect class="d-zone-ok-soft" x="352" y="64" width="342" height="180" rx="12"/>';
      s += T(40, 84, "一次侧（危险带电）", "d-tw");
      s += T(680, 84, "二次侧（SELV）", "d-ta", "end");
      s += T(340, 46, "Y 电容（跨接初次级 · 容量受限）", "d-ta", "middle");
      s += wire("96,108 96,100 316,100", "d-acc-line");
      s += cap(320, 100, "d-acc-line");
      s += wire("327,100 640,100 640,108", "d-acc-line");
      s += T(660, 126, "共模干扰的主要通路之一", "d-tm", "end");
      s += box(46, 136, 74, 46, "AC 输入", "L / N / PE", "d-box");
      s += box(132, 136, 74, 46, "保险丝", "+ EMI", "d-box");
      s += box(46, 200, 74, 42, "整流", "桥堆", "d-box");
      s += box(132, 200, 74, 42, "开关管", "初级控制", "d-box");
      s += box(230, 136, 96, 106, "变压器", "爬电 / 间隙", "d-cond");
      s += box(360, 200, 74, 42, "次级整流", "二极管", "d-box");
      s += box(444, 200, 74, 42, "滤波", "输出电容", "d-box");
      s += box(528, 200, 74, 42, "输出", "SELV 端口", "d-box-ok");
      s += box(290, 258, 108, 34, "光耦 / 反馈", "跨隔离信号", "d-box-warn", 6);
      s += arr(120, 159, 130, 159, "d-arr");
      s += arr(206, 159, 228, 159, "d-arr");
      s += arr(83, 182, 83, 198, "d-arr");
      s += arr(120, 221, 130, 221, "d-arr");
      s += arr(206, 221, 228, 221, "d-arr");
      s += arr(326, 221, 358, 221, "d-arr");
      s += arr(434, 221, 442, 221, "d-arr");
      s += arr(518, 221, 526, 221, "d-arr");
      var n = paraList(40, 314, [
        { t: "被考核的 4 处：① 变压器绕组间（爬电 / 间隙 / 耐压）② Y 电容（容量受限，漏电流取舍）③ 光耦（跨隔离间距）④ 反馈取样不要跨回一次侧。", cls: "d-t" },
        { t: "SELV 侧与危险侧之间的间距、耐压、以及“单一故障下仍安全”的判定，是这类电源认证里最常被开不符合项的地方。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     11) CTI 材料组
     ========================================================================== */
  DIAGRAMS["cti-groups"] = {
    caption: "CTI 越高，材料组越好，允许的爬电距离越短",
    svg: function () {
      var s = "";
      s += T(360, 24, "CTI（相对漏电起痕指数）与材料组", "d-tb", "middle");
      var x0 = 60, w = 150, y = 80, h = 56;
      var groups = [
        ["材料组 Ⅲb", "CTI 100–174", "酚醛、纸基板", "d-zone-bad"],
        ["材料组 Ⅲa", "CTI 175–399", "普通 FR-4", "d-zone-bad-soft"],
        ["材料组 Ⅱ", "CTI 400–599", "高 CTI FR-4", "d-zone-mid"],
        ["材料组 Ⅰ", "CTI ≥ 600", "陶瓷、玻纤增强", "d-zone-ok"]
      ];
      for (var i = 0; i < 4; i++) {
        var x = x0 + i * (w + 8);
        s += '<rect class="' + groups[i][3] + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8"/>';
        s += T(x + w / 2, y + 22, groups[i][0], "d-tb", "middle");
        s += T(x + w / 2, y + 40, groups[i][1], "d-tm", "middle");
        s += T(x + w / 2, y + 58, groups[i][2], "d-tm", "middle");
      }
      s += arr(60, 172, 660, 172, "d-arr");
      s += T(60, 194, "CTI 低 → 爬电距离必须更长", "d-tw");
      s += T(660, 194, "CTI 高 → 要求放宽", "d-ta", "end");
      var n = paraList(60, 224, [
        { t: "怎么用：向供应商要 CTI 报告（按 IEC 60112 / GB/T 4207 试验），按报告值定材料组；没有报告就按更差的一组取值。", cls: "d-t" },
        { t: "同一材料不同厚度 / 批次的 CTI 可能不同；UL 黄卡上的 CTI 是选材与认证时最直接的依据。", cls: "d-tm" },
        { t: "注意：材料组只影响“爬电距离”，不影响电气间隙（间隙看空气，不看材料）。", cls: "d-ta" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     12) 浪涌多级防护
     ========================================================================== */
  DIAGRAMS["surge-levels"] = {
    caption: "多级防护：GDT 泄放大能量、MOV 承中间、TVS 精保护",
    svg: function () {
      var s = "";
      s += T(360, 24, "三级配合把同一股浪涌“削”到后级能承受的水平", "d-tb", "middle");
      s += '<path class="d-wave" d="M40 96 L96 60 L128 74 L176 84 L240 92 L320 96"/>';
      s += T(40, 118, "8/20 µs 电流波 / 1.2/50 µs 电压波（示意）", "d-tm");
      s += '<line class="d-div" x1="40" y1="126" x2="680" y2="126"/>';
      var y = 156, bw = 150, bh = 62;
      s += box(40, y, bw, bh, "① GDT", "气体放电管 → PE", "d-box-warn");
      s += box(210, y, bw, bh, "② MOV", "压敏电阻 → 线间", "d-box");
      s += box(380, y, bw, bh, "③ TVS", "后级精细钳位", "d-box-ok");
      s += box(550, y, bw, bh, "被保护电路", "芯片 / 电源", "d-box");
      s += arr(192, y + 31, 208, y + 31, "d-arr");
      s += arr(362, y + 31, 378, y + 31, "d-arr");
      s += arr(532, y + 31, 548, y + 31, "d-arr");
      s += T(115, 240, "能量最大、响应最慢", "d-tm", "middle");
      s += T(285, 240, "兼顾能量与速度", "d-tm", "middle");
      s += T(455, 240, "响应最快、能量最小", "d-tm", "middle");
      var n = paraList(40, 272, [
        { t: "配合要点：① 各级之间要串去耦元件（电感 / 磁珠 / 线阻），否则后级先被打坏；② 器件耐量与试验等级要匹配；③ 压敏电阻劣化后会漏电发热，需要温度保护；④ PE 走线与等电位连接决定共模浪涌往哪儿泄放。", cls: "d-t" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     13) 海拔修正
     ========================================================================== */
  DIAGRAMS["clearance-altitude"] = {
    caption: "海拔越高，电气间隙越要放大；爬电距离不变",
    svg: function () {
      var s = "";
      s += T(360, 24, "同一电压下，不同海拔所需的电气间隙", "d-tb", "middle");
      s += box(50, 60, 280, 150, "", "", "d-box", 12);
      s += T(190, 84, "≤ 2000 m（基准）", "d-tb", "middle");
      s += box(96, 116, 76, 26, "", "", "d-cond", 4);
      s += box(210, 116, 76, 26, "", "", "d-cond", 4);
      s += T(134, 134, "导体 A", "d-tb", "middle");
      s += T(248, 134, "导体 B", "d-tb", "middle");
      s += '<line class="d-clear d-dash" x1="174" y1="129" x2="208" y2="129"/>';
      s += T(190, 166, "间隙 = d（查表值）", "d-ta", "middle");
      s += arr(340, 135, 380, 135, "d-arr");
      s += T(360, 122, "海拔↑", "d-tm", "middle");
      s += box(390, 60, 280, 150, "", "", "d-box-warn", 12);
      s += T(530, 84, "5000 m（空气稀薄）", "d-tb", "middle");
      s += box(422, 116, 76, 26, "", "", "d-cond", 4);
      s += box(566, 116, 76, 26, "", "", "d-cond", 4);
      s += T(460, 134, "导体 A", "d-tb", "middle");
      s += T(604, 134, "导体 B", "d-tb", "middle");
      s += '<line class="d-clear d-dash" x1="500" y1="129" x2="564" y2="129"/>';
      s += T(530, 166, "间隙 = 1.48 d（教学修正）", "d-tw", "middle");
      var n = paraList(40, 238, [
        { t: "原因：气压降低 → 空气击穿电压下降 → 同样的距离更容易被击穿；修正系数按标准表格查，海拔越高系数越大。", cls: "d-t" },
        { t: "两条容易混的口径：① 海拔修正只作用于电气间隙，爬电距离不修正；② 2000m 是多数标准的基准点，超出必须修正。", cls: "d-ta" },
        { t: "工程做法：把设备标称海拔写进规格书；高原项目（3000–5000m）要重新核间隙，而不是沿用平原设计。", cls: "d-tm" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     14) 间距查表流程（决策图）
     ========================================================================== */
  DIAGRAMS["spacing-flow"] = {
    caption: "间距查表流程：先定查表依据，再定绝缘类型，最后校核条件",
    svg: function () {
      var s = "";
      s += T(360, 24, "爬电 / 间隙查表怎么走（避免“选错表就查错值”）", "d-tb", "middle");
      s += box(230, 40, 260, 44, "① 先定查表依据", "基础标准 还是 产品标准？", "d-box-warn");
      s += arr(360, 84, 360, 104, "d-arr");
      s += box(40, 104, 200, 56, "IEC 60664-1", "绝缘配合（PD/CTI/OVC/海拔）", "d-box-ok");
      s += box(260, 104, 200, 56, "灯具产品标准", "第 11 章（认证口径）", "d-box");
      s += box(480, 104, 200, 56, "医疗产品标准", "8.7.3（表11 / 表12）", "d-box");
      s += wire("360,104 360,96 140,96 140,104", "d-div");
      s += wire("360,96 580,96 580,104", "d-div");
      s += arr(140, 160, 140, 180, "d-arr");
      s += arr(360, 160, 360, 180, "d-arr");
      s += arr(580, 160, 580, 180, "d-arr");
      s += box(40, 180, 200, 56, "", "", "d-box");
      s += T(140, 204, "② 按绝缘配合", "d-tb", "middle");
      s += T(140, 222, "电压 + PD + 材料组", "d-tm", "middle");
      s += box(260, 180, 200, 56, "", "", "d-box");
      s += T(360, 204, "② 过电压类别", "d-tb", "middle");
      s += T(360, 222, "OVC Ⅱ / Ⅲ 选表", "d-tm", "middle");
      s += box(480, 180, 200, 56, "", "", "d-box");
      s += T(580, 204, "② 防护方式", "d-tb", "middle");
      s += T(580, 222, "MOPP / MOOP 档位", "d-tm", "middle");
      s += arr(360, 236, 360, 256, "d-arr");
      s += box(180, 256, 360, 48, "③ 查表得爬电 / 间隙", "基本 / 附加 / 加强 或 MOPP 档位", "d-box-ok");
      s += arr(360, 304, 360, 324, "d-arr");
      s += box(180, 324, 360, 48, "④ 校核与整改", "超档 / 条件不同 → 回标准原文核对", "d-box-danger");
      var n = paraList(40, 396, [
        { t: "两条硬规则：① 间距不足优先改结构（开槽、加筋、加隔板、换材料、降电压），而不是“往下取一档”；② 计算值只是起点——认证时按标准原文表格与试验结果判定，工具只是帮你别查错行。", cls: "d-t" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     15) 保护接地连续性
     ========================================================================== */
  DIAGRAMS["grounding-bonding"] = {
    caption: "保护接地连续性：从可触及金属件一路到大地",
    svg: function () {
      var s = "";
      s += T(360, 24, "I 类设备的保护接地路径与连续性试验", "d-tb", "middle");
      s += box(60, 70, 240, 150, "", "", "d-box", 12);
      s += T(180, 92, "I 类设备", "d-tb", "middle");
      s += '<rect class="d-box" x="84" y="108" width="192" height="80" rx="8"/>';
      s += T(180, 128, "可触及金属外壳", "d-tb", "middle");
      s += box(104, 142, 72, 30, "PE 端子", "", "d-cond", 5);
      s += box(196, 142, 62, 30, "带电部分", "", "d-box-warn", 5);
      s += T(180, 192, "基本绝缘 + 接地双重防护", "d-tm", "middle");
      s += wire("140,172 140,246 470,246", "d-acc-line");
      s += T(300, 268, "PE 导线 → 电源线 PE → 建筑接地", "d-ta", "middle");
      s += earth(470, 246);
      s += T(470, 300, "大地", "d-tb", "middle");
      s += box(360, 70, 300, 150, "", "", "d-box-ok", 12);
      s += T(510, 92, "接地连续性试验", "d-tb", "middle");
      s += T(378, 118, "· 试验电流 ≥ 25 A", "d-t");
      s += T(378, 140, "· 时间通常 1 min", "d-t");
      s += T(378, 162, "· 测 PE 端子到金属件的压降", "d-t");
      s += T(378, 184, "· 常用判据 ≤ 0.1 Ω（示例）", "d-tw");
      s += T(378, 206, "· 重点测喷漆面、螺钉、活动件", "d-tm");
      var n = paraList(40, 334, [
        { t: "常见失效点：① 只靠螺钉压接，未做防松 / 防漆处理；② 外壳各段之间没有等电位连接，故障电流走小截面路径；③ 用塑料件把接地路径“断开”；④ 接地阻抗合格，但浪涌泄放路径（PE 与 SPD 之间）过长。", cls: "d-t" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     16) 共模 / 差模（可切换：差模 ⇄ 共模，配合 assets/js/dmcm.js）
     说明：.dm-only / .cm-only 两组由外层 .dgm 上的 dm / cm 类切换
     ========================================================================== */
  DIAGRAMS["dmcm"] = {
    caption: "差模在 L-N 之间一来一回；共模同方向、经地上回流",
    svg: function () {
      var s = "";
      s += T(360, 24, "差模（DM）与共模（CM）：看电流怎么流，就知道该用哪个元件", "d-tb", "middle");
      // 三条母线
      s += '<line class="d-line" x1="70" y1="92" x2="660" y2="92"/>';
      s += '<line class="d-line" x1="70" y1="152" x2="660" y2="152"/>';
      s += '<line class="d-div d-dash" x1="70" y1="236" x2="660" y2="236"/>';
      s += T(48, 96, "L", "d-tb", "end");
      s += T(48, 156, "N", "d-tb", "end");
      s += T(48, 240, "PE", "d-tb", "end");
      s += T(660, 256, "机壳 / 地", "d-tm", "end");
      // 干扰源与设备
      s += box(80, 100, 86, 44, "干扰源", "噪声源", "d-box-warn");
      s += box(566, 100, 96, 44, "被扰设备", "EUT", "d-box");
      // 滤波元件（共用外形；谁起作用由模式高亮框指明）
      s += '<rect class="d-box" x="186" y="80" width="52" height="84" rx="6"/>';
      s += '<rect class="d-box" x="256" y="80" width="52" height="84" rx="6"/>';
      s += T(212, 116, "差模", "d-tm", "middle");
      s += T(212, 132, "电感", "d-tm", "middle");
      s += T(282, 116, "共模", "d-tm", "middle");
      s += T(282, 132, "电感", "d-tm", "middle");
      // X 电容（跨 L-N）
      s += cap(360, 122);
      s += wire("330,92 353,92 353,122", "d-line");
      s += wire("330,152 353,152 353,122", "d-line");
      s += wire("367,122 392,122 392,92 420,92", "d-line");
      s += T(360, 62, "X 电容（跨 L-N）", "d-tm", "middle");
      // Y 电容（对地）
      s += cap(500, 122);
      s += wire("470,92 493,92 493,122", "d-line");
      s += wire("530,152 507,152 507,122", "d-line");
      s += T(500, 62, "Y 电容（对 PE）", "d-tm", "middle");
      s += wire("428,152 566,152", "d-line");
      s += wire("428,92 566,92", "d-line");
      // 电感线圈符号
      s += '<path class="d-line" d="M266 92 q6 -10 12 0 q6 -10 12 0 q6 -10 12 0"/>';
      s += '<path class="d-line" d="M266 152 q6 -10 12 0 q6 -10 12 0 q6 -10 12 0"/>';
      s += '<path class="d-line" d="M196 92 q6 -10 12 0 q6 -10 12 0"/>';
      s += '<path class="d-line" d="M196 152 q6 -10 12 0 q6 -10 12 0"/>';
      // 差模模式：差模电感 + X 电容起作用
      s += '<g class="dm-only">';
      s += '<rect class="d-hl" x="180" y="72" width="64" height="100" rx="10"/>';
      s += '<rect class="d-hl" x="332" y="44" width="58" height="128" rx="10"/>';
      s += arr(240, 92, 320, 92, "d-arr");
      s += arr(430, 92, 470, 92, "d-arr");
      s += arr(540, 92, 566, 92, "d-arr");
      s += arr(566, 152, 420, 152, "d-arr");
      s += arr(400, 152, 300, 152, "d-arr");
      s += arr(190, 152, 168, 152, "d-arr");
      s += T(128, 200, "差模：L → N 一来一回", "d-ta");
      s += T(128, 220, "离 PE 越远越好", "d-tm");
      s += '</g>';
      // 共模模式：共模电感 + Y 电容起作用
      s += '<g class="cm-only">';
      s += '<rect class="d-hl" x="250" y="72" width="64" height="100" rx="10"/>';
      s += '<rect class="d-hl" x="446" y="44" width="112" height="210" rx="10"/>';
      s += arr(320, 92, 420, 92, "d-arr");
      s += arr(430, 92, 470, 92, "d-arr");
      s += arr(540, 92, 566, 92, "d-arr");
      s += arr(320, 152, 420, 152, "d-arr");
      s += arr(430, 152, 470, 152, "d-arr");
      s += arr(540, 152, 566, 152, "d-arr");
      s += wire("500,131 500,236", "d-line");
      s += arr(560, 236, 214, 236, "d-arr");
      s += wire("214,236 214,196 172,196", "d-line");
      s += arr(214, 196, 176, 196, "d-arr");
      s += T(120, 184, "共模：L、N 同方向", "d-ta");
      s += T(120, 262, "经 PE / 机壳回流", "d-tm");
      s += '</g>';
      var n = paraList(40, 300, [
        { t: "差模抑制：X 电容跨在 L-N 之间、差模电感串在线上；共模抑制：Y 电容接到 PE、共模电感对两条线同时呈现高阻。", cls: "d-t" },
        { t: "任何线间干扰都能拆成这两部分：先判断“谁在回流”，再选元件，比盲目加电容有效得多。", cls: "d-ta" },
        { t: "注意：Y 电容越大，对地泄漏电流越大（受泄漏限值约束）；X 电容要满足耐压与自愈要求。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     17) 耐压原理（旧图重做：绝缘被加压）
     ========================================================================== */
  DIAGRAMS["hipot-principle"] = {
    caption: "耐压的原理：把试验电压加在两处导体之间的绝缘上",
    svg: function () {
      var s = "";
      s += T(360, 24, "耐压试验在测什么：绝缘两端被加上高电压", "d-tb", "middle");
      s += '<defs><pattern id="d-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
        '<line x1="0" y1="0" x2="0" y2="9" stroke="var(--accent)" stroke-width="1.6" opacity="0.5"/></pattern></defs>';
      s += box(76, 96, 150, 90, "带电部件", "L / N / 一次侧", "d-cond");
      s += '<rect x="248" y="96" width="86" height="90" fill="url(#d-hatch)"/>';
      s += '<rect class="d-box" x="248" y="96" width="86" height="90" rx="0"/>';
      s += T(291, 132, "绝缘", "d-tb", "middle");
      s += T(291, 152, "（被考核）", "d-tm", "middle");
      s += box(356, 96, 150, 90, "可触及金属", "次级 / 外壳", "d-box-ok");
      // 耐压仪
      s += '<circle class="d-box" cx="291" cy="52" r="24"/>';
      s += T(291, 50, "耐压", "d-tb", "middle");
      s += T(291, 66, "测试仪", "d-tb", "middle");
      s += wire("291,76 291,84 151,84 151,96", "d-acc-line");
      s += wire("291,76 291,84 431,84 431,96", "d-acc-line");
      s += T(291, 214, "施加电压 U（AC 或 DC）", "d-ta", "middle");
      // 绝缘等效
      s += '<line class="d-div d-dash" x1="151" y1="200" x2="431" y2="200"/>';
      var n = paraList(40, 250, [
        { t: "电压加在“带电部件 → 可触及金属 / 次级”这一对之间，绝缘一旦有缺陷就会击穿、飞弧或漏电流超标。", cls: "d-t" },
        { t: "试验电压按绝缘类型取值：基本 / 附加 / 加强绝缘，或医疗的 1 / 2 MOPP、1 / 2 MOOP（数值见本页下方查表）。", cls: "d-ta" },
        { t: "AC 与 DC 不能随便换：AC 对某些绝缘（含气隙、污层）更严；DC 需要按峰值折算并注意充电电荷泄放。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     18) EMC 项目矩阵
     ========================================================================== */
  DIAGRAMS["emc-matrix"] = {
    caption: "EMC 项目矩阵：发射看两端，抗扰看八项",
    svg: function () {
      var s = "";
      s += T(360, 24, "EMC 项目矩阵（教学汇总，等级与限值以标准为准）", "d-tb", "middle");
      var rows = [
        ["EMI", "传导发射 CE", "CISPR 32 / EN 55032", "150 kHz – 30 MHz · dBµV"],
        ["EMI", "辐射发射 RE", "CISPR 32 / EN 55032", "30 MHz – 1/6 GHz · dBµV/m"],
        ["EMI", "谐波电流", "IEC 61000-3-2", "2–40 次 · A/B/C/D 类"],
        ["EMI", "电压闪烁", "IEC 61000-3-3", "Pst / Plt · dmax"],
        ["EMS", "静电放电 ESD", "IEC 61000-4-2", "接触 ±4/8 kV · 空气 ±8/15 kV"],
        ["EMS", "电快速瞬变 EFT", "IEC 61000-4-4", "电源 ±2 kV · 信号 ±1 kV"],
        ["EMS", "雷击浪涌 Surge", "IEC 61000-4-5", "1.2/50 µs · 8/20 µs"],
        ["EMS", "传导抗扰 CS", "IEC 61000-4-6", "150 kHz – 80 MHz · 3/10 V"],
        ["EMS", "辐射抗扰 RS", "IEC 61000-4-3", "80 MHz – 1/6 GHz · 3/10 V/m"],
        ["EMS", "电压跌落中断", "IEC 61000-4-11", "0/40/70% · 短时中断"]
      ];
      var x0 = 40, y = 46, w = 640, h = 30;
      s += '<rect class="d-box" x="' + x0 + '" y="' + (y - 22) + '" width="' + w + '" height="22" rx="4"/>';
      s += T(x0 + 12, y - 7, "类别", "d-tb");
      s += T(x0 + 92, y - 7, "项目", "d-tb");
      s += T(x0 + 268, y - 7, "主要标准", "d-tb");
      s += T(x0 + 452, y - 7, "典型试验条件 / 关注量", "d-tb");
      for (var i = 0; i < rows.length; i++) {
        var yy = y + i * h;
        var cls = rows[i][0] === "EMI" ? "d-zone-mid" : "d-zone-ok";
        s += '<rect class="' + cls + '" x="' + x0 + '" y="' + yy + '" width="' + w + '" height="' + h + '" rx="4" opacity="0.5"/>';
        s += T(x0 + 12, yy + 20, rows[i][0], "d-ta");
        s += T(x0 + 92, yy + 20, rows[i][1], "d-tb");
        s += T(x0 + 268, yy + 20, rows[i][2], "d-tm");
        s += T(x0 + 452, yy + 20, rows[i][3], "d-tm");
      }
      var bottom = y + rows.length * h;
      var n = paraList(40, bottom + 26, [
        { t: "EMI（发射）：设备别往外“喊”太多；EMS（抗扰）：外面“喊”的时候设备别乱。前者测两端（传导 / 辐射），后者按标准逐项打。", cls: "d-t" },
        { t: "产品类别与使用环境决定等级：家用 / 商用通常 3 V/m、±4 kV 接触放电；工业环境更严（10 V/m、±8 kV）。", cls: "d-ta" },
        { t: "整改顺序：先看端口（电源 / 信号 / 天线）→ 再看回流路径（地、Y 电容）→ 最后才动屏蔽与滤波参数。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     19) 变压器绝缘结构
     ========================================================================== */
  DIAGRAMS["tx-insulation"] = {
    caption: "变压器里的绝缘：绕组间胶带、挡墙与爬电 / 间隙",
    svg: function () {
      var s = "";
      s += T(360, 24, "开关变压器剖面：绝缘从哪儿来、爬电往哪儿走", "d-tb", "middle");
      // 磁芯
      s += '<rect class="d-box" x="96" y="70" width="528" height="26" rx="4"/>';
      s += '<rect class="d-box" x="96" y="226" width="528" height="26" rx="4"/>';
      s += '<rect class="d-box" x="96" y="70" width="26" height="182" rx="4"/>';
      s += '<rect class="d-box" x="598" y="70" width="26" height="182" rx="4"/>';
      s += T(360, 62, "磁芯（接一次侧地或浮空，按设计定）", "d-tm", "middle");
      // 骨架与绕组
      s += box(150, 96, 120, 130, "初级绕组", "一次侧", "d-cond");
      s += '<rect class="d-ins-reinf" x="286" y="96" width="42" height="130"/>';
      s += T(307, 152, "绝缘", "d-tb", "middle");
      s += T(307, 170, "胶带", "d-tb", "middle");
      s += box(344, 96, 120, 130, "次级绕组", "SELV 侧", "d-box-ok");
      // 挡墙
      s += '<rect class="d-box-warn" x="150" y="96" width="20" height="130" rx="3"/>';
      s += '<rect class="d-box-warn" x="464" y="96" width="20" height="130" rx="3"/>';
      s += T(160, 248, "挡墙 / 边距胶带", "d-tw", "middle");
      s += T(474, 248, "挡墙", "d-tw", "middle");
      // 爬电：沿绕组 / 胶带表面绕到顶部；间隙：穿过胶带的最短直线
      s += '<path class="d-creep d-dash" d="M270 96 L270 84 L344 84 L344 96"/>';
      s += arr(274, 160, 340, 160, "d-arr");
      s += T(307, 96, "爬电", "d-ta", "middle");
      s += T(307, 150, "间隙", "d-ta", "middle");
      s += T(360, 292, "爬电距离：沿骨架 / 胶带表面绕行", "d-ta", "middle");
      s += T(360, 274, "电气间隙：穿过胶带与空气的最短直线", "d-tm", "middle");
      // 引出线
      s += wire("150,110 120,110", "d-acc-line");
      s += wire("464,212 494,212", "d-line");
      var n = paraList(40, 316, [
        { t: "常见做法：三层绝缘线、绕组间 ≥2–3 层绝缘胶带、加挡墙（margin）拉开绕组到磁芯/另一绕组的沿面距离、必要时灌封。", cls: "d-t" },
        { t: "被考核的三条路径：绕组间（胶带）、绕组到磁芯、以及引出线跨接处——认证时最常在这三处量距离与打耐压。", cls: "d-ta" },
        { t: "数值口径：按工作电压、污染等级、材料组与绝缘类型（基本 / 附加 / 加强）查表；温度等级（A/E/B/F/H）另算。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     20) IP 代码解读
     ========================================================================== */
  DIAGRAMS["ip-code"] = {
    caption: "IP 代码：第一位防固体，第二位防水",
    svg: function () {
      var s = "";
      s += T(360, 24, "IP 代码怎么读：IP + 第一位（固体）+ 第二位（水）", "d-tb", "middle");
      s += box(40, 46, 300, 96, "", "", "d-box", 12);
      s += T(60, 78, "IP 6 5", "d-tb");
      s += T(60, 100, "第一位 6 ＝ 尘密（完全防尘）", "d-t");
      s += T(60, 122, "第二位 5 ＝ 防喷水（各方向喷嘴）", "d-t");
      s += box(380, 46, 300, 96, "", "", "d-box-ok", 12);
      s += T(400, 74, "常见等级与含义", "d-tb");
      s += T(400, 96, "IP20 手指 · IP44 溅水 · IP54 防尘+溅水", "d-tm");
      s += T(400, 118, "IP65 尘密+喷水 · IP67 短时浸水 · IP68 持续浸水", "d-tm");
      // 第一位数
      s += T(40, 178, "第一位（防固体 / 防尘）", "d-tb");
      var d1 = [["0", "无防护"], ["1", "≥50mm"], ["2", "≥12.5mm"], ["3", "≥2.5mm"], ["4", "≥1mm"], ["5", "防尘"], ["6", "尘密"]];
      for (var i = 0; i < d1.length; i++) {
        var x = 40 + i * 92;
        s += '<rect class="d-box" x="' + x + '" y="190" width="82" height="42" rx="6"/>';
        s += T(x + 41, 210, d1[i][0], "d-ta", "middle");
        s += T(x + 41, 226, d1[i][1], "d-tm", "middle");
      }
      // 第二位数
      s += T(40, 262, "第二位（防水）", "d-tb");
      var d2 = [["0", "无防护"], ["1", "垂直滴水"], ["2", "15°滴水"], ["3", "淋水"], ["4", "溅水"], ["5", "喷水"], ["6", "强喷水"], ["7", "短时浸水"], ["8", "持续浸水"]];
      for (var j = 0; j < d2.length; j++) {
        var x2 = 40 + j * 71;
        s += '<rect class="d-box" x="' + x2 + '" y="274" width="63" height="42" rx="6"/>';
        s += T(x2 + 31, 294, d2[j][0], "d-ta", "middle");
        s += T(x2 + 31, 310, d2[j][1], "d-tm", "middle");
      }
      var n = paraList(40, 342, [
        { t: "与安规的距离要求相关：灯具标准的距离表以污染等级 2 为基准；户外淋雨 / 凝露属于 PD3，标准没有单独的灯具表，要改用 IEC 60664-1 的 PD3 列或先降低绝缘处微环境。", cls: "d-ta" },
        { t: "试验不一样长：IPX5 喷水约 15 min，IPX6 强喷水约 3 min，IPX7 浸水 30 min——别把时长记混。", cls: "d-tw" },
        { t: "IP 只是外壳防护，不等于“防触电”：防触电还要看 IP2X 试指、间距与接地，两者分开考核。", cls: "d-t" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     21) 温升：测点、限值档与稳态判定
     ========================================================================== */
  DIAGRAMS["temperature-rise"] = {
    caption: "温升怎么看：测哪里、看什么限值、什么时候算稳态",
    svg: function () {
      var s = "";
      s += T(360, 24, "温升试验：测点 → 限值 → 稳态判定", "d-tb", "middle");
      // 左：温升曲线
      s += box(40, 46, 320, 176, "", "", "d-box", 12);
      s += T(60, 70, "温升随时间趋于稳态", "d-tb");
      s += wire("70,190 340,190 70,190 70,90", "d-div");
      s += '<path class="d-creep" d="M70 186 C110 120 150 106 200 102 C260 98 300 98 336 98"/>';
      s += '<line class="d-div d-dash" x1="70" y1="98" x2="336" y2="98"/>';
      s += T(120, 92, "稳态（1 h 内变化 ≤ 2 K）", "d-tm");
      s += T(70, 210, "时间 →", "d-tm");
      s += T(300, 176, "温升 ΔT", "d-ta", "end");
      // 右：测点与方法
      s += box(380, 46, 300, 176, "", "", "d-box-warn", 12);
      s += T(400, 70, "测点与基准", "d-tb");
      s += T(400, 94, "· 外壳 / 可触及表面：热电偶或温度计", "d-t");
      s += T(400, 116, "· 绕组：电阻法（冷热态电阻推算平均温升）", "d-t");
      s += T(400, 138, "· 环境温度：通常 25 °C（热带 40 °C）", "d-t");
      s += T(400, 160, "· 最不利状态：额定输入、最差负载与安装", "d-t");
      s += T(400, 182, "· 元件：变压器、电机、线圈另有绝缘等级限值", "d-tm");
      // 部件限值档
      s += T(40, 254, "常见部件与限值口径（教学示意，务必查产品标准表格）", "d-tb");
      var rows = [
        ["绕组（电阻法）", "A 60 K · E 75 K · B 80 K · F 105 K · H 125 K", "d-box"],
        ["外壳 / 可触及金属", "按“可触及表面温度”或温升限值分别规定", "d-box"],
        ["手柄 / 旋钮（长期握持）", "金属更严、非金属略宽，需分“长期 / 短时”", "d-box"],
        ["绝缘与元件", "不能超过其温度等级（如 105 °C / 130 °C）", "d-box-warn"]
      ];
      for (var i = 0; i < rows.length; i++) {
        var y = 266 + i * 34;
        s += box(40, y, 640, 28, "", "", rows[i][2], 6);
        s += T(52, y + 19, rows[i][0], "d-tb");
        s += T(240, y + 19, rows[i][1], "d-tm");
      }
      var n = paraList(40, 414, [
        { t: "顺序要点：温升要在最不利但正常的状态下做；做完温升还要接着做耐压与泄漏（热的绝缘更脆弱），而不是先做破坏性试验。", cls: "d-ta" },
        { t: "常见失败：热电偶没贴紧（读数偏低）、用错环境温度基准、只测额定负载没测最不利负载、忽略元件自身温度等级。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     22) 灼热丝 / 针焰 / UL94 各管哪里
     ========================================================================== */
  DIAGRAMS["fire-test"] = {
    caption: "三种阻燃试验各管一类部件，不能互相替代",
    svg: function () {
      var s = "";
      s += T(360, 24, "灼热丝 / 针焰 / UL94：管的对象不同", "d-tb", "middle");
      var cols = [
        ["灼热丝 GWIT / GWFI", "d-box-warn", [
          "热源：电热丝 550 / 650 / 750 / 850 °C",
          "施加：压在部件表面 30 s",
          "判据：无火焰或余焰 ≤ 30 s，",
          "　　　燃滴不引燃铺底层",
          "管谁：载流连接件、支撑带电件",
          "　　　的绝缘材料、外壳"
        ]],
        ["针焰 Needle Flame", "d-box", [
          "热源：小火焰（约 1 W 级）",
          "施加：10 s（个别 30 s）",
          "判据：余焰 ≤ 30 s，燃滴不引燃",
          "管谁：可能受小火焰影响的部件、",
          "　　　PCB、小零件、灌封处"
        ]],
        ["UL94 燃烧等级", "d-box-ok", [
          "V-0 / V-1 / V-2：垂直燃烧",
          "　余焰 ≤10 s / ≤30 s / ≤30 s",
          "　V-2 允许燃滴引燃棉花",
          "5VA / 5VB：更严（5 次施加）",
          "HB：水平燃烧（最宽）",
          "管谁：塑料件、外壳、PCB 基材"
        ]]
      ];
      for (var i = 0; i < 3; i++) {
        var x = 40 + i * 216;
        s += box(x, 46, 200, 214, "", "", cols[i][1], 12);
        s += T(x + 100, 72, cols[i][0], "d-tb", "middle");
        for (var j = 0; j < cols[i][2].length; j++) {
          s += T(x + 14, 100 + j * 22, cols[i][2][j], j === 4 ? "d-ta" : "d-tm");
        }
      }
      var n = paraList(40, 288, [
        { t: "怎么选：先看部件“是否载流、是否支撑带电件、是否靠近可能起弧处”，再按标准条款定档位——同一台产品上不同部件档位可以不同。", cls: "d-t" },
        { t: "别混：灼热丝模拟的是“过热金属件接触”，针焰模拟“小火焰”，UL94 只描述材料本身的燃烧等级，不能替代前两者。", cls: "d-ta" },
        { t: "记录要点：施加温度 / 时间、余焰与余灼时间、是否引燃铺底层或棉花、试验后部件是否失去支撑功能。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     23) 泄漏电流的三条路径
     ========================================================================== */
  DIAGRAMS["leakage-paths"] = {
    caption: "泄漏电流从哪来：容性、阻性、表面污染三条路",
    svg: function () {
      var s = "";
      s += T(360, 24, "泄漏电流的三条路径（都会汇到可触及部件 / PE）", "d-tb", "middle");
      // EUT 框
      s += box(60, 60, 300, 200, "", "", "d-box", 12);
      s += T(210, 84, "设备内部", "d-tb", "middle");
      s += box(80, 96, 90, 34, "带电部分", "L / N", "d-cond", 6);
      s += box(80, 200, 90, 34, "可触及金属", "外壳", "d-box-ok", 6);
      // 路径 1：容性
      s += '<line class="d-line" x1="170" y1="113" x2="250" y2="113"/>';
      s += cap(258, 113, "d-line");
      s += wire("266,113 300,113 300,217 170,217", "d-line");
      s += T(300, 100, "① 容性耦合：Y 电容 / 寄生电容", "d-tm");
      // 路径 2：阻性
      s += res(200, 150);
      s += wire("170,113 185,150 200,150", "d-line");
      s += wire("226,150 250,150 250,190 170,190 170,200", "d-line");
      s += T(262, 154, "② 阻性漏电：绝缘电阻 / 半导体器件", "d-tm");
      // 路径 3：表面
      s += '<path class="d-creep d-dash" d="M170 130 C210 150 240 170 170 200"/>';
      s += T(262, 190, "③ 表面污染：污层 / 爬电", "d-tm");
      // 测量点
      s += arr(360, 217, 410, 217, "d-arr");
      s += box(416, 190, 150, 54, "测量网络", "IEC 60990 加权网络", "d-box-warn", 8);
      s += arr(566, 217, 610, 217, "d-arr");
      s += box(616, 190, 66, 54, "PE / 地", "", "d-box", 8);
      s += T(210, 282, "三条路径同时存在，测量结果只能给出“总和”", "d-ta", "middle");
      var n = paraList(40, 300, [
        { t: "怎么降：① 换低容值 Y 电容、缩短跨接路径；② 提高绝缘电阻、选低漏电元件；③ 清洁与灌封、增大爬电距离、避免污层桥接。", cls: "d-t" },
        { t: "测的时候：取最不利电压（通常 1.06 倍额定）与最不利极性，并考虑单一故障（如断开 PE、断开一根电源线）。", cls: "d-ta" },
        { t: "注意 IEC 60990 的网络分“感知 / 反应 / 摆脱”等不同加权，同一台设备不同判据的限值不同，别混用。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     24) 三种“地”与 TN/TT/IT
     ========================================================================== */
  DIAGRAMS["grounding-systems"] = {
    caption: "先分清三种“地”，再看供电系统怎么给 PE",
    svg: function () {
      var s = "";
      s += T(360, 24, "保护地 / 功能地 / 信号地，与四种供电接地系统", "d-tb", "middle");
      // 三种地
      var gs = [
        ["保护接地 PE", "防电击：把故障电流引走，触发保护", "d-box-warn"],
        ["功能地", "让电路正常工作（如参考点、屏蔽）", "d-box"],
        ["信号地", "降低干扰与地环流，常单点接地", "d-box-ok"]
      ];
      for (var i = 0; i < 3; i++) {
        var x = 40 + i * 216;
        s += box(x, 46, 200, 86, "", "", gs[i][2], 12);
        s += T(x + 100, 74, gs[i][0], "d-tb", "middle");
        s += T(x + 100, 96, gs[i][1], "d-tm", "middle");
        s += T(x + 100, 116, "三者最终要在一点汇合", "d-tm", "middle");
      }
      // 四种系统
      var sys = [
        ["TN-S：PE 与 N 全程分开", "PE 独立走线，干扰小、最常用于新建筑"],
        ["TN-C-S：前段合一后段分开", "PEN 入户后分开，老建筑改造常见"],
        ["TT：设备侧单独打接地极", "必须配漏电保护（RCD）"],
        ["IT：电源侧不接地或高阻接地", "用于医疗 / 连续供电场所，需绝缘监视"]
      ];
      for (var k = 0; k < 4; k++) {
        var y = 152 + k * 46;
        s += box(40, y, 640, 40, "", "", k === 3 ? "d-box-warn" : "d-box", 6);
        s += T(52, y + 25, sys[k][0], "d-tb");
        s += T(300, y + 25, sys[k][1], "d-tm");
      }
      var n = paraList(40, 352, [
        { t: "设备侧只关心两件事：可触及金属件是否可靠连到 PE，以及 PE 到大地之间的故障电流路径是否足够低阻抗。", cls: "d-t" },
        { t: "常见错误：把功能地与保护地混作一根细线、多个接地点形成地环流、用外壳当作信号回流路径。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     25) 环境试验顺序与失效机理
     ========================================================================== */
  DIAGRAMS["env-sequence"] = {
    caption: "环境试验的顺序不是随便排的：每一步暴露不同失效",
    svg: function () {
      var s = "";
      s += T(360, 24, "环境试验顺序与它暴露的失效", "d-tb", "middle");
      var steps = [
        ["预处理", "外观 / 功能初测", "建立基准"],
        ["温度循环", "焊点疲劳、材料开裂", "冷热冲击"],
        ["湿热（稳态 / 循环）", "吸湿后绝缘下降、腐蚀", "40 °C / 93 %RH"],
        ["振动（正弦 / 随机）", "结构松动、引线断裂", "共振点驻留"],
        ["盐雾 / 粉尘 / IP", "腐蚀、密封失效", "按 IP 等级"],
        ["安规复测（耐压 / 泄漏）", "环境后绝缘是否仍合格", "必须在环境之后做"],
        ["拆解检查", "看不到的裂纹与爬电痕迹", "判定最终结论"]
      ];
      var y = 46;
      for (var i = 0; i < steps.length; i++) {
        var last = i === steps.length - 1;
        s += box(40, y, 250, 40, "", "", last ? "d-box-warn" : "d-box", 8);
        s += T(56, y + 25, steps[i][0], "d-tb");
        s += T(304, y + 17, steps[i][1], "d-ta");
        s += T(304, y + 35, steps[i][2], "d-tm");
        if (i < steps.length - 1) s += arr(165, y + 40, 165, y + 52, "d-arr");
        y += 52;
      }
      var n = paraList(40, y + 16, [
        { t: "顺序原则：先做非破坏性、可复测的项目，把安规测试放在环境之后（吸湿与疲劳会显著拉低绝缘与泄漏余量）。", cls: "d-t" },
        { t: "破坏性项目（跌落、灼热丝、针焰、寿命）放最后；每步之间都要记录功能与外观，否则失败时无法定位是哪一步引入的。", cls: "d-ta" },
        { t: "常见坑：环境箱内通电与不通电结果不同、恢复时间不足就测、只测首样不测最不利样品。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     26) PCB 间距落地四招
     ========================================================================== */
  DIAGRAMS["pcb-spacing-tricks"] = {
    caption: "间距不够怎么救：开槽、加筋、加隔板、涂覆灌封",
    svg: function () {
      var s = "";
      s += T(360, 24, "四种落地手段，对爬电与间隙的影响不同", "d-tb", "middle");
      var panels = [
        ["① 开槽（slot）", ["板面铣一条槽", "爬电路径被迫绕行", "间隙基本不变"], "✓ 爬电　— 间隙", "d-box"],
        ["② 加筋 / 凸台（rib）", ["在表面做凸起", "沿面路径被拉长", "间隙不变"], "✓ 爬电　— 间隙", "d-box"],
        ["③ 加隔板 / 挡墙", ["两导体之间插绝缘壁", "同时拉长爬电与间隙", "最有效但占空间"], "✓ 爬电　✓ 间隙", "d-box-ok"],
        ["④ 涂覆 / 灌封", ["合格涂覆可按 60664-3 处理", "降低污染影响", "不能替代距离要求"], "△ 有条件", "d-box-warn"]
      ];
      for (var i = 0; i < 4; i++) {
        var x = 40 + (i % 2) * 326, y = 46 + Math.floor(i / 2) * 150;
        s += box(x, y, 310, 134, "", "", panels[i][4], 12);
        s += T(x + 16, y + 26, panels[i][0], "d-tb");
        s += T(x + 16, y + 50, panels[i][1][0], "d-tm");
        s += T(x + 16, y + 70, panels[i][1][1], "d-tm");
        s += T(x + 16, y + 90, panels[i][1][2], "d-tm");
        s += T(x + 16, y + 116, panels[i][3], "d-ta");
        // 小示意：两导体 + 手段
        s += box(x + 176, y + 40, 46, 20, "", "", "d-cond", 3);
        s += box(x + 250, y + 40, 46, 20, "", "", "d-cond", 3);
        if (i === 0) s += '<rect class="d-notch" x="' + (x + 224) + '" y="' + (y + 60) + '" width="24" height="22"/>';
        if (i === 1) s += '<rect class="d-box" x="' + (x + 232) + '" y="' + (y + 26) + '" width="6" height="30" rx="3"/>';
        if (i === 2) s += '<rect class="d-ins-reinf" x="' + (x + 230) + '" y="' + (y + 24) + '" width="10" height="44" rx="3"/>';
        if (i === 3) s += '<rect class="d-ins-supp" x="' + (x + 176) + '" y="' + (y + 62) + '" width="120" height="10" rx="4"/>';
        s += '<path class="d-creep d-dash" d="M' + (x + 200) + " " + (y + 52) + " L" + (x + 200) + " " + (y + (i === 0 ? 84 : i === 2 ? 74 : 64)) +
          " L" + (x + 270) + " " + (y + (i === 0 ? 84 : i === 2 ? 74 : 64)) + " L" + (x + 270) + " " + (y + 52) + '"/>';
      }
      var n = paraList(40, 352, [
        { t: "优先级：先想办法改结构（开槽 / 加挡墙 / 拉开布局），再考虑换材料（提高 CTI）或降电压，最后才是“按更差条件放宽”。", cls: "d-t" },
        { t: "涂覆 / 灌封只有在“合格工艺 + 可验证”的前提下才能引用 60664-3 的放宽，认证时要提供工艺与检验证据。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     27) 七大类危害速查
     ========================================================================== */
  DIAGRAMS["hazard-map"] = {
    caption: "七大类危害：各自看什么、测什么、怎么防",
    svg: function () {
      var s = "";
      s += T(360, 24, "七大类危害速查（按危害分类找入口）", "d-tb", "middle");
      var rows = [
        [1, "电击", "间距 / 绝缘 / 接地 / 泄漏", "耐压、泄漏电流、接地连续性"],
        [2, "能量", "储能电容与运动部件能量", "放电时间、限能、ES 分级"],
        [3, "火", "阻燃材料与故障发热", "灼热丝、针焰、UL94、异常工作"],
        [4, "热", "温升与可触及温度", "温升、热失控、球压"],
        [5, "机械", "稳定性 / 锐边 / 运动部件", "稳定性、冲击、跌落、挤压"],
        [6, "辐射", "光生物 / 激光 / SAR / 电离", "光生物安全、SAR、辐射测量"],
        [7, "化学", "材料与电池安全", "RoHS / REACH、电池、包装法规"]
      ];
      var y = 46;
      s += '<rect class="d-box" x="40" y="' + (y - 20) + '" width="640" height="20" rx="4"/>';
      s += T(52, y - 6, "危害", "d-tb");
      s += T(140, y - 6, "看什么", "d-tb");
      s += T(420, y - 6, "测什么 / 查什么", "d-tb");
      for (var i = 0; i < rows.length; i++) {
        var yy = y + i * 38;
        s += '<rect class="d-box" x="40" y="' + yy + '" width="640" height="36" rx="4" opacity="0.55"/>';
        s += '<rect x="40" y="' + yy + '" width="8" height="36" rx="3" style="fill:var(--hazard-' + rows[i][0] + ')"/>';
        s += T(58, yy + 23, rows[i][1], "d-tb");
        s += T(140, yy + 23, rows[i][2], "d-t");
        s += T(420, yy + 23, rows[i][3], "d-tm");
      }
      var n = paraList(40, y + rows.length * 38 + 18, [
        { t: "用法：先按“最可能伤到人的那一类”找入口，再去对应章节；一台产品通常同时落 3–5 类，别只盯电击。", cls: "d-ta" },
        { t: "危害 → 措施 → 试验 是三件事：措施对了不等于试验过了，试验过了也不等于措施长期可靠（还要看环境与寿命）。", cls: "d-t" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     28) 绝缘耐热等级（Y/A/E/B/F/H/C）
     ========================================================================== */
  DIAGRAMS["heat-class"] = {
    caption: "绝缘耐热等级：极限温度 ≠ 允许温升",
    svg: function () {
      var s = "";
      s += T(360, 24, "绝缘耐热等级：材料的极限温度，与允许温升不是一回事", "d-tb", "middle");
      // 温度轴（90 → 250 ℃ 映射到 70 → 660）
      var x0 = 70, x1 = 660, t0 = 90, t1 = 250;
      function px(t) { return x0 + (t - t0) / (t1 - t0) * (x1 - x0); }
      var bands = [
        ["Y", 90, 105, "d-zone-mid"], ["A", 105, 120, "d-zone-mid"], ["E", 120, 130, "d-zone-ok"],
        ["B", 130, 155, "d-zone-ok"], ["F", 155, 180, "d-zone-ok"], ["H", 180, 200, "d-box-warn"],
        ["C", 200, 250, "d-box-warn"]
      ];
      for (var i = 0; i < bands.length; i++) {
        var bx = px(bands[i][1]), bw = px(bands[i][2]) - px(bands[i][1]);
        s += '<rect class="' + bands[i][3] + '" x="' + n2(bx) + '" y="46" width="' + n2(bw) + '" height="34" rx="4"/>';
        s += T(n2(bx + bw / 2), 68, bands[i][0], "d-tb", "middle");
      }
      s += '<line class="d-div" x1="' + x0 + '" y1="82" x2="' + x1 + '" y2="82"/>';
      for (i = 0; i < bands.length; i++) {
        s += '<line class="d-div" x1="' + n2(px(bands[i][1])) + '" y1="82" x2="' + n2(px(bands[i][1])) + '" y2="88"/>';
        s += T(n2(px(bands[i][1])), 100, bands[i][1] + "", "d-tm", "middle");
      }
      s += T(x1, 100, "250 ℃", "d-tm", "end");
      s += T(x0 - 6, 100, "90 ℃", "d-tm", "end");
      // 表格
      var rows = [
        ["Y", "90 ℃", "未浸渍棉、丝、纸（少见）", "—"],
        ["A", "105 ℃", "浸渍棉纱 / 纸、油性漆包线", "60 K"],
        ["E", "120 ℃", "聚乙烯醇缩醛漆包线、环氧浸渍", "75 K"],
        ["B", "130 ℃", "聚酯漆包线、云母、玻璃纤维", "80 K"],
        ["F", "155 ℃", "改性聚酯、聚氨酯、环氧", "105 K"],
        ["H", "180 ℃", "硅橡胶、聚酰亚胺（PI）、PTFE", "125 K"],
        ["C", ">180 ℃（常见 200 / 220 / 250）", "陶瓷、云母、特种耐高温材料", "按约定"]
      ];
      var y = 122;
      s += '<rect class="d-box" x="40" y="' + y + '" width="640" height="24" rx="4"/>';
      s += T(52, y + 17, "等级", "d-tb");
      s += T(110, y + 17, "极限温度", "d-tb");
      s += T(230, y + 17, "常见绝缘材料", "d-tb");
      s += T(540, y + 17, "绕组温升教学值", "d-tb");
      for (i = 0; i < rows.length; i++) {
        var yy = y + 24 + i * 30;
        s += '<rect class="d-box" x="40" y="' + yy + '" width="640" height="28" rx="4" opacity="0.55"/>';
        s += T(52, yy + 19, rows[i][0], "d-ta");
        s += T(110, yy + 19, rows[i][1], "d-t");
        s += T(230, yy + 19, rows[i][2], "d-tm");
        s += T(540, yy + 19, rows[i][3], "d-tw");
      }
      var n = paraList(40, y + 24 + rows.length * 30 + 22, [
        { t: "① 等级说的是“绝缘材料 / 绝缘系统”能长期承受的温度上限，不等于允许温升：允许温升 ≈ 极限温度 − 最高环境温度 − 热点余量。", cls: "d-t" },
        { t: "② 电阻法测到的是绕组平均温升，热点温度还要乘热点系数（通常约 1.1，按标准），所以表里的温升限值比“极限温度 − 40 K”更严。", cls: "d-ta" },
        { t: "③ 升级材料（如 B → F）要同时满足 UL 黄卡、整机温升与耐压；温度和温升是两套判据，别只看其中一个。", cls: "d-tw" }
      ]);
      return svgOut(s + n.svg, n.bottom + 18);
    }
  };

  /* ==========================================================================
     29–31) I / II / III 类设备结构（重做：结构 + 故障路径 + 测试点三段式）
     ========================================================================== */
  function classDiagram(kind) {
    var s = "", isI = kind === "i", isII = kind === "ii", isIII = kind === "iii";
    s += '<defs><pattern id="d-ins-' + kind + '" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<line x1="0" y1="0" x2="0" y2="8" stroke="var(--accent)" stroke-width="1.5" opacity="0.45"/></pattern></defs>';
    s += T(360, 24, (isI ? "I 类：基本绝缘 + 保护接地" : isII ? "II 类：双重 / 加强绝缘（不依赖接地）" : "III 类：SELV 供电，不按市电距离考核"), "d-tb", "middle");
    // ── 结构区
    s += T(40, 52, "结构", "d-ta");
    s += box(40, 62, 176, 96, isIII ? "SELV 电源" : "市电输入", isIII ? "含隔离 · 输出 ≤42.4V" : "L / N" + (isI ? " / PE" : ""), "d-box", 10);
    s += arr(220, 110, 244, 110, "d-arr");
    // 绝缘层 + 电路
    if (isI) {
      s += '<rect x="250" y="62" width="26" height="96" fill="url(#d-ins-i)"/>';
      s += '<rect class="d-box" x="250" y="62" width="26" height="96" rx="0"/>';
      s += T(263, 172, "基本绝缘", "d-tm", "middle");
      s += box(290, 62, 150, 96, "带电电路", "变压器 / 开关", "d-cond", 10);
      s += arr(444, 110, 468, 110, "d-arr");
      s += box(474, 62, 206, 96, "金属外壳（可触及）", "接地保护", "d-box-warn", 10);
    } else if (isII) {
      s += '<rect x="250" y="62" width="22" height="96" fill="url(#d-ins-ii)"/>';
      s += '<rect class="d-box" x="250" y="62" width="22" height="96" rx="0"/>';
      s += '<rect class="d-ins-supp" x="274" y="62" width="22" height="96" rx="0"/>';
      s += T(273, 180, "基本 + 附加（或单层加强）", "d-tm", "middle");
      s += box(310, 62, 150, 96, "带电电路", "无接地设计", "d-cond", 10);
      s += arr(464, 110, 488, 110, "d-arr");
      s += '<rect class="d-box-ok" x="494" y="62" width="186" height="96" rx="10"/>';
      s += T(510, 96, "绝缘外壳", "d-tb");
      s += T(510, 118, "（可触及）", "d-tm");
      s += '<rect class="d-line" x="600" y="78" width="32" height="32" rx="2" fill="none"/>';
      s += '<rect class="d-line" x="608" y="86" width="16" height="16" rx="1" fill="none"/>';
      s += T(616, 130, "回字符号", "d-tm", "middle");
    } else {
      s += '<rect x="250" y="62" width="26" height="96" fill="url(#d-ins-iii)"/>';
      s += '<rect class="d-box" x="250" y="62" width="26" height="96" rx="0"/>';
      s += T(263, 172, "加强隔离", "d-tm", "middle");
      s += box(290, 62, 150, 96, "低压电路", "SELV", "d-box-ok", 10);
      s += arr(444, 110, 468, 110, "d-arr");
      s += box(474, 62, 206, 96, "可触及低压部分", "≤42.4V peak", "d-box-ok", 10);
    }
    // ── 故障路径
    s += '<line class="d-div" x1="40" y1="196" x2="680" y2="196"/>';
    s += T(40, 216, "故障路径", "d-ta");
    var fp = isI
      ? "绝缘失效 → 故障电流经保护接地（PE）返回电源 → 由过流 / 漏电保护切断"
      : isII ? "必须“两处绝缘同时失效”才可能触及危险电压；单层失效仍安全"
        : "危险电压被挡在适配器的隔离之内，设备内部本身不存在危险带电部分";
    s += para(40, 242, fp, isI ? "d-tw" : "d-t", 46);
    // ── 测试点
    s += T(40, 300, "对应测试", "d-ta");
    var tests = isI
      ? [["耐压", "带电部 → 外壳（基本绝缘档）", "ok"], ["泄漏电流", "外壳 → 地", "ok"], ["接地连续性", "PE 端子 → 外壳 ≤0.1 Ω（示例）", "ok"]]
      : isII ? [["耐压", "带电部 → 外壳（加强档取值）", "ok"], ["泄漏电流", "外壳 → 地", "ok"], ["接地连续性", "不适用（无保护接地）", "na"]]
        : [["耐压", "适配器隔离处（加强档）", "ok"], ["泄漏电流", "输出 / 可触及低压部分", "ok"], ["接地连续性", "通常无（II 类适配器）", "na"]];
    for (var k = 0; k < tests.length; k++) {
      var tx = 40 + k * 216;
      s += box(tx, 310, 200, 54, "", "", tests[k][2] === "ok" ? "d-box-ok" : "d-box", 8);
      s += T(tx + 12, 332, (tests[k][2] === "ok" ? "✓ " : "— ") + tests[k][0], "d-tb");
      s += T(tx + 12, 352, tests[k][1], "d-tm");
    }
    var n = paraList(40, 386, isI
      ? [{ t: "关键：接地断了就只剩基本绝缘——所以接地连续性必须单独测，且不能靠螺钉压接、喷漆面这种不可靠连接。", cls: "d-tw" },
         { t: "外壳是金属时，带电部分到外壳的距离按“基本绝缘”查表；外壳还能被手握住，所以要额外看温升与锐边。", cls: "d-t" }]
      : isII
        ? [{ t: "两层各自都要能承受对应耐压（附加绝缘 ≥ 基本绝缘的要求，加强绝缘按加强档）；层数不能靠“多缠一圈胶带”凑。", cls: "d-tw" },
           { t: "II 类设备不允许把接地当作防护手段；金属件若外露，必须通过双重 / 加强绝缘与带电部分隔开。", cls: "d-t" }]
        : [{ t: "III 类设备的“安全”来自上游的 SELV 电源：电源一旦不合格，整机就跟着不合格，所以适配器要单独考核隔离与耐压。", cls: "d-tw" },
           { t: "设备内部仍可能自发产生危险电压（如升压电路、储能电容），这时要按 I / II 类的思路重新评估。", cls: "d-t" }]);
    return svgOut(s + n.svg, n.bottom + 18);
  }
  DIAGRAMS["class-i"] = { caption: "I 类：基本绝缘 + 保护接地", svg: function () { return classDiagram("i"); } };
  DIAGRAMS["class-ii"] = { caption: "II 类：双重 / 加强绝缘，不依赖接地", svg: function () { return classDiagram("ii"); } };
  DIAGRAMS["class-iii"] = { caption: "III 类：SELV 供电，不按市电距离考核", svg: function () { return classDiagram("iii"); } };

  /* ---------- 渲染 ---------- */
  function render(root) {
    var nodes = (root || document).querySelectorAll("[data-dgm]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.getAttribute("data-dgm-done") === "1") continue;
      var name = el.getAttribute("data-dgm");
      var d = DIAGRAMS[name];
      if (!d) { el.setAttribute("data-dgm-done", "1"); continue; }
      var capNode = el.querySelector("figcaption");
      var alt = el.getAttribute("data-dgm-alt") || (capNode ? capNode.textContent.trim() : d.caption);
      var svg = d.svg().replace("<svg ", '<svg aria-label="' + esc(alt) + '" ');
      el.insertAdjacentHTML("afterbegin", svg);
      el.setAttribute("data-dgm-done", "1");
    }
  }
  // 内容由脚本动态注入的页面（知识卡详情、工坊等）也能自动出图
  function observe() {
    if (!window.MutationObserver || !document.body) return;
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      setTimeout(function () { pending = false; render(); }, 60);
    }).observe(document.body, { childList: true, subtree: true });
  }
  function boot() { render(); observe(); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AnguiDiagram = {
    names: Object.keys(DIAGRAMS),
    get: function (name) { return DIAGRAMS[name] ? DIAGRAMS[name].svg() : ""; },
    caption: function (name) { return DIAGRAMS[name] ? DIAGRAMS[name].caption : ""; },
    render: render
  };
})();
