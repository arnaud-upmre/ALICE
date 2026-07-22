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
const SOURCE_PN = "pn-source";
const COUCHE_PN = "pn-points";
const SOURCE_LIGNES_OSM = "osm-rail-lines-source";
const SOURCE_LIGNES_OSM_VOIES = "osm-rail-track-refs-source";
const COUCHE_LIGNES_OSM = "osm-rail-lines";
const COUCHE_LIGNES_OSM_CONTOUR = "osm-rail-lines-outline";
const COUCHE_LIGNES_OSM_LABELS = "osm-rail-labels";
const COUCHE_LIGNES_OSM_VOIES = "osm-rail-track-refs";
const SOURCE_LIGNES_ORM_PNG = "openrailwaymap-png-source";
const COUCHE_LIGNES_ORM_PNG = "openrailwaymap-png-lignes";
const SOURCE_LIGNES_ORM_VECTORIELLES_BASSE = "openrailwaymap-vector-low-source";
const SOURCE_LIGNES_ORM_VECTORIELLES_HAUTE = "openrailwaymap-vector-high-source";
const LIMITES_FRANCE_LIGNES_ORM_VECTORIELLES = [-5.3, 41.25, 9.65, 51.2];
const CONTOUR_FRANCE_METROPOLITAINE = {
  type: "MultiPolygon",
  coordinates: [
    [
      [
        [3.588184, 50.378992],
        [4.286023, 49.907497],
        [4.799222, 49.985373],
        [5.674052, 49.529484],
        [5.897759, 49.442667],
        [6.18632, 49.463803],
        [6.65823, 49.201958],
        [8.099279, 49.017784],
        [7.593676, 48.333019],
        [7.466759, 47.620582],
        [7.192202, 47.449766],
        [6.736571, 47.541801],
        [6.768714, 47.287708],
        [6.037389, 46.725779],
        [6.022609, 46.27299],
        [6.5001, 46.429673],
        [6.843593, 45.991147],
        [6.802355, 45.70858],
        [7.096652, 45.333099],
        [6.749955, 45.028518],
        [7.007562, 44.254767],
        [7.549596, 44.127901],
        [7.435185, 43.693845],
        [6.529245, 43.128892],
        [4.556963, 43.399651],
        [3.100411, 43.075201],
        [2.985999, 42.473015],
        [1.826793, 42.343385],
        [0.701591, 42.795734],
        [0.338047, 42.579546],
        [-1.502771, 43.034014],
        [-1.901351, 43.422802],
        [-1.384225, 44.02261],
        [-1.193798, 46.014918],
        [-2.225724, 47.064363],
        [-2.963276, 47.570327],
        [-4.491555, 47.954954],
        [-4.59235, 48.68416],
        [-3.295814, 48.901692],
        [-1.616511, 48.644421],
        [-1.933494, 49.776342],
        [-0.989469, 49.347376],
        [1.338761, 50.127173],
        [1.639001, 50.946606],
        [2.513573, 51.148506],
        [2.658422, 50.796848],
        [3.123252, 50.780363],
        [3.588184, 50.378992]
      ]
    ],
    [
      [
        [9.56, 42.15],
        [9.48, 41.86],
        [9.4, 41.64],
        [9.3, 41.38],
        [9.16, 41.34],
        [8.87, 41.47],
        [8.71, 41.76],
        [8.57, 42.17],
        [8.62, 42.36],
        [8.82, 42.59],
        [9.23, 42.75],
        [9.46, 42.68],
        [9.56, 42.15]
      ]
    ]
  ]
};
const COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_CONTOUR = "openrailwaymap-vector-low-outline";
const COUCHE_LIGNES_ORM_VECTORIELLES_BASSE = "openrailwaymap-vector-low-lines";
const COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_INTERACTION = "openrailwaymap-vector-low-hit";
const COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_CONTOUR = "openrailwaymap-vector-high-outline";
const COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE = "openrailwaymap-vector-high-lines";
const COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_INTERACTION = "openrailwaymap-vector-high-hit";
const SOURCE_LIGNE_RECHERCHE = "ligne-recherche-source";
const COUCHE_LIGNE_RECHERCHE_CONTOUR = "ligne-recherche-highlight-outline";
const COUCHE_LIGNE_RECHERCHE = "ligne-recherche-highlight";
const SOURCE_MESURE = "mesure-source";
const COUCHE_MESURE_SURFACE = "mesure-surface";
const COUCHE_MESURE_LIGNES_FOND = "mesure-lignes-fond";
const COUCHE_MESURE_LIGNES = "mesure-lignes";
const COUCHE_MESURE_GRADUATIONS = "mesure-graduations";
const COUCHE_MESURE_GRADUATIONS_LABELS = "mesure-graduations-labels";
const COUCHE_MESURE_POINTS = "mesure-points";
const COUCHE_MESURE_LABELS = "mesure-labels";
const RAYON_SELECTION_POINT_MESURE_PX = 18;
const ESPACEMENT_MIN_LABELS_GRADUATIONS_PX = 90;
const TABLES_RSS = window.RSS_TABLE_NUMBERS || {};
const DUREE_APPUI_LONG_MENU_CONTEXTUEL_MS = 800;
const DELAI_DEMARRAGE_DONNEES_MS = 220;
const DELAI_MAX_ATTENTE_STABILITE_LIGNES_OSM_MS = 1600;
const PLACEHOLDER_RECHERCHE_DESKTOP = "Rechercher un poste, appareil, acces ou *adresse...";
const PLACEHOLDER_RECHERCHE_MOBILE = "Rechercher...";
const SEPARATEUR_LIBELLE = " ";
const APPAREILS_VIDE = { type: "FeatureCollection", features: [] };
const ACCES_VIDE = { type: "FeatureCollection", features: [] };
const POSTES_VIDE = { type: "FeatureCollection", features: [] };
const PK_VIDE = { type: "FeatureCollection", features: [] };
const PN_VIDE = { type: "FeatureCollection", features: [] };
const LIGNES_OSM_VOIES_VIDE = { type: "FeatureCollection", features: [] };
const ECART_MIN_PLAGES_PK_METRES = 1000;
const PK_ZOOM_MIN = 11;
const PK_ZOOM_RECHERCHE = 17.15;
const LIGNES_OSM_VOIES_ZOOM_MIN = 15.5;
const STYLES_PK_PAR_LIGNE_VISIBLES = Object.freeze([
  {
    background: "rgba(255, 255, 255, 0.98)",
    borderColor: "rgba(17, 24, 39, 0.86)",
    accentColor: "rgba(17, 24, 39, 0.72)",
    color: "#111827"
  },
  {
    background: "rgba(219, 234, 254, 0.98)",
    borderColor: "rgba(29, 78, 216, 0.72)",
    accentColor: "rgba(37, 99, 235, 0.72)",
    color: "#0f172a"
  },
  {
    background: "rgba(254, 243, 199, 0.98)",
    borderColor: "rgba(180, 83, 9, 0.74)",
    accentColor: "rgba(217, 119, 6, 0.76)",
    color: "#0f172a"
  },
  {
    background: "rgba(220, 252, 231, 0.98)",
    borderColor: "rgba(21, 128, 61, 0.72)",
    accentColor: "rgba(22, 163, 74, 0.74)",
    color: "#0f172a"
  },
  {
    background: "rgba(245, 243, 255, 0.98)",
    borderColor: "rgba(109, 40, 217, 0.68)",
    accentColor: "rgba(124, 58, 237, 0.72)",
    color: "#111827"
  },
  {
    background: "rgba(207, 250, 254, 0.98)",
    borderColor: "rgba(8, 145, 178, 0.7)",
    accentColor: "rgba(6, 182, 212, 0.74)",
    color: "#0f172a"
  },
  {
    background: "rgba(255, 228, 230, 0.98)",
    borderColor: "rgba(190, 18, 60, 0.64)",
    accentColor: "rgba(225, 29, 72, 0.7)",
    color: "#111827"
  },
  {
    background: "rgba(237, 233, 254, 0.98)",
    borderColor: "rgba(91, 33, 182, 0.66)",
    accentColor: "rgba(109, 40, 217, 0.7)",
    color: "#111827"
  },
  {
    background: "rgba(255, 237, 213, 0.98)",
    borderColor: "rgba(194, 65, 12, 0.66)",
    accentColor: "rgba(234, 88, 12, 0.72)",
    color: "#111827"
  }
]);
const PALETTE_CARTE = Object.freeze({
  acces: "#7c3aed",
  accesGroupe: "#8b5cf6",
  poste: "#60a5fa",
  posteGroupe: "#93c5fd",
  posteSat: "#1d4ed8",
  posteSatGroupe: "#60a5fa",
  pn: "#06b6d4",
  pnContour: "#164e63",
  pk: "#0f766e",
  adresse: "#be185d",
  itineraire: "#b45309",
  horsPatrimoine: "#ef4444",
  horsPatrimoineGroupe: "#f87171"
});
const PALETTE_APPAREILS = Object.freeze({
  general: "#1d4ed8",
  urgence: "#d90429",
  interrupteur: "#f77f00",
  transfo: "#ffd60a",
  sectionneur: "#2a9d8f",
  alim: "#8d99ae",
  autre: "#111111"
});
const PALETTE_LIGNES_FERROVIAIRES = Object.freeze({
  main: "#f59e0b",
  lgv: "#dc2626",
  getlink: "#1e3a8a",
  branch: "#60a5fa",
  yard: "#94a3b8",
  siding: "#64748b",
  spur: "#c084fc",
  industrial: "#c084fc",
  tourism: "#14b8a6",
  other: "#000000"
});
const LEGENDE_LIGNES_FERROVIAIRES = Object.freeze([
  { className: "trait-ligne-lgv", label: "Ligne grande vitesse" },
  { className: "trait-ligne-getlink", label: "Eurotunnel" },
  { className: "trait-ligne-main", label: "Ligne classique" },
  { className: "trait-ligne-branch", label: "Ligne secondaire" },
  { className: "trait-ligne-yard", label: "Voies de triage / faisceau" },
  { className: "trait-ligne-siding", label: "Voies de service" },
  { className: "trait-ligne-spur", label: "Embranchement / Industrie" },
  { className: "trait-ligne-tourism", label: "Lignes touristiques / préservées" },
  { className: "trait-ligne-autre", label: "Autre" }
]);
const LIBELLES_CATEGORIES_LIGNES_OSM = Object.freeze({
  lgv: "Ligne grande vitesse",
  getlink: "Eurotunnel",
  main: "Ligne classique",
  branch: "Ligne secondaire",
  yard: "Voies de triage / faisceau",
  siding: "Voies de service",
  spur: "Embranchement / Industrie",
  industrial: "Embranchement / Industrie",
  tourism: "Lignes touristiques / préservées",
  unknown: "Autre",
  other: "Autre"
});

function chargerReferentielLignesSiNecessaire() {
  if (window.REFERENTIEL_LIGNES || globalThis.REFERENTIEL_LIGNES) {
    return;
  }

  const requete = new XMLHttpRequest();
  requete.open("GET", "./referentiel-lignes.js", false);
  requete.send(null);
  if (requete.status >= 200 && requete.status < 300 && requete.responseText) {
    Function(requete.responseText)();
  }
}

chargerReferentielLignesSiNecessaire();

function normaliserValeurLigneOsm(valeur) {
  return String(valeur || "").trim();
}

function normaliserCasseLigneOsm(valeur) {
  return normaliserValeurLigneOsm(valeur).toLowerCase();
}

function construireLibelleNomLigneOsmAvecVoie(nom, voie) {
  const nomNormalise = normaliserValeurLigneOsm(nom);
  const voieNormalisee = normaliserValeurLigneOsm(voie);
  if (!nomNormalise) {
    return "";
  }
  if (!voieNormalisee) {
    return nomNormalise;
  }
  return `${nomNormalise} - voie ${voieNormalisee}`;
}

function extraireVitessesNumeriquesLigneOsm(...valeurs) {
  return valeurs
    .flatMap((valeur) => String(valeur || "").match(/\d+(?:[.,]\d+)?/g) || [])
    .map((valeur) => Number.parseFloat(valeur.replace(",", ".")))
    .filter((valeur) => Number.isFinite(valeur));
}

function obtenirReferentielLignes() {
  return window.REFERENTIEL_LIGNES || globalThis.REFERENTIEL_LIGNES || {};
}

function obtenirReferentielLignesOsm() {
  return window.REFERENTIEL_LIGNES_OSM || globalThis.REFERENTIEL_LIGNES_OSM || {};
}

function normaliserCodeLigneReferentiel(numeroLigne) {
  return String(numeroLigne ?? "").trim().toUpperCase();
}

function construireCandidatsCodeLigneReferentiel(numeroLigne) {
  const code = normaliserCodeLigneReferentiel(numeroLigne);
  if (!code) {
    return [];
  }
  const candidats = [code];
  if (/^\d+$/.test(code)) {
    const sansZeros = code.replace(/^0+/, "") || "0";
    candidats.push(sansZeros);
    if (code.length < 6) {
      candidats.push(code.padStart(6, "0"));
    }
  }
  return Array.from(new Set(candidats));
}

function obtenirNomLigneDepuisReferentiel(numeroLigne) {
  const referentiel = obtenirReferentielLignes();
  for (const code of construireCandidatsCodeLigneReferentiel(numeroLigne)) {
    const nom = String(referentiel[code] || "").trim();
    if (nom) {
      return nom;
    }
  }
  return "";
}

function obtenirNomLigneObligatoireDepuisReferentiel(numeroLigne) {
  const nom = obtenirNomLigneDepuisReferentiel(numeroLigne);
  if (nom) {
    return nom;
  }
  const code = normaliserCodeLigneReferentiel(numeroLigne);
  return code ? `Nom absent du référentiel (${code})` : "Code ligne absent";
}

function obtenirNomLigneOsmDepuisReferentiel(osmWayId) {
  const wayId = String(osmWayId || "").trim();
  if (!wayId) {
    return "";
  }
  return String(obtenirReferentielLignesOsm()[wayId] || "").trim();
}

