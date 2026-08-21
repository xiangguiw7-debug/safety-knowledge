var CACHE_NAME = "safety-reliability-v1.3.0";
var CORE_ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./assets/icons/logo.png",
  "./pages/learn.html", "./pages/refs.html",
  "./pages/clearance.html", "./pages/creepage.html", "./pages/surge.html", "./pages/hipot.html",
  "./pages/tools.html", "./pages/industries.html", "./pages/standards.html", "./pages/voltage.html", "./pages/certification.html",
  "./pages/cert-map.html", "./pages/materials.html", "./pages/glossary.html", "./pages/wizard.html", "./pages/standards-compare.html", "./pages/emc.html", "./pages/emc-ce.html", "./pages/emc-re.html", "./pages/emc-esd.html", "./pages/emc-eft.html", "./pages/emc-magnetic.html", "./pages/emc-dips.html",
  "./pages/hazard-energy.html", "./pages/hazard-fire.html", "./pages/hazard-thermal.html", "./pages/hazard-mechanical.html", "./pages/hazard-radiation.html", "./pages/hazard-chemical.html", "./pages/cases.html", "./pages/pcb-guidelines.html", "./pages/components.html", "./pages/environment-tests.html", "./pages/labels.html", "./pages/standards-updates.html", "./pages/faq.html", "./pages/roles.html", "./pages/designer-guide.html", "./pages/product-classes.html", "./pages/standard-picker.html", "./pages/poster.html", "./pages/resources.html", "./pages/changelog.html", "./pages/verification.html", "./pages/mopp-moop.html", "./pages/double-insulation.html", "./pages/leakage.html", "./pages/grounding.html", "./pages/selv.html", "./pages/insulation-coordination.html", "./pages/cybersecurity.html", "./pages/workshop.html", "./pages/product-categories.html", "./pages/test-equipment.html", "./assets/js/breadcrumb.js", "./assets/js/nav.js", "./pages/map.html", "./pages/testing.html", "./assets/js/reliability-data.js", "./pages/reliability.html", "./pages/sop-wire-flame.html", "./pages/sop-vibration-sine.html", "./pages/sop-vibration-random.html", "./pages/sop-un383.html", "./pages/sop-ul94-5v.html", "./pages/sop-thermal-shock-battery.html", "./pages/sop-thermal-runaway.html", "./pages/sop-temperature-operation.html", "./pages/sop-temp-cycling.html", "./pages/sop-stability.html", "./pages/sop-shock.html", "./pages/sop-sar.html", "./pages/sop-salt-mist.html", "./pages/sop-rti.html", "./pages/sop-residual-voltage.html", "./pages/sop-radiated-immunity.html", "./pages/sop-radiated-emission.html", "./pages/sop-protective-impedance.html", "./pages/sop-power-frequency-field.html", "./pages/sop-post-env-safety.html", "./pages/sop-photobiological.html", "./pages/sop-noise.html", "./pages/sop-mechanical-strength.html", "./pages/sop-insulation-coating.html", "./pages/sop-impact-puncture.html", "./pages/sop-hwi.html", "./pages/sop-high-temp-battery.html", "./pages/sop-harmonic-flicker.html", "./pages/sop-hai.html", "./pages/sop-gwit.html", "./pages/sop-functional-safety.html", "./pages/sop-forced-discharge.html", "./pages/sop-endurance.html", "./pages/sop-eft.html", "./pages/sop-dry-heat.html", "./pages/sop-drop.html", "./pages/sop-dips.html", "./pages/sop-damp-heat-steady.html", "./pages/sop-damp-heat-cyclic.html", "./pages/sop-cybersecurity.html", "./pages/sop-cti-test.html", "./pages/sop-crush.html", "./pages/sop-conducted-immunity.html", "./pages/sop-conducted-emission.html", "./pages/sop-cold.html", "./pages/sop-charge-discharge.html", "./pages/sop-battery-drop.html", "./assets/js/sop-render.js", "./assets/js/sop-data.js", "./pages/sop.html", "./pages/sop-ul94.html", "./pages/sop-temperature-rise.html", "./pages/sop-surge.html", "./pages/sop-spacing.html", "./pages/sop-needle-flame.html", "./pages/sop-leakage.html", "./pages/sop-ip.html", "./pages/sop-insulation-resistance.html", "./pages/sop-ik.html", "./pages/sop-hipot.html", "./pages/sop-grounding.html", "./pages/sop-glow-wire.html", "./pages/sop-esd.html", "./pages/sop-battery-short.html", "./pages/sop-ball-pressure.html", "./pages/feedback.html", "./pages/data.html", "./en/index.html", "./en/core.html", "./en/glossary.html",
  "./pages/quiz.html", "./pages/knowledge.html",
  "./pages/knowledge-detail.html", "./pages/insulation-guide.html", "./pages/standard-diffs.html",
  "./assets/css/style.css", "./assets/css/calculator.css", "./assets/css/industries.css", "./assets/css/dmcm.css", "./assets/css/search.css",
  "./assets/js/theme.js", "./assets/js/glossary-tip.js", "./assets/js/main.js", "./assets/js/calculator-v3.js", "./assets/js/hipot.js", "./assets/js/calculator-extra.js", "./assets/js/industry-data.js", "./assets/js/standards-data.js", "./assets/js/std-quick.js",
  "./assets/js/quiz-v2.js",
  "./assets/js/quiz-auto.js",
  "./assets/js/knowledge-detail-data.js",
  "./assets/js/standards-data.js",
  "./assets/js/reliability-data.js", "./assets/js/hipot-template.js", "./assets/js/dmcm.js", "./assets/js/voltage.js", "./assets/js/certification.js", "./assets/js/search.js", "./assets/js/materials.js", "./assets/js/glossary.js", "./assets/js/wizard.js", "./assets/js/progress.js", "./assets/js/knowledge-group.js",
  "./assets/js/knowledge-detail-data.js",
  "./assets/js/knowledge-index.js", "./assets/js/knowledge-notes.js", "./assets/js/compare.js", "./assets/js/ux.js", "./assets/js/knowledge-chain.js", "./assets/js/standard-status.js",
  "./assets/js/cases.js", "./assets/js/picker.js", "./assets/js/sitemap.js", "./assets/js/workshop.js", "./assets/js/data-backup.js",
  "./assets/js/tools-knowledge-links.js",
  "./assets/js/knowledge-tools-links.js",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/lib/leaflet/leaflet.js",
  "./assets/lib/leaflet/leaflet.css",
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

  // 页面导航：优先使用网络上的最新内容，网络不可用时再用缓存（保证内容更新能及时看到）
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
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
