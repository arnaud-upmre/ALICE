// Centre initial de la carte (France metropolitaine).
const CENTRE_INITIAL = [2.35, 48.85];
const ZOOM_INITIAL = 6;
const ZOOM_MAX = 19;
const BOUNDS_DEMARRAGE = [
  [1.60412, 49.51155],
  [4.29321, 51.0309]
];
const OPTIONS_CADRAGE_DEMARRAGE = {
  padding: {
    top: 86,
    right: 64,
    bottom: 78,
    left: 64
  },
  maxZoom: 10.8
};
const SOURCE_APPAREILS = "appareils-source";
const COUCHE_APPAREILS = "appareils-points";
const COUCHE_APPAREILS_GROUPES = "appareils-groupes";
const SOURCE_ACCES = "acces-source";
const COUCHE_ACCES = "acces-points";
const COUCHE_ACCES_GROUPES = "acces-groupes";
const SOURCE_POSTES = "postes-source";
const COUCHE_POSTES = "postes-points";
const COUCHE_POSTES_GROUPES = "postes-groupes";
const SOURCE_PK = "pk-source";
const COUCHE_PK_LABELS = "pk-labels";
const SOURCE_PN = "pn-source";
const COUCHE_PN = "pn-points";
const SOURCE_LIGNES = "openrailwaymap-source";
const COUCHE_LIGNES = "openrailwaymap-lignes";
const SOURCE_VITESSE_LIGNE = "openrailwaymap-maxspeed-source";
const COUCHE_VITESSE_LIGNE = "openrailwaymap-maxspeed";
const SOURCE_MESURE = "mesure-source";
const COUCHE_MESURE_LIGNES = "mesure-lignes";
const COUCHE_MESURE_POINTS = "mesure-points";
const COUCHE_MESURE_LABELS = "mesure-labels";
const TABLES_RSS = window.RSS_TABLE_NUMBERS || {};
const DUREE_APPUI_LONG_MENU_CONTEXTUEL_MS = 800;
const DELAI_DEMARRAGE_DONNEES_MS = 220;
const PLACEHOLDER_RECHERCHE_DESKTOP = "Rechercher un poste, appareil, acces...";
const PLACEHOLDER_RECHERCHE_MOBILE = "Rechercher...";
const SEPARATEUR_LIBELLE = " ";
const APPAREILS_VIDE = { type: "FeatureCollection", features: [] };
const ACCES_VIDE = { type: "FeatureCollection", features: [] };
const POSTES_VIDE = { type: "FeatureCollection", features: [] };
const PK_VIDE = { type: "FeatureCollection", features: [] };
const PN_VIDE = { type: "FeatureCollection", features: [] };
const PK_ZOOM_MIN = 11;
const PALETTE_CARTE = Object.freeze({
  acces: "#7c3aed",
  accesGroupe: "#8b5cf6",
  poste: "#60a5fa",
  posteGroupe: "#93c5fd",
  horsPatrimoine: "#ef4444",
  horsPatrimoineGroupe: "#f87171"
});
const PALETTE_APPAREILS = Object.freeze({
  urgence: "#d90429",
  interrupteur: "#f77f00",
  transfo: "#ffd60a",
  sectionneur: "#2a9d8f",
  alim: "#8d99ae",
  autre: "#111111"
});

function appliquerPaletteCarteDansCss() {
  const racine = document.documentElement;
  if (!racine?.style) {
    return;
  }
  racine.style.setProperty("--color-acces", PALETTE_CARTE.acces);
  racine.style.setProperty("--color-acces-groupe", PALETTE_CARTE.accesGroupe);
  racine.style.setProperty("--color-poste", PALETTE_CARTE.poste);
  racine.style.setProperty("--color-poste-groupe", PALETTE_CARTE.posteGroupe);
  racine.style.setProperty("--color-hp", PALETTE_CARTE.horsPatrimoine);
  racine.style.setProperty("--color-hp-groupe", PALETTE_CARTE.horsPatrimoineGroupe);
  racine.style.setProperty("--color-app-du", PALETTE_APPAREILS.urgence);
  racine.style.setProperty("--color-app-si", PALETTE_APPAREILS.interrupteur);
  racine.style.setProperty("--color-app-tt", PALETTE_APPAREILS.transfo);
  racine.style.setProperty("--color-app-t", PALETTE_APPAREILS.sectionneur);
  racine.style.setProperty("--color-app-alim", PALETTE_APPAREILS.alim);
  racine.style.setProperty("--color-app-autre", PALETTE_APPAREILS.autre);
  racine.style.setProperty("--badge-postes-fg", "#1e3a8a");
  racine.style.setProperty("--badge-postes-bg", "rgba(96, 165, 250, 0.22)");
  racine.style.setProperty("--badge-acces-fg", "#5b21b6");
  racine.style.setProperty("--badge-acces-bg", "rgba(139, 92, 246, 0.2)");
}
appliquerPaletteCarteDansCss();

// Style raster OSM (plan open).
const stylePlanOsm = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm"
    }
  ]
};

const URL_TUILES_SATELLITE_IGN =
  "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
const URL_TUILES_PLAN_IGN =
  "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";

// Style raster des orthophotos IGN (satellite).
const styleSatelliteIgn = {
  version: 8,
  sources: {
    satelliteIgn: {
      type: "raster",
      tiles: [URL_TUILES_SATELLITE_IGN],
      tileSize: 256,
      maxzoom: 18,
      attribution: "© IGN, © OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "satelliteIgn",
      type: "raster",
      source: "satelliteIgn"
    }
  ]
};

// Fallback raster pour le Plan IGN si le style vectoriel officiel n'est pas disponible.
const stylePlanIgnRasterFallback = {
  version: 8,
  sources: {
    planIgnRaster: {
      type: "raster",
      tiles: [URL_TUILES_PLAN_IGN],
      tileSize: 256,
      maxzoom: 18,
      attribution: "© IGN, © OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "planIgnRaster",
      type: "raster",
      source: "planIgnRaster"
    }
  ]
};

const URL_STYLE_POSITRON = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const URL_STYLE_VOYAGER = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

// Style vectoriel officiel du Plan IGN (plus fluide pour le fond plan).
const URL_STYLE_PLAN_IGN =
  "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json";
const FOND_IGN_AUTOMATIQUE = "ignAuto";
const FOND_BASE_IGN_AUTOMATIQUE = "voyager";
const ZOOM_PASSAGE_SATELLITE_IGN = 13;
const ZOOM_RETOUR_PLAN_IGN = 12.5;
const ZOOM_DEBUT_FONDU_IGN_AUTO = ZOOM_PASSAGE_SATELLITE_IGN;
const ZOOM_FIN_FONDU_IGN_AUTO = ZOOM_MAX - 3;
const OPACITE_MAX_SATELLITE_IGN_AUTO = 1;
const SOURCE_SATELLITE_IGN_AUTO = "satellite-ign-auto-source";
const COUCHE_SATELLITE_IGN_AUTO = "satellite-ign-auto-layer";

const fondsCartographiques = {
  positron: URL_STYLE_POSITRON,
  voyager: URL_STYLE_VOYAGER,
  planIgn: URL_STYLE_PLAN_IGN,
  osm: stylePlanOsm,
  satelliteIgn: styleSatelliteIgn
};

const stylesFondsVectorielsPrepares = new Map();
const promessesStylesFondsVectoriels = new Map();
let compteurChangementFond = 0;

let fondActif = FOND_BASE_IGN_AUTOMATIQUE;
let ignAutomatiqueActif = true;
let afficherAppareils = true;
let afficherAcces = true;
let afficherPostes = true;
let afficherPk = false;
let afficherPn = false;
let afficherLignes = false;
let afficherVitesseLigne = false;
let donneesAppareils = null;
let donneesAcces = null;
let donneesPostes = null;
let donneesPk = null;
let donneesPkAffichees = PK_VIDE;
let donneesPn = null;
let promesseChargementAppareils = null;
let promesseChargementAcces = null;
let promesseChargementPostes = null;
let promesseChargementPk = null;
let promesseChargementPn = null;
let popupCarte = null;
let popupPkInfo = null;
let popupPnInfo = null;
let popupSurvolInfo = null;
let signaturePopupSurvolInfo = "";
let popupSurvolInfoVerrouillee = false;
let initialisationDonneesLancee = false;
let totalAppareilsBrut = 0;
let totalPostesBrut = 0;
let moduleRechercheAlice = null;
let menuContextuelOuvert = false;
let mesureActive = false;
let mesurePoints = [];
let navigationInternePopup = null;
let minuterieClignotementLocalisation = null;
let minuterieArretLocalisation = null;
let minuterieClignotementMarqueurClic = null;
let minuterieSuppressionMarqueurClic = null;
let coordonneesDerniereFiche = null;
let contextePartageFiche = null;
let marqueurLocalisation = null;
let marqueurClicContextuel = null;
let recadragePopupMobileEnCours = false;
let navigationPopupProgrammatiqueEnCours = false;
let conserverFichePendantNavigation = false;
let restaurationStylePlanifiee = false;
let transitionFondIgnAutoPlanifiee = false;
let dernierZoomTransitionFondIgnAuto = null;
let controleAttributionCarte = null;
let signatureAttributionCarte = "";
let idsCouchesFondNatives = [];
let contexteMenuPosition = {
  longitude: null,
  latitude: null
};
let contexteMenuFeature = null;
const DIAMETRE_ICONE_GROUPE_APPAREILS = 84;

function clonerStyle(style) {
  return JSON.parse(JSON.stringify(style));
}

async function chargerStyleJsonDepuisUrl(url) {
  const reponse = await fetch(url, { cache: "default" });
  if (!reponse.ok) {
    throw new Error(`HTTP ${reponse.status}`);
  }
  return reponse.json();
}

function contientMotStyle(texte, mots) {
  const normalise = String(texte || "").toLowerCase();
  return mots.some((mot) => normalise.includes(mot));
}

function classifierCoucheStyleFond(couche) {
  const id = String(couche?.id || "").toLowerCase();
  const sourceLayer = String(couche?.["source-layer"] || "").toLowerCase();
  const concat = `${id} ${sourceLayer}`;
  const estLabel = couche?.type === "symbol";
  const estRoute = contientMotStyle(concat, [
    "road",
    "street",
    "highway",
    "transportation",
    "transport",
    "path",
    "track",
    "motorway",
    "trunk",
    "primary",
    "secondary",
    "tertiary",
    "residential",
    "service"
  ]);
  const estRouteMineure = contientMotStyle(concat, [
    "minor",
    "residential",
    "service",
    "tertiary",
    "living",
    "pedestrian",
    "footway",
    "path",
    "track",
    "unclassified"
  ]);
  const estLabelRoute = estLabel && contientMotStyle(concat, ["road", "street", "highway", "transport"]);
  const estPoi = contientMotStyle(concat, ["poi", "amenity", "landmark", "shop", "tourism", "leisure", "icon"]);
  const estLabelLocal = estLabel && contientMotStyle(concat, ["neighbour", "neighborhood", "suburb", "quarter", "hamlet", "village"]);
  return { estLabel, estRoute, estRouteMineure, estLabelRoute, estPoi, estLabelLocal };
}

function masquerCoucheStyleFond(couche) {
  if (!couche.layout) {
    couche.layout = {};
  }
  couche.layout.visibility = "none";
}

function releverMinZoomCoucheStyleFond(couche, minZoom) {
  const minzoomCourant = Number.isFinite(couche.minzoom) ? couche.minzoom : 0;
  couche.minzoom = Math.max(minzoomCourant, minZoom);
}

function appliquerPresetEquilibreStyleFond(styleJson) {
  const style = clonerStyle(styleJson);
  style.layers = (style.layers || []).map((couche) => {
    const sortie = { ...couche };
    const classe = classifierCoucheStyleFond(sortie);

    // Variante "equilibre + labels villes":
    // on masque les POI, mais on conserve une partie des labels de localites
    // a zoom plus eleve pour eviter la surcharge.
    if (classe.estPoi) {
      masquerCoucheStyleFond(sortie);
      return sortie;
    }
    if (classe.estLabelLocal) {
      releverMinZoomCoucheStyleFond(sortie, 10.5);
      return sortie;
    }
    if (classe.estRouteMineure) {
      releverMinZoomCoucheStyleFond(sortie, 11);
    }
    if (classe.estLabelRoute) {
      releverMinZoomCoucheStyleFond(sortie, 12);
    }
    if (classe.estRoute) {
      releverMinZoomCoucheStyleFond(sortie, 8);
    }
    return sortie;
  });
  return style;
}

function corrigerAttributionsStyleFond(styleJson) {
  const style = clonerStyle(styleJson);
  const sources = style?.sources || {};
  for (const source of Object.values(sources)) {
    if (!source || typeof source !== "object") {
      continue;
    }
    if (typeof source.attribution !== "string") {
      continue;
    }
    source.attribution = source.attribution
      .replaceAll("OpenStreetMap contributor", "OpenStreetMap contributors")
      .replaceAll("OpenStreetMap Contributor", "OpenStreetMap contributors");
  }
  return style;
}

async function obtenirStyleFond(nomFond) {
  const style = fondsCartographiques[nomFond];
  if (!style) {
    return null;
  }

  if (nomFond === "planIgn") {
    if (stylesFondsVectorielsPrepares.has(nomFond)) {
      return clonerStyle(stylesFondsVectorielsPrepares.get(nomFond));
    }

    if (!promessesStylesFondsVectoriels.has(nomFond)) {
      const promesse = chargerStyleJsonDepuisUrl(URL_STYLE_PLAN_IGN)
        .then((styleJson) => {
          const styleCorrige = corrigerAttributionsStyleFond(styleJson);
          stylesFondsVectorielsPrepares.set(nomFond, styleCorrige);
          return styleCorrige;
        })
        .catch((erreur) => {
          console.warn("Style vectoriel Plan IGN indisponible, fallback raster active.", erreur);
          return stylePlanIgnRasterFallback;
        })
        .finally(() => {
          promessesStylesFondsVectoriels.delete(nomFond);
        });
      promessesStylesFondsVectoriels.set(nomFond, promesse);
    }

    const stylePrepare = await promessesStylesFondsVectoriels.get(nomFond);
    return clonerStyle(stylePrepare);
  }

  if (nomFond !== "positron" && nomFond !== "voyager") {
    return style;
  }

  if (stylesFondsVectorielsPrepares.has(nomFond)) {
    return clonerStyle(stylesFondsVectorielsPrepares.get(nomFond));
  }

  if (!promessesStylesFondsVectoriels.has(nomFond)) {
    const promesse = chargerStyleJsonDepuisUrl(style)
      .then((styleJson) => {
        const styleCorrige = corrigerAttributionsStyleFond(styleJson);
        const stylePrepare = appliquerPresetEquilibreStyleFond(styleCorrige);
        stylesFondsVectorielsPrepares.set(nomFond, stylePrepare);
        return stylePrepare;
      })
      .finally(() => {
        promessesStylesFondsVectoriels.delete(nomFond);
      });
    promessesStylesFondsVectoriels.set(nomFond, promesse);
  }

  const stylePrepare = await promessesStylesFondsVectoriels.get(nomFond);
  return clonerStyle(stylePrepare);
}

function determinerCouleurAppareil(codeAppareil) {
  const code = String(codeAppareil || "").trim().toUpperCase();

  if (!code) {
    return PALETTE_APPAREILS.autre;
  }

  if (code.startsWith("DU")) {
    return PALETTE_APPAREILS.urgence;
  }

  if (code.startsWith("SI") || code.startsWith("I") || code.startsWith("D")) {
    return PALETTE_APPAREILS.interrupteur;
  }

  if (
    code.startsWith("TT") ||
    code.startsWith("TSA") ||
    code.startsWith("TC") ||
    code.startsWith("TRA") ||
    /^GT\d+$/.test(code) ||
    /^AT\d+$/.test(code)
  ) {
    return PALETTE_APPAREILS.transfo;
  }

  if (
    /^T\d+(?:\/\d+)?$/.test(code) ||
    code.startsWith("T/") ||
    /^\d/.test(code) ||
    code.startsWith("ST") ||
    code.startsWith("S") ||
    code.startsWith("FB") ||
    code.startsWith("F") ||
    code.startsWith("P") ||
    code.startsWith("B")
  ) {
    return PALETTE_APPAREILS.sectionneur;
  }

  if (code.startsWith("ALIM")) {
    return PALETTE_APPAREILS.alim;
  }

  return PALETTE_APPAREILS.autre;
}

function estHorsPatrimoine(valeur) {
  if (valeur === true) {
    return true;
  }
  const texte = String(valeur || "")
    .trim()
    .toLowerCase();
  return texte === "true" || texte === "1" || texte === "oui";
}

function normaliserCouleurHex(couleur) {
  const valeur = String(couleur || "")
    .trim()
    .toLowerCase();
  if (!valeur) {
    return PALETTE_APPAREILS.autre;
  }
  const hex = valeur.startsWith("#") ? valeur.slice(1) : valeur;
  if (/^[0-9a-f]{3}$/.test(hex)) {
    return `#${hex
      .split("")
      .map((c) => c + c)
      .join("")}`;
  }
  if (/^[0-9a-f]{6}$/.test(hex)) {
    return `#${hex}`;
  }
  return PALETTE_APPAREILS.autre;
}

function convertirHexEnRgba(couleurHex, alpha) {
  const hex = normaliserCouleurHex(couleurHex).slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function construireIdIconeGroupeAppareils(couleurs, horsPatrimoine) {
  const palette = (couleurs || [])
    .map((couleur) => normaliserCouleurHex(couleur).slice(1))
    .join("-");
  const suffixeHp = horsPatrimoine ? "-hp" : "";
  return `appareils-groupe-${palette || "111111"}${suffixeHp}`;
}

function determinerCouleurCarteAppareil(appareil) {
  if (appareil?.hors_patrimoine) {
    return PALETTE_CARTE.horsPatrimoine;
  }
  return normaliserCouleurHex(appareil?.couleur_appareil || PALETTE_APPAREILS.autre);
}

function creerImageIconeGroupeAppareils(couleurs, horsPatrimoine) {
  const canvas = document.createElement("canvas");
  canvas.width = DIAMETRE_ICONE_GROUPE_APPAREILS;
  canvas.height = DIAMETRE_ICONE_GROUPE_APPAREILS;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const teintes = Array.isArray(couleurs) && couleurs.length ? couleurs : [PALETTE_APPAREILS.autre];
  const taille = teintes.length;
  const centre = DIAMETRE_ICONE_GROUPE_APPAREILS / 2;
  const rayon = centre - 3;
  const depart = -Math.PI / 2;

  for (let i = 0; i < taille; i += 1) {
    const angleStart = depart + (i / taille) * Math.PI * 2;
    const angleEnd = depart + ((i + 1) / taille) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(centre, centre);
    ctx.arc(centre, centre, rayon, angleStart, angleEnd);
    ctx.closePath();
    ctx.fillStyle = convertirHexEnRgba(teintes[i], 1);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(centre, centre, rayon, 0, Math.PI * 2);
  ctx.strokeStyle = horsPatrimoine ? PALETTE_CARTE.horsPatrimoineGroupe : "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  const imageData = ctx.getImageData(0, 0, DIAMETRE_ICONE_GROUPE_APPAREILS, DIAMETRE_ICONE_GROUPE_APPAREILS);
  return {
    width: DIAMETRE_ICONE_GROUPE_APPAREILS,
    height: DIAMETRE_ICONE_GROUPE_APPAREILS,
    data: imageData.data
  };
}

function enregistrerIconesGroupesAppareils() {
  if (!carte.hasImage("appareils-groupe-111111")) {
    const fallback = creerImageIconeGroupeAppareils(["#111111"], false);
    if (fallback) {
      carte.addImage("appareils-groupe-111111", fallback, { pixelRatio: 2 });
    }
  }

  if (!donneesAppareils?.features?.length) {
    return;
  }

  for (const feature of donneesAppareils.features) {
    const propr = feature?.properties || {};
    if (Number(propr.appareils_count) <= 1) {
      continue;
    }

    const idIcone = String(propr.icone_groupe_appareils || "").trim();
    if (!idIcone || carte.hasImage(idIcone)) {
      continue;
    }

    let couleurs = [];
    try {
      couleurs = JSON.parse(propr.appareils_couleurs_carte_json || propr.appareils_couleurs_json || "[]");
    } catch {
      couleurs = [];
    }
    const image = creerImageIconeGroupeAppareils(couleurs, Number(propr.hors_patrimoine_count) > 0);
    if (image) {
      carte.addImage(idIcone, image, { pixelRatio: 2 });
    }
  }
}

function regrouperAppareilsParCoordonnees(geojson) {
  const groupes = new Map();

  for (const feature of geojson.features || []) {
    if (!feature?.geometry || feature.geometry.type !== "Point") {
      continue;
    }

    const [longitude, latitude] = feature.geometry.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const propr = feature.properties || {};
    const cle = `${longitude}|${latitude}`;
    const appareil = {
      nom: propr.nom || "",
      type: propr.type || "",
      SAT: propr.SAT || "",
      acces: propr.acces || "",
      appareil: propr.appareil || "",
      description: propr.description || "",
      imajnet: propr.imajnet || "",
      couleur_appareil: determinerCouleurAppareil(propr.appareil),
      hors_patrimoine: estHorsPatrimoine(propr.hors_patrimoine)
    };

    if (!groupes.has(cle)) {
      groupes.set(cle, {
        longitude,
        latitude,
        appareils: []
      });
    }

    groupes.get(cle).appareils.push(appareil);
  }

  const features = [];
  for (const groupe of groupes.values()) {
    const total = groupe.appareils.length;

    if (total === 1) {
      const unique = groupe.appareils[0];
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [groupe.longitude, groupe.latitude]
        },
        properties: {
          ...unique,
          appareils_count: 1,
          hors_patrimoine_count: unique.hors_patrimoine ? 1 : 0,
          appareils_liste_json: JSON.stringify([unique])
        }
      });
      continue;
    }

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [groupe.longitude, groupe.latitude]
      },
      properties: {
        icone_groupe_appareils: construireIdIconeGroupeAppareils(
          groupe.appareils.map((a) => determinerCouleurCarteAppareil(a)),
          groupe.appareils.some((a) => a.hors_patrimoine)
        ),
        appareils_couleurs_carte_json: JSON.stringify(
          groupe.appareils.map((a) => determinerCouleurCarteAppareil(a))
        ),
        appareils_couleurs_json: JSON.stringify(
          groupe.appareils.map((a) => normaliserCouleurHex(a.couleur_appareil || "#111111"))
        ),
        appareils_count: total,
        hors_patrimoine_count: groupe.appareils.filter((a) => a.hors_patrimoine).length,
        hors_patrimoine: groupe.appareils.some((a) => a.hors_patrimoine),
        imajnet:
          groupe.appareils.find((a) => String(a.imajnet || "").trim())?.imajnet || "",
        appareils_liste_json: JSON.stringify(groupe.appareils)
      }
    });
  }

  return {
    type: "FeatureCollection",
    features
  };
}

function regrouperAccesParCoordonnees(geojson) {
  const groupes = new Map();

  for (const feature of geojson.features || []) {
    if (!feature?.geometry || feature.geometry.type !== "Point") {
      continue;
    }

    const [longitude, latitude] = feature.geometry.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const propr = feature.properties || {};
    const cle = `${longitude}|${latitude}`;
    const horsPatrimoine = estHorsPatrimoine(propr.hors_patrimoine);
    const champAcces = String(propr.acces || "").trim();
    const acces = {
      nom: propr.nom || "",
      type: propr.type || "",
      SAT: propr.SAT || "",
      acces: champAcces,
      code: estCodeDisponible(propr.code),
      hors_patrimoine: horsPatrimoine
    };

    if (!groupes.has(cle)) {
      groupes.set(cle, {
        longitude,
        latitude,
        acces: []
      });
    }

    groupes.get(cle).acces.push(acces);
  }

  const features = [];
  for (const groupe of groupes.values()) {
    const total = groupe.acces.length;

    if (total === 1) {
      const unique = groupe.acces[0];
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [groupe.longitude, groupe.latitude]
        },
        properties: {
          ...unique,
          acces_count: 1,
          hors_patrimoine_count: unique.hors_patrimoine ? 1 : 0,
          acces_liste_json: JSON.stringify([unique])
        }
      });
      continue;
    }

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [groupe.longitude, groupe.latitude]
      },
      properties: {
        acces_count: total,
        hors_patrimoine_count: groupe.acces.filter((a) => a.hors_patrimoine).length,
        hors_patrimoine: groupe.acces.some((a) => a.hors_patrimoine),
        acces_liste_json: JSON.stringify(groupe.acces)
      }
    });
  }

  return {
    type: "FeatureCollection",
    features
  };
}

function regrouperPostesParCoordonnees(geojson) {
  const groupes = new Map();

  for (const feature of geojson.features || []) {
    if (!feature?.geometry || feature.geometry.type !== "Point") {
      continue;
    }

    const [longitude, latitude] = feature.geometry.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const propr = feature.properties || {};
    const cle = `${longitude}|${latitude}`;
    const nomNormalise = String(propr.nom || "")
      .trim()
      .toLowerCase();

    if (!groupes.has(cle)) {
      groupes.set(cle, {
        longitude,
        latitude,
        postes: [],
        nomsVus: new Set()
      });
    }

    const groupe = groupes.get(cle);
    if (nomNormalise && groupe.nomsVus.has(nomNormalise)) {
      continue;
    }

    const poste = {
      nom: propr.nom || "",
      type: propr.type || "",
      SAT: propr.SAT || "",
      acces: propr.acces || "",
      code: estCodeDisponible(propr.code),
      description: propr.description || "",
      description_telecommande: propr.description_telecommande || "",
      rss: propr.rss || "",
      contact: propr.contact || "",
      lignes: propr.lignes || "",
      numero_ligne: propr.numero_ligne ?? "",
      pk: propr.pk || "",
      hors_patrimoine: estHorsPatrimoine(propr.hors_patrimoine),
      special: estHorsPatrimoine(propr.special)
    };

    if (nomNormalise) {
      groupe.nomsVus.add(nomNormalise);
    }

    groupe.postes.push(poste);
  }

  const features = [];
  for (const groupe of groupes.values()) {
    const total = groupe.postes.length;

    if (total === 1) {
      const unique = groupe.postes[0];
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [groupe.longitude, groupe.latitude]
        },
        properties: {
          ...unique,
          postes_count: 1,
          hors_patrimoine_count: unique.hors_patrimoine ? 1 : 0,
          postes_liste_json: JSON.stringify([unique])
        }
      });
      continue;
    }

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [groupe.longitude, groupe.latitude]
      },
      properties: {
        postes_count: total,
        hors_patrimoine_count: groupe.postes.filter((p) => p.hors_patrimoine).length,
        hors_patrimoine: groupe.postes.some((p) => p.hors_patrimoine),
        postes_liste_json: JSON.stringify(groupe.postes)
      }
    });
  }

  return {
    type: "FeatureCollection",
    features
  };
}

let conteneurControleActionsCarte = null;
let boutonLocaliserCarte = null;
let boutonInfoCarte = null;
let menuLegendeOuvert = false;

const carte = new maplibregl.Map({
  container: "map",
  center: CENTRE_INITIAL,
  zoom: ZOOM_INITIAL,
  bounds: BOUNDS_DEMARRAGE,
  fitBoundsOptions: OPTIONS_CADRAGE_DEMARRAGE,
  maxZoom: ZOOM_MAX,
  attributionControl: false,
  prefetchZoomDelta: 0,
  fadeDuration: 0,
  refreshExpiredTiles: false,
  style: fondsCartographiques[fondActif]
});

carte.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
carte.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

const LIEN_SNCF_OPEN_DATA = "https://ressources.data.sncf.com/";
const LIEN_EXTRA_PK = "https://github.com/nicolaswurtz/extras-opendata-sncf-reseau";
const AFFICHER_MENTION_SNCF_PAR_DEFAUT = true;

function construireAttributionsDynamiquesCarte() {
  const attributions = [];
  if (AFFICHER_MENTION_SNCF_PAR_DEFAUT) {
    attributions.push(
      `<a href="${LIEN_SNCF_OPEN_DATA}" target="_blank" rel="noopener noreferrer">SNCF Open Data</a>`
    );
  }
  if (afficherPn) {
    attributions.push(
      `PN affichés : <a href="${LIEN_SNCF_OPEN_DATA}" target="_blank" rel="noopener noreferrer">SNCF Open Data</a>`
    );
  }
  if (afficherPk) {
    attributions.push(
      `PK affichés : <a href="${LIEN_SNCF_OPEN_DATA}" target="_blank" rel="noopener noreferrer">SNCF Open Data</a> + <a href="${LIEN_EXTRA_PK}" target="_blank" rel="noopener noreferrer">extras-opendata-sncf-reseau</a>`
    );
  }
  if (afficherAppareils || afficherAcces || afficherPostes) {
    attributions.push("© ALICE - Données internes : réutilisation interdite sans autorisation.");
  }
  return attributions;
}

