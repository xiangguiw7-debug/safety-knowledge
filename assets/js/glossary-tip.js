(function () {
  var TIPS = {
    CTI: "相对漏电起痕指数（材料组划分依据）",
    MOPP: "患者防护方式（医疗）",
    MOOP: "操作者防护方式（医疗）",
    SELV: "安全特低电压",
    PELV: "保护特低电压",
    SPD: "浪涌保护器",
    MOV: "压敏电阻",
    GDT: "气体放电管",
    TVS: "瞬态抑制二极管",
    TSS: "半导体放电管",
    ESD: "静电放电",
    EFT: "电快速瞬变脉冲群",
    RoHS: "有害物质限制指令",
    REACH: "欧盟化学品法规",
    WEEE: "电子废弃物指令",
    SVHC: "高关注物质",
    RTI: "相对温度指数（长期耐温）",
    HWI: "热丝引燃（UL 指标）",
    HAI: "高电流电弧引燃（UL 指标）",
    GWFI: "灼热丝可燃性指数",
    GWIT: "灼热丝起燃温度",
    OVC: "过电压类别（Ⅰ–Ⅳ）",
    PFC: "功率因数校正",
    SAR: "比吸收率（射频暴露）",
    LPL: "雷电防护等级",
    CB: "IECEE 测试证书体系",
    RED: "欧盟无线电设备指令",
    LVD: "欧盟低压指令",
    Hipot: "耐压测试"
  };

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  var terms = Object.keys(TIPS).sort(function (a, b) { return b.length - a.length; });
  var regex = new RegExp("\\b(" + terms.map(escapeRe).join("|") + ")\\b", "g");

  var skip = { SCRIPT: 1, STYLE: 1, A: 1, PRE: 1, CODE: 1, ABBR: 1, TEXTAREA: 1, INPUT: 1 };
  var main = document.querySelector("main");
  if (!main) return;

  var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      var p = n.parentNode;
      return p && skip[p.nodeName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  var nodes = [];
  var n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(function (textNode) {
    regex.lastIndex = 0;
    var text = textNode.nodeValue;
    if (!text || text.indexOf("\b") !== -1) return;
    var frag = document.createDocumentFragment();
    var last = 0;
    var m;
    var wrapped = false;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var abbr = document.createElement("abbr");
      abbr.className = "gloss";
      abbr.title = TIPS[m[1]];
      abbr.textContent = m[1];
      frag.appendChild(abbr);
      last = m.index + m[1].length;
      wrapped = true;
    }
    if (wrapped) {
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      if (textNode.parentNode) textNode.parentNode.replaceChild(frag, textNode);
    }
  });
})();