function formaterNomLignePourFiche(nomLigne) {
  const nom = champCompletOuVide(nomLigne);
  if (!nom) {
    return "";
  }
  const nomSansPrefixe = nom.replace(/^Ligne\s+d(?:e\s+|')/i, "").trim();
  if (nomSansPrefixe !== nom) {
    return nomSansPrefixe.toLocaleUpperCase("fr-FR").replace(/\sÀ\s/g, " à ");
  }
  return nom;
}

function construireLibelleLigneDepuisNumero(numeroLigne) {
  const numero = numeroLigne !== "" && numeroLigne !== null && numeroLigne !== undefined
    ? String(numeroLigne).trim()
    : "";
  const nom = formaterNomLignePourFiche(obtenirNomLigneObligatoireDepuisReferentiel(numero));
  if (numero && nom) {
    return `Ligne n°${numero} – ${nom}`;
  }
  if (numero) {
    return `Ligne n°${numero}`;
  }
  if (nom) {
    return `Ligne ${nom}`;
  }
  return "";
}

function construireLibelleLigneOsmDepuisProprietes(proprietes) {
  const reference = normaliserValeurLigneOsm(proprietes.line_ref);
  const vitesse = normaliserValeurLigneOsm(proprietes.maxspeed);
  if (!reference) {
    return construireLibelleLigneOsmSansReference(proprietes, vitesse);
  }
  const nom = normaliserValeurLigneOsm(obtenirNomLigneObligatoireDepuisReferentiel(reference));
  const identite = [reference, nom].filter(Boolean).join(" - ");
  if (identite && vitesse) {
    return `${identite} | V${vitesse}`;
  }
  if (identite) {
    return identite;
  }
  if (vitesse) {
    return `V${vitesse}`;
  }
  return "";
}

function construireLibelleLigneOsmSansReference(proprietes = {}, vitesse = "") {
  const nomReferentielOsm = construireLibelleNomLigneOsmAvecVoie(
    obtenirNomLigneOsmDepuisReferentiel(proprietes.osm_way_id),
    proprietes.track_ref
  );
  if (nomReferentielOsm && vitesse) {
    return `${nomReferentielOsm} | V${vitesse}`;
  }
  if (nomReferentielOsm) {
    return nomReferentielOsm;
  }
  const nomOsm = construireLibelleNomLigneOsmAvecVoie(proprietes.name, proprietes.track_ref);
  if (nomOsm && vitesse) {
    return `${nomOsm} | V${vitesse}`;
  }
  if (nomOsm) {
    return nomOsm;
  }
  const categorie = normaliserValeurLigneOsm(proprietes.alice_category)
    || determinerCategorieLigneOsmDepuisProprietes(proprietes);
  const type = determinerLibelleCategorieLigneOsm(categorie);
  const libelleType = type === LIBELLES_CATEGORIES_LIGNES_OSM.unknown ? "" : type;
  if (libelleType && vitesse) {
    return `${libelleType} V${vitesse}`;
  }
  return libelleType || (vitesse ? `V${vitesse}` : "");
}

function determinerCategorieLigneOsmDepuisProprietes(props = {}) {
  const operateur = normaliserCasseLigneOsm(props.operator);
  const usage = normaliserCasseLigneOsm(props.usage);
  const service = normaliserCasseLigneOsm(props.service);
  const maxspeed = Math.max(
    ...extraireVitessesNumeriquesLigneOsm(props.maxspeed, props.maxspeed_forward, props.maxspeed_backward),
    Number.NEGATIVE_INFINITY
  );

  if (operateur === "getlink") return "getlink";
  if (Number.isFinite(maxspeed) && maxspeed >= 200) return "lgv";
  if (usage === "test") return "other";
  if (usage === "tourism") return "tourism";
  if (usage === "industrial") return "industrial";
  if (service === "yard") return "yard";
  if (service === "siding") return "siding";
  if (service === "spur" || service === "crossover") return "spur";
  if (usage === "branch") return "branch";
  if (usage === "main" || props.line_ref || props.track_ref) return "main";
  return "unknown";
}

function normaliserProprietesLigneOsm(proprietes) {
  const props = { ...(proprietes || {}) };
  props.name = normaliserValeurLigneOsm(props.name);
  props.line_ref = normaliserValeurLigneOsm(props.line_ref);
  props.track_ref = normaliserValeurLigneOsm(props.track_ref);
  props.usage = normaliserValeurLigneOsm(props.usage);
  props.maxspeed = normaliserValeurLigneOsm(props.maxspeed);
  props.maxspeed_forward = normaliserValeurLigneOsm(props.maxspeed_forward);
  props.maxspeed_backward = normaliserValeurLigneOsm(props.maxspeed_backward);
  props.operator = normaliserValeurLigneOsm(props.operator);
  props.service = normaliserValeurLigneOsm(props.service);
  props.osm_way_id = normaliserValeurLigneOsm(props.osm_way_id);
  props.alice_category = determinerCategorieLigneOsmDepuisProprietes(props);
  props.line_label = construireLibelleLigneOsmDepuisProprietes(props);
  return props;
}

function determinerLibelleCategorieLigneOsm(categorie) {
  return LIBELLES_CATEGORIES_LIGNES_OSM[String(categorie || "").trim()] || LIBELLES_CATEGORIES_LIGNES_OSM.unknown;
}

function retrouverNomLigneOsmParCode(codeLigne) {
  return obtenirNomLigneObligatoireDepuisReferentiel(codeLigne);
}

function creerExpressionCategorieLigneOsm() {
  return ["coalesce", ["get", "alice_category"], "unknown"];
}

function creerExpressionCouleurCategorieLigne(categorie = creerExpressionCategorieLigneOsm()) {
  return [
    "match",
    categorie,
    "lgv",
    PALETTE_LIGNES_FERROVIAIRES.lgv,
    "getlink",
    PALETTE_LIGNES_FERROVIAIRES.getlink,
    "main",
    PALETTE_LIGNES_FERROVIAIRES.main,
    "branch",
    PALETTE_LIGNES_FERROVIAIRES.branch,
    "yard",
    PALETTE_LIGNES_FERROVIAIRES.yard,
    "siding",
    PALETTE_LIGNES_FERROVIAIRES.siding,
    "spur",
    PALETTE_LIGNES_FERROVIAIRES.spur,
    "industrial",
    PALETTE_LIGNES_FERROVIAIRES.industrial,
    "tourism",
    PALETTE_LIGNES_FERROVIAIRES.tourism,
    PALETTE_LIGNES_FERROVIAIRES.other
  ];
}

function creerExpressionCouleurLigneOsm() {
  return creerExpressionCouleurCategorieLigne();
}

function creerExpressionLargeurLigneOsm() {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    7,
    [
      "match",
      creerExpressionCategorieLigneOsm(),
      "lgv",
      1.2,
      "getlink",
      0.75,
      "main",
      1.2,
      0.75
    ],
    11,
    [
      "match",
      creerExpressionCategorieLigneOsm(),
      "lgv",
      2.4,
      "getlink",
      1.5,
      "main",
      2.4,
      1.5
    ],
    15,
    [
      "match",
      creerExpressionCategorieLigneOsm(),
      "lgv",
      4,
      "getlink",
      2.6,
      "main",
      4,
      2.6
    ]
  ];
}

function creerExpressionCategorieLigneOrmVectorielle() {
  const usage = ["coalesce", ["get", "usage"], ""];
  const service = ["coalesce", ["get", "service"], ""];
  const operateur = [
    "downcase",
    [
      "to-string",
      ["coalesce", ["get", "operator"], ["get", "primary_operator"], ["get", "owner"], ""]
    ]
  ];
  const typeLigne = ["coalesce", ["get", "feature"], "rail"];

  return [
    "case",
    ["boolean", ["get", "highspeed"], false],
    "lgv",
    ["==", operateur, "getlink"],
    "getlink",
    ["==", usage, "tourism"],
    "tourism",
    ["==", usage, "industrial"],
    "industrial",
    ["==", service, "yard"],
    "yard",
    ["==", service, "siding"],
    "siding",
    ["in", service, ["literal", ["spur", "crossover"]]],
    "spur",
    ["==", usage, "branch"],
    "branch",
    ["==", usage, "main"],
    "main",
    [
      "match",
      typeLigne,
      "tram",
      "unknown",
      "light_rail",
      "unknown",
      "subway",
      "unknown",
      "narrow_gauge",
      "unknown",
      "funicular",
      "unknown",
      "main"
    ]
  ];
}

function creerExpressionCouleurLigneOrmVectorielle() {
  return creerExpressionCouleurCategorieLigne(creerExpressionCategorieLigneOrmVectorielle());
}

function creerExpressionOpaciteLigneOrmVectorielle() {
  return [
    "match",
    ["coalesce", ["get", "state"], "present"],
    "abandoned",
    0.45,
    "razed",
    0.3,
    "disused",
    0.62,
    0.92
  ];
}

function creerFiltreZoneLignesOrmVectorielles() {
  return ["within", CONTOUR_FRANCE_METROPOLITAINE];
}

function normaliserFeatureLigneOrmVectorielle(feature) {
  const props = feature?.properties || {};
  return {
    ...feature,
    properties: normaliserProprietesLigneOsm({
      ...props,
      name: props.name,
      line_ref: props.ref,
      track_ref: props.track_ref,
      usage: props.usage,
      maxspeed: props.maxspeed,
      operator: props.operator || props.primary_operator || props.owner,
      service: props.service,
      osm_way_id: props.osm_id
    })
  };
}

function obtenirCouchesLignesInteractivesActives() {
  if (afficherLignesOsm && carte.getLayer(COUCHE_LIGNES_OSM)) {
    return [COUCHE_LIGNES_OSM];
  }
  if (!afficherLignesOrmVectorielles) {
    return [];
  }
  return [
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_INTERACTION,
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_INTERACTION
  ].filter((id) => Boolean(carte.getLayer(id)));
}

function preparerFeaturePopupLigneActive(feature) {
  return afficherLignesOrmVectorielles ? normaliserFeatureLigneOrmVectorielle(feature) : feature;
}

function appliquerPaletteCarteDansCss() {
  const racine = document.documentElement;
  if (!racine?.style) {
    return;
  }
  racine.style.setProperty("--color-acces", PALETTE_CARTE.acces);
  racine.style.setProperty("--color-acces-groupe", PALETTE_CARTE.accesGroupe);
  racine.style.setProperty("--color-poste", PALETTE_CARTE.poste);
  racine.style.setProperty("--color-poste-groupe", PALETTE_CARTE.posteGroupe);
  racine.style.setProperty("--color-poste-sat", PALETTE_CARTE.posteSat);
  racine.style.setProperty("--color-poste-sat-groupe", PALETTE_CARTE.posteSatGroupe);
  racine.style.setProperty("--color-pn", PALETTE_CARTE.pn);
  racine.style.setProperty("--color-pn-contour", PALETTE_CARTE.pnContour);
  racine.style.setProperty("--color-pk", PALETTE_CARTE.pk);
  racine.style.setProperty("--color-adresse", PALETTE_CARTE.adresse);
  racine.style.setProperty("--color-itineraire", PALETTE_CARTE.itineraire);
  racine.style.setProperty("--color-hp", PALETTE_CARTE.horsPatrimoine);
  racine.style.setProperty("--color-hp-groupe", PALETTE_CARTE.horsPatrimoineGroupe);
  racine.style.setProperty("--color-app-general", PALETTE_APPAREILS.general);
  racine.style.setProperty("--color-app-du", PALETTE_APPAREILS.urgence);
  racine.style.setProperty("--color-app-si", PALETTE_APPAREILS.interrupteur);
  racine.style.setProperty("--color-app-tt", PALETTE_APPAREILS.transfo);
  racine.style.setProperty("--color-app-t", PALETTE_APPAREILS.sectionneur);
  racine.style.setProperty("--color-app-alim", PALETTE_APPAREILS.alim);
  racine.style.setProperty("--color-app-autre", PALETTE_APPAREILS.autre);
  racine.style.setProperty("--color-ligne-main", PALETTE_LIGNES_FERROVIAIRES.main);
  racine.style.setProperty("--color-ligne-lgv", PALETTE_LIGNES_FERROVIAIRES.lgv);
  racine.style.setProperty("--color-ligne-getlink", PALETTE_LIGNES_FERROVIAIRES.getlink);
  racine.style.setProperty("--color-ligne-branch", PALETTE_LIGNES_FERROVIAIRES.branch);
  racine.style.setProperty("--color-ligne-yard", PALETTE_LIGNES_FERROVIAIRES.yard);
  racine.style.setProperty("--color-ligne-siding", PALETTE_LIGNES_FERROVIAIRES.siding);
  racine.style.setProperty("--color-ligne-spur", PALETTE_LIGNES_FERROVIAIRES.spur);
  racine.style.setProperty("--color-ligne-industrial", PALETTE_LIGNES_FERROVIAIRES.industrial);
  racine.style.setProperty("--color-ligne-tourism", PALETTE_LIGNES_FERROVIAIRES.tourism);
  racine.style.setProperty("--color-ligne-other", PALETTE_LIGNES_FERROVIAIRES.other);
  racine.style.setProperty("--badge-postes-fg", PALETTE_CARTE.posteSat);
  racine.style.setProperty("--badge-postes-bg", `color-mix(in srgb, ${PALETTE_CARTE.poste} 22%, transparent)`);
  racine.style.setProperty("--badge-acces-fg", PALETTE_CARTE.acces);
  racine.style.setProperty("--badge-acces-bg", `color-mix(in srgb, ${PALETTE_CARTE.accesGroupe} 20%, transparent)`);
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
const URL_TUILES_SATELLITE_ESRI =
  "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const URL_TUILES_LABELS_VILLES =
  "https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png";

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

const styleSatelliteEsri = {
  version: 8,
  sources: {
    satelliteEsri: {
      type: "raster",
      tiles: [URL_TUILES_SATELLITE_ESRI],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Source: Esri, Maxar, Earthstar Geographics"
    }
  },
  layers: [
    {
      id: "satelliteEsri",
      type: "raster",
      source: "satelliteEsri"
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
const URL_STYLE_DARK_MATTER = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Style vectoriel officiel du Plan IGN (plus fluide pour le fond plan).
const URL_STYLE_PLAN_IGN =
  "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json";
const FOND_IGN_AUTOMATIQUE = "ignAuto";
const FOND_ESRI_AUTOMATIQUE = "esriAuto";
const FOND_BASE_AUTO_CLAIR = "voyager";
const FOND_BASE_AUTO_SOMBRE = "darkMatter";
const ZOOM_PASSAGE_SATELLITE_IGN = 13;
const ZOOM_DEBUT_FONDU_IGN_AUTO = ZOOM_PASSAGE_SATELLITE_IGN;
const ZOOM_FIN_FONDU_IGN_AUTO = ZOOM_MAX - 3;
const OPACITE_MAX_SATELLITE_IGN_AUTO = 1;
const SOURCE_SATELLITE_IGN_AUTO = "satellite-ign-auto-source";
const COUCHE_SATELLITE_IGN_AUTO = "satellite-ign-auto-layer";
const SOURCE_SATELLITE_ESRI_AUTO = "satellite-esri-auto-source";
const COUCHE_SATELLITE_ESRI_AUTO = "satellite-esri-auto-layer";
const SOURCE_LABELS_VILLES = "labels-villes-source";
const COUCHE_LABELS_VILLES = "labels-villes-layer";

const fondsCartographiques = {
  positron: URL_STYLE_POSITRON,
  voyager: URL_STYLE_VOYAGER,
  darkMatter: URL_STYLE_DARK_MATTER,
  planIgn: URL_STYLE_PLAN_IGN,
  osm: stylePlanOsm,
  satelliteIgn: styleSatelliteIgn,
  satelliteEsri: styleSatelliteEsri
};

const stylesFondsVectorielsPrepares = new Map();
const promessesStylesFondsVectoriels = new Map();
let compteurChangementFond = 0;

let fondActif = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
  ? FOND_BASE_AUTO_SOMBRE
  : FOND_BASE_AUTO_CLAIR;
let ignAutomatiqueActif = true;
let modeAutoActif = FOND_IGN_AUTOMATIQUE;
let afficherAppareils = true;
let afficherAcces = true;
let afficherPostes = true;
let afficherPk = false;
let afficherPn = false;
let afficherLignesOsm = false;
let afficherLignesOrmPng = false;
let afficherLignesOrmVectorielles = false;
let donneesAppareils = null;
let donneesAcces = null;
let donneesPostes = null;
let donneesPk = null;
let donneesPkAffichees = PK_VIDE;
let stylesPkParCodeLigneVisible = new Map();
let donneesPn = null;
let donneesLignesOsm = null;
let donneesLignesOsmVoies = null;
let promesseChargementAppareils = null;
let promesseChargementAcces = null;
let promesseChargementPostes = null;
let promesseChargementPk = null;
let promesseChargementPn = null;
let promesseChargementLignesOsm = null;
let activationAutoLigneFerroviairePlanifiee = false;
let popupCarte = null;
let popupPkInfo = null;
let popupPkInfoEpinglee = false;
let popupPnInfo = null;
let signaturePopupPnInfo = "";
let popupPnInfoEpinglee = false;
let popupLigneOsmInfo = null;
let popupLigneOsmInfoEpinglee = false;
let temporisationClignotementLigneRecherche = null;
let intervalleClignotementLigneRecherche = null;
let boutonRetourAffichageLigneRecherche = null;
let popupSurvolInfo = null;
let signaturePopupSurvolInfo = "";
let popupSurvolInfoVerrouillee = false;
let survolPopupVerrouilleJusqua = 0;
let initialisationDonneesLancee = false;
let totalAppareilsBrut = 0;
let totalPostesBrut = 0;
let moduleRechercheAlice = null;
let menuContextuelOuvert = false;
let mesureActive = false;
let mesurePoints = [];
let mesurePolygoneFerme = false;
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
const mediaQueryModeSombre = window.matchMedia?.("(prefers-color-scheme: dark)") || null;
let controleAttributionCarte = null;
let signatureAttributionCarte = "";
let idsCouchesFondNatives = [];
let contexteMenuPosition = {
  longitude: null,
  latitude: null
};
let contexteMenuFeature = null;
let notificationPartageCopieElement = null;
let minuterieNotificationPartageCopie = null;
let elementMarqueurLocalisation = null;
let capLocalisationDegres = null;
let ecouteOrientationAppareilActive = false;
let boutonSuiviCarte = null;
let idSuiviGeolocalisation = null;
let modeSuiviLocalisationActif = false;
let navigationSuiviLocalisationAutomatiqueEnCours = false;
let minuterieFinNavigationSuiviLocalisation = null;
let suspensionSuiviLocalisationJusqua = 0;
let adresseMenuContextuel = "";
let signatureAdresseMenuContextuel = "";
const DIAMETRE_ICONE_GROUPE_APPAREILS = 84;
const DUREE_SUSPENSION_SUIVI_LOCALISATION_MS = 5000;

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

  if (nomFond !== "positron" && nomFond !== "voyager" && nomFond !== "darkMatter") {
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
  const codesTransformateursExacts = new Set(["B1", "B2", "B3"]);

  if (!code) {
    return PALETTE_APPAREILS.autre;
  }

  if (/^PF\s*\d/.test(code)) {
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
    codesTransformateursExacts.has(code) ||
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

function construireCleParentSatDepuisProprietes(proprietes, avecType = true) {
  const nom = String(proprietes?.nom || "").trim().toLowerCase();
  const type = String(proprietes?.type || "").trim().toLowerCase();
  return avecType ? `${nom}|${type}` : nom;
}

function indexerNumerosLignePostesParents(geojson) {
  const parNomType = new Map();
  const parNom = new Map();

  for (const feature of geojson.features || []) {
    const propr = feature?.properties || {};
    if (String(propr.SAT || "").trim()) {
      continue;
    }

    const numeroLigne = normaliserCodeLigneReferentiel(propr.numero_ligne);
    if (!numeroLigne) {
      continue;
    }

    const cleNomType = construireCleParentSatDepuisProprietes(propr, true);
    const cleNom = construireCleParentSatDepuisProprietes(propr, false);
    if (cleNomType && !parNomType.has(cleNomType)) {
      parNomType.set(cleNomType, numeroLigne);
    }
    if (cleNom) {
      if (!parNom.has(cleNom)) {
        parNom.set(cleNom, new Set());
      }
      parNom.get(cleNom).add(numeroLigne);
    }
  }

  return { parNomType, parNom };
}

function obtenirNumeroLigneHeritePosteSat(propr, indexParents) {
  const sat = String(propr?.SAT || "").trim();
  if (!sat) {
    return propr?.numero_ligne ?? "";
  }

  const numeroLigneSpecifiqueSat = normaliserCodeLigneReferentiel(propr?.numero_ligne);
  if (numeroLigneSpecifiqueSat) {
    return numeroLigneSpecifiqueSat;
  }

  const cleNomType = construireCleParentSatDepuisProprietes(propr, true);
  const ligneParentMemeType = indexParents.parNomType.get(cleNomType);
  if (ligneParentMemeType) {
    return ligneParentMemeType;
  }

  const cleNom = construireCleParentSatDepuisProprietes(propr, false);
  const lignesParentMemeNom = Array.from(indexParents.parNom.get(cleNom) || []);
  if (lignesParentMemeNom.length === 1) {
    return lignesParentMemeNom[0];
  }

  console.warn("SAT sans poste parent exploitable pour le numero_ligne", {
    nom: propr?.nom || "",
    type: propr?.type || "",
    SAT: sat
  });
  return propr?.numero_ligne ?? "";
}

function regrouperPostesParCoordonnees(geojson) {
  const groupes = new Map();
  const indexNumerosLigneParents = indexerNumerosLignePostesParents(geojson);

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
        clesPostesVues: new Set()
      });
    }

    const groupe = groupes.get(cle);
    const typeNormalise = String(propr.type || "")
      .trim()
      .toLowerCase();
    const satNormalise = String(propr.SAT || "")
      .trim()
      .toLowerCase();
    const clePoste = [nomNormalise, typeNormalise, satNormalise].join("|");
    if (clePoste && groupe.clesPostesVues.has(clePoste)) {
      continue;
    }

    const numeroLigne = obtenirNumeroLigneHeritePosteSat(propr, indexNumerosLigneParents);
    const poste = {
      nom: propr.nom || "",
      type: propr.type || "",
      SAT: propr.SAT || "",
      est_sat: Boolean(String(propr.SAT || "").trim()),
      armen: Array.isArray(propr.armen) ? [...propr.armen] : propr.armen,
      acces: propr.acces || "",
      code: estCodeDisponible(propr.code),
      description: propr.description || "",
      description_telecommande: propr.description_telecommande || "",
      rss: propr.rss || "",
      contact: propr.contact || "",
      lignes: obtenirNomLigneObligatoireDepuisReferentiel(numeroLigne),
      numero_ligne: numeroLigne,
      pk: "",
      hors_patrimoine: estHorsPatrimoine(propr.hors_patrimoine),
      special: estHorsPatrimoine(propr.special)
    };

    if (clePoste) {
      groupe.clesPostesVues.add(clePoste);
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
          sat_count: unique.est_sat ? 1 : 0,
          est_sat: unique.est_sat,
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
        sat_count: groupe.postes.filter((p) => p.est_sat).length,
        est_sat: groupe.postes.some((p) => p.est_sat),
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
const LIEN_MAPLIBRE = "https://maplibre.org/";
const AFFICHER_MENTION_SNCF_PAR_DEFAUT = true;
const VERSION_MAPLIBRE =
  typeof maplibregl?.getVersion === "function"
    ? maplibregl.getVersion()
    : typeof maplibregl?.version === "string"
      ? maplibregl.version
      : null;

function construireAttributionsDynamiquesCarte() {
  const attributions = [];
  attributions.push(
    `<a href="${LIEN_MAPLIBRE}" target="_blank" rel="noopener noreferrer">MapLibre GL JS${VERSION_MAPLIBRE ? ` v${VERSION_MAPLIBRE}` : ""}</a>`
  );
  if (AFFICHER_MENTION_SNCF_PAR_DEFAUT) {
    attributions.push(
      `<a href="${LIEN_SNCF_OPEN_DATA}" target="_blank" rel="noopener noreferrer">SNCF Open Data</a>`
    );
  }
  if (afficherAppareils || afficherAcces || afficherPostes) {
    attributions.push("© ALICE - réutilisation interdite sans autorisation.");
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
const libelleFondAutoIgn = document.getElementById("libelle-fond-auto-ign");
const libelleFondAutoEsri = document.getElementById("libelle-fond-auto-esri");
const caseLabelsIgn = document.getElementById("labels-ign");
const caseLabelsEsri = document.getElementById("labels-esri");
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
const caseLignesOsm = document.querySelector('input[name="filtre-lignes-osm"]');
const caseLignesOrmPng = document.querySelector('input[name="filtre-lignes-orm-png"]');
const caseLignesOrmVectorielles = document.querySelector('input[name="filtre-lignes-orm-vectorielles"]');
const compteurAppareils = document.getElementById("compteur-appareils");
const compteurAcces = document.getElementById("compteur-acces");
const compteurPostes = document.getElementById("compteur-postes");
const compteurPn = document.getElementById("compteur-pn");
const controleRecherche = document.getElementById("controle-recherche");
const champRecherche = document.getElementById("champ-recherche");
const listeResultatsRecherche = document.getElementById("recherche-resultats");
const infoPk = document.getElementById("info-pk");
const infoChargementCouche = document.getElementById("info-chargement-couche");
const menuContextuelCarte = document.getElementById("menu-contextuel-carte");
const boutonCtxCoord = document.getElementById("ctx-coord");
const boutonCtxAdresse = document.getElementById("ctx-address");
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
const listeLegendeLignesOsm = document.getElementById("liste-legende-lignes-osm");
const modalApropos = document.getElementById("modal-apropos");
const boutonFermerModalApropos = document.getElementById("modal-apropos-fermer");
const pillVersionApropos = document.getElementById("apropos-version-pill");
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
let temporisationInfoPk = null;
let temporisationInfoChargementCouche = null;
let moduleItineraire = null;
let promesseChargementModuleItineraire = null;

function rendreLegendeLignesOsm() {
  if (!listeLegendeLignesOsm) {
    return;
  }
  listeLegendeLignesOsm.innerHTML = LEGENDE_LIGNES_FERROVIAIRES.map(
    (item) =>
      `<li class="menu-legende-item"><span class="menu-legende-trait ${item.className}"></span>${echapperHtml(item.label)}</li>`
  ).join("");
}
rendreLegendeLignesOsm();
let moduleLocalisation = null;
let promesseChargementModuleLocalisation = null;
let promesseChargementMeteo = null;
let rafMiseAJourPk = null;
let marqueursPk = [];
let evenementInstallationPwaDiffere = null;

async function synchroniserVersionAproposDepuisHistorique() {
  if (!pillVersionApropos) {
    return;
  }

  try {
    const reponse = await fetch("./versions.html", { cache: "no-store" });
    if (!reponse.ok) {
      return;
    }
    const html = await reponse.text();
    const documentHistorique = new DOMParser().parseFromString(html, "text/html");
    const versionRecente = documentHistorique.querySelector(".timeline .item .commit")?.textContent?.trim();
    if (versionRecente) {
      pillVersionApropos.textContent = versionRecente;
    }
  } catch {
    // On conserve la version statique de secours.
  }
}
synchroniserVersionAproposDepuisHistorique();

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

    const boutonSuivi = document.createElement("button");
    boutonSuivi.type = "button";
    boutonSuivi.className = "bouton-carte-action bouton-carte-suivi";
    boutonSuivi.setAttribute("data-role", "suivi-carte");
    boutonSuivi.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.36 4.9c-.45-.86.42-1.78 1.3-1.36l13.78 6.64c.76.37.76 1.45 0 1.82L5.66 18.64c-.88.42-1.75-.5-1.3-1.36l3.2-6.14a.9.9 0 0 0 0-.84L4.36 4.9z"/>
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

    conteneur.append(boutonLocaliser, boutonSuivi, boutonInfo);
    conteneurControleActionsCarte = conteneur;
    boutonLocaliserCarte = boutonLocaliser;
    boutonSuiviCarte = boutonSuivi;
    boutonInfoCarte = boutonInfo;
    mettreAJourEtatBoutonSuiviLocalisation();
    return conteneur;
  }

  onRemove() {
    if (conteneurControleActionsCarte?.parentNode) {
      conteneurControleActionsCarte.parentNode.removeChild(conteneurControleActionsCarte);
    }
    conteneurControleActionsCarte = null;
    boutonLocaliserCarte = null;
    boutonSuiviCarte = null;
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

function planifierResizeCarte(options = {}) {
  const { stabiliserViewport = false } = options;
  window.requestAnimationFrame(() => {
    carte.resize();
  });

  if (!stabiliserViewport) {
    return;
  }

  window.setTimeout(() => {
    carte.resize();
  }, 120);
  window.setTimeout(() => {
    carte.resize();
  }, 380);
}

function forcerRafraichissementCarte(options = {}) {
  const { tentativesDifferees = false } = options;
  const rafraichir = () => {
    carte.resize();
    if (typeof carte.triggerRepaint === "function") {
      carte.triggerRepaint();
    }
  };

  window.requestAnimationFrame(rafraichir);

  if (!tentativesDifferees) {
    return;
  }

  window.setTimeout(rafraichir, 120);
  window.setTimeout(rafraichir, 380);
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

function masquerMessageChargementCouche() {
  if (!infoChargementCouche) {
    return;
  }
  infoChargementCouche.classList.remove("est-visible");
  infoChargementCouche.setAttribute("aria-hidden", "true");
  if (temporisationInfoChargementCouche) {
    clearTimeout(temporisationInfoChargementCouche);
    temporisationInfoChargementCouche = null;
  }
}

function afficherMessageChargementCouche(message) {
  if (!infoChargementCouche) {
    return;
  }
  infoChargementCouche.textContent = message;
  infoChargementCouche.classList.add("est-visible");
  infoChargementCouche.setAttribute("aria-hidden", "false");
  if (temporisationInfoChargementCouche) {
    clearTimeout(temporisationInfoChargementCouche);
  }
  temporisationInfoChargementCouche = setTimeout(() => {
    masquerMessageChargementCouche();
  }, 15000);
}

function masquerMessageChargementApresRenduCarte() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      masquerMessageChargementCouche();
    });
  });
}

function masquerMessageChargementAuReposCarte() {
  if (!carte || !carte.loaded()) {
    masquerMessageChargementApresRenduCarte();
    return;
  }
  carte.once("idle", masquerMessageChargementCouche);
  if (temporisationInfoChargementCouche) {
    clearTimeout(temporisationInfoChargementCouche);
  }
  temporisationInfoChargementCouche = setTimeout(() => {
    masquerMessageChargementCouche();
  }, 8000);
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
        chargerScriptMeteoEnDiffere().catch((erreur) => {
          console.error("Impossible de charger meteo.js", erreur);
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

function chargerScriptMeteoEnDiffere() {
  if (promesseChargementMeteo) {
    return promesseChargementMeteo;
  }
  if (document.querySelector('script[src="./meteo.js"]')) {
    return Promise.resolve();
  }

  promesseChargementMeteo = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./meteo.js";
    script.async = true;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      promesseChargementMeteo = null;
      reject(new Error("Chargement de meteo.js impossible"));
    };
    document.head.appendChild(script);
  });

  return promesseChargementMeteo;
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

function afficherNotificationPartageCopie(message) {
  const texte = String(message || "").trim() || "Lien copié dans le presse-papiers. Vous pouvez le partager.";
  if (!notificationPartageCopieElement) {
    const element = document.createElement("div");
    element.className = "notification-partage-copie";
    element.setAttribute("role", "status");
    element.setAttribute("aria-live", "polite");
    notificationPartageCopieElement = element;
  }
  notificationPartageCopieElement.textContent = texte;
  if (!notificationPartageCopieElement.isConnected) {
    document.body.appendChild(notificationPartageCopieElement);
  }
  notificationPartageCopieElement.classList.add("est-visible");
  if (minuterieNotificationPartageCopie) {
    clearTimeout(minuterieNotificationPartageCopie);
  }
  minuterieNotificationPartageCopie = window.setTimeout(() => {
    notificationPartageCopieElement?.classList.remove("est-visible");
  }, 3600);
}

async function copierTexteDansPressePapier(texte, messageSucces) {
  const valeur = String(texte || "").trim();
  if (!valeur) {
    return false;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(valeur);
      afficherNotificationPartageCopie(messageSucces);
      return true;
    } catch {
      // Fallback prompt juste en dessous.
    }
  }

  window.prompt("Copier :", valeur);
  return false;
}

function mettreAJourBoutonAdresseMenuContextuel(options = {}) {
  if (!boutonCtxAdresse) {
    return;
  }

  const texte = String(options.texte || "").trim();
  const charge = Boolean(options.charge);
  const visible = Boolean(options.visible);
  boutonCtxAdresse.hidden = !visible;
  boutonCtxAdresse.disabled = !charge;
  boutonCtxAdresse.textContent = texte || "🏠 Recherche de l'adresse...";
}

function attendre(delaiMs) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, Math.max(0, Number(delaiMs) || 0));
  });
}

async function recupererJsonAvecRetry(url, options = {}) {
  const tentatives = Math.max(1, Number(options.tentatives) || 1);
  const delaiMs = Math.max(0, Number(options.delaiMs) || 0);

  for (let tentative = 0; tentative < tentatives; tentative += 1) {
    try {
      const reponse = await fetch(url, {
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      });
      if (reponse.ok) {
        return await reponse.json();
      }
    } catch {
      // Nouvelle tentative juste après.
    }

    if (tentative < tentatives - 1 && delaiMs > 0) {
      await attendre(delaiMs);
    }
  }

  return null;
}

async function recupererAdresseDepuisCoordonnees(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return "";
  }

  const urlCommune = new URL("https://geo.api.gouv.fr/communes");
  urlCommune.searchParams.set("lat", String(lat));
  urlCommune.searchParams.set("lon", String(lon));
  urlCommune.searchParams.set("fields", "nom,codesPostaux");
  urlCommune.searchParams.set("format", "json");
  const urlAdresse = new URL("https://api-adresse.data.gouv.fr/reverse/");
  urlAdresse.searchParams.set("lat", String(lat));
  urlAdresse.searchParams.set("lon", String(lon));
  urlAdresse.searchParams.set("limit", "1");

  const [donneesAdresse, donneesCommune] = await Promise.all([
    recupererJsonAvecRetry(urlAdresse.toString(), { tentatives: 2, delaiMs: 180 }),
    recupererJsonAvecRetry(urlCommune.toString(), { tentatives: 2, delaiMs: 180 })
  ]);

  const premiereFeature = Array.isArray(donneesAdresse?.features) ? donneesAdresse.features[0] : null;
  const proprietesAdresse = premiereFeature?.properties || {};
  const etiquette = String(proprietesAdresse.label || "").trim();
  if (etiquette) {
    return etiquette;
  }

  const nomAdresse = String(proprietesAdresse.name || "").trim();
  const codePostalAdresse = String(proprietesAdresse.postcode || "").trim();
  const villeAdresse = String(proprietesAdresse.city || "").trim();
  const adressePartielle = [nomAdresse, codePostalAdresse, villeAdresse].filter(Boolean).join(", ");
  if (adressePartielle) {
    return adressePartielle;
  }

  const commune = Array.isArray(donneesCommune) ? donneesCommune[0] : null;
  const nomCommune = String(commune?.nom || "").trim();
  const codePostalCommune = Array.isArray(commune?.codesPostaux)
    ? String(commune.codesPostaux[0] || "").trim()
    : "";
  const libelleCommune = [codePostalCommune, nomCommune].filter(Boolean).join(" ");
  if (libelleCommune) {
    return libelleCommune;
  }

  const communeDepuisAdresse = [codePostalAdresse, villeAdresse].filter(Boolean).join(" ");
  return communeDepuisAdresse;
}

async function rechercherAdressesAutocomplete(texte) {
  const requete = String(texte || "")
    .trim()
    .replace(/^\*\s*/, "")
    .trim();
  if (requete.length < 3) {
    return [];
  }

  const urlRecherche = new URL("https://api-adresse.data.gouv.fr/search/");
  urlRecherche.searchParams.set("q", requete);
  urlRecherche.searchParams.set("limit", "6");
  urlRecherche.searchParams.set("autocomplete", "1");

  const centreCarte = carte?.getCenter?.();
  const latitudeCentre = Number(centreCarte?.lat);
  const longitudeCentre = Number(centreCarte?.lng);
  if (Number.isFinite(latitudeCentre) && Number.isFinite(longitudeCentre)) {
    urlRecherche.searchParams.set("lat", String(latitudeCentre));
    urlRecherche.searchParams.set("lon", String(longitudeCentre));
  }

  const donnees = await recupererJsonAvecRetry(urlRecherche.toString(), { tentatives: 2, delaiMs: 180 });
  const features = Array.isArray(donnees?.features) ? donnees.features : [];

  return features
    .map((feature) => {
      const [longitude, latitude] = feature?.geometry?.coordinates || [];
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return null;
      }
      const proprietes = feature?.properties || {};
      const titre = String(proprietes.label || proprietes.name || "").trim();
      if (!titre) {
        return null;
      }
      return {
        type: "adresse",
        titre,
        sousTitre: String(proprietes.context || proprietes.city || "").trim(),
        longitude,
        latitude
      };
    })
    .filter(Boolean);
}

function ouvrirAdresseDepuisRecherche(resultat) {
  const longitude = Number(resultat?.longitude);
  const latitude = Number(resultat?.latitude);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return false;
  }

  fermerPopupCarte();
  supprimerMarqueurClicContextuel();
  contexteMenuPosition = { longitude, latitude };
  adresseMenuContextuel = String(resultat?.titre || "").trim();
  signatureAdresseMenuContextuel = `${longitude.toFixed(6)}|${latitude.toFixed(6)}|${adresseMenuContextuel}`;

  carte.flyTo({
    center: [longitude, latitude],
    zoom: Math.max(carte.getZoom(), 16),
    duration: 430,
    essential: true
  });

  afficherMarqueurClicContextuel(longitude, latitude, {
    clignoter: true,
    autoRemoveMs: 7000
  });
  return true;
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
      afficherNotificationPartageCopie("Lien copié dans le presse-papiers. Vous pouvez le partager.");
      return;
    } catch {
      // Fallback ultime plus bas.
    }
  }

  window.prompt("Copiez ce lien :", lien);
}

function obtenirLienImajnetDepuisContexte() {
  const { latitude, longitude } = contexteMenuPosition;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return "https://gecko.imajnet.net/";
  }
  return `https://gecko.imajnet.net/#map=OSM;zoom=18;loc=${latitude},${longitude};`;
}

function obtenirDistanceMetres(pointA, pointB) {
  return new maplibregl.LngLat(pointA[0], pointA[1]).distanceTo(new maplibregl.LngLat(pointB[0], pointB[1]));
}