function mettreAJourControleAttributionCarte() {
  const attributionsDynamiques = construireAttributionsDynamiquesCarte();
  const signature = attributionsDynamiques.join(" | ");
  if (signature === signatureAttributionCarte && controleAttributionCarte) {
    return;
  }
  signatureAttributionCarte = signature;

  if (controleAttributionCarte) {
    carte.removeControl(controleAttributionCarte);
  }

  controleAttributionCarte = new maplibregl.AttributionControl({
    compact: true,
    customAttribution: attributionsDynamiques
  });
  carte.addControl(controleAttributionCarte, "bottom-right");
}

mettreAJourControleAttributionCarte();

const controleFonds = document.getElementById("controle-fonds");
const boutonFonds = document.getElementById("bouton-fonds");
const optionsFond = Array.from(document.querySelectorAll('input[name="fond"]'));
const controleFiltres = document.getElementById("controle-filtres");
const boutonFiltres = document.getElementById("bouton-filtres");
const boutonItineraire = document.getElementById("bouton-itineraire");
const boutonLocalisationMobile = document.getElementById("bouton-localisation-mobile");
const boutonLegendeFiltres = document.getElementById("bouton-legende-filtres");
const caseAppareils = document.querySelector('input[name="filtre-appareils"]');
const caseAcces = document.querySelector('input[name="filtre-acces"]');
const casePostes = document.querySelector('input[name="filtre-postes"]');
const casePk = document.querySelector('input[name="filtre-pk"]');
const casePn = document.querySelector('input[name="filtre-pn"]');
const caseLignes = document.querySelector('input[name="filtre-lignes"]');
const caseVitesseLigne = document.querySelector('input[name="filtre-vitesse-ligne"]');
const compteurAppareils = document.getElementById("compteur-appareils");
const compteurAcces = document.getElementById("compteur-acces");
const compteurPostes = document.getElementById("compteur-postes");
const controleRecherche = document.getElementById("controle-recherche");
const champRecherche = document.getElementById("champ-recherche");
const listeResultatsRecherche = document.getElementById("recherche-resultats");
const infoVitesseLigne = document.getElementById("info-vitesse-ligne");
const infoPk = document.getElementById("info-pk");
const menuContextuelCarte = document.getElementById("menu-contextuel-carte");
const boutonCtxCoord = document.getElementById("ctx-coord");
const boutonCtxShare = document.getElementById("ctx-share");
const boutonCtxItin = document.getElementById("ctx-itin");
const sousMenuItin = document.getElementById("ctx-submenu-itin");
const boutonCtxGoogleItin = document.getElementById("ctx-gmaps");
const boutonCtxWaze = document.getElementById("ctx-waze");
const boutonCtxApple = document.getElementById("ctx-apple");
const boutonCtxRegle = document.getElementById("ctx-regle");
const boutonCtxGoogleMarker = document.getElementById("ctx-gmaps-marker");
const boutonCtxStreet = document.getElementById("ctx-street");
const boutonCtxImajnet = document.getElementById("ctx-imajnet");
const boutonCtxAjoutAppareil = document.getElementById("ctx-add-appareil");
const panneauMesure = document.getElementById("panneau-mesure");
const textePanneauMesure = document.getElementById("panneau-mesure-texte");
const boutonSortieMesure = document.getElementById("bouton-sortie-mesure");
const menuLegendeCarte = document.getElementById("menu-legende-carte");
const boutonFermerLegende = document.getElementById("bouton-fermer-legende");
const modalApropos = document.getElementById("modal-apropos");
const boutonFermerModalApropos = document.getElementById("modal-apropos-fermer");
const boutonInstallerPwa = document.getElementById("bouton-installer-pwa");
const messageInstallerPwa = document.getElementById("message-installer-pwa");
let modalFiche = document.getElementById("modal-fiche");
let modalFicheContenu = document.getElementById("modal-fiche-contenu");
let boutonFermerModalFiche = document.getElementById("modal-fiche-fermer");
let boutonPartagerModalFiche = document.getElementById("modal-fiche-partager");
let elementRetourFocusModalFiche = null;
let elementRetourFocusModalApropos = null;
let modalStreetViewContextuelle = null;
let iframeStreetViewContextuelle = null;
const CLE_STOCKAGE_APROPOS_VU = "alice.apropos.vu";
let temporisationInfoVitesse = null;
let temporisationInfoPk = null;
let moduleItineraire = null;
let promesseChargementModuleItineraire = null;
let moduleLocalisation = null;
let promesseChargementModuleLocalisation = null;
let rafMiseAJourPk = null;
let marqueursPk = [];
let evenementInstallationPwaDiffere = null;

class ControleActionsCarte {
  onAdd() {
    const conteneur = document.createElement("div");
    conteneur.className = "maplibregl-ctrl maplibregl-ctrl-group controle-actions-carte";

    const boutonLocaliser = document.createElement("button");
    boutonLocaliser.type = "button";
    boutonLocaliser.className = "bouton-carte-action";
    boutonLocaliser.setAttribute("data-role", "localiser-carte");
    boutonLocaliser.setAttribute("aria-label", "Me localiser");
    boutonLocaliser.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 1 0 12 8.8z"/>
        <path d="M20.5 11h-1.64a6.94 6.94 0 0 0-5.86-5.86V3.5a1 1 0 1 0-2 0v1.64A6.94 6.94 0 0 0 5.14 11H3.5a1 1 0 1 0 0 2h1.64a6.94 6.94 0 0 0 5.86 5.86v1.64a1 1 0 1 0 2 0v-1.64A6.94 6.94 0 0 0 18.86 13h1.64a1 1 0 1 0 0-2zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
      </svg>
    `;

    const boutonInfo = document.createElement("button");
    boutonInfo.type = "button";
    boutonInfo.className = "bouton-carte-action";
    boutonInfo.setAttribute("aria-label", "Afficher à propos");
    boutonInfo.setAttribute("aria-expanded", "false");
    boutonInfo.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 10h2v7h-2zM11 7h2v2h-2z"/>
        <path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 12 2.5zm0 17a7.5 7.5 0 1 1 7.5-7.5 7.51 7.51 0 0 1-7.5 7.5z"/>
      </svg>
    `;

    conteneur.append(boutonLocaliser, boutonInfo);
    conteneurControleActionsCarte = conteneur;
    boutonLocaliserCarte = boutonLocaliser;
    boutonInfoCarte = boutonInfo;
    return conteneur;
  }

  onRemove() {
    if (conteneurControleActionsCarte?.parentNode) {
      conteneurControleActionsCarte.parentNode.removeChild(conteneurControleActionsCarte);
    }
    conteneurControleActionsCarte = null;
    boutonLocaliserCarte = null;
    boutonInfoCarte = null;
  }
}

carte.addControl(new ControleActionsCarte(), "top-right");

function actualiserPlaceholderRecherche() {
  if (!champRecherche) {
    return;
  }
  const estMobile = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
  champRecherche.placeholder = estMobile ? PLACEHOLDER_RECHERCHE_MOBILE : PLACEHOLDER_RECHERCHE_DESKTOP;
}

function planifierResizeCarte() {
  window.requestAnimationFrame(() => {
    carte.resize();
  });
}

function obtenirDateLocaleDuJour() {
  const maintenant = new Date();
  const annee = maintenant.getFullYear();
  const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
  const jour = String(maintenant.getDate()).padStart(2, "0");
  return `${annee}-${mois}-${jour}`;
}

function masquerMessageInfoVitesseLigne() {
  if (!infoVitesseLigne) {
    return;
  }
  infoVitesseLigne.classList.remove("est-visible");
  infoVitesseLigne.setAttribute("aria-hidden", "true");
}

function afficherMessageInfoVitesseLigne() {
  if (!infoVitesseLigne) {
    return;
  }
  infoVitesseLigne.classList.add("est-visible");
  infoVitesseLigne.setAttribute("aria-hidden", "false");

  if (temporisationInfoVitesse) {
    clearTimeout(temporisationInfoVitesse);
  }
  temporisationInfoVitesse = setTimeout(() => {
    masquerMessageInfoVitesseLigne();
    temporisationInfoVitesse = null;
  }, 5200);
}

function masquerMessageInfoPk() {
  if (!infoPk) {
    return;
  }
  infoPk.classList.remove("est-visible");
  infoPk.setAttribute("aria-hidden", "true");
}

function afficherMessageInfoPk() {
  if (!infoPk) {
    return;
  }
  infoPk.classList.add("est-visible");
  infoPk.setAttribute("aria-hidden", "false");

  if (temporisationInfoPk) {
    clearTimeout(temporisationInfoPk);
  }
  temporisationInfoPk = setTimeout(() => {
    masquerMessageInfoPk();
    temporisationInfoPk = null;
  }, 2800);
}

function fermerPopupCarte(options = {}) {
  const { localiserPoint = false } = options;
  const coordonnees = Array.isArray(coordonneesDerniereFiche) ? [...coordonneesDerniereFiche] : null;
  const preserveNavigationLock = Boolean(options.preserveNavigationLock);
  if (!preserveNavigationLock) {
    conserverFichePendantNavigation = false;
  }
  if (!popupCarte) {
    if (localiserPoint && coordonnees) {
      demarrerClignotementLocalisation(coordonnees[0], coordonnees[1]);
    }
    return;
  }
  popupCarte.remove();
  popupCarte = null;
  navigationInternePopup = null;
  contextePartageFiche = null;
  modalFiche?.classList.remove("est-vue-appareils-associes");
  if (boutonPartagerModalFiche) {
    boutonPartagerModalFiche.hidden = false;
    boutonPartagerModalFiche.style.display = "";
  }
  if (localiserPoint && coordonnees) {
    demarrerClignotementLocalisation(coordonnees[0], coordonnees[1]);
  }
}

function assurerElementsModalFiche() {
  if (modalFiche && modalFicheContenu && boutonFermerModalFiche && boutonPartagerModalFiche) {
    return true;
  }

  const existante = document.getElementById("modal-fiche");
  if (existante) {
    modalFiche = existante;
    modalFicheContenu = document.getElementById("modal-fiche-contenu");
    boutonFermerModalFiche = document.getElementById("modal-fiche-fermer");
    boutonPartagerModalFiche = document.getElementById("modal-fiche-partager");
    return Boolean(modalFicheContenu && boutonFermerModalFiche && boutonPartagerModalFiche);
  }

  const racine = document.createElement("div");
  racine.className = "modal-fiche";
  racine.id = "modal-fiche";
  racine.setAttribute("role", "dialog");
  racine.setAttribute("aria-modal", "true");
  racine.setAttribute("aria-label", "Fiche");
  racine.setAttribute("aria-hidden", "true");
  racine.innerHTML = `
    <div class="modal-fiche-carte">
      <button class="modal-fiche-partager" id="modal-fiche-partager" type="button" aria-label="Partager la fiche">
        <svg class="modal-fiche-partager-icone" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v12" />
          <path d="M8.5 6.5 12 3l3.5 3.5" />
          <path d="M6 10.5v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7" />
        </svg>
      </button>
      <button class="modal-fiche-fermer" id="modal-fiche-fermer" type="button" aria-label="Fermer la fiche">×</button>
      <div class="modal-fiche-contenu maplibregl-popup-content" id="modal-fiche-contenu"></div>
    </div>
  `;
  document.body.appendChild(racine);

  modalFiche = racine;
  modalFicheContenu = document.getElementById("modal-fiche-contenu");
  boutonFermerModalFiche = document.getElementById("modal-fiche-fermer");
  boutonPartagerModalFiche = document.getElementById("modal-fiche-partager");
  return Boolean(modalFicheContenu && boutonFermerModalFiche && boutonPartagerModalFiche);
}

function creerPopupFicheModale() {
  assurerElementsModalFiche();
  const callbacksFermeture = [];
  let estFermee = false;

  const instance = {
    setLngLat() {
      return instance;
    },
    setHTML(html) {
      if (modalFicheContenu) {
        modalFicheContenu.innerHTML = html;
      }
      return instance;
    },
    addTo() {
      if (modalFiche) {
        const actif = document.activeElement;
        if (actif instanceof HTMLElement && !modalFiche.contains(actif)) {
          elementRetourFocusModalFiche = actif;
        }
        modalFiche.classList.add("est-visible");
        modalFiche.setAttribute("aria-hidden", "false");
        window.requestAnimationFrame(() => {
          boutonFermerModalFiche?.focus({ preventScroll: true });
        });
      }
      return instance;
    },
    getElement() {
      return modalFicheContenu;
    },
    on(event, callback) {
      if (event === "close" && typeof callback === "function") {
        callbacksFermeture.push(callback);
      }
      return instance;
    },
    remove() {
      if (estFermee) {
        return;
      }
      estFermee = true;
      if (modalFiche) {
        const actif = document.activeElement;
        if (actif instanceof HTMLElement && modalFiche.contains(actif)) {
          if (elementRetourFocusModalFiche instanceof HTMLElement && elementRetourFocusModalFiche.isConnected) {
            elementRetourFocusModalFiche.focus({ preventScroll: true });
          } else {
            actif.blur();
          }
        }
        modalFiche.classList.remove("est-visible");
        modalFiche.setAttribute("aria-hidden", "true");
      }
      if (modalFicheContenu) {
        modalFicheContenu.innerHTML = "";
      }
      for (const callback of callbacksFermeture) {
        try {
          callback();
        } catch {
          // Ignore un callback de fermeture en erreur.
        }
      }
    }
  };

  return instance;
}

function estContexteMobile() {
  return window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;
}

function recadrerCartePourPopupMobile(longitude, latitude) {
  if (!estContexteMobile() || !Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  const decalageVertical = Math.min(200, Math.round(window.innerHeight * 0.22));
  recadragePopupMobileEnCours = true;
  carte.once("moveend", () => {
    recadragePopupMobileEnCours = false;
  });
  setTimeout(() => {
    recadragePopupMobileEnCours = false;
  }, 700);
  carte.easeTo({
    center: [longitude, latitude],
    offset: [0, decalageVertical],
    duration: 280,
    essential: true
  });
}

function demarrerNavigationPopupProgrammatique() {
  navigationPopupProgrammatiqueEnCours = true;
}

function terminerNavigationPopupProgrammatique() {
  navigationPopupProgrammatiqueEnCours = false;
}

function bloquerZoomTactileHorsCarte() {
  const estDansCanvasCarte = (cible) => {
    return cible instanceof Node && carte.getCanvas().contains(cible);
  };

  const bloquerSiHorsCarte = (event) => {
    if (!estDansCanvasCarte(event.target)) {
      event.preventDefault();
    }
  };

  document.addEventListener("gesturestart", bloquerSiHorsCarte, { passive: false });
  document.addEventListener("gesturechange", bloquerSiHorsCarte, { passive: false });
  document.addEventListener("touchmove", (event) => {
    if (event.touches?.length > 1 && !estDansCanvasCarte(event.target)) {
      event.preventDefault();
    }
  }, { passive: false });
}

function formaterCoordonneeMenu(valeur) {
  return Number(valeur).toFixed(5);
}

function construireUrlPartagePosition(latitude, longitude) {
  return `${location.origin}${location.pathname}?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&z=18&marker=true`;
}

function normaliserTypePartageFiche(type) {
  const brut = String(type || "")
    .trim()
    .toLowerCase();
  if (brut === "poste" || brut === "postes") {
    return "postes";
  }
  if (brut === "appareil" || brut === "appareils") {
    return "appareils";
  }
  if (brut === "acces" || brut === "accès" || brut === "access") {
    return "acces";
  }
  return "";
}

function construireUrlPartageFiche(contexte) {
  const latitude = Number(contexte?.latitude);
  const longitude = Number(contexte?.longitude);
  const type = normaliserTypePartageFiche(contexte?.type);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !type) {
    return "";
  }

  const url = new URL(`${location.origin}${location.pathname}`);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("z", "18");
  url.searchParams.set("type", type);
  url.searchParams.set("fiche", "1");

  const cibleSat = String(contexte?.cibleSatPoste || "").trim();
  if (cibleSat) {
    url.searchParams.set("sat", cibleSat);
  }

  return url.toString();
}

async function partagerFicheCourante() {
  const lien = construireUrlPartageFiche(contextePartageFiche);
  if (!lien) {
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Fiche ALICE",
        text: "Ouvrir cette fiche",
        url: lien
      });
      return;
    } catch (erreur) {
      // Si l'utilisateur annule la feuille de partage, on sort sans fallback.
      if (erreur?.name === "AbortError") {
        return;
      }
      // Sinon: fallback copie.
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(lien);
      return;
    } catch {
      // Fallback ultime plus bas.
    }
  }

  window.prompt("Copiez ce lien :", lien);
}

function obtenirLienImajnetDepuisContexte() {
  const valeurFeature = String(contexteMenuFeature?.properties?.imajnet || "").trim();
  if (valeurFeature) {
    return valeurFeature;
  }

  const valeurListe = (contexteMenuFeature?.properties?.appareils_liste_json || "").trim();
  if (valeurListe) {
    try {
      const liste = JSON.parse(valeurListe);
      const trouve = Array.isArray(liste) ? liste.find((item) => String(item?.imajnet || "").trim()) : null;
      const valeur = String(trouve?.imajnet || "").trim();
      if (valeur) {
        return valeur;
      }
    } catch {
      // Ignore les JSON invalides.
    }
  }

  const { latitude, longitude } = contexteMenuPosition;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return "https://gecko.imajnet.net/";
  }
  return `https://gecko.imajnet.net/#map=OSM;zoom=18;loc=${latitude},${longitude};`;
}

function obtenirDistanceMetres(pointA, pointB) {
  return new maplibregl.LngLat(pointA[0], pointA[1]).distanceTo(new maplibregl.LngLat(pointB[0], pointB[1]));
}

function formaterDistanceMetres(distanceMetres) {
  if (distanceMetres < 1000) {
    return `${distanceMetres.toFixed(1)} m`;
  }
  return `${(distanceMetres / 1000).toFixed(2)} km`;
}

function supprimerPointLocalisation() {
  if (marqueurLocalisation) {
    marqueurLocalisation.remove();
    marqueurLocalisation = null;
  }
}

function supprimerMarqueurClicContextuel() {
  if (minuterieClignotementMarqueurClic) {
    clearInterval(minuterieClignotementMarqueurClic);
    minuterieClignotementMarqueurClic = null;
  }
  if (minuterieSuppressionMarqueurClic) {
    clearTimeout(minuterieSuppressionMarqueurClic);
    minuterieSuppressionMarqueurClic = null;
  }
  if (marqueurClicContextuel) {
    marqueurClicContextuel.remove();
    marqueurClicContextuel = null;
  }
}

function afficherMarqueurClicContextuel(longitude, latitude, options = {}) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  supprimerMarqueurClicContextuel();
  const element = document.createElement("div");
  element.className = "marqueur-clic-contextuel";
  marqueurClicContextuel = new maplibregl.Marker({ element, anchor: "center" }).setLngLat([longitude, latitude]).addTo(carte);

  if (!options.clignoter) {
    return;
  }

  let visible = true;
  minuterieClignotementMarqueurClic = setInterval(() => {
    if (!element.isConnected) {
      return;
    }
    visible = !visible;
    element.style.opacity = visible ? "1" : "0.2";
  }, 280);

  if (options.attendreFermetureFicheAvantSuppression) {
    return;
  }
  const delaiSuppression = Number.isFinite(options.autoRemoveMs) ? Math.max(0, options.autoRemoveMs) : 7000;
  minuterieSuppressionMarqueurClic = setTimeout(() => {
    supprimerMarqueurClicContextuel();
  }, delaiSuppression);
}

function arreterClignotementLocalisation() {
  if (minuterieClignotementLocalisation) {
    clearInterval(minuterieClignotementLocalisation);
    minuterieClignotementLocalisation = null;
  }
  if (minuterieArretLocalisation) {
    clearTimeout(minuterieArretLocalisation);
    minuterieArretLocalisation = null;
  }
  supprimerPointLocalisation();
}

function demarrerClignotementLocalisation(longitude, latitude, options = {}) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  arreterClignotementLocalisation();
  const element = document.createElement("div");
  element.className = "point-localisation-clignotant";
  marqueurLocalisation = new maplibregl.Marker({ element, anchor: "center" }).setLngLat([longitude, latitude]).addTo(carte);

  let visible = true;
  minuterieClignotementLocalisation = setInterval(() => {
    visible = !visible;
    if (!element) {
      return;
    }
    element.style.opacity = visible ? "1" : "0.15";
  }, 390);
  if (options.attendreFermetureFicheAvantArret) {
    return;
  }
  minuterieArretLocalisation = setTimeout(() => {
    arreterClignotementLocalisation();
  }, 5000);
}

function chargerScriptItineraire() {
  if (window.creerModuleItineraireAlice) {
    return Promise.resolve(window.creerModuleItineraireAlice);
  }
  if (promesseChargementModuleItineraire) {
    return promesseChargementModuleItineraire;
  }

  promesseChargementModuleItineraire = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./itineraire.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.creerModuleItineraireAlice === "function") {
        resolve(window.creerModuleItineraireAlice);
      } else {
        reject(new Error("Module itinéraire introuvable après chargement."));
      }
    };
    script.onerror = () => {
      reject(new Error("Impossible de charger itineraire.js"));
    };
    document.head.appendChild(script);
  }).finally(() => {
    promesseChargementModuleItineraire = null;
  });

  return promesseChargementModuleItineraire;
}

async function obtenirModuleItineraire() {
  if (moduleItineraire) {
    return moduleItineraire;
  }

  const creerModule = await chargerScriptItineraire();
  moduleItineraire = creerModule({
    maplibre: maplibregl,
    centreInitial: CENTRE_INITIAL,
    chargerDonneesAcces,
    getDonneesAcces: () => donneesAcces,
    normaliserTexteRecherche,
    champCompletOuVide,
    extraireListeDepuisFeature,
    echapperHtml,
    obtenirDistanceMetres,
    fermerMenusGlobalement: () => {
      fermerMenuFonds();
      fermerMenuFiltres();
      fermerResultatsRecherche();
      fermerMenuContextuel();
      fermerMenuLegende();
    }
  });
  return moduleItineraire;
}

function chargerScriptLocalisation() {
  if (window.creerModuleLocalisationAlice) {
    return Promise.resolve(window.creerModuleLocalisationAlice);
  }
  if (promesseChargementModuleLocalisation) {
    return promesseChargementModuleLocalisation;
  }

  promesseChargementModuleLocalisation = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./localisation.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.creerModuleLocalisationAlice === "function") {
        resolve(window.creerModuleLocalisationAlice);
      } else {
        reject(new Error("Module localisation introuvable après chargement."));
      }
    };
    script.onerror = () => {
      reject(new Error("Impossible de charger localisation.js"));
    };
    document.head.appendChild(script);
  }).catch((erreur) => {
    promesseChargementModuleLocalisation = null;
    throw erreur;
  });

  return promesseChargementModuleLocalisation;
}

async function obtenirModuleLocalisation() {
  if (moduleLocalisation) {
    return moduleLocalisation;
  }

  const creerModule = await chargerScriptLocalisation();
  moduleLocalisation = creerModule({
    carte,
    chargerDonneesAcces,
    chargerDonneesPostes,
    chargerDonneesAppareils,
    getDonneesAcces: () => donneesAcces,
    getDonneesPostes: () => donneesPostes,
    getDonneesAppareils: () => donneesAppareils,
    estHorsPatrimoine,
    echapperHtml,
    formaterDistanceMetres,
    obtenirDistanceMetres,
    demarrerClignotementLocalisation,
    activerFiltrePourType,
    appliquerCouchesDonnees,
    remonterCouchesDonnees,
    ouvrirPopupDepuisCoordonneesPourType,
    naviguerVersCoordonneesPuisOuvrirPopup,
    fermerMenusGlobalement: () => {
      fermerMenuFonds();
      fermerMenuFiltres();
      fermerResultatsRecherche();
      fermerMenuContextuel();
      fermerMenuLegende();
    }
  });

  return moduleLocalisation;
}

function construireDonneesSourceMesure() {
  const featuresPoints = mesurePoints.map((coordonnees, index) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordonnees
    },
    properties: {
      lettre: String.fromCharCode(65 + index)
    }
  }));

  const features = [...featuresPoints];
  if (mesurePoints.length >= 2) {
    features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: mesurePoints
      },
      properties: {}
    });
  }

  return {
    type: "FeatureCollection",
    features
  };
}

