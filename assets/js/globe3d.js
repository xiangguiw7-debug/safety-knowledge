(function () {
  "use strict";

  if (typeof THREE === "undefined" || typeof topojson === "undefined" || !window.WORLD_TOPO) {
    return;
  }

  var container = document.getElementById("globe3d");
  var svg = document.getElementById("globeSvg");
  if (!container) return;

  var canvasEl = null;
  var playBtn = document.getElementById("globePlay");
  var regionSel = document.getElementById("globeRegion");
  var searchInput = document.getElementById("globeSearch");
  var cardBox = document.getElementById("globeCard");


  var tooltip = document.createElement("div");
  tooltip.className = "globe-tip";
  tooltip.hidden = true;
  container.appendChild(tooltip);

  var CERT_BY_NAME = {};
  if (typeof CERT_COUNTRIES !== "undefined") {
    CERT_COUNTRIES.forEach(function (c) {
      CERT_BY_NAME[c.name] = c;
    });
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function wrapAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  /* ---------- 国家名称映射：认证条目 -> 世界地图英文名 ---------- */
  var CERT_GEO_MAP = {
    "中国": ["China"],
    "德国": ["Germany"],
    "英国": ["United Kingdom"],
    "法国": ["France"],
    "荷兰": ["Netherlands"],
    "比利时": ["Belgium"],
    "意大利": ["Italy"],
    "西班牙": ["Spain"],
    "北欧四国（瑞典/挪威/丹麦/芬兰）": ["Sweden", "Norway", "Denmark", "Finland"],
    "奥地利": ["Austria"],
    "瑞士": ["Switzerland"],
    "波兰": ["Poland"],
    "捷克": ["Czechia"],
    "匈牙利": ["Hungary"],
    "葡萄牙": ["Portugal"],
    "爱尔兰": ["Ireland"],
    "美国": ["United States of America"],
    "加拿大": ["Canada"],
    "日本": ["Japan"],
    "韩国": ["South Korea"],
    "印度": ["India"],
    "澳大利亚 / 新西兰": ["Australia", "New Zealand"],
    "欧亚经济联盟（俄/白俄/哈）": ["Russia", "Belarus", "Kazakhstan"],
    "巴西": ["Brazil"],
    "墨西哥": ["Mexico"],
    "沙特阿拉伯": ["Saudi Arabia"],
    "阿联酋": ["United Arab Emirates"],
    "马来西亚": ["Malaysia"],
    "泰国": ["Thailand"],
    "印度尼西亚": ["Indonesia"],
    "越南": ["Vietnam"],
    "台湾": ["Taiwan"],
    "菲律宾": ["Philippines"],
    "南非": ["South Africa"],
    "尼日利亚": ["Nigeria"],
    "肯尼亚": ["Kenya"],
    "埃及": ["Egypt"],
    "以色列": ["Israel"],
    "阿根廷": ["Argentina"],
    "土耳其": ["Turkey"],
    "希腊": ["Greece"],
    "罗马尼亚": ["Romania"],
    "保加利亚": ["Bulgaria"],
    "克罗地亚": ["Croatia"],
    "斯洛文尼亚": ["Slovenia"],
    "斯洛伐克": ["Slovakia"],
    "拉脱维亚": ["Latvia"],
    "立陶宛": ["Lithuania"],
    "爱沙尼亚": ["Estonia"],
    "卢森堡": ["Luxembourg"],
    "塞浦路斯": ["Cyprus"],
    "马耳他": ["Malta"],
    "冰岛": ["Iceland"],
    "乌克兰": ["Ukraine"],
    "卡塔尔": ["Qatar"],
    "科威特": ["Kuwait"],
    "阿曼": ["Oman"],
    "约旦": ["Jordan"],
    "黎巴嫩": ["Lebanon"],
    "伊拉克": ["Iraq"],
    "伊朗": ["Iran"],
    "巴林": ["Bahrain"],
    "巴基斯坦": ["Pakistan"],
    "孟加拉": ["Bangladesh"],
    "斯里兰卡": ["Sri Lanka"],
    "摩洛哥": ["Morocco"],
    "阿尔及利亚": ["Algeria"],
    "突尼斯": ["Tunisia"],
    "埃塞俄比亚": ["Ethiopia"],
    "坦桑尼亚": ["Tanzania"],
    "乌干达": ["Uganda"],
    "加纳": ["Ghana"],
    "科特迪瓦": ["Côte d'Ivoire"],
    "喀麦隆": ["Cameroon"],
    "哥伦比亚": ["Colombia"],
    "秘鲁": ["Peru"],
    "智利": ["Chile"],
    "厄瓜多尔": ["Ecuador"],
    "乌拉圭": ["Uruguay"],
    "巴拉圭": ["Paraguay"],
    "玻利维亚": ["Bolivia"],
    "多米尼加": ["Dominican Rep."],
    "巴拿马": ["Panama"],
    "哥斯达黎加": ["Costa Rica"],
    "危地马拉": ["Guatemala"],
    "洪都拉斯": ["Honduras"],
    "萨尔瓦多": ["El Salvador"]
  };

  var EU_MEMBERS = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
    "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
    "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden"
  ];

  var GEO_TO_CERT = {};
  Object.keys(CERT_GEO_MAP).forEach(function (certName) {
    CERT_GEO_MAP[certName].forEach(function (geoName) {
      GEO_TO_CERT[geoName] = certName;
    });
  });
  EU_MEMBERS.forEach(function (geoName) {
    if (!GEO_TO_CERT[geoName]) GEO_TO_CERT[geoName] = "欧盟";
  });

  var MARKER_NAMES = ["欧盟", "北欧四国（瑞典/挪威/丹麦/芬兰）", "欧亚经济联盟（俄/白俄/哈）", "新加坡", "马耳他", "巴林", "塞浦路斯", "卡塔尔", "科威特", "黎巴嫩"];

  function findCertByName(name) {
    if (!name) return null;
    if (CERT_BY_NAME[name]) return CERT_BY_NAME[name];
    var mapped = GEO_TO_CERT[name];
    if (mapped && CERT_BY_NAME[mapped]) return CERT_BY_NAME[mapped];
    var q = String(name).toLowerCase();
    for (var i = 0; i < CERT_COUNTRIES.length; i++) {
      var c = CERT_COUNTRIES[i];
      if (
        c.name.toLowerCase().indexOf(q) !== -1 ||
        c.system.toLowerCase().indexOf(q) !== -1 ||
        c.mark.toLowerCase().indexOf(q) !== -1
      ) {
        return c;
      }
    }
    return null;
  }

  function certPoint(name) {
    var g = null;
    if (typeof GLOBE_COUNTRIES !== "undefined") {
      for (var i = 0; i < GLOBE_COUNTRIES.length; i++) {
        if (GLOBE_COUNTRIES[i].key === name) {
          g = GLOBE_COUNTRIES[i];
          break;
        }
      }
    }
    if (g) return { lat: g.lat, lon: g.lon };
    var geo = (CERT_GEO_MAP[name] || [])[0];
    var item = geoNameToCountry[geo];
    if (item && item.group) {
      var box = new THREE.Box3().setFromObject(item.group);
      var center = box.getCenter(new THREE.Vector3());
      return {
        lat: Math.asin(clamp(center.y, -1, 1)) * 180 / Math.PI,
        lon: Math.atan2(center.z, center.x) * 180 / Math.PI
      };
    }
    return { lat: 30, lon: 100 };
  }

  /* ---------- 3D 基础场景 ---------- */
  var scene = new THREE.Scene();
  var globeGroup = new THREE.Group();
  globeGroup.rotation.order = "YXZ";
  scene.add(globeGroup);

  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 3.2);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch (err) {
    window.GLOBE3D_ACTIVE = false;
    if (svg) svg.style.display = "";
    container.style.display = "none";
    return;
  }
  window.GLOBE3D_ACTIVE = true;
  if (svg) svg.style.display = "none";
  container.style.display = "block";
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  canvasEl = renderer.domElement;
  container.appendChild(canvasEl);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(5, 3, 5);
  scene.add(dirLight);

  var oceanCanvas = document.createElement("canvas");
  oceanCanvas.width = 1024;
  oceanCanvas.height = 512;
  var octx = oceanCanvas.getContext("2d");
  var ograd = octx.createLinearGradient(0, 0, 0, 512);
  ograd.addColorStop(0, "#1b4a86");
  ograd.addColorStop(0.45, "#0d2f5e");
  ograd.addColorStop(1, "#071c3a");
  octx.fillStyle = ograd;
  octx.fillRect(0, 0, 1024, 512);
  var oceanTexture = new THREE.CanvasTexture(oceanCanvas);
  var oceanMat = new THREE.MeshPhongMaterial({
    map: oceanTexture,
    color: 0xffffff,
    emissive: 0x061a38,
    specular: 0x3a7bd5,
    shininess: 28,
    transparent: true,
    opacity: 0.96
  });
  var ocean = new THREE.Mesh(new THREE.SphereGeometry(0.985, 96, 48), oceanMat);
  globeGroup.add(ocean);

  var atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.035, 64, 32),
    new THREE.MeshBasicMaterial({
      color: 0x2f81f7,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
      depthWrite: false
    })
  );
  globeGroup.add(atmosphere);

  var atmosphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1.06, 64, 32),
    new THREE.MeshBasicMaterial({
      color: 0x6aa7ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      depthWrite: false
    })
  );
  globeGroup.add(atmosphere2);

  /* 经纬网格 */
  var gridPos = [];
  var lon;
  var lat;
  for (lon = -180; lon <= 180; lon += 30) {
    for (lat = -90; lat <= 90; lat += 10) {
      var a = latLon(lat, lon, 0.99);
      var b = latLon(lat + 10, lon, 0.99);
      gridPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  for (lat = -60; lat <= 60; lat += 30) {
    for (lon = -180; lon < 180; lon += 10) {
      a = latLon(lat, lon, 0.99);
      b = latLon(lat, lon + 10, 0.99);
      gridPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  var gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPos, 3));
  globeGroup.add(new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({
    color: 0x3f6f9e,
    transparent: true,
    opacity: 0.18
  })));

  var landGroup = new THREE.Group();
  var markerGroup = new THREE.Group();
  globeGroup.add(landGroup);
  globeGroup.add(markerGroup);

  var countryItems = [];
  var markerItems = [];
  var geoNameToCountry = {};

  function latLon(latDeg, lonDeg, radius) {
    var phi = latDeg * Math.PI / 180;
    var lam = lonDeg * Math.PI / 180;
    var cosP = Math.cos(phi);
    return {
      x: radius * cosP * Math.cos(lam),
      y: radius * Math.sin(phi),
      z: radius * cosP * Math.sin(lam)
    };
  }

  function unwrapRing(ring) {
    var pts = [];
    for (var i = 0; i < ring.length; i++) {
      pts.push([ring[i][0], ring[i][1]]);
    }
    for (i = 1; i < pts.length; i++) {
      while (pts[i][0] - pts[i - 1][0] > 180) pts[i][0] -= 360;
      while (pts[i][0] - pts[i - 1][0] < -180) pts[i][0] += 360;
    }
    return pts;
  }

  function ringLinePoints(ring) {
    var pts = unwrapRing(ring);
    var out = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var steps = Math.max(1, Math.ceil(Math.max(Math.abs(p2[0] - p1[0]), Math.abs(p2[1] - p1[1])) / 2.5));
      var prev = latLon(p1[1], p1[0], 1.012);
      for (var s = 1; s <= steps; s++) {
        var t = s / steps;
        var cur = latLon(
          p1[1] + (p2[1] - p1[1]) * t,
          p1[0] + (p2[0] - p1[0]) * t,
          1.012
        );
        out.push(prev.x, prev.y, prev.z, cur.x, cur.y, cur.z);
        prev = cur;
      }
    }
    return out;
  }

  function addShapeFromRing(shapeArr, ring, isHole) {
    var pts = unwrapRing(ring);
    if (pts.length < 3) return;
    var path = isHole ? new THREE.Path() : new THREE.Shape();
    path.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) {
      path.lineTo(pts[i][0], pts[i][1]);
    }
    if (isHole) {
      shapeArr[shapeArr.length - 1].holes.push(path);
    } else {
      shapeArr.push(path);
    }
  }

  function buildCountry(geoName, feature) {
    var geometry = feature.geometry;
    if (!geometry) return null;
    var polygons = [];
    if (geometry.type === "Polygon") {
      polygons.push(geometry.coordinates);
    } else if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach(function (p) { polygons.push(p); });
    }
    if (!polygons.length) return null;

    var shapes = [];
    var linePos = [];
    polygons.forEach(function (poly) {
      if (!poly.length) return;
      shapes.length && addShapeFromRing(shapes, poly[0], false);
      if (!shapes.length) addShapeFromRing(shapes, poly[0], false);
      for (var h = 1; h < poly.length; h++) {
        addShapeFromRing(shapes, poly[h], true);
      }
      poly.forEach(function (ring) {
        linePos = linePos.concat(ringLinePoints(ring));
      });
    });

    if (!shapes.length) return null;

    var fillGeo = new THREE.ShapeGeometry(shapes, 10);
    var posAttr = fillGeo.attributes.position;
    var arr = posAttr.array;
    for (var i = 0; i < arr.length; i += 3) {
      var v = latLon(arr[i + 1], arr[i], 1.004);
      arr[i] = v.x;
      arr[i + 1] = v.y;
      arr[i + 2] = v.z;
    }
    posAttr.needsUpdate = true;
    fillGeo.computeBoundingSphere();
    fillGeo.computeVertexNormals();

    var certName = GEO_TO_CERT[geoName] || null;
    var material = new THREE.MeshLambertMaterial({
      color: certName ? 0x147efb : 0x2f4b6e,
      transparent: true,
      opacity: certName ? 0.42 : 0.15,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    var group = new THREE.Group();
    group.userData.countryId = countryItems.length;
    group.userData.geoName = geoName;
    var mesh = new THREE.Mesh(fillGeo, material);
    group.add(mesh);

    var lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9ecbff,
      transparent: true,
      opacity: certName ? 0.65 : 0.22
    });
    if (linePos.length) {
      var lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
      var lines = new THREE.LineSegments(lineGeo, lineMaterial);
      group.add(lines);
    }

    landGroup.add(group);
    var item = {
      id: countryItems.length,
      group: group,
      material: material,
      lineMaterial: lineMaterial,
      certName: certName,
      geoName: geoName
    };
    countryItems.push(item);
    geoNameToCountry[geoName] = item;
    return item;
  }

  function buildMarkers() {
    if (typeof CERT_COUNTRIES === "undefined") return;
    CERT_COUNTRIES.forEach(function (c) {
      var hasShape = (CERT_GEO_MAP[c.name] || []).some(function (geo) {
        return !!geoNameToCountry[geo];
      });
      if (hasShape && MARKER_NAMES.indexOf(c.name) === -1) return;

      var pt = certPoint(c.name);
      var v = latLon(pt.lat, pt.lon, 1.02);
      var radius = MARKER_NAMES.indexOf(c.name) !== -1 ? 0.035 : 0.028;
      var mat = new THREE.MeshBasicMaterial({
        color: 0xffd166,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      });
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), mat);
      mesh.position.set(v.x, v.y, v.z);
      mesh.userData.certName = c.name;
      mesh.userData.marker = true;
      markerGroup.add(mesh);
      markerItems.push({ mesh: mesh, material: mat, certName: c.name });
    });
  }

  var features = topojson.feature(window.WORLD_TOPO, window.WORLD_TOPO.objects.countries).features;
  features.forEach(function (feature) {
    var geoName = feature.properties && feature.properties.name;
    if (geoName) buildCountry(geoName, feature);
  });
  buildMarkers();

  /* ---------- 交互状态 ---------- */
  var playing = true;
  var yaw = 1.85;
  var pitch = 0.35;
  var cameraDist = 3.2;
  var focusAnim = null;
  var selectedCertName = null;
  var selectedGeoName = null;
  var currentRegion = "all";
  var searchQ = "";
  var pointers = {};
  var lastPinchDist = 0;
  var moved = 0;

  function updateCamera() {
    var cosP = Math.cos(pitch);
    camera.position.set(
      cameraDist * cosP * Math.cos(yaw),
      cameraDist * Math.sin(pitch),
      cameraDist * cosP * Math.sin(yaw)
    );
    camera.lookAt(0, 0, 0);
  }

  function resize() {
    var w = container.clientWidth || 320;
    var h = container.clientHeight || w;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function populateRegions() {
    if (!regionSel) return;
    var regions = [];
    CERT_COUNTRIES.forEach(function (c) {
      if (regions.indexOf(c.region) === -1) regions.push(c.region);
    });
    regions.sort();
    regionSel.innerHTML = '<option value="all">区域：全部</option>' +
      regions.map(function (r) {
        return '<option value="' + esc(r) + '">区域：' + esc(r) + "</option>";
      }).join("");
  }

  function matchesFilter(item) {
    if (!item.certName) return false;
    var cert = CERT_BY_NAME[item.certName];
    if (!cert) return false;
    if (currentRegion !== "all" && cert.region !== currentRegion) return false;
    if (searchQ) {
      var hay = (cert.name + " " + cert.system + " " + cert.mark).toLowerCase();
      if (hay.indexOf(searchQ) === -1) return false;
    }
    return true;
  }

  function styleCountry(item, mode) {
    if (mode === "sel") {
      item.material.color.set(0xffd166);
      item.material.opacity = 0.82;
      item.lineMaterial.color.set(0xffe08a);
      item.lineMaterial.opacity = 0.95;
    } else if (mode === "full") {
      item.material.color.set(item.certName ? 0x147efb : 0x2f4b6e);
      item.material.opacity = item.certName ? 0.42 : 0.15;
      item.lineMaterial.color.set(0x9ecbff);
      item.lineMaterial.opacity = item.certName ? 0.65 : 0.22;
    } else {
      item.material.color.set(0x20344d);
      item.material.opacity = 0.07;
      item.lineMaterial.color.set(0x4b6f96);
      item.lineMaterial.opacity = 0.12;
    }
  }

  function applyFilter() {
    countryItems.forEach(function (item) {
      var sel = selectedGeoName === item.geoName ||
        (!selectedGeoName && selectedCertName && item.certName === selectedCertName);
      if (sel) {
        styleCountry(item, "sel");
      } else if (matchesFilter(item)) {
        styleCountry(item, "full");
      } else {
        styleCountry(item, "dim");
      }
    });
    markerItems.forEach(function (m) {
      var cert = CERT_BY_NAME[m.certName];
      var regionOk = currentRegion === "all" || (cert && cert.region === currentRegion);
      var qOk = !searchQ;
      if (searchQ) {
        var hay = (cert.name + " " + cert.system + " " + cert.mark).toLowerCase();
        qOk = hay.indexOf(searchQ) !== -1;
      }
      if (m.certName === selectedCertName || (regionOk && qOk)) {
        m.material.color.set(0xffd166);
        m.material.opacity = 0.95;
      } else {
        m.material.color.set(0x3b5b7a);
        m.material.opacity = 0.25;
      }
    });
  }

  function renderCard(cert, fallbackName) {
    if (!cardBox) return;
    if (!cert) {
      cardBox.innerHTML = '<div class="card"><h3>🌍 ' + esc(fallbackName || "该地区") + "</h3>" +
        "<p>这里提供替代路径，先帮你判断该市场：① 参考相邻国家或区域体系（欧盟 CE、海湾 IECEE/CB、非洲 PVoC 等）；② 用下方“按国家 / 地区”搜索邻近国家；③ 向当地标准机构确认产品目录。</p></div>";
      return;
    }
    cardBox.innerHTML =
      '<div class="card"><h3>' + esc(cert.mark) + " " + esc(cert.name) + "</h3>" +
      "<p><b>体系：</b>" + esc(cert.system) + " · <b>监管：</b>" + esc(cert.regulator) + "</p>" +
      "<p><b>强制范围：</b>" + esc(cert.scope) + "</p>" +
      "<p><b>标准依据：</b>" + esc(cert.standards) + "</p>" +
      '<p class="note" style="color:var(--muted);font-size:13px">' + esc(cert.note) + "</p>" +
      '<p><a class="btn" href="' + esc(cert.url) + '" target="_blank" rel="noopener">' +
      esc(cert.urlLabel) + '</a> <a class="btn" href="./voltage.html">电压速查</a> <a class="btn" href="./wizard.html">认证向导</a></p></div>';
  }

  function focusPoint(latDeg, lonDeg) {
    focusAnim = {
      t0: Date.now(),
      fromYaw: yaw,
      fromPitch: pitch,
      toYaw: lonDeg * Math.PI / 180,
      toPitch: clamp(latDeg * Math.PI / 180, -1.35, 1.35),
      dur: 700
    };
  }

  function selectByName(name, geoName) {
    var cert = findCertByName(name);
    selectedCertName = cert ? cert.name : null;
    selectedGeoName = geoName || null;
    if (cert) {
      var pt = certPoint(cert.name);
      focusPoint(pt.lat, pt.lon);
      renderCard(cert, cert.name);
      try { history.replaceState(null, "", "?c=" + encodeURIComponent(cert.name)); } catch (e) { /* ignore */ }
    } else {
      renderCard(null, geoName || name);
    }
    applyFilter();
  }

  function getHit(e) {
    var rect = canvasEl.getBoundingClientRect();
    var ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);
    var objects = landGroup.children.concat(markerGroup.children);
    var hits = raycaster.intersectObjects(objects, true);
    if (!hits.length) return null;
    return hits[0];
  }

  function hoverLabel(hit) {
    if (!hit) return null;
    var obj = hit.object;
    if (obj.userData && obj.userData.marker && obj.userData.certName) {
      var cert = CERT_BY_NAME[obj.userData.certName];
      return cert ? cert.name + " · " + cert.mark : obj.userData.certName;
    }
    var node = obj;
    while (node) {
      if (node.userData && node.userData.countryId !== undefined) {
        var item = countryItems[node.userData.countryId];
        if (!item) return null;
        if (item.certName) {
          var c = CERT_BY_NAME[item.certName];
          return c ? c.name + " · " + c.mark : item.certName;
        }
        return item.geoName + "（暂未收录）";
      }
      node = node.parent;
    }
    return null;
  }

  function updateHover(e) {
    var hit = getHit(e);
    var label = hoverLabel(hit);
    canvasEl.style.cursor = label ? "pointer" : "grab";
    if (!label) {
      tooltip.hidden = true;
      return;
    }
    var rect = canvasEl.getBoundingClientRect();
    tooltip.textContent = label;
    tooltip.hidden = false;
    tooltip.style.left = Math.min(Math.max(e.clientX - rect.left, 8), rect.width - 120) + "px";
    tooltip.style.top = Math.max(e.clientY - rect.top - 34, 8) + "px";
  }

  function clickHit(e) {
    var hit = getHit(e);
    if (!hit) return;
    var obj = hit.object;
    if (obj.userData && obj.userData.marker) {
      selectByName(obj.userData.certName, null);
      return;
    }
    var node = obj;
    while (node) {
      if (node.userData && node.userData.countryId !== undefined) {
        var item = countryItems[node.userData.countryId];
        if (item) {
          if (item.certName) {
            selectByName(item.certName, item.geoName);
          } else {
            selectByName(null, item.geoName);
          }
        }
        return;
      }
      node = node.parent;
    }
  }

  /* ---------- 事件 ---------- */
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      playing = !playing;
      playBtn.textContent = playing ? "⏸ 暂停旋转" : "▶ 继续旋转";
    });
  }

  if (regionSel) {
    populateRegions();
    regionSel.addEventListener("change", function () {
      currentRegion = this.value;
      applyFilter();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = this.value.trim();
      searchQ = q.toLowerCase();
      applyFilter();
      if (q) {
        var cert = findCertByName(q);
        if (cert) selectByName(cert.name, null);
      }
    });
  }

  canvasEl.addEventListener("pointerdown", function (e) {
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    moved = 0;
    try { canvasEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  });

  canvasEl.addEventListener("pointermove", function (e) {
    var pt = pointers[e.pointerId];
    if (pt) {
      var ids = Object.keys(pointers);
      if (ids.length === 1) {
        var dx = e.clientX - pt.x;
        var dy = e.clientY - pt.y;
        moved += Math.abs(dx) + Math.abs(dy);
        yaw += dx * 0.005;
        pitch = clamp(pitch + dy * 0.003, -1.35, 1.35);
        pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      } else if (ids.length === 2) {
        var otherId = ids[0] === e.pointerId ? ids[1] : ids[0];
        var other = pointers[otherId];
        if (other) {
          var dist = Math.hypot(e.clientX - other.x, e.clientY - other.y);
          if (lastPinchDist > 0) {
            cameraDist = clamp(cameraDist + (lastPinchDist - dist) * 0.004, 1.8, 5.5);
          }
          lastPinchDist = dist;
        }
      }
    } else if (!e.buttons) {
      updateHover(e);
    }
  });

  function endPointer(e, asClick) {
    if (pointers[e.pointerId]) delete pointers[e.pointerId];
    if (Object.keys(pointers).length < 2) lastPinchDist = 0;
    if (asClick && Object.keys(pointers).length === 0 && moved < 6) {
      clickHit(e);
    }
  }

  canvasEl.addEventListener("pointerup", function (e) { endPointer(e, true); });
  canvasEl.addEventListener("pointercancel", function (e) { endPointer(e, false); });

  canvasEl.addEventListener("wheel", function (e) {
    e.preventDefault();
    cameraDist = clamp(cameraDist + e.deltaY * 0.0015, 1.8, 5.5);
  }, { passive: false });

  window.addEventListener("resize", resize);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resize).observe(container);
  }

  /* ---------- URL 直达与动画 ---------- */
  var qs = new URLSearchParams(location.search);
  var urlC = qs.get("c");
  if (urlC) selectByName(urlC, null);

  resize();

  function animate() {
    requestAnimationFrame(animate);
    if (focusAnim) {
      var fp = Math.min(1, (Date.now() - focusAnim.t0) / focusAnim.dur);
      var fe = 1 - Math.pow(1 - fp, 3);
      yaw = focusAnim.fromYaw + wrapAngle(focusAnim.toYaw - focusAnim.fromYaw) * fe;
      pitch = focusAnim.fromPitch + (focusAnim.toPitch - focusAnim.fromPitch) * fe;
      if (fp >= 1) {
        yaw = focusAnim.toYaw;
        pitch = focusAnim.toPitch;
        focusAnim = null;
      }
    } else if (playing) {
      yaw += 0.0016;
    }
    updateCamera();

    var t = Date.now() / 1000;
    markerItems.forEach(function (m) {
      if (m.certName === selectedCertName) {
        var s = 1 + Math.sin(t * 4) * 0.22;
        m.mesh.scale.set(s, s, s);
      } else {
        m.mesh.scale.set(1, 1, 1);
      }
    });

    renderer.render(scene, camera);
  }

  animate();
})();
