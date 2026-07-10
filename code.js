(function (global) {
  const DEFAULT_POWERAPPS_CODES_URL =
    "https://apps.powerapps.com/play/e/91a9a793-eabc-4be4-b4f4-d19d551f0072/a/a11716b8-c506-4cd0-b3fe-e473f5cac6df?tenantId=4a7c8238-5799-4b16-9fc6-9ad8fce5a7d9&hint=df125c6d-1cef-40a0-b374-ded8ad732cca&sourcetime=1771534440220";

  function fallbackChampCompletOuVide(valeur) {
    return String(valeur || "").trim();
  }

  function fallbackEchapperHtml(valeur) {
    return String(valeur || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function estCodeDisponible(valeur) {
    if (valeur === true) {
      return true;
    }
    const texte = String(valeur || "")
      .trim()
      .toLowerCase();
    return texte === "true" || texte === "1" || texte === "oui" || texte === "yes";
  }

  function construireLienCodesAcces(acces) {
    const champCompletOuVide = global.champCompletOuVide || fallbackChampCompletOuVide;
    const baseUrl = global.URL_POWERAPPS_CODES || DEFAULT_POWERAPPS_CODES_URL;
    const url = new URL(baseUrl);
    const poste = champCompletOuVide(acces?.nom);
    const type = champCompletOuVide(acces?.type);
    const sat = champCompletOuVide(acces?.SAT);
    const accesAppareil = champCompletOuVide(acces?.acces || acces?.acces_appareil);

    if (poste) {
      url.searchParams.set("poste", poste);
    } else {
      url.searchParams.delete("poste");
    }
    if (type) {
      url.searchParams.set("type", type);
      url.searchParams.set("type_poste", type);
    } else {
      url.searchParams.delete("type");
      url.searchParams.delete("type_poste");
    }

    if (sat) {
      url.searchParams.set("sat", sat);
    } else {
      url.searchParams.delete("sat");
    }

    if (accesAppareil) {
      url.searchParams.set("acces", accesAppareil);
      url.searchParams.set("acces_appareil", accesAppareil);
    } else {
      url.searchParams.delete("acces");
      url.searchParams.delete("acces_appareil");
    }

    return url.toString();
  }

  function construireLibelleChoixAcces(acces) {
    const champCompletOuVide = global.champCompletOuVide || fallbackChampCompletOuVide;
    const nom = champCompletOuVide(acces?.nom);
    const type = champCompletOuVide(acces?.type);
    const sat = champCompletOuVide(acces?.SAT);
    const accesAppareil = champCompletOuVide(acces?.acces || acces?.acces_appareil);
    const base = [nom, type, sat].filter(Boolean).join(" ").trim() || "Accès";
    const suffixeAcces = accesAppareil ? ` (accès ${accesAppareil})` : "";
    return `🔐 ${base}${suffixeAcces}`;
  }

  function dedoublonnerChoixAcces(accesListe) {
    const uniques = [];
    const vus = new Set();
    for (const acces of accesListe) {
      const cle = [
        String(acces?.nom || "").trim().toLowerCase(),
        String(acces?.type || "").trim().toLowerCase(),
        String(acces?.SAT || "").trim().toLowerCase(),
        String(acces?.acces || acces?.acces_appareil || "").trim().toLowerCase()
      ].join("|");
      if (vus.has(cle)) {
        continue;
      }
      vus.add(cle);
      uniques.push(acces);
    }
    return uniques;
  }

  function construireChoixCodes(featureAcces) {
    const extraireListeDepuisFeature = global.extraireListeDepuisFeature;
    if (typeof extraireListeDepuisFeature !== "function") {
      return [];
    }

    const accesListe = extraireListeDepuisFeature(featureAcces, "acces_liste_json");
    const eligibles = accesListe.filter((acces) => estCodeDisponible(acces?.code));
    const uniques = dedoublonnerChoixAcces(eligibles);
    return uniques.map((acces) => ({
      label: construireLibelleChoixAcces(acces),
      url: construireLienCodesAcces(acces)
    }));
  }

  function construireChoixCodesPostes(featurePostes) {
    const extraireListeDepuisFeature = global.extraireListeDepuisFeature;
    if (typeof extraireListeDepuisFeature !== "function") {
      return [];
    }

    const postesListe = extraireListeDepuisFeature(featurePostes, "postes_liste_json");
    const eligibles = postesListe.filter((poste) => estCodeDisponible(poste?.code));
    const uniques = dedoublonnerChoixAcces(eligibles);
    return uniques.map((poste) => ({
      label: construireLibelleChoixAcces(poste),
      url: construireLienCodesAcces(poste)
    }));
  }

  function construireSectionBoutonCodes(featureAcces) {
    const echapperHtml = global.echapperHtml || fallbackEchapperHtml;
    const choix = construireChoixCodes(featureAcces);
    if (!choix.length) {
      return "";
    }
    const pillEspaceSecurise =
      '<div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Espace sécurisé</span></div>';

    if (choix.length === 1) {
      return `<section class="popup-section popup-section-codes">${pillEspaceSecurise}<button class="popup-bouton-itineraire popup-bouton-codes" id="popup-afficher-codes-acces" type="button" data-mode="direct" data-url="${echapperHtml(choix[0].url)}">🔐 Informations d’accès</button></section>`;
    }

    const optionsChoix = choix
      .map(
        (option) =>
          `<option value="${echapperHtml(option.url)}">${echapperHtml(option.label)}</option>`
      )
      .join("");
    return `<section class="popup-section popup-section-codes">${pillEspaceSecurise}<button class="popup-bouton-itineraire popup-bouton-codes" id="popup-afficher-codes-acces" type="button" data-mode="choix">🔐 Informations d’accès</button><select class="popup-codes-select" id="popup-codes-select" hidden><option value="">🔐 Choisir un poste</option>${optionsChoix}</select></section>`;
  }

  function construireSectionBoutonCodesPostes(featurePostes) {
    const echapperHtml = global.echapperHtml || fallbackEchapperHtml;
    const choix = construireChoixCodesPostes(featurePostes);
    if (!choix.length) {
      return "";
    }
    const pillEspaceSecurise =
      '<div class="popup-section-titre popup-section-titre-gauche"><span class="popup-badge popup-badge-itineraire">Espace sécurisé</span></div>';

    if (choix.length === 1) {
      return `<section class="popup-section popup-section-codes">${pillEspaceSecurise}<button class="popup-bouton-itineraire popup-bouton-codes" id="popup-afficher-codes-acces" type="button" data-mode="direct" data-url="${echapperHtml(choix[0].url)}">🔐 Informations d’accès</button></section>`;
    }

    const optionsChoix = choix
      .map(
        (option) =>
          `<option value="${echapperHtml(option.url)}">${echapperHtml(option.label)}</option>`
      )
      .join("");
    return `<section class="popup-section popup-section-codes">${pillEspaceSecurise}<button class="popup-bouton-itineraire popup-bouton-codes" id="popup-afficher-codes-acces" type="button" data-mode="choix">🔐 Informations d’accès</button><select class="popup-codes-select" id="popup-codes-select" hidden><option value="">🔐 Choisir un poste</option>${optionsChoix}</select></section>`;
  }

  global.URL_POWERAPPS_CODES = global.URL_POWERAPPS_CODES || DEFAULT_POWERAPPS_CODES_URL;
  global.estCodeDisponible = estCodeDisponible;
  global.construireLienCodesAcces = construireLienCodesAcces;
  global.construireChoixCodes = construireChoixCodes;
  global.construireChoixCodesPostes = construireChoixCodesPostes;
  global.construireSectionBoutonCodes = construireSectionBoutonCodes;
  global.construireSectionBoutonCodesPostes = construireSectionBoutonCodesPostes;
})(window);