function assurerSourceEtCouchesMesure() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_MESURE)) {
    carte.addSource(SOURCE_MESURE, {
      type: "geojson",
      data: construireDonneesSourceMesure()
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_LIGNES)) {
    carte.addLayer({
      id: COUCHE_MESURE_LIGNES,
      type: "line",
      source: SOURCE_MESURE,
      filter: ["==", ["geometry-type"], "LineString"],
      paint: {
        "line-color": "#ef4444",
        "line-width": 3.2
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_POINTS)) {
    carte.addLayer({
      id: COUCHE_MESURE_POINTS,
      type: "circle",
      source: SOURCE_MESURE,
      filter: ["==", ["geometry-type"], "Point"],
      paint: {
        "circle-radius": 6,
        "circle-color": "#ffffff",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#111111"
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_LABELS)) {
    carte.addLayer({
      id: COUCHE_MESURE_LABELS,
      type: "symbol",
      source: SOURCE_MESURE,
      filter: ["==", ["geometry-type"], "Point"],
      layout: {
        "text-field": ["get", "lettre"],
        "text-size": 12,
        "text-offset": [0, -1.1],
        "text-font": ["Open Sans Bold"]
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-color": "rgba(15, 23, 42, 0.88)",
        "text-halo-width": 1.5
      }
    });
  }
}

function rafraichirAffichageMesure() {
  assurerSourceEtCouchesMesure();
  const source = carte.getSource(SOURCE_MESURE);
  if (source) {
    source.setData(construireDonneesSourceMesure());
  }
}

function masquerPanneauMesure() {
  if (!panneauMesure) {
    return;
  }
  panneauMesure.classList.remove("est-visible");
}

function mettreAJourPanneauMesure() {
  if (!textePanneauMesure) {
    return;
  }

  if (mesurePoints.length < 2) {
    textePanneauMesure.textContent = "";
    masquerPanneauMesure();
    return;
  }

  let total = 0;
  const lignes = [];

  for (let i = 1; i < mesurePoints.length; i += 1) {
    const pointA = mesurePoints[i - 1];
    const pointB = mesurePoints[i];
    const distance = obtenirDistanceMetres(pointA, pointB);
    total += distance;

    const lettreA = String.fromCharCode(64 + i);
    const lettreB = String.fromCharCode(65 + i);
    lignes.push(`${lettreA} -> ${lettreB} : ${formaterDistanceMetres(distance)}`);
  }

  lignes.push("---------------------");
  lignes.push(`Total : ${formaterDistanceMetres(total)}`);
  textePanneauMesure.textContent = lignes.join("\n");

  if (panneauMesure) {
    panneauMesure.classList.add("est-visible");
  }
}

function reinitialiserMesure() {
  mesurePoints = [];
  rafraichirAffichageMesure();
  mettreAJourPanneauMesure();
}

function mettreAJourEtatMesureUI() {
  if (boutonSortieMesure) {
    boutonSortieMesure.classList.toggle("est-visible", mesureActive);
  }

  if (boutonCtxRegle) {
    boutonCtxRegle.textContent = mesureActive ? "❌ Quitter le traçage" : "📏 Règle / Traçage";
  }
}

function quitterModeMesure() {
  reinitialiserMesure();
  mesureActive = false;
  mettreAJourEtatMesureUI();
}

function activerModeMesure() {
  reinitialiserMesure();
  mesureActive = true;
  mettreAJourEtatMesureUI();
}

function ajouterPointMesure(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  mesurePoints.push([longitude, latitude]);
  rafraichirAffichageMesure();
  mettreAJourPanneauMesure();
}

function ouvrirMenuContextuel(event, feature) {
  if (!menuContextuelCarte) {
    return;
  }

  if (sousMenuItin) {
    sousMenuItin.classList.remove("est-visible");
    sousMenuItin.setAttribute("aria-hidden", "true");
  }

  const { lng, lat } = event.lngLat || {};
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    return;
  }

  contexteMenuPosition = { longitude: lng, latitude: lat };
  contexteMenuFeature = feature || null;
  afficherMarqueurClicContextuel(lng, lat);

  if (boutonCtxCoord) {
    boutonCtxCoord.textContent = `📍 ${formaterCoordonneeMenu(lat)}, ${formaterCoordonneeMenu(lng)}`;
  }

  const eventDom = event.originalEvent;
  const marge = 10;
  const toucher = eventDom?.touches?.[0] || eventDom?.changedTouches?.[0] || null;
  let clientX = Number(toucher?.clientX ?? eventDom?.clientX);
  let clientY = Number(toucher?.clientY ?? eventDom?.clientY);
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
    const pointConteneur = carte.project([lng, lat]);
    const rectCarte = carte.getContainer()?.getBoundingClientRect();
    if (pointConteneur && rectCarte) {
      clientX = rectCarte.left + pointConteneur.x;
      clientY = rectCarte.top + pointConteneur.y;
    }
  }

  menuContextuelCarte.classList.add("est-visible");
  menuContextuelCarte.setAttribute("aria-hidden", "false");

  const largeur = menuContextuelCarte.offsetWidth;
  const hauteur = menuContextuelCarte.offsetHeight;
  const estEcranTactile = window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
  const rayonMarqueur = estEcranTactile ? 16 : 12;
  const margeSeparatrice = estEcranTactile ? 14 : 8;
  const decalageCoin = rayonMarqueur + margeSeparatrice;

  let gauche = 28;
  let haut = 28;

  if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
    const gaucheMin = marge;
    const hautMin = marge;
    const gaucheMax = Math.max(gaucheMin, window.innerWidth - largeur - marge);
    const hautMax = Math.max(hautMin, window.innerHeight - hauteur - marge);
    const contraindre = (valeur, min, max) => Math.max(min, Math.min(max, valeur));
    const prefererDroite = clientX <= window.innerWidth / 2;
    const prefererBas = clientY <= window.innerHeight / 2;
    const premierQuadrant = `${prefererBas ? "bas" : "haut"}-${prefererDroite ? "droite" : "gauche"}`;
    const ordreQuadrants = [
      premierQuadrant,
      `${prefererBas ? "bas" : "haut"}-${prefererDroite ? "gauche" : "droite"}`,
      `${prefererBas ? "haut" : "bas"}-${prefererDroite ? "droite" : "gauche"}`,
      `${prefererBas ? "haut" : "bas"}-${prefererDroite ? "gauche" : "droite"}`
    ];

    const candidatDepuisQuadrant = (quadrant) => {
      if (quadrant === "bas-droite") {
        return { gauche: clientX + decalageCoin, haut: clientY + decalageCoin };
      }
      if (quadrant === "bas-gauche") {
        return { gauche: clientX - largeur - decalageCoin, haut: clientY + decalageCoin };
      }
      if (quadrant === "haut-droite") {
        return { gauche: clientX + decalageCoin, haut: clientY - hauteur - decalageCoin };
      }
      return { gauche: clientX - largeur - decalageCoin, haut: clientY - hauteur - decalageCoin };
    };

    const rayonProtection = rayonMarqueur + margeSeparatrice + 2;
    let candidatChoisi = null;
    let meilleurScore = Number.POSITIVE_INFINITY;
    for (let i = 0; i < ordreQuadrants.length; i += 1) {
      const quadrant = ordreQuadrants[i];
      const brut = candidatDepuisQuadrant(quadrant);
      const cg = contraindre(brut.gauche, gaucheMin, gaucheMax);
      const ch = contraindre(brut.haut, hautMin, hautMax);

      const recouvrePoint =
        clientX >= cg - rayonProtection &&
        clientX <= cg + largeur + rayonProtection &&
        clientY >= ch - rayonProtection &&
        clientY <= ch + hauteur + rayonProtection;
      const deplacementParClamp = Math.abs(cg - brut.gauche) + Math.abs(ch - brut.haut);
      const score = (recouvrePoint ? 1_000_000 : 0) + deplacementParClamp * 100 + i;
      if (score < meilleurScore) {
        meilleurScore = score;
        candidatChoisi = { gauche: cg, haut: ch };
      }
    }

    gauche = candidatChoisi?.gauche ?? gauche;
    haut = candidatChoisi?.haut ?? haut;
  }

  menuContextuelCarte.style.left = `${Math.round(gauche)}px`;
  menuContextuelCarte.style.top = `${Math.round(haut)}px`;
  menuContextuelOuvert = true;
}

function fermerMenuContextuel() {
  if (!menuContextuelCarte || !menuContextuelOuvert) {
    return;
  }
  menuContextuelCarte.classList.remove("est-visible");
  menuContextuelCarte.setAttribute("aria-hidden", "true");
  if (sousMenuItin) {
    sousMenuItin.classList.remove("est-visible");
    sousMenuItin.setAttribute("aria-hidden", "true");
  }
  supprimerMarqueurClicContextuel();
  menuContextuelOuvert = false;
}

function basculerSousMenuItineraire() {
  if (!sousMenuItin) {
    return;
  }
  const ouvert = sousMenuItin.classList.contains("est-visible");
  if (ouvert) {
    sousMenuItin.classList.remove("est-visible");
    sousMenuItin.setAttribute("aria-hidden", "true");
    return;
  }
  sousMenuItin.classList.add("est-visible");
  sousMenuItin.setAttribute("aria-hidden", "false");
}

function initialiserModalStreetViewContextuelle() {
  if (modalStreetViewContextuelle && iframeStreetViewContextuelle) {
    return;
  }
  const conteneur = document.createElement("div");
  conteneur.innerHTML =
    '<div class="popup-streetview-modal" id="ctx-streetview-modal" hidden><div class="popup-streetview-dialog" role="dialog" aria-modal="true" aria-label="Street View"><button class="popup-streetview-fermer" id="ctx-fermer-street-view" type="button" aria-label="Fermer">✕</button><iframe class="popup-streetview-iframe" id="ctx-streetview-iframe" title="Street View" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div>';
  const modal = conteneur.firstElementChild;
  if (!modal) {
    return;
  }
  document.body.appendChild(modal);
  modalStreetViewContextuelle = modal;
  iframeStreetViewContextuelle = modal.querySelector("#ctx-streetview-iframe");
  const boutonFermerStreetViewContextuel = modal.querySelector("#ctx-fermer-street-view");

  const fermer = () => {
    if (!modalStreetViewContextuelle) {
      return;
    }
    modalStreetViewContextuelle.setAttribute("hidden", "hidden");
    if (iframeStreetViewContextuelle) {
      iframeStreetViewContextuelle.removeAttribute("src");
    }
  };

  if (boutonFermerStreetViewContextuel) {
    boutonFermerStreetViewContextuel.addEventListener("click", fermer);
  }
  modalStreetViewContextuelle.addEventListener("click", (event) => {
    if (event.target === modalStreetViewContextuelle) {
      fermer();
    }
  });
}

function ouvrirStreetViewEnSurimpression(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  initialiserModalStreetViewContextuelle();
  if (!modalStreetViewContextuelle || !iframeStreetViewContextuelle) {
    return;
  }
  const urlStreetView = `https://maps.google.com/maps?layer=c&cbll=${latitude},${longitude}&cbp=11,0,0,0,0&output=svembed`;
  iframeStreetViewContextuelle.setAttribute("src", urlStreetView);
  modalStreetViewContextuelle.removeAttribute("hidden");
}

function fermerMenuLegende() {
  if (!menuLegendeCarte || !menuLegendeOuvert) {
    return;
  }
  menuLegendeCarte.classList.remove("est-visible");
  menuLegendeCarte.setAttribute("aria-hidden", "true");
  if (boutonInfoCarte) {
    boutonInfoCarte.setAttribute("aria-expanded", "false");
  }
  menuLegendeOuvert = false;
}

function ouvrirMenuLegende() {
  if (!menuLegendeCarte) {
    return;
  }
  menuLegendeCarte.classList.add("est-visible");
  menuLegendeCarte.setAttribute("aria-hidden", "false");
  if (boutonInfoCarte) {
    boutonInfoCarte.setAttribute("aria-expanded", "true");
  }
  menuLegendeOuvert = true;
}

function basculerMenuLegende() {
  if (menuLegendeOuvert) {
    fermerMenuLegende();
    return;
  }
  ouvrirMenuLegende();
}

function applicationDejaInstallee() {
  const estStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
  const estStandaloneIos = window.navigator?.standalone === true;
  return Boolean(estStandalone || estStandaloneIos);
}

function mettreAJourEtatInstallationPwa() {
  if (!boutonInstallerPwa || !messageInstallerPwa) {
    return;
  }

  if (applicationDejaInstallee()) {
    boutonInstallerPwa.hidden = true;
    boutonInstallerPwa.disabled = true;
    messageInstallerPwa.textContent = "ALICE est déjà installée sur cet appareil.";
    return;
  }

  if (evenementInstallationPwaDiffere) {
    boutonInstallerPwa.hidden = false;
    boutonInstallerPwa.disabled = false;
    boutonInstallerPwa.textContent = "Installer ALICE";
    messageInstallerPwa.textContent = "Ajoutez ALICE sur l'écran d'accueil pour un accès rapide.";
    return;
  }

  boutonInstallerPwa.hidden = true;
  boutonInstallerPwa.disabled = true;
  messageInstallerPwa.textContent = "Installez ALICE via le menu du navigateur (Partager ou Installer l'application).";
}

function ouvrirModalApropos() {
  if (!modalApropos) {
    return;
  }
  const actif = document.activeElement;
  if (actif instanceof HTMLElement && !modalApropos.contains(actif)) {
    elementRetourFocusModalApropos = actif;
  }
  modalApropos.classList.add("est-visible");
  modalApropos.setAttribute("aria-hidden", "false");
  mettreAJourEtatInstallationPwa();
  fermerMenuLegende();
  window.requestAnimationFrame(() => {
    boutonFermerModalApropos?.focus({ preventScroll: true });
  });
}

function fermerModalApropos() {
  if (!modalApropos) {
    return;
  }
  const actifAvantFermeture = document.activeElement;
  if (actifAvantFermeture instanceof HTMLElement && modalApropos.contains(actifAvantFermeture)) {
    if (elementRetourFocusModalApropos instanceof HTMLElement && elementRetourFocusModalApropos.isConnected) {
      elementRetourFocusModalApropos.focus({ preventScroll: true });
    } else if (champRecherche instanceof HTMLElement) {
      champRecherche.focus({ preventScroll: true });
    } else {
      actifAvantFermeture.blur();
    }
  }

  const actifApresRestauration = document.activeElement;
  if (actifApresRestauration instanceof HTMLElement && modalApropos.contains(actifApresRestauration)) {
    actifApresRestauration.blur();
  }

  modalApropos.classList.remove("est-visible");
  modalApropos.setAttribute("aria-hidden", "true");
  try {
    localStorage.setItem(CLE_STOCKAGE_APROPOS_VU, "1");
  } catch {
    // Ignore les erreurs de stockage.
  }
}

function doitAfficherModalAproposPremiereVisite() {
  try {
    return localStorage.getItem(CLE_STOCKAGE_APROPOS_VU) !== "1";
  } catch {
    return true;
  }
}

if (boutonInstallerPwa) {
  boutonInstallerPwa.addEventListener("click", async () => {
    if (!evenementInstallationPwaDiffere) {
      mettreAJourEtatInstallationPwa();
      return;
    }

    const evenement = evenementInstallationPwaDiffere;
    evenementInstallationPwaDiffere = null;
    boutonInstallerPwa.disabled = true;
    boutonInstallerPwa.textContent = "Installation...";
    messageInstallerPwa.textContent = "Confirmation demandée par le navigateur.";

    try {
      await evenement.prompt();
      const resultat = await evenement.userChoice;
      if (resultat?.outcome === "accepted") {
        messageInstallerPwa.textContent = "Installation lancée.";
      } else {
        messageInstallerPwa.textContent = "Installation annulée.";
      }
    } catch {
      messageInstallerPwa.textContent = "Impossible de lancer l'installation.";
    }

    mettreAJourEtatInstallationPwa();
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  evenementInstallationPwaDiffere = event;
  mettreAJourEtatInstallationPwa();
});

window.addEventListener("appinstalled", () => {
  evenementInstallationPwaDiffere = null;
  mettreAJourEtatInstallationPwa();
});

mettreAJourEtatInstallationPwa();

async function localiserUtilisateurCarte(options = {}) {
  try {
    const module = await obtenirModuleLocalisation();
    if (options.ouvrirPanneauResultats) {
      module?.localiserEtAfficher?.();
      return;
    }
    module?.localiserSimple?.();
  } catch (erreur) {
    console.error("Impossible de charger le module de localisation", erreur);
    alert("Impossible d'ouvrir la localisation.");
  }
}

async function partagerPositionContextuelle() {
  const { latitude, longitude } = contexteMenuPosition;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return;
  }

  const lien = construireUrlPartagePosition(latitude, longitude);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Position carte",
        text: `Position: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        url: lien
      });
      return;
    } catch (erreur) {
      // Si l'utilisateur annule la feuille de partage, on sort sans fallback.
      if (erreur?.name === "AbortError") {
        return;
      }
      // Sinon: fallback copie.
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(lien);
      return;
    } catch {
      // Fallback ultime plus bas.
    }
  }

  window.prompt("Copiez ce lien :", lien);
}

actualiserPlaceholderRecherche();
window.addEventListener("resize", () => {
  actualiserPlaceholderRecherche();
  planifierResizeCarte();
  planifierMiseAJourPk();
}, { passive: true });
window.addEventListener("orientationchange", () => {
  planifierResizeCarte();
  planifierMiseAJourPk();
}, { passive: true });
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    planifierResizeCarte();
    planifierMiseAJourPk();
  }, { passive: true });
  window.visualViewport.addEventListener("scroll", () => {
    planifierResizeCarte();
    planifierMiseAJourPk();
  }, { passive: true });
}

function calculerTotalEntrees(donnees, cleCount) {
  if (!donnees?.features) {
    return 0;
  }

  return donnees.features.reduce((total, feature) => {
    const valeur = Number(feature?.properties?.[cleCount]);
    return total + (Number.isFinite(valeur) ? valeur : 0);
  }, 0);
}

function calculerTotalPostesPourCompteur(donnees) {
  if (!donnees?.features) {
    return 0;
  }

  const hpKeys = new Set();
  const postesUniques = new Set();

  for (const feature of donnees.features) {
    const propr = feature?.properties || {};
    const nom = String(propr.nom || "").trim();
    const type = String(propr.type || "").trim();
    const cle = `${nom.toLowerCase()}__${type.toLowerCase()}`;

    if (estHorsPatrimoine(propr.hors_patrimoine)) {
      hpKeys.add(cle);
    }

    if (estHorsPatrimoine(propr.special)) {
      continue;
    }

    postesUniques.add(cle);
  }

  let total = 0;
  for (const cle of postesUniques) {
    if (hpKeys.has(cle)) {
      continue;
    }
    total += 1;
  }

  return total;
}

function mettreAJourCompteursFiltres() {
  if (compteurAppareils) {
    const totalAppareils = totalAppareilsBrut || calculerTotalEntrees(donneesAppareils, "appareils_count");
    compteurAppareils.textContent = `(${totalAppareils})`;
  }
  if (compteurAcces) {
    compteurAcces.textContent = `(${calculerTotalEntrees(donneesAcces, "acces_count")})`;
  }
  if (compteurPostes) {
    const totalPostes = donneesPostes ? totalPostesBrut : calculerTotalEntrees(donneesPostes, "postes_count");
    compteurPostes.textContent = `(${totalPostes})`;
  }
}

function estAffichageMobilePk() {
  return window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
}

function determinerPasPkMetres(zoomEffectif) {
  if (zoomEffectif < PK_ZOOM_MIN) {
    return Infinity;
  }
  if (zoomEffectif < 12) {
    return 10000;
  }
  if (zoomEffectif < 13) {
    return 5000;
  }
  if (zoomEffectif < 14) {
    return 1000;
  }
  if (zoomEffectif < 15) {
    return 800;
  }
  if (zoomEffectif < 16) {
    return 400;
  }
  if (zoomEffectif < 17) {
    return 200;
  }
  return 0;
}

function formaterPkAffichage(valeurPk) {
  const texte = String(valeurPk ?? "").trim().replace(",", ".");
  const nombre = Number(texte);
  if (!Number.isFinite(nombre)) {
    return texte ? `PK ${texte}` : "PK";
  }

  const signe = nombre < 0 ? "-" : "";
  const absolu = Math.abs(nombre);
  let kilometres = Math.floor(absolu);
  let metres = Math.round((absolu - kilometres) * 1000);
  if (metres >= 1000) {
    kilometres += 1;
    metres = 0;
  }
  const metresBornes = Math.max(0, metres);
  return `PK ${signe}${kilometres}+${String(metresBornes).padStart(3, "0")}`;
}

function estLongitudeDansBornes(longitude, ouest, est) {
  if (ouest <= est) {
    return longitude >= ouest && longitude <= est;
  }
  return longitude >= ouest || longitude <= est;
}

function estCoordonneeDansVue(bounds, longitude, latitude) {
  if (!bounds) {
    return false;
  }
  const sud = bounds.getSouth();
  const nord = bounds.getNorth();
  const ouest = bounds.getWest();
  const est = bounds.getEast();
  if (latitude < sud || latitude > nord) {
    return false;
  }
  return estLongitudeDansBornes(longitude, ouest, est);
}

function filtrerPkPourVue() {
  if (!donneesPk?.features?.length) {
    return PK_VIDE;
  }

  const bonusMobile = estAffichageMobilePk() ? 1 : 0;
  const zoomEffectif = carte.getZoom() + bonusMobile;
  const pasMetres = determinerPasPkMetres(zoomEffectif);
  if (!Number.isFinite(pasMetres)) {
    return PK_VIDE;
  }

  const bounds = carte.getBounds();
  const uniques = new Set();
  const features = [];

  for (const feature of donneesPk.features) {
    const [longitude, latitude] = feature?.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    if (!estCoordonneeDansVue(bounds, longitude, latitude)) {
      continue;
    }

    const codeLigne = String(feature?.properties?.code_ligne || "");
    const pkKm = Number(String(feature?.properties?.pk ?? "").replace(",", "."));
    const pkMetres = Number.isFinite(pkKm) ? Math.round(pkKm * 1000) : null;

    if (pasMetres > 0 && Number.isFinite(pkMetres)) {
      const modulo = ((pkMetres % pasMetres) + pasMetres) % pasMetres;
      if (modulo !== 0) {
        continue;
      }
    }

    if (Number.isFinite(pkMetres)) {
      const cleUnique = `${codeLigne}|${pkMetres}`;
      if (uniques.has(cleUnique)) {
        continue;
      }
      uniques.add(cleUnique);
    }

    const properties = {
      ...(feature?.properties || {}),
      pk_affichage: formaterPkAffichage(feature?.properties?.pk)
    };
    features.push({
      ...feature,
      properties
    });
  }

  return { type: "FeatureCollection", features };
}

function mettreAJourAffichagePk() {
  const bonusMobile = estAffichageMobilePk() ? 1 : 0;
  const zoomEffectif = carte.getZoom() + bonusMobile;
  const doitAfficher = afficherPk && Boolean(donneesPk?.features?.length) && zoomEffectif >= PK_ZOOM_MIN;
  if (afficherPk && zoomEffectif < PK_ZOOM_MIN) {
    afficherMessageInfoPk();
  } else {
    masquerMessageInfoPk();
  }
  donneesPkAffichees = doitAfficher ? filtrerPkPourVue() : PK_VIDE;
  afficherMarqueursPk(donneesPkAffichees.features || []);
}

function fermerPopupPnInfo() {
  if (!popupPnInfo) {
    return;
  }
  popupPnInfo.remove();
  popupPnInfo = null;
}

function mettreAJourAffichagePn() {
  const source = carte.getSource(SOURCE_PN);
  if (source) {
    source.setData(donneesPn || PN_VIDE);
  }
  if (!carte.getLayer(COUCHE_PN)) {
    return;
  }
  const visible = afficherPn && Boolean(donneesPn?.features?.length);
  carte.setLayoutProperty(COUCHE_PN, "visibility", visible ? "visible" : "none");
  if (!visible) {
    fermerPopupPnInfo();
  }
}

function normaliserTextePn(valeur) {
  const texte = String(valeur ?? "").trim();
  return texte || "Non renseigne";
}

function ouvrirPopupPnInfo(feature) {
  const coords = feature?.geometry?.coordinates || [];
  const longitude = Number(coords[0]);
  const latitude = Number(coords[1]);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  const pnNumero = normaliserTextePn(feature?.properties?.pn_numero);
  const codeLigne = normaliserTextePn(feature?.properties?.code_ligne);
  const pk = normaliserTextePn(feature?.properties?.pk);
  const classe = normaliserTextePn(feature?.properties?.classe);

  fermerPopupPnInfo();
  popupPnInfo = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup-pk-info",
    offset: 10
  })
    .setLngLat([longitude, latitude])
    .setHTML(
      `<div class="popup-pk-info-contenu"><p><strong>${echapperHtml(
        pnNumero
      )}</strong></p><p><strong>Code ligne :</strong> ${echapperHtml(codeLigne)}</p><p><strong>PK :</strong> ${echapperHtml(
        pk
      )}</p><p><strong>Classe :</strong> ${echapperHtml(classe)}</p></div>`
    )
    .addTo(carte);
}

function fermerPopupSurvolInfo() {
  if (!popupSurvolInfo) {
    signaturePopupSurvolInfo = "";
    popupSurvolInfoVerrouillee = false;
    return;
  }
  popupSurvolInfo.remove();
  popupSurvolInfo = null;
  signaturePopupSurvolInfo = "";
  popupSurvolInfoVerrouillee = false;
}

function estSurvolDesktopActif() {
  return !window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
}

function construireDonneesSurvolAppareil(feature) {
  const appareilsListe = extraireListeDepuisFeature(feature, "appareils_liste_json");
  if (!appareilsListe.length) {
    return {
      contexteLieu: "Poste inconnu",
      appareils: [{ code: "Appareil", hp: false }]
    };
  }
  const contexteLieu = construireContexteNomTypeSat(appareilsListe[0] || {}) || "Poste inconnu";
  const lignesParCode = new Map();
  for (const appareil of appareilsListe) {
    const codeAppareil = champCompletOuVide(appareil?.appareil) || "Appareil";
    const cle = normaliserTexteRecherche(codeAppareil);
    if (!cle) {
      continue;
    }
    const estHp = Boolean(appareil?.hors_patrimoine);
    if (!lignesParCode.has(cle)) {
      lignesParCode.set(cle, { code: codeAppareil, hp: estHp });
      continue;
    }
    if (estHp) {
      lignesParCode.get(cle).hp = true;
    }
  }
  const lignes = Array.from(lignesParCode.values());
  return {
    contexteLieu,
    appareils: lignes.length ? lignes : [{ code: "Appareil", hp: false }]
  };
}

function construireDonneesSurvolAcces(feature) {
  const accesListe = extraireListeDepuisFeature(feature, "acces_liste_json");
  if (!accesListe.length) {
    return ["Accès"];
  }
  const lignes = [];
  const dejaVu = new Set();
  for (const acces of accesListe) {
    const ligne = construireTitreNomTypeSatAcces(acces, { nomVilleDe: true }) || "Accès";
    const cle = normaliserTexteRecherche(ligne);
    if (!cle || dejaVu.has(cle)) {
      continue;
    }
    dejaVu.add(cle);
    lignes.push(ligne);
  }
  return lignes.length ? lignes : ["Accès"];
}

function construireLibelleSurvolPoste(feature) {
  const postesListe = extraireListeDepuisFeature(feature, "postes_liste_json");
  if (!postesListe.length) {
    return "Poste";
  }
  const principal = construireTitrePoste(postesListe[0]) || "Poste";
  if (postesListe.length <= 1) {
    return principal;
  }
  const complement = postesListe.length - 1;
  return `${principal} + ${complement} autre${complement > 1 ? "s" : ""}`;
}

function ouvrirPopupSurvolInfo(feature, options = {}) {
  if (!estSurvolDesktopActif() || !feature) {
    fermerPopupSurvolInfo();
    return;
  }
  const coords = feature?.geometry?.coordinates || [];
  const longitude = Number(coords[0]);
  const latitude = Number(coords[1]);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    fermerPopupSurvolInfo();
    return;
  }

  const idCouche = String(feature?.layer?.id || "");
  let titre = "";
  let valeur = "";
  let contenu = "";
  let signatureValeur = "";
  if (idCouche === COUCHE_APPAREILS || idCouche === COUCHE_APPAREILS_GROUPES) {
    titre = "Appareil";
    valeur = construireDonneesSurvolAppareil(feature);
    const contexteLieu = echapperHtml(valeur?.contexteLieu || "Poste inconnu");
    const appareils = Array.isArray(valeur?.appareils) ? valeur.appareils : [];
    const appareilsHtml = appareils
      .map((ligne) => {
        const code = echapperHtml(ligne?.code || "Appareil");
        const tagHp = ligne?.hp ? ' <span class="popup-tag-hp">HP</span>' : "";
        return `- ${code}${tagHp}`;
      })
      .join("<br/>");
    contenu = `<div class="popup-pk-info-contenu"><p class="popup-survol-poste-titre">${contexteLieu}</p><p><strong>Appareils :</strong><br/>${appareilsHtml}</p></div>`;
    signatureValeur = `${valeur?.contexteLieu || ""}|${appareils
      .map((ligne) => `${ligne?.code || ""}:${ligne?.hp ? "hp" : "ok"}`)
      .join("||")}`;
  } else if (idCouche === COUCHE_ACCES || idCouche === COUCHE_ACCES_GROUPES) {
    titre = "Accès";
    valeur = construireDonneesSurvolAcces(feature);
    const acces = Array.isArray(valeur) ? valeur : [];
    const accesHtml = acces.map((ligne) => `- ${echapperHtml(ligne || "Accès")}`).join("<br/>");
    contenu = `<div class="popup-pk-info-contenu"><p><strong>Accès :</strong><br/>${accesHtml}</p></div>`;
    signatureValeur = acces.join("||");
  } else if (idCouche === COUCHE_POSTES || idCouche === COUCHE_POSTES_GROUPES) {
    titre = "Poste";
    valeur = construireLibelleSurvolPoste(feature);
  } else {
    fermerPopupSurvolInfo();
    return;
  }

  if (!contenu) {
    const valeurHtml = Array.isArray(valeur)
      ? valeur.map((ligne) => echapperHtml(ligne || "Non renseigné")).join("<br/>")
      : echapperHtml(valeur || "Non renseigné");
    contenu = `<div class="popup-pk-info-contenu"><p><strong>${echapperHtml(titre)} :</strong> ${valeurHtml}</p></div>`;
    signatureValeur = Array.isArray(valeur) ? valeur.join("||") : String(valeur || "");
  }
  const signature = `${idCouche}|${longitude.toFixed(6)}|${latitude.toFixed(6)}|${titre}|${signatureValeur}`;
  if (popupSurvolInfo && signaturePopupSurvolInfo === signature) {
    if (options.verrouiller === true) {
      popupSurvolInfoVerrouillee = true;
    } else if (options.verrouiller === false) {
      popupSurvolInfoVerrouillee = false;
    }
    return;
  }
  fermerPopupSurvolInfo();
  signaturePopupSurvolInfo = signature;
  if (options.verrouiller === true) {
    popupSurvolInfoVerrouillee = true;
  } else {
    popupSurvolInfoVerrouillee = false;
  }
  popupSurvolInfo = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup-pk-info",
    offset: 10
  })
    .setLngLat([longitude, latitude])
    .setHTML(contenu)
    .addTo(carte);
}

function planifierMiseAJourPk() {
  if (rafMiseAJourPk !== null) {
    window.cancelAnimationFrame(rafMiseAJourPk);
  }
  rafMiseAJourPk = window.requestAnimationFrame(() => {
    rafMiseAJourPk = null;
    mettreAJourAffichagePk();
    mettreAJourAffichagePn();
  });
}

function viderMarqueursPk() {
  fermerPopupPkInfo();
  for (const marker of marqueursPk) {
    marker.remove();
  }
  marqueursPk = [];
}

function creerElementMarqueurPk(libelle) {
  const element = document.createElement("div");
  element.textContent = libelle;
  element.style.display = "inline-flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.padding = "1px 7px";
  element.style.borderRadius = "6px";
  element.style.border = "1px solid rgba(17, 24, 39, 0.85)";
  element.style.background = "rgba(255, 255, 255, 0.98)";
  element.style.color = "#111827";
  element.style.fontFamily = "Manrope, sans-serif";
  element.style.fontWeight = "800";
  element.style.fontSize = "12px";
  element.style.lineHeight = "1.15";
  element.style.whiteSpace = "nowrap";
  element.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.2)";
  element.style.pointerEvents = "auto";
  element.style.cursor = "pointer";
  return element;
}

function normaliserTextePk(valeur) {
  const texte = String(valeur ?? "").trim();
  return texte || "Non renseigne";
}

function formaterAltitudePk(valeur) {
  const texte = String(valeur ?? "").trim().replace(",", ".");
  const nombre = Number(texte);
  if (Number.isFinite(nombre)) {
    return `${nombre.toFixed(2).replace(".", ",")} m`;
  }
  return "Non renseignee";
}

function fermerPopupPkInfo() {
  if (!popupPkInfo) {
    return;
  }
  popupPkInfo.remove();
  popupPkInfo = null;
}

function ouvrirPopupPkInfo(feature, longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  const codeLigne = normaliserTextePk(feature?.properties?.code_ligne);
  const altitude = formaterAltitudePk(feature?.properties?.altitude);

  fermerPopupPkInfo();
  popupPkInfo = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup-pk-info",
    offset: 10
  })
    .setLngLat([longitude, latitude])
    .setHTML(
      `<div class="popup-pk-info-contenu"><p><strong>Code ligne :</strong> ${echapperHtml(
        codeLigne
      )}</p><p><strong>Altitude :</strong> ${echapperHtml(altitude)}</p></div>`
    )
    .addTo(carte);
}

function afficherMarqueursPk(features) {
  viderMarqueursPk();
  for (const feature of features) {
    const [longitude, latitude] = feature?.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    const libelle = String(feature?.properties?.pk_affichage || feature?.properties?.pk_label || "").trim();
    if (!libelle) {
      continue;
    }
    const element = creerElementMarqueurPk(libelle);
    const ouvrir = () => {
      ouvrirPopupPkInfo(feature, longitude, latitude);
    };
    element.addEventListener("mouseenter", ouvrir);
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      ouvrir();
    });
    element.addEventListener("mouseleave", () => {
      fermerPopupPkInfo();
    });

    const marker = new maplibregl.Marker({
      element,
      anchor: "center"
    })
      .setLngLat([longitude, latitude])
      .addTo(carte);
    marqueursPk.push(marker);
  }
}

function appliquerCouchesDonnees() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_LIGNES)) {
    carte.addSource(SOURCE_LIGNES, {
      type: "raster",
      tiles: [
        "https://a.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      attribution: "© OpenRailwayMap, © OpenStreetMap contributors",
      maxzoom: 19
    });
  }

  if (!carte.getLayer(COUCHE_LIGNES)) {
    carte.addLayer({
      id: COUCHE_LIGNES,
      type: "raster",
      source: SOURCE_LIGNES,
      paint: {
        "raster-opacity": 0.92
      }
    });
  }

  if (!carte.getSource(SOURCE_VITESSE_LIGNE)) {
    carte.addSource(SOURCE_VITESSE_LIGNE, {
      type: "raster",
      tiles: [
        "https://a.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      attribution: "© OpenRailwayMap, © OpenStreetMap contributors",
      maxzoom: 19
    });
  }

  if (!carte.getLayer(COUCHE_VITESSE_LIGNE)) {
    carte.addLayer({
      id: COUCHE_VITESSE_LIGNE,
      type: "raster",
      source: SOURCE_VITESSE_LIGNE,
      paint: {
        "raster-opacity": 0.95
      }
    });
  }

  if (!carte.getSource(SOURCE_APPAREILS)) {
    carte.addSource(SOURCE_APPAREILS, {
      type: "geojson",
      data: donneesAppareils || APPAREILS_VIDE
    });
  } else {
    carte.getSource(SOURCE_APPAREILS).setData(donneesAppareils || APPAREILS_VIDE);
  }

  enregistrerIconesGroupesAppareils();

  if (!carte.getLayer(COUCHE_APPAREILS)) {
    carte.addLayer({
      id: COUCHE_APPAREILS,
      type: "circle",
      source: SOURCE_APPAREILS,
      filter: ["==", ["get", "appareils_count"], 1],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 4.5, 12, 5.2, 18, 5.9],
        "circle-color": [
          "case",
          ["==", ["get", "hors_patrimoine"], true],
          "#ef4444",
          ["coalesce", ["get", "couleur_appareil"], "#111111"]
        ],
        "circle-opacity": 0.86,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.1
      }
    });
  }

  if (!carte.getLayer(COUCHE_APPAREILS_GROUPES)) {
    carte.addLayer({
      id: COUCHE_APPAREILS_GROUPES,
      type: "symbol",
      source: SOURCE_APPAREILS,
      filter: [">", ["get", "appareils_count"], 1],
      layout: {
        "icon-image": ["coalesce", ["get", "icone_groupe_appareils"], "appareils-groupe-111111"],
        "icon-size": ["interpolate", ["linear"], ["get", "appareils_count"], 2, 0.43, 5, 0.56, 10, 0.72],
        "icon-allow-overlap": true
      },
      paint: {
        "icon-opacity": 1
      }
    });
  }

  if (!carte.getSource(SOURCE_ACCES)) {
    carte.addSource(SOURCE_ACCES, {
      type: "geojson",
      data: donneesAcces || ACCES_VIDE
    });
  } else {
    carte.getSource(SOURCE_ACCES).setData(donneesAcces || ACCES_VIDE);
  }

  if (!carte.getLayer(COUCHE_ACCES)) {
    carte.addLayer({
      id: COUCHE_ACCES,
      type: "circle",
      source: SOURCE_ACCES,
      filter: ["==", ["get", "acces_count"], 1],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 5, 12, 5.8, 18, 6.8],
        "circle-color": PALETTE_CARTE.acces,
        "circle-opacity": 0.9,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.1
      }
    });
  }

  if (!carte.getLayer(COUCHE_ACCES_GROUPES)) {
    carte.addLayer({
      id: COUCHE_ACCES_GROUPES,
      type: "circle",
      source: SOURCE_ACCES,
      filter: [">", ["get", "acces_count"], 1],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["get", "acces_count"], 2, 13, 5, 17, 10, 22],
        "circle-color": PALETTE_CARTE.accesGroupe,
        "circle-opacity": 0.34,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.8
      }
    });
  }

  if (!carte.getSource(SOURCE_POSTES)) {
    carte.addSource(SOURCE_POSTES, {
      type: "geojson",
      data: donneesPostes || POSTES_VIDE
    });
  } else {
    carte.getSource(SOURCE_POSTES).setData(donneesPostes || POSTES_VIDE);
  }

  if (!carte.getLayer(COUCHE_POSTES)) {
    carte.addLayer({
      id: COUCHE_POSTES,
      type: "circle",
      source: SOURCE_POSTES,
      filter: ["==", ["get", "postes_count"], 1],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 5, 12, 5.8, 18, 6.8],
        "circle-color": [
          "case",
          ["==", ["get", "hors_patrimoine"], true],
          PALETTE_CARTE.horsPatrimoine,
          PALETTE_CARTE.poste
        ],
        "circle-opacity": ["case", ["==", ["get", "hors_patrimoine"], true], 0.82, 0.92],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.1
      }
    });
  }

  if (!carte.getLayer(COUCHE_POSTES_GROUPES)) {
    carte.addLayer({
      id: COUCHE_POSTES_GROUPES,
      type: "circle",
      source: SOURCE_POSTES,
      filter: [">", ["get", "postes_count"], 1],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["get", "postes_count"], 2, 13, 5, 17, 10, 22],
        "circle-color": [
          "case",
          [">", ["get", "hors_patrimoine_count"], 0],
          PALETTE_CARTE.horsPatrimoineGroupe,
          PALETTE_CARTE.posteGroupe
        ],
        "circle-opacity": ["case", [">", ["get", "hors_patrimoine_count"], 0], 0.38, 0.34],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1.8
      }
    });
  }

  if (!carte.getSource(SOURCE_PK)) {
    carte.addSource(SOURCE_PK, {
      type: "geojson",
      data: PK_VIDE
    });
  }

  if (!carte.getSource(SOURCE_PN)) {
    carte.addSource(SOURCE_PN, {
      type: "geojson",
      data: donneesPn || PN_VIDE
    });
  }

  if (!carte.getLayer(COUCHE_PN)) {
    carte.addLayer({
      id: COUCHE_PN,
      type: "circle",
      source: SOURCE_PN,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 3.6, 12, 4.7, 16, 6.1],
        "circle-color": "#06b6d4",
        "circle-stroke-color": "#164e63",
        "circle-stroke-width": 1.1,
        "circle-opacity": 0.9
      }
    });
  }

  carte.setLayoutProperty(
    COUCHE_APPAREILS,
    "visibility",
    afficherAppareils && donneesAppareils ? "visible" : "none"
  );
  carte.setLayoutProperty(
    COUCHE_APPAREILS_GROUPES,
    "visibility",
    afficherAppareils && donneesAppareils ? "visible" : "none"
  );
  carte.setLayoutProperty(COUCHE_ACCES, "visibility", afficherAcces && donneesAcces ? "visible" : "none");
  carte.setLayoutProperty(
    COUCHE_ACCES_GROUPES,
    "visibility",
    afficherAcces && donneesAcces ? "visible" : "none"
  );
  carte.setLayoutProperty(COUCHE_POSTES, "visibility", afficherPostes && donneesPostes ? "visible" : "none");
  carte.setLayoutProperty(
    COUCHE_POSTES_GROUPES,
    "visibility",
    afficherPostes && donneesPostes ? "visible" : "none"
  );
  carte.setLayoutProperty(COUCHE_LIGNES, "visibility", afficherLignes ? "visible" : "none");
  carte.setLayoutProperty(COUCHE_VITESSE_LIGNE, "visibility", afficherVitesseLigne ? "visible" : "none");
  mettreAJourAffichagePk();
  mettreAJourAffichagePn();
  mettreAJourControleAttributionCarte();
}

function restaurerEtatFiltres() {
  if (caseAppareils) {
    caseAppareils.checked = afficherAppareils;
  }
  if (caseAcces) {
    caseAcces.checked = afficherAcces;
  }
  if (casePostes) {
    casePostes.checked = afficherPostes;
  }
  if (casePk) {
    casePk.checked = afficherPk;
  }
  if (casePn) {
    casePn.checked = afficherPn;
  }
  if (caseLignes) {
    caseLignes.checked = afficherLignes;
  }
  if (caseVitesseLigne) {
    caseVitesseLigne.checked = afficherVitesseLigne;
  }

  mettreAJourCompteursFiltres();
  appliquerCouchesDonnees();
}

function remonterCouchesDonnees() {
  if (carte.getLayer(COUCHE_ACCES_GROUPES)) {
    carte.moveLayer(COUCHE_ACCES_GROUPES);
  }

  if (carte.getLayer(COUCHE_ACCES)) {
    carte.moveLayer(COUCHE_ACCES);
  }

  if (carte.getLayer(COUCHE_POSTES_GROUPES)) {
    carte.moveLayer(COUCHE_POSTES_GROUPES);
  }

  if (carte.getLayer(COUCHE_POSTES)) {
    carte.moveLayer(COUCHE_POSTES);
  }

  if (carte.getLayer(COUCHE_APPAREILS_GROUPES)) {
    carte.moveLayer(COUCHE_APPAREILS_GROUPES);
  }

  if (carte.getLayer(COUCHE_APPAREILS)) {
    carte.moveLayer(COUCHE_APPAREILS);
  }

  if (carte.getLayer(COUCHE_PN)) {
    carte.moveLayer(COUCHE_PN);
  }

}

function restaurerAffichageDonnees() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  appliquerCouchesDonnees();
  remonterCouchesDonnees();
  planifierMiseAJourPk();
}

function planifierRestaurationFiltres() {
  const tentativeMax = 40;
  let tentatives = 0;

  const essayer = () => {
    tentatives += 1;

    if (carte.isStyleLoaded()) {
      restaurerEtatFiltres();
      restaurerAffichageDonnees();
      return;
    }

    if (tentatives < tentativeMax) {
      setTimeout(essayer, 60);
    }
  };

  essayer();
}

async function chargerDonneesAppareils() {
  if (donneesAppareils) {
    return donneesAppareils;
  }

  if (!promesseChargementAppareils) {
    promesseChargementAppareils = fetch("./appareils.geojson", { cache: "no-store" })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }

        return reponse.json();
      })
      .then((geojson) => {
        totalAppareilsBrut = Array.isArray(geojson?.features) ? geojson.features.length : 0;
        donneesAppareils = regrouperAppareilsParCoordonnees(geojson);
        mettreAJourCompteursFiltres();
        return donneesAppareils;
      })
      .finally(() => {
        promesseChargementAppareils = null;
      });
  }

  return promesseChargementAppareils;
}

async function chargerCompteurAppareils() {
  if (donneesAppareils) {
    mettreAJourCompteursFiltres();
    return;
  }

  try {
    await chargerDonneesAppareils();
  } catch (erreur) {
    console.error("Impossible de precharger appareils.geojson pour le compteur", erreur);
  } finally {
    mettreAJourCompteursFiltres();
  }
}

async function chargerDonneesAcces() {
  if (donneesAcces) {
    return donneesAcces;
  }

  if (!promesseChargementAcces) {
    promesseChargementAcces = fetch("./acces.geojson", { cache: "no-store" })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }

        return reponse.json();
      })
      .then((geojson) => {
        donneesAcces = regrouperAccesParCoordonnees(geojson);
        mettreAJourCompteursFiltres();
        return donneesAcces;
      })
      .finally(() => {
        promesseChargementAcces = null;
      });
  }

  return promesseChargementAcces;
}

async function chargerDonneesPostes() {
  if (donneesPostes) {
    return donneesPostes;
  }

  if (!promesseChargementPostes) {
    promesseChargementPostes = fetch("./postes.geojson", { cache: "no-store" })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }

        return reponse.json();
      })
      .then((geojson) => {
        totalPostesBrut = calculerTotalPostesPourCompteur(geojson);
        donneesPostes = regrouperPostesParCoordonnees(geojson);
        mettreAJourCompteursFiltres();
        return donneesPostes;
      })
      .finally(() => {
        promesseChargementPostes = null;
      });
  }

  return promesseChargementPostes;
}

async function chargerDonneesPk() {
  if (donneesPk) {
    return donneesPk;
  }

  if (!promesseChargementPk) {
    promesseChargementPk = fetch("./pk.geojson", { cache: "default" })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }
        return reponse.json();
      })
      .then((geojson) => {
        const features = Array.isArray(geojson?.features) ? geojson.features : [];
        donneesPk = { type: "FeatureCollection", features };
        return donneesPk;
      })
      .finally(() => {
        promesseChargementPk = null;
      });
  }

  return promesseChargementPk;
}

function normaliserNumeroPn(valeur) {
  const texte = String(valeur ?? "").trim();
  if (!texte) {
    return "PN non renseigne";
  }
  if (/^pn/i.test(texte)) {
    return texte.toUpperCase().replace(/\s+/g, "");
  }
  return `PN${texte}`;
}

async function chargerDonneesPn() {
  if (donneesPn) {
    return donneesPn;
  }

  if (!promesseChargementPn) {
    promesseChargementPn = fetch("./pn.geojson", { cache: "default" })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`HTTP ${reponse.status}`);
        }
        return reponse.json();
      })
      .then((geojson) => {
        const featuresBrutes = Array.isArray(geojson?.features) ? geojson.features : [];
        const features = [];
        for (const feature of featuresBrutes) {
          const coords = feature?.geometry?.coordinates || [];
          const longitude = Number(coords[0]);
          const latitude = Number(coords[1]);
          if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
            continue;
          }
          const props = feature?.properties || {};
          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            properties: {
              pn_numero: normaliserNumeroPn(props.pn_numero ?? props.libelle ?? props.pn ?? props.id_pn),
              code_ligne: String(props.code_ligne ?? "").trim(),
              pk: String(props.pk ?? "").trim(),
              classe: String(props.classe ?? "").trim()
            }
          });
        }
        donneesPn = { type: "FeatureCollection", features };
        return donneesPn;
      })
      .finally(() => {
        promesseChargementPn = null;
      });
  }

  return promesseChargementPn;
}

async function chargerCompteurPostes() {
  if (donneesPostes) {
    mettreAJourCompteursFiltres();
    return;
  }

  try {
    await chargerDonneesPostes();
  } catch (erreur) {
    console.error("Impossible de precharger postes.geojson pour le compteur", erreur);
  } finally {
    mettreAJourCompteursFiltres();
  }
}

function echapperHtml(valeur) {
  return String(valeur)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normaliserChampTexte(valeur) {
  return String(valeur || "").trim();
}

function champEstACompleter(valeur) {
  const texte = normaliserChampTexte(valeur).toUpperCase();
  return texte === "A COMPLETER" || texte === "A COMPLÉTER" || texte === "COMPLETER" || texte === "COMPLÉTER";
}

function champCompletOuVide(valeur) {
  const texte = normaliserChampTexte(valeur);
  if (!texte || champEstACompleter(texte)) {
    return "";
  }
  return texte;
}

function construireTitreNomTypeSat(entree, options = {}) {
  const nomBase = normaliserChampTexte(entree?.nom);
  const nom = entree?.hors_patrimoine && options.nomVilleDe && nomBase ? `${nomBase} (Ville De)` : nomBase;
  const type = normaliserChampTexte(entree?.type);
  const sat = champCompletOuVide(entree?.SAT);
  return [nom, type, sat].filter(Boolean).join(SEPARATEUR_LIBELLE);
}

function construireFragmentsTitreAcces(entree, options = {}) {
  const nomTypeSat = construireTitreNomTypeSat(entree, options);
  const acces = champCompletOuVide(entree?.acces);
  return { nomTypeSat, acces };
}

function construireTitreNomTypeSatAcces(entree, options = {}) {
  const { nomTypeSat, acces } = construireFragmentsTitreAcces(entree, options);
  const accesLibelle = acces ? `(Accès : ${acces})` : "";
  return [nomTypeSat, accesLibelle].filter(Boolean).join(SEPARATEUR_LIBELLE);
}

function construireTitreNomTypeSatAccesHtml(entree, options = {}) {
  const { nomTypeSat, acces } = construireFragmentsTitreAcces(entree, options);
  const base = echapperHtml(nomTypeSat || "Acces inconnu");
  if (!acces) {
    return base;
  }
  return `${base} <span class="popup-acces-suffixe">(Accès : ${echapperHtml(acces)})</span>`;
}

function construireContexteNomTypeSat(entree) {
  return [champCompletOuVide(entree?.nom), champCompletOuVide(entree?.type), champCompletOuVide(entree?.SAT)]
    .filter(Boolean)
    .join(SEPARATEUR_LIBELLE);
}

function convertirDescriptionAppareilEnHtml(description) {
  const texte = String(description || "");
  if (!texte.trim()) {
    return "";
  }
  return echapperHtml(texte).replace(/&lt;br\s*\/?&gt;/gi, "<br/>");
}

function determinerLibelleRetourPosteDepuisAppareil(featureAppareils) {
  const appareilsListe = extraireListeDepuisFeature(featureAppareils, "appareils_liste_json");
  const sat = champCompletOuVide(appareilsListe[0]?.SAT);
  if (sat) {
    return "Accéder à la fiche du SAT";
  }
  return "Accéder à la fiche du poste";
}

function construireLienImajnet(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return "";
  }
  return `https://gecko.imajnet.net/#map=OSM;zoom=18;loc=${latitude},${longitude};`;
}

function construireLiensItineraires(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return "";
  }

  const destination = `${latitude},${longitude}`;
  const googleMaps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  const applePlans = `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;
  const waze = `https://waze.com/ul?ll=${encodeURIComponent(destination)}&navigate=yes`;

  return `<div class="popup-itineraires popup-itineraires-navigation"><a class="popup-bouton-itineraire" href="${echapperHtml(googleMaps)}" target="_blank" rel="noopener noreferrer">🗺️ Maps</a><a class="popup-bouton-itineraire" href="${echapperHtml(applePlans)}" target="_blank" rel="noopener noreferrer">🍎 Plans</a><a class="popup-bouton-itineraire" href="${echapperHtml(waze)}" target="_blank" rel="noopener noreferrer">🚗 Waze</a></div>`;
}

