(function () {
  if (window.GLOBE3D_ACTIVE) return;
  var R = 150, CX = 170, CY = 175;
  var rotation = -40;
  var playing = true;
  var dragging = false;
  var moved = 0;
  var lastX = 0;
  var selectedKey = null;
  var currentRegion = "all";
  var searchQ = "";

  function $(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  function wrapLon(lon) {
    var l = ((lon + 540) % 360) - 180;
    return l;
  }

  function proj(lat, lon) {
    var lam = wrapLon(lon) * Math.PI / 180;
    var phi = lat * Math.PI / 180;
    var cosL = Math.cos(lam);
    if (cosL <= 0) return null;
    return {
      x: CX + R * Math.cos(phi) * Math.sin(lam),
      y: CY - R * Math.sin(phi),
      edge: cosL < 0.12
    };
  }

  function meridians() {
    var out = "";
    for (var lon = -90; lon <= 90; lon += 30) {
      var rx = R * Math.cos((wrapLon(lon + rotation)) * Math.PI / 180);
      if (rx < 1) continue;
      out += '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + rx + '" ry="' + R + '" class="g-m"></ellipse>';
    }
    return out;
  }

  function parallels() {
    var out = "";
    for (var lat = -60; lat <= 60; lat += 30) {
      var r = R * Math.cos(lat * Math.PI / 180);
      var cy = CY - R * Math.sin(lat * Math.PI / 180);
      out += '<circle cx="' + CX + '" cy="' + cy + '" r="' + r + '" class="g-p"></circle>';
    }
    return out;
  }

  function countryCert(name) {
    return CERT_COUNTRIES.filter(function (c) { return c.name === name; })[0];
  }

  function renderDots() {
    var out = "";
    GLOBE_COUNTRIES.forEach(function (c) {
      var cert = countryCert(c.key);
      var regionOk = currentRegion === "all" || (cert && cert.region === currentRegion);
      var qOk = !searchQ || c.key.toLowerCase().indexOf(searchQ) !== -1;
      var p = proj(c.lat, c.lon);
      if (!p) return;
      var cls = "dot";
      if (!regionOk || !qOk) cls += " dim";
      if (selectedKey === c.key) cls += " sel";
      out += '<circle class="' + cls + '" cx="' + p.x + '" cy="' + p.y + '" r="4.5" data-key="' + esc(c.key) + '" data-name="' + esc(c.key) + '"></circle>';
    });
    return out;
  }

  function buildGlobe() {
    var svg = $("globeSvg");
    if (!svg) return;
    svg.innerHTML =
      '<defs><clipPath id="globeClip"><circle cx="' + CX + '" cy="' + CY + '" r="' + R + '"></circle></clipPath></defs>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" class="globe-ocean"></circle>' +
      '<g clip-path="url(#globeClip)">' + parallels() + meridians() + renderDots() + "</g>" +
      '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" class="globe-ring"></circle>';
  }

  function selectCountry(key) {
    selectedKey = key;
    var cert = countryCert(key);
    var box = $("globeCard");
    if (!cert) {
      box.innerHTML = '<div class="card"><h3>🌍 ' + esc(key) + "</h3><p>该国家暂未收录详细认证数据，请使用下方“按国家 / 地区”视图或官方入口核对。</p></div>";
    } else {
      box.innerHTML = '<div class="card"><h3>' + esc(cert.mark) + " " + esc(cert.name) + "</h3>" +
        "<p><b>体系：</b>" + esc(cert.system) + " · <b>监管：</b>" + esc(cert.regulator) + "</p>" +
        "<p><b>强制范围：</b>" + esc(cert.scope) + "</p>" +
        "<p><b>标准依据：</b>" + esc(cert.standards) + "</p>" +
        '<p class="note" style="color:var(--muted);font-size:13px">' + esc(cert.note) + "</p>" +
        '<p><a class="btn" href="' + cert.url + '" target="_blank" rel="noopener">' + esc(cert.urlLabel) + '</a> <a class="btn" href="./voltage.html">电压速查</a> <a class="btn" href="./wizard.html">认证向导</a></p></div>';
    }
    try { history.replaceState(null, "", "?c=" + encodeURIComponent(key)); } catch (e) { /* ignore */ }
    buildGlobe();
  }

  function tick() {
    if (playing && !dragging) rotation += 0.35;
    buildGlobe();
    requestAnimationFrame(tick);
  }

  var svg = $("globeSvg");
  if (!svg) return;

  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    moved += Math.abs(dx);
    rotation += dx * 0.35;
    lastX = e.clientX;
  });
  svg.addEventListener("pointerup", function (e) {
    dragging = false;
    if (moved < 6 && e.target && e.target.getAttribute && e.target.getAttribute("data-key")) {
      selectCountry(e.target.getAttribute("data-key"));
    }
  });

  var playBtn = $("globePlay");
  if (playBtn) playBtn.addEventListener("click", function () {
    playing = !playing;
    playBtn.textContent = playing ? "⏸ 暂停旋转" : "▶ 恢复旋转";
  });

  var regionSel = $("globeRegion");
  if (regionSel) {
    var regions = [];
    CERT_COUNTRIES.forEach(function (c) { if (regions.indexOf(c.region) === -1) regions.push(c.region); });
    regions.sort();
    regions.forEach(function (r) {
      var o = document.createElement("option");
      o.value = r;
      o.textContent = r;
      regionSel.appendChild(o);
    });
    regionSel.addEventListener("change", function () { currentRegion = this.value; buildGlobe(); });
  }

  var searchInput = $("globeSearch");
  if (searchInput) searchInput.addEventListener("input", function () {
    searchQ = this.value.trim().toLowerCase();
    buildGlobe();
  });

  var qs = new URLSearchParams(location.search);
  var c = qs.get("c");
  if (c && countryCert(c)) selectCountry(c);

  tick();
})();