function normaliserAngleDegres(angle) {
  if (!Number.isFinite(angle)) {
    return null;
  }
  const angleNormalise = ((angle % 360) + 360) % 360;
  return Number.isFinite(angleNormalise) ? angleNormalise : null;
}

function formaterDistanceMetres(distanceMetres) {
  if (distanceMetres < 1000) {
    return `${distanceMetres.toFixed(1)} m`;
  }
  return `${(distanceMetres / 1000).toFixed(2)} km`;
}

function formaterSurfaceMetresCarres(surfaceMetresCarres) {
  const surface = Math.max(0, Number(surfaceMetresCarres) || 0);
  const maximumFractionDigits = surface < 100 ? 1 : 0;
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits
  }).format(surface)} m²`;
}

function convertirDegresEnRadians(valeur) {
  return (valeur * Math.PI) / 180;
}

function normaliserDeltaLongitudeRadians(deltaLongitude) {
  if (!Number.isFinite(deltaLongitude)) {
    return 0;
  }

  if (deltaLongitude > Math.PI) {
    return deltaLongitude - Math.PI * 2;
  }
  if (deltaLongitude < -Math.PI) {
    return deltaLongitude + Math.PI * 2;
  }
  return deltaLongitude;
}

function calculerSurfacePolygonaleMetresCarres(points) {
  if (!Array.isArray(points) || points.length < 3) {
    return 0;
  }

  const RAYON_TERRE_METRES = 6378137;
  let somme = 0;
  for (let i = 0; i < points.length; i += 1) {
    const pointCourant = points[i];
    const pointSuivant = points[(i + 1) % points.length];
    const [longitudeCourante, latitudeCourante] = pointCourant || [];
    const [longitudeSuivante, latitudeSuivante] = pointSuivant || [];

    if (
      !Number.isFinite(longitudeCourante) ||
      !Number.isFinite(latitudeCourante) ||
      !Number.isFinite(longitudeSuivante) ||
      !Number.isFinite(latitudeSuivante)
    ) {
      return 0;
    }

    const longitudeCouranteRadians = convertirDegresEnRadians(longitudeCourante);
    const longitudeSuivanteRadians = convertirDegresEnRadians(longitudeSuivante);
    const latitudeCouranteRadians = convertirDegresEnRadians(latitudeCourante);
    const latitudeSuivanteRadians = convertirDegresEnRadians(latitudeSuivante);
    const deltaLongitude = normaliserDeltaLongitudeRadians(longitudeSuivanteRadians - longitudeCouranteRadians);

    somme += deltaLongitude * (2 + Math.sin(latitudeCouranteRadians) + Math.sin(latitudeSuivanteRadians));
  }

  return Math.abs((somme * RAYON_TERRE_METRES * RAYON_TERRE_METRES) / 2);
}

function obtenirCoordonneesLigneMesure() {
  if (!mesurePoints.length) {
    return [];
  }
  return mesurePolygoneFerme ? [...mesurePoints, mesurePoints[0]] : mesurePoints;
}

function estFondSatellitePourMesure() {
  if (fondActif === "satelliteIgn" || fondActif === "satelliteEsri") {
    return true;
  }

  if (ignAutomatiqueActif && estFondBaseAutomatique(fondActif) && carte?.getZoom) {
    return calculerOpaciteSatelliteIgnAuto(carte.getZoom()) >= 0.5;
  }

  return false;
}

function obtenirStyleMesure() {
  const fondSatellite = estFondSatellitePourMesure();
  return fondSatellite
    ? {
        couleurPrincipale: "#ffffff",
        couleurHalo: "rgba(0, 0, 0, 0.82)",
        couleurFondTrait: "rgba(0, 0, 0, 0.86)",
        couleurSurface: "#ffffff",
        couleurPoint: "#ffffff",
        couleurBordPoint: "#111111",
        couleurTextePoint: "#111111",
        couleurHaloTextePoint: "rgba(255, 255, 255, 0.95)"
      }
    : {
        couleurPrincipale: "#111111",
        couleurHalo: "rgba(255, 255, 255, 0.96)",
        couleurFondTrait: "rgba(255, 255, 255, 0.94)",
        couleurSurface: "#111111",
        couleurPoint: "#111111",
        couleurBordPoint: "#ffffff",
        couleurTextePoint: "#ffffff",
        couleurHaloTextePoint: "rgba(17, 17, 17, 0.9)"
      };
}

function appliquerProprietePeinture(idCouche, propriete, valeur) {
  if (!carte?.getLayer?.(idCouche)) {
    return;
  }
  carte.setPaintProperty(idCouche, propriete, valeur);
}

function appliquerStyleMesureSelonFond() {
  if (!carte?.isStyleLoaded?.()) {
    return;
  }

  const styleMesure = obtenirStyleMesure();
  appliquerProprietePeinture(COUCHE_MESURE_SURFACE, "fill-color", styleMesure.couleurSurface);
  appliquerProprietePeinture(COUCHE_MESURE_LIGNES_FOND, "line-color", styleMesure.couleurFondTrait);
  appliquerProprietePeinture(COUCHE_MESURE_LIGNES, "line-color", styleMesure.couleurPrincipale);
  appliquerProprietePeinture(COUCHE_MESURE_GRADUATIONS, "line-color", styleMesure.couleurPrincipale);
  appliquerProprietePeinture(COUCHE_MESURE_GRADUATIONS_LABELS, "text-color", styleMesure.couleurPrincipale);
  appliquerProprietePeinture(COUCHE_MESURE_GRADUATIONS_LABELS, "text-halo-color", styleMesure.couleurHalo);
  appliquerProprietePeinture(COUCHE_MESURE_POINTS, "circle-color", styleMesure.couleurPoint);
  appliquerProprietePeinture(COUCHE_MESURE_POINTS, "circle-stroke-color", styleMesure.couleurBordPoint);
  appliquerProprietePeinture(COUCHE_MESURE_LABELS, "text-color", styleMesure.couleurTextePoint);
  appliquerProprietePeinture(COUCHE_MESURE_LABELS, "text-halo-color", styleMesure.couleurHaloTextePoint);
}

function determinerPasGraduationsMesure(distanceMetres) {
  if (!Number.isFinite(distanceMetres) || distanceMetres < 12) {
    return 0;
  }

  const pasCibles = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000, 20000, 50000];
  const intervalleSouhaite = distanceMetres / 8;
  for (const pas of pasCibles) {
    if (pas >= intervalleSouhaite) {
      return pas;
    }
  }
  return 100000;
}

function determinerPasGraduationsMajeuresMesure(pasMineur, distanceMetres) {
  if (!pasMineur || !Number.isFinite(distanceMetres)) {
    return 0;
  }

  const cibles = [pasMineur * 2, pasMineur * 5, pasMineur * 10];
  const intervalleSouhaite = distanceMetres / 3.5;
  return cibles.find((pas) => pas >= intervalleSouhaite) || cibles[cibles.length - 1];
}

function calculerAngleSegmentMesure(pointA, pointB) {
  const [longitudeA, latitudeA] = pointA || [];
  const [longitudeB, latitudeB] = pointB || [];
  if (
    !Number.isFinite(longitudeA) ||
    !Number.isFinite(latitudeA) ||
    !Number.isFinite(longitudeB) ||
    !Number.isFinite(latitudeB)
  ) {
    return 0;
  }

  const latitudeMoyenneRadians = convertirDegresEnRadians((latitudeA + latitudeB) / 2);
  const deltaX = (longitudeB - longitudeA) * Math.cos(latitudeMoyenneRadians);
  const deltaY = latitudeB - latitudeA;
  return (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
}

function normaliserRotationLibelleMesure(angleDegres) {
  if (!Number.isFinite(angleDegres)) {
    return 0;
  }

  let angle = ((angleDegres % 360) + 360) % 360;
  if (angle > 180) {
    angle -= 360;
  }
  if (angle > 90) {
    angle -= 180;
  } else if (angle < -90) {
    angle += 180;
  }
  return angle;
}

function decalerCoordonneesMetres(longitude, latitude, deplacementEstMetres, deplacementNordMetres) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  const metresParDegreLatitude = 111320;
  const latitudeRadians = convertirDegresEnRadians(latitude);
  const metresParDegreLongitude = Math.max(1e-6, Math.cos(latitudeRadians) * metresParDegreLatitude);

  return [
    longitude + deplacementEstMetres / metresParDegreLongitude,
    latitude + deplacementNordMetres / metresParDegreLatitude
  ];
}

function construireGraduationsSegmentMesure(pointA, pointB) {
  const distance = obtenirDistanceMetres(pointA, pointB);
  const pasMineur = determinerPasGraduationsMesure(distance);
  if (!pasMineur) {
    return [];
  }

  const pasMajeur = determinerPasGraduationsMajeuresMesure(pasMineur, distance);
  const angleRadians = (calculerAngleSegmentMesure(pointA, pointB) * Math.PI) / 180;
  const graduations = [];
  let dernierPointLabelEcran = null;
  for (let progression = pasMineur; progression < distance - pasMineur * 0.35; progression += pasMineur) {
    const ratio = progression / distance;
    const longitude = pointA[0] + (pointB[0] - pointA[0]) * ratio;
    const latitude = pointA[1] + (pointB[1] - pointA[1]) * ratio;
    const graduationMajeure = pasMajeur > 0 && Math.abs(progression / pasMajeur - Math.round(progression / pasMajeur)) < 1e-6;
    const longueurGraduationMetres = graduationMajeure
      ? Math.max(4.5, Math.min(10, distance / 80))
      : Math.max(2.2, Math.min(5.2, distance / 140));
    const deplacementEst = Math.cos(angleRadians + Math.PI / 2) * longueurGraduationMetres;
    const deplacementNord = Math.sin(angleRadians + Math.PI / 2) * longueurGraduationMetres;
    const coordonneeDepart = [longitude, latitude];
    const coordonneeArrivee = decalerCoordonneesMetres(longitude, latitude, deplacementEst, deplacementNord);
    if (!coordonneeDepart || !coordonneeArrivee) {
      continue;
    }
    graduations.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [coordonneeDepart, coordonneeArrivee]
      },
      properties: {
        role: graduationMajeure ? "tick-major" : "tick-minor"
      }
    });

    if (graduationMajeure) {
      const pointLabel = decalerCoordonneesMetres(longitude, latitude, deplacementEst * 1.45, deplacementNord * 1.45);
      if (pointLabel) {
        const pointLabelEcran = carte?.project?.(pointLabel) || null;
        const suffisammentEspace = !dernierPointLabelEcran || !pointLabelEcran
          || Math.hypot(
            pointLabelEcran.x - dernierPointLabelEcran.x,
            pointLabelEcran.y - dernierPointLabelEcran.y
          ) >= ESPACEMENT_MIN_LABELS_GRADUATIONS_PX;
        if (!suffisammentEspace) {
          continue;
        }
        if (pointLabelEcran) {
          dernierPointLabelEcran = pointLabelEcran;
        }
        graduations.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: pointLabel
          },
          properties: {
            role: "tick-label",
            label: formaterDistanceMetres(progression),
            rotation: normaliserRotationLibelleMesure((angleRadians * 180) / Math.PI)
          }
        });
      }
    }
  }

  return graduations;
}

function supprimerPointLocalisation() {
  if (marqueurLocalisation) {
    marqueurLocalisation.remove();
    marqueurLocalisation = null;
  }
  elementMarqueurLocalisation = null;
}

function creerElementMarqueurLocalisation() {
  const element = document.createElement("div");
  element.className = "point-localisation-clignotant";
  element.innerHTML =
    '<div class="point-localisation-direction"></div><div class="point-localisation-point"></div>';
  return element;
}

function assurerMarqueurLocalisation(longitude, latitude, options = {}) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  if (!elementMarqueurLocalisation) {
    elementMarqueurLocalisation = creerElementMarqueurLocalisation();
  }

  if (!marqueurLocalisation) {
    marqueurLocalisation = new maplibregl.Marker({ element: elementMarqueurLocalisation, anchor: "center" })
      .setLngLat([longitude, latitude])
      .addTo(carte);
  } else {
    marqueurLocalisation.setLngLat([longitude, latitude]);
  }

  capLocalisationDegres = null;
  if (Number.isFinite(options.heading)) {
    mettreAJourCapLocalisation(options.heading);
  } else {
    appliquerCapMarqueurLocalisation();
  }

  return marqueurLocalisation;
}

function appliquerCapMarqueurLocalisation() {
  if (!elementMarqueurLocalisation) {
    return;
  }

  const cap = normaliserAngleDegres(capLocalisationDegres);
  if (cap == null) {
    elementMarqueurLocalisation.classList.remove("a-cap");
    elementMarqueurLocalisation.style.removeProperty("--localisation-heading");
    return;
  }

  elementMarqueurLocalisation.classList.add("a-cap");
  elementMarqueurLocalisation.style.setProperty("--localisation-heading", `${cap}deg`);
}

function mettreAJourCapLocalisation(cap) {
  const capNormalise = normaliserAngleDegres(cap);
  if (capNormalise == null) {
    return;
  }
  capLocalisationDegres = capNormalise;
  appliquerCapMarqueurLocalisation();
}

function extraireCapDepuisOrientationAppareil(event) {
  if (!event) {
    return null;
  }

  const capWebkit = Number(event.webkitCompassHeading);
  if (Number.isFinite(capWebkit)) {
    return normaliserAngleDegres(capWebkit);
  }

  const alpha = Number(event.alpha);
  if (Number.isFinite(alpha)) {
    return normaliserAngleDegres(360 - alpha);
  }

  return null;
}

async function activerSuiviOrientationAppareil() {
  if (ecouteOrientationAppareilActive || typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") {
    return;
  }

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission !== "granted") {
        return;
      }
    } catch {
      return;
    }
  }

  window.addEventListener(
    "deviceorientation",
    (event) => {
      const cap = extraireCapDepuisOrientationAppareil(event);
      if (cap != null) {
        mettreAJourCapLocalisation(cap);
      }
    },
    { passive: true }
  );
  ecouteOrientationAppareilActive = true;
}

function mettreAJourEtatBoutonSuiviLocalisation() {
  if (!boutonSuiviCarte) {
    return;
  }
  boutonSuiviCarte.classList.toggle("est-actif", modeSuiviLocalisationActif);
  boutonSuiviCarte.setAttribute("aria-pressed", modeSuiviLocalisationActif ? "true" : "false");
  boutonSuiviCarte.setAttribute(
    "aria-label",
    modeSuiviLocalisationActif ? "Desactiver le suivi de position" : "Activer le suivi de position"
  );
  boutonSuiviCarte.title = modeSuiviLocalisationActif ? "Desactiver le suivi" : "Activer le suivi";
}

function terminerNavigationSuiviLocalisationAutomatique() {
  navigationSuiviLocalisationAutomatiqueEnCours = false;
  if (minuterieFinNavigationSuiviLocalisation) {
    clearTimeout(minuterieFinNavigationSuiviLocalisation);
    minuterieFinNavigationSuiviLocalisation = null;
  }
}

function demarrerNavigationSuiviLocalisationAutomatique() {
  navigationSuiviLocalisationAutomatiqueEnCours = true;
  if (minuterieFinNavigationSuiviLocalisation) {
    clearTimeout(minuterieFinNavigationSuiviLocalisation);
  }
  carte.once("moveend", terminerNavigationSuiviLocalisationAutomatique);
  minuterieFinNavigationSuiviLocalisation = setTimeout(() => {
    if (!carte.isMoving()) {
      terminerNavigationSuiviLocalisationAutomatique();
    }
  }, 1200);
}

function suspendreSuiviLocalisationTemporairement(dureeMs = DUREE_SUSPENSION_SUIVI_LOCALISATION_MS) {
  if (!modeSuiviLocalisationActif) {
    return;
  }
  suspensionSuiviLocalisationJusqua = Math.max(
    suspensionSuiviLocalisationJusqua,
    Date.now() + Math.max(0, Number(dureeMs) || 0)
  );
}

function suiviLocalisationTemporairementSuspendu() {
  return menuContextuelOuvert || Date.now() < suspensionSuiviLocalisationJusqua;
}

function arreterSuiviLocalisationUtilisateur(options = {}) {
  if (idSuiviGeolocalisation != null && navigator.geolocation?.clearWatch) {
    navigator.geolocation.clearWatch(idSuiviGeolocalisation);
    idSuiviGeolocalisation = null;
  }
  terminerNavigationSuiviLocalisationAutomatique();
  suspensionSuiviLocalisationJusqua = 0;
  modeSuiviLocalisationActif = false;
  mettreAJourEtatBoutonSuiviLocalisation();
  if (!options.conserverMarqueur) {
    arreterClignotementLocalisation();
  }
}

async function activerSuiviLocalisationUtilisateur() {
  if (!navigator.geolocation?.watchPosition) {
    alert("Le suivi GPS n'est pas disponible sur cet appareil.");
    return;
  }

  await activerSuiviOrientationAppareil();
  arreterSuiviLocalisationUtilisateur({ conserverMarqueur: false });
  modeSuiviLocalisationActif = true;
  mettreAJourEtatBoutonSuiviLocalisation();

  let premierePosition = true;
  idSuiviGeolocalisation = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const longitude = Number(coords?.longitude);
      const latitude = Number(coords?.latitude);
      const heading = Number(coords?.heading);
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      demarrerClignotementLocalisation(longitude, latitude, {
        heading: Number.isFinite(heading) ? heading : null,
        persistent: true,
        sansClignotement: true
      });

      if (suiviLocalisationTemporairementSuspendu()) {
        return;
      }

      demarrerNavigationSuiviLocalisationAutomatique();
      carte.easeTo({
        center: [longitude, latitude],
        zoom: premierePosition ? Math.max(carte.getZoom(), 16) : carte.getZoom(),
        duration: premierePosition ? 600 : 280,
        essential: true
      });
      premierePosition = false;
    },
    () => {
      arreterSuiviLocalisationUtilisateur({ conserverMarqueur: false });
      alert("Impossible d'activer le suivi de position.");
    },
    {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 5000
    }
  );
}

async function basculerSuiviLocalisationUtilisateur() {
  if (modeSuiviLocalisationActif) {
    arreterSuiviLocalisationUtilisateur({ conserverMarqueur: false });
    return;
  }
  await activerSuiviLocalisationUtilisateur();
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

  if (options.recentrerCarte && carte) {
    const zoomCible = Math.max(carte.getZoom(), Number(options.zoomMin) || 16.4);
    carte.flyTo({
      center: [longitude, latitude],
      zoom: zoomCible,
      duration: Number(options.dureeZoomMs) || 720,
      essential: true
    });
  }

  const localisationPersistante = Boolean(options.persistent || modeSuiviLocalisationActif);
  const sansClignotement = Boolean(options.sansClignotement || modeSuiviLocalisationActif);

  if (!localisationPersistante) {
    arreterClignotementLocalisation();
  } else {
    if (minuterieClignotementLocalisation) {
      clearInterval(minuterieClignotementLocalisation);
      minuterieClignotementLocalisation = null;
    }
    if (minuterieArretLocalisation) {
      clearTimeout(minuterieArretLocalisation);
      minuterieArretLocalisation = null;
    }
  }

  assurerMarqueurLocalisation(longitude, latitude, options);
  const element = elementMarqueurLocalisation;
  if (!element) {
    return;
  }

  if (sansClignotement) {
    element.style.opacity = "1";
    return;
  }

  let visible = true;
  minuterieClignotementLocalisation = setInterval(() => {
    visible = !visible;
    if (!element) {
      return;
    }
    element.style.opacity = visible ? "1" : "0.15";
  }, 390);
  if (options.attendreFermetureFicheAvantArret || localisationPersistante) {
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
      role: "vertex",
      lettre: String.fromCharCode(65 + index)
    }
  }));

  const features = [...featuresPoints];
  if (mesurePolygoneFerme && mesurePoints.length >= 3) {
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [obtenirCoordonneesLigneMesure()]
      },
      properties: {}
    });
  }

  if (mesurePoints.length >= 2) {
    const pointsGraduations = obtenirCoordonneesLigneMesure();
    for (let i = 1; i < pointsGraduations.length; i += 1) {
      features.push(...construireGraduationsSegmentMesure(pointsGraduations[i - 1], pointsGraduations[i]));
    }
    features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: obtenirCoordonneesLigneMesure()
      },
      properties: {
        role: "line"
      }
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

  if (!carte.getLayer(COUCHE_MESURE_SURFACE)) {
    carte.addLayer({
      id: COUCHE_MESURE_SURFACE,
      type: "fill",
      source: SOURCE_MESURE,
      filter: ["==", ["geometry-type"], "Polygon"],
      paint: {
        "fill-color": "#111111",
        "fill-opacity": 0.16
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_LIGNES_FOND)) {
    carte.addLayer({
      id: COUCHE_MESURE_LIGNES_FOND,
      type: "line",
      source: SOURCE_MESURE,
      filter: ["all", ["==", ["geometry-type"], "LineString"], ["==", ["get", "role"], "line"]],
      paint: {
        "line-color": "rgba(255, 255, 255, 0.92)",
        "line-width": 4.4,
        "line-opacity": 0.95
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_LIGNES)) {
    carte.addLayer({
      id: COUCHE_MESURE_LIGNES,
      type: "line",
      source: SOURCE_MESURE,
      filter: ["all", ["==", ["geometry-type"], "LineString"], ["==", ["get", "role"], "line"]],
      paint: {
        "line-color": "#111111",
        "line-width": 3.2
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_GRADUATIONS)) {
    carte.addLayer({
      id: COUCHE_MESURE_GRADUATIONS,
      type: "line",
      source: SOURCE_MESURE,
      filter: [
        "all",
        ["==", ["geometry-type"], "LineString"],
        ["in", ["get", "role"], ["literal", ["tick-minor", "tick-major"]]]
      ],
      paint: {
        "line-color": "#111111",
        "line-width": [
          "match",
          ["get", "role"],
          "tick-major",
          2.2,
          1.5
        ],
        "line-opacity": 0.95
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_GRADUATIONS_LABELS)) {
    carte.addLayer({
      id: COUCHE_MESURE_GRADUATIONS_LABELS,
      type: "symbol",
      source: SOURCE_MESURE,
      filter: ["all", ["==", ["geometry-type"], "Point"], ["==", ["get", "role"], "tick-label"]],
      layout: {
        "text-field": ["get", "label"],
        "text-size": 12,
        "text-font": ["Open Sans Bold"],
        "text-rotate": ["get", "rotation"],
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "text-anchor": "center"
      },
      paint: {
        "text-color": "#111111",
        "text-halo-color": "rgba(255, 255, 255, 0.96)",
        "text-halo-width": 1.4
      }
    });
  }

  if (!carte.getLayer(COUCHE_MESURE_POINTS)) {
    carte.addLayer({
      id: COUCHE_MESURE_POINTS,
      type: "circle",
      source: SOURCE_MESURE,
      filter: ["all", ["==", ["geometry-type"], "Point"], ["==", ["get", "role"], "vertex"]],
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
      filter: ["all", ["==", ["geometry-type"], "Point"], ["==", ["get", "role"], "vertex"]],
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

  appliquerStyleMesureSelonFond();
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
  const pointsLigne = obtenirCoordonneesLigneMesure();
  const dernierIndexSegment = pointsLigne.length - 1;

  for (let i = 1; i <= dernierIndexSegment; i += 1) {
    const pointA = pointsLigne[i - 1];
    const pointB = pointsLigne[i];
    const distance = obtenirDistanceMetres(pointA, pointB);
    const distanceArrondieAffichee = Math.round(distance * 10) / 10;
    total += distanceArrondieAffichee;

    const indexDepart = i - 1;
    const indexArrivee = i === dernierIndexSegment && mesurePolygoneFerme ? 0 : i;
    const lettreA = String.fromCharCode(65 + indexDepart);
    const lettreB = String.fromCharCode(65 + indexArrivee);
    lignes.push(`${lettreA} -> ${lettreB} : ${formaterDistanceMetres(distance)}`);
  }

  lignes.push("---------------------");
  if (mesurePolygoneFerme) {
    lignes.push(`Périmètre : ${formaterDistanceMetres(total)}`);
    lignes.push(`Surface : ${formaterSurfaceMetresCarres(calculerSurfacePolygonaleMetresCarres(mesurePoints))}`);
  } else {
    lignes.push(`Total : ${formaterDistanceMetres(total)}`);
    if (mesurePoints.length >= 3) {
      lignes.push("Recliquez sur A pour fermer et calculer la surface.");
    }
  }
  textePanneauMesure.textContent = lignes.join("\n");

  if (panneauMesure) {
    panneauMesure.classList.add("est-visible");
  }
}

function reinitialiserMesure() {
  mesurePoints = [];
  mesurePolygoneFerme = false;
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

function mettreAJourCurseurCarteMesure() {
  if (!carte?.getCanvas) {
    return;
  }
  const estEcranTactile = window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
  carte.getCanvas().style.cursor = mesureActive && !estEcranTactile ? "crosshair" : "";
}

function quitterModeMesure() {
  reinitialiserMesure();
  mesureActive = false;
  mettreAJourEtatMesureUI();
  mettreAJourCurseurCarteMesure();
}

function activerModeMesure() {
  reinitialiserMesure();
  mesureActive = true;
  mettreAJourEtatMesureUI();
  mettreAJourCurseurCarteMesure();
}

function trouverIndexPointMesureDepuisPointEcran(pointEcran) {
  if (!pointEcran || !carte || !mesurePoints.length) {
    return -1;
  }

  let indexTrouve = -1;
  let meilleureDistance = RAYON_SELECTION_POINT_MESURE_PX;
  mesurePoints.forEach((coordonnees, index) => {
    const projection = carte.project(coordonnees);
    const distance = Math.hypot(pointEcran.x - projection.x, pointEcran.y - projection.y);
    if (distance <= meilleureDistance) {
      meilleureDistance = distance;
      indexTrouve = index;
    }
  });
  return indexTrouve;
}

function supprimerPointMesure(indexPoint) {
  if (!Number.isInteger(indexPoint) || indexPoint < 0 || indexPoint >= mesurePoints.length) {
    return false;
  }

  mesurePoints.splice(indexPoint, 1);
  mesurePolygoneFerme = false;
  rafraichirAffichageMesure();
  mettreAJourPanneauMesure();
  return true;
}

function ajouterPointMesure(longitude, latitude, pointEcran = null) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  const indexPointExistant = trouverIndexPointMesureDepuisPointEcran(pointEcran);
  if (!mesurePolygoneFerme && mesurePoints.length >= 3 && indexPointExistant === 0) {
    mesurePolygoneFerme = true;
    rafraichirAffichageMesure();
    mettreAJourPanneauMesure();
    return;
  }

  if (supprimerPointMesure(indexPointExistant)) {
    return;
  }

  if (mesurePolygoneFerme) {
    return;
  }

  mesurePoints.push([longitude, latitude]);
  rafraichirAffichageMesure();
  mettreAJourPanneauMesure();
}

function gererDebutInteractionCarte(options = {}) {
  if (!navigationSuiviLocalisationAutomatiqueEnCours && options.suspendreSuivi) {
    suspendreSuiviLocalisationTemporairement();
  }

  if (!navigationSuiviLocalisationAutomatiqueEnCours && options.fermerMenuContextuel) {
    fermerMenuContextuel();
  }
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
  adresseMenuContextuel = "";
  signatureAdresseMenuContextuel = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  afficherMarqueurClicContextuel(lng, lat);

  if (boutonCtxCoord) {
    boutonCtxCoord.textContent = `📍 ${formaterCoordonneeMenu(lat)}, ${formaterCoordonneeMenu(lng)}`;
  }
  mettreAJourBoutonAdresseMenuContextuel({
    visible: true,
    charge: false,
    texte: "🏠 Recherche de l'adresse..."
  });

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

  recupererAdresseDepuisCoordonnees(lat, lng)
    .then((adresse) => {
      if (signatureAdresseMenuContextuel !== `${lat.toFixed(6)},${lng.toFixed(6)}`) {
        return;
      }
      adresseMenuContextuel = String(adresse || "").trim();
      mettreAJourBoutonAdresseMenuContextuel({
        visible: true,
        charge: Boolean(adresseMenuContextuel),
        texte: adresseMenuContextuel ? `🏠 ${adresseMenuContextuel}` : "🏠 Adresse introuvable"
      });
    })
    .catch(() => {
      if (signatureAdresseMenuContextuel !== `${lat.toFixed(6)},${lng.toFixed(6)}`) {
        return;
      }
      adresseMenuContextuel = "";
      mettreAJourBoutonAdresseMenuContextuel({
        visible: true,
        charge: false,
        texte: "🏠 Adresse indisponible"
      });
    });

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
  adresseMenuContextuel = "";
  signatureAdresseMenuContextuel = "";
  mettreAJourBoutonAdresseMenuContextuel({ visible: false, charge: false, texte: "" });
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
  document.dispatchEvent(new CustomEvent("alice:apropos-ferme"));
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
    await activerSuiviOrientationAppareil();
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
      afficherNotificationPartageCopie("Lien copié dans le presse-papiers. Vous pouvez le partager.");
      return;
    } catch {
      // Fallback ultime plus bas.
    }
  }

  window.prompt("Copiez ce lien :", lien);
}

actualiserPlaceholderRecherche();
carte.on("load", () => planifierResizeCarte({ stabiliserViewport: true }));
window.addEventListener("pageshow", () => {
  planifierResizeCarte({ stabiliserViewport: true });
  planifierAssuranceDonneesCarteApresRetour();
}, { passive: true });
window.addEventListener("pagehide", () => {
  arreterSuiviLocalisationUtilisateur({ conserverMarqueur: false });
}, { passive: true });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    planifierResizeCarte({ stabiliserViewport: true });
    planifierAssuranceDonneesCarteApresRetour();
  }
});
window.addEventListener("focus", () => {
  planifierResizeCarte({ stabiliserViewport: true });
  planifierAssuranceDonneesCarteApresRetour();
}, { passive: true });
window.addEventListener("resize", () => {
  actualiserPlaceholderRecherche();
  planifierResizeCarte({ stabiliserViewport: true });
  planifierMiseAJourPk();
}, { passive: true });
window.addEventListener("orientationchange", () => {
  planifierResizeCarte({ stabiliserViewport: true });
  planifierMiseAJourPk();
}, { passive: true });
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    planifierResizeCarte({ stabiliserViewport: true });
    planifierMiseAJourPk();
  }, { passive: true });
  window.visualViewport.addEventListener("scroll", () => {
    planifierResizeCarte({ stabiliserViewport: true });
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
  if (compteurPn) {
    compteurPn.textContent = `(${donneesPn?.features?.length || 0})`;
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
  if (!texte) {
    return "PK";
  }
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

function normaliserCodeLignePk(feature) {
  return String(feature?.properties?.code_ligne || "").trim() || "ligne-inconnue";
}

function comparerCodesLignesPk(a, b) {
  return a.localeCompare(b, "fr", { numeric: true, sensitivity: "base" });
}

function obtenirStylesPkParCodeLigneVisible(features) {
  const codesVisibles = Array.from(new Set(features.map(normaliserCodeLignePk))).sort(comparerCodesLignesPk);
  const codesVisiblesSet = new Set(codesVisibles);
  for (const codeLigne of Array.from(stylesPkParCodeLigneVisible.keys())) {
    if (!codesVisiblesSet.has(codeLigne)) {
      stylesPkParCodeLigneVisible.delete(codeLigne);
    }
  }

  const indexUtilises = new Set(stylesPkParCodeLigneVisible.values());
  for (const codeLigne of codesVisibles) {
    if (stylesPkParCodeLigneVisible.has(codeLigne)) {
      continue;
    }
    const indexLibre = STYLES_PK_PAR_LIGNE_VISIBLES.findIndex((_, index) => !indexUtilises.has(index));
    const indexStyle = indexLibre >= 0 ? indexLibre : stylesPkParCodeLigneVisible.size % STYLES_PK_PAR_LIGNE_VISIBLES.length;
    stylesPkParCodeLigneVisible.set(codeLigne, indexStyle);
    indexUtilises.add(indexStyle);
  }

  return stylesPkParCodeLigneVisible;
}

function appliquerStylesPkParLigneVisible(features) {
  const stylesParCode = obtenirStylesPkParCodeLigneVisible(features);
  return features.map((feature) => {
    const codeLigne = normaliserCodeLignePk(feature);
    const indexStyle = stylesParCode.get(codeLigne) ?? 0;
    return {
      ...feature,
      properties: {
        ...(feature?.properties || {}),
        pk_code_ligne_affichage: codeLigne,
        pk_style_affichage: STYLES_PK_PAR_LIGNE_VISIBLES[indexStyle] || STYLES_PK_PAR_LIGNE_VISIBLES[0]
      }
    };
  });
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
  if (donneesPkAffichees.features?.length) {
    donneesPkAffichees = {
      ...donneesPkAffichees,
      features: appliquerStylesPkParLigneVisible(donneesPkAffichees.features)
    };
  }
  afficherMarqueursPk(donneesPkAffichees.features || []);
}

function fermerPopupPnInfo() {
  if (!popupPnInfo) {
    signaturePopupPnInfo = "";
    popupPnInfoEpinglee = false;
    return;
  }
  popupPnInfo.remove();
  popupPnInfo = null;
  signaturePopupPnInfo = "";
  popupPnInfoEpinglee = false;
}

function fermerPopupLigneOsmInfo() {
  if (!popupLigneOsmInfo) {
    popupLigneOsmInfoEpinglee = false;
    return;
  }
  popupLigneOsmInfo.remove();
  popupLigneOsmInfo = null;
  popupLigneOsmInfoEpinglee = false;
}

function popupLigneOsmInfoEstEpinglee() {
  return Boolean(popupLigneOsmInfo && popupLigneOsmInfoEpinglee);
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

function formaterPkPnCompact(valeurPk) {
  const texte = String(valeurPk ?? "").trim().replace(",", ".");
  if (!texte) {
    return "";
  }
  const nombre = Number(texte);
  if (!Number.isFinite(nombre)) {
    return texte ? `PK${texte.replace(/\s+/g, "")}` : "";
  }

  const signe = nombre < 0 ? "-" : "";
  const absolu = Math.abs(nombre);
  let kilometres = Math.floor(absolu);
  let metres = Math.round((absolu - kilometres) * 1000);
  if (metres >= 1000) {
    kilometres += 1;
    metres = 0;
  }
  return `PK${signe}${kilometres}+${String(Math.max(0, metres)).padStart(3, "0")}`;
}

function normaliserTexteLigneOsm(valeur) {
  return String(valeur ?? "").trim();
}

function normaliserTexteLigneOsmOptionnel(valeur) {
  return String(valeur ?? "").trim();
}

function ressembleACodeLignePrincipal(valeur) {
  return /^(\d{5,6}|LN\d+|L\d+)$/i.test(String(valeur ?? "").trim());
}

function contientInfoLigneOsm(...valeurs) {
  return valeurs.some((valeur) => Boolean(String(valeur ?? "").trim()));
}

function construireLigneInfoPopup(etiquette, valeur) {
  const texte = String(valeur ?? "").trim();
  return texte ? `<p><strong>${echapperHtml(etiquette)} :</strong> ${echapperHtml(texte)}</p>` : "";
}

async function ligneDisposeDePk(codeLigneBrut) {
  const codeLigne = String(codeLigneBrut || "").trim();
  if (!codeLigne) {
    return false;
  }

  await chargerDonneesPk();
  return Boolean(
    donneesPk?.features?.some((feature) => String(feature?.properties?.code_ligne || "").trim() === codeLigne)
  );
}

async function ouvrirPopupPnInfo(feature, options = {}) {
  const coords = feature?.geometry?.coordinates || [];
  const longitude = Number(coords[0]);
  const latitude = Number(coords[1]);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  const epingler = options.epingler !== false;
  const signature = `${longitude.toFixed(6)}|${latitude.toFixed(6)}|${String(feature?.properties?.osm_id || "").trim()}|pk:${
    afficherPk ? "1" : "0"
  }`;
  if (popupPnInfo && signaturePopupPnInfo === signature) {
    popupPnInfoEpinglee = epingler;
    return;
  }
  const pnNumero = normaliserTextePn(feature?.properties?.pn_numero);
  const osmId = String(feature?.properties?.osm_id || "").trim();
  const lienOsmConsultation = osmId ? `https://www.openstreetmap.org/node/${encodeURIComponent(osmId)}` : "";
  const lienOsmEdition = osmId ? `https://www.openstreetmap.org/edit?node=${encodeURIComponent(osmId)}` : "";
  const infoRefOsm = osmId
    ? `<p class="popup-ligne-osm-ref">Ref OSM : ${echapperHtml(osmId)}</p>`
    : "";
  const actionsOsm = osmId
    ? `${infoRefOsm}<p class="popup-ligne-osm-actions">{<a href="${echapperHtml(
        lienOsmEdition
      )}" target="_blank" rel="noopener noreferrer">Modifier</a> / <a href="${echapperHtml(
        lienOsmConsultation
      )}" target="_blank" rel="noopener noreferrer">Consulter</a>}</p>`
    : "";
  const codeLigneBrut = String(feature?.properties?.code_ligne || "").trim();
  const codeLigne = normaliserTextePn(codeLigneBrut);
  const nomLigne = obtenirNomLigneObligatoireDepuisReferentiel(codeLigneBrut);
  let lignePk = "<p><strong>PK approximatif calculé :</strong> Indisponible</p>";
  if (await ligneDisposeDePk(codeLigneBrut)) {
    let pkApproxime = "";
    try {
      pkApproxime = formaterPkApproxime(await estimerPkApproximatifPoint(codeLigneBrut, { lng: longitude, lat: latitude }));
    } catch (erreur) {
      console.warn("Calcul du PK approximatif du PN impossible", erreur);
    }
    lignePk = pkApproxime
      ? `<p><strong>PK approximatif calculé :</strong> ${echapperHtml(pkApproxime)}</p>`
      : "<p><strong>PK approximatif calculé :</strong> Indisponible</p>";
  }
  const lienImajnet = construireLienImajnet(longitude, latitude);

  fermerPopupPnInfo();
  popupPnInfo = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup-pk-info",
    offset: 10
  })
    .setLngLat([longitude, latitude])
    .setHTML(
      `<div class="popup-pk-info-contenu popup-pn-info-contenu"><p class="popup-pn-info-titre"><span class="popup-pn-info-titre-texte"><strong>${echapperHtml(
        pnNumero
      )}</strong></span></p><p><strong>Code ligne :</strong> ${echapperHtml(
        codeLigne
      )}</p><p><strong>Nom de ligne :</strong> ${echapperHtml(
        nomLigne
      )}</p>${lignePk}${actionsOsm}<div class="popup-itineraires popup-itineraires-poste-actions popup-pn-actions"><button class="popup-bouton-itineraire popup-pn-street-view" type="button" data-lng="${longitude}" data-lat="${latitude}">🌍 Street View</button><a class="popup-bouton-itineraire" href="${echapperHtml(
        lienImajnet
      )}" target="_blank" rel="noopener noreferrer">🛣️ Imajnet</a></div></div>`
    )
    .addTo(carte);
  signaturePopupPnInfo = signature;
  popupPnInfoEpinglee = epingler;

  const elementPopup = popupPnInfo.getElement();
  if (elementPopup) {
    ["mousedown", "click", "dblclick"].forEach((nomEvenement) => {
      elementPopup.addEventListener(nomEvenement, (event) => {
        event.stopPropagation();
      });
    });
    elementPopup.addEventListener(
      "touchstart",
      (event) => {
        event.stopPropagation();
      },
      { passive: true }
    );
  }
  const boutonStreetView = elementPopup?.querySelector(".popup-pn-street-view");
  if (boutonStreetView) {
    boutonStreetView.addEventListener("click", () => {
      ouvrirStreetViewEnSurimpression(longitude, latitude);
    });
  }
}

