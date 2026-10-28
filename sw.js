
const VERSION = "70cd984fa313";
const PORTEE = new URL(self.registration.scope).pathname;
const PREFIXE = `alice:${PORTEE}:`;
const CACHE_APPLI = `${PREFIXE}appli:${VERSION}`;
const CACHE_PLAGES = `${PREFIXE}plages`;
const CACHE_FONDS = `${PREFIXE}fonds`;
const MAX_ENTREES_PLAGES = 6000;
const MAX_ENTREES_FONDS = 4000;

const HOTES_FONDS = [/^tiles\.openfreemap\.org$/, /^data\.geopf\.fr$/, /^services\.arcgisonline\.com$/, /^tile\.openstreetmap\.org$/, /(^|\.)openrailwaymap\.app$/];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (evenement) => {
  evenement.waitUntil((async () => {
    for (const nom of await caches.keys()) {
      if (nom.startsWith(`${PREFIXE}appli:`) && nom !== CACHE_APPLI) {
        await caches.delete(nom);
      }
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (evenement) => {
  const requete = evenement.request;
  if (requete.method !== "GET") return;
  const url = new URL(requete.url);

  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(PORTEE)) return;
    if (requete.headers.has("range")) {
      evenement.respondWith(servirPlage(evenement, requete));
    } else if (url.pathname.startsWith(`${PORTEE}assets/`)) {
      evenement.respondWith(copieLocaleDAbord(evenement, requete, CACHE_APPLI));
    } else {
      evenement.respondWith(reseauDAbord(evenement, requete, CACHE_APPLI, { pageSansParametres: requete.mode === "navigate" }));
    }
    return;
  }

  if (HOTES_FONDS.some((motif) => motif.test(url.hostname))) {
    evenement.respondWith(reseauDAbord(evenement, requete, CACHE_FONDS, { maxEntrees: MAX_ENTREES_FONDS }));
  }
});

async function reseauDAbord(evenement, requete, nomCache, options = {}) {
  try {
    const reponse = await fetch(requete);
    if (reponse.ok && reponse.status === 200) {
      evenement.waitUntil(garder(nomCache, cleSansParametres(requete, options), reponse.clone(), options.maxEntrees));
    }
    return reponse;
  } catch (erreur) {
    const copie = await caches.match(cleSansParametres(requete, options), { cacheName: nomCache });
    if (copie) return copie;
    throw erreur;
  }
}

function cleSansParametres(requete, options) {
  if (!options.pageSansParametres) return requete;
  const url = new URL(requete.url);
  url.search = "";
  return url.href;
}

async function copieLocaleDAbord(evenement, requete, nomCache) {
  const copie = await caches.match(requete, { cacheName: nomCache });
  if (copie) return copie;
  const reponse = await fetch(requete);
  if (reponse.ok && reponse.status === 200) {
    evenement.waitUntil(garder(nomCache, requete, reponse.clone()));
  }
  return reponse;
}

let ecrituresDepuisNettoyage = 0;

async function garder(nomCache, cle, reponse, maxEntrees = 0) {
  const cache = await caches.open(nomCache);
  await cache.put(cle, reponse);
  if (maxEntrees && ++ecrituresDepuisNettoyage >= 100) {
    ecrituresDepuisNettoyage = 0;
    const cles = await cache.keys();
    for (const ancienne of cles.slice(0, Math.max(0, cles.length - maxEntrees))) {
      await cache.delete(ancienne);
    }
  }
}

async function servirPlage(evenement, requete) {
  const plage = requete.headers.get("range");
  try {
    const reponse = await fetch(requete);
    if (reponse.status === 206) {
      evenement.waitUntil(garderPlage(requete.url, plage, reponse.clone()));
    }
    return reponse;
  } catch (erreur) {
    const copie = await lirePlage(requete.url, plage);
    if (copie) return copie;
    throw erreur;
  }
}

const cleVersionArchive = (url) => `${url}?alice-version`;
const clePlage = (url, version, plage) => `${url}?alice-version=${encodeURIComponent(version)}&alice-plage=${encodeURIComponent(plage)}`;

async function garderPlage(url, plage, reponse) {
  const version = reponse.headers.get("etag") || reponse.headers.get("last-modified") || "";
  const cache = await caches.open(CACHE_PLAGES);
  const precedente = await (await cache.match(cleVersionArchive(url)))?.text();
  if (precedente !== version) {
    for (const cle of await cache.keys()) {
      if (cle.url.startsWith(`${url}?alice-version=`)) await cache.delete(cle);
    }
    await cache.put(cleVersionArchive(url), new Response(version));
  }
  const entetes = {
    "content-type": reponse.headers.get("content-type") || "application/octet-stream",
    "x-alice-content-range": reponse.headers.get("content-range") || "",
    "x-alice-etag": reponse.headers.get("etag") || ""
  };
  await garder(CACHE_PLAGES, clePlage(url, version, plage), new Response(await reponse.arrayBuffer(), { headers: entetes }), MAX_ENTREES_PLAGES);
}

async function lirePlage(url, plage) {
  const cache = await caches.open(CACHE_PLAGES);
  const version = await (await cache.match(cleVersionArchive(url)))?.text();
  if (version === undefined) return null;
  const copie = await cache.match(clePlage(url, version, plage));
  if (!copie) return null;
  const entetes = new Headers({ "content-type": copie.headers.get("content-type") || "application/octet-stream" });
  if (copie.headers.get("x-alice-content-range")) entetes.set("content-range", copie.headers.get("x-alice-content-range"));
  if (copie.headers.get("x-alice-etag")) entetes.set("etag", copie.headers.get("x-alice-etag"));
  return new Response(await copie.arrayBuffer(), { status: 206, headers: entetes });
}