function construireSectionAppareils(feature, options = {}) {
  const propr = feature.properties || {};
  let appareilsListe = [];
  try {
    appareilsListe = JSON.parse(propr.appareils_liste_json || "[]");
  } catch {
    appareilsListe = [];
  }

  if (!appareilsListe.length) {
    return "";
  }

  const contexteLieu = construireContexteNomTypeSat(appareilsListe[0] || {});
  const afficherContexteLieu = options?.afficherContexteLieu !== false;
  const afficherPillsTelecommande = options?.afficherPillsTelecommande !== false;
  const afficherBadgeSupport = options?.afficherBadgeSupport !== false;
  const nbAppareilsBrut = Number(propr.appareils_count);
  const nbAppareils = Number.isFinite(nbAppareilsBrut) && nbAppareilsBrut > 0 ? nbAppareilsBrut : appareilsListe.length;
  const libelleBadgeSupport = `${nbAppareils} ${nbAppareils > 1 ? "appareils" : "appareil"} sur le support`;
  const codesTelecommande = extraireCodesTelecommande(options?.posteAssocie?.description_telecommande);
  const pillsTelecommande = codesTelecommande.length
    ? `<div class="popup-appareils-multi-telecommande popup-poste-telecommande-pills">${codesTelecommande
        .map((code) => `<span class="popup-tag-hp popup-tag-telecommande">${echapperHtml(code)}</span>`)
        .join("")}</div>`
    : "";
  const sectionTitre =
    !options.masquerTitreLieu && afficherContexteLieu && contexteLieu
      ? `<p class="popup-poste-entete-principal">📍 ${echapperHtml(contexteLieu)}</p>`
      : "";
  const lignesAppareils = appareilsListe
    .map((a) => {
      const couleur = a.couleur_appareil || "#111111";
      const tagHp = a.hors_patrimoine ? '<span class="popup-tag-hp">HP</span>' : "";
      const libelleAppareil = champCompletOuVide(a.appareil) || "Appareil inconnu";
      const descriptionHtml = convertirDescriptionAppareilEnHtml(a.description);
      return `<section class="popup-appareil-item-ligne"><p class="popup-appareil-code-ligne"><span class="popup-point-couleur" style="background:${echapperHtml(couleur)}"></span>${echapperHtml(libelleAppareil)}${tagHp}</p>${descriptionHtml ? `<p class="popup-appareil-description-inline">${descriptionHtml}</p>` : ""}</section>`;
    })
    .join("");
  const badgeSupport = afficherBadgeSupport
    ? `<div class="popup-pill-ligne popup-pill-ligne-gauche popup-pill-support-appareils"><span class="popup-badge popup-badge-itineraire">${echapperHtml(libelleBadgeSupport)}</span></div>`
    : "";
  return `<section class="popup-section">${sectionTitre}${afficherPillsTelecommande ? pillsTelecommande : ""}${badgeSupport}${lignesAppareils}</section>`;
}

function construireSectionAcces(feature) {
  const propr = feature.properties || {};
  let accesListe = [];
  try {
    accesListe = JSON.parse(propr.acces_liste_json || "[]");
  } catch {
    accesListe = [];
  }

  if (!accesListe.length) {
    return "";
  }

  const construireTitreAccesHtml = (acces) => construireTitreNomTypeSatAccesHtml(acces, { nomVilleDe: true });
  const clesAccesUniques = new Set(
    accesListe
      .map((a) => normaliserTexteRecherche(champCompletOuVide(a?.acces)))
      .filter(Boolean)
  );
  if (!clesAccesUniques.size) {
    for (const acces of accesListe) {
      const cleFallback = construireCleNomTypeSat(acces);
      if (cleFallback) {
        clesAccesUniques.add(cleFallback);
      }
    }
  }
  const clesAffichageLignes = new Set(
    accesListe
      .map((a) => normaliserTexteRecherche(champCompletOuVide(a?.acces)))
      .filter(Boolean)
  );
  const clesPostesUniques = new Set(
    accesListe
      .map((a) => construireCleNomTypeSat(a))
      .filter(Boolean)
  );
  const totalLignesUniques = Math.max(1, clesAffichageLignes.size || accesListe.length);
  const totalPostesUniques = clesPostesUniques.size;
  const totalAccesBrut = Number(propr.acces_count);
  const estMultiAcces =
    (Number.isFinite(totalAccesBrut) && totalAccesBrut > 1) || totalPostesUniques > 1 || totalLignesUniques > 1 || accesListe.length > 1;

  if (estMultiAcces) {
    const lignes = accesListe
      .map((a) => {
        const titreHtml = construireTitreAccesHtml(a);
        const classeHp = a.hors_patrimoine ? " popup-acces-ligne-hp" : "";
        return `<li><span class="popup-acces-ligne${classeHp}">🚗 ${titreHtml}</span></li>`;
      })
      .join("");
    const totalPostes = Math.max(2, totalPostesUniques || totalLignesUniques);
    const libelleBadge = `${totalPostes} postes partagent le même accès :`;
    return `<section class="popup-section"><div class="popup-pill-ligne"><span class="popup-badge popup-badge-acces">${echapperHtml(libelleBadge)}</span></div><ul>${lignes}</ul></section>`;
  }

  const acces = accesListe[0] || {};
  const titreHtml = construireTitreAccesHtml(acces);
  const classeHors = acces.hors_patrimoine ? " popup-item-hors" : "";
  return `<section class="popup-section"><p class="popup-acces-titre${classeHors}">🚗 ${titreHtml}</p></section>`;
}

function construireSectionConsigneRssDepuisAcces(featureAcces) {
  const posteAssocie = trouverPosteAssocieDepuisAcces(featureAcces);
  if (!posteAssocie) {
    return "";
  }

  const rss = champCompletOuVide(posteAssocie?.rss);
  if (!rss) {
    return "";
  }

  const cle = normaliserCleRss(rss);
  const libelleTable = construireLibelleTableRss(cle);
  const numeros = obtenirNumerosRssDepuisCode(cle);
  const phrase = `📞 RSS ${libelleTable}`;
  const boutons = numeros
    .map((numero) => {
      const href = construireHrefTelephone(numero);
      return `<a class="popup-bouton-itineraire" href="tel:${echapperHtml(href)}">${echapperHtml(numero)}</a>`;
    })
    .join("");

  return `<section class="popup-section"><p class="popup-poste-rss-titre">${echapperHtml(phrase)}</p>${
    boutons ? `<div class="popup-itineraires popup-itineraires-rss">${boutons}</div>` : ""
  }</section>`;
}

function construireSectionExplorerAcces(longitude, latitude) {
  const boutonLocaliser = `<button class="popup-bouton-itineraire popup-bouton-localiser" id="popup-localiser-carte" type="button" data-lng="${longitude}" data-lat="${latitude}">📍 Localiser sur la carte</button>`;
  return `<section class="popup-section popup-section-itineraires"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Explorer l'accès</span></div><div class="popup-itineraires popup-itineraires-poste-actions">${boutonLocaliser}<button class="popup-bouton-itineraire popup-bouton-street-view" id="popup-ouvrir-street-view" type="button" data-lng="${longitude}" data-lat="${latitude}">🛣️ Street View</button></div></section>`;
}

function construireModalStreetView() {
  return '<div class="popup-streetview-modal" id="popup-streetview-modal" hidden><div class="popup-streetview-dialog" role="dialog" aria-modal="true" aria-label="Street View"><button class="popup-streetview-fermer" id="popup-fermer-street-view" type="button" aria-label="Fermer">✕</button><iframe class="popup-streetview-iframe" id="popup-streetview-iframe" title="Street View" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div>';
}

function construireTitrePoste(poste) {
  return construireTitreNomTypeSat(poste);
}

function extraireCodesTelecommande(valeur) {
  const brut = champCompletOuVide(valeur);
  if (!brut) {
    return [];
  }

  const segments = brut
    .split(/[|,;()\/]+/)
    .flatMap((partie) => String(partie).split(/\s+/))
    .map((element) => String(element || "").trim())
    .filter(Boolean);

  const codes = [];
  const dejaVu = new Set();
  for (const segment of segments) {
    const token = segment.replace(/[^A-Za-z0-9-]/g, "").toUpperCase();
    if (!token) {
      continue;
    }

    const estCodeCourt = /^[A-Z]{2,5}$/.test(token);
    const estCodeAvecChiffres = /^[A-Z0-9-]{2,12}$/.test(token) && /\d/.test(token);
    if (!estCodeCourt && !estCodeAvecChiffres) {
      continue;
    }

    if (dejaVu.has(token)) {
      continue;
    }
    dejaVu.add(token);
    codes.push(token);
  }

  return codes;
}

function construireCleCorrespondance(entree) {
  return [
    normaliserTexteRecherche(champCompletOuVide(entree?.nom)),
    normaliserTexteRecherche(champCompletOuVide(entree?.type)),
    normaliserTexteRecherche(champCompletOuVide(entree?.SAT)),
    normaliserTexteRecherche(champCompletOuVide(entree?.acces))
  ].join("|");
}

function construireCleNomType(entree) {
  return [
    normaliserTexteRecherche(champCompletOuVide(entree?.nom)),
    normaliserTexteRecherche(champCompletOuVide(entree?.type))
  ].join("|");
}