async function ouvrirPopupLigneOsmInfo(feature, lngLat, options = {}) {
  const longitude = Number(lngLat?.lng);
  const latitude = Number(lngLat?.lat);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }

  const numeroLigne = normaliserTexteLigneOsm(feature?.properties?.line_ref);
  const codeLigneBrut = String(feature?.properties?.line_ref || "").trim();
  const nomLigne = retrouverNomLigneOsmParCode(codeLigneBrut);
  const nomReferentielOsm = construireLibelleNomLigneOsmAvecVoie(
    obtenirNomLigneOsmDepuisReferentiel(feature?.properties?.osm_way_id),
    feature?.properties?.track_ref
  );
  const nomOsm = construireLibelleNomLigneOsmAvecVoie(feature?.properties?.name, feature?.properties?.track_ref);
  const vitesse = normaliserTexteLigneOsm(feature?.properties?.maxspeed);
  const voie = normaliserTexteLigneOsm(feature?.properties?.track_ref);
  const operateur = normaliserTexteLigneOsm(feature?.properties?.operator);
  const estLigneGetlink = operateur.toLowerCase() === "getlink";
  const usage = normaliserTexteLigneOsmOptionnel(feature?.properties?.usage);
  const osmWayId = normaliserTexteLigneOsmOptionnel(feature?.properties?.osm_way_id);
  const categorieLigne = normaliserTexteLigneOsmOptionnel(feature?.properties?.alice_category);
  const libelleCategorieLigne = determinerLibelleCategorieLigneOsm(
    categorieLigne || determinerCategorieLigneOsmDepuisProprietes(feature?.properties || {})
  );
  const lienOsmConsultation = osmWayId ? `https://www.openstreetmap.org/way/${encodeURIComponent(osmWayId)}` : "";
  const lienOsmEdition = osmWayId ? `https://www.openstreetmap.org/edit?way=${encodeURIComponent(osmWayId)}` : "";
  const infoRefOsm = osmWayId
    ? `<p class="popup-ligne-osm-ref">Ref OSM : ${echapperHtml(osmWayId)}</p>`
    : "";
  const actionsOsm = osmWayId
    ? `${infoRefOsm}<p class="popup-ligne-osm-actions">{<a href="${echapperHtml(
        lienOsmEdition
      )}" target="_blank" rel="noopener noreferrer">Modifier</a> / <a href="${echapperHtml(
        lienOsmConsultation
      )}" target="_blank" rel="noopener noreferrer">Consulter</a>}</p>`
    : "";
  const ligneAvecInfos = contientInfoLigneOsm(
    feature?.properties?.line_ref,
    feature?.properties?.maxspeed,
    feature?.properties?.track_ref
  );
  let contenuHtml = '<p><strong>Aucune information disponible.</strong></p>';
  let lignePk = "<p><strong>PK :</strong> non renseigné</p>";
  if (ligneAvecInfos) {
    if (estLigneGetlink) {
      lignePk = "";
    } else {
      if (await ligneDisposeDePk(codeLigneBrut)) {
        let pkApproxime = "";
        try {
          pkApproxime = formaterPkApproxime(await estimerPkApproximatifLigne(feature, lngLat));
        } catch (erreur) {
          console.warn("Calcul du PK approximatif de la ligne impossible", erreur);
        }
        lignePk = pkApproxime
          ? `<p><strong>PK approximatif calculé :</strong> ${echapperHtml(pkApproxime)}</p>`
          : "<p><strong>PK approximatif calculé :</strong> Indisponible</p>";
      } else {
        lignePk = "<p><strong>PK approximatif calculé :</strong> Indisponible</p>";
      }
    }
    const lignesPopup = [];
    if (codeLigneBrut) {
      lignesPopup.push(construireLigneInfoPopup("Numero de ligne", numeroLigne));
      lignesPopup.push(construireLigneInfoPopup("Nom de ligne", nomLigne));
    } else if (nomReferentielOsm || nomOsm) {
      lignesPopup.push(construireLigneInfoPopup("Nom de ligne", nomReferentielOsm || nomOsm));
    }
    lignesPopup.push(construireLigneInfoPopup("Type", libelleCategorieLigne));
    lignesPopup.push(construireLigneInfoPopup("Exploitant", operateur));
    lignesPopup.push(construireLigneInfoPopup("Vitesse", vitesse));
    lignesPopup.push(construireLigneInfoPopup("Voie", voie));
    contenuHtml = `${lignesPopup.join("")}${lignePk}${actionsOsm}`;
  } else {
    const lignesComplementaires = [];
    if (nomReferentielOsm || nomOsm) {
      lignesComplementaires.push(construireLigneInfoPopup("Nom de ligne", nomReferentielOsm || nomOsm));
    }
    lignesComplementaires.push(construireLigneInfoPopup("Type", libelleCategorieLigne));
    lignesComplementaires.push(construireLigneInfoPopup("Exploitant", operateur));
    if (lignesComplementaires.length) {
      contenuHtml = `${lignesComplementaires.join("")}${actionsOsm}`;
    }
  }

  fermerPopupLigneOsmInfo();
  popupLigneOsmInfoEpinglee = options.epingler === true;
  popupLigneOsmInfo = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup-pk-info",
    offset: 10
  })
    .setLngLat([longitude, latitude])
    .setHTML(
      `<div class="popup-pk-info-contenu">${contenuHtml}</div>`
    )
    .addTo(carte);
  const elementPopup = popupLigneOsmInfo.getElement();
  if (elementPopup) {
    ["mousedown", "click", "dblclick"].forEach((nomEvenement) => {
      elementPopup.addEventListener(nomEvenement, (event) => {
        event.stopPropagation();
      });
    });
    elementPopup.addEventListener(
      "touchstart",
      (event) => {
        event.stopPropagation();
      },
      { passive: true }
    );
  }
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

function popupSurvolInfoEstVerrouillee() {
  return Boolean(popupSurvolInfo && popupSurvolInfoVerrouillee);
}

let dernierEvenementTactile = 0;

function enregistrerInteractionTactile() {
  dernierEvenementTactile = Date.now();
}

function estEvenementSurvolCarteAutorise(event) {
  const evenementDom = event?.originalEvent || event;
  if (Date.now() - dernierEvenementTactile < 800) {
    return false;
  }
  const typePointeur = String(evenementDom.pointerType || "").toLowerCase();
  return !typePointeur || typePointeur === "mouse";
}

