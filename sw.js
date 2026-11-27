// Hors ligne : on garde une copie de l'application pour l'ouvrir sans réseau.
const CACHE = "gaucho-v3";
const FICHIERS = [
  "./", "index.html", "styles.css", "app.js", "data.js", "vendor/qrcode.js", "icon.svg", "manifest.webmanifest",
  "fonts/inter-latin.woff2", "fonts/space-grotesk-latin.woff2", "icons/icon-192.png", "icons/icon-512.png",
];
const DELAI_RESEAU = 2000; // au-delà, on sert la copie locale (réseau lent sur un marché, en zone rurale…)

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Réseau d'abord (chiffres à jour), copie locale si le réseau échoue ou tarde plus de 2 s.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  const reseau = fetch(e.request).then((r) => {
    if (r.ok) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); }
    return r;
  });
  const copieLocale = () => caches.match(e.request).then((r) => r || (e.request.mode === "navigate" ? caches.match("index.html") : undefined));
  const delai = new Promise((res) => setTimeout(res, DELAI_RESEAU)).then(copieLocale);
  e.respondWith(
    Promise.race([reseau.catch(copieLocale), delai.then((r) => r || reseau)])
      .then((r) => r || reseau)
      .catch(() => copieLocale().then((r) => r || Response.error()))
  );
  e.waitUntil(reseau.catch(() => {}));
});