function construireCleNomTypeSat(entree) {
  return [
    normaliserTexteRecherche(champCompletOuVide(entree?.nom)),
    normaliserTexteRecherche(champCompletOuVide(entree?.type)),
    normaliserTexteRecherche(champCompletOuVide(entree?.SAT))
  ].join("|");
}

function extraireListeDepuisFeature(feature, cleJson) {
  try {
    return JSON.parse(feature?.properties?.[cleJson] || "[]");
  } catch {
    return [];
  }
}

function trouverFeatureAccesDepuisPostes(featurePostes) {
  if (!featurePostes || !donneesAcces?.features?.length) {
    return null;
  }

  const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
  if (!postesListe.length) {
    return null;
  }

  const clesCorrespondance = new Set(postesListe.map((poste) => construireCleCorrespondance(poste)).filter(Boolean));
  const clesNomTypeSat = new Set(postesListe.map((poste) => construireCleNomTypeSat(poste)).filter(Boolean));
  const clesNomType = new Set(postesListe.map((poste) => construireCleNomType(poste)).filter(Boolean));
  if (!clesCorrespondance.size && !clesNomTypeSat.size && !clesNomType.size) {
    return null;
  }

  let fallbackNomTypeSat = null;
  let fallbackNomType = null;
  for (const featureAcces of donneesAcces.features) {
    const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
    if (!accesListe.length) {
      continue;
    }

    const correspond = accesListe.some((acces) => clesCorrespondance.has(construireCleCorrespondance(acces)));
    if (correspond) {
      return featureAcces;
    }

    if (!fallbackNomTypeSat) {
      const matchNomTypeSat = accesListe.some((acces) => clesNomTypeSat.has(construireCleNomTypeSat(acces)));
      if (matchNomTypeSat) {
        fallbackNomTypeSat = featureAcces;
      }
    }

    if (!fallbackNomType) {
      const matchNomType = accesListe.some((acces) => clesNomType.has(construireCleNomType(acces)));
      if (matchNomType) {
        fallbackNomType = featureAcces;
      }
    }
  }

  return fallbackNomTypeSat || fallbackNomType;
}

function trouverCoordonneesAccesDepuisPostes(featurePostes) {
  const featureAcces = trouverFeatureAccesDepuisPostes(featurePostes);
  if (!featureAcces) {
    return null;
  }

  const [longitude, latitude] = featureAcces.geometry?.coordinates || [];
  if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
    return [longitude, latitude];
  }
  return null;
}

function trouverCoordonneesPosteDepuisAcces(featureAcces) {
  if (!featureAcces || !donneesPostes?.features?.length) {
    return null;
  }

  const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
  if (!accesListe.length) {
    return null;
  }

  const clesNomTypeSat = new Set(accesListe.map((acces) => construireCleNomTypeSat(acces)).filter(Boolean));
  const clesNomType = new Set(accesListe.map((acces) => construireCleNomType(acces)).filter(Boolean));
  if (!clesNomType.size) {
    return null;
  }

  let fallbackNomType = null;
  for (const featurePostes of donneesPostes.features) {
    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    const matchSat = postesListe.some((poste) => clesNomTypeSat.has(construireCleNomTypeSat(poste)));
    const matchNomType = postesListe.some((poste) => clesNomType.has(construireCleNomType(poste)));
    if (!matchSat && !matchNomType) {
      continue;
    }

    const [longitude, latitude] = featurePostes.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    if (matchSat) {
      return [longitude, latitude];
    }

    if (!fallbackNomType) {
      fallbackNomType = [longitude, latitude];
    }
  }

  return fallbackNomType;
}

function trouverCoordonneesPostePrincipalDepuisFeaturePostes(featurePostes) {
  if (!featurePostes || !donneesPostes?.features?.length) {
    return null;
  }

  const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
  if (!postesListe.length) {
    return null;
  }

  const clesNomType = new Set(postesListe.map((poste) => construireCleNomType(poste)).filter(Boolean));
  if (!clesNomType.size) {
    return null;
  }

  let fallbackNomType = null;
  for (const feature of donneesPostes.features) {
    const [lng, lat] = feature.geometry?.coordinates || [];
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      continue;
    }
    const liste = extraireListeDepuisFeature(feature, "postes_liste_json");
    if (!liste.length) {
      continue;
    }

    if (!fallbackNomType) {
      const matchNomType = liste.some((poste) => clesNomType.has(construireCleNomType(poste)));
      if (matchNomType) {
        fallbackNomType = [lng, lat];
      }
    }

    const matchPostePrincipal = liste.some((poste) => {
      if (!clesNomType.has(construireCleNomType(poste))) {
        return false;
      }
      return !normaliserTexteRecherche(champCompletOuVide(poste?.SAT));
    });
    if (matchPostePrincipal) {
      return [lng, lat];
    }
  }

  return fallbackNomType;
}

function trouverPosteAssocieDepuisAcces(featureAcces) {
  if (!featureAcces || !donneesPostes?.features?.length) {
    return null;
  }

  const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
  if (!accesListe.length) {
    return null;
  }

  const clesCorrespondance = new Set(accesListe.map((acces) => construireCleCorrespondance(acces)).filter(Boolean));
  const clesNomTypeSat = new Set(accesListe.map((acces) => construireCleNomTypeSat(acces)).filter(Boolean));
  const clesNomType = new Set(accesListe.map((acces) => construireCleNomType(acces)).filter(Boolean));
  if (!clesCorrespondance.size && !clesNomTypeSat.size && !clesNomType.size) {
    return null;
  }

  let fallbackNomTypeSat = null;
  let fallbackNomType = null;
  for (const featurePostes of donneesPostes.features) {
    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    const matchesCorrespondance = postesListe.filter((poste) => clesCorrespondance.has(construireCleCorrespondance(poste)));
    if (matchesCorrespondance.length) {
      const posteAvecRss = matchesCorrespondance.find((poste) => Boolean(champCompletOuVide(poste?.rss)));
      return posteAvecRss || matchesCorrespondance[0];
    }

    if (!fallbackNomTypeSat) {
      const matchesNomTypeSat = postesListe.filter((poste) => clesNomTypeSat.has(construireCleNomTypeSat(poste)));
      if (matchesNomTypeSat.length) {
        const posteAvecRss = matchesNomTypeSat.find((poste) => Boolean(champCompletOuVide(poste?.rss)));
        fallbackNomTypeSat = posteAvecRss || matchesNomTypeSat[0];
      }
    }

    if (!fallbackNomType) {
      const matchesNomType = postesListe.filter((poste) => clesNomType.has(construireCleNomType(poste)));
      if (matchesNomType.length) {
        const posteAvecRss = matchesNomType.find((poste) => Boolean(champCompletOuVide(poste?.rss)));
        fallbackNomType = posteAvecRss || matchesNomType[0];
      }
    }
  }

  return fallbackNomTypeSat || fallbackNomType;
}

function trouverChoixPostesDepuisAcces(featureAcces) {
  if (!featureAcces || !donneesPostes?.features?.length) {
    return [];
  }

  const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
  if (!accesListe.length) {
    return [];
  }

  const clesCorrespondance = new Set(accesListe.map((acces) => construireCleCorrespondance(acces)).filter(Boolean));
  const clesNomTypeSat = new Set(accesListe.map((acces) => construireCleNomTypeSat(acces)).filter(Boolean));
  if (!clesCorrespondance.size && !clesNomTypeSat.size) {
    return [];
  }

  const choix = [];
  const dejaVu = new Set();
  for (const featurePostes of donneesPostes.features) {
    const [longitude, latitude] = featurePostes.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    for (const poste of postesListe) {
      const match =
        clesCorrespondance.has(construireCleCorrespondance(poste)) ||
        clesNomTypeSat.has(construireCleNomTypeSat(poste));
      if (!match) {
        continue;
      }

      const label = construireTitrePoste(poste) || "Poste";
      const satBrut = champCompletOuVide(poste?.SAT);
      const cibleSat = satBrut || "Poste";
      const cle = `${normaliserTexteRecherche(label)}|${longitude}|${latitude}|${normaliserTexteRecherche(cibleSat)}`;
      if (dejaVu.has(cle)) {
        continue;
      }
      dejaVu.add(cle);
      choix.push({ label, longitude, latitude, cibleSat });
    }
  }

  return choix.sort((a, b) => a.label.localeCompare(b.label, "fr", { sensitivity: "base", numeric: true }));
}

function construireSectionRssAssocieDepuisAcces(featureAcces) {
  const posteAssocie = trouverPosteAssocieDepuisAcces(featureAcces);
  if (!posteAssocie) {
    return "";
  }
  return construireSectionRssPoste(posteAssocie);
}

function trouverCoordonneesAccesDepuisAppareils(featureAppareils) {
  if (!featureAppareils || !donneesAcces?.features?.length) {
    return null;
  }

  const appareilsListe = extraireListeDepuisFeature(featureAppareils, "appareils_liste_json");
  if (!appareilsListe.length) {
    return null;
  }

  const clesPrioritaires = new Set();
  const clesSecours = new Set();

  for (const appareil of appareilsListe) {
    const nom = normaliserTexteRecherche(champCompletOuVide(appareil?.nom));
    const type = normaliserTexteRecherche(champCompletOuVide(appareil?.type));
    const sat = normaliserTexteRecherche(champCompletOuVide(appareil?.SAT));
    if (!nom && !type && !sat) {
      continue;
    }

    const acces = normaliserTexteRecherche(champCompletOuVide(appareil?.acces));
    const codeAppareil = normaliserTexteRecherche(champCompletOuVide(appareil?.appareil));

    if (acces) {
      clesPrioritaires.add([nom, type, sat, acces].join("|"));
      continue;
    }

    if (codeAppareil) {
      // Si le champ "acces" est vide côté appareil, on tente d'abord le code appareil (ex: I5429).
      clesPrioritaires.add([nom, type, sat, codeAppareil].join("|"));
      clesSecours.add([nom, type, sat, ""].join("|"));
      continue;
    }

    clesPrioritaires.add([nom, type, sat, ""].join("|"));
  }

  if (!clesPrioritaires.size && !clesSecours.size) {
    return null;
  }

  let coordonneesSecours = null;
  for (const featureAcces of donneesAcces.features) {
    const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
    const [longitude, latitude] = featureAcces.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const correspondPrioritaire = accesListe.some((acces) => clesPrioritaires.has(construireCleCorrespondance(acces)));
    if (correspondPrioritaire) {
      return [longitude, latitude];
    }

    if (!coordonneesSecours) {
      const correspondSecours = accesListe.some((acces) => clesSecours.has(construireCleCorrespondance(acces)));
      if (correspondSecours) {
        coordonneesSecours = [longitude, latitude];
      }
    }
  }

  return coordonneesSecours;
}

function trouverCoordonneesPosteDepuisAppareils(featureAppareils) {
  if (!featureAppareils || !donneesPostes?.features?.length) {
    return null;
  }

  const appareilsListe = extraireListeDepuisFeature(featureAppareils, "appareils_liste_json");
  if (!appareilsListe.length) {
    return null;
  }

  const clesNomTypeSat = new Set(appareilsListe.map((a) => construireCleNomTypeSat(a)).filter(Boolean));
  const clesNomType = new Set(appareilsListe.map((a) => construireCleNomType(a)).filter(Boolean));
  if (!clesNomType.size) {
    return null;
  }

  let fallbackNomType = null;

  for (const featurePostes of donneesPostes.features) {
    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    const matchSat = postesListe.some((poste) => clesNomTypeSat.has(construireCleNomTypeSat(poste)));
    const matchNomType = postesListe.some((poste) => clesNomType.has(construireCleNomType(poste)));
    if (!matchSat && !matchNomType) {
      continue;
    }

    const [longitude, latitude] = featurePostes.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    if (matchSat) {
      return [longitude, latitude];
    }

    if (!fallbackNomType) {
      fallbackNomType = [longitude, latitude];
    }
  }

  return fallbackNomType;
}

function trouverPosteAssocieDepuisAppareils(featureAppareils) {
  if (!featureAppareils || !donneesPostes?.features?.length) {
    return null;
  }

  const appareilsListe = extraireListeDepuisFeature(featureAppareils, "appareils_liste_json");
  if (!appareilsListe.length) {
    return null;
  }

  const clesNomTypeSat = new Set(appareilsListe.map((a) => construireCleNomTypeSat(a)).filter(Boolean));
  const clesNomType = new Set(appareilsListe.map((a) => construireCleNomType(a)).filter(Boolean));
  if (!clesNomType.size) {
    return null;
  }

  let fallbackNomType = null;
  for (const featurePostes of donneesPostes.features) {
    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    const posteSat = postesListe.find((poste) => clesNomTypeSat.has(construireCleNomTypeSat(poste)));
    if (posteSat) {
      return posteSat;
    }

    if (!fallbackNomType) {
      const posteNomType = postesListe.find((poste) => clesNomType.has(construireCleNomType(poste)));
      if (posteNomType) {
        fallbackNomType = posteNomType;
      }
    }
  }

  return fallbackNomType;
}

function construireLignePkEtLigne(poste) {
  const pk = champCompletOuVide(poste.pk);
  const numeroLigne = poste.numero_ligne !== "" && poste.numero_ligne !== null && poste.numero_ligne !== undefined
    ? String(poste.numero_ligne).trim()
    : "";
  const lignes = champCompletOuVide(poste.lignes);
  if (pk && numeroLigne && lignes) {
    return `PK ${pk} sur la ligne n°${numeroLigne} – ${lignes}`;
  }
  if (pk && numeroLigne && !lignes) {
    return `PK ${pk} sur la ligne n°${numeroLigne}`;
  }
  if (pk && !numeroLigne && lignes) {
    return `PK ${pk} sur la ligne ${lignes}`;
  }
  if (!pk && numeroLigne && lignes) {
    return `Ligne n°${numeroLigne} – ${lignes}`;
  }
  if (!pk && !numeroLigne && lignes) {
    return `Ligne ${lignes}`;
  }
  if (!pk && numeroLigne && !lignes) {
    return `Ligne n°${numeroLigne}`;
  }
  return "";
}

function construireLignePkEtLigneHtml(poste) {
  const pk = champCompletOuVide(poste?.pk);
  const numeroLigne = poste?.numero_ligne !== "" && poste?.numero_ligne !== null && poste?.numero_ligne !== undefined
    ? String(poste.numero_ligne).trim()
    : "";
  const lignes = champCompletOuVide(poste?.lignes);

  const pkHtml = pk ? `<strong>PK ${echapperHtml(pk)}</strong>` : "";
  const numeroHtml = numeroLigne ? `<strong>n°${echapperHtml(numeroLigne)}</strong>` : "";
  const lignesHtml = lignes ? echapperHtml(lignes) : "";

  if (pk && numeroLigne && lignes) {
    return `${pkHtml} sur la ligne ${numeroHtml} – ${lignesHtml}`;
  }
  if (pk && numeroLigne && !lignes) {
    return `${pkHtml} sur la ligne ${numeroHtml}`;
  }
  if (pk && !numeroLigne && lignes) {
    return `${pkHtml} sur la ligne ${lignesHtml}`;
  }
  if (!pk && numeroLigne && lignes) {
    return `Ligne ${numeroHtml} – ${lignesHtml}`;
  }
  if (!pk && !numeroLigne && lignes) {
    return `Ligne ${lignesHtml}`;
  }
  if (!pk && numeroLigne && !lignes) {
    return `Ligne ${numeroHtml}`;
  }
  return "";
}

function construireDetailsPoste(poste) {
  const details = [];
  const lignePk = construireLignePkEtLigne(poste);
  const rss = champCompletOuVide(poste.rss);
  if (lignePk) {
    details.push(lignePk);
  }
  if (rss) {
    details.push(`RSS: ${rss}`);
  }
  const codes = extraireCodesTelecommande(poste.description_telecommande);
  if (codes.length) {
    details.push(codes.join(" "));
  }
  return details.join(SEPARATEUR_LIBELLE);
}

function normaliserCleRss(valeur) {
  return String(valeur || "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace("TABLE", "")
    .trim();
}

function normaliserNumeroTelephone(numero) {
  const chiffres = String(numero || "").replace(/\D/g, "");
  if (chiffres.length === 10 && chiffres.startsWith("0")) {
    return chiffres.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }
  if (chiffres.length === 11 && chiffres.startsWith("33")) {
    return `+33 ${chiffres.slice(2).replace(/(\d{2})(?=\d)/g, "$1 ").trim()}`;
  }
  return String(numero || "").trim();
}

function construireHrefTelephone(numero) {
  const chiffres = String(numero || "").replace(/\D/g, "");
  if (!chiffres) {
    return "";
  }
  if (chiffres.length === 11 && chiffres.startsWith("33")) {
    return `+${chiffres}`;
  }
  return chiffres;
}

function extraireNumerosTelephone(texte) {
  const source = String(texte || "").replace(/\u00a0/g, " ");
  const motif = /(?:\+33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})/g;
  const correspondances = source.match(motif) || [];
  const resultat = [];
  const dejaVu = new Set();

  for (const entree of correspondances) {
    const normalise = normaliserNumeroTelephone(entree);
    const cle = normalise.replace(/\D/g, "");
    if (!cle || dejaVu.has(cle)) {
      continue;
    }
    dejaVu.add(cle);
    resultat.push(normalise);
  }
  return resultat;
}

function obtenirNumerosRssDepuisCode(codeRss) {
  const cle = normaliserCleRss(codeRss);
  const tableau = TABLES_RSS?.[cle];
  if (!Array.isArray(tableau) || !tableau.length) {
    return [];
  }
  return tableau.map((numero) => normaliserNumeroTelephone(numero)).filter(Boolean);
}

function construireLibelleTableRss(codeRss) {
  const cle = normaliserCleRss(codeRss);
  if (cle === "A") {
    return "Table 1";
  }
  if (cle === "B") {
    return "Table 2";
  }
  if (cle === "C") {
    return "Table 3";
  }
  return `Table ${cle || "?"}`;
}

function construireSectionRssPoste(poste) {
  const rss = champCompletOuVide(poste?.rss);
  if (!rss) {
    return "";
  }

  const cle = normaliserCleRss(rss);
  const numeros = obtenirNumerosRssDepuisCode(cle);
  const libelleTable = construireLibelleTableRss(cle);
  if (!numeros.length) {
    return `<section class="popup-section"><p class="popup-poste-ligne">📞 RSS ${echapperHtml(libelleTable)}</p></section>`;
  }

  const boutons = numeros
    .map((numero) => {
      const href = construireHrefTelephone(numero);
      return `<a class="popup-bouton-itineraire" href="tel:${echapperHtml(href)}">${echapperHtml(numero)}</a>`;
    })
    .join("");

  return `<section class="popup-section"><p class="popup-poste-rss-titre">📞 RSS ${echapperHtml(libelleTable)}</p><div class="popup-itineraires popup-itineraires-rss">${boutons}</div></section>`;
}

function construireSectionInformationsPoste(poste) {
  const informations = champCompletOuVide(poste?.description);
  if (!informations) {
    return "";
  }
  return `<section class="popup-section"><p class="popup-poste-ligne">ℹ️ <strong>Informations :</strong> ${echapperHtml(informations)}</p></section>`;
}

function construireSectionContactPoste(poste) {
  const contact = champCompletOuVide(poste?.contact);
  if (!contact) {
    return "";
  }

  const numeros = extraireNumerosTelephone(contact);
  if (!numeros.length) {
    return `<section class="popup-section"><p class="popup-poste-ligne">👤 <strong>Contact :</strong> ${echapperHtml(contact)}</p></section>`;
  }

  const source = String(contact).replace(/\u00a0/g, " ");
  const premierNumero = source.search(/(?:\+33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})/);
  const etiquette = premierNumero > 0 ? source.slice(0, premierNumero).replace(/[:\s]+$/g, "") : "Contact";

  const liensNumeros = numeros
    .map((numero) => {
      const href = construireHrefTelephone(numero);
      return `<a class="popup-poste-contact-numero" href="tel:${echapperHtml(href)}">${echapperHtml(numero)}</a>`;
    })
    .join(" · ");

  return `<section class="popup-section"><p class="popup-poste-ligne">👤 <strong>Contact :</strong> ${echapperHtml(etiquette)}${etiquette ? " : " : " "}${liensNumeros}</p></section>`;
}

function comparerLibellesSat(a, b) {
  const normaliser = (valeur) => String(valeur || "").trim().toUpperCase();
  const A = normaliser(a);
  const B = normaliser(b);

  if (A === B) {
    return 0;
  }
  if (A === "POSTE") {
    return -1;
  }
  if (B === "POSTE") {
    return 1;
  }

  const matchA = A.match(/^SAT(\d+)$/);
  const matchB = B.match(/^SAT(\d+)$/);
  if (matchA && matchB) {
    return Number(matchA[1]) - Number(matchB[1]);
  }
  if (matchA) {
    return -1;
  }
  if (matchB) {
    return 1;
  }
  return A.localeCompare(B, "fr", { sensitivity: "base", numeric: true });
}

function construireSectionAppareilsAssociesDepuisPostes(postesListe, options = {}) {
  if (!Array.isArray(postesListe) || !postesListe.length || !donneesAppareils?.features?.length) {
    return "";
  }

  const clesPostesNomType = new Set(postesListe.map((poste) => construireCleNomType(poste)).filter(Boolean));
  if (!clesPostesNomType.size) {
    return "";
  }

  const normaliserSatDeLien = (libelleSat) => {
    const sat = champCompletOuVide(libelleSat);
    if (!sat) {
      return "";
    }
    return normaliserTexteRecherche(sat) === "poste" ? "" : sat;
  };

  const construireLienAjoutDepuisPoste = (posteEntree, libelleSat) => {
    const nomPoste = champCompletOuVide(posteEntree?.nom);
    if (!nomPoste) {
      return "";
    }
    const typePoste = champCompletOuVide(posteEntree?.type);
    const satPoste = normaliserSatDeLien(libelleSat);
    const urlAjout = new URL("./ajout_appareil.html", window.location.href);
    urlAjout.searchParams.set("poste", nomPoste);
    if (typePoste) {
      urlAjout.searchParams.set("type", typePoste);
    }
    if (satPoste) {
      urlAjout.searchParams.set("sat", satPoste);
    }
    return urlAjout.toString();
  };

  const groupes = new Map();
  for (const feature of donneesAppareils.features) {
    const [longitudeFeature, latitudeFeature] = feature.geometry?.coordinates || [];
    if (!Number.isFinite(longitudeFeature) || !Number.isFinite(latitudeFeature)) {
      continue;
    }
    const appareilsListe = extraireListeDepuisFeature(feature, "appareils_liste_json");
    for (const appareil of appareilsListe) {
      if (!clesPostesNomType.has(construireCleNomType(appareil))) {
        continue;
      }

      const code = champCompletOuVide(appareil?.appareil);
      if (!code) {
        continue;
      }

      const sat = champCompletOuVide(appareil?.SAT) || "Poste";
      const cleSat = sat.toUpperCase();
      if (!groupes.has(cleSat)) {
        groupes.set(cleSat, {
          label: sat,
          codes: new Map()
        });
      }
      const groupe = groupes.get(cleSat);
      if (!groupe.codes.has(code)) {
        groupe.codes.set(code, {
          code,
          longitude: longitudeFeature,
          latitude: latitudeFeature
        });
      }
    }
  }

  if (!groupes.size) {
    return "";
  }

  const lignes = Array.from(groupes.values())
    .sort((a, b) => comparerLibellesSat(a.label, b.label))
    .map((groupe) => {
      const codes = Array.from(groupe.codes.values()).sort((a, b) =>
        String(a.code).localeCompare(String(b.code), "fr", { numeric: true })
      );
      const codesHtml = codes
        .map(
          (entree) =>
            `<button class="popup-poste-appareil-lien" type="button" data-lng="${entree.longitude}" data-lat="${entree.latitude}">${echapperHtml(entree.code)}</button>`
        )
        .join(", ");
      const posteReference = postesListe[0] || null;
      const lienAjout = construireLienAjoutDepuisPoste(posteReference, groupe.label);
      const pillSatHtml =
        lienAjout
          ? `<a class="popup-badge popup-badge-itineraire popup-badge-poste-sat popup-poste-sat-lien" href="${echapperHtml(lienAjout)}">${echapperHtml(groupe.label)}</a>`
          : `<span class="popup-badge popup-badge-itineraire popup-badge-poste-sat">${echapperHtml(groupe.label)}</span>`;
      return `<div class="popup-poste-appareils-groupe"><div class="popup-poste-appareils-entete-ligne">${pillSatHtml}<p class="popup-poste-appareils-ligne">${codesHtml}</p></div></div>`;
    })
    .join("");

  const consigneAjout = "Pour ajouter un appareil, cliquez sur le bouton du lieu concerné : poste ou SAT.";
  return `<section class="popup-section"><p class="popup-poste-aide">${echapperHtml(consigneAjout)}</p><div class="popup-poste-appareils-groupes">${lignes}</div></section>`;
}

function construireFichePosteDepuisEntree(poste, options = {}) {
  if (!poste) {
    return "";
  }
  const titre = construireTitrePoste(poste) || "Poste inconnu";
  const classeHors = poste.hors_patrimoine ? " popup-item-hors" : "";
  const codesTelecommande = extraireCodesTelecommande(poste.description_telecommande);
  const pillsTelecommande = codesTelecommande.length
    ? `<div class="popup-appareils-multi-telecommande popup-poste-telecommande-pills">${codesTelecommande
        .map((code) => `<span class="popup-tag-hp popup-tag-telecommande">${echapperHtml(code)}</span>`)
        .join("")}</div>`
    : "";
  const lignePkSousTitre = construireLignePkEtLigneHtml(poste);
  const sectionAppareilsAvantRss = options.sectionAppareilsAvantRss || "";
  const sectionRss = construireSectionRssPoste(poste);
  const sectionInformations = construireSectionInformationsPoste(poste);
  const sectionContact = construireSectionContactPoste(poste);

  return `<section class="popup-section${classeHors}"><p class="popup-poste-entete-principal">📍 ${echapperHtml(titre)}</p>${pillsTelecommande}${lignePkSousTitre ? `<p class="popup-poste-ligne-titre">🚆 ${lignePkSousTitre}</p>` : ""}</section>${sectionAppareilsAvantRss}${sectionRss}${sectionInformations}${sectionContact}`;
}

function construireSectionPostes(feature, options = {}) {
  const propr = feature.properties || {};
  let postesListe = [];
  try {
    postesListe = JSON.parse(propr.postes_liste_json || "[]");
  } catch {
    postesListe = [];
  }

  if (!postesListe.length) {
    return "";
  }

  const cibleSat = normaliserTexteRecherche(options?.cibleSat || "");
  let postesAffiches = postesListe;
  if (cibleSat) {
    const filtres = postesListe.filter((poste) => {
      const satNorm = normaliserTexteRecherche(champCompletOuVide(poste?.SAT));
      if (cibleSat === "poste") {
        return !satNorm;
      }
      return satNorm === cibleSat;
    });
    if (filtres.length) {
      postesAffiches = filtres;
    }
  }

  if (postesAffiches.length > 1) {
    const lignes = postesAffiches
      .map((p) => {
        const titre = construireTitrePoste(p) || "Poste inconnu";
        const infoLigneHtml = construireLignePkEtLigneHtml(p);
        const rss = champCompletOuVide(p.rss);
        const codesTelecommande = extraireCodesTelecommande(p.description_telecommande);
        const pillsTelecommande = codesTelecommande.length
          ? `<div class="popup-appareils-multi-telecommande">${codesTelecommande
              .map((code) => `<span class="popup-tag-hp popup-tag-telecommande">${echapperHtml(code)}</span>`)
              .join("")}</div>`
          : "";
        const classeHors = p.hors_patrimoine ? "popup-item-hors" : "";
        return `<li class="${classeHors}"><span class="popup-acces-ligne">${echapperHtml(titre)}</span>${pillsTelecommande}${infoLigneHtml ? `<br/><span class="popup-poste-details">${infoLigneHtml}</span>` : ""}${rss ? `<br/><span class="popup-poste-details">RSS: ${echapperHtml(rss)}</span>` : ""}</li>`;
      })
      .join("");
    return `<section class="popup-section"><div class="popup-pill-ligne"><span class="popup-badge popup-badge-postes">${echapperHtml(String(postesAffiches.length))} postes</span></div><ul>${lignes}</ul></section>`;
  }

  const poste = postesAffiches[0] || {};
  return construireFichePosteDepuisEntree(poste);
}

