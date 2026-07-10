(function () {
  const URL_ROUTAGE_OSRM = "https://router.project-osrm.org/route/v1/driving";
  const SOURCE_MINI_CARTE_TRAJET = "mini-carte-trajet-source";
  const COUCHE_MINI_CARTE_TRAJET = "mini-carte-trajet";
  const COUCHE_MINI_CARTE_DEPART = "mini-carte-depart";
  const COUCHE_MINI_CARTE_ETAPE = "mini-carte-etape";
  const COUCHE_MINI_CARTE_ETAPE_LABEL = "mini-carte-etape-label";
  const COUCHE_MINI_CARTE_ARRIVEE = "mini-carte-arrivee";
  const NOMBRE_MIN_ETAPES = 2;
  const NOMBRE_MAX_ETAPES = 8;

  function creerStyleMiniCarteOsm() {
    return {
      version: 8,
      glyphs: "https://basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf",
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
    if (!heures) return `${minutes} min`;
    if (!minutes) return `${heures} h`;
    return `${heures} h ${minutes} min`;
  }

  function creerIdentifiantEtape() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `etape-${Date.now()}-${Math.round(Math.random() * 100000)}`;
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
    const zoneEtapes = document.getElementById("itineraire-etapes");
    const boutonAjouterEtape = document.getElementById("itineraire-ajouter-etape");
    const boutonOptimiserEtapes = document.getElementById("itineraire-optimiser-etapes");
    const zoneEtat = document.getElementById("itineraire-etat");
    const zoneResume = document.getElementById("itineraire-resume");
    const valeurDistance = document.getElementById("itineraire-distance");
    const valeurDuree = document.getElementById("itineraire-duree");
    const zoneActions = modal?.querySelector(".modal-itineraire-actions");
    const boutonGoogle = document.getElementById("itineraire-google");
    const boutonApple = document.getElementById("itineraire-apple");
    const boutonWaze = document.getElementById("itineraire-waze");
    const boutonToggleCarte = document.getElementById("itineraire-toggle-carte");
    const panneauCarte = document.getElementById("itineraire-apercu");
    const conteneurCarte = document.getElementById("itineraire-carte");

    let options = [];
    let etapes = creerEtapesInitiales();
    let compteurRequete = 0;
    let detailsTrajetCourant = null;
    let miniCarte = null;
    let miniCarteChargee = false;
    let miniCartePending = null;
    let interactionDemarreeDansModal = false;
    let idEtapeGlissee = null;
    let idEtapePointeur = null;
    let idEtapeSurvoleePointeur = null;
    let pointeurReorganisationId = null;

    function creerEtapesInitiales() {
      return [
        { id: creerIdentifiantEtape(), selection: null, recherche: "" },
        { id: creerIdentifiantEtape(), selection: null, recherche: "" }
      ];
    }

    function estOuverte() {
      return Boolean(modal?.classList.contains("est-visible"));
    }

    function libelleEtape(index) {
      if (index === 0) return "Départ";
      if (index === etapes.length - 1) return "Arrivée";
      return `Étape ${index}`;
    }

    function libellePastille(index) {
      if (index === 0) return "○";
      if (index === etapes.length - 1) return "⌖";
      return String(index);
    }

    function definirEtat(texte, estErreur = false) {
      if (!zoneEtat) return;
      zoneEtat.textContent = texte;
      zoneEtat.style.color = estErreur ? "#b91c1c" : "#475569";
    }

    function marquerActionInactive(element, inactive) {
      if (!element) return;
      if (inactive) {
        element.classList.add("est-inactif");
        element.setAttribute("aria-disabled", "true");
        element.setAttribute("tabindex", "-1");
        if (element.tagName === "A") element.setAttribute("href", "#");
        return;
      }
      element.classList.remove("est-inactif");
      element.removeAttribute("aria-disabled");
      element.removeAttribute("tabindex");
    }

    function etapesSelectionnees() {
      return etapes.map((etape) => etape.selection).filter(Boolean);
    }

    function trajetPret() {
      return etapes.length >= NOMBRE_MIN_ETAPES && etapes.every((etape) => etape.selection);
    }

    function mettreAJourVisibiliteActions() {
      const pret = trajetPret();
      if (zoneActions) {
        if (pret) {
          zoneActions.removeAttribute("hidden");
          zoneActions.style.display = "";
        } else {
          zoneActions.setAttribute("hidden", "hidden");
          zoneActions.style.display = "none";
        }
      }
      if (boutonToggleCarte) {
        if (pret) {
          boutonToggleCarte.removeAttribute("hidden");
          boutonToggleCarte.style.display = "";
        } else {
          boutonToggleCarte.setAttribute("hidden", "hidden");
          boutonToggleCarte.style.display = "none";
        }
      }
      if (!pret && panneauCarte?.classList.contains("est-visible")) {
        panneauCarte.classList.remove("est-visible");
        panneauCarte.setAttribute("aria-hidden", "true");
      }
      if (!pret && boutonToggleCarte) {
        boutonToggleCarte.setAttribute("aria-expanded", "false");
        boutonToggleCarte.textContent = "Afficher la carte";
      }
    }

    function viderSuggestions() {
      zoneEtapes?.querySelectorAll(".modal-itineraire-resultats.est-visible").forEach((liste) => {
        liste.classList.remove("est-visible");
      });
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
      mettreAJourVisibiliteActions();
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
        if (!label || !Number.isFinite(longitude) || !Number.isFinite(latitude)) return;
        const cle = `${type}|${normaliserTexteRecherche(label)}|${longitude.toFixed(6)}|${latitude.toFixed(6)}`;
        if (cles.has(cle)) return;
        cles.add(cle);
        const texteRecherche = [label, entree?.nom, entree?.type, entree?.SAT, entree?.acces]
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
      if (!terme || terme.length < 2) return [];
      const trouves = [];
      for (const option of options) {
        if (!option.texteRecherche.includes(terme)) continue;
        trouves.push({ ...option, priorite: option.texteRecherche.startsWith(terme) ? 0 : 1 });
      }
      trouves.sort((a, b) => (a.priorite !== b.priorite ? a.priorite - b.priorite : a.label.localeCompare(b.label, "fr")));
      return trouves.slice(0, 16);
    }

    function rendreSuggestions(listeElement, items) {
      if (!listeElement) return;
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

    function rendreEtapes(idFocus = null) {
      if (!zoneEtapes) return;
      zoneEtapes.innerHTML = etapes
        .map((etape, index) => {
          const valeur = etape.selection?.label || etape.recherche || "";
          const suppressionPossible = etapes.length > NOMBRE_MIN_ETAPES;
          const classeRole = index === 0 ? "est-depart" : index === etapes.length - 1 ? "est-arrivee" : "est-intermediaire";
          return `<div class="modal-itineraire-etape ${classeRole}" data-etape-id="${echapperHtml(etape.id)}">
            <button class="modal-itineraire-poignee" type="button" aria-label="Faire glisser pour réorganiser" title="Faire glisser pour réorganiser" draggable="true">⋮⋮</button>
            <div class="modal-itineraire-rail" aria-hidden="true"><span>${echapperHtml(libellePastille(index))}</span></div>
            <div class="modal-itineraire-champ">
              <label for="itineraire-etape-${echapperHtml(etape.id)}">${echapperHtml(libelleEtape(index))}</label>
              <input id="itineraire-etape-${echapperHtml(etape.id)}" type="search" autocomplete="off" draggable="false" placeholder="Rechercher un accès" value="${echapperHtml(valeur)}" data-etape-id="${echapperHtml(etape.id)}" />
              <ul class="modal-itineraire-resultats" aria-label="Résultats ${echapperHtml(libelleEtape(index).toLowerCase())}"></ul>
            </div>
            <button class="modal-itineraire-supprimer" type="button" data-etape-id="${echapperHtml(etape.id)}" aria-label="Supprimer cette étape"${suppressionPossible ? "" : " hidden"}>×</button>
          </div>`;
        })
        .join("");

      if (boutonAjouterEtape) {
        boutonAjouterEtape.disabled = etapes.length >= NOMBRE_MAX_ETAPES;
      }
      mettreAJourBoutonOptimisation();
      if (idFocus) {
        zoneEtapes.querySelector(`input[data-etape-id="${CSS.escape(idFocus)}"]`)?.focus();
      }
    }

    function mettreAJourBoutonOptimisation() {
      if (!boutonOptimiserEtapes) return;
      const assezEtapes = etapes.length >= 4;
      const toutesRenseignees = etapes.every((etape) => etape.selection);
      if (!assezEtapes || !toutesRenseignees) {
        boutonOptimiserEtapes.setAttribute("hidden", "hidden");
        boutonOptimiserEtapes.disabled = true;
        return;
      }

      const depart = etapes[0];
      const arrivee = etapes[etapes.length - 1];
      const intermediaires = etapes.slice(1, -1);
      const meilleurOrdre = trouverMeilleurOrdreIntermediaire(depart, intermediaires, arrivee);
      const ordreActuel = intermediaires.map((etape) => etape.id).join("|");
      const ordreOptimise = meilleurOrdre.map((etape) => etape.id).join("|");
      if (ordreActuel === ordreOptimise) {
        boutonOptimiserEtapes.setAttribute("hidden", "hidden");
        boutonOptimiserEtapes.disabled = true;
        return;
      }

      boutonOptimiserEtapes.removeAttribute("hidden");
      boutonOptimiserEtapes.disabled = false;
    }

    function construireLiensExternes(points) {
      const depart = points[0];
      const arrivee = points[points.length - 1];
      const origine = `${depart.latitude},${depart.longitude}`;
      const destination = `${arrivee.latitude},${arrivee.longitude}`;
      const intermediaires = points.slice(1, -1).map((point) => `${point.latitude},${point.longitude}`);
      const googleWaypoints = intermediaires.length ? `&waypoints=${encodeURIComponent(intermediaires.join("|"))}` : "";
      return {
        google: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origine)}&destination=${encodeURIComponent(destination)}${googleWaypoints}&travelmode=driving`,
        apple: `https://maps.apple.com/?saddr=${encodeURIComponent(origine)}&daddr=${encodeURIComponent(destination)}&dirflg=d`,
        waze: `https://waze.com/ul?ll=${encodeURIComponent(destination)}&navigate=yes`
      };
    }

    function afficherResume(points, details) {
      if (!details) return;
      zoneResume?.classList.add("est-visible");
      if (valeurDistance) valeurDistance.textContent = formaterDistanceResume(details.distanceMetres);
      if (valeurDuree) valeurDuree.textContent = formaterDureeResume(details.dureeSecondes);

      const liens = construireLiensExternes(points);
      if (boutonGoogle) boutonGoogle.href = liens.google;
      if (boutonApple) boutonApple.href = liens.apple;
      if (boutonWaze) boutonWaze.href = liens.waze;
      marquerActionInactive(boutonGoogle, false);
      marquerActionInactive(boutonApple, false);
      marquerActionInactive(boutonWaze, false);
    }

    async function recupererTrajetRoutier(points) {
      const coordonnees = points.map((point) => `${point.longitude},${point.latitude}`).join(";");
      const url = `${URL_ROUTAGE_OSRM}/${coordonnees}?overview=full&geometries=geojson&alternatives=false&steps=false`;
      const controleur = new AbortController();
      const temporisation = setTimeout(() => controleur.abort(), 9000);

      try {
        const reponse = await fetch(url, { signal: controleur.signal });
        if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
        const corps = await reponse.json();
        const route = Array.isArray(corps?.routes) ? corps.routes[0] : null;
        if (!route?.geometry?.coordinates?.length) throw new Error("Trajet indisponible");
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

    function calculerTrajetApproxime(points) {
      let distanceLigneDroite = 0;
      const geometry = [];
      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        geometry.push([point.longitude, point.latitude]);
        if (index > 0) {
          const precedent = points[index - 1];
          distanceLigneDroite += obtenirDistanceMetres(
            [precedent.longitude, precedent.latitude],
            [point.longitude, point.latitude]
          );
        }
      }
      const distanceMetres = distanceLigneDroite * 1.25;
      const dureeSecondes = (distanceMetres / 1000 / 65) * 3600;
      return { distanceMetres, dureeSecondes, geometry, approximation: true };
    }

    function assurerSourceMiniCarte() {
      if (!miniCarte || !miniCarteChargee) return;
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
          paint: { "circle-radius": 7.5, "circle-color": "#16a34a", "circle-stroke-width": 2.5, "circle-stroke-color": "#ffffff" }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_ETAPE)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_ETAPE,
          type: "circle",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "etape"],
          paint: { "circle-radius": 7.5, "circle-color": "#f59e0b", "circle-stroke-width": 2.5, "circle-stroke-color": "#ffffff" }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_ETAPE_LABEL)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_ETAPE_LABEL,
          type: "symbol",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "etape"],
          layout: {
            "text-field": ["get", "label"],
            "text-size": 10,
            "text-font": ["Open Sans Bold"],
            "text-allow-overlap": true,
            "text-ignore-placement": true
          },
          paint: {
            "text-color": "#ffffff",
            "text-halo-color": "#92400e",
            "text-halo-width": 0.3
          }
        });
      }
      if (!miniCarte.getLayer(COUCHE_MINI_CARTE_ARRIVEE)) {
        miniCarte.addLayer({
          id: COUCHE_MINI_CARTE_ARRIVEE,
          type: "circle",
          source: SOURCE_MINI_CARTE_TRAJET,
          filter: ["==", ["get", "kind"], "arrivee"],
          paint: { "circle-radius": 7.5, "circle-color": "#dc2626", "circle-stroke-width": 2.5, "circle-stroke-color": "#ffffff" }
        });
      }
    }

    function mettreAJourMiniCarte(points, details) {
      if (!points?.length || !details?.geometry?.length) return;
      if (!miniCarte || !miniCarteChargee) {
        miniCartePending = { points, details };
        return;
      }

      assurerSourceMiniCarte();
      const source = miniCarte.getSource(SOURCE_MINI_CARTE_TRAJET);
      if (!source) return;

      const marqueurs = points.map((point, index) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [point.longitude, point.latitude] },
        properties: {
          kind: index === 0 ? "depart" : index === points.length - 1 ? "arrivee" : "etape",
          label: index > 0 && index < points.length - 1 ? String(index) : ""
        }
      }));

      source.setData({
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "LineString", coordinates: details.geometry }, properties: { kind: "trajet" } },
          ...marqueurs
        ]
      });

      let minLng = Infinity;
      let minLat = Infinity;
      let maxLng = -Infinity;
      let maxLat = -Infinity;
      for (const [longitude, latitude] of details.geometry) {
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) continue;
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
      if (miniCarte || !conteneurCarte) return;
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
          const { points, details } = miniCartePending;
          miniCartePending = null;
          mettreAJourMiniCarte(points, details);
        }
      });
    }

    async function mettreAJourResume() {
      mettreAJourVisibiliteActions();
      const points = etapesSelectionnees();
      if (!trajetPret()) {
        reinitialiserResume();
        definirEtat("Choisissez un départ et une arrivée.");
        return;
      }

      for (let index = 1; index < points.length; index += 1) {
        const precedent = points[index - 1];
        const courant = points[index];
        const memePoint =
          Math.abs(precedent.longitude - courant.longitude) < 1e-9 &&
          Math.abs(precedent.latitude - courant.latitude) < 1e-9;
        if (memePoint) {
          reinitialiserResume();
          definirEtat("Deux étapes consécutives sont identiques.", true);
          return;
        }
      }

      const idRequete = ++compteurRequete;
      definirEtat("Calcul du trajet en cours...");
      reinitialiserResume();

      let details;
      try {
        details = await recupererTrajetRoutier(points);
      } catch {
        details = calculerTrajetApproxime(points);
      }

      if (idRequete !== compteurRequete) return;

      detailsTrajetCourant = details;
      afficherResume(points, details);
      definirEtat(details.approximation ? "Estimation approximative (itinéraire exact indisponible)." : "Trajet calculé.");
      mettreAJourMiniCarte(points, details);
    }

    function synchroniserChamp(etapeId, valeur) {
      const etape = etapes.find((item) => item.id === etapeId);
      if (!etape) return;
      etape.recherche = valeur;
      if (!etape.selection || etape.selection.label !== valeur) {
        etape.selection = null;
        mettreAJourBoutonOptimisation();
        mettreAJourResume();
      }
    }

    function choisirOption(etapeId, idOption) {
      const etape = etapes.find((item) => item.id === etapeId);
      const option = options.find((entree) => entree.id === idOption);
      if (!etape || !option) return;
      etape.selection = option;
      etape.recherche = option.label;
      rendreEtapes();
      viderSuggestions();
      mettreAJourResume();
    }

    function ajouterEtape() {
      if (etapes.length >= NOMBRE_MAX_ETAPES) return;
      const nouvelleEtape = { id: creerIdentifiantEtape(), selection: null, recherche: "" };
      etapes.push(nouvelleEtape);
      compteurRequete += 1;
      rendreEtapes(nouvelleEtape.id);
      reinitialiserResume();
      definirEtat("Renseignez la nouvelle arrivée.");
    }

    function supprimerEtape(etapeId) {
      if (etapes.length <= NOMBRE_MIN_ETAPES) return;
      etapes = etapes.filter((etape) => etape.id !== etapeId);
      compteurRequete += 1;
      rendreEtapes();
      mettreAJourResume();
    }

    function deplacerEtape(idSource, idCible) {
      if (!idSource || !idCible || idSource === idCible) return;
      const indexSource = etapes.findIndex((etape) => etape.id === idSource);
      const indexCible = etapes.findIndex((etape) => etape.id === idCible);
      if (indexSource < 0 || indexCible < 0) return;
      const [source] = etapes.splice(indexSource, 1);
      etapes.splice(indexCible, 0, source);
      compteurRequete += 1;
      rendreEtapes();
      mettreAJourResume();
    }

    function nettoyerReorganisationPointeur() {
      zoneEtapes?.querySelectorAll(".est-glissee, .est-survolee").forEach((element) => {
        element.classList.remove("est-glissee", "est-survolee");
      });
      idEtapePointeur = null;
      idEtapeSurvoleePointeur = null;
      pointeurReorganisationId = null;
    }

    function survolerEtapeDepuisPoint(x, y) {
      if (!idEtapePointeur) return;
      const element = document.elementFromPoint(x, y);
      const ligne = element instanceof Element ? element.closest(".modal-itineraire-etape") : null;
      const idSurvole = ligne?.dataset.etapeId || null;
      if (idSurvole === idEtapePointeur || idSurvole === idEtapeSurvoleePointeur) return;
      zoneEtapes?.querySelectorAll(".est-survolee").forEach((item) => item.classList.remove("est-survolee"));
      idEtapeSurvoleePointeur = idSurvole;
      if (ligne && idSurvole) {
        ligne.classList.add("est-survolee");
      }
    }

    function demarrerReorganisationDepuisPoignee(poignee, pointeurId = null) {
      const ligne = poignee?.closest(".modal-itineraire-etape");
      if (!ligne) return false;
      pointeurReorganisationId = pointeurId;
      idEtapePointeur = ligne.dataset.etapeId || null;
      idEtapeSurvoleePointeur = null;
      ligne.classList.add("est-glissee");
      return Boolean(idEtapePointeur);
    }

    function terminerReorganisation() {
      const source = idEtapePointeur;
      const cible = idEtapeSurvoleePointeur;
      nettoyerReorganisationPointeur();
      if (source && cible) {
        deplacerEtape(source, cible);
      }
    }

    function distanceEntreSelections(a, b) {
      if (!a?.selection || !b?.selection) return Infinity;
      return obtenirDistanceMetres(
        [a.selection.longitude, a.selection.latitude],
        [b.selection.longitude, b.selection.latitude]
      );
    }

    function distanceOrdreEtapes(ordre) {
      let total = 0;
      for (let index = 1; index < ordre.length; index += 1) {
        total += distanceEntreSelections(ordre[index - 1], ordre[index]);
      }
      return total;
    }

    function trouverMeilleurOrdreIntermediaire(depart, intermediaires, arrivee) {
      let meilleurOrdre = intermediaires.slice();
      let meilleureDistance = distanceOrdreEtapes([depart, ...meilleurOrdre, arrivee]);
      const utilises = new Array(intermediaires.length).fill(false);
      const courant = [];

      function explorer() {
        if (courant.length === intermediaires.length) {
          const distance = distanceOrdreEtapes([depart, ...courant, arrivee]);
          if (distance < meilleureDistance) {
            meilleureDistance = distance;
            meilleurOrdre = courant.slice();
          }
          return;
        }
        for (let index = 0; index < intermediaires.length; index += 1) {
          if (utilises[index]) continue;
          utilises[index] = true;
          courant.push(intermediaires[index]);
          explorer();
          courant.pop();
          utilises[index] = false;
        }
      }

      explorer();
      return meilleurOrdre;
    }

    function optimiserEtapesIntermediaires() {
      if (etapes.length < 4 || !etapes.every((etape) => etape.selection)) return;
      const depart = etapes[0];
      const arrivee = etapes[etapes.length - 1];
      const intermediaires = etapes.slice(1, -1);
      const meilleurOrdre = trouverMeilleurOrdreIntermediaire(depart, intermediaires, arrivee);
      const ordreActuel = intermediaires.map((etape) => etape.id).join("|");
      const ordreOptimise = meilleurOrdre.map((etape) => etape.id).join("|");
      if (ordreActuel === ordreOptimise) {
        definirEtat("Les étapes sont déjà optimisées.");
        return;
      }
      etapes = [depart, ...meilleurOrdre, arrivee];
      compteurRequete += 1;
      rendreEtapes();
      mettreAJourResume();
    }

    function fermer() {
      if (!modal) return;
      interactionDemarreeDansModal = false;
      modal.classList.remove("est-visible");
      modal.setAttribute("aria-hidden", "true");
      etapes = creerEtapesInitiales();
      compteurRequete += 1;
      rendreEtapes();
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
      mettreAJourVisibiliteActions();
    }

    function ouvrir() {
      if (!modal) return;
      interactionDemarreeDansModal = false;
      modal.classList.add("est-visible");
      modal.setAttribute("aria-hidden", "false");
      fermerMenusGlobalement?.();
      rendreEtapes();
      if (!zoneResume?.classList.contains("est-visible")) {
        definirEtat("Choisissez un départ et une arrivée.");
      }
      mettreAJourVisibiliteActions();
      setTimeout(() => zoneEtapes?.querySelector("input")?.focus(), 0);
    }

    async function initialiserOptions() {
      await chargerDonneesAcces();
      construireOptions();
    }

    boutonFermer?.addEventListener("click", fermer);
    boutonAjouterEtape?.addEventListener("click", ajouterEtape);
    boutonOptimiserEtapes?.addEventListener("click", optimiserEtapesIntermediaires);

    zoneEtapes?.addEventListener("input", (event) => {
      const champ = event.target instanceof HTMLInputElement ? event.target : null;
      if (!champ) return;
      const etapeId = champ.dataset.etapeId || "";
      const valeur = champ.value.trim();
      const liste = champ.closest(".modal-itineraire-champ")?.querySelector(".modal-itineraire-resultats");
      synchroniserChamp(etapeId, valeur);
      if (valeur.length < 2) {
        viderSuggestions();
        return;
      }
      rendreSuggestions(liste, suggestions(valeur));
    });

    zoneEtapes?.addEventListener("focusin", (event) => {
      const champ = event.target instanceof HTMLInputElement ? event.target : null;
      if (!champ) return;
      const valeur = champ.value.trim();
      const liste = champ.closest(".modal-itineraire-champ")?.querySelector(".modal-itineraire-resultats");
      if (valeur.length < 2) {
        viderSuggestions();
        return;
      }
      rendreSuggestions(liste, suggestions(valeur));
    });

    zoneEtapes?.addEventListener("keydown", (event) => {
      const champ = event.target instanceof HTMLInputElement ? event.target : null;
      if (!champ || event.key !== "Enter") return;
      const liste = champ.closest(".modal-itineraire-champ")?.querySelector(".modal-itineraire-resultats");
      const premier = liste?.querySelector(".modal-itineraire-resultat");
      if (!premier) return;
      event.preventDefault();
      premier.click();
    });

    zoneEtapes?.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const boutonResultat = event.target.closest(".modal-itineraire-resultat");
      if (boutonResultat) {
        const etapeId = boutonResultat.closest(".modal-itineraire-etape")?.dataset.etapeId || "";
        choisirOption(etapeId, boutonResultat.dataset.id || "");
        return;
      }

      const boutonSupprimer = event.target.closest(".modal-itineraire-supprimer");
      if (boutonSupprimer) {
        supprimerEtape(boutonSupprimer.dataset.etapeId || "");
      }
    });

    zoneEtapes?.addEventListener("dragstart", (event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".modal-itineraire-poignee")) {
        event.preventDefault();
        return;
      }
      const ligne = event.target.closest(".modal-itineraire-etape");
      if (!ligne) return;
      idEtapeGlissee = ligne.dataset.etapeId || null;
      ligne.classList.add("est-glissee");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", idEtapeGlissee || "");
    });

    zoneEtapes?.addEventListener("dragover", (event) => {
      if (!(event.target instanceof Element)) return;
      const ligne = event.target.closest(".modal-itineraire-etape");
      if (!ligne || !idEtapeGlissee || ligne.dataset.etapeId === idEtapeGlissee) return;
      event.preventDefault();
      ligne.classList.add("est-survolee");
    });

    zoneEtapes?.addEventListener("dragleave", (event) => {
      if (!(event.target instanceof Element)) return;
      event.target.closest(".modal-itineraire-etape")?.classList.remove("est-survolee");
    });

    zoneEtapes?.addEventListener("drop", (event) => {
      if (!(event.target instanceof Element)) return;
      const ligne = event.target.closest(".modal-itineraire-etape");
      if (!ligne) return;
      event.preventDefault();
      const source = event.dataTransfer.getData("text/plain") || idEtapeGlissee;
      zoneEtapes.querySelectorAll(".est-survolee").forEach((element) => element.classList.remove("est-survolee"));
      deplacerEtape(source, ligne.dataset.etapeId || "");
    });

    zoneEtapes?.addEventListener("dragend", () => {
      zoneEtapes.querySelectorAll(".est-glissee, .est-survolee").forEach((element) => {
        element.classList.remove("est-glissee", "est-survolee");
      });
      idEtapeGlissee = null;
    });

    zoneEtapes?.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" || !(event.target instanceof Element)) return;
      const poignee = event.target.closest(".modal-itineraire-poignee");
      if (!poignee) return;
      event.preventDefault();
      event.stopPropagation();
      if (demarrerReorganisationDepuisPoignee(poignee, event.pointerId)) {
        poignee.setPointerCapture?.(event.pointerId);
      }
    });

    zoneEtapes?.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointeurReorganisationId || !idEtapePointeur) return;
      event.preventDefault();
      survolerEtapeDepuisPoint(event.clientX, event.clientY);
    });

    zoneEtapes?.addEventListener("pointerup", (event) => {
      if (event.pointerId !== pointeurReorganisationId || !idEtapePointeur) return;
      event.preventDefault();
      terminerReorganisation();
    });

    zoneEtapes?.addEventListener("pointercancel", nettoyerReorganisationPointeur);

    zoneEtapes?.addEventListener(
      "touchstart",
      (event) => {
        const cible = event.target instanceof Element ? event.target : null;
        const poignee = cible?.closest(".modal-itineraire-poignee");
        if (!poignee || event.touches.length !== 1) return;
        event.preventDefault();
        event.stopPropagation();
        demarrerReorganisationDepuisPoignee(poignee);
      },
      { passive: false }
    );

    zoneEtapes?.addEventListener(
      "touchmove",
      (event) => {
        if (!idEtapePointeur || event.touches.length !== 1) return;
        event.preventDefault();
        const touche = event.touches[0];
        survolerEtapeDepuisPoint(touche.clientX, touche.clientY);
      },
      { passive: false }
    );

    zoneEtapes?.addEventListener(
      "touchend",
      (event) => {
        if (!idEtapePointeur) return;
        event.preventDefault();
        const touche = event.changedTouches[0];
        if (touche) {
          survolerEtapeDepuisPoint(touche.clientX, touche.clientY);
        }
        terminerReorganisation();
      },
      { passive: false }
    );

    zoneEtapes?.addEventListener("touchcancel", nettoyerReorganisationPointeur, { passive: false });

    for (const bouton of [boutonGoogle, boutonApple, boutonWaze]) {
      bouton?.addEventListener("click", (event) => {
        if (bouton.classList.contains("est-inactif")) {
          event.preventDefault();
        }
      });
    }

    boutonToggleCarte?.addEventListener("click", () => {
      const visible = panneauCarte?.classList.toggle("est-visible");
      panneauCarte?.setAttribute("aria-hidden", visible ? "false" : "true");
      boutonToggleCarte.setAttribute("aria-expanded", visible ? "true" : "false");
      boutonToggleCarte.textContent = visible ? "Masquer la carte" : "Afficher la carte";
      if (visible) {
        assurerMiniCarte();
        setTimeout(() => {
          miniCarte?.resize();
          if (trajetPret() && detailsTrajetCourant) {
            mettreAJourMiniCarte(etapesSelectionnees(), detailsTrajetCourant);
          }
        }, 0);
      }
    });

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (!estOuverte()) return;
        interactionDemarreeDansModal =
          event.target instanceof Element && Boolean(event.target.closest(".modal-itineraire-carte"));
      },
      true
    );

    document.addEventListener("click", (event) => {
      if (!estOuverte()) return;
      const clicDansModal = event.target instanceof Element && Boolean(event.target.closest(".modal-itineraire-carte"));
      if (!clicDansModal) {
        if (interactionDemarreeDansModal) {
          interactionDemarreeDansModal = false;
          return;
        }
        fermer();
        return;
      }
      interactionDemarreeDansModal = false;
      const clicDansChampOuListe = event.target instanceof Element && Boolean(event.target.closest(".modal-itineraire-champ"));
      if (!clicDansChampOuListe) {
        viderSuggestions();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && estOuverte()) {
        fermer();
      }
    });

    rendreEtapes();
    reinitialiserResume();
    definirEtat("Choisissez un départ et une arrivée.");
    mettreAJourVisibiliteActions();

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
