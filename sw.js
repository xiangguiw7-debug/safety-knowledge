var CACHE_NAME = "safety-reliability-v1.4.5";
var CORE_ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./assets/icons/logo.png",
  "./pages/learn.html", "./pages/refs.html",
  "./pages/clearance.html", "./pages/creepage.html", "./pages/surge.html", "./pages/hipot.html",
  "./pages/tools.html", "./pages/industries.html", "./pages/standards.html", "./pages/voltage.html", "./pages/certification.html",
  "./pages/cert-map.html", "./pages/materials.html", "./pages/glossary.html", "./pages/wizard.html", "./pages/standards-compare.html", "./pages/emc.html", "./pages/emc-ce.html", "./pages/emc-re.html", "./pages/emc-esd.html", "./pages/emc-eft.html", "./pages/emc-magnetic.html", "./pages/emc-dips.html",
  "./pages/hazard-energy.html", "./pages/hazard-fire.html", "./pages/hazard-thermal.html", "./pages/hazard-mechanical.html", "./pages/hazard-radiation.html", "./pages/hazard-chemical.html", "./pages/cases.html", "./pages/pcb-guidelines.html", "./pages/components.html", "./pages/environment-tests.html", "./pages/labels.html", "./pages/standards-updates.html", "./pages/faq.html", "./pages/roles.html", "./pages/designer-guide.html", "./pages/product-classes.html", "./pages/standard-picker.html", "./pages/poster.html", "./pages/resources.html", "./pages/changelog.html", "./pages/cache-help.html", "./pages/verification.html", "./pages/mopp-moop.html", "./pages/double-insulation.html", "./pages/leakage.html", "./pages/grounding.html", "./pages/selv.html", "./pages/insulation-coordination.html", "./pages/cybersecurity.html", "./pages/workshop.html", "./pages/product-categories.html", "./pages/test-equipment.html", "./assets/js/breadcrumb.js?v=1.4.5", "./assets/js/nav.js?v=1.4.5", "./pages/map.html", "./pages/testing.html", "./assets/js/reliability-data.js?v=1.4.5", "./pages/reliability.html", "./pages/sop-wire-flame.html", "./pages/sop-vibration-sine.html", "./pages/sop-vibration-random.html", "./pages/sop-un383.html", "./pages/sop-ul94-5v.html", "./pages/sop-thermal-shock-battery.html", "./pages/sop-thermal-runaway.html", "./pages/sop-temperature-operation.html", "./pages/sop-temp-cycling.html", "./pages/sop-stability.html", "./pages/sop-shock.html", "./pages/sop-sar.html", "./pages/sop-salt-mist.html", "./pages/sop-rti.html", "./pages/sop-residual-voltage.html", "./pages/sop-radiated-immunity.html", "./pages/sop-radiated-emission.html", "./pages/sop-protective-impedance.html", "./pages/sop-power-frequency-field.html", "./pages/sop-post-env-safety.html", "./pages/sop-photobiological.html", "./pages/sop-noise.html", "./pages/sop-mechanical-strength.html", "./pages/sop-insulation-coating.html", "./pages/sop-impact-puncture.html", "./pages/sop-hwi.html", "./pages/sop-high-temp-battery.html", "./pages/sop-harmonic-flicker.html", "./pages/sop-hai.html", "./pages/sop-gwit.html", "./pages/sop-functional-safety.html", "./pages/sop-forced-discharge.html", "./pages/sop-endurance.html", "./pages/sop-eft.html", "./pages/sop-dry-heat.html", "./pages/sop-drop.html", "./pages/sop-dips.html", "./pages/sop-damp-heat-steady.html", "./pages/sop-damp-heat-cyclic.html", "./pages/sop-cybersecurity.html", "./pages/sop-cti-test.html", "./pages/sop-crush.html", "./pages/sop-conducted-immunity.html", "./pages/sop-conducted-emission.html", "./pages/sop-cold.html", "./pages/sop-charge-discharge.html", "./pages/sop-battery-drop.html", "./assets/js/sop-render.js?v=1.4.5", "./assets/js/sop-data.js?v=1.4.5", "./pages/sop.html", "./pages/sop-ul94.html", "./pages/sop-temperature-rise.html", "./pages/sop-surge.html", "./pages/sop-spacing.html", "./pages/sop-needle-flame.html", "./pages/sop-leakage.html", "./pages/sop-ip.html", "./pages/sop-insulation-resistance.html", "./pages/sop-ik.html", "./pages/sop-hipot.html", "./pages/sop-grounding.html", "./pages/sop-glow-wire.html", "./pages/sop-esd.html", "./pages/sop-battery-short.html", "./pages/sop-ball-pressure.html", "./pages/feedback.html", "./pages/data.html", "./en/index.html", "./en/core.html", "./en/glossary.html",
  "./pages/quiz.html", "./pages/search.html", "./pages/knowledge.html",
  "./pages/knowledge-detail.html", "./pages/knowledge-print.html", "./pages/insulation-guide.html", "./pages/standard-diffs.html", "./pages/structural-checklist.html", "./pages/circuit-checklist.html", "./pages/templates.html", "./pages/export-compliance.html", "./pages/export-data.html", "./pages/ppwr.html", "./pages/erp.html", "./pages/ce-directives.html", "./pages/us-standards.html", "./pages/power-design.html", "./pages/case-65w.html",
  "./assets/css/style.css?v=1.4.5", "./assets/css/calculator.css?v=1.4.5", "./assets/css/industries.css?v=1.4.5", "./assets/css/dmcm.css?v=1.4.5", "./assets/css/search.css?v=1.4.5",
  "./assets/js/theme.js?v=1.4.5", "./assets/js/glossary-tip.js?v=1.4.5", "./assets/js/main.js?v=1.4.5", "./assets/js/calculator-v3.js?v=1.4.5", "./assets/js/hipot.js?v=1.4.5", "./assets/js/calculator-extra.js?v=1.4.5", "./assets/js/pollution-degree.js?v=1.4.5", "./assets/js/industry-data.js?v=1.4.5", "./assets/js/standards-data.js?v=1.4.5", "./assets/js/std-quick.js?v=1.4.5",
  "./assets/js/quiz-v2.js?v=1.4.5",
  "./assets/js/quiz-engine.js?v=1.4.5", "./assets/js/quiz-extra.js?v=1.4.5",
  "./assets/js/quiz-auto.js?v=1.4.5",
  "./assets/js/feynman.js?v=1.4.5",
  "./assets/js/knowledge-detail-data.js?v=1.4.5",
  "./assets/js/standards-data.js?v=1.4.5",
  "./assets/js/reliability-data.js?v=1.4.5", "./assets/js/hipot-template.js?v=1.4.5", "./assets/js/dmcm.js?v=1.4.5", "./assets/js/voltage.js?v=1.4.5", "./assets/js/certification.js?v=1.4.5", "./assets/js/search.js?v=1.4.5", "./assets/js/materials.js?v=1.4.5", "./assets/js/glossary.js?v=1.4.5", "./assets/js/wizard.js?v=1.4.5", "./assets/js/progress.js?v=1.4.5", "./assets/js/knowledge-group.js?v=1.4.5",
  "./assets/js/knowledge-detail-data.js?v=1.4.5",
  "./assets/js/knowledge-index.js?v=1.4.5", "./assets/js/knowledge-meta.js?v=1.4.5", "./assets/js/knowledge-notes.js?v=1.4.5", "./assets/js/compare.js?v=1.4.5", "./assets/js/ux.js?v=1.4.5", "./assets/js/knowledge-chain.js?v=1.4.5", "./assets/js/standard-status.js?v=1.4.5",
  "./assets/js/cases.js?v=1.4.5", "./assets/js/picker.js?v=1.4.5", "./assets/js/sitemap.js?v=1.4.5", "./assets/js/workshop.js?v=1.4.5", "./assets/js/data-backup.js?v=1.4.5",
  "./assets/js/tools-knowledge-links.js?v=1.4.5",
  "./assets/js/scenario-guide.js?v=1.4.5",
  "./assets/js/structural-checklist.js?v=1.4.5",
  "./assets/js/card-quiz.js?v=1.4.5",
  "./assets/js/milestone-quiz.js?v=1.4.5",
  "./assets/js/spaced-review.js?v=1.4.5",
  "./assets/js/quiz-interview.js?v=1.4.5",
  "./assets/js/export-data.js?v=1.4.5",
  "./assets/js/templates-editor.js?v=1.4.5",
  "./assets/js/knowledge-tools-links.js?v=1.4.5",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/lib/leaflet/leaflet.js?v=1.4.5", "./assets/lib/topojson-client.min.js?v=1.4.5", "./assets/lib/world-topo-110.js?v=1.4.5",
  "./assets/lib/leaflet/leaflet.css?v=1.4.5",
  "./assets/lib/leaflet/images/marker-icon.png",
  "./assets/lib/leaflet/images/marker-icon-2x.png",
  "./assets/lib/leaflet/images/marker-shadow.png",
  "./assets/lib/leaflet/images/layers.png",
  "./assets/lib/leaflet/images/layers-2x.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(CORE_ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key !== CACHE_NAME;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // version.json 是“线上最新版本”探针，必须永远直连网络，任何时候都不进缓存
  if (url.pathname.indexOf("version.json") !== -1) {
    event.respondWith(fetch(new Request(event.request, { cache: "no-store" })));
    return;
  }

  // 页面导航：直接绕过浏览器 HTTP 缓存去拿最新 HTML（GitHub Pages 给 HTML 的 max-age=600
  // 会让“刚上传的新页面”最多晚 10 分钟才出现），网络不可用时再用缓存兜底
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(new Request(event.request, { cache: "no-store" }))
        .then(function (response) {
          if (response && response.status === 200) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          return caches.match(event.request).then(function (cached) {
            return cached || caches.match("./index.html");
          });
        })
    );
    return;
  }

  // 其他资源：先用缓存快速显示，同时后台拉取最新版本并更新缓存
  // （资源 URL 都带 ?v=版本号，所以版本一升级就是新 URL，不会命中旧缓存）
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200 && response.type === "basic") {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });
      return cached || fetchPromise;
    })
  );
});

// 页面点“立即更新”时，让等待中的新 Service Worker 直接接管
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

