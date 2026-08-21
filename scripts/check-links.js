const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const EXCLUDE = new Set(["backup", ".git", "node_modules"]);
const cache = {};
function get(rel) {
  if (!(rel in cache)) {
    try { cache[rel] = fs.readFileSync(path.join(ROOT, rel), "utf8"); }
    catch (e) { cache[rel] = null; }
  }
  return cache[rel];
}
function exists(rel) { return get(rel) !== null; }
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function hasAnchor(rel, frag) {
  const c = get(rel);
  if (c === null || !frag) return false;
  return new RegExp('(?:id|name)=["\']' + escRe(frag) + '["\']').test(c);
}
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!EXCLUDE.has(e.name)) walk(full, out); }
    else if (e.name.endsWith(".html")) out.push(path.relative(ROOT, full).replace(/\\/g, "/"));
  }
  return out;
}
const htmlFiles = walk(ROOT, []);
const htmlSet = new Set(htmlFiles);
function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
}
function parseHrefs(text) {
  const out = [];
  const re = /(?:href|src)=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) out.push(m[1]);
  return out;
}
function splitHref(href) {
  const q = href.indexOf("?");
  const h = href.indexOf("#");
  const cut = (q >= 0 && (h < 0 || q < h)) ? q : (h >= 0 ? h : href.length);
  return { p: href.slice(0, cut), frag: h >= 0 ? href.slice(h + 1) : "" };
}
function resolveHref(relFile, href) {
  const { p, frag } = splitHref(href);
  if (!p) return { file: relFile, frag };
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(relFile), p));
  return { file: target, frag };
}
function isSpecial(href) {
  return /^(https?:|mailto:|tel:|javascript:|data:|ftp:|file:|#|\?|\/\/)/i.test(href) || href === "";
}
function dynamicIds(jsFile) {
  const text = get("assets/js/" + jsFile) || "";
  return new Set([...text.matchAll(/\bid:\s*"([^"]+)"/g)].map(m => m[1]));
}
const INDUSTRY_IDS = dynamicIds("industry-data.js");
const CERT_IDS = dynamicIds("certification.js");
function anchorOk(rel, frag) {
  if (hasAnchor(rel, frag)) return true;
  if (rel === "pages/industries.html" && INDUSTRY_IDS.has(frag)) return true;
  if (rel === "pages/certification.html" && CERT_IDS.has(frag)) return true;
  return false;
}

const broken = [], anchorMiss = [], edges = new Set();
for (const f of htmlFiles) {
  const html = stripScripts(get(f) || "");
  for (const href of parseHrefs(html)) {
    if (isSpecial(href)) continue;
    const r = resolveHref(f, href);
    if (r.file !== f) edges.add(f + " -> " + r.file);
    if (!exists(r.file)) { broken.push({ from: f, href }); continue; }
    if (r.frag && !anchorOk(r.file, r.frag)) anchorMiss.push({ from: f, href, to: r.file, frag: r.frag });
  }
}

const jsFiles = fs.readdirSync(path.join(ROOT, "assets/js")).filter(n => n.endsWith(".js") && !/three|topojson/.test(n));
const jsBroken = [], jsAnchorMiss = [];
for (const jf of jsFiles) {
  const text = get("assets/js/" + jf) || "";
  const re = /"((?:\.\.?\/)?[^"]*\.html(?:#[^"']*)?)"/g;
  let m;
  while ((m = re.exec(text))) {
    let href = m[1].replace(/\\+$/, "");
    if (/[<>]/.test(href) || /\\s\\+\\s/.test(href) || href.indexOf("+") !== -1) continue;
    if (/^(https?:|mailto:|tel:|javascript:|data:|ftp:|file:|\/\/)/i.test(href)) continue;
    const { p, frag } = splitHref(href);
    if (!p) continue;
    let found = null;
    for (const base of ["pages", "."]) {
      const target = path.posix.normalize(path.posix.join(base, p));
      if (exists(target)) { found = target; break; }
    }
    if (!found) { jsBroken.push({ js: jf, href }); continue; }
    if (frag && !anchorOk(found, frag)) jsAnchorMiss.push({ js: jf, href, to: found, frag });
  }
}

const sopData = get("assets/js/sop-data.js") || "";
for (const id of [...sopData.matchAll(/"id":\s*"([^"]+)"/g)].map(x => x[1])) {
  const target = "pages/sop-" + id + ".html";
  if (htmlSet.has(target)) edges.add("pages/sop.html -> " + target);
  else jsBroken.push({ js: "sop-data.js", href: "./sop-" + id + ".html (data id)" });
}
const relData = get("assets/js/reliability-data.js") || "";
for (const id of [...relData.matchAll(/sopId:\s*"([^"]+)"/g)].map(x => x[1])) {
  const target = "pages/sop-" + id + ".html";
  if (htmlSet.has(target)) edges.add("pages/reliability.html -> " + target);
  else jsBroken.push({ js: "reliability-data.js", href: "./sop-" + id + ".html (sopId)" });
}

const graph = new Map();
for (const f of htmlFiles) graph.set(f, new Set());
for (const e of edges) {
  const [a, b] = e.split(" -> ");
  if (graph.has(a) && graph.has(b)) graph.get(a).add(b);
}
const seen = new Set(["index.html"]);
const queue = ["index.html"];
while (queue.length) {
  const cur = queue.shift();
  for (const nxt of graph.get(cur) || []) {
    if (!seen.has(nxt)) { seen.add(nxt); queue.push(nxt); }
  }
}
const orphans = htmlFiles.filter(f => f !== "index.html" && !seen.has(f));
// 瞬态跳转页（meta refresh / location.replace）加载即跳走，无需导航
const noNav = htmlFiles.filter(f => {
  const c = get(f) || "";
  if (/http-equiv=["']refresh/i.test(c) || /location\.replace/i.test(c)) return false;
  return !/(class="nav"|class="bottom-nav")/.test(c);
});

const ok = broken.length === 0 && anchorMiss.length === 0 && jsBroken.length === 0 && jsAnchorMiss.length === 0 && orphans.length === 0 && noNav.length === 0;
console.log("check-links: " + (ok ? "PASS" : "FAIL"));
console.log("HTML_FILES=" + htmlFiles.length + " REACHABLE=" + seen.size + " ORPHANS=" + orphans.length);
console.log("STATIC_BROKEN=" + broken.length + " STATIC_ANCHOR_MISS=" + anchorMiss.length);
console.log("JS_BROKEN=" + jsBroken.length + " JS_ANCHOR_MISS=" + jsAnchorMiss.length + " NO_NAV=" + noNav.length);
for (const x of broken) console.log("  broken: " + x.from + " -> " + x.href);
for (const x of anchorMiss) console.log("  anchor: " + x.from + " -> " + x.href);
for (const x of jsBroken) console.log("  js-broken: " + x.js + " -> " + x.href);
for (const x of jsAnchorMiss) console.log("  js-anchor: " + x.js + " -> " + x.href);
for (const f of orphans) console.log("  orphan: " + f);
for (const f of noNav) console.log("  no-nav: " + f);
process.exit(ok ? 0 : 1);
