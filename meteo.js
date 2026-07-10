(function () {
  const HEURES_PREVISION = 6;
  const DOSSIER_ICONES = "icons/meteo";
  const cacheMeteo = new Map();
  let signatureFicheActive = "";
  let vueFicheOriginale = "";
  let vueMeteoActive = false;
  let signatureBoutonMeteo = "";
  let iconeBoutonCourante = `${DOSSIER_ICONES}/clear-day.svg`;
  let themeBoutonCourant = "neutre";

  function arrondirCoordonnee(valeur) {
    return Math.round(Number(valeur) * 10000) / 10000;
  }

  function creerCleCache(latitude, longitude) {
    return `${arrondirCoordonnee(latitude)},${arrondirCoordonnee(longitude)}`;
  }

  function formaterTemperature(valeur) {
    return `${Math.round(Number(valeur) || 0)}°C`;
  }

  function formaterPluie(valeur) {
    const nombre = Number(valeur) || 0;
    return `${nombre.toFixed(nombre >= 10 ? 0 : 1)} mm`;
  }

  function formaterPluieCourte(valeur) {
    return formaterPluie(valeur);
  }

  function formaterVent(valeur) {
    return `${Math.round(Number(valeur) || 0)} km/h`;
  }

  function formaterVentCourt(valeur) {
    return formaterVent(valeur);
  }

  function formaterLibelleHeure(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return "";
    }
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function echapperHtml(valeur) {
    return String(valeur || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function obtenirCoordonneesDepuisFiche(conteneur) {
    if (!(conteneur instanceof Element)) {
      return null;
    }
    const element = conteneur.querySelector("[data-lng][data-lat]");
    if (!(element instanceof HTMLElement)) {
      return null;
    }
    const longitude = Number(element.dataset.lng);
    const latitude = Number(element.dataset.lat);
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return null;
    }
    return { latitude, longitude };
  }

  function extraireLibelleReferenceDepuisFiche(conteneur) {
    if (!(conteneur instanceof Element)) {
      return null;
    }

    const contientLibelleSpecial = (texte) => /\((?:equipe|équipe)\)/i.test(String(texte || ""));

    const accesMutualise = conteneur.querySelector(".popup-badge-acces");
    if (accesMutualise) {
      return null;
    }

    const elementHorsPatrimoine = conteneur.querySelector(".popup-item-hors, .popup-acces-ligne-hp");
    const tagHpPrincipal = conteneur.querySelector(".popup-poste-entete-principal .popup-tag-hp, .popup-acces-titre .popup-tag-hp");
    if (elementHorsPatrimoine || tagHpPrincipal) {
      return null;
    }

    const titrePoste = conteneur.querySelector(".popup-poste-entete-principal");
    if (titrePoste?.textContent) {
      const libelle = titrePoste.textContent.replace(/^📍\s*/, "").trim();
      if (contientLibelleSpecial(libelle)) {
        return null;
      }
      return libelle;
    }

    const premierPosteListe = conteneur.querySelector(".popup-badge-postes + ul .popup-acces-ligne");
    if (premierPosteListe?.textContent) {
      const libelle = premierPosteListe.textContent.replace(/^🚗\s*/, "").trim();
      if (contientLibelleSpecial(libelle)) {
        return null;
      }
      return libelle;
    }

    const titreAcces = conteneur.querySelector(".popup-acces-titre");
    if (titreAcces?.textContent) {
      const libelle = titreAcces.textContent.replace(/^🚗\s*/, "").trim();
      if (contientLibelleSpecial(libelle)) {
        return null;
      }
      return libelle;
    }

    const ligneAcces = conteneur.querySelector(".popup-acces-ligne");
    if (ligneAcces?.textContent) {
      const libelle = ligneAcces.textContent.replace(/^🚗\s*/, "").trim();
      if (contientLibelleSpecial(libelle)) {
        return null;
      }
      return libelle;
    }

    return null;
  }

  async function chargerDonneesMeteo(latitude, longitude) {
    const cle = creerCleCache(latitude, longitude);
    if (cacheMeteo.has(cle)) {
      return cacheMeteo.get(cle);
    }

    const url = new URL("https://api.open-meteo.com/v1/meteofrance");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current", "temperature_2m,precipitation,wind_speed_10m,weather_code,is_day");
    url.searchParams.set("hourly", "temperature_2m,precipitation,wind_speed_10m,weather_code,is_day");
    url.searchParams.set("forecast_hours", String(HEURES_PREVISION + 1));
    url.searchParams.set("timezone", "auto");

    const promesse = fetch(url.toString(), { cache: "no-store" }).then(async (reponse) => {
      if (!reponse.ok) {
        throw new Error(`Open-Meteo ${reponse.status}`);
      }
      return reponse.json();
    });

    cacheMeteo.set(cle, promesse);
    return promesse;
  }

  function extraireSerieHoraire(donnees) {
    const temps = Array.isArray(donnees?.hourly?.time) ? donnees.hourly.time : [];
    const temperatures = Array.isArray(donnees?.hourly?.temperature_2m) ? donnees.hourly.temperature_2m : [];
    const precipitations = Array.isArray(donnees?.hourly?.precipitation) ? donnees.hourly.precipitation : [];
    const vents = Array.isArray(donnees?.hourly?.wind_speed_10m) ? donnees.hourly.wind_speed_10m : [];
    const weatherCodes = Array.isArray(donnees?.hourly?.weather_code) ? donnees.hourly.weather_code : [];
    const isDay = Array.isArray(donnees?.hourly?.is_day) ? donnees.hourly.is_day : [];
    const serie = [];

    for (let index = 0; index < Math.min(temps.length, HEURES_PREVISION + 1); index += 1) {
      serie.push({
        index,
        date: new Date(temps[index]),
        temperature: temperatures[index],
        precipitation: precipitations[index],
        wind: vents[index],
        weatherCode: weatherCodes[index],
        isDay: isDay[index]
      });
    }
    return serie;
  }

  function obtenirFichierIcone(weatherCode, isDay, precipitation) {
    const code = Number(weatherCode);
    const jour = Number(isDay) === 1;
    const precipitationValue = Number(precipitation) || 0;
    const pluieLegereVisible = precipitationValue >= 0.05;
    const pluieVisible = precipitationValue >= 0.1;
    const pluieForte = precipitationValue >= 4;
    const familleNuage =
      code === 0 ? "clear" : code === 1 || code === 2 ? "partly" : code === 3 ? "overcast" : "overcast";

    const iconeCiel = () => {
      if (familleNuage === "clear") {
        return jour ? "clear-day.svg" : "clear-night.svg";
      }
      if (familleNuage === "partly") {
        return jour ? "partly-cloudy-day.svg" : "partly-cloudy-night.svg";
      }
      return jour ? "overcast-day.svg" : "overcast-night.svg";
    };

    const iconeBruine = () => {
      if (familleNuage === "partly") {
        return jour ? "partly-cloudy-day-drizzle.svg" : "partly-cloudy-night-drizzle.svg";
      }
      return jour ? "overcast-day-drizzle.svg" : "overcast-night-drizzle.svg";
    };

    const iconePluie = () => {
      if (pluieForte) {
        return jour ? "extreme-day-rain.svg" : "extreme-night-rain.svg";
      }
      if (familleNuage === "partly") {
        return jour ? "partly-cloudy-day-rain.svg" : "partly-cloudy-night-rain.svg";
      }
      return jour ? "overcast-day-rain.svg" : "overcast-night-rain.svg";
    };

    const iconeSleet = () => {
      if (familleNuage === "partly") {
        return jour ? "partly-cloudy-day-sleet.svg" : "partly-cloudy-night-sleet.svg";
      }
      return jour ? "overcast-day-sleet.svg" : "overcast-night-sleet.svg";
    };

    const iconeNeige = () => {
      if (pluieForte || code === 75) {
        return jour ? "extreme-day-snow.svg" : "extreme-night-snow.svg";
      }
      if (familleNuage === "partly") {
        return jour ? "partly-cloudy-day-snow.svg" : "partly-cloudy-night-snow.svg";
      }
      return jour ? "overcast-day-snow.svg" : "overcast-night-snow.svg";
    };

    if (code === 95) {
      return jour ? "thunderstorms-day.svg" : "thunderstorms-night.svg";
    }
    if ([96, 99].includes(code)) {
      return jour ? "thunderstorms-day-overcast-rain.svg" : "thunderstorms-night-overcast-rain.svg";
    }

    if (code === 45) {
      return jour ? "fog-day.svg" : "fog-night.svg";
    }
    if (code === 48) {
      return jour ? "overcast-day-fog.svg" : "overcast-night-fog.svg";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return iconeNeige();
    }
    if ([56, 57, 66, 67].includes(code)) {
      return pluieLegereVisible ? iconeSleet() : iconeCiel();
    }
    if ([51, 53, 55].includes(code)) {
      return pluieLegereVisible ? iconeBruine() : iconeCiel();
    }

    if ([61, 63, 65, 80, 81, 82].includes(code)) {
      return pluieVisible ? iconePluie() : iconeCiel();
    }

    if (pluieForte) {
      return iconePluie();
    }
    if (pluieVisible && familleNuage !== "clear") {
      return iconePluie();
    }
    if (pluieLegereVisible && familleNuage !== "clear") {
      return iconeBruine();
    }

    return iconeCiel();
  }

  function obtenirCheminIcone(weatherCode, isDay, precipitation) {
    return `${DOSSIER_ICONES}/${obtenirFichierIcone(weatherCode, isDay, precipitation)}`;
  }

  function obtenirMarkupIcone(weatherCode, isDay, precipitation, classe, alt) {
    return `<img class="${classe}" src="${obtenirCheminIcone(weatherCode, isDay, precipitation)}" alt="${alt || ""}" loading="lazy" decoding="async">`;
  }

  function obtenirThemeMeteo(weatherCode) {
    const code = Number(weatherCode);
    if (code === 0) {
      return "soleil";
    }
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      return "pluie";
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return "neige";
    }
    if ([95, 96, 99].includes(code)) {
      return "orage";
    }
    if ([45, 48, 1, 2, 3].includes(code)) {
      return "nuage";
    }
    return "neutre";
  }

  function obtenirLibelleCondition(weatherCode, isDay) {
    const code = Number(weatherCode);
    const jour = Number(isDay) === 1;
    if (code === 0) {
      return jour ? "Ensoleillé" : "Ciel dégagé";
    }
    if (code === 1) {
      return "Peu nuageux";
    }
    if (code === 2) {
      return "Partiellement couvert";
    }
    if (code === 3) {
      return "Couvert";
    }
    if (code === 45) {
      return "Brume";
    }
    if (code === 48) {
      return "Brouillard";
    }
    if ([51, 53, 55].includes(code)) {
      return "Bruine";
    }
    if ([56, 57].includes(code)) {
      return "Bruine verglaçante";
    }
    if ([61, 63, 65].includes(code)) {
      return "Pluie";
    }
    if ([66, 67].includes(code)) {
      return "Pluie verglaçante";
    }
    if ([71, 73, 75, 77].includes(code)) {
      return "Neige";
    }
    if ([80, 81, 82].includes(code)) {
      return "Averses";
    }
    if ([85, 86].includes(code)) {
      return "Averses de neige";
    }
    if (code === 95) {
      return "Orage";
    }
    if ([96, 99].includes(code)) {
      return "Orage avec grêle";
    }
    return jour ? "Temps variable" : "Ciel nocturne";
  }

  function construireVueMeteo(libelleReference) {
    return `
      <div class="popup-carte">
        <section class="popup-section popup-meteo-section">
          <div class="popup-meteo-contenu">
            <p class="popup-meteo-note">Chargement de la météo locale...</p>
          </div>
        </section>
      </div>
    `;
  }

  function mettreAJourAffichageMeteo(conteneur, donnees) {
    const contenu = conteneur.querySelector(".popup-meteo-contenu");
    if (!contenu) {
      return;
    }

    const serie = extraireSerieHoraire(donnees);
    const courant = {
      time: donnees?.current?.time,
      temperature: donnees?.current?.temperature_2m,
      precipitation: donnees?.current?.precipitation,
      wind: donnees?.current?.wind_speed_10m,
      weatherCode: donnees?.current?.weather_code,
      isDay: donnees?.current?.is_day
    };
    const dateCourante = courant.time ? new Date(courant.time) : null;
    const horodatageCourant = formaterLibelleHeure(dateCourante);
    const conditionCourante = obtenirLibelleCondition(courant.weatherCode, courant.isDay);
    const libelleReference = (contenu.dataset.libelleReference || "").trim();
    const titreComplet = libelleReference ? `Météo locale au poste de ${libelleReference}` : "";
    const titreCompletHtml = titreComplet
      ? `<p class="popup-meteo-titre">${echapperHtml(titreComplet)}</p>`
      : "";

    contenu.innerHTML = `
      <div class="popup-meteo-hero">
        <div class="popup-meteo-hero-contenu">
          <div class="popup-meteo-entete">
            <div class="popup-meteo-hero-icone">
              ${obtenirMarkupIcone(courant.weatherCode, courant.isDay, courant.precipitation, "popup-meteo-icone-image", conditionCourante)}
            </div>
            ${titreCompletHtml}
            <p class="popup-meteo-hero-temperature">${formaterTemperature(courant.temperature)}</p>
            <p class="popup-meteo-hero-condition">${conditionCourante}</p>
          </div>
          <div class="popup-meteo-hero-meta">
            <span class="popup-meteo-hero-pill">
              <img class="popup-meteo-pill-icone" src="${DOSSIER_ICONES}/rain.svg" alt="" loading="lazy" decoding="async">
              ${formaterPluie(courant.precipitation)}
            </span>
            <span class="popup-meteo-hero-pill">
              <img class="popup-meteo-pill-icone" src="${DOSSIER_ICONES}/wind.svg" alt="" loading="lazy" decoding="async">
              ${formaterVent(courant.wind)}
            </span>
          </div>
          <p class="popup-meteo-horodatage">${horodatageCourant ? `Mise à jour météo : ${horodatageCourant}` : ""}</p>
        </div>
      </div>
      <div class="popup-meteo-timeline">
        ${serie
          .slice(1)
          .map((entree, index) => {
            const decalage = index + 1;
            const condition = obtenirLibelleCondition(entree.weatherCode, entree.isDay);
            return `<div class="popup-meteo-slot">
              <span class="popup-meteo-slot-heure">+${decalage}h</span>
              <span class="popup-meteo-slot-icone">${obtenirMarkupIcone(entree.weatherCode, entree.isDay, entree.precipitation, "popup-meteo-icone-image", condition)}</span>
              <span class="popup-meteo-slot-temperature">${formaterTemperature(entree.temperature)}</span>
              <span class="popup-meteo-slot-detail">
                <span>${formaterPluieCourte(entree.precipitation)}</span>
                <span>${formaterVentCourt(entree.wind)}</span>
              </span>
            </div>`;
          })
          .join("")}
      </div>
      <p class="popup-meteo-note">Aperçu heure par heure des prochaines conditions.</p>
      <p class="popup-meteo-source">Source : <a href="https://open-meteo.com/en/docs/meteofrance-api" target="_blank" rel="noopener noreferrer">Open-Meteo Météo-France API</a>. Données affichées à titre informatif.</p>
    `;
  }

  function afficherErreurMeteo(conteneur) {
    const contenu = conteneur.querySelector(".popup-meteo-contenu");
    if (!contenu) {
      return;
    }
    contenu.innerHTML = `<p class="popup-meteo-erreur">La météo n'a pas pu être chargée pour cette fiche.</p>`;
  }

  function obtenirBoutonMeteo() {
    return document.getElementById("modal-fiche-meteo");
  }

  function supprimerBoutonMeteo() {
    obtenirBoutonMeteo()?.remove();
  }

  function peutAfficherBoutonMeteo() {
    const carteModale = document.querySelector(".modal-fiche-carte");
    const conteneur = document.getElementById("modal-fiche-contenu");
    if (!(carteModale instanceof Element) || !(conteneur instanceof Element)) {
      return false;
    }
    if (vueMeteoActive) {
      return true;
    }
    if (carteModale.closest(".modal-fiche.est-vue-appareils-associes")) {
      return false;
    }
    return Boolean(obtenirCoordonneesDepuisFiche(conteneur));
  }

  function obtenirIconeMeteo(chemin = iconeBoutonCourante) {
    return `
      <span class="modal-fiche-meteo-icone" aria-hidden="true">
        <img src="${chemin}" alt="" loading="lazy" decoding="async">
      </span>
    `;
  }

  function obtenirIconeRetour() {
    return `
      <span class="modal-fiche-meteo-icone" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M15 5 8 12l7 7" />
        </svg>
      </span>
    `;
  }

  function mettreAJourEtatBoutonMeteo() {
    const bouton = obtenirBoutonMeteo();
    if (!bouton) {
      return;
    }
    const boutonPartager = document.getElementById("modal-fiche-partager");
    bouton.classList.toggle("est-active", vueMeteoActive);
    bouton.setAttribute("aria-pressed", vueMeteoActive ? "true" : "false");
    bouton.setAttribute("aria-label", vueMeteoActive ? "Revenir à la fiche" : "Afficher la météo");
    bouton.title = vueMeteoActive ? "Revenir à la fiche" : "Afficher la météo";
    bouton.innerHTML = vueMeteoActive ? obtenirIconeRetour() : obtenirIconeMeteo();
    bouton.dataset.meteoTheme = vueMeteoActive ? "retour" : themeBoutonCourant;
    if (boutonPartager) {
      boutonPartager.hidden = vueMeteoActive;
      boutonPartager.style.display = vueMeteoActive ? "none" : "";
    }
    bouton.classList.toggle("est-compact", vueMeteoActive);
  }

  async function rafraichirIconeBoutonMeteo() {
    if (vueMeteoActive) {
      return;
    }

    const conteneur = document.getElementById("modal-fiche-contenu");
    const bouton = obtenirBoutonMeteo();
    if (!(conteneur instanceof Element) || !(bouton instanceof HTMLElement)) {
      return;
    }

    const coordonnees = obtenirCoordonneesDepuisFiche(conteneur);
    if (!coordonnees) {
      iconeBoutonCourante = `${DOSSIER_ICONES}/clear-day.svg`;
      mettreAJourEtatBoutonMeteo();
      return;
    }

    const signature = creerCleCache(coordonnees.latitude, coordonnees.longitude);
    signatureBoutonMeteo = signature;

    try {
      const donnees = await chargerDonneesMeteo(coordonnees.latitude, coordonnees.longitude);
      if (signatureBoutonMeteo !== signature || vueMeteoActive) {
        return;
      }
      iconeBoutonCourante = obtenirCheminIcone(donnees?.current?.weather_code, donnees?.current?.is_day);
      themeBoutonCourant = obtenirThemeMeteo(donnees?.current?.weather_code);
      mettreAJourEtatBoutonMeteo();
    } catch {
      if (signatureBoutonMeteo !== signature || vueMeteoActive) {
        return;
      }
      iconeBoutonCourante = `${DOSSIER_ICONES}/clear-day.svg`;
      themeBoutonCourant = "neutre";
      mettreAJourEtatBoutonMeteo();
    }
  }

  function assurerBoutonMeteo() {
    const carteModale = document.querySelector(".modal-fiche-carte");
    if (!peutAfficherBoutonMeteo()) {
      supprimerBoutonMeteo();
      return;
    }
    if (!(carteModale instanceof Element) || obtenirBoutonMeteo()) {
      mettreAJourEtatBoutonMeteo();
      return;
    }

    const bouton = document.createElement("button");
    bouton.className = "modal-fiche-meteo";
    bouton.id = "modal-fiche-meteo";
    bouton.type = "button";
    bouton.setAttribute("aria-label", "Afficher la météo");
    bouton.innerHTML = obtenirIconeMeteo();
    carteModale.appendChild(bouton);
    bouton.addEventListener("click", () => {
      if (vueMeteoActive) {
        restaurerVueFiche();
        return;
      }
      afficherVueMeteo();
    });
    mettreAJourEtatBoutonMeteo();
    rafraichirIconeBoutonMeteo();
  }

  function restaurerVueFiche() {
    const conteneur = document.getElementById("modal-fiche-contenu");
    if (!(conteneur instanceof Element) || !vueFicheOriginale) {
      return;
    }
    vueMeteoActive = false;
    conteneur.innerHTML = vueFicheOriginale;
    mettreAJourEtatBoutonMeteo();
    rafraichirIconeBoutonMeteo();
    if (typeof window.attacherActionsPopupInterne === "function") {
      window.attacherActionsPopupInterne();
    } else if (typeof attacherActionsPopupInterne === "function") {
      attacherActionsPopupInterne();
    }
  }

  async function afficherVueMeteo() {
    const conteneur = document.getElementById("modal-fiche-contenu");
    if (!(conteneur instanceof Element) || !conteneur.children.length) {
      return;
    }

    const coordonnees = obtenirCoordonneesDepuisFiche(conteneur);
    if (!coordonnees) {
      return;
    }

    const signature = creerCleCache(coordonnees.latitude, coordonnees.longitude);
    const libelleReference = extraireLibelleReferenceDepuisFiche(conteneur);
    if (!vueMeteoActive) {
      vueFicheOriginale = conteneur.innerHTML;
    }
    signatureFicheActive = signature;
    vueMeteoActive = true;
    conteneur.innerHTML = construireVueMeteo(libelleReference);
    const contenuMeteo = conteneur.querySelector(".popup-meteo-contenu");
    if (contenuMeteo instanceof HTMLElement) {
      contenuMeteo.dataset.libelleReference = typeof libelleReference === "string" ? libelleReference.trim() : "";
    }
    mettreAJourEtatBoutonMeteo();

    try {
      const donnees = await chargerDonneesMeteo(coordonnees.latitude, coordonnees.longitude);
      if (signatureFicheActive !== signature) {
        return;
      }
      mettreAJourAffichageMeteo(conteneur, donnees);
    } catch {
      if (signatureFicheActive !== signature) {
        return;
      }
      afficherErreurMeteo(conteneur);
    }
  }

  function initialiserMeteoModal() {
    const cible = document.getElementById("modal-fiche-contenu");
    if (!(cible instanceof Element)) {
      return;
    }

    const observer = new MutationObserver(() => {
      const contientVueMeteo = Boolean(cible.querySelector(".popup-meteo-section"));
      if (!contientVueMeteo) {
        vueMeteoActive = false;
        vueFicheOriginale = cible.innerHTML;
      }
      assurerBoutonMeteo();
      if (!contientVueMeteo) {
        rafraichirIconeBoutonMeteo();
      }
    });

    observer.observe(cible, {
      childList: true,
      subtree: true
    });

    assurerBoutonMeteo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiserMeteoModal, { once: true });
  } else {
    initialiserMeteoModal();
  }
})();
