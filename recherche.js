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
            matchDebut
          });
        }

        const prioriteFn = typeof obtenirPrioriteTypeRecherche === "function" ? obtenirPrioriteTypeRecherche : prioriteParDefaut;
        resultats.sort((a, b) => {
          if (b.matchDebut !== a.matchDebut) {
            return b.matchDebut - a.matchDebut;
          }
          const prioriteA = prioriteFn(a.type);
          const prioriteB = prioriteFn(b.type);
          if (prioriteA !== prioriteB) {
            return prioriteA - prioriteB;
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
      paletteAppareils,
      extraireListeDepuisFeature,
      chargerDonneesPostes,
      chargerDonneesAppareils,
      chargerDonneesAcces,
      getDonneesPostes,
      getDonneesAppareils,
      getDonneesAcces,
      activerFiltrePourType,
      appliquerCouchesDonnees,
      remonterCouchesDonnees,
      ouvrirPopupDepuisResultatRecherche,
      naviguerVersCoordonneesArrierePlan,
      fermerMenuFiltres,
      fermerMenuFonds,
      definirConservationFichePendantNavigation
    } = config || {};

    let indexRecherche = [];
    let promesseChargementRecherche = null;
    let dernierTexteRecherche = "";
    let derniersResultatsRecherche = [];
    let filtreTypeActif = "tous";

    const obtenirPrioriteTypeRecherche = (type) => {
      if (type === "acces") return 0;
      if (type === "postes") return 1;
      if (type === "appareils") return 2;
      return 3;
    };

    const moteurRecherchePrincipal = creerMoteurRecherchePrincipal({
      normaliserTexteRecherche,
      obtenirPrioriteTypeRecherche
    });
    const PREFIXES_INTER = ["SI", "I"];
    const PREFIXES_DISJ = ["D"];
    const PREFIXES_URGENCE = ["DU"];
    const PREFIXES_TRANSFO = ["TT", "TSA", "TC", "GT", "TRA"];
    const PREFIXES_SECTIONNEUR = ["ST", "S", "FB", "F", "P", "B"];
    const PREFIXES_ALIM = ["ALIM"];
    const MOTS_VIDES = new Set(["de", "du", "des", "d", "la", "le", "les", "a", "à", "au", "aux", "en", "sur", "et", "l"]);
    const COULEUR_PASTILLE_POSTE = normaliserCouleurHex(paletteCarte?.poste || "#60a5fa");
    const COULEUR_PASTILLE_ACCES = normaliserCouleurHex(paletteCarte?.accesGroupe || "#8b5cf6");
    const COULEUR_PASTILLE_APPAREIL = normaliserCouleurHex(paletteAppareils?.autre || "#111111");
    const CLASSES_COULEUR_APPAREIL_PAR_HEX = new Map([
      [normaliserCouleurHex(paletteAppareils?.urgence || "#d90429"), "pastille-app-du"],
      [normaliserCouleurHex(paletteAppareils?.interrupteur || "#f77f00"), "pastille-app-si"],
      [normaliserCouleurHex(paletteAppareils?.transfo || "#ffd60a"), "pastille-app-tt"],
      [normaliserCouleurHex(paletteAppareils?.sectionneur || "#2a9d8f"), "pastille-app-t"],
      [normaliserCouleurHex(paletteAppareils?.alim || "#8d99ae"), "pastille-app-alim"],
      [normaliserCouleurHex(paletteAppareils?.autre || "#111111"), "pastille-app-autre"]
    ]);

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

    function construireResumeRecherche(entree) {
      if (entree.type === "postes") {
        return "Poste";
      }
      if (entree.type === "appareils") {
        if (Number(entree.appareilsCount) > 1) {
          return `${entree.appareilsCount} appareils`;
        }
        return "Appareil";
      }
      return "Acces voiture";
    }

    function reconstruireIndexRecherche() {
      const index = [];

      for (const feature of getDonneesPostes?.()?.features || []) {
        const [longitude, latitude] = feature.geometry?.coordinates || [];
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          continue;
        }

        const postesListe = extraireListeDepuisFeature(feature, "postes_liste_json");
        for (const poste of postesListe) {
          const titre = construireTitrePoste(poste) || "Poste";
          const details = construireDetailsPoste(poste);
          const motsCles = [titre, details, poste.nom, poste.SAT, poste.acces, poste.rss, poste.pk, poste.contact]
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
            longitude,
            latitude,
            couleurPastille: COULEUR_PASTILLE_POSTE,
            texteRecherche: normaliserTexteRecherche(motsCles)
          });
        }
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
        promesseChargementRecherche = Promise.all([chargerDonneesPostes(), chargerDonneesAppareils(), chargerDonneesAcces()])
          .then(() => {
            reconstruireIndexRecherche();
          })
          .finally(() => {
            promesseChargementRecherche = null;
          });
      }
      await promesseChargementRecherche;
    }

    function rechercherEntrees(terme) {
      const requeteNormalisee = supprimerMotsVides(decouperTokensRecherche(terme)).join(" ").trim();
      return moteurRecherchePrincipal.rechercher(indexRecherche, requeteNormalisee, { minLength: 2, limit: 500 });
    }

    function decouperTokensRecherche(texte) {
      return normaliserTexteRecherche(texte)
        .replace(/['’]/g, " ")
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
      return prefixes.some((prefixe) => {
        if (prefixe === "D") {
          return codeNormalise.startsWith("D") && !codeNormalise.startsWith("DU");
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
        if (b.matchDebut !== a.matchDebut) return b.matchDebut - a.matchDebut;
        const prioriteA = obtenirPrioriteTypeRecherche(a.type);
        const prioriteB = obtenirPrioriteTypeRecherche(b.type);
        if (prioriteA !== prioriteB) return prioriteA - prioriteB;
        return String(a.titre || "").localeCompare(String(b.titre || ""), "fr", { sensitivity: "base" });
      });

      return tries;
    }

    function rechercherEntreesAvancee(texte) {
      const tokens = supprimerMotsVides(decouperTokensRecherche(texte), { preserverCodeDu: true });
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
        return rechercherEntrees(texte);
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
      const tokens = supprimerMotsVides(decouperTokensRecherche(texte), { preserverCodeDu: true });
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
      return {
        acces: resultats.filter((r) => r.type === "acces").length,
        postes: resultats.filter((r) => r.type === "postes").length,
        appareils: resultats.filter((r) => r.type === "appareils").length
      };
    }

    function equilibrerResultatsMixtes(resultats, limite) {
      const buckets = {
        postes: resultats.filter((r) => r.type === "postes"),
        appareils: resultats.filter((r) => r.type === "appareils"),
        acces: resultats.filter((r) => r.type === "acces")
      };
      const ordre = ["postes", "appareils", "acces"];
      const melange = [];
      let aAjoute = true;
      while (melange.length < limite && aAjoute) {
        aAjoute = false;
        for (const type of ordre) {
          if (melange.length >= limite) {
            break;
          }
          const next = buckets[type].shift();
          if (next) {
            melange.push(next);
            aAjoute = true;
          }
        }
      }
      return melange;
    }

    function filtrerResultatsPourAffichage(resultats, texte, limite = 500) {
      const intention = determinerIntentionRecherche(texte);
      const typeForce = intention.typeForce;
      if (typeForce) {
        return resultats.filter((r) => r.type === typeForce).slice(0, 500);
      }
      if (filtreTypeActif !== "tous") {
        return resultats.filter((r) => r.type === filtreTypeActif).slice(0, 500);
      }
      return equilibrerResultatsMixtes(resultats, limite);
    }

    function construireBoutonResultatGeographique(resultat) {
      const titre = echapperHtml(resultat.titre || "Element");
      const meta = construireResumeRecherche(resultat);
      const classePastille = `recherche-resultat-pastille-${echapperHtml(resultat.type || "acces")}`;
      if (resultat.type === "appareils") {
        const appareilsLignes =
          Array.isArray(resultat.appareilsLignesUniques) && resultat.appareilsLignesUniques.length
            ? resultat.appareilsLignesUniques
            : [{ code: resultat.sousTitre || "Appareil", contexte: "" }];
        const classeGroupe = appareilsLignes.length > 1 ? " recherche-appareil-groupe" : "";
        const lignesAppareils = appareilsLignes
          .map((ligne) => {
            const code = echapperHtml(ligne?.code || "Appareil");
            const contexte = echapperHtml(ligne?.contexte || "");
            const blocContexte = contexte ? `<span class="recherche-appareil-contexte">(${contexte})</span>` : "";
            const classeCouleurLigne = determinerClassePastilleAppareil(ligne?.couleur || COULEUR_PASTILLE_APPAREIL);
            const badgeHp = ligne?.horsPatrimoine ? '<span class="popup-tag-hp">HP</span>' : "";
            return `<span class="recherche-appareil-ligne"><span class="recherche-appareil-ligne-principale"><span class="recherche-resultat-pastille recherche-resultat-pastille-ligne-appareil ${echapperHtml(classeCouleurLigne)}"></span><span class="recherche-appareil-code">${code}</span>${blocContexte}${badgeHp}</span></span>`;
          })
          .join("");
        return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(resultat.type)}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-appareil-liste${classeGroupe}">${lignesAppareils}</span></span></button></li>`;
      }

      return `<li><button class="recherche-resultat" type="button" data-action="ouvrir-resultat" data-type="${echapperHtml(resultat.type)}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}"><span class="recherche-resultat-titre"><span class="recherche-resultat-pastille ${classePastille}"></span>${titre}<span class="recherche-resultat-type-inline">${echapperHtml(meta)}</span></span></button></li>`;
    }

    function construireBarreFiltres(typeForce, compteurs) {
      if (typeForce) {
        return "";
      }
      const options = [
        { id: "tous", label: `Tous (${compteurs.acces + compteurs.postes + compteurs.appareils})` },
        { id: "acces", label: `Accès (${compteurs.acces})` },
        { id: "postes", label: `Postes (${compteurs.postes})` },
        { id: "appareils", label: `Appareils (${compteurs.appareils})` }
      ];
      const boutons = options
        .map((opt) => {
          const actif = opt.id === filtreTypeActif;
          const bg = actif ? "#dbeafe" : "#f1f5f9";
          const fg = actif ? "#1e3a8a" : "#334155";
          return `<button type="button" data-action="set-filtre" data-filtre="${opt.id}" style="border:0;border-radius:999px;padding:6px 10px;font:inherit;background:${bg};color:${fg};cursor:pointer;">${echapperHtml(
            opt.label
          )}</button>`;
        })
        .join("");
      return `<li><div style="display:flex;gap:8px;flex-wrap:wrap;padding:6px 4px 10px 4px;">${boutons}</div></li>`;
    }

    function afficherResultatsRecherche(resultats, options = {}) {
      if (!listeResultatsRecherche) {
        return;
      }

      const texte = String(options.texte || dernierTexteRecherche || "");
      const intention = determinerIntentionRecherche(texte);
      const compteurs = compterParType(resultats);

      if (!resultats.length) {
        listeResultatsRecherche.innerHTML = '<li class="recherche-resultat-vide">Aucun resultat</li>';
        ouvrirResultatsRecherche();
        return;
      }

      const visibles = filtrerResultatsPourAffichage(resultats, texte, 500);
      const barre = construireBarreFiltres(intention.typeForce, compteurs);
      const hint =
        !intention.typeForce && filtreTypeActif === "tous"
          ? '<li class="recherche-resultat-vide">Astuces : "TT Alleux", "inter Fives", "DU Lens"</li>'
          : "";
      listeResultatsRecherche.innerHTML = `${barre}${hint}${visibles.map(construireBoutonResultatGeographique).join("")}`;
      ouvrirResultatsRecherche();
    }

    async function executerRecherche(texte) {
      await chargerDonneesRecherche();
      const texteNettoye = String(texte || "").trim();
      const resultats = rechercherEntreesAvancee(texteNettoye);
      const texteModifie = texteNettoye !== dernierTexteRecherche;
      dernierTexteRecherche = texteNettoye;
      derniersResultatsRecherche = resultats;
      if (texteModifie && determinerIntentionRecherche(texteNettoye).typeForce) {
        filtreTypeActif = "tous";
      }
      afficherResultatsRecherche(resultats, { texte: texteNettoye });
      return resultats;
    }

    async function ouvrirResultatCarte(type, longitude, latitude) {
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      await activerFiltrePourType(type);
      appliquerCouchesDonnees();
      remonterCouchesDonnees();

      fermerResultatsRecherche();
      champRecherche?.blur();
      fermerMenuFiltres?.();
      fermerMenuFonds?.();

      const ouvertureOk = ouvrirPopupDepuisResultatRecherche(type, longitude, latitude);
      if (!ouvertureOk) {
        return;
      }
    }

    function reinitialiserEtatRecherche() {
      dernierTexteRecherche = "";
      derniersResultatsRecherche = [];
      filtreTypeActif = "tous";
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
          viderResultatsRecherche();
          fermerResultatsRecherche();
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
          return;
        }
        try {
          await executerRecherche(texte);
        } catch (erreur) {
          console.error("Impossible d'executer la recherche", erreur);
        }
      });

      champRecherche.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
          return;
        }
        const premierResultat = listeResultatsRecherche.querySelector('[data-action="ouvrir-resultat"]');
        if (!premierResultat) {
          return;
        }

        event.preventDefault();
        premierResultat.click();
      });

      listeResultatsRecherche.addEventListener("click", async (event) => {
        const boutonResultat = event.target.closest('button[data-action], .recherche-resultat');
        if (!boutonResultat) {
          return;
        }
        event.stopPropagation();

        const action = boutonResultat.dataset.action || "ouvrir-resultat";
        if (action === "set-filtre") {
          filtreTypeActif = boutonResultat.dataset.filtre || "tous";
          afficherResultatsRecherche(derniersResultatsRecherche, { texte: dernierTexteRecherche });
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