function attacherActionsPopupInterne() {
  if (!popupCarte) {
    return;
  }

  const racinePopup = popupCarte.getElement();
  if (!racinePopup) {
    return;
  }

  const estVueListeAppareilsAssocies = Boolean(racinePopup.querySelector("#popup-retour-fiche-poste"));
  modalFiche?.classList.toggle("est-vue-appareils-associes", estVueListeAppareilsAssocies);
  if (boutonPartagerModalFiche) {
    boutonPartagerModalFiche.hidden = estVueListeAppareilsAssocies;
    boutonPartagerModalFiche.style.display = estVueListeAppareilsAssocies ? "none" : "";
  }

  const ouvrirLienCodes = (url) => {
    if (!url) {
      return;
    }
    const nouvelOnglet = window.open(url, "_blank");
    if (nouvelOnglet) {
      nouvelOnglet.opener = null;
      return;
    }

    // Fallback Safari iOS: certains contextes bloquent window.open,
    // mais acceptent encore un clic programmatique sur une ancre _blank.
    const lien = document.createElement("a");
    lien.href = url;
    lien.target = "_blank";
    lien.rel = "noopener";
    lien.style.display = "none";
    document.body.appendChild(lien);
    lien.click();
    lien.remove();
  };

  if (navigationInternePopup) {
    const boutonVoirAppareils = racinePopup.querySelector("#popup-voir-appareils-associes");
    if (boutonVoirAppareils) {
      boutonVoirAppareils.addEventListener("click", () => {
        if (!popupCarte || !navigationInternePopup?.vueAppareils) {
          return;
        }
        popupCarte.setHTML(navigationInternePopup.vueAppareils);
        attacherActionsPopupInterne();
      });
    }

    const boutonRetourFiche = racinePopup.querySelector("#popup-retour-fiche-poste");
    if (boutonRetourFiche) {
      boutonRetourFiche.addEventListener("click", () => {
        if (!popupCarte || !navigationInternePopup?.vueFiche) {
          return;
        }
        popupCarte.setHTML(navigationInternePopup.vueFiche);
        attacherActionsPopupInterne();
      });
    }
  }

  const boutonsLiaison = racinePopup.querySelectorAll(".popup-bouton-liaison[data-target-type][data-lng][data-lat]");
  for (const boutonLiaison of boutonsLiaison) {
    boutonLiaison.addEventListener("click", async () => {
      const lireNombreAttribut = (nomAttribut) => {
        const brut = boutonLiaison.getAttribute(nomAttribut);
        if (brut == null) {
          return Number.NaN;
        }
        const texte = String(brut).trim();
        if (!texte) {
          return Number.NaN;
        }
        return Number(texte);
      };
      const typeCible = String(boutonLiaison.getAttribute("data-target-type") || "postes").trim() || "postes";
      const longitude = lireNombreAttribut("data-lng");
      const latitude = lireNombreAttribut("data-lat");
      const origineAccesLng = lireNombreAttribut("data-origin-acces-lng");
      const origineAccesLat = lireNombreAttribut("data-origin-acces-lat");
      const originePosteLng = lireNombreAttribut("data-origin-poste-lng");
      const originePosteLat = lireNombreAttribut("data-origin-poste-lat");
      const origineAppareilLng = lireNombreAttribut("data-origin-appareil-lng");
      const origineAppareilLat = lireNombreAttribut("data-origin-appareil-lat");
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      try {
        await activerFiltrePourType(typeCible);
        appliquerCouchesDonnees();
        remonterCouchesDonnees();
      } catch (erreur) {
        console.error(`Impossible d'activer la couche ${typeCible}`, erreur);
      }

      let popupOuverte = false;
      const ouvrirPopup = () => {
        if (popupOuverte) {
          return;
        }
        popupOuverte = true;
        const optionsOuverture = { fallbackGenerique: false };
        if (typeCible === "postes" && Number.isFinite(origineAccesLng) && Number.isFinite(origineAccesLat)) {
          optionsOuverture.coordonneesAccesPreferees = [origineAccesLng, origineAccesLat];
        }
        if (typeCible === "postes" && Number.isFinite(origineAppareilLng) && Number.isFinite(origineAppareilLat)) {
          optionsOuverture.coordonneesAppareilPrecedent = [origineAppareilLng, origineAppareilLat];
        }
        if (typeCible === "acces" && Number.isFinite(originePosteLng) && Number.isFinite(originePosteLat)) {
          optionsOuverture.coordonneesPostePrecedent = [originePosteLng, originePosteLat];
        }
        if (typeCible === "acces" && Number.isFinite(origineAppareilLng) && Number.isFinite(origineAppareilLat)) {
          optionsOuverture.coordonneesAppareilPrecedent = [origineAppareilLng, origineAppareilLat];
        }
        ouvrirPopupDepuisCoordonneesPourType(typeCible, longitude, latitude, optionsOuverture);
      };
      naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
        zoomMin: 14.8,
        durationDouxMs: 420
      });
    });
  }

  const boutonAfficherCodes = racinePopup.querySelector("#popup-afficher-codes-acces");
  if (boutonAfficherCodes) {
    boutonAfficherCodes.addEventListener("click", () => {
      const mode = boutonAfficherCodes.getAttribute("data-mode") || "direct";
      if (mode === "choix") {
        const selectChoix = racinePopup.querySelector("#popup-codes-select");
        if (selectChoix) {
          boutonAfficherCodes.setAttribute("hidden", "hidden");
          selectChoix.removeAttribute("hidden");
          selectChoix.focus();
        }
        return;
      }

      const url = boutonAfficherCodes.getAttribute("data-url");
      ouvrirLienCodes(url);
    });
  }

  const selectChoixCodes = racinePopup.querySelector("#popup-codes-select");
  if (selectChoixCodes) {
    selectChoixCodes.addEventListener("change", () => {
      const url = selectChoixCodes.value;
      if (!url) {
        return;
      }
      ouvrirLienCodes(url);
      selectChoixCodes.value = "";
      selectChoixCodes.setAttribute("hidden", "hidden");
      if (boutonAfficherCodes) {
        boutonAfficherCodes.removeAttribute("hidden");
      }
    });
  }

  const boutonRetourPoste = racinePopup.querySelector("#popup-retour-poste");
  const selectRetourPoste = racinePopup.querySelector("#popup-retour-poste-select");
  if (boutonRetourPoste && selectRetourPoste) {
    boutonRetourPoste.addEventListener("click", () => {
      boutonRetourPoste.setAttribute("hidden", "hidden");
      selectRetourPoste.removeAttribute("hidden");
      selectRetourPoste.focus();
    });
  }
  if (selectRetourPoste) {
    selectRetourPoste.addEventListener("change", async () => {
      const lireNombreAttribut = (element, nomAttribut) => {
        if (!element || typeof element.getAttribute !== "function") {
          return Number.NaN;
        }
        const brut = element.getAttribute(nomAttribut);
        if (brut == null) {
          return Number.NaN;
        }
        const texte = String(brut).trim();
        if (!texte) {
          return Number.NaN;
        }
        return Number(texte);
      };
      const optionChoisie = selectRetourPoste.options[selectRetourPoste.selectedIndex];
      if (!optionChoisie || !optionChoisie.value) {
        return;
      }

      const longitude = lireNombreAttribut(optionChoisie, "data-lng");
      const latitude = lireNombreAttribut(optionChoisie, "data-lat");
      const cibleSatPoste = String(optionChoisie.getAttribute("data-target-sat") || "").trim();
      const origineAccesLng = lireNombreAttribut(selectRetourPoste, "data-origin-acces-lng");
      const origineAccesLat = lireNombreAttribut(selectRetourPoste, "data-origin-acces-lat");
      const origineAppareilLng = lireNombreAttribut(selectRetourPoste, "data-origin-appareil-lng");
      const origineAppareilLat = lireNombreAttribut(selectRetourPoste, "data-origin-appareil-lat");
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      try {
        await activerFiltrePourType("postes");
        appliquerCouchesDonnees();
        remonterCouchesDonnees();
      } catch (erreur) {
        console.error("Impossible d'activer la couche postes", erreur);
      }

      let popupOuverte = false;
      const ouvrirPopup = () => {
        if (popupOuverte) {
          return;
        }
        popupOuverte = true;
        const optionsOuverture = { fallbackGenerique: false };
        if (Number.isFinite(origineAccesLng) && Number.isFinite(origineAccesLat)) {
          optionsOuverture.coordonneesAccesPreferees = [origineAccesLng, origineAccesLat];
        }
        if (Number.isFinite(origineAppareilLng) && Number.isFinite(origineAppareilLat)) {
          optionsOuverture.coordonneesAppareilPrecedent = [origineAppareilLng, origineAppareilLat];
        }
        if (cibleSatPoste) {
          optionsOuverture.cibleSatPoste = cibleSatPoste;
        }
        ouvrirPopupDepuisCoordonneesPourType("postes", longitude, latitude, optionsOuverture);
      };
      naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
        zoomMin: 14.8,
        durationDouxMs: 420
      });

      selectRetourPoste.value = "";
      selectRetourPoste.setAttribute("hidden", "hidden");
      if (boutonRetourPoste) {
        boutonRetourPoste.removeAttribute("hidden");
      }
    });
  }

  const boutonsAppareilsAssocies = racinePopup.querySelectorAll(
    ".popup-poste-appareil-lien[data-lng][data-lat], .popup-poste-sat-lien[data-lng][data-lat]"
  );
  for (const bouton of boutonsAppareilsAssocies) {
    bouton.addEventListener("click", async () => {
      const lireNombreAttribut = (nomAttribut) => {
        const brut = bouton.getAttribute(nomAttribut);
        if (brut == null) {
          return Number.NaN;
        }
        const texte = String(brut).trim();
        if (!texte) {
          return Number.NaN;
        }
        return Number(texte);
      };
      const typeCible = String(bouton.getAttribute("data-target-type") || "appareils").trim() || "appareils";
      const cibleSatPoste = String(bouton.getAttribute("data-target-sat") || "").trim();
      const longitude = lireNombreAttribut("data-lng");
      const latitude = lireNombreAttribut("data-lat");
      const origineAppareilLng = lireNombreAttribut("data-origin-appareil-lng");
      const origineAppareilLat = lireNombreAttribut("data-origin-appareil-lat");
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      try {
        await activerFiltrePourType(typeCible);
        appliquerCouchesDonnees();
        remonterCouchesDonnees();
      } catch (erreur) {
        console.error(`Impossible d'activer la couche ${typeCible}`, erreur);
      }

      fermerMenuContextuel();
      fermerResultatsRecherche();

      let popupOuverte = false;
      const ouvrirPopup = () => {
        if (popupOuverte) {
          return;
        }
        popupOuverte = true;
        const optionsOuverture = { fallbackGenerique: false };
        if (typeCible === "postes" && cibleSatPoste) {
          optionsOuverture.cibleSatPoste = cibleSatPoste;
        }
        if (typeCible === "postes" && Number.isFinite(origineAppareilLng) && Number.isFinite(origineAppareilLat)) {
          optionsOuverture.coordonneesAppareilPrecedent = [origineAppareilLng, origineAppareilLat];
        }
        ouvrirPopupDepuisCoordonneesPourType(typeCible, longitude, latitude, optionsOuverture);
      };
      naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
        zoomMin: 14.8,
        durationDouxMs: 420
      });
    });
  }

  const boutonLocaliserCarte = racinePopup.querySelector("#popup-localiser-carte");
  if (boutonLocaliserCarte) {
    boutonLocaliserCarte.addEventListener("click", () => {
      const longitude = Number(boutonLocaliserCarte.getAttribute("data-lng"));
      const latitude = Number(boutonLocaliserCarte.getAttribute("data-lat"));
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }
      fermerPopupCarte();
      demarrerClignotementLocalisation(longitude, latitude);
    });
  }

  const modalStreetView = racinePopup.querySelector("#popup-streetview-modal");
  const iframeStreetView = racinePopup.querySelector("#popup-streetview-iframe");
  const boutonOuvrirStreetView = racinePopup.querySelector("#popup-ouvrir-street-view");
  const boutonFermerStreetView = racinePopup.querySelector("#popup-fermer-street-view");
  const fermerStreetView = () => {
    if (!modalStreetView) {
      return;
    }
    modalStreetView.setAttribute("hidden", "hidden");
    if (iframeStreetView) {
      iframeStreetView.removeAttribute("src");
    }
  };

  if (boutonOuvrirStreetView && modalStreetView && iframeStreetView) {
    boutonOuvrirStreetView.addEventListener("click", () => {
      const longitude = Number(boutonOuvrirStreetView.getAttribute("data-lng"));
      const latitude = Number(boutonOuvrirStreetView.getAttribute("data-lat"));
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }
      const urlStreetView = `https://maps.google.com/maps?layer=c&cbll=${latitude},${longitude}&cbp=11,0,0,0,0&output=svembed`;
      iframeStreetView.setAttribute("src", urlStreetView);
      modalStreetView.removeAttribute("hidden");
    });
  }

  if (boutonFermerStreetView) {
    boutonFermerStreetView.addEventListener("click", fermerStreetView);
  }
  if (modalStreetView) {
    modalStreetView.addEventListener("click", (event) => {
      if (event.target === modalStreetView) {
        fermerStreetView();
      }
    });
  }
}

function normaliserTexteRecherche(valeur) {
  return String(valeur || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fermerResultatsRecherche() {
  moduleRechercheAlice?.fermerResultatsRecherche?.();
}

function obtenirFeatureALaCoordonnee(collection, longitude, latitude) {
  return (collection?.features || []).find((feature) => {
    const [lng, lat] = feature.geometry?.coordinates || [];
    return lng === longitude && lat === latitude;
  });
}

function obtenirFeatureProche(collection, longitude, latitude, seuilDegres = 0.00045) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  let meilleur = null;
  let meilleureDistance = Infinity;
  for (const feature of collection?.features || []) {
    const [lng, lat] = feature?.geometry?.coordinates || [];
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      continue;
    }
    const distance = Math.hypot(lng - longitude, lat - latitude);
    if (distance < meilleureDistance) {
      meilleureDistance = distance;
      meilleur = feature;
    }
  }

  if (meilleureDistance <= seuilDegres) {
    return meilleur;
  }
  return null;
}

function construirePopupDepuisFeatures(longitude, latitude, featurePostes, featureAcces, featureAppareils, options = {}) {
  const sections = [];
  let coordonneesNavigation = null;
  let sectionAppareilsAssociesPoste = "";
  let coordonneesRetourPosteDepuisAppareil = null;
  let coordonneesRetourAccesDepuisPoste = null;
  let coordonneesRetourPosteDepuisAcces = null;
  let coordonneesPostePrincipalDepuisSat = null;
  let posteAssocieDepuisAppareil = null;
  let sectionRssAssocieDepuisAcces = "";

  if (featurePostes) {
    const sectionPostes = construireSectionPostes(featurePostes, {
      cibleSat: options?.cibleSatPoste || ""
    });
    if (sectionPostes) {
      sections.push(sectionPostes);
    }

    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    const [lngPosteFeature, latPosteFeature] = featurePostes.geometry?.coordinates || [];
    const coordonneesPoste = Number.isFinite(lngPosteFeature) && Number.isFinite(latPosteFeature) ? [lngPosteFeature, latPosteFeature] : null;
    const lngAppareilPrevOption = Number(options?.coordonneesAppareilPrecedent?.[0]);
    const latAppareilPrevOption = Number(options?.coordonneesAppareilPrecedent?.[1]);
    const coordonneesAppareilPrecedentSection =
      Number.isFinite(lngAppareilPrevOption) && Number.isFinite(latAppareilPrevOption)
        ? [lngAppareilPrevOption, latAppareilPrevOption]
        : null;
    sectionAppareilsAssociesPoste = construireSectionAppareilsAssociesDepuisPostes(postesListe, {
      coordonneesPoste,
      coordonneesAppareilPrecedent: coordonneesAppareilPrecedentSection
    });
    coordonneesPostePrincipalDepuisSat = trouverCoordonneesPostePrincipalDepuisFeaturePostes(featurePostes);
  }

  if (featureAcces) {
    const sectionAcces = construireSectionAcces(featureAcces);
    if (sectionAcces) {
      sections.push(sectionAcces);
      sectionRssAssocieDepuisAcces = construireSectionRssAssocieDepuisAcces(featureAcces);
      const [lngAcces, latAcces] = featureAcces.geometry?.coordinates || [];
      if (Number.isFinite(lngAcces) && Number.isFinite(latAcces)) {
        coordonneesNavigation = [lngAcces, latAcces];
      }
    }
  }

  if (featureAppareils && !featurePostes) {
    posteAssocieDepuisAppareil = trouverPosteAssocieDepuisAppareils(featureAppareils);
    if (posteAssocieDepuisAppareil) {
      const coordonneesPoste = trouverCoordonneesPosteDepuisAppareils(featureAppareils);
      sectionAppareilsAssociesPoste = construireSectionAppareilsAssociesDepuisPostes([posteAssocieDepuisAppareil], {
        coordonneesPoste
      });
    }
  }

  if (featureAppareils) {
    const sectionAppareils = construireSectionAppareils(featureAppareils, {
      masquerTitreLieu: Boolean(featurePostes),
      posteAssocie: posteAssocieDepuisAppareil,
      afficherBadgeSupport: !featurePostes,
      afficherContexteLieu: !featurePostes,
      afficherPillsTelecommande: !featurePostes
    });
    if (sectionAppareils) {
      sections.push(sectionAppareils);
    }
  }

  if (!sections.length) {
    return false;
  }

  if (!coordonneesNavigation && featureAppareils) {
    coordonneesNavigation = trouverCoordonneesAccesDepuisAppareils(featureAppareils);
  }

  if (featureAppareils && !featurePostes) {
    coordonneesRetourPosteDepuisAppareil = trouverCoordonneesPosteDepuisAppareils(featureAppareils);
  }
  if (featurePostes) {
    const lngAccesPref = Number(options?.coordonneesAccesPreferees?.[0]);
    const latAccesPref = Number(options?.coordonneesAccesPreferees?.[1]);
    const coordonneesAccesPreferees =
      Number.isFinite(lngAccesPref) && Number.isFinite(latAccesPref) ? [lngAccesPref, latAccesPref] : null;
    coordonneesRetourAccesDepuisPoste = coordonneesAccesPreferees || trouverCoordonneesAccesDepuisPostes(featurePostes);
  }
  if (featureAcces) {
    const lngPostePref = Number(options?.coordonneesPostePrecedent?.[0]);
    const latPostePref = Number(options?.coordonneesPostePrecedent?.[1]);
    if (Number.isFinite(lngPostePref) && Number.isFinite(latPostePref)) {
      coordonneesRetourPosteDepuisAcces = [lngPostePref, latPostePref];
    } else {
      coordonneesRetourPosteDepuisAcces = trouverCoordonneesPosteDepuisAcces(featureAcces);
    }
  }
  if (!coordonneesNavigation && featurePostes) {
    coordonneesNavigation = coordonneesRetourAccesDepuisPoste || trouverCoordonneesAccesDepuisPostes(featurePostes);
  }
  const estVueAppareilsSeule = Boolean(featureAppareils && !featurePostes);
  const estVuePosteSeule = Boolean(featurePostes && !featureAcces && !featureAppareils);
  const estVueAccesSeule = Boolean(featureAcces && !featurePostes && !featureAppareils);
  const estAccesFiche = Boolean(estVueAccesSeule && featureAcces);
  let cibleSatCourante = normaliserTexteRecherche(options?.cibleSatPoste || "");
  if (estVuePosteSeule && !cibleSatCourante && featurePostes) {
    const postesCourants = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (postesCourants.length === 1) {
      const satCourant = normaliserTexteRecherche(champCompletOuVide(postesCourants[0]?.SAT));
      if (satCourant) {
        cibleSatCourante = satCourant;
      }
    }
  }
  const lngAppareilPrev = Number(options?.coordonneesAppareilPrecedent?.[0]);
  const latAppareilPrev = Number(options?.coordonneesAppareilPrecedent?.[1]);
  const coordonneesAppareilPrecedent =
    Number.isFinite(lngAppareilPrev) && Number.isFinite(latAppareilPrev) ? [lngAppareilPrev, latAppareilPrev] : null;
  const choixRetourPostesDepuisAcces = estVueAccesSeule && featureAcces ? trouverChoixPostesDepuisAcces(featureAcces) : [];

  const sectionCodes = (() => {
    if (featurePostes) {
      return construireSectionBoutonCodesPostes(featurePostes);
    }

    if (featureAcces) {
      return construireSectionBoutonCodes(featureAcces);
    }
    return "";
  })();
  const sectionCodesAvecPills =
    sectionCodes && !sectionCodes.includes("Espace sécurisé")
      ? sectionCodes.replace(
          '<section class="popup-section popup-section-codes">',
          '<section class="popup-section popup-section-codes"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Espace sécurisé</span></div>'
        )
      : sectionCodes;
  const appareilsCountCourant = (() => {
    if (!featureAppareils) {
      return 0;
    }
    const countBrut = Number(featureAppareils?.properties?.appareils_count);
    if (Number.isFinite(countBrut) && countBrut > 0) {
      return countBrut;
    }
    const liste = extraireListeDepuisFeature(featureAppareils, "appareils_liste_json");
    return liste.length || 1;
  })();
  const accesCountCourant = (() => {
    if (!featureAcces) {
      return 0;
    }
    const countBrut = Number(featureAcces?.properties?.acces_count);
    if (Number.isFinite(countBrut) && countBrut > 0) {
      return countBrut;
    }
    const liste = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
    return liste.length || 1;
  })();
  const libelleSectionItineraire = (() => {
    if (estVueAppareilsSeule) {
      return appareilsCountCourant > 1 ? "Itinéraire vers l’accès des appareils" : "Itinéraire vers l’accès de cet appareil";
    }
    if (estVuePosteSeule) {
      return cibleSatCourante && cibleSatCourante !== "poste" ? "Itinéraire vers l’accès du SAT" : "Itinéraire vers l’accès du poste";
    }
    if (estVueAccesSeule) {
      return accesCountCourant > 1 ? "Créer un itineraire vers ces accès" : "Créer un itineraire vers cet acces";
    }
    return "Créer un itineraire";
  })();
  const sectionItineraire = coordonneesNavigation
    ? `<section class="popup-section popup-section-itineraires"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">${echapperHtml(libelleSectionItineraire)}</span></div>${construireLiensItineraires(coordonneesNavigation[0], coordonneesNavigation[1])}</section>`
    : "";
  const sectionConsigneRssAcces = estAccesFiche ? construireSectionConsigneRssDepuisAcces(featureAcces) : "";
  const sectionExplorerAcces = estAccesFiche ? construireSectionExplorerAcces(longitude, latitude) : "";
  const modalStreetView = estAccesFiche ? construireModalStreetView() : "";
  const lienImajnet = featurePostes || estVueAppareilsSeule ? construireLienImajnet(longitude, latitude) : "";
  const lienSignalementTerrain =
    "https://forms.office.com/Pages/ResponsePage.aspx?id=OIJ8SplXFkufxprY_OWn2UJJqJxHNcNPmrPMZznt7P1UNUhTNFRJVkhJVzBPMTMyM1g5UUlUMlgzTS4u";
  const classeActionsPoste = "popup-itineraires-poste-actions";
  const libelleSectionActionsPoste = "Explorer les équipements";
  const activerSectionEquipements = Boolean(featurePostes || estVueAppareilsSeule);
  const actionsExplorerEquipements = [];
  const lienAjoutAppareilDepuisPoste = (() => {
    if (!featurePostes || !estVuePosteSeule) {
      return "";
    }

    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      return "";
    }

    let posteCible = postesListe[0];
    if (cibleSatCourante) {
      const filtresSat = postesListe.filter((poste) => {
        const satNorm = normaliserTexteRecherche(champCompletOuVide(poste?.SAT));
        if (cibleSatCourante === "poste") {
          return !satNorm;
        }
        return satNorm === cibleSatCourante;
      });
      if (filtresSat.length) {
        posteCible = filtresSat[0];
      }
    }

    const nomPoste = champCompletOuVide(posteCible?.nom);
    if (!nomPoste) {
      return "";
    }

    const typePoste = champCompletOuVide(posteCible?.type);
    const satPoste = champCompletOuVide(posteCible?.SAT);
    const urlAjout = new URL("./ajout_appareil.html", window.location.href);
    urlAjout.searchParams.set("poste", nomPoste);
    if (typePoste) {
      urlAjout.searchParams.set("type", typePoste);
    }
    if (satPoste) {
      urlAjout.searchParams.set("sat", satPoste);
    }
    return urlAjout.toString();
  })();
  if (lienImajnet) {
    actionsExplorerEquipements.push({
      label: "Imajnet",
      html: `<a class="popup-bouton-itineraire" href="${echapperHtml(lienImajnet)}" target="_blank" rel="noopener noreferrer">🛤️ Imajnet</a>`
    });
  }
  if (sectionAppareilsAssociesPoste) {
    const libelleAfficherAppareils = estVueAppareilsSeule
      ? "💡Afficher d'autres appareils"
      : "💡 Afficher/Ajouter des appareils";
    actionsExplorerEquipements.push({
      label: "Afficher les appareils",
      html: `<button class="popup-bouton-itineraire" id="popup-voir-appareils-associes" type="button">${echapperHtml(libelleAfficherAppareils)}</button>`
    });
  } else if (lienAjoutAppareilDepuisPoste) {
    actionsExplorerEquipements.push({
      label: "Ajouter un appareil",
      html: `<a class="popup-bouton-itineraire" href="${echapperHtml(lienAjoutAppareilDepuisPoste)}">➕ Ajouter un appareil</a>`
    });
  }
  actionsExplorerEquipements.push({
    label: "Localiser sur la carte",
    html: `<button class="popup-bouton-itineraire popup-bouton-localiser" id="popup-localiser-carte" type="button" data-lng="${longitude}" data-lat="${latitude}">📍 Localiser sur la carte</button>`
  });
  actionsExplorerEquipements.push({
    label: "Power BI",
    html: '<span class="popup-bouton-itineraire popup-bouton-desactive" aria-disabled="true">⚡️ Patrimoine SPOT</span>'
  });
  const actionsExploreesTriees = actionsExplorerEquipements
    .sort((a, b) => a.label.localeCompare(b.label, "fr", { sensitivity: "base", numeric: true }))
    .map((action) => action.html)
    .join("");
  const sectionActionsPoste = activerSectionEquipements
    ? `<section class="popup-section popup-section-itineraires"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">${echapperHtml(libelleSectionActionsPoste)}</span></div><div class="popup-itineraires ${classeActionsPoste}">${actionsExploreesTriees}</div></section>`
    : "";
  const sectionTerrain = activerSectionEquipements
    ? `<section class="popup-section popup-section-itineraires"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Terrain</span></div><div class="popup-itineraires popup-itineraires-localiser"><a class="popup-bouton-itineraire" href="${echapperHtml(lienSignalementTerrain)}" target="_blank" rel="noopener noreferrer">🚦 Signaler un STOP & GO ou un incident</a></div></section>`
    : "";
  const boutonsLiaison = [];
  if (estVueAppareilsSeule && coordonneesRetourPosteDepuisAppareil && posteAssocieDepuisAppareil) {
    const attributsOrigineAppareil = ` data-origin-appareil-lng="${longitude}" data-origin-appareil-lat="${latitude}"`;
    if (coordonneesNavigation) {
      boutonsLiaison.push(
        `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="acces" data-lng="${coordonneesNavigation[0]}" data-lat="${coordonneesNavigation[1]}">📄 Consulter la fiche de l'accès routier</button>`
      );
    }
    boutonsLiaison.push(
      `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="postes" data-lng="${coordonneesRetourPosteDepuisAppareil[0]}" data-lat="${coordonneesRetourPosteDepuisAppareil[1]}"${attributsOrigineAppareil}>📄 ${echapperHtml(determinerLibelleRetourPosteDepuisAppareil(featureAppareils))}</button>`
    );
  } else if (estVueAppareilsSeule && coordonneesRetourPosteDepuisAppareil && !posteAssocieDepuisAppareil) {
    const attributsOrigineAcces =
      coordonneesNavigation
        ? ` data-origin-acces-lng="${coordonneesNavigation[0]}" data-origin-acces-lat="${coordonneesNavigation[1]}"`
        : "";
    const attributsOrigineAppareil = ` data-origin-appareil-lng="${longitude}" data-origin-appareil-lat="${latitude}"`;
    boutonsLiaison.push(
      `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="postes" data-lng="${coordonneesRetourPosteDepuisAppareil[0]}" data-lat="${coordonneesRetourPosteDepuisAppareil[1]}"${attributsOrigineAcces}${attributsOrigineAppareil}>📄 ${echapperHtml(determinerLibelleRetourPosteDepuisAppareil(featureAppareils))}</button>`
    );
  }
  if (estVuePosteSeule && coordonneesRetourAccesDepuisPoste) {
    if (cibleSatCourante && cibleSatCourante !== "poste") {
      const coordonneesPosteCible = coordonneesPostePrincipalDepuisSat || [longitude, latitude];
      const attributsOrigineAppareilSatVersPoste =
        coordonneesAppareilPrecedent
          ? ` data-origin-appareil-lng="${coordonneesAppareilPrecedent[0]}" data-origin-appareil-lat="${coordonneesAppareilPrecedent[1]}"`
          : "";
      boutonsLiaison.push(
        `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="postes" data-target-sat="Poste" data-lng="${coordonneesPosteCible[0]}" data-lat="${coordonneesPosteCible[1]}"${attributsOrigineAppareilSatVersPoste}>📄 Accéder à la fiche du poste</button>`
      );
    }
    const attributsOrigineAppareil =
      coordonneesAppareilPrecedent
        ? ` data-origin-appareil-lng="${coordonneesAppareilPrecedent[0]}" data-origin-appareil-lat="${coordonneesAppareilPrecedent[1]}"`
        : "";
    boutonsLiaison.push(
      `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="acces" data-lng="${coordonneesRetourAccesDepuisPoste[0]}" data-lat="${coordonneesRetourAccesDepuisPoste[1]}" data-origin-poste-lng="${longitude}" data-origin-poste-lat="${latitude}"${attributsOrigineAppareil}>📄 Consulter la fiche de l'accès routier</button>`
    );
  }
  if (estVuePosteSeule && coordonneesAppareilPrecedent) {
    boutonsLiaison.push(
      `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="appareils" data-lng="${coordonneesAppareilPrecedent[0]}" data-lat="${coordonneesAppareilPrecedent[1]}">↩ Retour vers l'appareil</button>`
    );
  }
  if (estVueAccesSeule && coordonneesRetourPosteDepuisAcces) {
    const attributsOrigineAppareil =
      coordonneesAppareilPrecedent
        ? ` data-origin-appareil-lng="${coordonneesAppareilPrecedent[0]}" data-origin-appareil-lat="${coordonneesAppareilPrecedent[1]}"`
        : "";
    if (choixRetourPostesDepuisAcces.length > 1) {
      const optionsChoixPostes = choixRetourPostesDepuisAcces
        .map(
          (choix, index) =>
            `<option value="${index}" data-lng="${choix.longitude}" data-lat="${choix.latitude}" data-target-sat="${echapperHtml(
              choix.cibleSat || "Poste"
            )}">📄 ${echapperHtml(choix.label)}</option>`
        )
        .join("");
      boutonsLiaison.push(
        `<button class="popup-bouton-itineraire popup-bouton-localiser" id="popup-retour-poste" type="button">📄 Accéder à la fiche du poste</button><select class="popup-codes-select" id="popup-retour-poste-select" hidden data-origin-acces-lng="${longitude}" data-origin-acces-lat="${latitude}"${attributsOrigineAppareil}><option value="">📄 Choisir un poste</option>${optionsChoixPostes}</select>`
      );
    } else {
      const choixPoste = choixRetourPostesDepuisAcces[0] || null;
      const lngPoste = Number.isFinite(choixPoste?.longitude) ? choixPoste.longitude : coordonneesRetourPosteDepuisAcces[0];
      const latPoste = Number.isFinite(choixPoste?.latitude) ? choixPoste.latitude : coordonneesRetourPosteDepuisAcces[1];
      const satCible = choixPoste?.cibleSat || "Poste";
      boutonsLiaison.push(
        `<button class="popup-bouton-itineraire popup-bouton-localiser popup-bouton-liaison" type="button" data-target-type="postes" data-target-sat="${echapperHtml(
          satCible
        )}" data-lng="${lngPoste}" data-lat="${latPoste}" data-origin-acces-lng="${longitude}" data-origin-acces-lat="${latitude}"${attributsOrigineAppareil}>📄 Accéder à la fiche du poste</button>`
      );
    }
  }
  const prioriteBoutonLiaison = (htmlBouton) => {
    const texte = String(htmlBouton || "");
    if (texte.includes('data-target-type="acces"')) {
      return 0;
    }
    if (texte.includes('data-target-type="postes"')) {
      return 1;
    }
    if (texte.includes('data-target-type="appareils"')) {
      return 2;
    }
    return 3;
  };
  const boutonsLiaisonOrdonnes = [...boutonsLiaison].sort(
    (a, b) => prioriteBoutonLiaison(a) - prioriteBoutonLiaison(b)
  );
  const sectionRetourPoste = boutonsLiaison.length
    ? `<section class="popup-section popup-section-localiser"><div class="popup-itineraires ${boutonsLiaison.length > 1 ? "popup-itineraires-poste-actions" : "popup-itineraires-localiser"}">${boutonsLiaisonOrdonnes.join("")}</div></section>`
    : "";
  const sectionLocaliser = featurePostes || estVueAppareilsSeule || estVueAccesSeule
    ? ""
    : '<section class="popup-section popup-section-localiser"><div class="popup-itineraires popup-itineraires-poste-actions"><button class="popup-bouton-itineraire popup-bouton-localiser" id="popup-localiser-carte" type="button" data-lng="${longitude}" data-lat="${latitude}">📍 Localiser sur la carte</button><span class="popup-bouton-itineraire popup-bouton-desactive" aria-disabled="true">⚡️ Patrimoine SPOT</span></div></section>';
  const sectionRssFinale = estVueAccesSeule ? "" : sectionRssAssocieDepuisAcces;
  const contenuFiche = `<div class="popup-carte">${sections.join("")}${sectionConsigneRssAcces}${sectionRssFinale}${sectionItineraire}${sectionExplorerAcces}${sectionActionsPoste}${sectionTerrain}${sectionCodesAvecPills}${sectionLocaliser}${sectionRetourPoste}${modalStreetView}</div>`;

  let contenuVueAppareils = "";
  if (sectionAppareilsAssociesPoste) {
    contenuVueAppareils = `<div class="popup-carte">${sectionAppareilsAssociesPoste}<section class="popup-section popup-section-itineraires"><div class="popup-itineraires popup-itineraires-localiser"><button class="popup-bouton-itineraire" id="popup-retour-fiche-poste" type="button">📄 Retour à la fiche du poste</button></div></section></div>`;
  }

  fermerPopupCarte({ preserveNavigationLock: conserverFichePendantNavigation });
  const typePartageFiche = estVueAccesSeule ? "acces" : estVueAppareilsSeule ? "appareils" : "postes";
  contextePartageFiche = {
    type: typePartageFiche,
    latitude,
    longitude,
    cibleSatPoste: estVuePosteSeule ? String(options?.cibleSatPoste || "").trim() : ""
  };
  coordonneesDerniereFiche = [longitude, latitude];
  navigationInternePopup = sectionAppareilsAssociesPoste
    ? {
        vueFiche: contenuFiche,
        vueAppareils: contenuVueAppareils
      }
    : null;

  popupCarte = creerPopupFicheModale()
    .setLngLat([longitude, latitude])
    .setHTML(contenuFiche)
    .addTo(carte);
  attacherActionsPopupInterne();
  if (!options?.eviterRecentrageCarte) {
    setTimeout(() => {
      recadrerCartePourPopupMobile(longitude, latitude);
    }, 30);
  }
  popupCarte.on("close", () => {
    popupCarte = null;
    navigationInternePopup = null;
    coordonneesDerniereFiche = null;
    contextePartageFiche = null;
    modalFiche?.classList.remove("est-vue-appareils-associes");
    if (boutonPartagerModalFiche) {
      boutonPartagerModalFiche.hidden = false;
      boutonPartagerModalFiche.style.display = "";
    }
  });

  return true;
}