function estSurvolDesktopActif() {
  if (!window.matchMedia) {
    return true;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
    || window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches;
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
  if (!feature) {
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
    } else if (options.verrouiller === false && !popupSurvolInfoVerrouillee) {
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
  if (!popupPkInfoEpinglee) {
    fermerPopupPkInfo();
  }
  for (const marker of marqueursPk) {
    marker.remove();
  }
  marqueursPk = [];
}

function creerElementMarqueurPk(libelle, options = {}) {
  const stylePk = options.stylePk || STYLES_PK_PAR_LIGNE_VISIBLES[0];
  const codeLigne = String(options.codeLigne || "").trim();
  const pk = String(options.pk || "").trim();
  const element = document.createElement("div");
  element.className = "marqueur-pk";
  if (codeLigne) {
    element.dataset.codeLignePk = codeLigne;
  }
  if (pk) {
    element.dataset.pk = pk;
  }
  element.textContent = libelle;
  element.style.display = "inline-flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.padding = "1px 7px";
  element.style.borderRadius = "6px";
  element.style.border = `1px solid ${stylePk.borderColor}`;
  element.style.background = stylePk.background;
  element.style.color = stylePk.color;
  element.style.fontFamily = "Manrope, sans-serif";
  element.style.fontWeight = "800";
  element.style.fontSize = "12px";
  element.style.lineHeight = "1.15";
  element.style.whiteSpace = "nowrap";
  element.style.boxShadow = `inset 0 -2px 0 ${stylePk.accentColor}, 0 1px 2px rgba(0, 0, 0, 0.22)`;
  element.style.pointerEvents = "auto";
  element.style.cursor = "pointer";
  element.style.transition = "background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, opacity 120ms ease";
  return element;
}

function normaliserPkComparaison(valeur) {
  const texte = String(valeur ?? "").trim().replace(",", ".").replace(/^PK\s*/i, "");
  const nombre = Number(texte);
  if (!Number.isFinite(nombre)) {
    return texte;
  }
  return Number.isInteger(nombre) ? String(nombre) : String(nombre).replace(/\.?0+$/, "");
}

function mettreEnEvidenceMarqueursPk(codeLigneActif) {
  const codeLigne = String(codeLigneActif || "").trim();
  document.querySelectorAll(".marqueur-pk").forEach((element) => {
    const memeLigne = codeLigne && element.dataset.codeLignePk === codeLigne;
    element.style.opacity = !codeLigne || memeLigne ? "1" : "0.58";
    if (memeLigne) {
      element.style.background = "rgba(255, 255, 255, 1)";
      element.style.borderColor = "rgba(17, 24, 39, 0.95)";
      element.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.45), 0 2px 5px rgba(0, 0, 0, 0.28)";
    } else {
      const marker = marqueursPk.find((item) => item.getElement?.() === element);
      const stylePk = marker?._stylePkAffichage || STYLES_PK_PAR_LIGNE_VISIBLES[0];
      element.style.boxShadow = `inset 0 -2px 0 ${stylePk.accentColor}, 0 1px 2px rgba(0, 0, 0, 0.16)`;
    }
  });
}

function reinitialiserMiseEnEvidenceMarqueursPk() {
  document.querySelectorAll(".marqueur-pk").forEach((element) => {
    element.style.opacity = "1";
    const marker = marqueursPk.find((item) => item.getElement?.() === element);
    const stylePk = marker?._stylePkAffichage || STYLES_PK_PAR_LIGNE_VISIBLES[0];
    element.style.background = stylePk.background;
    element.style.borderColor = stylePk.borderColor;
    element.style.boxShadow = `inset 0 -2px 0 ${stylePk.accentColor}, 0 1px 2px rgba(0, 0, 0, 0.22)`;
  });
}

function normaliserTextePk(valeur) {
  const texte = String(valeur ?? "").trim();
  return texte || "Non renseigne";
}

function retrouverNomLignePourPk(codeLigne) {
  return obtenirNomLigneObligatoireDepuisReferentiel(codeLigne);
}

function formaterPkPopup(valeurPk) {
  return formaterPkAffichage(valeurPk).replace(/^PK\s+/, "");
}

function obtenirPlagesPkPourCodeLigne(codeLigne) {
  const codeRecherche = String(codeLigne || "").trim();
  if (!codeRecherche || !Array.isArray(donneesPk?.features)) {
    return [];
  }

  const valeursPk = [];
  for (const featurePk of donneesPk.features) {
    if (String(featurePk?.properties?.code_ligne || "").trim() !== codeRecherche) {
      continue;
    }
    const valeurPk = Number(String(featurePk?.properties?.pk ?? "").replace(",", "."));
    if (!Number.isFinite(valeurPk)) {
      continue;
    }
    valeursPk.push(valeurPk);
  }

  valeursPk.sort((a, b) => a - b);
  const plages = [];
  let debutPlage = null;
  let pkPrecedent = null;
  for (const valeurPk of valeursPk) {
    if (debutPlage === null) {
      debutPlage = valeurPk;
      pkPrecedent = valeurPk;
      continue;
    }
    if (Math.round((valeurPk - pkPrecedent) * 1000) >= ECART_MIN_PLAGES_PK_METRES) {
      plages.push({ debut: debutPlage, fin: pkPrecedent });
      debutPlage = valeurPk;
    }
    pkPrecedent = valeurPk;
  }

  if (debutPlage === null) {
    return [];
  }
  plages.push({ debut: debutPlage, fin: pkPrecedent });
  return plages;
}

function construireBlocPlagesPk(codeLigne) {
  const plages = obtenirPlagesPkPourCodeLigne(codeLigne);
  if (!plages.length) {
    return "";
  }
  const plagesHtml = plages
    .map((plage) => `${echapperHtml(formaterPkPopup(plage.debut))} à ${echapperHtml(formaterPkPopup(plage.fin))}`)
    .join(" et ");
  return `<p class="popup-pk-plages"><strong>Plage PK :</strong> ${plagesHtml}</p>`;
}

function fermerPopupPkInfo() {
  if (!popupPkInfo) {
    popupPkInfoEpinglee = false;
    return;
  }
  popupPkInfo.remove();
  popupPkInfo = null;
  popupPkInfoEpinglee = false;
}

function ouvrirPopupPkInfo(feature, longitude, latitude, options = {}) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  const afficherImajnet = options.afficherImajnet === true;
  const codeLigne = normaliserTextePk(feature?.properties?.code_ligne);
  const nomLigne = retrouverNomLignePourPk(codeLigne);
  const blocNomLigne = `<p><strong>Nom de ligne :</strong> ${echapperHtml(nomLigne)}</p>`;
  const blocPlagesPk = construireBlocPlagesPk(codeLigne);
  const lienImajnet = construireLienImajnet(longitude, latitude);
  const actionImajnet = afficherImajnet
    ? `<div class="popup-pk-actions"><a class="popup-bouton-itineraire popup-pk-bouton-imajnet" href="${echapperHtml(
        lienImajnet
      )}" target="_blank" rel="noopener noreferrer">🛣️ Imajnet</a></div>`
    : "";

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
      )}</p>${blocNomLigne}${blocPlagesPk}${actionImajnet}</div>`
    )
    .addTo(carte);
  popupPkInfoEpinglee = afficherImajnet;
}

function afficherMarqueursPk(features) {
  viderMarqueursPk();
  for (const feature of features) {
    const [longitude, latitude] = feature?.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }
    const libelle = String(feature?.properties?.pk_affichage || "").trim();
    if (!libelle) {
      continue;
    }
    const codeLigne = String(feature?.properties?.pk_code_ligne_affichage || normaliserCodeLignePk(feature)).trim();
    const pk = normaliserPkComparaison(feature?.properties?.pk);
    const stylePk = feature?.properties?.pk_style_affichage || STYLES_PK_PAR_LIGNE_VISIBLES[0];
    const element = creerElementMarqueurPk(libelle, { codeLigne, pk, stylePk });
    element.addEventListener("mouseenter", () => {
      if (popupPkInfoEpinglee) {
        return;
      }
      mettreEnEvidenceMarqueursPk(codeLigne);
      ouvrirPopupPkInfo(feature, longitude, latitude);
    });
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      mettreEnEvidenceMarqueursPk(codeLigne);
      ouvrirPopupPkInfo(feature, longitude, latitude, { afficherImajnet: true });
    });
    element.addEventListener("mouseleave", () => {
      reinitialiserMiseEnEvidenceMarqueursPk();
      if (!popupPkInfoEpinglee) {
        fermerPopupPkInfo();
      }
    });

    const marker = new maplibregl.Marker({
      element,
      anchor: "center"
    })
      .setLngLat([longitude, latitude])
      .addTo(carte);
    marker._stylePkAffichage = stylePk;
    marqueursPk.push(marker);
  }
}

function appliquerCouchesDonnees() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_LIGNES_ORM_PNG)) {
    carte.addSource(SOURCE_LIGNES_ORM_PNG, {
      type: "raster",
      tiles: [
        "https://a.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "© OpenRailwayMap, © OpenStreetMap contributors"
    });
  }

  if (!carte.getLayer(COUCHE_LIGNES_ORM_PNG)) {
    carte.addLayer({
      id: COUCHE_LIGNES_ORM_PNG,
      type: "raster",
      source: SOURCE_LIGNES_ORM_PNG,
      paint: {
        "raster-opacity": 0.92
      }
    });
  }

  if (!carte.getSource(SOURCE_LIGNES_ORM_VECTORIELLES_BASSE)) {
    carte.addSource(SOURCE_LIGNES_ORM_VECTORIELLES_BASSE, {
      type: "vector",
      url: "https://openrailwaymap.app/standard_railway_line_low",
      bounds: LIMITES_FRANCE_LIGNES_ORM_VECTORIELLES,
      attribution: "Data © OpenStreetMap contributors, service OpenRailwayMap-vector",
      promoteId: "id"
    });
  }

  if (!carte.getSource(SOURCE_LIGNES_ORM_VECTORIELLES_HAUTE)) {
    carte.addSource(SOURCE_LIGNES_ORM_VECTORIELLES_HAUTE, {
      type: "vector",
      url: "https://openrailwaymap.app/railway_line_high",
      bounds: LIMITES_FRANCE_LIGNES_ORM_VECTORIELLES,
      attribution: "Data © OpenStreetMap contributors, service OpenRailwayMap-vector",
      promoteId: "id"
    });
  }

  const couchesOrmVectorielles = [
    {
      contour: COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_CONTOUR,
      ligne: COUCHE_LIGNES_ORM_VECTORIELLES_BASSE,
      interaction: COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_INTERACTION,
      source: SOURCE_LIGNES_ORM_VECTORIELLES_BASSE,
      sourceLayer: "standard_railway_line_low",
      minzoom: 2,
      maxzoom: 7,
      largeur: ["interpolate", ["linear"], ["zoom"], 2, 0.7, 7, 2.2],
      largeurContour: ["interpolate", ["linear"], ["zoom"], 2, 2.5, 7, 4]
    },
    {
      contour: COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_CONTOUR,
      ligne: COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE,
      interaction: COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_INTERACTION,
      source: SOURCE_LIGNES_ORM_VECTORIELLES_HAUTE,
      sourceLayer: "railway_line_high",
      minzoom: 7,
      maxzoom: 20,
      largeur: ["interpolate", ["linear"], ["zoom"], 7, 1.5, 13, 2.7, 19, 5],
      largeurContour: ["interpolate", ["linear"], ["zoom"], 7, 3.3, 13, 4.5, 19, 6.8]
    }
  ];

  for (const definition of couchesOrmVectorielles) {
    if (!carte.getLayer(definition.contour)) {
      carte.addLayer({
        id: definition.contour,
        type: "line",
        source: definition.source,
        "source-layer": definition.sourceLayer,
        minzoom: definition.minzoom,
        maxzoom: definition.maxzoom,
        filter: creerFiltreZoneLignesOrmVectorielles(),
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "rgba(255, 255, 255, 0.94)",
          "line-width": definition.largeurContour,
          "line-opacity": creerExpressionOpaciteLigneOrmVectorielle()
        }
      });
    }

    if (!carte.getLayer(definition.ligne)) {
      carte.addLayer({
        id: definition.ligne,
        type: "line",
        source: definition.source,
        "source-layer": definition.sourceLayer,
        minzoom: definition.minzoom,
        maxzoom: definition.maxzoom,
        filter: creerFiltreZoneLignesOrmVectorielles(),
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": creerExpressionCouleurLigneOrmVectorielle(),
          "line-width": definition.largeur,
          "line-opacity": creerExpressionOpaciteLigneOrmVectorielle()
        }
      });
    }

    if (!carte.getLayer(definition.interaction)) {
      carte.addLayer({
        id: definition.interaction,
        type: "line",
        source: definition.source,
        "source-layer": definition.sourceLayer,
        minzoom: definition.minzoom,
        maxzoom: definition.maxzoom,
        filter: creerFiltreZoneLignesOrmVectorielles(),
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": ["interpolate", ["linear"], ["zoom"], 2, 8, 12, 13, 19, 18],
          "line-opacity": 0.001
        }
      });
    }
  }

  const doitAfficherLibellesVoies =
    afficherLignesOsm && Boolean(donneesLignesOsm?.features?.length) && carte.getZoom() >= LIGNES_OSM_VOIES_ZOOM_MIN;

  if (!carte.getSource(SOURCE_LIGNES_OSM)) {
    carte.addSource(SOURCE_LIGNES_OSM, {
      type: "geojson",
      data: donneesLignesOsm || { type: "FeatureCollection", features: [] }
    });
  } else {
    carte.getSource(SOURCE_LIGNES_OSM).setData(donneesLignesOsm || { type: "FeatureCollection", features: [] });
  }

  if (!carte.getSource(SOURCE_LIGNES_OSM_VOIES)) {
    carte.addSource(SOURCE_LIGNES_OSM_VOIES, {
      type: "geojson",
      data: doitAfficherLibellesVoies ? obtenirDonneesLibellesVoiesOsm() : LIGNES_OSM_VOIES_VIDE
    });
  } else {
    carte.getSource(SOURCE_LIGNES_OSM_VOIES).setData(
      doitAfficherLibellesVoies ? obtenirDonneesLibellesVoiesOsm() : LIGNES_OSM_VOIES_VIDE
    );
  }

  if (!carte.getLayer(COUCHE_LIGNES_OSM_CONTOUR)) {
    carte.addLayer({
      id: COUCHE_LIGNES_OSM_CONTOUR,
      type: "line",
      source: SOURCE_LIGNES_OSM,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "rgba(255, 255, 255, 0.95)",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          2.4,
          11,
          4,
          15,
          5.8
        ],
        "line-opacity": 0.92
      }
    });
  }

  if (!carte.getLayer(COUCHE_LIGNES_OSM)) {
    carte.addLayer({
      id: COUCHE_LIGNES_OSM,
      type: "line",
      source: SOURCE_LIGNES_OSM,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": creerExpressionCouleurLigneOsm(),
        "line-width": creerExpressionLargeurLigneOsm(),
        "line-opacity": 0.88
      }
    });
  }

  if (!carte.getLayer(COUCHE_LIGNES_OSM_LABELS)) {
    carte.addLayer({
      id: COUCHE_LIGNES_OSM_LABELS,
      type: "symbol",
      source: SOURCE_LIGNES_OSM,
      minzoom: 10.5,
      filter: ["!=", ["coalesce", ["get", "line_label"], ""], ""],
      layout: {
        "symbol-placement": "line",
        "text-field": ["get", "line_label"],
        "text-font": ["Open Sans Bold"],
        "text-size": 11,
        "text-letter-spacing": 0.02,
        "symbol-spacing": 560
      },
      paint: {
        "text-color": "#ecfeff",
        "text-halo-color": "#064e3b",
        "text-halo-width": 1.2
      }
    });
  }

  if (!carte.getLayer(COUCHE_LIGNES_OSM_VOIES)) {
    carte.addLayer({
      id: COUCHE_LIGNES_OSM_VOIES,
      type: "symbol",
      source: SOURCE_LIGNES_OSM_VOIES,
      minzoom: LIGNES_OSM_VOIES_ZOOM_MIN,
      maxzoom: 19,
      filter: ["!=", ["coalesce", ["get", "track_ref_label"], ""], ""],
      layout: {
        "text-field": ["get", "track_ref_label"],
        "text-font": ["Open Sans Bold"],
        "text-size": 15,
        "text-allow-overlap": true,
        "text-ignore-placement": true
      },
      paint: {
        "text-color": "#1e40af",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2.2
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
          ["==", ["get", "est_sat"], true],
          PALETTE_CARTE.posteSat,
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
          [">", ["get", "sat_count"], 0],
          PALETTE_CARTE.posteSatGroupe,
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
        "circle-color": PALETTE_CARTE.pn,
        "circle-stroke-color": PALETTE_CARTE.pnContour,
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
  carte.setLayoutProperty(
    COUCHE_LIGNES_ORM_PNG,
    "visibility",
    afficherLignesOrmPng ? "visible" : "none"
  );
  for (const idCouche of [
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_CONTOUR,
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE,
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_INTERACTION,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_CONTOUR,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_INTERACTION
  ]) {
    if (carte.getLayer(idCouche)) {
      carte.setLayoutProperty(idCouche, "visibility", afficherLignesOrmVectorielles ? "visible" : "none");
    }
  }
  carte.setLayoutProperty(
    COUCHE_LIGNES_OSM_CONTOUR,
    "visibility",
    afficherLignesOsm && donneesLignesOsm ? "visible" : "none"
  );
  carte.setLayoutProperty(
    COUCHE_LIGNES_OSM,
    "visibility",
    afficherLignesOsm && donneesLignesOsm ? "visible" : "none"
  );
  carte.setPaintProperty(COUCHE_LIGNES_OSM, "line-width", creerExpressionLargeurLigneOsm());
  carte.setPaintProperty(COUCHE_LIGNES_OSM, "line-opacity", 0.88);
  carte.setLayoutProperty(
    COUCHE_LIGNES_OSM_LABELS,
    "visibility",
    afficherLignesOsm && donneesLignesOsm ? "visible" : "none"
  );
  carte.setLayoutProperty(
    COUCHE_LIGNES_OSM_VOIES,
    "visibility",
    afficherLignesOsm && donneesLignesOsm ? "visible" : "none"
  );
  if (!(afficherLignesOsm || afficherLignesOrmVectorielles)) {
    fermerPopupLigneOsmInfo();
  }
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
  if (caseLignesOsm) {
    caseLignesOsm.checked = afficherLignesOsm;
  }
  if (caseLignesOrmPng) {
    caseLignesOrmPng.checked = afficherLignesOrmPng;
  }
  if (caseLignesOrmVectorielles) {
    caseLignesOrmVectorielles.checked = afficherLignesOrmVectorielles;
  }

  mettreAJourCompteursFiltres();
  appliquerCouchesDonnees();
}

function remonterCouchesDonnees() {
  if (carte.getLayer(COUCHE_LIGNES_ORM_PNG)) {
    carte.moveLayer(COUCHE_LIGNES_ORM_PNG);
  }

  for (const idCouche of [
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_CONTOUR,
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE,
    COUCHE_LIGNES_ORM_VECTORIELLES_BASSE_INTERACTION,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_CONTOUR,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE,
    COUCHE_LIGNES_ORM_VECTORIELLES_HAUTE_INTERACTION
  ]) {
    if (carte.getLayer(idCouche)) {
      carte.moveLayer(idCouche);
    }
  }

  if (carte.getLayer(COUCHE_LIGNES_OSM_CONTOUR)) {
    carte.moveLayer(COUCHE_LIGNES_OSM_CONTOUR);
  }

  if (carte.getLayer(COUCHE_LIGNES_OSM)) {
    carte.moveLayer(COUCHE_LIGNES_OSM);
  }

  if (carte.getLayer(COUCHE_LIGNES_OSM_LABELS)) {
    carte.moveLayer(COUCHE_LIGNES_OSM_LABELS);
  }

  if (carte.getLayer(COUCHE_LIGNES_OSM_VOIES)) {
    carte.moveLayer(COUCHE_LIGNES_OSM_VOIES);
  }

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
        stylesPkParCodeLigneVisible = new Map();
        return donneesPk;
      })
      .finally(() => {
        promesseChargementPk = null;
      });
  }

  return promesseChargementPk;
}

function planifierPrechargementPkApresDemarrage() {
  if (donneesPk || promesseChargementPk) {
    return;
  }

  const demarrer = () => {
    chargerDonneesPk().catch((erreur) => {
      console.warn("Prechargement des PK impossible", erreur);
    });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(demarrer, { timeout: 2500 });
    return;
  }

  window.setTimeout(demarrer, 1500);
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

function normaliserReferencePn(valeur) {
  return String(valeur ?? "")
    .toUpperCase()
    .replace(/^PN\s*/i, "")
    .replace(/\s+/g, "")
    .trim();
}

function construireLibellePn(props = {}) {
  const candidats = [props.pn_numero, props.ref];
  for (const candidat of candidats) {
    const texteBrut = String(candidat ?? "").trim();
    if (!texteBrut) {
      continue;
    }
    if (/^pn\s*non\s*rense/i.test(texteBrut) || /^non\s*rense/i.test(texteBrut)) {
      continue;
    }
    const reference = normaliserReferencePn(candidat);
    if (reference) {
      return normaliserNumeroPn(reference);
    }
  }
  return "PN non renseigne";
}

function convertirPkEnKm(valeur) {
  const texte = String(valeur ?? "").trim().replace(",", ".");
  if (!texte) {
    return null;
  }
  const avecPlus = texte.match(/^(\d+)\s*\+\s*(\d+)$/);
  if (avecPlus) {
    return Number(avecPlus[1]) + Number(avecPlus[2]) / 1000;
  }
  return /^\d+(\.\d+)?$/.test(texte) ? Number(texte) : null;
}

function calculerDistanceMetres(coordsA, coordsB) {
  const [lonA, latA] = coordsA || [];
  const [lonB, latB] = coordsB || [];
  if (![lonA, latA, lonB, latB].every(Number.isFinite)) {
    return Infinity;
  }
  const versRadians = (valeur) => (valeur * Math.PI) / 180;
  const rayonTerre = 6371000;
  const deltaLat = versRadians(latB - latA);
  const deltaLon = versRadians(lonB - lonA);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(versRadians(latA)) * Math.cos(versRadians(latB)) * Math.sin(deltaLon / 2) ** 2;
  return 2 * rayonTerre * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function convertirCoordonneesEnMetresRelatifs(coordonnees, latitudeReference) {
  const [longitude, latitude] = coordonnees || [];
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || !Number.isFinite(latitudeReference)) {
    return null;
  }
  const metresParDegreLat = 111320;
  const metresParDegreLon = Math.cos((latitudeReference * Math.PI) / 180) * metresParDegreLat;
  return {
    x: longitude * metresParDegreLon,
    y: latitude * metresParDegreLat
  };
}

function projeterPointSurSegment(point, depart, arrivee) {
  const latitudeReference = (Number(point?.[1]) + Number(depart?.[1]) + Number(arrivee?.[1])) / 3;
  const pointMetres = convertirCoordonneesEnMetresRelatifs(point, latitudeReference);
  const departMetres = convertirCoordonneesEnMetresRelatifs(depart, latitudeReference);
  const arriveeMetres = convertirCoordonneesEnMetresRelatifs(arrivee, latitudeReference);
  if (!pointMetres || !departMetres || !arriveeMetres) {
    return null;
  }

  const deltaX = arriveeMetres.x - departMetres.x;
  const deltaY = arriveeMetres.y - departMetres.y;
  const longueurCarree = deltaX * deltaX + deltaY * deltaY;
  if (longueurCarree <= 0) {
    return null;
  }

  const projectionBrute =
    ((pointMetres.x - departMetres.x) * deltaX + (pointMetres.y - departMetres.y) * deltaY) / longueurCarree;
  const ratio = Math.min(1, Math.max(0, projectionBrute));
  const coordonneesProjetees = [
    depart[0] + (arrivee[0] - depart[0]) * ratio,
    depart[1] + (arrivee[1] - depart[1]) * ratio
  ];

  return {
    ratio,
    coordonnees: coordonneesProjetees,
    distanceMetres: calculerDistanceMetres(point, coordonneesProjetees),
    longueurSegmentMetres: Math.sqrt(longueurCarree)
  };
}

function projeterPointSurSegmentEtendu(point, depart, arrivee) {
  const latitudeReference = (Number(point?.[1]) + Number(depart?.[1]) + Number(arrivee?.[1])) / 3;
  const pointMetres = convertirCoordonneesEnMetresRelatifs(point, latitudeReference);
  const departMetres = convertirCoordonneesEnMetresRelatifs(depart, latitudeReference);
  const arriveeMetres = convertirCoordonneesEnMetresRelatifs(arrivee, latitudeReference);
  if (!pointMetres || !departMetres || !arriveeMetres) {
    return null;
  }

  const deltaX = arriveeMetres.x - departMetres.x;
  const deltaY = arriveeMetres.y - departMetres.y;
  const longueurCarree = deltaX * deltaX + deltaY * deltaY;
  if (longueurCarree <= 0) {
    return null;
  }

  const ratio =
    ((pointMetres.x - departMetres.x) * deltaX + (pointMetres.y - departMetres.y) * deltaY) / longueurCarree;
  const coordonneesProjetees = [
    depart[0] + (arrivee[0] - depart[0]) * ratio,
    depart[1] + (arrivee[1] - depart[1]) * ratio
  ];

  return {
    ratio,
    coordonnees: coordonneesProjetees,
    distanceMetres: calculerDistanceMetres(point, coordonneesProjetees)
  };
}

function calculerProjectionPointSurLigne(point, coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return null;
  }

  let meilleureProjection = null;
  let distanceCumuleeMetres = 0;

  for (let index = 1; index < coordinates.length; index += 1) {
    const depart = coordinates[index - 1];
    const arrivee = coordinates[index];
    const projection = projeterPointSurSegment(point, depart, arrivee);
    if (!projection) {
      distanceCumuleeMetres += calculerDistanceMetres(depart, arrivee);
      continue;
    }

    const positionLigneMetres = distanceCumuleeMetres + projection.longueurSegmentMetres * projection.ratio;
    const candidate = {
      distanceMetres: projection.distanceMetres,
      positionLigneMetres,
      coordonnees: projection.coordonnees
    };

    if (!meilleureProjection || candidate.distanceMetres < meilleureProjection.distanceMetres) {
      meilleureProjection = candidate;
    }

    distanceCumuleeMetres += projection.longueurSegmentMetres;
  }

  return meilleureProjection;
}

function extraireLignesCoordonnees(geometry) {
  if (!geometry || !Array.isArray(geometry.coordinates)) {
    return [];
  }
  if (geometry.type === "LineString") {
    return [geometry.coordinates];
  }
  if (geometry.type === "MultiLineString") {
    return geometry.coordinates.filter((ligne) => Array.isArray(ligne) && ligne.length >= 2);
  }
  return [];
}

function calculerAncrageLigneDepuisPointEcran(feature, pointEcran) {
  if (!carte || !pointEcran) {
    return null;
  }

  let meilleurAncrage = null;
  for (const coordonnees of extraireLignesCoordonnees(feature?.geometry)) {
    for (let index = 1; index < coordonnees.length; index += 1) {
      const depart = coordonnees[index - 1];
      const arrivee = coordonnees[index];
      const projectionDepart = carte.project(depart);
      const projectionArrivee = carte.project(arrivee);
      if (
        !Number.isFinite(projectionDepart?.x) ||
        !Number.isFinite(projectionDepart?.y) ||
        !Number.isFinite(projectionArrivee?.x) ||
        !Number.isFinite(projectionArrivee?.y)
      ) {
        continue;
      }

      const deltaX = projectionArrivee.x - projectionDepart.x;
      const deltaY = projectionArrivee.y - projectionDepart.y;
      const longueurCarree = deltaX * deltaX + deltaY * deltaY;
      if (longueurCarree <= 0) {
        continue;
      }

      const ratioBrut =
        ((pointEcran.x - projectionDepart.x) * deltaX + (pointEcran.y - projectionDepart.y) * deltaY) / longueurCarree;
      const ratio = Math.min(1, Math.max(0, ratioBrut));
      const pointProjete = {
        x: projectionDepart.x + deltaX * ratio,
        y: projectionDepart.y + deltaY * ratio
      };
      const distancePx = Math.hypot(pointProjete.x - pointEcran.x, pointProjete.y - pointEcran.y);
      if (meilleurAncrage && distancePx >= meilleurAncrage.distancePx) {
        continue;
      }

      const lngLat = carte.unproject(pointProjete);
      meilleurAncrage = {
        distancePx,
        lngLat: {
          lng: lngLat.lng,
          lat: lngLat.lat
        }
      };
    }
  }

  return meilleurAncrage;
}

function formaterPkApproxime(valeurKm) {
  const pkCompact = formaterPkPnCompact(valeurKm);
  return pkCompact ? pkCompact.replace(/^PK\s*/i, "") : "";
}

function extraireReferencesPkLigne(codeLigne) {
  const references = [];
  for (const feature of donneesPk?.features || []) {
    if (String(feature?.properties?.code_ligne || "").trim() !== codeLigne) {
      continue;
    }
    const point = feature?.geometry?.coordinates;
    const pkKm = convertirPkEnKm(feature?.properties?.pk);
    if (!Array.isArray(point) || !Number.isFinite(pkKm)) {
      continue;
    }
    references.push({ pkKm, point });
  }
  return references.sort((a, b) => a.pkKm - b.pkKm);
}

async function estimerPkApproximatifDepuisPkLocaux(codeLigneBrut, lngLat) {
  const codeLigne = String(codeLigneBrut || "").trim();
  const longitude = Number(lngLat?.lng);
  const latitude = Number(lngLat?.lat);
  if (!codeLigne || !Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  await chargerDonneesPk();
  const references = extraireReferencesPkLigne(codeLigne);
  if (references.length < 2) {
    return null;
  }

  const pointClique = [longitude, latitude];
  const DISTANCE_MAX_REFERENCE_LOCALE_METRES = 120;
  const MARGE_EXTRAPOLATION_RATIO = 2;
  let meilleurSegment = null;
  for (let index = 1; index < references.length; index += 1) {
    const avant = references[index - 1];
    const apres = references[index];
    const deltaPkMetres = (apres.pkKm - avant.pkKm) * 1000;
    if (!Number.isFinite(deltaPkMetres) || Math.abs(deltaPkMetres) < 1) {
      continue;
    }
    const projection = projeterPointSurSegmentEtendu(pointClique, avant.point, apres.point);
    const depassementRatio = projection ? Math.max(0, -projection.ratio, projection.ratio - 1) : Infinity;
    if (!projection || depassementRatio > MARGE_EXTRAPOLATION_RATIO) {
      continue;
    }
    if (projection.distanceMetres > DISTANCE_MAX_REFERENCE_LOCALE_METRES) {
      continue;
    }
    const estimation = avant.pkKm + (apres.pkKm - avant.pkKm) * projection.ratio;
    const candidate = {
      estimation,
      distanceMetres: projection.distanceMetres,
      depassementRatio
    };
    if (
      !meilleurSegment ||
      candidate.distanceMetres < meilleurSegment.distanceMetres ||
      (candidate.distanceMetres === meilleurSegment.distanceMetres && candidate.depassementRatio < meilleurSegment.depassementRatio)
    ) {
      meilleurSegment = candidate;
    }
  }

  return meilleurSegment ? meilleurSegment.estimation : null;
}

function estimationPkSembleAberrante(codeLigne, estimation, referenceLocale) {
  if (!Number.isFinite(referenceLocale)) {
    return false;
  }
  if (!Number.isFinite(estimation)) {
    return true;
  }
  const references = extraireReferencesPkLigne(String(codeLigne || "").trim());
  if (!references.length) {
    return Math.abs(estimation - referenceLocale) > 2;
  }
  const pkMin = references[0].pkKm;
  const pkMax = references[references.length - 1].pkKm;
  return estimation < pkMin - 1 || estimation > pkMax + 1 || Math.abs(estimation - referenceLocale) > 2;
}

function choisirEstimationPkApproximative(codeLigne, estimationOsm, estimationLocale) {
  if (!Number.isFinite(estimationLocale)) {
    return estimationOsm;
  }
  if (!Number.isFinite(estimationOsm)) {
    return estimationLocale;
  }
  if (estimationPkSembleAberrante(codeLigne, estimationOsm, estimationLocale)) {
    return estimationLocale;
  }

  const ECART_MAX_OSM_LOCAL_METRES = 10;
  const ecartMetres = Math.abs(estimationOsm - estimationLocale) * 1000;
  return ecartMetres > ECART_MAX_OSM_LOCAL_METRES ? estimationLocale : estimationOsm;
}

async function estimerPkApproximatifDepuisLignes(codeLigneBrut, lignes, lngLat) {
  const codeLigne = String(codeLigneBrut || "").trim();
  const longitude = Number(lngLat?.lng);
  const latitude = Number(lngLat?.lat);
  const DISTANCE_MAX_EXTRAPOLATION_PK_METRES = 1000;
  if (!codeLigne || !Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  if (!lignes.length) {
    return null;
  }

  await chargerDonneesPk();

  const pointClique = [longitude, latitude];
  let meilleureLigne = null;
  for (const ligne of lignes) {
    const projection = calculerProjectionPointSurLigne(pointClique, ligne);
    if (!projection) {
      continue;
    }
    if (!meilleureLigne || projection.distanceMetres < meilleureLigne.projection.distanceMetres) {
      meilleureLigne = { ligne, projection };
    }
  }

  if (!meilleureLigne) {
    return null;
  }

  const DISTANCE_MAX_REFERENCE_LIGNE_METRES = 60;
  const references = [];
  const ajouterReferences = (features, extraireCodeLigne, extrairePk) => {
    for (const element of features || []) {
      if (String(extraireCodeLigne(element) || "").trim() !== codeLigne) {
        continue;
      }
      const point = element?.geometry?.coordinates;
      const pkKm = convertirPkEnKm(extrairePk(element));
      if (!Array.isArray(point) || !Number.isFinite(pkKm)) {
        continue;
      }
      const projection = calculerProjectionPointSurLigne(point, meilleureLigne.ligne);
      if (!projection || projection.distanceMetres > DISTANCE_MAX_REFERENCE_LIGNE_METRES) {
        continue;
      }
      references.push({
        pkKm,
        positionLigneMetres: projection.positionLigneMetres,
        distanceMetres: projection.distanceMetres
      });
    }
  };

  ajouterReferences(donneesPk?.features, (element) => element?.properties?.code_ligne, (element) => element?.properties?.pk);

  if (!references.length) {
    return null;
  }

  references.sort((a, b) => a.positionLigneMetres - b.positionLigneMetres || a.distanceMetres - b.distanceMetres);
  const positionCliqueeMetres = meilleureLigne.projection.positionLigneMetres;
  const estimerEntreReferences = (referenceA, referenceB) => {
    if (!referenceA || !referenceB || referenceA === referenceB) {
      return null;
    }
    const deltaLigneMetres = referenceB.positionLigneMetres - referenceA.positionLigneMetres;
    const deltaPkMetres = (referenceB.pkKm - referenceA.pkKm) * 1000;
    const ratioPk = deltaLigneMetres !== 0 ? Math.abs(deltaPkMetres / deltaLigneMetres) : Infinity;
    if (Math.abs(deltaLigneMetres) < 1 || ratioPk < 0.5 || ratioPk > 1.5) {
      return null;
    }
    const ratio = (positionCliqueeMetres - referenceA.positionLigneMetres) / deltaLigneMetres;
    return referenceA.pkKm + (referenceB.pkKm - referenceA.pkKm) * ratio;
  };
  let referenceAvant = null;
  let referenceApres = null;
  for (const reference of references) {
    if (reference.positionLigneMetres <= positionCliqueeMetres) {
      referenceAvant = reference;
    }
    if (!referenceApres && reference.positionLigneMetres >= positionCliqueeMetres) {
      referenceApres = reference;
    }
  }

  if (referenceAvant && referenceApres && referenceAvant !== referenceApres) {
    const estimationEncadree = estimerEntreReferences(referenceAvant, referenceApres);
    if (Number.isFinite(estimationEncadree)) {
      return estimationEncadree;
    }
  }

  const referencesParPk = [...references].sort((a, b) => a.pkKm - b.pkKm || a.distanceMetres - b.distanceMetres);
  const referencePkMin = referencesParPk[0] || null;
  const referenceApresPkMin = referencesParPk.find(
    (reference) => reference !== referencePkMin && Math.abs(reference.pkKm - referencePkMin.pkKm) >= 0.001
  );
  if (referencePkMin && referenceApresPkMin) {
    const coteAvantPkMin =
      (positionCliqueeMetres - referencePkMin.positionLigneMetres) *
        (referenceApresPkMin.positionLigneMetres - referencePkMin.positionLigneMetres) <
      0;
    const ecartPositionMinMetres = Math.abs(positionCliqueeMetres - referencePkMin.positionLigneMetres);
    if (coteAvantPkMin && ecartPositionMinMetres <= DISTANCE_MAX_EXTRAPOLATION_PK_METRES) {
      const estimationAvantPremierPk = estimerEntreReferences(referencePkMin, referenceApresPkMin);
      if (Number.isFinite(estimationAvantPremierPk) && estimationAvantPremierPk < referencePkMin.pkKm) {
        return estimationAvantPremierPk;
      }
    }
  }

  const referencePkMax = referencesParPk[referencesParPk.length - 1] || null;
  const referenceAvantPkMax = [...referencesParPk]
    .reverse()
    .find((reference) => reference !== referencePkMax && Math.abs(reference.pkKm - referencePkMax.pkKm) >= 0.001);
  if (referencePkMax && referenceAvantPkMax) {
    const coteApresPkMax =
      (positionCliqueeMetres - referencePkMax.positionLigneMetres) *
        (referenceAvantPkMax.positionLigneMetres - referencePkMax.positionLigneMetres) <
      0;
    const ecartPositionMaxMetres = Math.abs(positionCliqueeMetres - referencePkMax.positionLigneMetres);
    if (coteApresPkMax && ecartPositionMaxMetres <= DISTANCE_MAX_EXTRAPOLATION_PK_METRES) {
      const estimationApresDernierPk = estimerEntreReferences(referencePkMax, referenceAvantPkMax);
      if (Number.isFinite(estimationApresDernierPk) && estimationApresDernierPk > referencePkMax.pkKm) {
        return estimationApresDernierPk;
      }
    }
  }

  const referenceLaPlusProche = references.reduce((meilleure, reference) => {
    const ecartCourant = Math.abs(reference.positionLigneMetres - positionCliqueeMetres);
    if (!meilleure || ecartCourant < meilleure.ecartMetres || (ecartCourant === meilleure.ecartMetres && reference.distanceMetres < meilleure.reference.distanceMetres)) {
      return { reference, ecartMetres: ecartCourant };
    }
    return meilleure;
  }, null);

  if (!referenceLaPlusProche) {
    return null;
  }

  if (referenceLaPlusProche.ecartMetres > DISTANCE_MAX_EXTRAPOLATION_PK_METRES) {
    return null;
  }

  const indexReferenceProche = references.indexOf(referenceLaPlusProche.reference);
  const referenceVoisine =
    references[indexReferenceProche + 1] ||
    references[indexReferenceProche - 1] ||
    null;
  if (referenceVoisine) {
    const deltaLigneMetres =
      referenceLaPlusProche.reference.positionLigneMetres - referenceVoisine.positionLigneMetres;
    const deltaPkKm = referenceLaPlusProche.reference.pkKm - referenceVoisine.pkKm;
    const ratioPk = deltaLigneMetres !== 0 ? Math.abs((deltaPkKm * 1000) / deltaLigneMetres) : Infinity;
    if (Math.abs(deltaLigneMetres) >= 1 && ratioPk >= 0.5 && ratioPk <= 1.5) {
      return (
        referenceLaPlusProche.reference.pkKm +
        ((positionCliqueeMetres - referenceLaPlusProche.reference.positionLigneMetres) * deltaPkKm) /
          deltaLigneMetres
      );
    }
  }

  const pkMin = references.reduce((minimum, reference) => Math.min(minimum, reference.pkKm), Infinity);
  const pkMax = references.reduce((maximum, reference) => Math.max(maximum, reference.pkKm), -Infinity);
  const estimation =
    referenceLaPlusProche.reference.pkKm + (positionCliqueeMetres - referenceLaPlusProche.reference.positionLigneMetres) / 1000;
  const margePkKm = DISTANCE_MAX_EXTRAPOLATION_PK_METRES / 1000;

  if (estimation < pkMin - margePkKm || estimation > pkMax + margePkKm) {
    return null;
  }

  return estimation;
}

async function estimerPkApproximatifLigne(feature, lngLat) {
  const lignes = extraireLignesCoordonnees(feature?.geometry);
  const codeLigne = feature?.properties?.line_ref;
  const [estimationOsm, estimationLocale] = await Promise.all([
    estimerPkApproximatifDepuisLignes(codeLigne, lignes, lngLat),
    estimerPkApproximatifDepuisPkLocaux(codeLigne, lngLat)
  ]);
  return choisirEstimationPkApproximative(codeLigne, estimationOsm, estimationLocale);
}

async function estimerPkApproximatifPoint(codeLigne, lngLat) {
  if (!String(codeLigne || "").trim()) {
    return null;
  }

  await chargerDonneesLignesOsm();
  const lignes = [];
  for (const feature of donneesLignesOsm?.features || []) {
    if (String(feature?.properties?.line_ref || "").trim() !== String(codeLigne || "").trim()) {
      continue;
    }
    lignes.push(...extraireLignesCoordonnees(feature?.geometry));
  }

  const [estimationOsm, estimationLocale] = await Promise.all([
    estimerPkApproximatifDepuisLignes(codeLigne, lignes, lngLat),
    estimerPkApproximatifDepuisPkLocaux(codeLigne, lngLat)
  ]);
  return choisirEstimationPkApproximative(codeLigne, estimationOsm, estimationLocale);
}

function construirePointsLibellesLigne(coordinates, espacementMetres = 180) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return [];
  }

  const points = [];
  let cible = espacementMetres / 2;
  let distanceCumulee = 0;

  for (let index = 1; index < coordinates.length; index += 1) {
    const pointDepart = coordinates[index - 1];
    const pointArrivee = coordinates[index];
    const longueurSegment = calculerDistanceMetres(pointDepart, pointArrivee);
    if (!Number.isFinite(longueurSegment) || longueurSegment <= 0) {
      continue;
    }

    while (distanceCumulee + longueurSegment >= cible) {
      const ratio = (cible - distanceCumulee) / longueurSegment;
      points.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            pointDepart[0] + (pointArrivee[0] - pointDepart[0]) * ratio,
            pointDepart[1] + (pointArrivee[1] - pointDepart[1]) * ratio
          ]
        }
      });
      cible += espacementMetres;
    }

    distanceCumulee += longueurSegment;
  }

  return points;
}

async function chargerPnDepuisGeojson() {
  const reponse = await fetch("./pn_osm.geojson", { cache: "default" });
  if (!reponse.ok) {
    throw new Error(`HTTP ${reponse.status}`);
  }

  const geojson = await reponse.json();
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  for (const feature of features) {
    const props = feature?.properties || {};
    feature.properties = {
      osm_id: String(props.osm_id || "").trim(),
      ref: String(props.ref || "").trim(),
      railway_position: String(props.railway_position || props.pk || "").trim(),
      railway_ref: String(props.railway_ref || props.code_ligne || "").trim(),
      code_ligne: String(props.code_ligne || props.railway_ref || "").trim(),
      nom_ligne: obtenirNomLigneObligatoireDepuisReferentiel(props.code_ligne || props.railway_ref),
      pk: String(props.pk || props.railway_position || "").trim()
    };
    feature.properties.pn_numero = construireLibellePn({
      ...props,
      ...feature.properties
    });
  }

  return { type: "FeatureCollection", features };
}

async function chargerLignesOsmDepuisGeojson() {
  const reponse = await fetch("./lignes_osm.geojson", { cache: "default" });
  if (!reponse.ok) {
    throw new Error(`HTTP ${reponse.status}`);
  }

  const geojson = await reponse.json();
  const sourceFeatures = Array.isArray(geojson?.features) ? geojson.features : [];
  const features = [];
  for (const feature of sourceFeatures) {
    const props = feature?.properties || {};
    const lineRefBrut = String(props.line_ref || "").trim();
    const trackRefBrut = String(props.track_ref || "").trim();
    const lineRefNormalise = lineRefBrut || (ressembleACodeLignePrincipal(trackRefBrut) ? trackRefBrut : "");
    const trackRefNormalise =
      trackRefBrut && !ressembleACodeLignePrincipal(trackRefBrut) && trackRefBrut !== lineRefNormalise ? trackRefBrut : "";
    const proprietesNormalisees = normaliserProprietesLigneOsm({
      name: String(props.name || "").trim(),
      line_ref: lineRefNormalise,
      track_ref: trackRefNormalise,
      usage: String(props.usage || "").trim(),
      maxspeed: String(props.maxspeed || "").trim(),
      maxspeed_forward: String(props.maxspeed_forward || "").trim(),
      maxspeed_backward: String(props.maxspeed_backward || "").trim(),
      operator: String(props.operator || "").trim(),
      service: String(props.service || "").trim(),
      osm_way_id: String(props.osm_way_id || "").trim()
    });
    feature.properties = proprietesNormalisees;
    features.push(feature);
  }

  return {
    type: "FeatureCollection",
    features
  };
}

function construireLibellesVoiesOsm(donneesLignes) {
  const features = [];

  for (const feature of donneesLignes?.features || []) {
    const trackRef = String(feature.properties?.track_ref || "").trim();
    if (!trackRef) {
      continue;
    }

    const points = construirePointsLibellesLigne(feature.geometry?.coordinates, 180);
    for (const point of points) {
      features.push({
        ...point,
        properties: {
          track_ref_label: trackRef
        }
      });
    }
  }

  return { type: "FeatureCollection", features };
}

async function chargerDonneesPn() {
  if (donneesPn) {
    return donneesPn;
  }

  if (!promesseChargementPn) {
    promesseChargementPn = chargerPnDepuisGeojson()
      .then((donnees) => {
        donneesPn = donnees;
        mettreAJourCompteursFiltres();
        return donneesPn;
      })
      .finally(() => {
        promesseChargementPn = null;
      });
  }

  return promesseChargementPn;
}

async function chargerDonneesLignesOsm() {
  if (donneesLignesOsm) {
    return donneesLignesOsm;
  }

  if (!promesseChargementLignesOsm) {
    promesseChargementLignesOsm = chargerLignesOsmDepuisGeojson()
      .then((donnees) => {
        donneesLignesOsm = donnees;
        donneesLignesOsmVoies = null;
        return donneesLignesOsm;
      })
      .finally(() => {
        promesseChargementLignesOsm = null;
      });
  }

  return promesseChargementLignesOsm;
}

function collecterCoordonneesGeometrie(geometrie, sortie = []) {
  if (!geometrie) {
    return sortie;
  }
  if (geometrie.type === "LineString") {
    for (const coord of geometrie.coordinates || []) {
      const longitude = Number(coord?.[0]);
      const latitude = Number(coord?.[1]);
      if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
        sortie.push([longitude, latitude]);
      }
    }
    return sortie;
  }
  if (geometrie.type === "MultiLineString") {
    for (const ligne of geometrie.coordinates || []) {
      collecterCoordonneesGeometrie({ type: "LineString", coordinates: ligne }, sortie);
    }
  }
  return sortie;
}

function calculerBoundsCoordonnees(coordonnees) {
  let bounds = null;
  for (const coord of coordonnees || []) {
    if (!bounds) {
      bounds = new maplibregl.LngLatBounds(coord, coord);
    } else {
      bounds.extend(coord);
    }
  }
  return bounds;
}

function assurerCoucheLigneRecherche() {
  if (!carte.getSource(SOURCE_LIGNE_RECHERCHE)) {
    carte.addSource(SOURCE_LIGNE_RECHERCHE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] }
    });
  }
  if (!carte.getLayer(COUCHE_LIGNE_RECHERCHE_CONTOUR)) {
    carte.addLayer({
      id: COUCHE_LIGNE_RECHERCHE_CONTOUR,
      type: "line",
      source: SOURCE_LIGNE_RECHERCHE,
      paint: {
        "line-color": "rgba(255, 255, 255, 0.96)",
        "line-width": 13,
        "line-opacity": 0.9
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    });
  }
  if (!carte.getLayer(COUCHE_LIGNE_RECHERCHE)) {
    carte.addLayer({
      id: COUCHE_LIGNE_RECHERCHE,
      type: "line",
      source: SOURCE_LIGNE_RECHERCHE,
      paint: {
        "line-color": "#2563eb",
        "line-width": 9,
        "line-opacity": 0.92
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    });
  }
}

function definirOpaciteSurlignageLigneRecherche(opaciteTrait, opaciteContour = opaciteTrait) {
  if (carte.getLayer(COUCHE_LIGNE_RECHERCHE_CONTOUR)) {
    carte.setPaintProperty(COUCHE_LIGNE_RECHERCHE_CONTOUR, "line-opacity", opaciteContour);
  }
  if (carte.getLayer(COUCHE_LIGNE_RECHERCHE)) {
    carte.setPaintProperty(COUCHE_LIGNE_RECHERCHE, "line-opacity", opaciteTrait);
  }
}

function obtenirBoutonRetourAffichageLigneRecherche() {
  if (boutonRetourAffichageLigneRecherche) {
    return boutonRetourAffichageLigneRecherche;
  }
  boutonRetourAffichageLigneRecherche = document.createElement("button");
  boutonRetourAffichageLigneRecherche.type = "button";
  boutonRetourAffichageLigneRecherche.className = "ligne-recherche-retour";
  boutonRetourAffichageLigneRecherche.textContent = "Revenir à l'affichage normal";
  boutonRetourAffichageLigneRecherche.hidden = true;
  boutonRetourAffichageLigneRecherche.addEventListener("click", () => {
    effacerSurlignageLigneRecherche();
  });
  document.body.appendChild(boutonRetourAffichageLigneRecherche);
  return boutonRetourAffichageLigneRecherche;
}

function afficherBoutonRetourAffichageLigneRecherche() {
  obtenirBoutonRetourAffichageLigneRecherche().hidden = false;
}

function masquerBoutonRetourAffichageLigneRecherche() {
  const bouton = obtenirBoutonRetourAffichageLigneRecherche();
  bouton.hidden = true;
}

function arreterClignotementLigneRecherche(options = {}) {
  if (intervalleClignotementLigneRecherche) {
    clearInterval(intervalleClignotementLigneRecherche);
    intervalleClignotementLigneRecherche = null;
  }
  if (temporisationClignotementLigneRecherche) {
    clearTimeout(temporisationClignotementLigneRecherche);
    temporisationClignotementLigneRecherche = null;
  }
  if (options.masquer && carte.getLayer(COUCHE_LIGNE_RECHERCHE)) {
    definirOpaciteSurlignageLigneRecherche(0, 0);
  }
}

function effacerSurlignageLigneRecherche() {
  arreterClignotementLigneRecherche({ masquer: true });
  const source = carte.getSource(SOURCE_LIGNE_RECHERCHE);
  source?.setData({ type: "FeatureCollection", features: [] });
  masquerBoutonRetourAffichageLigneRecherche();
}

async function ouvrirLigneDepuisRecherche(codeLigneBrut) {
  const codeLigne = String(codeLigneBrut || "").trim();
  if (!codeLigne) {
    return false;
  }

  await activerLigneFerroviaire({ automatique: true });
  appliquerCouchesDonnees();
  remonterCouchesDonnees();

  const features = (donneesLignesOsm?.features || []).filter(
    (feature) => String(feature?.properties?.line_ref || "").trim() === codeLigne
  );
  if (!features.length) {
    return false;
  }

  assurerCoucheLigneRecherche();
  const source = carte.getSource(SOURCE_LIGNE_RECHERCHE);
  source?.setData({ type: "FeatureCollection", features });

  const bounds = calculerBoundsCoordonnees(features.flatMap((feature) => collecterCoordonneesGeometrie(feature.geometry)));
  if (bounds && !bounds.isEmpty()) {
    carte.fitBounds(bounds, {
      padding: { top: 110, right: 80, bottom: 80, left: Math.min(520, Math.max(90, window.innerWidth * 0.34)) },
      maxZoom: 12.8,
      duration: 700
    });
  }

  arreterClignotementLigneRecherche();
  masquerBoutonRetourAffichageLigneRecherche();
  let visible = true;
  definirOpaciteSurlignageLigneRecherche(0.95, 0.9);
  intervalleClignotementLigneRecherche = setInterval(() => {
    visible = !visible;
    if (carte.getLayer(COUCHE_LIGNE_RECHERCHE)) {
      definirOpaciteSurlignageLigneRecherche(visible ? 0.95 : 0.16, visible ? 0.9 : 0.08);
    }
  }, 300);
  temporisationClignotementLigneRecherche = setTimeout(() => {
    arreterClignotementLigneRecherche();
    if (carte.getLayer(COUCHE_LIGNE_RECHERCHE)) {
      definirOpaciteSurlignageLigneRecherche(0.95, 0.9);
    }
    afficherBoutonRetourAffichageLigneRecherche();
  }, 5000);
  return true;
}

function obtenirDonneesLibellesVoiesOsm() {
  if (!donneesLignesOsm?.features?.length) {
    return LIGNES_OSM_VOIES_VIDE;
  }
  if (!donneesLignesOsmVoies) {
    donneesLignesOsmVoies = construireLibellesVoiesOsm(donneesLignesOsm);
  }
  return donneesLignesOsmVoies;
}

function attendreStabiliteCartePourLignesOsm() {
  return new Promise((resolve) => {
    let termine = false;
    let temporisation = null;

    const nettoyer = () => {
      if (temporisation) {
        clearTimeout(temporisation);
        temporisation = null;
      }
      carte.off("idle", terminer);
      carte.off("style.load", gererStyleChargePourStabilite);
    };

    const resoudreApresRespirationRendu = () => {
      window.setTimeout(resolve, 120);
    };

    const terminer = () => {
      if (termine) {
        return;
      }
      termine = true;
      nettoyer();
      resoudreApresRespirationRendu();
    };

    const gererStyleChargePourStabilite = () => {
      if (carte.loaded()) {
        terminer();
        return;
      }
      carte.once("idle", terminer);
    };

    temporisation = window.setTimeout(terminer, DELAI_MAX_ATTENTE_STABILITE_LIGNES_OSM_MS);

    if (carte.isStyleLoaded() && carte.loaded()) {
      terminer();
      return;
    }

    carte.once("idle", terminer);
    if (!carte.isStyleLoaded()) {
      carte.once("style.load", gererStyleChargePourStabilite);
    }
  });
}

async function activerLigneFerroviaire(options = {}) {
  const estAutomatique = options.automatique === true;
  afficherLignesOrmPng = false;
  afficherLignesOrmVectorielles = false;
  if (caseLignesOrmPng) {
    caseLignesOrmPng.checked = false;
  }
  if (caseLignesOrmVectorielles) {
    caseLignesOrmVectorielles.checked = false;
  }
  afficherLignesOsm = true;
  if (caseLignesOsm) {
    caseLignesOsm.checked = true;
    caseLignesOsm.disabled = true;
  }
  try {
    await chargerDonneesLignesOsm();
  } catch (erreur) {
    afficherLignesOsm = false;
    if (caseLignesOsm) {
      caseLignesOsm.checked = false;
    }
    console.error("Impossible de charger lignes_osm.geojson", erreur);
    if (!estAutomatique) {
      alert("Chargement des lignes ferroviaires impossible. Vérifie la présence du fichier lignes_osm.geojson.");
    }
  } finally {
    if (caseLignesOsm) {
      caseLignesOsm.disabled = false;
    }
  }

  appliquerCouchesDonnees();
  remonterCouchesDonnees();
  forcerRafraichissementCarte({ tentativesDifferees: true });
  if (afficherLignesOsm) {
    masquerMessageChargementAuReposCarte();
  }
}

function planifierActivationAutoLigneFerroviaire() {
  if (
    activationAutoLigneFerroviairePlanifiee ||
    afficherLignesOsm ||
    afficherLignesOrmPng ||
    afficherLignesOrmVectorielles
  ) {
    return;
  }
  activationAutoLigneFerroviairePlanifiee = true;
  attendreStabiliteCartePourLignesOsm().then(() => {
    if (afficherLignesOsm || afficherLignesOrmPng || afficherLignesOrmVectorielles) {
      return;
    }
    activerLigneFerroviaire({ automatique: true }).catch((erreur) => {
      console.error("Impossible d'activer automatiquement la ligne ferroviaire", erreur);
    });
  });
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
  const [longitudeAppareil, latitudeAppareil] = feature?.geometry?.coordinates || [];
  const posteAssocieAppareil = options?.posteAssocie || null;
  const posteLigneAppareil = posteAssocieAppareil || null;
  const supportUniquementHorsPatrimoine = appareilsListe.every((appareil) => estHorsPatrimoine(appareil?.hors_patrimoine));
  const masquerLigneAppareil =
    estHorsPatrimoine(posteAssocieAppareil?.hors_patrimoine)
    || estHorsPatrimoine(posteLigneAppareil?.hors_patrimoine)
    || estHorsPatrimoine(posteAssocieAppareil?.special)
    || estHorsPatrimoine(posteLigneAppareil?.special)
    || (!posteAssocieAppareil && supportUniquementHorsPatrimoine);
  const ligneAppareilHtml = construireLignePkEtLigneHtml(posteLigneAppareil, {
    longitude: Number.isFinite(longitudeAppareil) ? longitudeAppareil : undefined,
    latitude: Number.isFinite(latitudeAppareil) ? latitudeAppareil : undefined
  });
  const sectionLigneAppareil = !masquerLigneAppareil && ligneAppareilHtml ? `<p class="popup-poste-ligne-titre">🚆 ${ligneAppareilHtml}</p>` : "";
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
  const enteteAppareil = `${sectionTitre}${afficherPillsTelecommande ? pillsTelecommande : ""}${sectionLigneAppareil}`;
  const sectionEntete = enteteAppareil ? `<section class="popup-section">${enteteAppareil}</section>` : "";
  return `${sectionEntete}<section class="popup-section">${badgeSupport}${lignesAppareils}</section>`;
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

function construireSectionExplorerAcces(longitude, latitude, coordonneesPoste = null) {
  const boutonLocaliser = construireCommandeLocaliserCarte([
    { label: "🚗 Localiser l'accès", longitude, latitude },
    { label: "📍 Localiser le poste", longitude: coordonneesPoste?.[0], latitude: coordonneesPoste?.[1] }
  ]);
  return `<section class="popup-section popup-section-itineraires"><div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Explorer l'accès</span></div><div class="popup-itineraires popup-itineraires-poste-actions">${boutonLocaliser}<button class="popup-bouton-itineraire popup-bouton-street-view" id="popup-ouvrir-street-view" type="button" data-lng="${longitude}" data-lat="${latitude}">🛣️ Street View</button></div></section>`;
}

