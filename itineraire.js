(function () {
  const URL_ROUTAGE_OSRM = "https://router.project-osrm.org/route/v1/driving";
  const SOURCE_MINI_CARTE_TRAJET = "mini-carte-trajet-source";
  const COUCHE_MINI_CARTE_TRAJET = "mini-carte-trajet";
  const COUCHE_MINI_CARTE_DEPART = "mini-carte-depart";
  const COUCHE_MINI_CARTE_ARRIVEE = "mini-carte-arrivee";

  function creerStyleMiniCarteOsm() {
    return {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors"
        }
      },
      layers: [{ id: "osm", type: "raster", source: "osm" }]
    };
  }

  function formaterDistanceResume(distanceMetres) {
    const valeur = distanceMetres / 1000;
    return `${valeur.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} km`;
  }

  function formaterDureeResume(dureeSecondes) {
    const totalMinutes = Math.max(1, Math.round(dureeSecondes / 60));
    const heures = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!heures) {
      return `${minutes} min`;
    }
    if (!minutes) {
      return `${heures} h`;
    }
    return `${heures} h ${minutes} min`;
  }

  window.creerModuleItineraireAlice = function creerModuleItineraireAlice(config) {
    const {
      maplibre,
      centreInitial,
      chargerDonneesAcces,
      getDonneesAcces,
      normaliserTexteRecherche,
      champCompletOuVide,
      extraireListeDepuisFeature,
      echapperHtml,
      obtenirDistanceMetres,
      fermerMenusGlobalement
    } = config;

    const modal = document.getElementById("modal-itineraire");
    const boutonFermer = document.getElementById("modal-itineraire-fermer");
    const champDepart = document.getElementById("itineraire-depart");
    const champArrivee = document.getElementById("itineraire-arrivee");
    const listeDepart = document.getElementById("itineraire-depart-resultats");
    const listeArrivee = document.getElementById("itineraire-arrivee-resultats");
    const zoneEtat = document.getElementById("itineraire-etat");
    const zoneResume = document.getElementById("itineraire-resume");
    const valeurDistance = document.getElementById("itineraire-distance");
    const valeurDuree = document.getElementById("itineraire-duree");
    const boutonGoogle = document.getElementById("itineraire-google");
    const boutonApple = document.getElementById("itineraire-apple");
    const boutonWaze = document.getElementById("itineraire-waze");
    const boutonToggleCarte = document.getElementById("itineraire-toggle-carte");
    const panneauCarte = document.getElementById("itineraire-apercu");
    const conteneurCarte = document.getElementById("itineraire-carte");

    let options = [];
    let selectionDepart = null;
    let selectionArrivee = null;
    let compteurRequete = 0;
    let detailsTrajetCourant = null;
    let miniCarte = null;
    let miniCarteChargee = false;
    let miniCartePending = null;

    function estOuverte() {
      return Boolean(modal?.classList.contains("est-visible"));
    }

    function definirEtat(texte, estErreur = false) {
      if (!zoneEtat) {
        return;
      }
      zoneEtat.textContent = texte;
      zoneEtat.style.color = estErreur ? "#b91c1c" : "#475569";
    }

    function marquerActionInactive(element, inactive) {
      if (!element) {
        return;
      }
      if (inactive) {
        element.classList.add("est-inactif");
        element.setAttribute("aria-disabled", "true");
        element.setAttribute("tabindex", "-1");
        if (element.tagName === "A") {
          element.setAttribute("href", "#");
        }
        return;
      }
      element.classList.remove("est-inactif");
      element.removeAttribute("aria-disabled");
      element.removeAttribute("tabindex");
    }

    function viderSuggestions() {
      listeDepart?.classList.remove("est-visible");
      listeArrivee?.classList.remove("est-visible");
    }

    function reinitialiserResume() {
      detailsTrajetCourant = null;
      zoneResume?.classList.remove("est-visible");
      if (valeurDistance) valeurDistance.textContent = "-";
      if (valeurDuree) valeurDuree.textContent = "-";
      marquerActionInactive(boutonGoogle, true);
      marquerActionInactive(boutonApple, true);
      marquerActionInactive(boutonWaze, true);

      if (miniCarteChargee) {
        const source = miniCarte?.getSource(SOURCE_MINI_CARTE_TRAJET);
        source?.setData({ type: "FeatureCollection", features: [] });
      }
    }

    function construireOptions() {
      const resultat = [];
      const cles = new Set();

      const construireLabelAcces = (acces) => {
        const nom = champCompletOuVide(acces?.nom);
        const type = champCompletOuVide(acces?.type);
        const sat = champCompletOuVide(acces?.SAT);
        const libelleAcces = champCompletOuVide(acces?.acces);
        return [nom, type, sat, libelleAcces].filter(Boolean).join(" ");
      };

      const ajouter = (type, label, longitude, latitude, entree) => {
        if (!label || !Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          return;
        }
        const cle = `${type}|${normaliserTexteRecherche(label)}|${longitude.toFixed(6)}|${latitude.toFixed(6)}`;
        if (cles.has(cle)) {
          return;
        }
        cles.add(cle);
        const texteRecherche = [
          label,
          entree?.nom,
          entree?.type,
          entree?.SAT,
          entree?.acces
        ]
          .map((valeur) => champCompletOuVide(valeur))
          .filter(Boolean)
          .join(" ");

        resultat.push({
          id: `${type}-${resultat.length + 1}`,
          type,
          label,
          longitude,
          latitude,
          texteRecherche: normaliserTexteRecherche(texteRecherche)
        });
      };

      for (const feature of getDonneesAcces()?.features || []) {
        const [longitude, latitude] = feature?.geometry?.coordinates || [];
        const liste = extraireListeDepuisFeature(feature, "acces_liste_json");
        for (const acces of liste) {
          ajouter("acces", construireLabelAcces(acces) || "Accès", longitude, latitude, acces);
        }
      }

      resultat.sort((a, b) => a.label.localeCompare(b.label, "fr", { sensitivity: "base" }));
      options = resultat;
    }

    function suggestions(texte) {
      const terme = normaliserTexteRecherche(texte);
      if (!terme || terme.length < 2) {
        return [];
      }
      const trouves = [];
      for (const option of options) {
        if (!option.texteRecherche.includes(terme)) {
          continue;
        }
        trouves.push({ ...option, priorite: option.texteRecherche.startsWith(terme) ? 0 : 1 });
      }
      trouves.sort((a, b) => (a.priorite !== b.priorite ? a.priorite - b.priorite : a.label.localeCompare(b.label, "fr")));
      return trouves.slice(0, 16);
    }

    function rendreSuggestions(listeElement, items) {
      if (!listeElement) {
        return;
      }
      if (!items.length) {
        listeElement.innerHTML = '<li class="modal-itineraire-resultat-vide">Aucun résultat</li>';
        listeElement.classList.add("est-visible");
        return;
      }
      listeElement.innerHTML = items
        .map(
          (option) =>
            `<li><button class="modal-itineraire-resultat" type="button" data-id="${echapperHtml(option.id)}">${echapperHtml(option.label)}</button></li>`
        )
        .join("");
      listeElement.classList.add("est-visible");
    }

    function construireLiensExternes(depart, arrivee) {
      const origine = `${depart.latitude},${depart.longitude}`;
      const destination = `${arrivee.latitude},${arrivee.longitude}`;
      return {
        google: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origine)}&destination=${encodeURIComponent(destination)}&travelmode=driving`,
        apple: `https://maps.apple.com/?saddr=${encodeURIComponent(origine)}&daddr=${encodeURIComponent(destination)}&dirflg=d`,
        waze: `https://waze.com/ul?ll=${encodeURIComponent(destination)}&navigate=yes`
      };
    }

    function afficherResume(depart, arrivee, details) {
      if (!details) {
        return;
      }
      zoneResume?.classList.add("est-visible");
      if (valeurDistance) valeurDistance.textContent = formaterDistanceResume(details.distanceMetres);
      if (valeurDuree) valeurDuree.textContent = formaterDureeResume(details.dureeSecondes);

      const liens = construireLiensExternes(depart, arrivee);
      if (boutonGoogle) boutonGoogle.href = liens.google;
      if (boutonApple) boutonApple.href = liens.apple;
      if (boutonWaze) boutonWaze.href = liens.waze;
      marquerActionInactive(boutonGoogle, false);
      marquerActionInactive(boutonApple, false);
      marquerActionInactive(boutonWaze, false);
    }

    async function recupererTrajetRoutier(depart, arrivee) {
      const url = `${URL_ROUTAGE_OSRM}/${depart.longitude},${depart.latitude};${arrivee.longitude},${arrivee.latitude}?overview=full&geometries=geojson&alternatives=false&steps=false`;
      const controleur = new AbortController();
      const temporisation = setTimeout(() => controleur.abort(), 9000);

      try {
        const reponse = await fetch(url, { signal: controleur.signal });
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }
        const corps = await reponse.json();
        const route = Array.isArray(corps?.routes) ? corps.routes[0] : null;
        if (!route?.geometry?.coordinates?.length) {
          throw new Error("Trajet indisponible");
        }
        return {
          distanceMetres: Number(route.distance) || 0,
          dureeSecondes: Number(route.duration) || 0,
          geometry: route.geometry.coordinates,
          approximation: false
        };
      } finally {
        clearTimeout(temporisation);
      }
    }

    function calculerTrajetApproxime(depart, arrivee) {
      const distanceLigneDroite = obtenirDistanceMetres([depart.longitude, depart.latitude], [arrivee.longitude, arrivee.latitude]);
      const distanceMetres = distanceLigneDroite * 1.25;
      const dureeSecondes = (distanceMetres / 1000 / 65) * 3600;
      return {
        distanceMetres,
        dureeSecondes,
        geometry: [
          [depart.longitude, depart.latitude],
          [arrivee.longitude, arrivee.latitude]
        ],
        approximation: true
      };
    }

    function assurerSourceMiniCarte() {
      if (!miniCarte || !miniCarteChargee) {
        return;
      }
      if (!miniCarte.getSource(SOURCE_MINI_CARTE_TRAJET)) {
        miniCarte.addSource(SOURCE_MINI_CARTE_TRAJET, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_TRAJET)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_TRAJET,
          type: "line",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "trajet"],
          paint: { "line-color": "#2563eb", "line-width": 4.2, "line-opacity": 0.88 }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_DEPART)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_DEPART,
          type: "circle",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "depart"],
          paint: { "circle-radius": 7, "circle-color": "#16a34a", "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_ARRIVEE)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_ARRIVEE,
          type: "circle",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "arrivee"],
          paint: { "circle-radius": 7, "circle-color": "#dc2626", "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" }
        });
      }
    }

    function mettreAJourMiniCarte(depart, arrivee, details) {
      if (!depart || !arrivee || !details?.geometry?.length) {
        return;
      }
      if (!miniCarte || !miniCarteChargee) {
        miniCartePending = { depart, arrivee, details };
        return;
      }

      assurerSourceMiniCarte();
      const source = miniCarte.getSource(SOURCE_MINI_CARTE_TRAJET);
      if (!source) {
        return;
      }

      source.setData({
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "LineString", coordinates: details.geometry }, properties: { kind: "trajet" } },
          { type: "Feature", geometry: { type: "Point", coordinates: [depart.longitude, depart.latitude] }, properties: { kind: "depart" } },
          { type: "Feature", geometry: { type: "Point", coordinates: [arrivee.longitude, arrivee.latitude] }, properties: { kind: "arrivee" } }
        ]
      });

      let minLng = Infinity;
      let minLat = Infinity;
      let maxLng = -Infinity;
      let maxLat = -Infinity;
      for (const [longitude, latitude] of details.geometry) {
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }
        minLng = Math.min(minLng, longitude);
        minLat = Math.min(minLat, latitude);
        maxLng = Math.max(maxLng, longitude);
        maxLat = Math.max(maxLat, latitude);
      }

      if (Number.isFinite(minLng) && Number.isFinite(minLat) && Number.isFinite(maxLng) && Number.isFinite(maxLat)) {
        miniCarte.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 34, duration: 0, maxZoom: 13.8 });
      }
    }

    function assurerMiniCarte() {
      if (miniCarte || !conteneurCarte) {
        return;
      }
      miniCarte = new maplibre.Map({
        container: "itineraire-carte",
        style: creerStyleMiniCarteOsm(),
        center: centreInitial,
        zoom: 5.2,
        maxZoom: 18
      });
      miniCarte.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-left");
      miniCarte.on("load", () => {
        miniCarteChargee = true;
        assurerSourceMiniCarte();
        if (miniCartePending) {
          const { depart, arrivee, details } = miniCartePending;
          miniCartePending = null;
          mettreAJourMiniCarte(depart, arrivee, details);
        }
      });
    }

    async function mettreAJourResume() {
      if (!selectionDepart || !selectionArrivee) {
        reinitialiserResume();
        definirEtat("Choisissez un départ et une arrivée.");
        return;
      }

      const memePoint =
        Math.abs(selectionDepart.longitude - selectionArrivee.longitude) < 1e-9 &&
        Math.abs(selectionDepart.latitude - selectionArrivee.latitude) < 1e-9;
      if (memePoint) {
        reinitialiserResume();
        definirEtat("Départ et arrivée identiques.", true);
        return;
      }

      const idRequete = ++compteurRequete;
      definirEtat("Calcul du trajet en cours...");
      reinitialiserResume();

      let details;
      try {
        details = await recupererTrajetRoutier(selectionDepart, selectionArrivee);
      } catch {
        details = calculerTrajetApproxime(selectionDepart, selectionArrivee);
      }

      if (idRequete !== compteurRequete) {
        return;
      }

      detailsTrajetCourant = details;
      afficherResume(selectionDepart, selectionArrivee, details);
      definirEtat(details.approximation ? "Estimation approximative (itinéraire exact indisponible)." : "Trajet calculé.");
      mettreAJourMiniCarte(selectionDepart, selectionArrivee, details);
    }

    function choisirOption(cible, id) {
      const option = options.find((entree) => entree.id === id);
      if (!option) {
        return;
      }
      if (cible === "depart") {
        selectionDepart = option;
        if (champDepart) champDepart.value = option.label;
      } else {
        selectionArrivee = option;
        if (champArrivee) champArrivee.value = option.label;
      }
      viderSuggestions();
      mettreAJourResume();
    }

    function fermer() {
      if (!modal) {
        return;
      }
      modal.classList.remove("est-visible");
      modal.setAttribute("aria-hidden", "true");
      selectionDepart = null;
      selectionArrivee = null;
      compteurRequete += 1;
      if (champDepart) champDepart.value = "";
      if (champArrivee) champArrivee.value = "";
      reinitialiserResume();
      definirEtat("Choisissez un départ et une arrivée.");
      if (panneauCarte?.classList.contains("est-visible")) {
        panneauCarte.classList.remove("est-visible");
        panneauCarte.setAttribute("aria-hidden", "true");
      }
      if (boutonToggleCarte) {
        boutonToggleCarte.setAttribute("aria-expanded", "false");
        boutonToggleCarte.textContent = "Afficher la carte";
      }
      viderSuggestions();
    }

    function ouvrir() {
      if (!modal) {
        return;
      }
      modal.classList.add("est-visible");
      modal.setAttribute("aria-hidden", "false");
      fermerMenusGlobalement?.();
      if (!zoneResume?.classList.contains("est-visible")) {
        definirEtat("Choisissez un départ et une arrivée.");
      }
      setTimeout(() => champDepart?.focus(), 0);
    }

    async function initialiserOptions() {
      await chargerDonneesAcces();
      construireOptions();
    }

    function brancherChamp(champ, liste, cible) {
      if (!champ || !liste) {
        return;
      }
      champ.addEventListener("input", () => {
        const valeur = champ.value.trim();
        const selection = cible === "depart" ? selectionDepart : selectionArrivee;
        if (!selection || selection.label !== valeur) {
          if (cible === "depart") {
            selectionDepart = null;
          } else {
            selectionArrivee = null;
          }
          mettreAJourResume();
        }
        if (valeur.length < 2) {
          viderSuggestions();
          return;
        }
        rendreSuggestions(liste, suggestions(valeur));
      });
      champ.addEventListener("focus", () => {
        const valeur = champ.value.trim();
        if (valeur.length < 2) {
          viderSuggestions();
          return;
        }
        rendreSuggestions(liste, suggestions(valeur));
      });
      champ.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
          return;
        }
        const premier = liste.querySelector(".modal-itineraire-resultat");
        if (!premier) {
          return;
        }
        event.preventDefault();
        premier.click();
      });
    }

    boutonFermer?.addEventListener("click", fermer);

    listeDepart?.addEventListener("click", (event) => {
      const bouton = event.target.closest(".modal-itineraire-resultat");
      if (bouton) {
        choisirOption("depart", bouton.dataset.id || "");
      }
    });
    listeArrivee?.addEventListener("click", (event) => {
      const bouton = event.target.closest(".modal-itineraire-resultat");
      if (bouton) {
        choisirOption("arrivee", bouton.dataset.id || "");
      }
    });

    boutonGoogle?.addEventListener("click", (event) => {
      if (boutonGoogle.classList.contains("est-inactif")) {
        event.preventDefault();
      }
    });
    boutonApple?.addEventListener("click", (event) => {
      if (boutonApple.classList.contains("est-inactif")) {
        event.preventDefault();
      }
    });
    boutonWaze?.addEventListener("click", (event) => {
      if (boutonWaze.classList.contains("est-inactif")) {
        event.preventDefault();
      }
    });

    boutonToggleCarte?.addEventListener("click", () => {
      const visible = panneauCarte?.classList.toggle("est-visible");
      panneauCarte?.setAttribute("aria-hidden", visible ? "false" : "true");
      boutonToggleCarte.setAttribute("aria-expanded", visible ? "true" : "false");
      boutonToggleCarte.textContent = visible ? "Masquer la carte" : "Afficher la carte";
      if (visible) {
        assurerMiniCarte();
        setTimeout(() => {
          miniCarte?.resize();
          if (selectionDepart && selectionArrivee && detailsTrajetCourant) {
            mettreAJourMiniCarte(selectionDepart, selectionArrivee, detailsTrajetCourant);
          }
        }, 0);
      }
    });

    brancherChamp(champDepart, listeDepart, "depart");
    brancherChamp(champArrivee, listeArrivee, "arrivee");

    document.addEventListener("click", (event) => {
      if (!estOuverte()) {
        return;
      }
      const clicDansModal = event.target instanceof Element && Boolean(event.target.closest(".modal-itineraire-carte"));
      if (!clicDansModal) {
        fermer();
        return;
      }
      const clicDansListeDepart = listeDepart?.contains(event.target);
      const clicDansListeArrivee = listeArrivee?.contains(event.target);
      const clicDansChampDepart = champDepart?.contains(event.target);
      const clicDansChampArrivee = champArrivee?.contains(event.target);
      if (!clicDansListeDepart && !clicDansListeArrivee && !clicDansChampDepart && !clicDansChampArrivee) {
        viderSuggestions();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && estOuverte()) {
        fermer();
      }
    });

    reinitialiserResume();
    definirEtat("Choisissez un départ et une arrivée.");

    let initialisationPromise = null;
    return {
      async ouvrir() {
        if (!initialisationPromise) {
          initialisationPromise = initialiserOptions().catch((erreur) => {
            initialisationPromise = null;
            throw erreur;
          });
        }
        try {
          await initialisationPromise;
        } catch (erreur) {
          console.error("Impossible de charger les données pour l'itinéraire", erreur);
          alert("Impossible de préparer le calcul d'itinéraire.");
          return;
        }
        ouvrir();
      }
    };
  };
})();
