(function () {
  const TAILLE_PAGE_RESULTATS = 8;

  window.creerModuleLocalisationAlice = function creerModuleLocalisationAlice(config) {
    const {
      carte,
      chargerDonneesAcces,
      chargerDonneesPostes,
      chargerDonneesAppareils,
      getDonneesAcces,
      getDonneesPostes,
      getDonneesAppareils,
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
      fermerMenusGlobalement
    } = config;

    const modal = document.getElementById("modal-localisation");
    const zoneEtat = document.getElementById("localisation-etat");
    const listeResultats = document.getElementById("localisation-resultats");
    const boutonFermer = document.getElementById("modal-localisation-fermer");
    let elementRetourFocus = null;
    let tousResultats = [];
    let limiteAffichage = 0;

    function estOuverte() {
      return Boolean(modal?.classList.contains("est-visible"));
    }

    function ouvrir() {
      if (!modal) {
        return;
      }
      const actif = document.activeElement;
      if (actif instanceof HTMLElement && !modal.contains(actif)) {
        elementRetourFocus = actif;
      }
      modal.classList.add("est-visible");
      modal.setAttribute("aria-hidden", "false");
      fermerMenusGlobalement?.();
      window.requestAnimationFrame(() => {
        boutonFermer?.focus({ preventScroll: true });
      });
    }

    function fermer() {
      if (!modal) {
        return;
      }
      const actif = document.activeElement;
      if (actif instanceof HTMLElement && modal.contains(actif)) {
        if (elementRetourFocus instanceof HTMLElement && elementRetourFocus.isConnected) {
          elementRetourFocus.focus({ preventScroll: true });
        } else {
          actif.blur();
        }
      }
      modal.classList.remove("est-visible");
      modal.setAttribute("aria-hidden", "true");
    }

    function definirEtat(message, estErreur) {
      if (!zoneEtat) {
        return;
      }
      zoneEtat.textContent = message;
      zoneEtat.classList.toggle("est-erreur", Boolean(estErreur));
    }

    function viderResultats() {
      if (!listeResultats) {
        return;
      }
      tousResultats = [];
      limiteAffichage = 0;
      listeResultats.innerHTML = "";
    }

    function obtenirPositionUtilisateur() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("La geolocalisation n'est pas disponible sur cet appareil."));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const longitude = Number(coords?.longitude);
            const latitude = Number(coords?.latitude);
            if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
              reject(new Error("Position GPS invalide."));
              return;
            }
            resolve({ longitude, latitude });
          },
          () => {
            reject(new Error("Impossible de recuperer votre position."));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 120000
          }
        );
      });
    }

    function normaliserChampTexte(valeur) {
      return String(valeur || "").trim();
    }

    function champCompletOuVide(valeur) {
      const texte = normaliserChampTexte(valeur);
      const texteMaj = texte.toUpperCase();
      if (!texte) {
        return "";
      }
      if (texteMaj === "A COMPLETER" || texteMaj === "A COMPLÉTER" || texteMaj === "COMPLETER" || texteMaj === "COMPLÉTER") {
        return "";
      }
      return texte;
    }

    function extraireListeDepuisFeature(feature, cleJson) {
      const proprietes = feature?.properties || {};
      try {
        const liste = JSON.parse(proprietes?.[cleJson] || "[]");
        if (Array.isArray(liste) && liste.length) {
          return liste;
        }
      } catch {
        // Ignore les listes invalides.
      }
      return [proprietes];
    }

    function determinerIconeResultat(type, feature, entree) {
      const proprietes = feature?.properties || {};
      const source = entree || proprietes;
      if (type === "acces") {
        return "🚙";
      }
      if (type === "appareils") {
        return "💡";
      }
      const estHorsOuSpecial =
        estHorsPatrimoine(source?.hors_patrimoine) ||
        estHorsPatrimoine(source?.special) ||
        estHorsPatrimoine(proprietes?.hors_patrimoine) ||
        estHorsPatrimoine(proprietes?.special) ||
        Number(proprietes?.hors_patrimoine_count) > 0;
      return estHorsOuSpecial ? "🗂️" : "📍";
    }

    function estResultatHorsPatrimoine(type, feature, entree) {
      if (type !== "postes" && type !== "appareils") {
        return false;
      }
      const proprietes = feature?.properties || {};
      const source = entree || proprietes;
      return Boolean(
        estHorsPatrimoine(source?.hors_patrimoine) ||
          estHorsPatrimoine(proprietes?.hors_patrimoine)
      );
    }

    function construireTitreResultat(type, entree) {
      const nom = champCompletOuVide(entree?.nom);
      const typeSupport = champCompletOuVide(entree?.type);
      const sat = champCompletOuVide(entree?.SAT ?? entree?.sat);
      const acces = champCompletOuVide(entree?.acces);
      const appareil = champCompletOuVide(entree?.appareil);
      const joindre = (segments) => segments.filter(Boolean).join(" / ");
      const joindreAvecEspaces = (segments) => segments.filter(Boolean).join(" ");
      const formaterAcces = (valeurAcces) => {
        const texte = champCompletOuVide(valeurAcces);
        if (!texte) {
          return "";
        }
        const numero = texte.replace(/^acc(?:e|è)s?\s*(?:n[°o])?\s*/i, "").trim();
        const valeur = numero || texte;
        return `(acces n°${valeur})`;
      };

      if (type === "acces") {
        const prefixe = joindreAvecEspaces([nom, typeSupport, sat]);
        const suffixeAcces = formaterAcces(acces);
        const titreAcces = joindreAvecEspaces([prefixe, suffixeAcces]);
        return titreAcces || "Acces";
      }

      if (type === "appareils") {
        const contexteNomType = joindreAvecEspaces([nom, typeSupport]);
        const contexteAppareil = [contexteNomType, sat].filter(Boolean).join(" / ");
        if (appareil) {
          return contexteAppareil ? `${appareil} (${contexteAppareil})` : appareil;
        }
        return contexteAppareil ? `Appareil (${contexteAppareil})` : "Appareil";
      }

      return joindreAvecEspaces([nom, typeSupport, sat]) || "Poste";
    }

    function construireResultatsProximite(longitude, latitude) {
      const pointUtilisateur = [longitude, latitude];
      const ensembles = [
        { type: "postes", donnees: getDonneesPostes?.() },
        { type: "acces", donnees: getDonneesAcces?.() },
        { type: "appareils", donnees: getDonneesAppareils?.() }
      ];
      const resultats = [];

      for (const { type, donnees } of ensembles) {
        for (const feature of donnees?.features || []) {
          const [lng, lat] = feature?.geometry?.coordinates || [];
          if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
            continue;
          }
          const distanceMetres = obtenirDistanceMetres(pointUtilisateur, [lng, lat]);
          const cleListe = type === "postes" ? "postes_liste_json" : type === "acces" ? "acces_liste_json" : "appareils_liste_json";
          const listeEntrees = extraireListeDepuisFeature(feature, cleListe);
          for (const entree of listeEntrees) {
            const estHorsPatrimoine = estResultatHorsPatrimoine(type, feature, entree);
            resultats.push({
              type,
              longitude: lng,
              latitude: lat,
              distanceMetres,
              icone: determinerIconeResultat(type, feature, entree),
              estHorsPatrimoine,
              titre: construireTitreResultat(type, entree)
            });
          }
        }
      }

      return resultats.sort((a, b) => a.distanceMetres - b.distanceMetres);
    }

    function afficherResultats() {
      if (!listeResultats) {
        return;
      }
      if (!Array.isArray(tousResultats) || !tousResultats.length) {
        listeResultats.innerHTML = "";
        return;
      }

      const visibles = tousResultats.slice(0, limiteAffichage);
      const peutVoirPlus = limiteAffichage < tousResultats.length;

      listeResultats.innerHTML = visibles
        .map((resultat) => {
          const titrePrincipal = echapperHtml(`${resultat.icone} ${resultat.titre}`);
          const badgeHp = resultat.estHorsPatrimoine ? '<span class="modal-localisation-pill-hp">HP</span>' : "";
          return `<li class="modal-localisation-resultat-item"><div class="modal-localisation-resultat-corps"><div class="modal-localisation-resultat-texte"><strong>${titrePrincipal}${badgeHp}</strong><span class="modal-localisation-resultat-distance">${echapperHtml(
            formaterDistanceMetres(resultat.distanceMetres)
          )}</span></div><button class="popup-bouton-itineraire modal-localisation-resultat-action" type="button" data-type="${echapperHtml(
            resultat.type
          )}" data-lng="${resultat.longitude}" data-lat="${resultat.latitude}">Voir la fiche</button></div></li>`;
        })
        .join("");

      if (peutVoirPlus) {
        listeResultats.insertAdjacentHTML(
          "beforeend",
          '<li class="modal-localisation-voir-plus-wrap"><button class="popup-bouton-itineraire modal-localisation-voir-plus" type="button">➕ Voir Plus</button></li>'
        );
      }
    }

    async function ouvrirResultat(type, longitude, latitude) {
      if (!type || !Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        return;
      }

      try {
        await activerFiltrePourType(type);
        appliquerCouchesDonnees();
        remonterCouchesDonnees();
      } catch (erreur) {
        console.error(`Impossible d'activer la couche ${type}`, erreur);
      }

      fermer();

      let popupOuverte = false;
      const ouvrirPopup = () => {
        if (popupOuverte) {
          return;
        }
        popupOuverte = true;
        ouvrirPopupDepuisCoordonneesPourType(type, longitude, latitude, { fallbackGenerique: false });
      };
      naviguerVersCoordonneesPuisOuvrirPopup(longitude, latitude, ouvrirPopup, {
        zoomMin: 14.8,
        durationDouxMs: 420
      });
    }

    async function localiser(options) {
      const avecPanneau = Boolean(options?.avecPanneau);

      if (avecPanneau) {
        ouvrir();
        definirEtat("Localisation en cours...");
        viderResultats();
      }

      try {
        const [position] = await Promise.all([
          obtenirPositionUtilisateur(),
          Promise.allSettled([chargerDonneesAcces(), chargerDonneesPostes(), chargerDonneesAppareils()])
        ]);

        const longitude = Number(position?.longitude);
        const latitude = Number(position?.latitude);
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          throw new Error("Position GPS invalide.");
        }

        carte.flyTo({
          center: [longitude, latitude],
          zoom: Math.max(carte.getZoom(), 15.5),
          essential: true
        });
        demarrerClignotementLocalisation(longitude, latitude);

        if (!avecPanneau) {
          return;
        }

        tousResultats = construireResultatsProximite(longitude, latitude);
        limiteAffichage = Math.min(TAILLE_PAGE_RESULTATS, tousResultats.length);

        if (!tousResultats.length) {
          definirEtat("Aucun resultat proche trouve.", true);
          return;
        }

        definirEtat(`${tousResultats.length} resultats proches trouves.`);
        afficherResultats();
      } catch (erreur) {
        const message = String(erreur?.message || "Impossible de recuperer votre position.");
        if (avecPanneau) {
          definirEtat(message, true);
          return;
        }
        alert(message);
      }
    }

    boutonFermer?.addEventListener("click", fermer);

    modal?.addEventListener("click", (event) => {
      if (event.target === modal) {
        fermer();
      }
    });

    listeResultats?.addEventListener("click", (event) => {
      const boutonVoirPlus =
        event.target instanceof Element ? event.target.closest(".modal-localisation-voir-plus") : null;
      if (boutonVoirPlus) {
        limiteAffichage = Math.min(tousResultats.length, limiteAffichage + TAILLE_PAGE_RESULTATS);
        afficherResultats();
        return;
      }

      const bouton = event.target instanceof Element ? event.target.closest(".modal-localisation-resultat-action") : null;
      if (!bouton) {
        return;
      }

      const type = String(bouton.getAttribute("data-type") || "").trim();
      const longitude = Number(bouton.getAttribute("data-lng"));
      const latitude = Number(bouton.getAttribute("data-lat"));
      ouvrirResultat(type, longitude, latitude);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && estOuverte()) {
        fermer();
      }
    });

    return {
      localiserSimple() {
        localiser({ avecPanneau: false });
      },
      localiserEtAfficher() {
        localiser({ avecPanneau: true });
      },
      fermer
    };
  };
})();