function construireCommandeLocaliserCarte(cibles = []) {
  const ciblesValides = cibles.filter((cible) => {
    return (
      cible &&
      Number.isFinite(Number(cible.longitude)) &&
      Number.isFinite(Number(cible.latitude)) &&
      String(cible.label || "").trim()
    );
  });

  if (!ciblesValides.length) {
    return "";
  }

  if (ciblesValides.length === 1) {
    const cible = ciblesValides[0];
    return `<button class="popup-bouton-itineraire popup-bouton-localiser popup-localiser-option" type="button" data-lng="${Number(
      cible.longitude
    )}" data-lat="${Number(cible.latitude)}">📍 Localiser sur la carte</button>`;
  }

  const optionsHtml = ciblesValides
    .map((cible) => {
      return `<button class="popup-bouton-itineraire popup-bouton-localiser popup-localiser-option" type="button" data-lng="${Number(
        cible.longitude
      )}" data-lat="${Number(cible.latitude)}">${echapperHtml(cible.label)}</button>`;
    })
    .join("");

  return `<details class="popup-localiser-menu"><summary class="popup-bouton-itineraire popup-bouton-localiser popup-localiser-toggle">📍 Localiser sur la carte</summary><div class="popup-localiser-options">${optionsHtml}</div></details>`;
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

function trouverCoordonneesPostePrincipalDepuisPosteAssocie(posteAssocie = null) {
  const postePrincipal = trouverPostePrincipalDepuisPosteAssocie(posteAssocie);
  if (!postePrincipal || !donneesPostes?.features?.length) {
    return null;
  }

  const cleNomType = construireCleNomType(postePrincipal);
  if (!cleNomType) {
    return null;
  }

  let fallback = null;
  for (const featurePostes of donneesPostes.features) {
    const [longitude, latitude] = featurePostes.geometry?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      continue;
    }

    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }

    const matchPrincipal = postesListe.some((poste) => {
      return construireCleNomType(poste) === cleNomType && !normaliserTexteRecherche(champCompletOuVide(poste?.SAT));
    });
    if (matchPrincipal) {
      return [longitude, latitude];
    }

    if (!fallback) {
      const matchNomType = postesListe.some((poste) => construireCleNomType(poste) === cleNomType);
      if (matchNomType) {
        fallback = [longitude, latitude];
      }
    }
  }

  return fallback;
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
  if (estHorsPatrimoine(poste?.special) || estHorsPatrimoine(poste?.hors_patrimoine)) {
    return "";
  }
  return construireLibelleLigneDepuisNumero(poste?.numero_ligne);
}

