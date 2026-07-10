(function () {
  function creerMoteurRecherchePrincipal(config) {
    const normaliserTexteRecherche = config?.normaliserTexteRecherche;
    const obtenirPrioriteTypeRecherche = config?.obtenirPrioriteTypeRecherche;

    if (typeof normaliserTexteRecherche !== "function") {
      throw new Error("normaliserTexteRecherche est requis pour creerMoteurRecherchePrincipal.");
    }

    const prioriteParDefaut = (type) => {
      if (type === "acces") return 0;
      if (type === "postes") return 1;
      if (type === "appareils") return 2;
      return 3;
    };

    const estPnNonRenseigne = (entree) =>
      entree?.type === "pn" && normaliserTexteRecherche(String(entree?.titre || "")) === "pn non renseigne";

    const construireCandidatsCodeLigneReferentiel = (numeroLigne) => {
      const code = String(numeroLigne ?? "").trim().toUpperCase();
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
    };

    const obtenirNomLigneDepuisReferentiel = (numeroLigne) => {
      const referentiel = window.REFERENTIEL_LIGNES || globalThis.REFERENTIEL_LIGNES || {};
      for (const code of construireCandidatsCodeLigneReferentiel(numeroLigne)) {
        const nom = String(referentiel[code] || "").trim();
        if (nom) {
          return nom;
        }
      }
      const code = String(numeroLigne ?? "").trim().toUpperCase();
      return code ? `Nom absent du référentiel (${code})` : "Code ligne absent";
    };

    const scoreExactPn = (entree, termeNormalise) => {
      if (entree?.type !== "pn" || !termeNormalise) {
        return 0;
      }
      const termeCompact = termeNormalise.replace(/\s+/g, "");
      const titreCompact = normaliserTexteRecherche(String(entree?.titre || "")).replace(/\s+/g, "");
      const refPn = normaliserTexteRecherche(String(entree?.refPn || entree?.ref || "")).replace(/\s+/g, "");
      if (!termeCompact) {
        return 0;
      }
      if (titreCompact === termeCompact) {
        return 3;
      }
      if (termeCompact.startsWith("pn") && refPn && `pn${refPn}` === termeCompact) {
        return 2;
      }
      if (refPn && refPn === termeCompact) {
        return 1;
      }
      return 0;
    };

    const comparerCodeLignePn = (a, b) => {
      const codeA = String(a?.codeLigne || a?.code_ligne || "").trim();
      const codeB = String(b?.codeLigne || b?.code_ligne || "").trim();
      const numeroA = Number.parseInt(codeA, 10);
      const numeroB = Number.parseInt(codeB, 10);
      const aEstNombre = Number.isFinite(numeroA);
      const bEstNombre = Number.isFinite(numeroB);

      if (aEstNombre && bEstNombre && numeroA !== numeroB) {
        return numeroA - numeroB;
      }
      if (aEstNombre !== bEstNombre) {
        return aEstNombre ? -1 : 1;
      }
      return codeA.localeCompare(codeB, "fr", { sensitivity: "base" });
    };

    return {
      rechercher(indexRecherche, terme, options = {}) {
        const minLength = Number.isFinite(options.minLength) ? options.minLength : 2;
        const limit = Number.isFinite(options.limit) ? options.limit : 24;
        const termeNormalise = normaliserTexteRecherche(terme);
        const tokens = termeNormalise.split(/\s+/).filter(Boolean);

        if (!termeNormalise || termeNormalise.length < minLength || !tokens.length) {
          return [];
        }

        const resultats = [];
        for (const entree of indexRecherche || []) {
          if (!entree?.texteRecherche) {
            continue;
          }
          const textePrincipal = normaliserTexteRecherche(
            [entree?.titre, entree?.nom, entree?.typeLieu, entree?.sat]
              .filter(Boolean)
              .join(" ")
          );
          const contientTousLesTokens = tokens.every((token) => {
            const estTokenSat = /^sat\d*$/i.test(token);
            const estTokenCodeAppareil = /\d/.test(token);
            if (estTokenSat) {
              return entree.texteRecherche.includes(token);
            }
            if (estTokenCodeAppareil) {
              return entree.texteRecherche.includes(token);
            }
            return textePrincipal.includes(token);
          });
          if (!contientTousLesTokens) {
            continue;
          }
          const titreNormalise = normaliserTexteRecherche(entree.titre);
          const matchDebut = entree.texteRecherche.startsWith(termeNormalise) || titreNormalise.startsWith(termeNormalise) ? 1 : 0;
          resultats.push({
            ...entree,
            matchDebut,
            scoreExactPn: scoreExactPn(entree, termeNormalise)
          });
        }

        const prioriteFn = typeof obtenirPrioriteTypeRecherche === "function" ? obtenirPrioriteTypeRecherche : prioriteParDefaut;
        resultats.sort((a, b) => {
          if ((b.scoreExactPn || 0) !== (a.scoreExactPn || 0)) {
            return (b.scoreExactPn || 0) - (a.scoreExactPn || 0);
          }
          if (b.matchDebut !== a.matchDebut) {
            return b.matchDebut - a.matchDebut;
          }
          const prioriteA = prioriteFn(a.type);
          const prioriteB = prioriteFn(b.type);
          if (prioriteA !== prioriteB) {
            return prioriteA - prioriteB;
          }
          const aPnNonRenseigne = estPnNonRenseigne(a) ? 1 : 0;
          const bPnNonRenseigne = estPnNonRenseigne(b) ? 1 : 0;
          if (aPnNonRenseigne !== bPnNonRenseigne) {
            return aPnNonRenseigne - bPnNonRenseigne;
          }
          if (a?.type === "pn" && b?.type === "pn") {
            const comparaisonCodeLigne = comparerCodeLignePn(a, b);
            if (comparaisonCodeLigne !== 0) {
              return comparaisonCodeLigne;
            }
          }
          return String(a.titre || "").localeCompare(String(b.titre || ""), "fr", { sensitivity: "base" });
        });

        return resultats.slice(0, Math.max(0, limit));
      }
    };
  }

  function creerModuleRechercheAlice(config) {
    const {
      controleRecherche,
      champRecherche,
      listeResultatsRecherche,
      normaliserTexteRecherche,
      echapperHtml,
      normaliserCouleurHex,
      champCompletOuVide,
      separateurLibelle,
      construireTitrePoste,
      construireDetailsPoste,
      construireTitreNomTypeSatAcces,
      determinerCouleurAppareil,
      paletteCarte,
      paletteLignesOsm,
      paletteAppareils,
      extraireListeDepuisFeature,
      chargerDonneesPostes,
      chargerDonneesAppareils,
      chargerDonneesAcces,
      chargerDonneesPn,
      chargerDonneesPk,
      chargerDonneesLignesOsm,
      getDonneesPostes,
      getDonneesAppareils,
      getDonneesAcces,
      getDonneesPn,
      getDonneesPk,
      getDonneesLignesOsm,
      activerFiltrePourType,
      appliquerCouchesDonnees,
      remonterCouchesDonnees,
      ouvrirPopupDepuisResultatRecherche,
      ouvrirPkDepuisRecherche,
      ouvrirLigneDepuisRecherche,
      rechercherAdresses,
      ouvrirAdresseDepuisRecherche,
      fermerMenuFiltres,
      fermerMenuFonds,
      definirConservationFichePendantNavigation
    } = config || {};

    const CLE_STOCKAGE_RECHERCHE_RECENTE = "alice.recherche.recente.v1";
    const LIMITE_RECHERCHE_RECENTE = 5;
    let indexRecherche = [];
    let promesseChargementRecherche = null;
    let dernierTexteRecherche = "";
    let derniersResultatsRecherche = [];
    let filtreTypeActif = "tous";
    let filtreChoisiManuellement = false;
    let sousFiltreAppareilsActif = "";
    let indexResultatActifClavier = -1;

    const obtenirPrioriteTypeRecherche = (type) => {
      if (type === "ligne") return 0;
      if (type === "pn") return 0;
      if (type === "pk") return 0;
      if (type === "acces") return 0;
      if (type === "postes") return 1;
      if (type === "appareils") return 2;
      return 3;
    };

    const moteurRecherchePrincipal = creerMoteurRecherchePrincipal({
      normaliserTexteRecherche,
      obtenirPrioriteTypeRecherche,
      paletteCarte,
      paletteLignesOsm
    });
    const PREFIXES_INTER = ["SI", "I"];
    const PREFIXES_DISJ = ["D"];
    const PREFIXES_URGENCE = ["DU"];
    const CODES_TRANSFO_EXACTS = new Set(["B1", "B2", "B3"]);
    const PREFIXES_TRANSFO = ["TT", "TSA", "TC", "GT", "TRA", "B1", "B2", "B3"];
    const PREFIXES_SECTIONNEUR = ["ST", "S", "FB", "F", "P", "B"];
    const PREFIXES_ALIM = ["ALIM"];
    const MOTS_VIDES = new Set(["de", "du", "des", "d", "la", "le", "les", "a", "à", "au", "aux", "en", "sur", "et", "l"]);
    const CORRECTIONS_RECHERCHE = new Map([
      ["interupteur", "interrupteur"],
      ["interupteurs", "interrupteurs"],
      ["tranfo", "transfo"],
      ["tranfos", "transfos"],
      ["aces", "acces"],
      ["accee", "acces"],
      ["accesroutier", "acces"],
      ["horspatrimoine", "hp"],
      ["disj", "disjoncteur"],
      ["dj", "disjoncteur"]
    ]);
    const ALIAS_RECHERCHE = new Map([
      ["transfo", ["tt", "tsa", "tc", "gt", "tra", "b1", "b2", "b3"]],
      ["transfos", ["tt", "tsa", "tc", "gt", "tra", "b1", "b2", "b3"]],
      ["transformateur", ["tt", "tsa", "tc", "gt", "tra", "b1", "b2", "b3"]],
      ["transformateurs", ["tt", "tsa", "tc", "gt", "tra", "b1", "b2", "b3"]],
      ["inter", ["interrupteur"]],
      ["interrupteur", ["i", "ia", "il", "imp", "ip", "is", "si", "sia", "sis"]],
      ["interrupteurs", ["i", "ia", "il", "imp", "ip", "is", "si", "sia", "sis"]],
      ["disjoncteur", ["d"]],
      ["disjoncteurs", ["d"]],
      ["sectionneur", ["st", "f", "fb", "fs", "p", "s", "sat", "sb", "sm", "srb", "sda", "splt", "sp", "b", "t"]],
      ["sectionneurs", ["st", "f", "fb", "fs", "p", "s", "sat", "sb", "sm", "srb", "sda", "splt", "sp", "b", "t"]],
      ["herse", ["sp", "st"]],
      ["alim", ["alimentation"]],
      ["hp", ["hors", "patrimoine"]]
    ]);
    const COULEUR_PASTILLE_POSTE = normaliserCouleurHex(paletteCarte?.poste || "#60a5fa");
    const COULEUR_PASTILLE_ACCES = normaliserCouleurHex(paletteCarte?.accesGroupe || "#8b5cf6");
    const COULEUR_PASTILLE_PN = normaliserCouleurHex(paletteCarte?.pn || "#06b6d4");
    const COULEUR_PASTILLE_PK = normaliserCouleurHex(paletteCarte?.pk || "#0f766e");
    const COULEUR_PASTILLE_LIGNE = normaliserCouleurHex(paletteLignesOsm?.main || "#f59e0b");
    const COULEUR_PASTILLE_APPAREIL = normaliserCouleurHex(paletteAppareils?.autre || "#111111");
    const FILTRES_PRINCIPAUX_RECHERCHE = ["tous", "acces", "postes", "appareils"];
    const CLASSES_COULEUR_APPAREIL_PAR_HEX = new Map([
      [normaliserCouleurHex(paletteAppareils?.urgence || "#d90429"), "pastille-app-du"],
      [normaliserCouleurHex(paletteAppareils?.interrupteur || "#f77f00"), "pastille-app-si"],
      [normaliserCouleurHex(paletteAppareils?.transfo || "#ffd60a"), "pastille-app-tt"],
      [normaliserCouleurHex(paletteAppareils?.sectionneur || "#2a9d8f"), "pastille-app-t"],
      [normaliserCouleurHex(paletteAppareils?.alim || "#8d99ae"), "pastille-app-alim"],
      [normaliserCouleurHex(paletteAppareils?.autre || "#111111"), "pastille-app-autre"]
    ]);

    function estPnNonRenseigne(entree) {
      return entree?.type === "pn" && normaliserTexteRecherche(String(entree?.titre || "")) === "pn non renseigne";
    }

    function scoreExactPn(entree, termeNormalise) {
      if (entree?.type !== "pn" || !termeNormalise) {
        return 0;
      }
      const termeCompact = termeNormalise.replace(/\s+/g, "");
      const titreCompact = normaliserTexteRecherche(String(entree?.titre || "")).replace(/\s+/g, "");
      const refPn = normaliserTexteRecherche(String(entree?.refPn || entree?.ref || "")).replace(/\s+/g, "");
      if (!termeCompact) {
        return 0;
      }
      if (titreCompact === termeCompact) {
        return 3;
      }
      if (termeCompact.startsWith("pn") && refPn && `pn${refPn}` === termeCompact) {
        return 2;
      }
      if (refPn && refPn === termeCompact) {
        return 1;
      }
      return 0;
    }

    function comparerCodeLignePn(a, b) {
      const codeA = String(a?.codeLigne || a?.code_ligne || "").trim();
      const codeB = String(b?.codeLigne || b?.code_ligne || "").trim();
      const numeroA = Number.parseInt(codeA, 10);
      const numeroB = Number.parseInt(codeB, 10);
      const aEstNombre = Number.isFinite(numeroA);
      const bEstNombre = Number.isFinite(numeroB);

      if (aEstNombre && bEstNombre && numeroA !== numeroB) {
        return numeroA - numeroB;
      }
      if (aEstNombre !== bEstNombre) {
        return aEstNombre ? -1 : 1;
      }
      return codeA.localeCompare(codeB, "fr", { sensitivity: "base" });
    }

    function determinerClassePastilleAppareil(couleur) {
      const couleurNormalisee = normaliserCouleurHex(couleur || COULEUR_PASTILLE_APPAREIL);
      return CLASSES_COULEUR_APPAREIL_PAR_HEX.get(couleurNormalisee) || "pastille-app-autre";
    }

    function fermerResultatsRecherche() {
      controleRecherche?.classList.remove("est-ouvert");
    }

    function ouvrirResultatsRecherche() {
      controleRecherche?.classList.add("est-ouvert");
    }

    function viderResultatsRecherche() {
      if (listeResultatsRecherche) {
        listeResultatsRecherche.innerHTML = "";
      }
    }

    function listerBoutonsResultatsNavigables() {
      return Array.from(listeResultatsRecherche?.querySelectorAll('button[data-action="ouvrir-resultat"], button[data-action="ouvrir-ligne"]') || []);
    }

    function appliquerSelectionClavierResultats(indexActif) {
      const boutons = listerBoutonsResultatsNavigables();
      boutons.forEach((bouton, index) => {
        const estActif = index === indexActif;
        bouton.classList.toggle("est-actif-clavier", estActif);
        if (estActif) {
          bouton.scrollIntoView({ block: "nearest" });
        }
      });
    }

    function reinitialiserSelectionClavierResultats() {
      indexResultatActifClavier = -1;
      appliquerSelectionClavierResultats(-1);
    }

    function estRechercheMobile() {
      try {
        return window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;
      } catch {
        return window.innerWidth <= 820;
      }
    }

    function obtenirFiltreTypeParDefaut() {
      return estRechercheMobile() ? "acces" : "tous";
    }

    function faireTournerFiltrePrincipalRecherche() {
      const ordre = FILTRES_PRINCIPAUX_RECHERCHE;
      const indexActuel = ordre.indexOf(filtreTypeActif);
      const prochainIndex = indexActuel >= 0 ? (indexActuel + 1) % ordre.length : 0;
      filtreTypeActif = ordre[prochainIndex];
      filtreChoisiManuellement = true;
      sousFiltreAppareilsActif = "";
      afficherResultatsRecherche(derniersResultatsRecherche, { texte: dernierTexteRecherche });
    }

    function lireRecherchesRecentes() {
      try {
        const brut = localStorage.getItem(CLE_STOCKAGE_RECHERCHE_RECENTE);
        const donnees = JSON.parse(brut || "[]");
        return Array.isArray(donnees) ? donnees : [];
      } catch {
        return [];
      }
    }

    function viderRecherchesRecentes() {
      try {
        localStorage.removeItem(CLE_STOCKAGE_RECHERCHE_RECENTE);
      } catch {
        // Ignore les erreurs de stockage.
      }
    }

    function enregistrerRechercheRecente(resultat) {
      if (!resultat || !["postes", "appareils", "acces"].includes(resultat.type)) {
        return;
      }
      const entree = {
        type: resultat.type,
        titre: String(resultat.titre || ""),
        sousTitre: String(resultat.sousTitre || ""),
        longitude: Number(resultat.longitude),
        latitude: Number(resultat.latitude),
        appareilsLignesUniques: Array.isArray(resultat.appareilsLignesUniques)
          ? resultat.appareilsLignesUniques.slice(0, 6).map((ligne) => ({
              code: String(ligne?.code || ""),
              contexte: String(ligne?.contexte || ""),
              couleur: String(ligne?.couleur || ""),
              horsPatrimoine: Boolean(ligne?.horsPatrimoine)
            }))
          : [],
        appareilsCount: Number(resultat.appareilsCount) || 0
      };
      if (!Number.isFinite(entree.longitude) || !Number.isFinite(entree.latitude) || !entree.titre) {
        return;
      }

      const cleEntree = `${entree.type}|${entree.titre}|${entree.longitude.toFixed(6)}|${entree.latitude.toFixed(6)}`;
      const existantes = lireRecherchesRecentes();
      const misesAJour = [
        entree,
        ...existantes.filter((item) => {
          const cleItem = `${item?.type || ""}|${item?.titre || ""}|${Number(item?.longitude || 0).toFixed(6)}|${Number(item?.latitude || 0).toFixed(6)}`;
          return cleItem !== cleEntree;
        })
      ].slice(0, LIMITE_RECHERCHE_RECENTE);

      try {
        localStorage.setItem(CLE_STOCKAGE_RECHERCHE_RECENTE, JSON.stringify(misesAJour));
      } catch {
        // Ignore les erreurs de stockage.
      }
    }

    function afficherRecherchesRecentes() {
      if (!listeResultatsRecherche) {
        return;
      }
      const recentes = lireRecherchesRecentes().filter((item) => ["postes", "appareils", "acces"].includes(item?.type));
      if (!recentes.length) {
        viderResultatsRecherche();
        fermerResultatsRecherche();
        return;
      }

      const contenu = recentes.map(construireBoutonResultatGeographique).join("");
      listeResultatsRecherche.innerHTML =
        `<li class="recherche-recents-entete"><div class="recherche-recents-entete-ligne"><span class="recherche-recents-titre">Récents</span><button class="recherche-recents-vider" type="button" data-action="vider-recents">Vider</button></div><div class="recherche-recents-aide">Vos 5 derniers postes, appareils ou accès ouverts depuis la recherche.</div></li>${contenu}`;
      reinitialiserSelectionClavierResultats();
      ouvrirResultatsRecherche();
    }

    function construireResumeRecherche(entree) {
      if (entree.type === "pn") {
        return "Passage à niveau";
      }
      if (entree.type === "pk") {
        return "Point kilométrique";
      }
      if (entree.type === "ligne") {
        const nbPostes = Number(entree.postesLigneCount) || 0;
        if (nbPostes > 1) return `${nbPostes} postes`;
        if (nbPostes === 1) return "1 poste";
        return "Ligne";
      }
      if (entree.type === "adresse") {
        return "Adresse";
      }
      if (entree.type === "postes") {
        if (entree.special === true) {
          return "";
        }
        return estResultatPosteSatellite(entree) ? "Satellite" : "Poste";
      }
      if (entree.type === "appareils") {
        if (Number(entree.appareilsCount) > 1) {
          return `${entree.appareilsCount} appareils`;
        }
        return "Appareil";
      }
      return "Acces voiture";
    }

    function estResultatPosteSatellite(resultat) {
      return resultat?.type === "postes" && Boolean(champCompletOuVide(resultat?.sat));
    }

    function estResultatPosteSpecial(resultat) {
      return resultat?.type === "postes" && resultat?.special === true;
    }

    function estResultatPostePrincipal(resultat) {
      return resultat?.type === "postes" && !estResultatPosteSatellite(resultat) && !estResultatPosteSpecial(resultat);
    }

    function libelleAvecNombre(count, singulier, pluriel = `${singulier}s`) {
      return Number(count) <= 1 ? singulier : pluriel;
    }

    function formatLibelleFiltre(count, singulier, pluriel) {
      return `${libelleAvecNombre(count, singulier, pluriel)} (${count})`;
    }

    function compterCategoriesPostes(resultats) {
      const postes = (resultats || []).filter((resultat) => resultat?.type === "postes");
      return {
        postes: postes.filter(estResultatPostePrincipal).length,
        satellites: postes.filter(estResultatPosteSatellite).length,
        autres: postes.filter(estResultatPosteSpecial).length,
        total: postes.length
      };
    }

    function construireLibellePostesCompose(categories) {
      const segments = [];
      if (categories.postes > 0) {
        segments.push(libelleAvecNombre(categories.postes, "Poste", "Postes"));
      }
      if (categories.satellites > 0) {
        segments.push("SAT");
      }
      if (categories.autres > 0) {
        segments.push(libelleAvecNombre(categories.autres, "autre", "autres"));
      }
      if (!segments.length) {
        return libelleAvecNombre(categories.total, "Poste", "Postes");
      }
      if (segments.length === 1 && categories.autres > 0 && categories.postes === 0 && categories.satellites === 0) {
        return libelleAvecNombre(categories.autres, "Autre", "Autres");
      }
      return segments.join(" & ");
    }

    function reconstruireIndexRecherche() {
      const index = [];
      const postesParCodeLigne = new Map();

      for (const feature of getDonneesPn?.()?.features || []) {
        const [longitude, latitude] = feature.geometry?.coordinates || [];
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }

        const props = feature?.properties || {};
        const titre = String(
          props.pn_numero || (typeof construireLibellePn === "function" ? construireLibellePn(props) : "")
        ).trim() || "PN non renseigné";
        const titreCompact = titre.replace(/\s+/g, "");
        const refPn = String(props.ref || "").trim();
        const codeLigne = String(props.code_ligne || "").trim();
        const nomLigne = obtenirNomLigneDepuisReferentiel(codeLigne);
        const sousTitre = [codeLigne ? `Ligne n°${codeLigne}` : "", nomLigne || ""]
          .filter(Boolean)
          .join(" ");

        index.push({
          type: "pn",
          titre,
          sousTitre,
          refPn,
          codeLigne,
          nom: "",
          typeLieu: "Passage à niveau",
          sat: "",
          longitude,
          latitude,
          couleurPastille: COULEUR_PASTILLE_PN,
          texteRecherche: normaliserTexteRecherche([titre, titreCompact, refPn, `pn${refPn}`, codeLigne, nomLigne].filter(Boolean).join(" "))
        });
      }

      for (const feature of getDonneesPostes?.()?.features || []) {
        const [longitude, latitude] = feature.geometry?.coordinates || [];
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }

        const postesListe = extraireListeDepuisFeature(feature, "postes_liste_json");
        for (const poste of postesListe) {
          const titre = construireTitrePoste(poste) || "Poste";
          const details = construireDetailsPoste(poste);
          const numeroLigne = String(poste?.numero_ligne ?? "").trim();
          const nomLignePoste = obtenirNomLigneDepuisReferentiel(numeroLigne);
          const motsCles = [titre, details, poste.nom, poste.SAT, poste.acces, poste.rss, poste.pk, poste.contact, numeroLigne, nomLignePoste]
            .filter(Boolean)
            .join(" ");
          const nom = champCompletOuVide(poste?.nom);
          const type = champCompletOuVide(poste?.type);
          const sat = champCompletOuVide(poste?.SAT);

          index.push({
            type: "postes",
            titre,
            sousTitre: "",
            nom,
            typeLieu: type,
            sat,
            special: poste?.special === true,
            codeLigne: numeroLigne,
            nomLigne: nomLignePoste,
            longitude,
            latitude,
            couleurPastille: COULEUR_PASTILLE_POSTE,
            texteRecherche: normaliserTexteRecherche(motsCles)
          });
          if (numeroLigne) {
            if (!postesParCodeLigne.has(numeroLigne)) {
              postesParCodeLigne.set(numeroLigne, []);
            }
            postesParCodeLigne.get(numeroLigne).push({
              type: "postes",
              titre,
              sousTitre: "",
              nom,
              typeLieu: type,
              sat,
              special: poste?.special === true,
              codeLigne: numeroLigne,
              nomLigne: nomLignePoste,
              longitude,
              latitude,
              couleurPastille: COULEUR_PASTILLE_POSTE
            });
          }
        }
      }

      const lignesParCode = new Map();
      for (const feature of getDonneesLignesOsm?.()?.features || []) {
        const props = feature?.properties || {};
        const codeLigne = String(props.line_ref || "").trim();
        if (!/^\d{6}$/.test(codeLigne)) {
          continue;
        }
        if (!lignesParCode.has(codeLigne)) {
          lignesParCode.set(codeLigne, {
            codeLigne,
            nomLigne: obtenirNomLigneDepuisReferentiel(codeLigne),
            voies: new Set(),
            texteMotsCles: []
          });
        }
        const ligne = lignesParCode.get(codeLigne);
        if (props.track_ref) {
          ligne.voies.add(String(props.track_ref).trim());
        }
        ligne.texteMotsCles.push(ligne.nomLigne, props.maxspeed, props.track_ref, props.alice_category);
      }

      for (const ligne of lignesParCode.values()) {
        const postesLigne = (postesParCodeLigne.get(ligne.codeLigne) || [])
          .sort((a, b) => String(a.titre || "").localeCompare(String(b.titre || ""), "fr", { sensitivity: "base" }));
        const titre = `Ligne ${ligne.codeLigne}`;
        index.push({
          type: "ligne",
          titre,
          sousTitre: ligne.nomLigne,
          codeLigne: ligne.codeLigne,
          nom: ligne.nomLigne,
          typeLieu: "Ligne ferroviaire",
          sat: "",
          couleurPastille: COULEUR_PASTILLE_LIGNE,
          postesLigne,
          postesLigneCount: postesLigne.length,
          voiesLigneCount: ligne.voies.size,
          texteRecherche: normaliserTexteRecherche([titre, ligne.codeLigne, ligne.nomLigne, ...ligne.texteMotsCles].filter(Boolean).join(" "))
        });
      }

      for (const feature of getDonneesAppareils?.()?.features || []) {
        const [longitude, latitude] = feature.geometry?.coordinates || [];
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }

        const appareilsListe = extraireListeDepuisFeature(feature, "appareils_liste_json");
        const groupesParTitre = new Map();

        for (const appareil of appareilsListe) {
          const titre = construireTitreNomTypeSatAcces(appareil) || "Appareil";
          const appareilNom = champCompletOuVide(appareil.appareil) || "";
          const motsCles = [titre, appareilNom, appareil.nom, appareil.SAT, appareil.acces]
            .filter(Boolean)
            .join(" ");
          const cle = `${titre}|${longitude}|${latitude}`;

          if (!groupesParTitre.has(cle)) {
            const nom = champCompletOuVide(appareil?.nom);
            const type = champCompletOuVide(appareil?.type);
            const sat = champCompletOuVide(appareil?.SAT);
            groupesParTitre.set(cle, {
              type: "appareils",
              titre,
              sousTitre: "",
              nom,
              typeLieu: type,
              sat,
              longitude,
              latitude,
              couleurPastille: normaliserCouleurHex(appareil.couleur_appareil || determinerCouleurAppareil(appareilNom)),
              appareilsCount: 0,
              appareilsLignes: [],
              texteMotsCles: []
            });
          }

          const groupe = groupesParTitre.get(cle);
          groupe.appareilsCount += 1;
          const contexteAppareil = [appareil.nom, appareil.type, appareil.SAT]
            .map((v) => champCompletOuVide(v))
            .filter(Boolean)
            .join(separateurLibelle || " ");
          groupe.appareilsLignes.push({
            code: appareilNom || "Appareil",
            contexte: contexteAppareil,
            horsPatrimoine: Boolean(appareil.hors_patrimoine),
            couleur: normaliserCouleurHex(appareil.couleur_appareil || determinerCouleurAppareil(appareilNom))
          });
          groupe.texteMotsCles.push(motsCles);
          if (!groupe.sousTitre && appareilNom) {
            groupe.sousTitre = appareilNom;
          }
        }

        for (const groupe of groupesParTitre.values()) {
          const lignesUniques = Array.from(new Map(groupe.appareilsLignes.map((ligne) => [`${ligne.code}|${ligne.contexte}`, ligne])).values());
          index.push({
            ...groupe,
            sousTitre: groupe.appareilsCount > 1 ? "" : groupe.sousTitre,
            appareilsLignesUniques: lignesUniques,
            texteRecherche: normaliserTexteRecherche(groupe.texteMotsCles.join(" "))
          });
        }
      }

      for (const feature of getDonneesAcces?.()?.features || []) {
        const [longitude, latitude] = feature.geometry?.coordinates || [];
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }

        const accesListe = extraireListeDepuisFeature(feature, "acces_liste_json");
        for (const acces of accesListe) {
          const titre = construireTitreNomTypeSatAcces(acces, { nomVilleDe: true }) || "Acces";
          const motsCles = [titre, acces.nom, acces.SAT, acces.acces]
            .filter(Boolean)
            .join(" ");
          const nom = champCompletOuVide(acces?.nom);
          const type = champCompletOuVide(acces?.type);
          const sat = champCompletOuVide(acces?.SAT);

          index.push({
            type: "acces",
            titre,
            sousTitre: "",
            nom,
            typeLieu: type,
            sat,
            longitude,
            latitude,
            couleurPastille: COULEUR_PASTILLE_ACCES,
            texteRecherche: normaliserTexteRecherche(motsCles)
          });
        }
      }

      indexRecherche = index;
    }

    async function chargerDonneesRecherche() {
      if (indexRecherche.length) {
        return;
      }
      if (!promesseChargementRecherche) {
        promesseChargementRecherche = Promise.all([
          chargerDonneesPostes(),
          chargerDonneesAppareils(),
          chargerDonneesAcces(),
          chargerDonneesPn?.(),
          chargerDonneesLignesOsm?.()
        ])
          .then(() => {
            reconstruireIndexRecherche();
          })
          .finally(() => {
            promesseChargementRecherche = null;
          });
      }
      await promesseChargementRecherche;
    }

    function normaliserTokenRecherche(token) {
      return CORRECTIONS_RECHERCHE.get(token) || token;
    }

    function enrichirTokensRecherche(tokens) {
      const enrichis = [];
      for (const token of tokens) {
        const tokenNormalise = normaliserTokenRecherche(token);
        enrichis.push(tokenNormalise);
        const alias = ALIAS_RECHERCHE.get(tokenNormalise);
        if (Array.isArray(alias)) {
          enrichis.push(...alias);
        }
      }
      return Array.from(new Set(enrichis.filter(Boolean)));
    }

    function rechercherEntrees(terme) {
      const requeteNormalisee = enrichirTokensRecherche(supprimerMotsVides(decouperTokensRecherche(terme))).join(" ").trim();
      return moteurRecherchePrincipal.rechercher(indexRecherche, requeteNormalisee, { minLength: 2, limit: 500 });
    }

    function estRechercheCodeLigne(texte) {
      return /^\d{6}$/.test(String(texte || "").trim());
    }

    function construireCleRattachementRecherche(entree) {
      return [
        normaliserTexteRecherche(champCompletOuVide(entree?.nom)),
        normaliserTexteRecherche(champCompletOuVide(entree?.typeLieu)),
        normaliserTexteRecherche(champCompletOuVide(entree?.sat))
      ].join("|");
    }

    function creerResultatLigneDepuisPostes(codeLigne, postesLigne) {
      const premierPoste = postesLigne.find((poste) => poste?.codeLigne === codeLigne) || null;
      const nomLigne = String(premierPoste?.nomLigne || "").trim();
      return {
        type: "ligne",
        titre: `Ligne ${codeLigne}`,
        sousTitre: nomLigne,
        codeLigne,
        nom: nomLigne,
        typeLieu: "Ligne ferroviaire",
        sat: "",
        couleurPastille: COULEUR_PASTILLE_LIGNE,
        postesLigne,
        postesLigneCount: postesLigne.length,
        voiesLigneCount: 0,
        texteRecherche: normaliserTexteRecherche([`Ligne ${codeLigne}`, codeLigne, nomLigne].filter(Boolean).join(" "))
      };
    }

    function rechercherEntreesLigne(texte) {
      const codeLigne = String(texte || "").trim();
      if (!estRechercheCodeLigne(codeLigne)) {
        return [];
      }

      const postesLigne = indexRecherche
        .filter((entree) => entree?.type === "postes" && String(entree?.codeLigne || "").trim() === codeLigne)
        .sort((a, b) => String(a.titre || "").localeCompare(String(b.titre || ""), "fr", { sensitivity: "base" }));
      const clesPostes = new Set(postesLigne.map(construireCleRattachementRecherche).filter(Boolean));
      const ligneDepuisOsm = indexRecherche.find((entree) => entree?.type === "ligne" && String(entree?.codeLigne || "").trim() === codeLigne);
      if (!ligneDepuisOsm && !postesLigne.length) {
        return [];
      }
      const resultatLigne = ligneDepuisOsm ? { ...ligneDepuisOsm, postesLigne, postesLigneCount: postesLigne.length } : creerResultatLigneDepuisPostes(codeLigne, postesLigne);
      const acces = indexRecherche.filter((entree) => entree?.type === "acces" && clesPostes.has(construireCleRattachementRecherche(entree)));
      const appareils = indexRecherche.filter((entree) => entree?.type === "appareils" && clesPostes.has(construireCleRattachementRecherche(entree)));

      return trierResultatsRecherche([resultatLigne, ...postesLigne, ...acces, ...appareils], codeLigne).slice(0, 500);
    }

    function estRecherchePn(texte) {
      const tokens = decouperTokensRecherche(texte);
      const premierToken = String(tokens[0] || "");
      return /^pn\d*$/i.test(premierToken);
    }

    function estRecherchePk(texte) {
      const tokens = decouperTokensRecherche(texte);
      const premierToken = String(tokens[0] || "");
      return /^pk\d*(?:[+.]\d*)?$/i.test(premierToken);
    }

    function decouperTokensRecherche(texte) {
      return normaliserTexteRecherche(texte)
        .replace(/['’]/g, " ")
        .replace(/[\/_-]+/g, " ")
        .split(/\s+/)
        .filter(Boolean);
    }

    function supprimerMotsVides(tokens, options = {}) {
      const preserverCodeDu = Boolean(options.preserverCodeDu);
      return tokens.filter((token, index) => {
        if (preserverCodeDu && token === "du" && index === 0) {
          return true;
        }
        return !MOTS_VIDES.has(token);
      });
    }

    function estRechercheAdresse(texte) {
      return String(texte || "").trim().startsWith("*");
    }

    function rechercherEntreesPn(texte) {
      const texteBrut = String(texte || "").trim();
      const termeNormalise = normaliserTexteRecherche(texteBrut);
      const termeCompact = termeNormalise.replace(/\s+/g, "");
      const termeSansPrefixePn = termeCompact.replace(/^pn/, "");
      const pns = indexRecherche.filter((entree) => entree?.type === "pn");

      const filtres = pns.filter((entree) => {
        const titre = normaliserTexteRecherche(String(entree?.titre || ""));
        const titreCompact = titre.replace(/\s+/g, "");
        const refPn = normaliserTexteRecherche(String(entree?.refPn || entree?.ref || "")).replace(/\s+/g, "");
        const codeLigne = normaliserTexteRecherche(String(entree?.codeLigne || "")).replace(/\s+/g, "");
        const nomLigne = normaliserTexteRecherche(String(entree?.sousTitre || ""));

        if (!termeCompact || termeCompact === "pn") {
          return true;
        }

        return (
          titreCompact.includes(termeCompact) ||
          (refPn && (`pn${refPn}`.includes(termeCompact) || refPn.includes(termeSansPrefixePn))) ||
          codeLigne.includes(termeSansPrefixePn) ||
          nomLigne.includes(termeNormalise)
        );
      });

      return trierResultatsRecherche(filtres, texteBrut).slice(0, 500);
    }

    function normaliserPkRecherche(valeur) {
      const texte = String(valeur ?? "")
        .trim()
        .replace(/\s+/g, "")
        .replace(",", ".")
        .replace(/^pk/i, "");
      const correspondancePkPlus = texte.match(/^(-?\d+)\+(\d{1,3})$/);
      if (correspondancePkPlus) {
        const kilometres = Number(correspondancePkPlus[1]);
        const metres = Number(correspondancePkPlus[2].padEnd(3, "0"));
        if (Number.isFinite(kilometres) && Number.isFinite(metres)) {
          return formatNombrePkRecherche(kilometres + metres / 1000);
        }
      }
      const correspondancePkPartiel = texte.match(/^(-?\d+)[+.]$/);
      if (correspondancePkPartiel) {
        return correspondancePkPartiel[1];
      }
      return texte;
    }

    function formatNombrePkRecherche(valeur) {
      const texte = String(valeur ?? "").trim().replace(",", ".");
      const nombre = Number(texte);
      if (!Number.isFinite(nombre)) {
        return texte;
      }
      return Number.isInteger(nombre) ? String(nombre) : String(nombre).replace(/\.?0+$/, "");
    }

    function estRecherchePkPrecise(texte) {
      const compact = String(texte ?? "").trim().replace(/\s+/g, "").replace(",", ".").replace(/^pk/i, "");
      return /^\d+(?:\+\d{1,3}|\.\d+)$/i.test(compact);
    }

    function construireResultatPkDepuisFeature(feature, options = {}) {
      const [longitude, latitude] = feature?.geometry?.coordinates || [];
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return null;
      }

      const props = feature?.properties || {};
      const pk = formatNombrePkRecherche(props.pk);
      const codeLigne = String(props.code_ligne || "").trim();
      const nomLigne = obtenirNomLigneDepuisReferentiel(codeLigne);
      const detailProximite = Number.isFinite(options.ecartMetres)
        ? `Plus proche (${Math.round(Math.abs(options.ecartMetres))} m)`
        : "";
      const sousTitre = [detailProximite, codeLigne ? `Ligne n°${codeLigne}` : "", nomLigne || ""]
        .filter(Boolean)
        .join(" ");
      return {
        type: "pk",
        titre: `PK ${pk}`,
        sousTitre,
        pk,
        pkRecherche: options.pkRecherche || "",
        ecartPkMetres: Number.isFinite(options.ecartMetres) ? options.ecartMetres : null,
        codeLigne,
        nom: nomLigne,
        typeLieu: "Point kilométrique",
        sat: "",
        longitude,
        latitude,
        couleurPastille: COULEUR_PASTILLE_PK,
        texteRecherche: normaliserTexteRecherche([`PK ${pk}`, `PK${pk}`, pk, codeLigne, nomLigne].filter(Boolean).join(" "))
      };
    }

    function rechercherEntreesPk(texte) {
      const filtrePk = normaliserPkRecherche(texte);
      const filtrePkNombre = Number(filtrePk);
      const recherchePrecise = estRecherchePkPrecise(texte) && Number.isFinite(filtrePkNombre);
      const featuresPk = Array.isArray(getDonneesPk?.()?.features) ? getDonneesPk().features : [];
      const resultats = [];
      const candidatsProchesParLigne = new Map();

      for (const feature of featuresPk) {
        const props = feature?.properties || {};
        const pk = formatNombrePkRecherche(props.pk);
        const pkNormalise = normaliserPkRecherche(pk);
        const resultat = construireResultatPkDepuisFeature(feature, { pkRecherche: filtrePk });
        if (!resultat) {
          continue;
        }

        if (!filtrePk || pkNormalise.startsWith(filtrePk)) {
          resultats.push(resultat);
          continue;
        }

        if (!recherchePrecise) {
          continue;
        }

        const pkNombre = Number(pkNormalise);
        if (!Number.isFinite(pkNombre)) {
          continue;
        }
        const ecartMetres = Math.abs((pkNombre - filtrePkNombre) * 1000);
        const codeLigne = String(props.code_ligne || "").trim();
        const candidat = { feature, ecartMetres, pkNombre };
        const existant = candidatsProchesParLigne.get(codeLigne);
        if (!existant || candidat.ecartMetres < existant.ecartMetres) {
          candidatsProchesParLigne.set(codeLigne, candidat);
        }
      }

      const base = resultats.length
        ? resultats
        : Array.from(candidatsProchesParLigne.values())
            .sort((a, b) => a.ecartMetres - b.ecartMetres || a.pkNombre - b.pkNombre)
            .slice(0, 24)
            .map((candidat) =>
              construireResultatPkDepuisFeature(candidat.feature, {
                pkRecherche: filtrePk,
                ecartMetres: candidat.ecartMetres
              })
            )
            .filter(Boolean);

      return base
        .sort((a, b) => {
          const ecartA = Number(a.ecartPkMetres);
          const ecartB = Number(b.ecartPkMetres);
          if (Number.isFinite(ecartA) && Number.isFinite(ecartB) && ecartA !== ecartB) {
            return ecartA - ecartB;
          }
          const pkA = Number(String(a.pk || "").replace(",", "."));
          const pkB = Number(String(b.pk || "").replace(",", "."));
          if (Number.isFinite(pkA) && Number.isFinite(pkB) && pkA !== pkB) {
            return pkA - pkB;
          }
          const codeA = String(a.codeLigne || "");
          const codeB = String(b.codeLigne || "");
          return codeA.localeCompare(codeB, "fr", { sensitivity: "base", numeric: true });
        })
        .slice(0, 500);
    }

    function extraireFiltreAppareilDepuisTokens(tokens) {
      const prefixes = new Set();
      const tokensRestants = [];
      const aliasInter = new Set(["inter", "interrupteur", "interupteur", "interrupteurs", "interupteurs"]);
      const aliasDisj = new Set(["disjoncteur", "disjoncteurs", "disj", "dj"]);
      const aliasUrgence = new Set(["urgence", "urgent", "du", "dispositifurgence", "dispositifdurgence"]);
      const aliasTransfo = new Set(["transfo", "transfos", "transformateur", "transformateurs"]);
      const aliasSectionneur = new Set(["sectionneur", "sectionneurs"]);
      const aliasAlim = new Set(["alim", "alimentation", "alimentations"]);

      for (const token of tokens) {
        if (aliasInter.has(token)) {
          PREFIXES_INTER.forEach((p) => prefixes.add(p));
          continue;
        }
        if (aliasDisj.has(token)) {
          PREFIXES_DISJ.forEach((p) => prefixes.add(p));
          continue;
        }
        if (aliasUrgence.has(token)) {
          PREFIXES_URGENCE.forEach((p) => prefixes.add(p));
          continue;
        }
        if (aliasTransfo.has(token)) {
          PREFIXES_TRANSFO.forEach((p) => prefixes.add(p));
          continue;
        }
        if (aliasSectionneur.has(token)) {
          PREFIXES_SECTIONNEUR.forEach((p) => prefixes.add(p));
          continue;
        }
        if (aliasAlim.has(token)) {
          PREFIXES_ALIM.forEach((p) => prefixes.add(p));
          continue;
        }

        // Codes explicites saisis par l'utilisateur.
        const upper = token.toUpperCase();
        if (
          PREFIXES_INTER.includes(upper) ||
          PREFIXES_DISJ.includes(upper) ||
          PREFIXES_URGENCE.includes(upper) ||
          PREFIXES_TRANSFO.includes(upper) ||
          PREFIXES_SECTIONNEUR.includes(upper) ||
          PREFIXES_ALIM.includes(upper)
        ) {
          prefixes.add(upper);
          continue;
        }

        if (!MOTS_VIDES.has(token)) {
          tokensRestants.push(token);
        }
      }

      return {
        prefixes: Array.from(prefixes),
        tokensRestants
      };
    }

    function extraireFiltreHorsPatrimoineDepuisTokens(tokens) {
      const normalises = tokens.map((token) => String(token || "").replace(/-/g, ""));
      const hasHors = normalises.includes("hors");
      const hasPatrimoine = normalises.includes("patrimoine");
      const actif = normalises.some((token) => token === "hp" || token === "horspatrimoine") || hasHors || (hasHors && hasPatrimoine);

      if (!actif) {
        return { actif: false, tokensRestants: tokens };
      }

      const tokensRestants = tokens.filter((token) => {
        const normalise = String(token || "").replace(/-/g, "");
        return normalise !== "hp" && normalise !== "hors" && normalise !== "patrimoine" && normalise !== "horspatrimoine";
      });

      return { actif: true, tokensRestants };
    }

    function codeAppareilCorrespondAuPrefixe(code, prefixes) {
      const codeNormalise = String(code || "").trim().toUpperCase();
      if (!codeNormalise) return false;
      const estPfNumerote = /^PF\s*\d/.test(codeNormalise);
      return prefixes.some((prefixe) => {
        if (CODES_TRANSFO_EXACTS.has(prefixe)) {
          return codeNormalise === prefixe;
        }
        if (prefixe === "D") {
          return codeNormalise.startsWith("D") && !codeNormalise.startsWith("DU");
        }
        if (prefixe === "P" && estPfNumerote) {
          return false;
        }
        return codeNormalise.startsWith(prefixe);
      });
    }

    function resultatAppareilCorrespondAuxPrefixes(resultat, prefixes) {
      if (!prefixes.length || resultat?.type !== "appareils") {
        return true;
      }
      const lignes =
        Array.isArray(resultat?.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
          ? resultat.appareilsLignesUniques
          : [{ code: resultat?.sousTitre || "" }];
      return lignes.some((ligne) => codeAppareilCorrespondAuPrefixe(ligne?.code, prefixes));
    }

    function filtrerResultatAppareil(resultat, options = {}) {
      if (resultat?.type !== "appareils") {
        return null;
      }
      const hpSeulement = Boolean(options.hpSeulement);
      const prefixes = Array.isArray(options.prefixes) ? options.prefixes : [];
      const lignes =
        Array.isArray(resultat?.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
          ? resultat.appareilsLignesUniques
          : [{ code: resultat?.sousTitre || "", contexte: "", horsPatrimoine: false }];

      const lignesFiltrees = lignes.filter((ligne) => {
        if (hpSeulement && !ligne?.horsPatrimoine) {
          return false;
        }
        if (prefixes.length && !codeAppareilCorrespondAuPrefixe(ligne?.code, prefixes)) {
          return false;
        }
        return true;
      });

      if (!lignesFiltrees.length) {
        return null;
      }

      return {
        ...resultat,
        appareilsLignesUniques: lignesFiltrees,
        appareilsCount: lignesFiltrees.length,
        sousTitre: lignesFiltrees.length === 1 ? String(lignesFiltrees[0]?.code || resultat?.sousTitre || "") : ""
      };
    }

    function normaliserCodeAppareil(code) {
      return String(code || "").trim().toUpperCase();
    }

    function determinerCategorieAppareilParCode(code, horsPatrimoine = false) {
      if (horsPatrimoine) {
        return "hp";
      }

      const codeNormalise = normaliserCodeAppareil(code);
      if (!codeNormalise) {
        return "autres";
      }

      if (/^PF\s*\d/.test(codeNormalise)) {
        return "autres";
      }

      if (/^\d/.test(codeNormalise)) {
        return "sectionneurs";
      }
      if (codeNormalise.startsWith("ALIMENTATION")) {
        return "autres";
      }
      if (
        codeNormalise.startsWith("AT") ||
        codeNormalise.startsWith("GT") ||
        codeNormalise.startsWith("TT") ||
        codeNormalise.startsWith("TSA") ||
        codeNormalise.startsWith("TRA") ||
        codeNormalise.startsWith("TC") ||
        CODES_TRANSFO_EXACTS.has(codeNormalise)
      ) {
        return "transformateurs";
      }
      if (codeNormalise.startsWith("DU") || codeNormalise === "A" || codeNormalise.startsWith("A ")) {
        return "autres";
      }
      if (codeNormalise.startsWith("D") && !codeNormalise.startsWith("DU")) {
        return "disjoncteurs";
      }
      if (
        codeNormalise.startsWith("IL") ||
        codeNormalise.startsWith("IMP") ||
        codeNormalise.startsWith("IP") ||
        codeNormalise.startsWith("IS") ||
        codeNormalise.startsWith("IA") ||
        codeNormalise.startsWith("SIA") ||
        codeNormalise.startsWith("SIS") ||
        codeNormalise.startsWith("SI") ||
        codeNormalise.startsWith("I")
      ) {
        return "interrupteurs";
      }
      if (
        codeNormalise.startsWith("FB") ||
        codeNormalise.startsWith("FS") ||
        codeNormalise.startsWith("SAT") ||
        codeNormalise.startsWith("SB") ||
        codeNormalise.startsWith("SM") ||
        codeNormalise.startsWith("SRB") ||
        codeNormalise.startsWith("SDA") ||
        codeNormalise.startsWith("SPLT") ||
        codeNormalise.startsWith("SP") ||
        codeNormalise.startsWith("ST") ||
        codeNormalise.startsWith("F") ||
        codeNormalise.startsWith("P") ||
        codeNormalise.startsWith("S") ||
        (codeNormalise.startsWith("B") && !CODES_TRANSFO_EXACTS.has(codeNormalise)) ||
        codeNormalise.startsWith("T")
      ) {
        return "sectionneurs";
      }
      if (codeNormalise.startsWith("A")) {
        return "autres";
      }
      return "sectionneurs";
    }

    function sousFiltreEstCategorieAppareil(sousFiltre) {
      return ["interrupteurs", "disjoncteurs", "sectionneurs", "transformateurs", "autres", "hp"].includes(sousFiltre);
    }

    function appliquerSousFiltreAppareils(resultats, sousFiltre) {
      if (!sousFiltre) {
        return resultats;
      }
      return resultats
        .map((resultat) => {
          if (resultat?.type !== "appareils") {
            return null;
          }
          const lignes =
            Array.isArray(resultat?.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
              ? resultat.appareilsLignesUniques
              : [{ code: resultat?.sousTitre || "", contexte: "", horsPatrimoine: false }];
          const lignesFiltrees = lignes.filter((ligne) => determinerCategorieAppareilParCode(ligne?.code, ligne?.horsPatrimoine) === sousFiltre);
          if (!lignesFiltrees.length) {
            return null;
          }
          return {
            ...resultat,
            appareilsLignesUniques: lignesFiltrees,
            appareilsCount: lignesFiltrees.length,
            sousTitre: lignesFiltrees.length === 1 ? String(lignesFiltrees[0]?.code || "") : ""
          };
        })
        .filter(Boolean);
    }

    function appliquerSousFiltreGlobal(resultats, sousFiltre) {
      if (!sousFiltre) {
        return resultats;
      }
      if (sousFiltre === "acces") {
        return resultats.filter((resultat) => resultat?.type === "acces");
      }
      if (sousFiltre === "lignes") {
        return resultats.filter((resultat) => resultat?.type === "ligne");
      }
      if (sousFiltre === "postes") {
        return resultats.filter(estResultatPostePrincipal);
      }
      if (sousFiltre === "satellites") {
        return resultats.filter(estResultatPosteSatellite);
      }
      if (sousFiltre === "autres-postes") {
        return resultats.filter(estResultatPosteSpecial);
      }
      if (sousFiltreEstCategorieAppareil(sousFiltre)) {
        return appliquerSousFiltreAppareils(resultats.filter((resultat) => resultat?.type === "appareils"), sousFiltre);
      }
      return resultats;
    }

    function trierResultatsRecherche(resultats, termeReference) {
      const termeNormalise = normaliserTexteRecherche(termeReference);
      const tries = [...resultats].map((entree) => {
        const titreNormalise = normaliserTexteRecherche(entree?.titre || "");
        const matchDebut = termeNormalise
          ? entree?.texteRecherche?.startsWith(termeNormalise) || titreNormalise.startsWith(termeNormalise)
            ? 1
            : 0
          : 0;
        return { ...entree, matchDebut };
      });

      tries.sort((a, b) => {
        const scoreExactA = scoreExactPn(a, termeNormalise);
        const scoreExactB = scoreExactPn(b, termeNormalise);
        if (scoreExactB !== scoreExactA) return scoreExactB - scoreExactA;
        if (b.matchDebut !== a.matchDebut) return b.matchDebut - a.matchDebut;
        const prioriteA = obtenirPrioriteTypeRecherche(a.type);
        const prioriteB = obtenirPrioriteTypeRecherche(b.type);
        if (prioriteA !== prioriteB) return prioriteA - prioriteB;
        const aPnNonRenseigne = estPnNonRenseigne(a) ? 1 : 0;
        const bPnNonRenseigne = estPnNonRenseigne(b) ? 1 : 0;
        if (aPnNonRenseigne !== bPnNonRenseigne) return aPnNonRenseigne - bPnNonRenseigne;
        if (a?.type === "pn" && b?.type === "pn") {
          const comparaisonCodeLigne = comparerCodeLignePn(a, b);
          if (comparaisonCodeLigne !== 0) return comparaisonCodeLigne;
        }
        return String(a.titre || "").localeCompare(String(b.titre || ""), "fr", { sensitivity: "base" });
      });

      return tries;
    }

    function obtenirLibelleTriResultat(resultat) {
      if (resultat?.type === "appareils") {
        const ligne = Array.isArray(resultat?.appareilsLignesUniques) ? resultat.appareilsLignesUniques[0] : null;
        return String(ligne?.code || resultat?.sousTitre || resultat?.titre || "");
      }
      return String(resultat?.titre || "");
    }

    function trierResultatsAppareilsAlphabetiquement(resultats, limite = 500) {
      return [...resultats]
        .sort((a, b) =>
          obtenirLibelleTriResultat(a).localeCompare(obtenirLibelleTriResultat(b), "fr", {
            sensitivity: "base",
            numeric: true
          })
        )
        .slice(0, limite);
    }

    function trierResultatsTous(resultats, limite = 500, options = {}) {
      const modeRechercheLigne = Boolean(options.modeRechercheLigne);
      const lignes = resultats.filter((resultat) => resultat?.type === "ligne");
      const codesLignesAffichees = modeRechercheLigne
        ? new Set(lignes.map((ligne) => String(ligne?.codeLigne || "").trim()).filter(Boolean))
        : new Set();
      const acces = resultats.filter((resultat) => resultat?.type === "acces");
      const postes = resultats.filter(
        (resultat) => resultat?.type === "postes" && !codesLignesAffichees.has(String(resultat?.codeLigne || "").trim())
      );
      const appareils = trierResultatsAppareilsAlphabetiquement(resultats.filter((resultat) => resultat?.type === "appareils"), limite);
      if (modeRechercheLigne) {
        return [...lignes, ...acces, ...postes, ...appareils].slice(0, limite);
      }
      return [...acces, ...postes, ...appareils, ...lignes].slice(0, limite);
    }

    function rechercherEntreesAvancee(texte) {
      if (estRecherchePn(texte)) {
        return rechercherEntreesPn(texte);
      }
      if (estRecherchePk(texte)) {
        return rechercherEntreesPk(texte);
      }
      if (estRechercheCodeLigne(texte)) {
        return rechercherEntreesLigne(texte);
      }

      const tokens = enrichirTokensRecherche(supprimerMotsVides(decouperTokensRecherche(texte), { preserverCodeDu: true }));
      const filtreHp = extraireFiltreHorsPatrimoineDepuisTokens(tokens);
      const filtreAppareil = extraireFiltreAppareilDepuisTokens(filtreHp.tokensRestants);
      const requeteLieu = filtreAppareil.tokensRestants.join(" ").trim();
      const prefixes = filtreAppareil.prefixes;

      if (filtreHp.actif) {
        let base = [];
        if (requeteLieu.length >= 2) {
          base = moteurRecherchePrincipal.rechercher(indexRecherche, requeteLieu, { minLength: 2, limit: 500 });
        } else {
          base = indexRecherche.filter((entree) => entree?.type === "appareils");
        }

        const filtres = base
          .filter((entree) => entree?.type === "appareils")
          .map((entree) => filtrerResultatAppareil(entree, { hpSeulement: true, prefixes }))
          .filter(Boolean);
        return trierResultatsRecherche(filtres, requeteLieu || texte).slice(0, 500);
      }

      if (!prefixes.length) {
        return rechercherEntrees(texte).filter((entree) => entree?.type !== "pn");
      }

      let base = [];
      if (requeteLieu.length >= 2) {
        base = moteurRecherchePrincipal.rechercher(indexRecherche, requeteLieu, { minLength: 2, limit: 200 });
      } else {
        base = indexRecherche.filter((entree) => entree?.type === "appareils");
      }

      const filtres = base.filter((entree) => entree?.type === "appareils" && resultatAppareilCorrespondAuxPrefixes(entree, prefixes));
      return trierResultatsRecherche(filtres, requeteLieu || texte).slice(0, 500);
    }

    function determinerIntentionRecherche(texte) {
      if (estRechercheAdresse(texte)) return { typeForce: "adresse", modeGroupe: "adresse" };
      if (estRecherchePn(texte)) return { typeForce: "pn", modeGroupe: "site" };
      if (estRecherchePk(texte)) return { typeForce: "pk", modeGroupe: "site" };

      const tokens = enrichirTokensRecherche(supprimerMotsVides(decouperTokensRecherche(texte), { preserverCodeDu: true }));
      const filtreHp = extraireFiltreHorsPatrimoineDepuisTokens(tokens);
      const filtreAppareil = extraireFiltreAppareilDepuisTokens(filtreHp.tokensRestants);
      const hasSat = tokens.some((token) => token.startsWith("sat"));
      const hasAcces = tokens.some((token) => token === "acces" || token === "accesroutier" || token === "routier");
      const hasPoste = tokens.some((token) => token === "poste" || token === "postes");
      const hasAppareil = tokens.some((token) => /^(tt|tsa|tc|tra|du|si|alim|gt\d+|at\d+|st|fb|t\d+(?:\/\d+)?)$/i.test(token));

      if (hasAcces) return { typeForce: "acces", modeGroupe: hasSat ? "sat" : "site" };
      if (hasPoste) return { typeForce: "postes", modeGroupe: hasSat ? "sat" : "site" };
      if (filtreHp.actif) return { typeForce: "appareils", modeGroupe: hasSat ? "sat" : "site" };
      if (filtreAppareil.prefixes.length) return { typeForce: "appareils", modeGroupe: hasSat ? "sat" : "site" };
      if (hasAppareil) return { typeForce: "appareils", modeGroupe: hasSat ? "sat" : "site" };
      return { typeForce: "", modeGroupe: hasSat ? "sat" : "site" };
    }

    function compterParType(resultats) {
      const compterAppareils = (resultat) => {
        if (resultat?.type !== "appareils") {
          return 0;
        }
        const count = Number(resultat?.appareilsCount);
        if (Number.isFinite(count) && count > 0) {
          return count;
        }
        const lignes = Array.isArray(resultat?.appareilsLignesUniques) ? resultat.appareilsLignesUniques.length : 0;
        return lignes > 0 ? lignes : 1;
      };

      return {
        adresse: resultats.filter((r) => r.type === "adresse").length,
        pn: resultats.filter((r) => r.type === "pn").length,
        pk: resultats.filter((r) => r.type === "pk").length,
        lignes: resultats.filter((r) => r.type === "ligne").length,
        acces: resultats.filter((r) => r.type === "acces").length,
        postes: resultats.filter((r) => r.type === "postes").length,
        appareils: resultats.reduce((total, resultat) => total + compterAppareils(resultat), 0)
      };
    }

    function filtrerResultatsPourAffichage(resultats, texte, limite = 500) {
      const intention = determinerIntentionRecherche(texte);
      const typeForce = intention.typeForce;
      const modeRechercheLigne = estRechercheCodeLigne(texte);
      if (typeForce) {
        const resultatsForces = resultats.filter((r) => r.type === typeForce);
        if (typeForce === "appareils") {
          return trierResultatsAppareilsAlphabetiquement(appliquerSousFiltreAppareils(resultatsForces, sousFiltreAppareilsActif), limite);
        }
        if (typeForce === "postes") {
          return appliquerSousFiltreGlobal(resultatsForces, sousFiltreAppareilsActif).slice(0, limite);
        }
        return resultatsForces.slice(0, limite);
      }
      if (filtreTypeActif === "appareils") {
        return trierResultatsAppareilsAlphabetiquement(
          appliquerSousFiltreAppareils(resultats.filter((r) => r.type === "appareils"), sousFiltreAppareilsActif),
          limite
        );
      }
      if (filtreTypeActif === "acces" || filtreTypeActif === "postes") {
        return appliquerSousFiltreGlobal(resultats.filter((r) => r.type === filtreTypeActif), sousFiltreAppareilsActif).slice(0, limite);
      }
      return trierResultatsTous(appliquerSousFiltreGlobal(resultats, sousFiltreAppareilsActif), limite, { modeRechercheLigne });
    }

    function construireBoutonResultatGeographique(resultat, options = {}) {
      const modeRechercheLigne = Boolean(options.modeRechercheLigne);
      const titreBrut = resultat.titre || "Element";
      const titre = echapperHtml(titreBrut);
      const meta = construireResumeRecherche(resultat);
      const metaHtml = meta ? `<span class="recherche-resultat-type-inline">${echapperHtml(meta)}</span>` : "";
      const classePastille = [
        `recherche-resultat-pastille-${echapperHtml(resultat.type || "acces")}`,
        estResultatPosteSatellite(resultat) ? "recherche-resultat-pastille-poste-sat" : ""
      ]
        .filter(Boolean)
        .join(" ");
      if (resultat.type === "pn") {
        const detailPn = resultat.sousTitre
          ? `<span class="recherche-resultat-detail-pn">${echapperHtml(String(resultat.sousTitre).trim())}</span>`
          : "";
        return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(
          resultat.type
        )}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastille}"></span><span class="recherche-resultat-label-principal">${titre}</span>${detailPn}</span></button></li>`;
      }
      if (resultat.type === "pk") {
        const detailPk = resultat.sousTitre
          ? `<span class="recherche-resultat-detail-pn">${echapperHtml(String(resultat.sousTitre).trim())}</span>`
          : "";
        return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(
          resultat.type
        )}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastille}"></span><span class="recherche-resultat-label-principal">${titre}</span>${detailPk}</span></button></li>`;
      }
      if (resultat.type === "ligne") {
        const codeLigne = echapperHtml(resultat.codeLigne || "");
        const detailLigne = resultat.sousTitre
          ? `<span class="recherche-resultat-detail-pn">${echapperHtml(String(resultat.sousTitre).trim())}</span>`
          : "";
        const postesLigne = Array.isArray(resultat.postesLigne) ? resultat.postesLigne : [];
        const postesHtml = modeRechercheLigne
          ? postesLigne.length
            ? `<div class="recherche-ligne-postes"><div class="recherche-ligne-postes-titre">Postes sur la ligne ${codeLigne}</div>${postesLigne
                .map((poste) => {
                  const classePastillePoste = [
                    "recherche-resultat-pastille-postes",
                    estResultatPosteSatellite(poste) ? "recherche-resultat-pastille-poste-sat" : ""
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return `<button class="recherche-resultat recherche-ligne-poste" type="button" data-action="ouvrir-resultat" data-type="postes" data-lng="${poste.longitude}" data-lat="${poste.latitude}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastillePoste}"></span>${echapperHtml(
                    poste.titre || "Poste"
                  )}${poste.special === true ? "" : `<span class="recherche-resultat-type-inline">${estResultatPosteSatellite(poste) ? "Satellite" : "Poste"}</span>`}</span></button>`;
                })
                .join("")}</div>`
            : `<div class="recherche-ligne-postes"><div class="recherche-resultat-vide">Aucun poste renseigné sur la ligne ${codeLigne}</div></div>`
          : "";
        return `<li><button class="recherche-resultat recherche-resultat-ligne" type="button" data-action="ouvrir-ligne" data-code-ligne="${codeLigne}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastille}"></span><span class="recherche-resultat-label-principal">${titre}</span>${detailLigne}${metaHtml}</span></button>${postesHtml}</li>`;
      }
      if (resultat.type === "appareils") {
        const appareilsLignes =
          Array.isArray(resultat.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
            ? resultat.appareilsLignesUniques
            : [{ code: resultat.sousTitre || "Appareil", contexte: "" }];
        const classeGroupe = appareilsLignes.length > 1 ? " recherche-appareil-groupe" : "";
        const contextesGroupes = appareilsLignes
          .map((ligne) => String(ligne?.contexte || "").trim())
          .filter(Boolean);
        const contexteCommun =
          appareilsLignes.length > 1 &&
          contextesGroupes.length === appareilsLignes.length &&
          contextesGroupes.every((contexte) => contexte === contextesGroupes[0])
            ? contextesGroupes[0]
            : "";
        const lignesAppareils = appareilsLignes
          .map((ligne) => {
            const code = echapperHtml(ligne?.code || "Appareil");
            const contexteBrut = String(ligne?.contexte || "");
            const contexte = echapperHtml(contexteBrut);
            const afficherContexteInline = contexte && (!contexteCommun || contexteBrut.trim() !== contexteCommun);
            const blocContexte = afficherContexteInline ? `<span class="recherche-appareil-contexte">${contexte}</span>` : "";
            const classeCouleurLigne = determinerClassePastilleAppareil(ligne?.couleur || COULEUR_PASTILLE_APPAREIL);
            const badgeHp = ligne?.horsPatrimoine ? '<span class="popup-tag-hp">HP</span>' : "";
            return `<span class="recherche-appareil-ligne"><span class="recherche-appareil-ligne-principale"><span class="recherche-resultat-pastille recherche-resultat-pastille-ligne-appareil ${echapperHtml(classeCouleurLigne)}"></span><span class="recherche-appareil-code">${code}</span>${blocContexte}${badgeHp}</span></span>`;
          })
          .join("");
        const contenuAppareils = contexteCommun
          ? `<span class="recherche-appareil-liste${classeGroupe}"><span class="recherche-appareil-groupe-structure"><span class="recherche-appareil-groupe-lignes">${lignesAppareils}</span><span class="recherche-appareil-groupe-accolade" aria-hidden="true"></span><span class="recherche-appareil-groupe-contexte">${echapperHtml(
              contexteCommun
            )}</span></span></span>`
          : `<span class="recherche-appareil-liste${classeGroupe}">${lignesAppareils}</span>`;
        return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(resultat.type)}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-appareil-liste-wrap">${contenuAppareils}</span></span></button></li>`;
      }

      return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(resultat.type)}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastille}"></span>${titre}${metaHtml}</span></button></li>`;
    }

    function construireBarreFiltres(typeForce, compteurs) {
      if (typeForce) {
        return "";
      }
      const total = compteurs.lignes + compteurs.acces + compteurs.postes + compteurs.appareils;
      const categoriesPostes = compterCategoriesPostes(derniersResultatsRecherche || []);
      const libellePostesPrincipal = construireLibellePostesCompose(categoriesPostes);
      const options = [
        { id: "tous", label: formatLibelleFiltre(total, "Tous", "Tous") },
        { id: "acces", label: formatLibelleFiltre(compteurs.acces, "Accès", "Accès") },
        { id: "postes", label: `${libellePostesPrincipal} (${compteurs.postes})` },
        { id: "appareils", label: formatLibelleFiltre(compteurs.appareils, "Appareil", "Appareils") }
      ];
      const boutons = options
        .map((opt) => {
          const actif = opt.id === filtreTypeActif;
          const classes = ["recherche-filtre-bouton"];
          if (actif) {
            classes.push("est-actif");
          }
          return `<button type="button" class="${classes.join(" ")}" data-action="set-filtre" data-filtre="${opt.id}">${echapperHtml(
            opt.label
          )}</button>`;
        })
        .join("");
      return `<li><div class="recherche-filtres-barre recherche-filtres-barre-principale">${boutons}</div></li>`;
    }

    function construireSousFiltre(id, label, count, actif) {
      const classes = ["recherche-sous-filtre-bouton"];
      if (actif) {
        classes.push("est-actif");
      }
      return `<button type="button" class="${classes.join(" ")}" data-action="set-sous-filtre-appareil" data-sous-filtre="${echapperHtml(id)}">${echapperHtml(
        formatLibelleFiltre(count, label.singulier || label, label.pluriel || label)
      )}</button>`;
    }

    function construireBarreSousFiltresAppareils(typeForce, resultats) {
      const appareils = resultats.filter((resultat) => resultat?.type === "appareils");
      const postes = resultats.filter((resultat) => resultat?.type === "postes");
      const categoriesPostes = compterCategoriesPostes(postes);
      const optionsPostes = [
        categoriesPostes.postes > 0
          ? construireSousFiltre(
              "postes",
              { singulier: "Poste", pluriel: "Postes" },
              categoriesPostes.postes,
              sousFiltreAppareilsActif === "postes"
            )
          : "",
        categoriesPostes.satellites > 0
          ? construireSousFiltre(
              "satellites",
              { singulier: "Satellite", pluriel: "Satellites" },
              categoriesPostes.satellites,
              sousFiltreAppareilsActif === "satellites"
            )
          : "",
        categoriesPostes.autres > 0
          ? construireSousFiltre(
              "autres-postes",
              { singulier: "Autre", pluriel: "Autres" },
              categoriesPostes.autres,
              sousFiltreAppareilsActif === "autres-postes"
            )
          : ""
      ].filter(Boolean);

      const compteurs = {
        interrupteurs: 0,
        disjoncteurs: 0,
        sectionneurs: 0,
        transformateurs: 0,
        autres: 0,
        hp: 0
      };

      appareils.forEach((resultat) => {
        const lignes =
          Array.isArray(resultat?.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
            ? resultat.appareilsLignesUniques
            : [{ code: resultat?.sousTitre || "", horsPatrimoine: false }];
        lignes.forEach((ligne) => {
          const categorie = determinerCategorieAppareilParCode(ligne?.code, ligne?.horsPatrimoine);
          if (compteurs[categorie] != null) {
            compteurs[categorie] += 1;
          }
        });
      });

      const optionsAppareils = [
        ["interrupteurs", { singulier: "Interrupteur", pluriel: "Interrupteurs" }],
        ["disjoncteurs", { singulier: "Disjoncteur", pluriel: "Disjoncteurs" }],
        ["sectionneurs", { singulier: "Sectionneur", pluriel: "Sectionneurs" }],
        ["transformateurs", { singulier: "Transformateur", pluriel: "Transformateurs" }],
        ["autres", { singulier: "Autre", pluriel: "Autres" }],
        ["hp", { singulier: "HP", pluriel: "HP" }]
      ]
        .filter(([id]) => compteurs[id] > 0)
        .map(([id, label]) => construireSousFiltre(id, label, compteurs[id], sousFiltreAppareilsActif === id));

      if (typeForce === "appareils" || filtreTypeActif === "appareils") {
        if (!optionsAppareils.length) {
          return "";
        }
        return `<li><div class="recherche-filtres-barre recherche-filtres-barre-secondaire">${optionsAppareils.join("")}</div></li>`;
      }

      if (typeForce === "postes" || filtreTypeActif === "postes") {
        if (!optionsPostes.length) {
          return "";
        }
        return `<li><div class="recherche-filtres-barre recherche-filtres-barre-secondaire">${optionsPostes.join("")}</div></li>`;
      }

      if (filtreTypeActif !== "tous") {
        return "";
      }

      const optionsTous = [];
      const nbLignes = resultats.filter((resultat) => resultat?.type === "ligne").length;
      const nbAcces = resultats.filter((resultat) => resultat?.type === "acces").length;
      if (nbLignes > 0) {
        optionsTous.push(
          construireSousFiltre("lignes", { singulier: "Ligne", pluriel: "Lignes" }, nbLignes, sousFiltreAppareilsActif === "lignes")
        );
      }
      if (nbAcces > 0) {
        optionsTous.push(
          construireSousFiltre("acces", { singulier: "Accès", pluriel: "Accès" }, nbAcces, sousFiltreAppareilsActif === "acces")
        );
      }
      optionsTous.push(...optionsPostes);
      optionsTous.push(...optionsAppareils);
      return optionsTous.length ? `<li><div class="recherche-filtres-barre recherche-filtres-barre-secondaire">${optionsTous.join("")}</div></li>` : "";
    }

    function construireEnteteContexteLigne(texte, visibles) {
      const codeLigne = String(texte || "").trim();
      if (!estRechercheCodeLigne(codeLigne)) {
        return "";
      }

      const typesVisibles = new Set((visibles || []).map((resultat) => resultat?.type).filter(Boolean));
      const compteursVisibles = compterParType(visibles || []);
      const categoriesPostesVisibles = compterCategoriesPostes(visibles || []);
      let libelle = "";
      if (sousFiltreAppareilsActif === "acces") {
        libelle = "Accès";
      } else if (sousFiltreAppareilsActif === "lignes") {
        libelle = libelleAvecNombre(compteursVisibles.lignes, "Ligne", "Lignes");
      } else if (sousFiltreAppareilsActif === "postes") {
        libelle = libelleAvecNombre(categoriesPostesVisibles.postes, "Poste", "Postes");
      } else if (sousFiltreAppareilsActif === "satellites") {
        libelle = libelleAvecNombre(categoriesPostesVisibles.satellites, "Satellite", "Satellites");
      } else if (sousFiltreAppareilsActif === "autres-postes") {
        libelle = libelleAvecNombre(categoriesPostesVisibles.autres, "Autre", "Autres");
      } else if (sousFiltreEstCategorieAppareil(sousFiltreAppareilsActif)) {
        const libellesSousFiltres = {
          interrupteurs: ["Interrupteur", "Interrupteurs"],
          disjoncteurs: ["Disjoncteur", "Disjoncteurs"],
          sectionneurs: ["Sectionneur", "Sectionneurs"],
          transformateurs: ["Transformateur", "Transformateurs"],
          autres: ["Autre appareil", "Autres appareils"],
          hp: ["Appareil HP", "Appareils HP"]
        };
        const [singulier, pluriel] = libellesSousFiltres[sousFiltreAppareilsActif] || ["Appareil", "Appareils"];
        libelle = libelleAvecNombre(compteursVisibles.appareils, singulier, pluriel);
      } else if (filtreTypeActif === "acces") {
        libelle = "Accès";
      } else if (filtreTypeActif === "postes") {
        libelle = construireLibellePostesCompose(categoriesPostesVisibles);
      } else if (filtreTypeActif === "appareils") {
        libelle = libelleAvecNombre(compteursVisibles.appareils, "Appareil", "Appareils");
      } else if (!typesVisibles.has("ligne") && typesVisibles.size === 1) {
        if (typesVisibles.has("acces")) libelle = "Accès";
        if (typesVisibles.has("postes")) libelle = construireLibellePostesCompose(categoriesPostesVisibles);
        if (typesVisibles.has("appareils")) libelle = libelleAvecNombre(compteursVisibles.appareils, "Appareil", "Appareils");
      }

      if (!libelle) {
        return "";
      }
      const ligne = (derniersResultatsRecherche || []).find(
        (resultat) => resultat?.type === "ligne" && String(resultat?.codeLigne || "").trim() === codeLigne
      );
      const nomLigne = String(ligne?.sousTitre || ligne?.nom || "").trim();
      const detailLigne = nomLigne ? ` <span class="recherche-ligne-contexte-nom">${echapperHtml(nomLigne)}</span>` : "";
      return `<li class="recherche-ligne-contexte">${echapperHtml(libelle)} sur la ligne ${echapperHtml(codeLigne)}${detailLigne}</li>`;
    }

    function afficherResultatsRecherche(resultats, options = {}) {
      if (!listeResultatsRecherche) {
        return;
      }

      const texte = String(options.texte || dernierTexteRecherche || "");
      const intention = determinerIntentionRecherche(texte);
      const compteurs = compterParType(resultats);
      if (!intention.typeForce && !filtreChoisiManuellement) {
        filtreTypeActif = obtenirFiltreTypeParDefaut();
      }

      if (intention.typeForce && intention.typeForce !== "appareils" && intention.typeForce !== "postes") {
        sousFiltreAppareilsActif = "";
      }

      const barre = construireBarreFiltres(intention.typeForce, compteurs);
      const sousBarre = construireBarreSousFiltresAppareils(intention.typeForce, resultats);
      const visibles = filtrerResultatsPourAffichage(resultats, texte, 500);
      const modeRechercheLigne = estRechercheCodeLigne(texte);
      const enteteContexteLigne = construireEnteteContexteLigne(texte, visibles);
      const hint =
        !modeRechercheLigne && !intention.typeForce && filtreTypeActif === "tous"
          ? '<li class="recherche-resultat-vide">Astuces : "TT Alleux", "inter Fives", "DU Lens"</li>'
          : "";

      if (!resultats.length) {
        listeResultatsRecherche.innerHTML = `${barre}${sousBarre}<li class="recherche-resultat-vide">Aucun resultat</li>`;
        reinitialiserSelectionClavierResultats();
        ouvrirResultatsRecherche();
        return;
      }

      const listeVisibles = visibles.length
        ? visibles.map(construireBoutonResultatGeographique).join("")
        : '<li class="recherche-resultat-vide">Aucun resultat pour ce filtre</li>';
      const htmlVisibles = visibles.length
        ? visibles.map((resultat) => construireBoutonResultatGeographique(resultat, { modeRechercheLigne })).join("")
        : '<li class="recherche-resultat-vide">Aucun resultat pour ce filtre</li>';
      listeResultatsRecherche.innerHTML = `${barre}${sousBarre}${hint}${enteteContexteLigne}${htmlVisibles}`;
      reinitialiserSelectionClavierResultats();
      ouvrirResultatsRecherche();
    }

    async function executerRecherche(texte) {
      const texteNettoye = String(texte || "").trim();
      if (estRecherchePk(texteNettoye)) {
        await Promise.resolve(typeof chargerDonneesPk === "function" ? chargerDonneesPk() : null);
      } else {
        await chargerDonneesRecherche();
      }
      const resultats = estRechercheAdresse(texteNettoye)
        ? await Promise.resolve(typeof rechercherAdresses === "function" ? rechercherAdresses(texteNettoye) : [])
        : rechercherEntreesAvancee(texteNettoye);
      const texteModifie = texteNettoye !== dernierTexteRecherche;
      dernierTexteRecherche = texteNettoye;
      derniersResultatsRecherche = resultats;
      if (texteModifie && determinerIntentionRecherche(texteNettoye).typeForce === "appareils") {
        filtreTypeActif = "appareils";
        sousFiltreAppareilsActif = "";
      }
      afficherResultatsRecherche(resultats, { texte: texteNettoye });
      return resultats;
    }

    async function ouvrirResultatCarte(type, longitude, latitude) {
      if (type === "adresse") {
        const resultatAdresse =
          derniersResultatsRecherche.find(
            (resultat) =>
              resultat?.type === type &&
              Math.abs(Number(resultat?.longitude) - longitude) < 1e-9 &&
              Math.abs(Number(resultat?.latitude) - latitude) < 1e-9
          ) || null;

        fermerResultatsRecherche();
        champRecherche?.blur();
        fermerMenuFiltres?.();
        fermerMenuFonds?.();
        ouvrirAdresseDepuisRecherche?.(resultatAdresse);
        return;
      }

      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      const resultatOuvert =
        derniersResultatsRecherche.find(
          (resultat) =>
            resultat?.type === type &&
            Math.abs(Number(resultat?.longitude) - longitude) < 1e-9 &&
            Math.abs(Number(resultat?.latitude) - latitude) < 1e-9
        ) ||
        lireRecherchesRecentes().find(
          (resultat) =>
            resultat?.type === type &&
            Math.abs(Number(resultat?.longitude) - longitude) < 1e-9 &&
            Math.abs(Number(resultat?.latitude) - latitude) < 1e-9
        ) ||
        null;

      enregistrerRechercheRecente(resultatOuvert);

      await activerFiltrePourType(type);
      appliquerCouchesDonnees();
      remonterCouchesDonnees();

      fermerResultatsRecherche();
      champRecherche?.blur();
      fermerMenuFiltres?.();
      fermerMenuFonds?.();

      if (type === "pk" && typeof ouvrirPkDepuisRecherche === "function") {
        ouvrirPkDepuisRecherche(resultatOuvert || { type, longitude, latitude });
        return;
      }

      const ouvertureOk = ouvrirPopupDepuisResultatRecherche(type, longitude, latitude);
      if (!ouvertureOk) {
        return;
      }
    }

    function reinitialiserEtatRecherche() {
      dernierTexteRecherche = "";
      derniersResultatsRecherche = [];
      filtreTypeActif = obtenirFiltreTypeParDefaut();
      filtreChoisiManuellement = false;
      sousFiltreAppareilsActif = "";
    }

    function initialiser() {
      if (!champRecherche || !listeResultatsRecherche) {
        return;
      }

      let temporisationRecherche = null;

      champRecherche.addEventListener("input", () => {
        const texte = champRecherche.value.trim();
        if (temporisationRecherche) {
          clearTimeout(temporisationRecherche);
        }

        if (!texte || texte.length < 2) {
          reinitialiserEtatRecherche();
          afficherRecherchesRecentes();
          return;
        }

        temporisationRecherche = setTimeout(async () => {
          try {
            await executerRecherche(texte);
          } catch (erreur) {
            console.error("Impossible d'executer la recherche", erreur);
          }
        }, 220);
      });

      champRecherche.addEventListener("focus", async () => {
        const texte = champRecherche.value.trim();
        if (texte.length < 2) {
          afficherRecherchesRecentes();
          return;
        }
        try {
          await executerRecherche(texte);
        } catch (erreur) {
          console.error("Impossible d'executer la recherche", erreur);
        }
      });

      champRecherche.addEventListener("keydown", (event) => {
        if (event.key === "Tab" && !event.shiftKey) {
          const texte = champRecherche.value.trim();
          if (texte.length >= 2 && derniersResultatsRecherche.length) {
            event.preventDefault();
            faireTournerFiltrePrincipalRecherche();
          }
          return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          const boutons = listerBoutonsResultatsNavigables();
          if (!boutons.length) {
            return;
          }
          event.preventDefault();
          if (event.key === "ArrowDown") {
            indexResultatActifClavier = Math.min(indexResultatActifClavier + 1, boutons.length - 1);
          } else {
            indexResultatActifClavier = indexResultatActifClavier <= 0 ? 0 : indexResultatActifClavier - 1;
          }
          appliquerSelectionClavierResultats(indexResultatActifClavier);
          return;
        }

        if (event.key === "Escape") {
          reinitialiserSelectionClavierResultats();
          fermerResultatsRecherche();
          return;
        }

        if (event.key !== "Enter") {
          return;
        }
        const boutons = listerBoutonsResultatsNavigables();
        const cible =
          indexResultatActifClavier >= 0 && indexResultatActifClavier < boutons.length
            ? boutons[indexResultatActifClavier]
            : boutons[0];
        if (!cible) {
          return;
        }

        event.preventDefault();
        cible.click();
      });

      listeResultatsRecherche.addEventListener("click", async (event) => {
        const boutonResultat = event.target.closest('button[data-action], .recherche-resultat');
        if (!boutonResultat) {
          return;
        }
        event.stopPropagation();

        const action = boutonResultat.dataset.action || "ouvrir-resultat";
        if (action === "vider-recents") {
          viderRecherchesRecentes();
          viderResultatsRecherche();
          fermerResultatsRecherche();
          return;
        }

        if (action === "set-filtre") {
          filtreTypeActif = boutonResultat.dataset.filtre || obtenirFiltreTypeParDefaut();
          filtreChoisiManuellement = true;
          sousFiltreAppareilsActif = "";
          afficherResultatsRecherche(derniersResultatsRecherche, { texte: dernierTexteRecherche });
          return;
        }

        if (action === "set-sous-filtre-appareil") {
          const prochainSousFiltre = boutonResultat.dataset.sousFiltre || "";
          sousFiltreAppareilsActif = sousFiltreAppareilsActif === prochainSousFiltre ? "" : prochainSousFiltre;
          afficherResultatsRecherche(derniersResultatsRecherche, { texte: dernierTexteRecherche });
          return;
        }

        if (action === "ouvrir-ligne") {
          const codeLigne = boutonResultat.dataset.codeLigne || "";
          fermerMenuFiltres?.();
          fermerMenuFonds?.();
          await ouvrirLigneDepuisRecherche?.(codeLigne);
          return;
        }

        const type = boutonResultat.dataset.type || "acces";
        const longitude = Number(boutonResultat.dataset.lng);
        const latitude = Number(boutonResultat.dataset.lat);

        try {
          await ouvrirResultatCarte(type, longitude, latitude);
        } catch (erreur) {
          definirConservationFichePendantNavigation?.(false);
          console.error("Impossible d'ouvrir le resultat de recherche", erreur);
        }
      });
    }

    return {
      initialiser,
      fermerResultatsRecherche,
      reinitialiserEtatRecherche
    };
  }

  window.creerMoteurRecherchePrincipal = creerMoteurRecherchePrincipal;
  window.creerModuleRechercheAlice = creerModuleRechercheAlice;
})();