function ouvrirPopupDepuisCoordonnees(longitude, latitude) {
  let featurePostes = afficherPostes ? obtenirFeatureALaCoordonnee(donneesPostes, longitude, latitude) : null;
  let featureAcces = afficherAcces ? obtenirFeatureALaCoordonnee(donneesAcces, longitude, latitude) : null;
  let featureAppareils = afficherAppareils ? obtenirFeatureALaCoordonnee(donneesAppareils, longitude, latitude) : null;

  if (!featurePostes && afficherPostes) {
    featurePostes = obtenirFeatureProche(donneesPostes, longitude, latitude);
  }
  if (!featureAcces && afficherAcces) {
    featureAcces = obtenirFeatureProche(donneesAcces, longitude, latitude);
  }
  if (!featureAppareils && afficherAppareils) {
    featureAppareils = obtenirFeatureProche(donneesAppareils, longitude, latitude);
  }

  return construirePopupDepuisFeatures(longitude, latitude, featurePostes, featureAcces, featureAppareils);
}

function ouvrirPopupDepuisCoordonneesPourType(type, longitude, latitude, options = {}) {
  let feature = null;

  if (type === "postes") {
    feature = obtenirFeatureALaCoordonnee(donneesPostes, longitude, latitude) || obtenirFeatureProche(donneesPostes, longitude, latitude);
    if (feature) {
      return construirePopupDepuisFeatures(longitude, latitude, feature, null, null, options);
    }
  } else if (type === "appareils") {
    feature =
      obtenirFeatureALaCoordonnee(donneesAppareils, longitude, latitude) || obtenirFeatureProche(donneesAppareils, longitude, latitude);
    if (feature) {
      return construirePopupDepuisFeatures(longitude, latitude, null, null, feature, options);
    }
  } else if (type === "acces") {
    feature = obtenirFeatureALaCoordonnee(donneesAcces, longitude, latitude) || obtenirFeatureProche(donneesAcces, longitude, latitude);
    if (feature) {
      return construirePopupDepuisFeatures(longitude, latitude, null, feature, null, options);
    }
  }

  if (options.fallbackGenerique === false) {
    return false;
  }
  return ouvrirPopupDepuisCoordonnees(longitude, latitude);
}

function ouvrirPopupSurvolDepuisCoordonneesPourType(type, longitude, latitude, options = {}) {
  let feature = null;
  let idCouche = "";

  if (type === "postes") {
    feature = obtenirFeatureALaCoordonnee(donneesPostes, longitude, latitude) || obtenirFeatureProche(donneesPostes, longitude, latitude);
    idCouche = COUCHE_POSTES;
  } else if (type === "appareils") {
    feature =
      obtenirFeatureALaCoordonnee(donneesAppareils, longitude, latitude) || obtenirFeatureProche(donneesAppareils, longitude, latitude);
    idCouche = COUCHE_APPAREILS;
  } else if (type === "acces") {
    feature = obtenirFeatureALaCoordonnee(donneesAcces, longitude, latitude) || obtenirFeatureProche(donneesAcces, longitude, latitude);
    idCouche = COUCHE_ACCES;
  }

  if (!feature || !idCouche) {
    return false;
  }
  ouvrirPopupSurvolInfo({
    ...feature,
    layer: { id: idCouche }
  }, options);
  return true;
}

function ouvrirPopupDepuisResultatRecherche(type, longitude, latitude) {
  let popupOuverte = false;
  const ouvrirPopup = () => {
    if (popupOuverte) {
      return;
    }
    popupOuverte = true;
    if (estSurvolDesktopActif()) {
      ouvrirPopupSurvolDepuisCoordonneesPourType(type, longitude, latitude, { verrouiller: true });
      return;
    }
    ouvrirPopupDepuisCoordonneesPourType(type, longitude, latitude, { fallbackGenerique: false });
  };

  return naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
    forceZoom: true,
    conserverPopupOuvert: !estSurvolDesktopActif(),
    zoomMin: 14.1,
    durationDouxMs: 430
  });
}

function calculerContexteDeplacement(longitude, latitude) {
  const canvas = carte.getCanvas();
  const largeur = canvas?.clientWidth || window.innerWidth;
  const hauteur = canvas?.clientHeight || window.innerHeight;
  const pointCible = carte.project([longitude, latitude]);
  const pointCentre = carte.project(carte.getCenter());
  const distancePixels = Math.hypot(pointCible.x - pointCentre.x, pointCible.y - pointCentre.y);

  const margeHorizontale = Math.min(160, Math.max(90, largeur * 0.18));
  const margeHaut = Math.min(190, Math.max(92, hauteur * 0.2));
  const margeBas = Math.min(115, Math.max(62, hauteur * 0.13));
  const cibleDansZoneConfort =
    pointCible.x > margeHorizontale &&
    pointCible.x < largeur - margeHorizontale &&
    pointCible.y > margeHaut &&
    pointCible.y < hauteur - margeBas;

  return { distancePixels, cibleDansZoneConfort };
}

function naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, options = {}) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || typeof ouvrirPopup !== "function") {
    return false;
  }

  const conserverPopupOuvert = Boolean(options.conserverPopupOuvert);
  const { distancePixels, cibleDansZoneConfort } = calculerContexteDeplacement(longitude, latitude);
  const forcerZoom = Boolean(options.forceZoom);
  if (!forcerZoom && cibleDansZoneConfort && distancePixels < 210) {
    ouvrirPopup();
    return true;
  }

  let temporisationFallbackPopup = null;
  if (conserverPopupOuvert) {
    conserverFichePendantNavigation = true;
  }
  demarrerNavigationPopupProgrammatique();
  carte.once("moveend", () => {
    terminerNavigationPopupProgrammatique();
    if (conserverPopupOuvert) {
      conserverFichePendantNavigation = false;
    }
    if (temporisationFallbackPopup) {
      clearTimeout(temporisationFallbackPopup);
      temporisationFallbackPopup = null;
    }
    ouvrirPopup();
  });

  if (distancePixels < 520) {
    carte.easeTo({
      center: [longitude, latitude],
      zoom: forcerZoom ? Math.max(carte.getZoom(), Number(options.zoomMin) || 14.2) : carte.getZoom(),
      duration: Number(options.durationDouxMs) || 460,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      essential: true
    });
  } else {
    carte.flyTo({
      center: [longitude, latitude],
      zoom: Math.max(carte.getZoom(), Number(options.zoomMin) || 14.2),
      speed: Number(options.speed) || 1.05,
      curve: Number(options.curve) || 1.15,
      essential: true
    });
  }

  temporisationFallbackPopup = setTimeout(() => {
    if (carte.isMoving()) {
      return;
    }
    terminerNavigationPopupProgrammatique();
    if (conserverPopupOuvert) {
      conserverFichePendantNavigation = false;
    }
    ouvrirPopup();
  }, Number(options.fallbackMs) || (distancePixels < 520 ? 980 : 1500));

  return true;
}

function ouvrirPopupAvecAnimationDepuisObjets(objets, options = {}) {
  if (!Array.isArray(objets) || !objets.length) {
    return false;
  }

  const [longitude, latitude] = objets[0]?.geometry?.coordinates || [];
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return false;
  }

  let popupOuverte = false;
  const ouvrirPopup = () => {
    if (popupOuverte) {
      return;
    }
    popupOuverte = true;
    if (!ouvrirPopupDepuisObjetsCarte(objets)) {
      ouvrirPopupDepuisCoordonnees(longitude, latitude);
    }
  };

  return naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, options);
}

function normaliserIdNavigation(valeur) {
  return String(valeur || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function construireIdPosteDepuisEntree(poste) {
  return [champCompletOuVide(poste?.nom), champCompletOuVide(poste?.type)].filter(Boolean).join(" ");
}

function construireIdSatDepuisEntree(poste) {
  return [champCompletOuVide(poste?.nom), champCompletOuVide(poste?.type), champCompletOuVide(poste?.SAT)]
    .filter(Boolean)
    .join(" ");
}

function construireIdAppareilDepuisEntree(appareil) {
  return [
    champCompletOuVide(appareil?.appareil),
    champCompletOuVide(appareil?.nom),
    champCompletOuVide(appareil?.type),
    champCompletOuVide(appareil?.SAT)
  ]
    .filter(Boolean)
    .join(" ");
}

function trouverNavigationDepuisId(identifiant) {
  const idNormalise = normaliserIdNavigation(identifiant);
  if (!idNormalise) {
    return null;
  }

  for (const feature of donneesAppareils?.features || []) {
    const [longitude, latitude] = feature.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    const appareilsListe = extraireListeDepuisFeature(feature, "appareils_liste_json");
    for (const appareil of appareilsListe) {
      if (normaliserIdNavigation(construireIdAppareilDepuisEntree(appareil)) === idNormalise) {
        return { type: "appareils", longitude, latitude };
      }
    }
  }

  for (const feature of donneesPostes?.features || []) {
    const [longitude, latitude] = feature.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    const postesListe = extraireListeDepuisFeature(feature, "postes_liste_json");
    for (const poste of postesListe) {
      if (normaliserIdNavigation(construireIdSatDepuisEntree(poste)) === idNormalise) {
        return { type: "postes", longitude, latitude };
      }
      if (normaliserIdNavigation(construireIdPosteDepuisEntree(poste)) === idNormalise) {
        return { type: "postes", longitude, latitude };
      }
    }
  }

  return null;
}

function ouvrirPopupDepuisObjetsCarte(objets) {
  if (!Array.isArray(objets) || !objets.length) {
    return false;
  }

  const objet = objets[0];
  const [longitude, latitude] = objet.geometry?.coordinates || [];
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return false;
  }

  const idCoucheCliquee = objet.layer?.id;
  let featurePostes = null;
  let featureAcces = null;
  let featureAppareils = null;

  if (idCoucheCliquee === COUCHE_POSTES || idCoucheCliquee === COUCHE_POSTES_GROUPES) {
    featurePostes = objet;
  } else if (idCoucheCliquee === COUCHE_ACCES || idCoucheCliquee === COUCHE_ACCES_GROUPES) {
    featureAcces = objet;
  } else if (idCoucheCliquee === COUCHE_APPAREILS || idCoucheCliquee === COUCHE_APPAREILS_GROUPES) {
    featureAppareils = objet;
  } else {
    return false;
  }

  demarrerClignotementLocalisation(longitude, latitude, { attendreFermetureFicheAvantArret: true });

  const popupOuverte = construirePopupDepuisFeatures(longitude, latitude, featurePostes, featureAcces, featureAppareils, {
    eviterRecentrageCarte: true
  });
  if (!popupOuverte) {
    arreterClignotementLocalisation();
    return false;
  }
  return true;
}

async function ouvrirFicheDepuisParametreId() {
  const params = new URLSearchParams(window.location.search);
  const identifiant = String(params.get("id") || "").trim();
  if (!identifiant) {
    return;
  }

  try {
    await Promise.all([chargerDonneesPostes(), chargerDonneesAppareils()]);
    if (!carte.loaded()) {
      await new Promise((resolve) => {
        carte.once("load", resolve);
      });
    }
    const cible = trouverNavigationDepuisId(identifiant);
    if (!cible) {
      return;
    }

    await activerFiltrePourType(cible.type);
    appliquerCouchesDonnees();
    remonterCouchesDonnees();

    let popupOuverte = false;
    const ouvrirPopup = () => {
      if (popupOuverte) {
        return;
      }
      popupOuverte = true;
      if (estSurvolDesktopActif()) {
        ouvrirPopupSurvolDepuisCoordonneesPourType(cible.type, cible.longitude, cible.latitude, { verrouiller: true });
        return;
      }
      ouvrirPopupDepuisCoordonneesPourType(cible.type, cible.longitude, cible.latitude, { fallbackGenerique: false });
    };

    naviguerVersCoordonneesPuisOuvrirPopup(cible.longitude, cible.latitude, ouvrirPopup, {
      forceZoom: true,
      zoomMin: 14.4,
      durationDouxMs: 430,
      conserverPopupOuvert: !estSurvolDesktopActif()
    });
  } catch (erreur) {
    console.error("Impossible d'ouvrir la fiche depuis le parametre id", erreur);
  }
}

function estParametreUrlActif(valeur) {
  const texte = String(valeur || "")
    .trim()
    .toLowerCase();
  return /^(true|1|oui|yes)\b/.test(texte);
}

async function ouvrirPositionPartageeDepuisParametres() {
  const params = new URLSearchParams(window.location.search);
  const paramLatitude = String(params.get("lat") || "").trim();
  const paramLongitude = String(params.get("lon") ?? params.get("lng") ?? params.get("longitude") ?? "").trim();
  if (!paramLatitude || !paramLongitude) {
    return false;
  }

  const latitude = Number(paramLatitude.replace(",", "."));
  const longitude = Number(paramLongitude.replace(",", "."));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  let zoom = Number(params.get("z") ?? params.get("zoom"));
  if (!Number.isFinite(zoom)) {
    zoom = 18;
  }
  zoom = Math.max(2, Math.min(ZOOM_MAX, zoom));

  const markerActif = estParametreUrlActif(params.get("marker"));

  if (!carte.loaded()) {
    await new Promise((resolve) => {
      carte.once("load", resolve);
    });
  }

  carte.flyTo({
    center: [longitude, latitude],
    zoom,
    duration: 430,
    essential: true
  });

  contexteMenuPosition = { longitude, latitude };
  if (markerActif) {
    afficherMarqueurClicContextuel(longitude, latitude, { clignoter: true, autoRemoveMs: 7000 });
  } else {
    supprimerMarqueurClicContextuel();
  }
  return true;
}

async function ouvrirFichePartageeDepuisParametres() {
  const params = new URLSearchParams(window.location.search);
  const type = normaliserTypePartageFiche(params.get("type"));
  if (!type) {
    return false;
  }

  const paramLatitude = String(params.get("lat") || "").trim();
  const paramLongitude = String(params.get("lon") ?? params.get("lng") ?? params.get("longitude") ?? "").trim();
  if (!paramLatitude || !paramLongitude) {
    return false;
  }

  const latitude = Number(paramLatitude.replace(",", "."));
  const longitude = Number(paramLongitude.replace(",", "."));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  if (!carte.loaded()) {
    await new Promise((resolve) => {
      carte.once("load", resolve);
    });
  }

  await activerFiltrePourType(type);
  appliquerCouchesDonnees();
  remonterCouchesDonnees();

  const cibleSat = String(params.get("sat") || "").trim();
  let popupOuverte = false;
  const ouvrirPopup = () => {
    if (popupOuverte) {
      return;
    }
    popupOuverte = true;
    if (estSurvolDesktopActif()) {
      ouvrirPopupSurvolDepuisCoordonneesPourType(type, longitude, latitude, { verrouiller: true });
      return;
    }
    const options =
      type === "postes" && cibleSat
        ? { fallbackGenerique: false, cibleSatPoste: cibleSat }
        : { fallbackGenerique: false };
    ouvrirPopupDepuisCoordonneesPourType(type, longitude, latitude, options);
  };

  naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
    forceZoom: true,
    zoomMin: 14.4,
    durationDouxMs: 430,
    conserverPopupOuvert: !estSurvolDesktopActif()
  });

  return true;
}

async function activerFiltrePourType(type) {
  if (type === "postes") {
    afficherPostes = true;
    if (casePostes) {
      casePostes.checked = true;
    }
    await chargerDonneesPostes();
    return;
  }

  if (type === "appareils") {
    afficherAppareils = true;
    if (caseAppareils) {
      caseAppareils.checked = true;
    }
    await chargerDonneesAppareils();
    return;
  }

  afficherAcces = true;
  if (caseAcces) {
    caseAcces.checked = true;
  }
  await chargerDonneesAcces();
}