function construireLignePkEtLigneHtml(poste, options = {}) {
  if (estHorsPatrimoine(poste?.special) || estHorsPatrimoine(poste?.hors_patrimoine)) {
    return "";
  }
  const numeroLigne = poste?.numero_ligne !== "" && poste?.numero_ligne !== null && poste?.numero_ligne !== undefined
    ? String(poste.numero_ligne).trim()
    : "";
  const libelle = construireLibelleLigneDepuisNumero(numeroLigne);
  if (!libelle) {
    return "";
  }

  const longitude = Number(options.longitude);
  const latitude = Number(options.latitude);
  if (numeroLigne && Number.isFinite(longitude) && Number.isFinite(latitude)) {
    return `<span class="popup-poste-ligne-pk-estime" data-poste-pk-estime="1" data-code-ligne="${echapperHtml(
      numeroLigne
    )}" data-lng="${longitude}" data-lat="${latitude}" data-libelle-ligne="${echapperHtml(libelle)}">${echapperHtml(libelle)}</span>`;
  }
  return echapperHtml(libelle);
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

async function mettreAJourPkEstimePostesDansPopup(racine = modalFicheContenu) {
  if (!racine) {
    return;
  }

  const elements = racine.querySelectorAll("[data-poste-pk-estime='1']");
  for (const element of elements) {
    if (element.dataset.pkEstimeCharge === "1") {
      continue;
    }
    element.dataset.pkEstimeCharge = "1";
    const codeLigne = String(element.dataset.codeLigne || "").trim();
    const longitude = Number(element.dataset.lng);
    const latitude = Number(element.dataset.lat);
    const libelleLigne = String(element.dataset.libelleLigne || "").trim();
    if (!codeLigne || !Number.isFinite(longitude) || !Number.isFinite(latitude) || !libelleLigne) {
      continue;
    }

    try {
      if (!(await ligneDisposeDePk(codeLigne))) {
        continue;
      }
      const pkEstimeKm = await estimerPkApproximatifPoint(codeLigne, { lng: longitude, lat: latitude });
      if (!Number.isFinite(pkEstimeKm) || pkEstimeKm <= 0) {
        continue;
      }
      const pkApproxime = formaterPkApproxime(pkEstimeKm);
      if (pkApproxime) {
        element.textContent = `PK estimé ${pkApproxime} sur la ${libelleLigne}`;
      }
    } catch (erreur) {
      console.warn("Calcul du PK estimé impossible", erreur);
    }
  }
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

  const clesNomTypeCibles = new Set(postesListe.map((poste) => construireCleNomType(poste)).filter(Boolean));
  const postesListeReference = (() => {
    if (!clesNomTypeCibles.size || !donneesPostes?.features?.length) {
      return postesListe;
    }

    const uniques = new Map();
    for (const featurePostes of donneesPostes.features) {
      const liste = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
      for (const poste of liste) {
        if (!clesNomTypeCibles.has(construireCleNomType(poste))) {
          continue;
        }
        const cleUnique = construireCleNomTypeSat(poste);
        if (!cleUnique || uniques.has(cleUnique)) {
          continue;
        }
        uniques.set(cleUnique, poste);
      }
    }

    return uniques.size ? Array.from(uniques.values()) : postesListe;
  })();

  const clesPostesNomType = new Set(postesListeReference.map((poste) => construireCleNomType(poste)).filter(Boolean));
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
  let appareilAssocieTrouve = false;
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
      appareilAssocieTrouve = true;

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

  // Conserver le comportement actuel :
  // s'il n'existe aucun appareil associe a ce poste, on n'affiche pas la vue
  // "Afficher/Ajouter des appareils" et on garde uniquement le bouton d'ajout direct.
  if (!appareilAssocieTrouve) {
    return "";
  }

  // Si des appareils existent deja, proposer tous les lieux d'ajout issus des postes :
  // poste principal + SAT, meme s'ils n'ont pas encore d'appareil.
  for (const poste of postesListeReference) {
    const sat = champCompletOuVide(poste?.SAT) || "Poste";
    const cleSat = sat.toUpperCase();
    if (!groupes.has(cleSat)) {
      groupes.set(cleSat, {
        label: sat,
        codes: new Map()
      });
    }
  }

  const lignes = Array.from(groupes.values())
    .sort((a, b) => comparerLibellesSat(a.label, b.label))
    .map((groupe) => {
      const codes = Array.from(groupe.codes.values()).sort((a, b) =>
        String(a.code).localeCompare(String(b.code), "fr", { numeric: true })
      );
      const codesHtml = codes.length
        ? codes
            .map(
              (entree) =>
                `<button class="popup-poste-appareil-lien" type="button" data-lng="${entree.longitude}" data-lat="${entree.latitude}">${echapperHtml(entree.code)}</button>`
            )
            .join(", ")
        : `<span class="popup-poste-appareils-vide">Aucun appareil</span>`;
      const posteReference = trouverPostePrincipalDepuisListePostes(postesListeReference) || postesListeReference[0] || null;
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
  const lignePkSousTitre = construireLignePkEtLigneHtml(poste, options);
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
  const [longitudeFeature, latitudeFeature] = feature.geometry?.coordinates || [];
  const optionsLigne = {
    longitude: Number.isFinite(longitudeFeature) ? longitudeFeature : undefined,
    latitude: Number.isFinite(latitudeFeature) ? latitudeFeature : undefined
  };
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
        const infoLigneHtml = construireLignePkEtLigneHtml(p, optionsLigne);
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
  return construireFichePosteDepuisEntree(poste, optionsLigne);
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
        mettreAJourPkEstimePostesDansPopup(popupCarte.getElement());
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
        mettreAJourPkEstimePostesDansPopup(popupCarte.getElement());
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
        durationDouxMs: 260,
        speed: 1.55,
        curve: 1.02
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
        durationDouxMs: 260,
        speed: 1.55,
        curve: 1.02
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

  const boutonsLocaliserCarte = racinePopup.querySelectorAll(".popup-localiser-option[data-lng][data-lat]");
  for (const boutonLocaliserCarte of boutonsLocaliserCarte) {
    boutonLocaliserCarte.addEventListener("click", () => {
      const longitude = Number(boutonLocaliserCarte.getAttribute("data-lng"));
      const latitude = Number(boutonLocaliserCarte.getAttribute("data-lat"));
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }
      fermerPopupCarte();
      demarrerClignotementLocalisation(longitude, latitude, {
        recentrerCarte: true,
        zoomMin: 16.4,
        dureeZoomMs: 720
      });
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

const LIEN_POWER_BI_PATRIMOINE_SPOT =
  "https://app.powerbi.com/groups/me/reports/24acac4b-a393-4b44-ba9c-d22cae4170a3?ctid=4a7c8238-5799-4b16-9fc6-9ad8fce5a7d9&pbi_source=linkShare";

function trouverPosteCibleDepuisFeaturePostes(featurePostes, cibleSatCourante = "") {
  const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
  if (!postesListe.length) {
    return null;
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

  return posteCible || null;
}

function trouverPostePrincipalDepuisListePostes(postesListe = []) {
  if (!Array.isArray(postesListe) || !postesListe.length) {
    return null;
  }
  const principal = postesListe.find((poste) => !normaliserTexteRecherche(champCompletOuVide(poste?.SAT)));
  return principal || postesListe[0] || null;
}

function trouverPostePrincipalDepuisPosteAssocie(posteAssocie = null) {
  if (!posteAssocie || !donneesPostes?.features?.length) {
    return posteAssocie || null;
  }
  const cleNomType = construireCleNomType(posteAssocie);
  if (!cleNomType) {
    return posteAssocie;
  }

  const correspondants = [];
  for (const featurePostes of donneesPostes.features) {
    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    if (!postesListe.length) {
      continue;
    }
    for (const poste of postesListe) {
      if (construireCleNomType(poste) === cleNomType) {
        correspondants.push(poste);
      }
    }
  }

  if (!correspondants.length) {
    return posteAssocie;
  }

  const principal = correspondants.find((poste) => !normaliserTexteRecherche(champCompletOuVide(poste?.SAT)));
  if (principal) {
    return principal;
  }

  const avecArmen = correspondants.find((poste) => normaliserCodesArmen(poste?.armen).length > 0);
  return avecArmen || correspondants[0] || posteAssocie;
}

function normaliserCodesArmen(valeur) {
  const valeurs = Array.isArray(valeur) ? valeur : [valeur];
  const uniques = [];
  for (const element of valeurs) {
    if (element === null || element === undefined) {
      continue;
    }
    const brut = String(element);
    const codes = brut.match(/\d{6,}/g) || [];
    for (const code of codes) {
      if (!uniques.includes(code)) {
        uniques.push(code);
      }
    }
  }
  return uniques;
}

function construireLienPowerBiPatrimoineSpot(poste = null) {
  const codesArmen = normaliserCodesArmen(poste?.armen);
  if (!codesArmen.length) {
    return LIEN_POWER_BI_PATRIMOINE_SPOT;
  }

  const filtre = codesArmen.length === 1
    ? `PATRIMOINE/Ancetre eq '${codesArmen[0]}'`
    : `PATRIMOINE/Ancetre in (${codesArmen.map((code) => `'${code}'`).join(",")})`;
  return `${LIEN_POWER_BI_PATRIMOINE_SPOT}&filter=${encodeURIComponent(filtre)}`;
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
  let coordonneesRetourPostePrincipalDepuisAppareil = null;
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
    coordonneesRetourPostePrincipalDepuisAppareil = trouverCoordonneesPostePrincipalDepuisPosteAssocie(posteAssocieDepuisAppareil);
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
  const sectionExplorerAcces = estAccesFiche ? construireSectionExplorerAcces(longitude, latitude, coordonneesRetourPosteDepuisAcces) : "";
  const modalStreetView = estAccesFiche ? construireModalStreetView() : "";
  const lienImajnet = featurePostes || estVueAppareilsSeule ? construireLienImajnet(longitude, latitude) : "";
  const lienSignalementTerrain =
    "https://forms.office.com/Pages/ResponsePage.aspx?id=OIJ8SplXFkufxprY_OWn2UJJqJxHNcNPmrPMZznt7P1UNUhTNFRJVkhJVzBPMTMyM1g5UUlUMlgzTS4u";
  const classeActionsPoste = "popup-itineraires-poste-actions";
  const libelleSectionActionsPoste = "Explorer les équipements";
  const posteAfficheDansFiche = estVuePosteSeule && featurePostes
    ? trouverPosteCibleDepuisFeaturePostes(featurePostes, cibleSatCourante)
    : estVueAppareilsSeule
      ? posteAssocieDepuisAppareil
      : null;
  const estFicheSpeciale = Boolean(posteAfficheDansFiche?.special);
  const activerSectionEquipements = Boolean((featurePostes || estVueAppareilsSeule) && !estFicheSpeciale);
  const actionsExplorerEquipements = [];
  const posteCibleFiche = estVuePosteSeule && featurePostes
    ? trouverPostePrincipalDepuisPosteAssocie(trouverPosteCibleDepuisFeaturePostes(featurePostes, cibleSatCourante))
    : estVueAppareilsSeule
      ? trouverPostePrincipalDepuisPosteAssocie(posteAssocieDepuisAppareil)
      : null;
  const lienPowerBiPatrimoineSpot = construireLienPowerBiPatrimoineSpot(posteCibleFiche);
  const lienAjoutAppareilDepuisPoste = (() => {
    if (!featurePostes || !estVuePosteSeule) {
      return "";
    }

    const posteCible = trouverPosteCibleDepuisFeaturePostes(featurePostes, cibleSatCourante);
    if (!posteCible) {
      return "";
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
  const ciblesLocalisationEquipements = [];
  if (estVueAppareilsSeule) {
    ciblesLocalisationEquipements.push({ label: "🚗 Localiser l'accès", longitude: coordonneesNavigation?.[0], latitude: coordonneesNavigation?.[1] });
    ciblesLocalisationEquipements.push({ label: "🚉 Localiser le poste", longitude: coordonneesRetourPostePrincipalDepuisAppareil?.[0], latitude: coordonneesRetourPostePrincipalDepuisAppareil?.[1] });
    if (champCompletOuVide(posteAssocieDepuisAppareil?.SAT)) {
      ciblesLocalisationEquipements.push({ label: "📌 Localiser le SAT", longitude: coordonneesRetourPosteDepuisAppareil?.[0], latitude: coordonneesRetourPosteDepuisAppareil?.[1] });
    }
    ciblesLocalisationEquipements.push({ label: "📍 Localiser l'appareil", longitude, latitude });
  } else if (estVuePosteSeule) {
    ciblesLocalisationEquipements.push({ label: "🚗 Localiser l'accès", longitude: coordonneesRetourAccesDepuisPoste?.[0], latitude: coordonneesRetourAccesDepuisPoste?.[1] });
    ciblesLocalisationEquipements.push({
      label: "🚉 Localiser le poste",
      longitude: (cibleSatCourante && cibleSatCourante !== "poste" ? coordonneesPostePrincipalDepuisSat?.[0] : longitude),
      latitude: (cibleSatCourante && cibleSatCourante !== "poste" ? coordonneesPostePrincipalDepuisSat?.[1] : latitude)
    });
    if (cibleSatCourante && cibleSatCourante !== "poste") {
      ciblesLocalisationEquipements.push({ label: "📌 Localiser le SAT", longitude, latitude });
    }
  }
  const commandeLocaliserEquipements = construireCommandeLocaliserCarte(ciblesLocalisationEquipements);
  if (commandeLocaliserEquipements) {
    actionsExplorerEquipements.push({
      label: "Localiser sur la carte",
      html: commandeLocaliserEquipements
    });
  }
  actionsExplorerEquipements.push({
    label: "Power BI",
    html: `<a class="popup-bouton-itineraire" href="${echapperHtml(lienPowerBiPatrimoineSpot)}" target="_blank" rel="noopener noreferrer">⚡️ Patrimoine SPOT</a>`
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
    : `<section class="popup-section popup-section-localiser"><div class="popup-itineraires popup-itineraires-poste-actions">${construireCommandeLocaliserCarte([
        { label: "📍 Localiser sur la carte", longitude, latitude }
      ])}<a class="popup-bouton-itineraire" href="${echapperHtml(lienPowerBiPatrimoineSpot)}" target="_blank" rel="noopener noreferrer">⚡️ Patrimoine SPOT</a></div></section>`;
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
  mettreAJourPkEstimePostesDansPopup(popupCarte.getElement());
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

  if (type === "pn") {
    feature = obtenirFeatureALaCoordonnee(donneesPn, longitude, latitude) || obtenirFeatureProche(donneesPn, longitude, latitude);
    if (feature) {
      ouvrirPopupPnInfo(feature);
      return true;
    }
  } else if (type === "pk") {
    feature = obtenirFeatureALaCoordonnee(donneesPk, longitude, latitude) || obtenirFeatureProche(donneesPk, longitude, latitude);
    if (feature) {
      ouvrirPopupPkInfo(feature, longitude, latitude, { afficherImajnet: true });
      return true;
    }
  } else if (type === "postes") {
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

  if (type === "pn") {
    feature = obtenirFeatureALaCoordonnee(donneesPn, longitude, latitude) || obtenirFeatureProche(donneesPn, longitude, latitude);
    if (!feature) {
      return false;
    }
    ouvrirPopupPnInfo(feature);
    return true;
  } else if (type === "pk") {
    feature = obtenirFeatureALaCoordonnee(donneesPk, longitude, latitude) || obtenirFeatureProche(donneesPk, longitude, latitude);
    if (!feature) {
      return false;
    }
    ouvrirPopupPkInfo(feature, longitude, latitude, { afficherImajnet: true });
    return true;
  } else if (type === "postes") {
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
  const ouvertureImmediateMobile = estContexteMobile() && !estSurvolDesktopActif();
  const ouvrirPopup = () => {
    if (popupOuverte) {
      return;
    }
    popupOuverte = true;
    demarrerClignotementLocalisation(longitude, latitude);
    if (estSurvolDesktopActif()) {
      ouvrirPopupSurvolDepuisCoordonneesPourType(type, longitude, latitude, { verrouiller: true });
      return;
    }
    ouvrirPopupDepuisCoordonneesPourType(type, longitude, latitude, {
      fallbackGenerique: false,
      eviterRecentrageCarte: ouvertureImmediateMobile
    });
  };

  if (ouvertureImmediateMobile) {
    carte.jumpTo({
      center: [longitude, latitude],
      zoom: Math.max(carte.getZoom(), 14.1)
    });
    if (type === "pn") {
      window.setTimeout(ouvrirPopup, 1000);
    } else {
      ouvrirPopup();
    }
    return true;
  }

  return naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
    forceZoom: true,
    conserverPopupOuvert: !estSurvolDesktopActif(),
    zoomMin: 14.1,
    durationDouxMs: 300,
    durationVolMs: 420,
    speed: 1.42,
    curve: 1.05
  });
}

function ouvrirPkDepuisRecherche(resultat) {
  const longitude = Number(resultat?.longitude);
  const latitude = Number(resultat?.latitude);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return false;
  }

  const codeLigne = String(resultat?.codeLigne || "").trim();
  const pk = String(resultat?.pk || "").trim();
  const feature =
    (donneesPk?.features || []).find((element) => {
      const props = element?.properties || {};
      const memeCode = !codeLigne || String(props.code_ligne || "").trim() === codeLigne;
      const memePk = !pk || String(props.pk || "").trim().replace(",", ".") === pk.replace(",", ".");
      if (!memeCode || !memePk) {
        return false;
      }
      const [lng, lat] = element?.geometry?.coordinates || [];
      return Math.abs(Number(lng) - longitude) < 1e-9 && Math.abs(Number(lat) - latitude) < 1e-9;
    }) ||
    obtenirFeatureALaCoordonnee(donneesPk, longitude, latitude) ||
    obtenirFeatureProche(donneesPk, longitude, latitude) || {
      type: "Feature",
      geometry: { type: "Point", coordinates: [longitude, latitude] },
      properties: {
        code_ligne: codeLigne,
        pk
      }
    };

  let popupOuverte = false;
  const ouvrirPopup = () => {
    if (popupOuverte) {
      return;
    }
    popupOuverte = true;
    ouvrirPopupPkInfo(feature, longitude, latitude, { afficherImajnet: true });
  };

  const navigationOk = naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
    forceZoom: true,
    conserverPopupOuvert: !estSurvolDesktopActif(),
    attendreCarteStable: true,
    zoomMin: PK_ZOOM_RECHERCHE,
    durationDouxMs: 300,
    durationVolMs: 420,
    speed: 1.42,
    curve: 1.05
  });
  window.setTimeout(ouvrirPopup, 1800);
  window.setTimeout(() => {
    ouvrirPopupPkInfo(feature, longitude, latitude, { afficherImajnet: true });
  }, 2600);
  return navigationOk;
}

function verrouillerPopupSurvolTemporairement(dureeMs = 900) {
  survolPopupVerrouilleJusqua = Date.now() + Math.max(0, Number(dureeMs) || 0);
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
  const attendreCarteStable = Boolean(options.attendreCarteStable);
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
    if (attendreCarteStable) {
      if (carte.isMoving()) {
        carte.once("idle", ouvrirPopup);
        return;
      }
      carte.once("idle", ouvrirPopup);
      return;
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
    const optionsVol = {
      center: [longitude, latitude],
      zoom: Math.max(carte.getZoom(), Number(options.zoomMin) || 14.2),
      speed: Number(options.speed) || 1.05,
      curve: Number(options.curve) || 1.15,
      essential: true
    };
    const durationVolMs = Number(options.durationVolMs);
    if (Number.isFinite(durationVolMs) && durationVolMs > 0) {
      optionsVol.duration = durationVolMs;
    }
    carte.flyTo(optionsVol);
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
    const ouvertureImmediateMobile = estContexteMobile() && !estSurvolDesktopActif();
    const ouvrirPopup = () => {
      if (popupOuverte) {
        return;
      }
      popupOuverte = true;
      demarrerClignotementLocalisation(cible.longitude, cible.latitude);
      if (estSurvolDesktopActif()) {
        ouvrirPopupSurvolDepuisCoordonneesPourType(cible.type, cible.longitude, cible.latitude, { verrouiller: true });
        return;
      }
      ouvrirPopupDepuisCoordonneesPourType(cible.type, cible.longitude, cible.latitude, {
        fallbackGenerique: false,
        eviterRecentrageCarte: ouvertureImmediateMobile
      });
    };

    if (ouvertureImmediateMobile) {
      ouvrirPopup();
      carte.jumpTo({
        center: [cible.longitude, cible.latitude],
        zoom: Math.max(carte.getZoom(), 14.1)
      });
      return;
    }

    verrouillerPopupSurvolTemporairement();
    naviguerVersCoordonneesPuisOuvrirPopup(cible.longitude, cible.latitude, ouvrirPopup, {
      forceZoom: true,
      conserverPopupOuvert: !estSurvolDesktopActif(),
      attendreCarteStable: true,
      zoomMin: 14.1,
      durationDouxMs: 300,
      durationVolMs: 420,
      speed: 1.42,
      curve: 1.05
    });
  } catch (erreur) {
    console.error("Impossible d'ouvrir la fiche depuis le parametre id", erreur);
  }
}

async function ouvrirFicheDepuisParametreArmen() {
  const params = new URLSearchParams(window.location.search);
  const armenParam = String(params.get("armen") || "").trim();
  if (!armenParam) {
    return false;
  }

  const armenCible = (armenParam.match(/\d{6,}/) || [armenParam])[0];
  if (!armenCible) {
    return true;
  }

  try {
    await Promise.all([chargerDonneesPostes(), chargerDonneesAppareils()]);
    if (!carte.loaded()) {
      await new Promise((resolve) => {
        carte.once("load", resolve);
      });
    }

    let cible = null;
    for (const feature of donneesPostes?.features || []) {
      const [longitude, latitude] = feature.geometry?.coordinates || [];
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        continue;
      }
      const postesListe = extraireListeDepuisFeature(feature, "postes_liste_json");
      if (!postesListe.length) {
        continue;
      }
      const posteTrouve = postesListe.find((poste) => normaliserCodesArmen(poste?.armen).includes(armenCible));
      if (posteTrouve) {
        cible = { longitude, latitude };
        break;
      }
    }

    if (!cible) {
      console.warn(`Aucun poste trouvé pour le paramètre armen=${armenCible}`);
      return true;
    }

    await activerFiltrePourType("postes");
    appliquerCouchesDonnees();
    remonterCouchesDonnees();

    let popupOuverte = false;
    const ouvrirPopup = () => {
      if (popupOuverte) {
        return;
      }
      popupOuverte = true;
      demarrerClignotementLocalisation(cible.longitude, cible.latitude);
      ouvrirPopupDepuisCoordonneesPourType("postes", cible.longitude, cible.latitude, {
        fallbackGenerique: false,
        cibleSatPoste: "Poste"
      });
    };

    naviguerVersCoordonneesPuisOuvrirPopup(cible.longitude, cible.latitude, ouvrirPopup, {
      forceZoom: true,
      zoomMin: 14.4,
      durationDouxMs: 260,
      speed: 1.55,
      curve: 1.02,
      conserverPopupOuvert: true
    });
  } catch (erreur) {
    console.error("Impossible d'ouvrir la fiche depuis le paramètre armen", erreur);
  }

  return true;
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
    demarrerClignotementLocalisation(longitude, latitude);
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
  if (type === "pn") {
    afficherPn = true;
    if (casePn) {
      casePn.checked = true;
    }
    await chargerDonneesPn();
    return;
  }

  if (type === "pk") {
    afficherPk = true;
    if (casePk) {
      casePk.checked = true;
    }
    await chargerDonneesPk();
    return;
  }

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
    fermerPopupPkInfo();

    if (mesureActive) {
      ajouterPointMesure(event.lngLat.lng, event.lngLat.lat, event.point);
      return;
    }

    const couchesDisponibles = couchesInteractives.filter((id) => Boolean(carte.getLayer(id)));
    if (couchesDisponibles.length) {
      const objets = interrogerObjetsDepuisTap(event.point, couchesDisponibles);
      const meilleurObjet = choisirMeilleurObjetDepuisTap(objets, event.point);
      if (meilleurObjet) {
        if (popupSurvolInfoEstVerrouillee()) {
          fermerPopupSurvolInfo();
        }
        fermerPopupLigneOsmInfo();
        ouvrirPopupDepuisObjetsCarte([meilleurObjet]);
        return;
      }
    }

    if (afficherPn && carte.getLayer(COUCHE_PN)) {
      const pnObjets = interrogerObjetsDepuisTap(event.point, [COUCHE_PN]);
      const meilleurPn = choisirMeilleurObjetDepuisTap(pnObjets, event.point);
      if (meilleurPn) {
        if (popupSurvolInfoEstVerrouillee()) {
          fermerPopupSurvolInfo();
        }
        ouvrirPopupPnInfo(meilleurPn, { epingler: true });
        return;
      }
      fermerPopupPnInfo();
    }

    const couchesLignesActives = obtenirCouchesLignesInteractivesActives();
    if (couchesLignesActives.length) {
      const lignesActives = interrogerObjetsDepuisTap(event.point, couchesLignesActives);
      if (lignesActives.length) {
        const ligneAncree = lignesActives
          .map((objet) => ({
            objet,
            ancrage: calculerAncrageLigneDepuisPointEcran(objet, event.point)
          }))
          .filter((candidat) => candidat.ancrage)
          .sort((a, b) => a.ancrage.distancePx - b.ancrage.distancePx)[0];
        if (popupSurvolInfoEstVerrouillee()) {
          fermerPopupSurvolInfo();
        }
        fermerPopupCarte();
        const ligneSelectionnee = preparerFeaturePopupLigneActive(ligneAncree?.objet || lignesActives[0]);
        ouvrirPopupLigneOsmInfo(ligneSelectionnee, ligneAncree?.ancrage?.lngLat || event.lngLat, { epingler: true });
        return;
      }
      fermerPopupLigneOsmInfo();
    }

    if (popupSurvolInfoEstVerrouillee()) {
      fermerPopupSurvolInfo();
    }
  });

  carte.on("contextmenu", (event) => {
    event.originalEvent?.preventDefault?.();
    fermerPopupCarte();
    const featureContexte = recupererFeatureContexte(event.point);
    ouvrirMenuContextuel(event, featureContexte);
  });

  carte.on("touchstart", (event) => {
    enregistrerInteractionTactile();
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
    enregistrerInteractionTactile();
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("touchcancel", () => {
    enregistrerInteractionTactile();
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("touchmove", () => {
    enregistrerInteractionTactile();
    if (temporisationAppuiLong) {
      clearTimeout(temporisationAppuiLong);
      temporisationAppuiLong = null;
    }
  });

  carte.on("mousemove", (event) => {
    if (mesureActive) {
      mettreAJourCurseurCarteMesure();
      fermerPopupLigneOsmInfo();
      fermerPopupSurvolInfo();
      return;
    }

    if (!estEvenementSurvolCarteAutorise(event)) {
      if (!popupLigneOsmInfoEstEpinglee()) {
        fermerPopupLigneOsmInfo();
      }
      if (!popupPnInfoEpinglee) {
        fermerPopupPnInfo();
      }
      if (!popupSurvolInfoEstVerrouillee()) {
        fermerPopupSurvolInfo();
      }
      return;
    }

    if (popupSurvolInfoEstVerrouillee()) {
      return;
    }

    if (popupSurvolInfoVerrouillee && Date.now() < survolPopupVerrouilleJusqua) {
      return;
    }
    if (popupLigneOsmInfoEstEpinglee()) {
      return;
    }

    dernierPointCurseur = event.point;
    if (survolCurseurPlanifie) {
      return;
    }
    survolCurseurPlanifie = true;
    window.requestAnimationFrame(() => {
      survolCurseurPlanifie = false;
      const couchesDisponibles = couchesInteractives.filter((id) => Boolean(carte.getLayer(id)));
      if (!dernierPointCurseur) {
        carte.getCanvas().style.cursor = "";
        return;
      }

      if (couchesDisponibles.length) {
        const objets = carte.queryRenderedFeatures(dernierPointCurseur, {
          layers: couchesDisponibles
        });
        if (objets.length) {
          carte.getCanvas().style.cursor = "pointer";
          const objetSurvole = couchesInteractivesSurvolPrioritaires
            .map((idCouche) => objets.find((objet) => objet?.layer?.id === idCouche))
            .find(Boolean);
          if (!popupLigneOsmInfoEstEpinglee()) {
            fermerPopupLigneOsmInfo();
          }
          if (!popupPnInfoEpinglee) {
            fermerPopupPnInfo();
          }
          ouvrirPopupSurvolInfo(objetSurvole || objets[0], { verrouiller: false });
          return;
        }
      }

      if (afficherPn && carte.getLayer(COUCHE_PN)) {
        const pnObjets = carte.queryRenderedFeatures(dernierPointCurseur, {
          layers: [COUCHE_PN]
        });
        const meilleurPn = choisirMeilleurObjetDepuisTap(pnObjets, dernierPointCurseur);
        if (meilleurPn) {
          carte.getCanvas().style.cursor = "pointer";
          if (!popupLigneOsmInfoEstEpinglee()) {
            fermerPopupLigneOsmInfo();
          }
          if (!popupSurvolInfoEstVerrouillee()) {
            fermerPopupSurvolInfo();
          }
          ouvrirPopupPnInfo(meilleurPn, { epingler: false });
          return;
        }
      }

      const couchesLignesActives = obtenirCouchesLignesInteractivesActives();
      if (couchesLignesActives.length) {
        const lignesActives = carte.queryRenderedFeatures(dernierPointCurseur, {
          layers: couchesLignesActives
        });
        if (lignesActives.length) {
          carte.getCanvas().style.cursor = "pointer";
          const ligneAncree = lignesActives
            .map((objet) => ({
              objet,
              ancrage: calculerAncrageLigneDepuisPointEcran(objet, dernierPointCurseur)
            }))
            .filter((candidat) => candidat.ancrage)
            .sort((a, b) => a.ancrage.distancePx - b.ancrage.distancePx)[0];
          if (!popupSurvolInfoEstVerrouillee()) {
            fermerPopupSurvolInfo();
          }
          if (!popupPnInfoEpinglee) {
            fermerPopupPnInfo();
          }
          const ligneSelectionnee = preparerFeaturePopupLigneActive(ligneAncree?.objet || lignesActives[0]);
          ouvrirPopupLigneOsmInfo(ligneSelectionnee, ligneAncree?.ancrage?.lngLat || event.lngLat, { epingler: false });
          return;
        }
      }

      carte.getCanvas().style.cursor = "";
      if (!popupLigneOsmInfoEstEpinglee()) {
        fermerPopupLigneOsmInfo();
      }
      if (!popupPnInfoEpinglee) {
        fermerPopupPnInfo();
      }
      if (!popupSurvolInfoVerrouillee) {
        fermerPopupSurvolInfo();
      }
    });
  });
  carte.on("mouseout", () => {
    if (!popupLigneOsmInfoEstEpinglee()) {
      fermerPopupLigneOsmInfo();
    }
    if (!popupPnInfoEpinglee) {
      fermerPopupPnInfo();
    }
    if (popupSurvolInfoEstVerrouillee()) {
      carte.getCanvas().style.cursor = "";
      return;
    }
    if (popupSurvolInfoVerrouillee && Date.now() < survolPopupVerrouilleJusqua) {
      return;
    }
    if (!popupSurvolInfoVerrouillee) {
      fermerPopupSurvolInfo();
    }
    carte.getCanvas().style.cursor = "";
  });

  carte.on("movestart", () => {
    gererDebutInteractionCarte({ fermerMenuContextuel: true });
  });

  carte.on("zoomstart", () => {
    gererDebutInteractionCarte({ fermerMenuContextuel: true, suspendreSuivi: true });
  });

  carte.on("dragstart", () => {
    gererDebutInteractionCarte({ fermerMenuContextuel: true, suspendreSuivi: true });
  });

  carte.on("rotatestart", () => {
    gererDebutInteractionCarte({ fermerMenuContextuel: true, suspendreSuivi: true });
  });

  carte.on("pitchstart", () => {
    gererDebutInteractionCarte({ fermerMenuContextuel: true, suspendreSuivi: true });
  });
}

function mettreAJourSelection(nomFond) {
  for (const option of optionsFond) {
    option.checked = option.value === nomFond;
  }
  synchroniserSwitchsVillePourFond(nomFond);
}

function mettreAJourLibellesFondsAutomatiques() {
  const baseAuto = determinerFondIgnAutomatique();
  const libelleBase = baseAuto === FOND_BASE_AUTO_SOMBRE ? "Dark Matter" : "Voyager";
  if (libelleFondAutoIgn) {
    libelleFondAutoIgn.textContent = `Auto ${libelleBase} + Satellite IGN`;
  }
  if (libelleFondAutoEsri) {
    libelleFondAutoEsri.textContent = `Auto ${libelleBase} + Satellite ESRI`;
  }
}

function synchroniserSwitchsVillePourFond(nomFond) {
  if (!caseLabelsIgn || !caseLabelsEsri) {
    return;
  }

  if (nomFond === "satelliteIgn") {
    caseLabelsEsri.checked = false;
    return;
  }

  if (nomFond === "satelliteEsri") {
    caseLabelsIgn.checked = false;
    return;
  }

  if (nomFond === FOND_IGN_AUTOMATIQUE) {
    caseLabelsEsri.checked = false;
    return;
  }

  if (nomFond === FOND_ESRI_AUTOMATIQUE) {
    caseLabelsIgn.checked = false;
    return;
  }

  caseLabelsIgn.checked = false;
  caseLabelsEsri.checked = false;
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

function determinerFondIgnAutomatique() {
  return mediaQueryModeSombre?.matches ? FOND_BASE_AUTO_SOMBRE : FOND_BASE_AUTO_CLAIR;
}

function estFondBaseAutomatique(nomFond) {
  return nomFond === FOND_BASE_AUTO_CLAIR || nomFond === FOND_BASE_AUTO_SOMBRE;
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
    if (
      idCouche === COUCHE_SATELLITE_IGN_AUTO ||
      idCouche === COUCHE_SATELLITE_ESRI_AUTO ||
      idCouche === COUCHE_LABELS_VILLES
    ) {
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

function assurerCoucheSatelliteEsriAuto() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_SATELLITE_ESRI_AUTO)) {
    carte.addSource(SOURCE_SATELLITE_ESRI_AUTO, {
      type: "raster",
      tiles: [URL_TUILES_SATELLITE_ESRI],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Source: Esri, Maxar, Earthstar Geographics"
    });
  }

  if (!carte.getLayer(COUCHE_SATELLITE_ESRI_AUTO)) {
    carte.addLayer(
      {
        id: COUCHE_SATELLITE_ESRI_AUTO,
        type: "raster",
        source: SOURCE_SATELLITE_ESRI_AUTO,
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

function assurerCoucheLabelsVilles() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  if (!carte.getSource(SOURCE_LABELS_VILLES)) {
    carte.addSource(SOURCE_LABELS_VILLES, {
      type: "raster",
      tiles: [URL_TUILES_LABELS_VILLES],
      tileSize: 256,
      maxzoom: 20,
      attribution: "© OpenStreetMap contributors, © CARTO"
    });
  }

  if (!carte.getLayer(COUCHE_LABELS_VILLES)) {
    carte.addLayer({
      id: COUCHE_LABELS_VILLES,
      type: "raster",
      source: SOURCE_LABELS_VILLES,
      layout: {
        visibility: "none"
      }
    });
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

function masquerCoucheSatelliteEsriAuto() {
  if (!carte.getLayer(COUCHE_SATELLITE_ESRI_AUTO)) {
    return;
  }
  carte.setPaintProperty(COUCHE_SATELLITE_ESRI_AUTO, "raster-opacity-transition", { duration: 0, delay: 0 });
  carte.setLayoutProperty(COUCHE_SATELLITE_ESRI_AUTO, "visibility", "none");
  carte.setPaintProperty(COUCHE_SATELLITE_ESRI_AUTO, "raster-opacity", 0);
}

function mettreAJourLabelsVilles() {
  if (!carte.isStyleLoaded()) {
    return;
  }

  assurerCoucheLabelsVilles();
  if (!carte.getLayer(COUCHE_LABELS_VILLES)) {
    return;
  }

  const afficherLabels =
    (fondActif === "satelliteIgn" && caseLabelsIgn?.checked) ||
    (fondActif === "satelliteEsri" && caseLabelsEsri?.checked) ||
    (estFondBaseAutomatique(fondActif) &&
      ignAutomatiqueActif &&
      modeAutoActif === FOND_ESRI_AUTOMATIQUE &&
      caseLabelsEsri?.checked);

  carte.setLayoutProperty(COUCHE_LABELS_VILLES, "visibility", afficherLabels ? "visible" : "none");
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

  if (!ignAutomatiqueActif || !estFondBaseAutomatique(fondActif)) {
    appliquerOpaciteCouchesFondNatives(1, { dureeTransitionMs: 0 });
    masquerCoucheSatelliteIgnAuto();
    masquerCoucheSatelliteEsriAuto();
    mettreAJourLabelsVilles();
    appliquerStyleMesureSelonFond();
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

  if (modeAutoActif === FOND_ESRI_AUTOMATIQUE) {
    assurerCoucheSatelliteEsriAuto();
    if (!carte.getLayer(COUCHE_SATELLITE_ESRI_AUTO)) {
      planifierMiseAJourTransitionFondIgnAuto();
      return;
    }
    masquerCoucheSatelliteIgnAuto();
    carte.setPaintProperty(COUCHE_SATELLITE_ESRI_AUTO, "raster-opacity-transition", { duration: dureeTransition, delay: 0 });
    carte.setLayoutProperty(COUCHE_SATELLITE_ESRI_AUTO, "visibility", opacite > 0.001 ? "visible" : "none");
    carte.setPaintProperty(COUCHE_SATELLITE_ESRI_AUTO, "raster-opacity", opacite);
  } else {
    assurerCoucheSatelliteIgnAuto();
    if (!carte.getLayer(COUCHE_SATELLITE_IGN_AUTO)) {
      planifierMiseAJourTransitionFondIgnAuto();
      return;
    }
    masquerCoucheSatelliteEsriAuto();
    carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity-transition", { duration: dureeTransition, delay: 0 });
    carte.setLayoutProperty(COUCHE_SATELLITE_IGN_AUTO, "visibility", opacite > 0.001 ? "visible" : "none");
    carte.setPaintProperty(COUCHE_SATELLITE_IGN_AUTO, "raster-opacity", opacite);
  }

  mettreAJourLabelsVilles();
  appliquerStyleMesureSelonFond();
}

function appliquerFondIgnAutomatique() {
  if (!ignAutomatiqueActif) {
    mettreAJourTransitionFondIgnAuto();
    return;
  }

  const fondCible = determinerFondIgnAutomatique();
  if (fondCible === fondActif) {
    mettreAJourTransitionFondIgnAuto();
    mettreAJourSelection(modeAutoActif);
    return;
  }

  changerFondCarte(fondCible, { force: true });
  mettreAJourSelection(modeAutoActif);
}

function choisirFondManuel(nomFond) {
  ignAutomatiqueActif = false;
  mettreAJourTransitionFondIgnAuto();
  changerFondCarte(nomFond);
  mettreAJourSelection(nomFond);
}

function activerSwitchVilleSatellite(typeSatellite) {
  if (typeSatellite === "ign") {
    if (caseLabelsIgn) {
      caseLabelsIgn.checked = true;
    }
    if (caseLabelsEsri) {
      caseLabelsEsri.checked = false;
    }
    choisirFondManuel("satelliteIgn");
    return;
  }

  if (typeSatellite === "esri") {
    if (caseLabelsEsri) {
      caseLabelsEsri.checked = true;
    }
    if (caseLabelsIgn) {
      caseLabelsIgn.checked = false;
    }
    choisirFondManuel("satelliteEsri");
  }
}

function activerFondAutomatique(modeFond) {
  ignAutomatiqueActif = true;
  modeAutoActif = modeFond;
  mettreAJourSelection(modeFond);
  appliquerFondIgnAutomatique();
}

function gererStyleCharge() {
  viderMarqueursPk();
  fermerPopupPnInfo();
  memoriserCouchesFondNatives();
  restaurerEtatFiltres();
  restaurerAffichageDonnees();
  rafraichirAffichageMesure();
  mettreAJourTransitionFondIgnAuto();
  mettreAJourLabelsVilles();
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
  if (
    !(
      afficherAppareils ||
      afficherAcces ||
      afficherPostes ||
      afficherPk ||
      afficherPn ||
      afficherLignesOsm ||
      afficherLignesOrmPng ||
      afficherLignesOrmVectorielles
    )
  ) {
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
    mettreAJourLabelsVilles();
  });
});

activerInteractionsCarte();
mettreAJourLibellesFondsAutomatiques();

const gererChangementThemeSysteme = () => {
  mettreAJourLibellesFondsAutomatiques();
  if (!ignAutomatiqueActif) {
    return;
  }
  appliquerFondIgnAutomatique();
};

if (mediaQueryModeSombre) {
  if (typeof mediaQueryModeSombre.addEventListener === "function") {
    mediaQueryModeSombre.addEventListener("change", gererChangementThemeSysteme);
  } else if (typeof mediaQueryModeSombre.addListener === "function") {
    mediaQueryModeSombre.addListener(gererChangementThemeSysteme);
  }
}

for (const option of optionsFond) {
  option.addEventListener("change", () => {
    if (!option.checked) {
      return;
    }

    if (option.value === FOND_IGN_AUTOMATIQUE || option.value === FOND_ESRI_AUTOMATIQUE) {
      activerFondAutomatique(option.value);
      fermerMenuFonds();
      return;
    }

    choisirFondManuel(option.value);
    fermerMenuFonds();
  });
}

caseLabelsIgn?.addEventListener("change", () => {
  if (caseLabelsIgn.checked) {
    activerSwitchVilleSatellite("ign");
    mettreAJourLabelsVilles();
    return;
  }
  mettreAJourLabelsVilles();
});

caseLabelsEsri?.addEventListener("change", () => {
  if (caseLabelsEsri.checked) {
    activerSwitchVilleSatellite("esri");
    mettreAJourLabelsVilles();
    return;
  }
  mettreAJourLabelsVilles();
});

carte.on("zoomend", () => {
  appliquerFondIgnAutomatique();
  planifierMiseAJourPk();
  if (afficherLignesOsm && carte.isStyleLoaded()) {
    appliquerCouchesDonnees();
    remonterCouchesDonnees();
  }
});
carte.on("zoom", planifierMiseAJourTransitionFondIgnAuto);
carte.on("zoomstart", () => {
  fermerPopupPkInfo();
  fermerPopupPnInfo();
  fermerPopupLigneOsmInfo();
  if (!popupSurvolInfoEstVerrouillee()) {
    fermerPopupSurvolInfo();
  }
});
carte.on("movestart", () => {
  fermerPopupPkInfo();
  fermerPopupPnInfo();
  fermerPopupLigneOsmInfo();
  if (!popupSurvolInfoEstVerrouillee()) {
    fermerPopupSurvolInfo();
  }
});
carte.on("moveend", planifierMiseAJourPk);
carte.on("moveend", planifierMiseAJourTransitionFondIgnAuto);
appliquerFondIgnAutomatique();

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
      afficherMessageChargementCouche("Chargement des PN en cours...");
      try {
        await chargerDonneesPn();
      } catch (erreur) {
        afficherPn = false;
        casePn.checked = false;
        console.error("Impossible de charger pn_osm.geojson", erreur);
        alert("Chargement des PN impossible. Vérifie la présence du fichier pn_osm.geojson.");
        masquerMessageChargementCouche();
      } finally {
        casePn.disabled = false;
      }
    } else {
      masquerMessageChargementCouche();
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    planifierMiseAJourPk();
    if (afficherPn) {
      masquerMessageChargementApresRenduCarte();
    }
  });
}

if (caseLignesOsm) {
  caseLignesOsm.addEventListener("change", async () => {
    afficherLignesOsm = caseLignesOsm.checked;
    if (afficherLignesOsm) {
      await activerLigneFerroviaire();
    } else {
      masquerMessageChargementCouche();
      appliquerCouchesDonnees();
      remonterCouchesDonnees();
    }
  });
}

if (caseLignesOrmPng) {
  caseLignesOrmPng.addEventListener("change", () => {
    afficherLignesOrmPng = caseLignesOrmPng.checked;
    if (afficherLignesOrmPng) {
      afficherLignesOsm = false;
      afficherLignesOrmVectorielles = false;
      if (caseLignesOsm) {
        caseLignesOsm.checked = false;
      }
      if (caseLignesOrmVectorielles) {
        caseLignesOrmVectorielles.checked = false;
      }
      masquerMessageChargementCouche();
      fermerPopupLigneOsmInfo();
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    forcerRafraichissementCarte({ tentativesDifferees: true });
  });
}

if (caseLignesOrmVectorielles) {
  caseLignesOrmVectorielles.addEventListener("change", () => {
    afficherLignesOrmVectorielles = caseLignesOrmVectorielles.checked;
    if (afficherLignesOrmVectorielles) {
      afficherLignesOsm = false;
      afficherLignesOrmPng = false;
      if (caseLignesOsm) {
        caseLignesOsm.checked = false;
      }
      if (caseLignesOrmPng) {
        caseLignesOrmPng.checked = false;
      }
      masquerMessageChargementCouche();
    }

    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    forcerRafraichissementCarte({ tentativesDifferees: true });
  });
}

async function initialiserDonneesParDefaut() {
  await chargerCompteurPostes();

  if (!afficherAppareils && !afficherAcces && !afficherPostes) {
    appliquerCouchesDonnees();
    remonterCouchesDonnees();
    planifierPrechargementPkApresDemarrage();
    return;
  }

  const chargementsDemarrage = [];

  if (afficherAppareils) {
    if (caseAppareils) {
      caseAppareils.disabled = true;
    }
    chargementsDemarrage.push(
      chargerDonneesAppareils().catch((erreur) => {
        afficherAppareils = false;
        if (caseAppareils) {
          caseAppareils.checked = false;
        }
        console.error("Impossible de charger appareils.geojson", erreur);
      })
    );
  }

  if (afficherAcces) {
    if (caseAcces) {
      caseAcces.disabled = true;
    }
    chargementsDemarrage.push(
      chargerDonneesAcces().catch((erreur) => {
        afficherAcces = false;
        if (caseAcces) {
          caseAcces.checked = false;
        }
        console.error("Impossible de charger acces.geojson", erreur);
      })
    );
  }

  if (afficherPostes) {
    if (casePostes) {
      casePostes.disabled = true;
    }
    chargementsDemarrage.push(
      chargerDonneesPostes().catch((erreur) => {
        afficherPostes = false;
        if (casePostes) {
          casePostes.checked = false;
        }
        console.error("Impossible de charger postes.geojson", erreur);
      })
    );
  }

  if (chargementsDemarrage.length) {
    await Promise.all(chargementsDemarrage);
  }

  if (caseAppareils) {
    caseAppareils.disabled = false;
  }
  if (caseAcces) {
    caseAcces.disabled = false;
  }
  if (casePostes) {
    casePostes.disabled = false;
  }

  appliquerCouchesDonnees();
  remonterCouchesDonnees();
  planifierActivationAutoLigneFerroviaire();
  planifierPrechargementPkApresDemarrage();
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

async function assurerDonneesCarteApresRetour() {
  if (!carte.isStyleLoaded()) {
    return false;
  }

  try {
    if (afficherAppareils && !donneesAppareils) {
      await chargerDonneesAppareils();
    }
    if (afficherAcces && !donneesAcces) {
      await chargerDonneesAcces();
    }
    if (afficherPostes && !donneesPostes) {
      await chargerDonneesPostes();
    }
    if (afficherPk && !donneesPk) {
      await chargerDonneesPk();
    }
    if (afficherPn && !donneesPn) {
      await chargerDonneesPn();
    }
  } catch (erreur) {
    console.error("Impossible de restaurer les donnees de la carte apres retour", erreur);
  }

  restaurerEtatFiltres();
  restaurerAffichageDonnees();
  remonterCouchesDonnees();
  forcerRafraichissementCarte({ tentativesDifferees: true });
  return true;
}

function planifierAssuranceDonneesCarteApresRetour() {
  const tentativesMax = 18;
  let tentative = 0;

  const essayer = async () => {
    tentative += 1;

    if (!initialisationDonneesLancee) {
      initialisationDonneesLancee = true;
      try {
        await initialiserDonneesParDefaut();
      } catch (erreur) {
        console.error("Impossible d'initialiser les donnees immediatement", erreur);
      }
    }

    const termine = await assurerDonneesCarteApresRetour();
    if (termine) {
      return;
    }

    if (tentative < tentativesMax) {
      window.setTimeout(essayer, tentative < 6 ? 90 : 180);
    }
  };

  essayer();
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

if (boutonSuiviCarte) {
  boutonSuiviCarte.addEventListener("click", async (event) => {
    event.stopPropagation();
    await basculerSuiviLocalisationUtilisateur();
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
        paletteLignesOsm: PALETTE_LIGNES_FERROVIAIRES,
        paletteAppareils: PALETTE_APPAREILS,
        extraireListeDepuisFeature,
        chargerDonneesPostes,
        chargerDonneesAppareils,
        chargerDonneesAcces,
        chargerDonneesPn,
        chargerDonneesPk,
        chargerDonneesLignesOsm,
        getDonneesPostes: () => donneesPostes,
        getDonneesAppareils: () => donneesAppareils,
        getDonneesAcces: () => donneesAcces,
        getDonneesPn: () => donneesPn,
        getDonneesPk: () => donneesPk,
        getDonneesLignesOsm: () => donneesLignesOsm,
        activerFiltrePourType,
        appliquerCouchesDonnees,
        remonterCouchesDonnees,
        ouvrirPopupDepuisResultatRecherche,
        ouvrirPkDepuisRecherche,
        ouvrirLigneDepuisRecherche,
        rechercherAdresses: rechercherAdressesAutocomplete,
        ouvrirAdresseDepuisRecherche,
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
    await copierTexteDansPressePapier(texteCoordonnees, "Coordonnées copiées dans le presse-papiers.");
    fermerMenuContextuel();
  });
}

if (boutonCtxAdresse) {
  boutonCtxAdresse.addEventListener("click", async () => {
    if (!adresseMenuContextuel) {
      return;
    }
    await copierTexteDansPressePapier(adresseMenuContextuel, "Adresse copiée dans le presse-papiers.");
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
    const ficheArmenOuverte = await ouvrirFicheDepuisParametreArmen();
    if (!ficheArmenOuverte) {
      await ouvrirPositionPartageeDepuisParametres();
      await ouvrirFicheDepuisParametreId();
    }
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