function activerInteractionsCarte() {
  const couchesInteractives = [
    COUCHE_POSTES_GROUPES,
    COUCHE_POSTES,
    COUCHE_ACCES_GROUPES,
    COUCHE_ACCES,
    COUCHE_APPAREILS_GROUPES,
    COUCHE_APPAREILS
  ];
  let temporisationAppuiLong = null;
  let survolCurseurPlanifie = false;
  let dernierPointCurseur = null;
  const couchesInteractivesSurvolPrioritaires = [
    COUCHE_POSTES,
    COUCHE_POSTES_GROUPES,
    COUCHE_ACCES,
    COUCHE_ACCES_GROUPES,
    COUCHE_APPAREILS,
    COUCHE_APPAREILS_GROUPES
  ];
  const estInteractionMobile = () => window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
  const RAYON_TOLERANCE_TAP_MOBILE_PX = 20;
  const PRIORITE_COUCHE_SELECTION = {
    [COUCHE_APPAREILS]: 0,
    [COUCHE_ACCES]: 1,
    [COUCHE_POSTES]: 2,
    [COUCHE_APPAREILS_GROUPES]: 3,
    [COUCHE_ACCES_GROUPES]: 4,
    [COUCHE_POSTES_GROUPES]: 5
  };

  const recupererFeatureContexte = (point) => {
    if (!point) {
      return null;
    }
    const couchesDisponibles = couchesInteractives.filter((id) => Boolean(carte.getLayer(id)));
    if (!couchesDisponibles.length) {
      return null;
    }
    const objets = carte.queryRenderedFeatures(point, { layers: couchesDisponibles });
    return objets[0] || null;
  };

  const interrogerObjetsDepuisTap = (point, couchesDisponibles) => {
    if (!point || !couchesDisponibles.length) {
      return [];
    }
    if (!estInteractionMobile()) {
      return carte.queryRenderedFeatures(point, { layers: couchesDisponibles });
    }
    const rayon = RAYON_TOLERANCE_TAP_MOBILE_PX;
    return carte.queryRenderedFeatures(
      [
        [point.x - rayon, point.y - rayon],
        [point.x + rayon, point.y + rayon]
      ],
      { layers: couchesDisponibles }
    );
  };

  const dedupliquerObjetsSelection = (objets) => {
    const uniques = [];
    const dejaVu = new Set();
    for (const objet of objets || []) {
      const idCouche = String(objet?.layer?.id || "");
      const [lng, lat] = objet?.geometry?.coordinates || [];
      if (!idCouche || !Number.isFinite(lng) || !Number.isFinite(lat)) {
        continue;
      }
      const cle = `${idCouche}|${lng.toFixed(6)}|${lat.toFixed(6)}`;
      if (dejaVu.has(cle)) {
        continue;
      }
      dejaVu.add(cle);
      uniques.push(objet);
    }
    return uniques;
  };

  const choisirMeilleurObjetDepuisTap = (objets, point) => {
    const uniques = dedupliquerObjetsSelection(objets);
    if (!uniques.length || !point) {
      return null;
    }
    const candidats = uniques.map((objet) => {
      const idCouche = String(objet?.layer?.id || "");
      const [lng, lat] = objet?.geometry?.coordinates || [];
      const projection = Number.isFinite(lng) && Number.isFinite(lat) ? carte.project([lng, lat]) : null;
      const distance = projection ? Math.hypot(projection.x - point.x, projection.y - point.y) : Infinity;
      const priorite = Number.isFinite(PRIORITE_COUCHE_SELECTION[idCouche]) ? PRIORITE_COUCHE_SELECTION[idCouche] : 99;
      return { objet, distance, priorite };
    });
    candidats.sort((a, b) => a.distance - b.distance || a.priorite - b.priorite);
    return candidats[0]?.objet || null;
  };

  carte.on("click", (event) => {
    fermerMenuContextuel();

    if (mesureActive) {
      ajouterPointMesure(event.lngLat.lng, event.lngLat.lat);
      return;
    }

    const couchesDisponibles = couchesInteractives.filter((id) => Boolean(carte.getLayer(id)));
    if (!couchesDisponibles.length) {
      return;
    }

    const objets = interrogerObjetsDepuisTap(event.point, couchesDisponibles);
    if (!objets.length) {
      return;
    }

    const meilleurObjet = choisirMeilleurObjetDepuisTap(objets, event.point);
    if (!meilleurObjet) {
      return;
    }
    ouvrirPopupDepuisObjetsCarte([meilleurObjet]);
  });

  carte.on("contextmenu", (event) => {
    event.originalEvent?.preventDefault?.();
    fermerPopupCarte();
    const featureContexte = recupererFeatureContexte(event.point);
    ouvrirMenuContextuel(event, featureContexte);
  });

  carte.on("touchstart", (event) => {
    if (!event.lngLat) {
      return;
    }
    const touches = event.originalEvent?.touches;
    if (touches && touches.length > 1) {
      return;
    }
    temporisationAppuiLong = setTimeout(() => {
      const featureContexte = recupererFeatureContexte(event.point);
      ouvrirMenuContextuel(event, featureContexte);
    }, DUREE_APPUI_LONG_MENU_CONTEXTUEL_MS);
  });

  carte.on("touchend", () => {
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("touchcancel", () => {
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("touchmove", () => {
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("mousemove", (event) => {
    if (!estSurvolDesktopActif()) {
      fermerPopupPnInfo();
      fermerPopupSurvolInfo();
      return;
    }

    dernierPointCurseur = event.point;
    if (survolCurseurPlanifie) {
      return;
    }
    survolCurseurPlanifie = true;
    window.requestAnimationFrame(() => {
      survolCurseurPlanifie = false;
      if (afficherPn && carte.getLayer(COUCHE_PN) && dernierPointCurseur) {
        const pnObjets = carte.queryRenderedFeatures(dernierPointCurseur, {
          layers: [COUCHE_PN]
        });
        if (pnObjets.length) {
          carte.getCanvas().style.cursor = "pointer";
          fermerPopupSurvolInfo();
          ouvrirPopupPnInfo(pnObjets[0]);
          return;
        }
      }
      fermerPopupPnInfo();

      const couchesDisponibles = couchesInteractives.filter((id) => Boolean(carte.getLayer(id)));
      if (!couchesDisponibles.length || !dernierPointCurseur) {
        carte.getCanvas().style.cursor = "";
        return;
      }
      const objets = carte.queryRenderedFeatures(dernierPointCurseur, {
        layers: couchesDisponibles
      });
      carte.getCanvas().style.cursor = objets.length ? "pointer" : "";
      if (!objets.length) {
        if (!popupSurvolInfoVerrouillee) {
          fermerPopupSurvolInfo();
        }
        return;
      }

      const objetSurvole = couchesInteractivesSurvolPrioritaires
        .map((idCouche) => objets.find((objet) => objet?.layer?.id === idCouche))
        .find(Boolean);
      ouvrirPopupSurvolInfo(objetSurvole || objets[0], { verrouiller: false });
    });
  });
  carte.on("mouseout", () => {
    fermerPopupPnInfo();
    fermerPopupSurvolInfo();
    carte.getCanvas().style.cursor = "";
  });

  carte.on("movestart", () => {
    fermerMenuContextuel();
  });

  carte.on("zoomstart", () => {
    fermerMenuContextuel();
  });

  carte.on("dragstart", () => {
    fermerMenuContextuel();
  });

  carte.on("rotatestart", () => {
    fermerMenuContextuel();
  });

  carte.on("pitchstart", () => {
    fermerMenuContextuel();
  });
}

function mettreAJourSelection(nomFond) {
  for (const option of optionsFond) {
    option.checked = option.value === nomFond;
  }
}

function fermerMenuFonds() {
  controleFonds.classList.remove("est-ouvert");
  boutonFonds.setAttribute("aria-expanded", "false");
}

function ouvrirMenuFonds() {
  controleFonds.classList.add("est-ouvert");
  boutonFonds.setAttribute("aria-expanded", "true");
}

function basculerMenuFonds() {
  if (controleFonds.classList.contains("est-ouvert")) {
    fermerMenuFonds();
    return;
  }

  ouvrirMenuFonds();
}

function fermerMenuFiltres() {
  controleFiltres.classList.remove("est-ouvert");
  boutonFiltres.setAttribute("aria-expanded", "false");
}

function ouvrirMenuFiltres() {
  controleFiltres.classList.add("est-ouvert");
  boutonFiltres.setAttribute("aria-expanded", "true");
}

function basculerMenuFiltres() {
  if (controleFiltres.classList.contains("est-ouvert")) {
    fermerMenuFiltres();
    return;
  }

  ouvrirMenuFiltres();
}

function extraireCoordonneesDepuisCollection(collection) {
  const coordonnees = [];
  for (const feature of collection?.features || []) {
    const [longitude, latitude] = feature?.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    coordonnees.push([longitude, latitude]);
  }
  return coordonnees;
}

function obtenirCoordonneesCadrageInitial() {
  const coordonnees = [];

  if (afficherAcces) {
    coordonnees.push(...extraireCoordonneesDepuisCollection(donneesAcces));
  }
  if (afficherPostes) {
    coordonnees.push(...extraireCoordonneesDepuisCollection(donneesPostes));
  }
  if (afficherAppareils) {
    coordonnees.push(...extraireCoordonneesDepuisCollection(donneesAppareils));
  }

  return coordonnees;
}

function cadrerCarteSurDonneesInitiales() {
  const coordonnees = obtenirCoordonneesCadrageInitial();
  if (!coordonnees.length) {
    return;
  }

  if (coordonnees.length === 1) {
    carte.jumpTo({
      center: coordonnees[0],
      zoom: Math.max(carte.getZoom(), 12)
    });
    return;
  }

  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (const [longitude, latitude] of coordonnees) {
    if (longitude < minLng) {
      minLng = longitude;
    }
    if (latitude < minLat) {
      minLat = latitude;
    }
    if (longitude > maxLng) {
      maxLng = longitude;
    }
    if (latitude > maxLat) {
      maxLat = latitude;
    }
  }

  carte.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat]
    ],
    {
      padding: {
        top: 86,
        right: 64,
        bottom: 78,
        left: 64
      },
      maxZoom: 10.8,
      duration: 0
    }
  );
}

async function changerFondCarte(nomFond, options = {}) {
  const forcer = options.force === true;
  if (!fondsCartographiques[nomFond] || (!forcer && nomFond === fondActif)) {
    return;
  }

  const versionChangement = ++compteurChangementFond;
  let styleFond = null;
  try {
    styleFond = await obtenirStyleFond(nomFond);
  } catch (erreur) {
    console.error(`Impossible de charger le fond "${nomFond}"`, erreur);
    return;
  }
  if (!styleFond) {
    return;
  }
  if (versionChangement !== compteurChangementFond) {
    return;
  }

  // Changement de style complet pour basculer proprement entre raster et vectoriel.
  carte.setStyle(styleFond);
  fondActif = nomFond;
  planifierRestaurationFiltres();

  // Certains styles vectoriels se finalisent en plusieurs etapes.
  setTimeout(restaurerAffichageDonnees, 120);
  setTimeout(restaurerAffichageDonnees, 420);
  setTimeout(restaurerAffichageDonnees, 900);
}

function determinerFondIgnAutomatique(zoom, fondCourant = fondActif) {
  return FOND_BASE_IGN_AUTOMATIQUE;
}

function calculerProgressionFonduIgnAuto(zoom) {
  if (!Number.isFinite(zoom)) {
    return 0;
  }
  if (zoom <= ZOOM_DEBUT_FONDU_IGN_AUTO) {
    return 0;
  }
  if (zoom >= ZOOM_FIN_FONDU_IGN_AUTO) {
    return 1;
  }
  const ratio = (zoom - ZOOM_DEBUT_FONDU_IGN_AUTO) / (ZOOM_FIN_FONDU_IGN_AUTO - ZOOM_DEBUT_FONDU_IGN_AUTO);
  return Math.min(1, Math.max(0, ratio));
}

function adoucirProgressionFondu(progress) {
  const borne = Math.min(1, Math.max(0, progress));
  return borne * borne * (3 - 2 * borne);
}

function calculerOpaciteSatelliteIgnAuto(zoom) {
  const progression = calculerProgressionFonduIgnAuto(zoom);
  return adoucirProgressionFondu(progression) * OPACITE_MAX_SATELLITE_IGN_AUTO;
}

function obtenirCoucheInsertionLabels() {
  const style = carte.getStyle();
  const couches = Array.isArray(style?.layers) ? style.layers : [];
  const coucheLabel = couches.find((couche) => couche?.type === "symbol");
  return coucheLabel?.id || undefined;
}

function memoriserCouchesFondNatives() {
  const style = carte.getStyle();
  idsCouchesFondNatives = Array.isArray(style?.layers)
    ? style.layers.map((couche) => couche?.id).filter(Boolean)
    : [];
}

function obtenirProprietesOpaciteParType(typeCouche) {
  switch (typeCouche) {
    case "background":
      return ["background-opacity"];
    case "fill":
      return ["fill-opacity"];
    case "line":
      return ["line-opacity"];
    case "symbol":
      return ["icon-opacity", "text-opacity"];
    case "raster":
      return ["raster-opacity"];
    case "circle":
      return ["circle-opacity"];
    case "fill-extrusion":
      return ["fill-extrusion-opacity"];
    case "heatmap":
      return ["heatmap-opacity"];
    default:
      return [];
  }
}

function appliquerOpaciteCouchesFondNatives(opacite, options = {}) {
  const opaciteBorne = Math.min(1, Math.max(0, opacite));
  const dureeTransition = Number.isFinite(options?.dureeTransitionMs) ? Math.max(0, options.dureeTransitionMs) : 250;
  for (const idCouche of idsCouchesFondNatives) {
    if (idCouche === COUCHE_SATELLITE_IGN_AUTO) {
      continue;
    }
    const couche = carte.getLayer(idCouche);
    if (!couche) {
      continue;
    }
    const proprietes = obtenirProprietesOpaciteParType(couche.type);
    for (const propriete of proprietes) {
      try {
        carte.setPaintProperty(idCouche, `${propriete}-transition`, { duration: dureeTransition, delay: 0 });
        carte.setPaintProperty(idCouche, propriete, opaciteBorne);
      } catch (_erreur) {
        // Ignore les styles ne supportant pas la propriete sur une couche specifique.
      }
    }
  }
}

function assurerCoucheSatelliteIgnAuto() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_SATELLITE_IGN_AUTO)) {
    carte.addSource(SOURCE_SATELLITE_IGN_AUTO, {
      type: "raster",
      tiles: [URL_TUILES_SATELLITE_IGN],
      tileSize: 256,
      maxzoom: 18,
      attribution: "© IGN, © OpenStreetMap contributors"
    });
  }

  if (!carte.getLayer(COUCHE_SATELLITE_IGN_AUTO)) {
    carte.addLayer(
      {
        id: COUCHE_SATELLITE_IGN_AUTO,
        type: "raster",
        source: SOURCE_SATELLITE_IGN_AUTO,
        paint: {
          "raster-opacity": 0,
          "raster-opacity-transition": {
            duration: 250,
            delay: 0
          }
        }
      },
      obtenirCoucheInsertionLabels()
    );
  }
}

function masquerCoucheSatelliteIgnAuto() {
  if (!carte.getLayer(COUCHE_SATELLITE_IGN_AUTO)) {
    return;
  }
  carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity-transition", { duration: 0, delay: 0 });
  carte.setLayoutProperty(COUCHE_SATELLITE_IGN_AUTO, "visibility", "none");
  carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity", 0);
}

function planifierMiseAJourTransitionFondIgnAuto() {
  if (transitionFondIgnAutoPlanifiee) {
    return;
  }
  transitionFondIgnAutoPlanifiee = true;
  window.requestAnimationFrame(() => {
    transitionFondIgnAutoPlanifiee = false;
    mettreAJourTransitionFondIgnAuto();
  });
}

function mettreAJourTransitionFondIgnAuto() {
  if (!carte.isStyleLoaded()) {
    planifierMiseAJourTransitionFondIgnAuto();
    return;
  }

  if (!ignAutomatiqueActif || fondActif !== FOND_BASE_IGN_AUTOMATIQUE) {
    appliquerOpaciteCouchesFondNatives(1, { dureeTransitionMs: 0 });
    masquerCoucheSatelliteIgnAuto();
    return;
  }

  assurerCoucheSatelliteIgnAuto();
  if (!carte.getLayer(COUCHE_SATELLITE_IGN_AUTO)) {
    planifierMiseAJourTransitionFondIgnAuto();
    return;
  }

  const zoomCourant = carte.getZoom();
  const estDezoom =
    Number.isFinite(dernierZoomTransitionFondIgnAuto) && zoomCourant < dernierZoomTransitionFondIgnAuto - 0.001;
  dernierZoomTransitionFondIgnAuto = zoomCourant;

  const opacite = calculerOpaciteSatelliteIgnAuto(zoomCourant);
  const opaciteFond = 1 - opacite;
  const retourRapideVersFondPlan = estDezoom && zoomCourant <= ZOOM_PASSAGE_SATELLITE_IGN;
  const dureeTransition = retourRapideVersFondPlan ? 90 : 180;

  if (retourRapideVersFondPlan) {
    // Au dezoom, on ramene vite le fond plan pour eviter la sensation de latence.
    appliquerOpaciteCouchesFondNatives(1, { dureeTransitionMs: dureeTransition });
  } else {
    appliquerOpaciteCouchesFondNatives(opaciteFond, { dureeTransitionMs: dureeTransition });
  }
  carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity-transition", { duration: dureeTransition, delay: 0 });
  carte.setLayoutProperty(COUCHE_SATELLITE_IGN_AUTO, "visibility", opacite > 0.001 ? "visible" : "none");
  carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity", opacite);
}

function appliquerFondIgnAutomatique() {
  if (!ignAutomatiqueActif) {
    mettreAJourTransitionFondIgnAuto();
    return;
  }

  const fondCible = determinerFondIgnAutomatique(carte.getZoom(), fondActif);
  if (fondCible === fondActif) {
    mettreAJourTransitionFondIgnAuto();
    mettreAJourSelection(FOND_IGN_AUTOMATIQUE);
    return;
  }

  changerFondCarte(fondCible, { force: true });
  mettreAJourSelection(FOND_IGN_AUTOMATIQUE);
}

function choisirFondManuel(nomFond) {
  ignAutomatiqueActif = false;
  mettreAJourTransitionFondIgnAuto();
  changerFondCarte(nomFond);
  mettreAJourSelection(nomFond);
}

function activerFondIgnAutomatique() {
  ignAutomatiqueActif = true;
  mettreAJourSelection(FOND_IGN_AUTOMATIQUE);
  appliquerFondIgnAutomatique({ force: true });
}

function gererStyleCharge() {
  viderMarqueursPk();
  fermerPopupPnInfo();
  memoriserCouchesFondNatives();
  restaurerEtatFiltres();
  restaurerAffichageDonnees();
  rafraichirAffichageMesure();
  mettreAJourTransitionFondIgnAuto();
}

carte.on("style.load", gererStyleCharge);
carte.once("load", lancerInitialisationDonneesSiNecessaire);

if (carte.isStyleLoaded()) {
  gererStyleCharge();
}
if (carte.loaded()) {
  lancerInitialisationDonneesSiNecessaire();
}
bloquerZoomTactileHorsCarte();

carte.on("styledata", () => {
  if (!(afficherAppareils || afficherAcces || afficherPostes || afficherPk || afficherPn || afficherLignes || afficherVitesseLigne)) {
    return;
  }
  if (!carte.isStyleLoaded()) {
    return;
  }
  if (restaurationStylePlanifiee) {
    return;
  }
  restaurationStylePlanifiee = true;
  window.requestAnimationFrame(() => {
    restaurationStylePlanifiee = false;
    if (!carte.isStyleLoaded()) {
      return;
    }
    restaurerEtatFiltres();
    restaurerAffichageDonnees();
    planifierMiseAJourTransitionFondIgnAuto();
  });
});

activerInteractionsCarte();

for (const option of optionsFond) {
  option.addEventListener("change", () => {
    if (!option.checked) {
      return;
    }

    if (option.value === FOND_IGN_AUTOMATIQUE) {
      activerFondIgnAutomatique();
      fermerMenuFonds();
      return;
    }

    choisirFondManuel(option.value);
    fermerMenuFonds();
  });
}

carte.on("zoomend", () => {
  appliquerFondIgnAutomatique();
  planifierMiseAJourPk();
});
carte.on("zoom", planifierMiseAJourTransitionFondIgnAuto);
carte.on("zoomstart", () => {
  fermerPopupPkInfo();
  fermerPopupPnInfo();
  fermerPopupSurvolInfo();
});
carte.on("movestart", () => {
  fermerPopupPkInfo();
  fermerPopupPnInfo();
  fermerPopupSurvolInfo();
});
carte.on("moveend", planifierMiseAJourPk);
carte.on("moveend", planifierMiseAJourTransitionFondIgnAuto);
appliquerFondIgnAutomatique({ force: true });

boutonFonds.addEventListener("click", (event) => {
  event.stopPropagation();
  fermerMenuFiltres();
  basculerMenuFonds();
});

if (caseAppareils) {
  caseAppareils.addEventListener("change", async () => {
    afficherAppareils = caseAppareils.checked;
    if (afficherAppareils) {
      caseAppareils.disabled = true;
      try {
        await chargerDonneesAppareils();
      } catch (erreur) {
        afficherAppareils = false;
        caseAppareils.checked = false;
        console.error("Impossible de charger appareils.geojson", erreur);
        alert(
          "Chargement des appareils impossible. Ouvre la carte via un serveur local (http://localhost...) ou vérifie appareils.geojson."
        );
      } finally {
        caseAppareils.disabled = false;
      }
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  });
}

if (caseAcces) {
  caseAcces.addEventListener("change", async () => {
    afficherAcces = caseAcces.checked;
    if (afficherAcces) {
      caseAcces.disabled = true;
      try {
        await chargerDonneesAcces();
      } catch (erreur) {
        afficherAcces = false;
        caseAcces.checked = false;
        console.error("Impossible de charger acces.geojson", erreur);
        alert(
          "Chargement des acces impossible. Ouvre la carte via un serveur local (http://localhost...) ou vérifie acces.geojson."
        );
      } finally {
        caseAcces.disabled = false;
      }
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  });
}

if (casePostes) {
  casePostes.addEventListener("change", async () => {
    afficherPostes = casePostes.checked;
    if (afficherPostes) {
      casePostes.disabled = true;
      try {
        await chargerDonneesPostes();
      } catch (erreur) {
        afficherPostes = false;
        casePostes.checked = false;
        console.error("Impossible de charger postes.geojson", erreur);
        alert(
          "Chargement des postes impossible. Ouvre la carte via un serveur local (http://localhost...) ou vérifie postes.geojson."
        );
      } finally {
        casePostes.disabled = false;
      }
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  });
}

if (casePk) {
  casePk.addEventListener("change", async () => {
    afficherPk = casePk.checked;
    if (afficherPk) {
      casePk.disabled = true;
      try {
        await chargerDonneesPk();
      } catch (erreur) {
        afficherPk = false;
        casePk.checked = false;
        console.error("Impossible de charger pk.geojson", erreur);
        alert("Chargement des PK impossible. Vérifie la présence de pk.geojson.");
      } finally {
        casePk.disabled = false;
      }
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    planifierMiseAJourPk();
  });
}

if (casePn) {
  casePn.addEventListener("change", async () => {
    afficherPn = casePn.checked;
    if (afficherPn) {
      casePn.disabled = true;
      try {
        await chargerDonneesPn();
      } catch (erreur) {
        afficherPn = false;
        casePn.checked = false;
        console.error("Impossible de charger pn.geojson", erreur);
        alert("Chargement des PN impossible. Vérifie la présence de pn.geojson.");
      } finally {
        casePn.disabled = false;
      }
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    planifierMiseAJourPk();
  });
}

if (caseLignes) {
  caseLignes.addEventListener("change", () => {
    afficherLignes = caseLignes.checked;
    if (afficherLignes) {
      afficherVitesseLigne = false;
      if (caseVitesseLigne) {
        caseVitesseLigne.checked = false;
      }
      masquerMessageInfoVitesseLigne();
      if (temporisationInfoVitesse) {
        clearTimeout(temporisationInfoVitesse);
        temporisationInfoVitesse = null;
      }
    }
    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  });
}

if (caseVitesseLigne) {
  caseVitesseLigne.addEventListener("change", () => {
    afficherVitesseLigne = caseVitesseLigne.checked;
    if (afficherVitesseLigne) {
      afficherLignes = false;
      if (caseLignes) {
        caseLignes.checked = false;
      }
      afficherMessageInfoVitesseLigne();
    } else {
      masquerMessageInfoVitesseLigne();
      if (temporisationInfoVitesse) {
        clearTimeout(temporisationInfoVitesse);
        temporisationInfoVitesse = null;
      }
    }
    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  });
}

async function initialiserDonneesParDefaut() {
  await chargerCompteurPostes();

  if (!afficherAppareils && !afficherAcces && !afficherPostes) {
    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    return;
  }

  if (afficherAppareils) {
    if (caseAppareils) {
      caseAppareils.disabled = true;
    }
    try {
      await chargerDonneesAppareils();
    } catch (erreur) {
      afficherAppareils = false;
      if (caseAppareils) {
        caseAppareils.checked = false;
      }
      console.error("Impossible de charger appareils.geojson", erreur);
    } finally {
      if (caseAppareils) {
        caseAppareils.disabled = false;
      }
    }
  }

  if (afficherAcces) {
    if (caseAcces) {
      caseAcces.disabled = true;
    }
    try {
      await chargerDonneesAcces();
    } catch (erreur) {
      afficherAcces = false;
      if (caseAcces) {
        caseAcces.checked = false;
      }
      console.error("Impossible de charger acces.geojson", erreur);
    } finally {
      if (caseAcces) {
        caseAcces.disabled = false;
      }
    }
  }

  if (afficherPostes) {
    if (casePostes) {
      casePostes.disabled = true;
    }
    try {
      await chargerDonneesPostes();
    } catch (erreur) {
      afficherPostes = false;
      if (casePostes) {
        casePostes.checked = false;
      }
      console.error("Impossible de charger postes.geojson", erreur);
    } finally {
      if (casePostes) {
        casePostes.disabled = false;
      }
    }
  }

  appliquerCouchesDonnees();
  remonterCouchesDonnees();
}

function lancerInitialisationDonneesSiNecessaire() {
  if (initialisationDonneesLancee) {
    return;
  }
  initialisationDonneesLancee = true;
  const demarrer = () => {
    initialiserDonneesParDefaut().catch((erreur) => {
      console.error("Impossible d'initialiser les donnees au demarrage", erreur);
    });
  };

  // Laisse le fond de carte prioritaire au premier affichage.
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(demarrer, { timeout: 1200 });
    return;
  }

  window.setTimeout(demarrer, DELAI_DEMARRAGE_DONNEES_MS);
}

boutonFiltres.addEventListener("click", (event) => {
  event.stopPropagation();
  fermerMenuFonds();
  basculerMenuFiltres();
});

if (boutonItineraire) {
  boutonItineraire.addEventListener("click", async (event) => {
    event.stopPropagation();
    try {
      const module = await obtenirModuleItineraire();
      module?.ouvrir?.();
    } catch (erreur) {
      console.error("Impossible d'ouvrir le module itinéraire", erreur);
      alert("Impossible d'ouvrir le calcul d'itinéraire.");
    }
  });
}

if (boutonLocalisationMobile) {
  boutonLocalisationMobile.addEventListener("click", (event) => {
    event.stopPropagation();
    localiserUtilisateurCarte({ ouvrirPanneauResultats: true });
  });
}

if (boutonLocaliserCarte) {
  boutonLocaliserCarte.addEventListener("click", (event) => {
    event.stopPropagation();
    localiserUtilisateurCarte({ ouvrirPanneauResultats: true });
  });
}

if (boutonInfoCarte) {
  boutonInfoCarte.addEventListener("click", (event) => {
    event.stopPropagation();
    fermerMenuFonds();
    fermerMenuFiltres();
    fermerResultatsRecherche();
    fermerMenuContextuel();
    ouvrirModalApropos();
  });
}

if (boutonLegendeFiltres) {
  boutonLegendeFiltres.addEventListener("click", (event) => {
    event.stopPropagation();
    fermerMenuFonds();
    fermerResultatsRecherche();
    fermerMenuContextuel();
    fermerMenuFiltres();
    basculerMenuLegende();
  });
}

if (boutonFermerLegende) {
  boutonFermerLegende.addEventListener("click", () => {
    fermerMenuLegende();
  });
}

if (boutonFermerModalApropos) {
  boutonFermerModalApropos.addEventListener("click", () => {
    fermerModalApropos();
  });
}

if (doitAfficherModalAproposPremiereVisite()) {
  ouvrirModalApropos();
}

document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("#modal-fiche-partager")) {
    partagerFicheCourante();
    return;
  }
  if (event.target instanceof Element && event.target.closest("#modal-fiche-fermer")) {
    fermerPopupCarte({ localiserPoint: true });
    return;
  }
  if (modalFiche && event.target === modalFiche) {
    fermerPopupCarte({ localiserPoint: true });
  }
  if (modalApropos && event.target === modalApropos) {
    fermerModalApropos();
  }
});

moduleRechercheAlice =
  typeof window.creerModuleRechercheAlice === "function"
    ? window.creerModuleRechercheAlice({
        controleRecherche,
        champRecherche,
        listeResultatsRecherche,
        normaliserTexteRecherche,
        echapperHtml,
        normaliserCouleurHex,
        champCompletOuVide,
        separateurLibelle: SEPARATEUR_LIBELLE,
        construireTitrePoste,
        construireDetailsPoste,
        construireTitreNomTypeSatAcces,
        determinerCouleurAppareil,
        paletteCarte: PALETTE_CARTE,
        paletteAppareils: PALETTE_APPAREILS,
        extraireListeDepuisFeature,
        chargerDonneesPostes,
        chargerDonneesAppareils,
        chargerDonneesAcces,
        getDonneesPostes: () => donneesPostes,
        getDonneesAppareils: () => donneesAppareils,
        getDonneesAcces: () => donneesAcces,
        activerFiltrePourType,
        appliquerCouchesDonnees,
        remonterCouchesDonnees,
        ouvrirPopupDepuisResultatRecherche,
        fermerMenuFiltres,
        fermerMenuFonds,
        definirConservationFichePendantNavigation: (valeur) => {
          conserverFichePendantNavigation = Boolean(valeur);
        }
      })
    : null;

moduleRechercheAlice?.initialiser?.();

if (boutonCtxCoord) {
  boutonCtxCoord.addEventListener("click", async () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    const texteCoordonnees = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    try {
      await navigator.clipboard.writeText(texteCoordonnees);
    } catch {
      window.prompt("Coordonnées :", texteCoordonnees);
    }
    fermerMenuContextuel();
  });
}

if (boutonCtxShare) {
  boutonCtxShare.addEventListener("click", async () => {
    await partagerPositionContextuelle();
    fermerMenuContextuel();
  });
}

if (boutonCtxItin) {
  boutonCtxItin.addEventListener("click", () => {
    basculerSousMenuItineraire();
  });
}

if (boutonCtxGoogleItin) {
  boutonCtxGoogleItin.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, "_blank", "noopener");
    fermerMenuContextuel();
  });
}

if (boutonCtxWaze) {
  boutonCtxWaze.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    window.open(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, "_blank", "noopener");
    fermerMenuContextuel();
  });
}

if (boutonCtxApple) {
  if (!/iPhone|iPad|Macintosh/i.test(navigator.userAgent)) {
    boutonCtxApple.style.display = "none";
  }

  boutonCtxApple.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    window.open(`http://maps.apple.com/?daddr=${latitude},${longitude}`, "_blank", "noopener");
    fermerMenuContextuel();
  });
}

if (boutonCtxRegle) {
  boutonCtxRegle.addEventListener("click", () => {
    if (mesureActive) {
      quitterModeMesure();
      fermerMenuContextuel();
      return;
    }
    activerModeMesure();
    fermerPopupCarte();
    fermerMenuContextuel();
  });
}

if (boutonSortieMesure) {
  boutonSortieMesure.addEventListener("click", () => {
    quitterModeMesure();
  });
}

if (boutonCtxGoogleMarker) {
  boutonCtxGoogleMarker.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank", "noopener");
    fermerMenuContextuel();
  });
}

if (boutonCtxStreet) {
  boutonCtxStreet.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    ouvrirStreetViewEnSurimpression(longitude, latitude);
    fermerMenuContextuel();
  });
}

if (boutonCtxImajnet) {
  boutonCtxImajnet.addEventListener("click", () => {
    window.open(obtenirLienImajnetDepuisContexte(), "_blank", "noopener");
    fermerMenuContextuel();
  });
}

if (boutonCtxAjoutAppareil) {
  boutonCtxAjoutAppareil.addEventListener("click", () => {
    const { latitude, longitude } = contexteMenuPosition;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    const urlAjoutAppareil = new URL("./ajout_appareil.html", window.location.href);
    urlAjoutAppareil.searchParams.set("lat", String(latitude));
    urlAjoutAppareil.searchParams.set("lng", String(longitude));
    window.location.href = urlAjoutAppareil.toString();
    fermerMenuContextuel();
  });
}

async function initialiserNavigationDepuisUrl() {
  const fichePartageeOuverte = await ouvrirFichePartageeDepuisParametres();
  if (!fichePartageeOuverte) {
    await ouvrirPositionPartageeDepuisParametres();
    await ouvrirFicheDepuisParametreId();
  }
}

initialiserNavigationDepuisUrl();

document.addEventListener("click", (event) => {
  if (!controleFonds.contains(event.target)) {
    fermerMenuFonds();
  }

  if (!controleFiltres.contains(event.target)) {
    fermerMenuFiltres();
  }

  if (controleRecherche && !controleRecherche.contains(event.target)) {
    fermerResultatsRecherche();
  }

  if (menuContextuelCarte && !menuContextuelCarte.contains(event.target)) {
    fermerMenuContextuel();
  }

  const clicDansLegende = menuLegendeCarte?.contains(event.target);
  const clicDansControleActions = conteneurControleActionsCarte?.contains(event.target);
  if (!clicDansLegende && !clicDansControleActions) {
    fermerMenuLegende();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fermerModalApropos();
    fermerPopupCarte();
    fermerMenuFonds();
    fermerMenuFiltres();
    fermerResultatsRecherche();
    fermerMenuContextuel();
    fermerMenuLegende();
    if (mesureActive || mesurePoints.length) {
      quitterModeMesure();
    }
  }
});
