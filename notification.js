(function () {
  const SHEET_ID = "1cBRNy-Ihlrz82SYeENPLoHDNm32nedQ0Gyia17-rYwY";
  const SHEET_NAME = "notification";
  const URL_NOTIFICATIONS = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
  const CLE_VU_PREFIX = "alice.notification.vu.";
  const DUREE_AFFICHAGE_MS = 7000;

  function parserGvizJson(texte) {
    const debut = texte.indexOf("{");
    const fin = texte.lastIndexOf("}");
    if (debut < 0 || fin < 0 || fin <= debut) {
      throw new Error("Reponse gviz invalide");
    }
    return JSON.parse(texte.slice(debut, fin + 1));
  }

  function convertirDateGviz(valeur) {
    if (!valeur) {
      return null;
    }
    if (valeur instanceof Date) {
      return valeur;
    }
    if (typeof valeur === "string" && valeur.startsWith("Date(")) {
      const nums = valeur.match(/\d+/g)?.map((v) => Number(v)) || [];
      if (nums.length >= 3) {
        return new Date(nums[0], nums[1], nums[2], nums[3] || 0, nums[4] || 0, nums[5] || 0, nums[6] || 0);
      }
    }
    const date = new Date(valeur);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function normaliserNiveau(valeur) {
    const niveau = String(valeur || "info").trim().toLowerCase();
    if (niveau === "warning" || niveau === "critical" || niveau === "info") {
      return niveau;
    }
    return "info";
  }

  function creerIdStable(notification) {
    if (notification.id) {
      return String(notification.id).trim();
    }
    const base = `${notification.start.toISOString()}|${notification.message}`;
    let hash = 0;
    for (let i = 0; i < base.length; i += 1) {
      hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    }
    return `n${hash}`;
  }

  function lireNotifsActives(texteGviz, maintenant) {
    const gviz = parserGvizJson(texteGviz);
    const rows = gviz?.table?.rows || [];
    const notifs = [];

    for (const row of rows) {
      const cols = row?.c || [];
      const start = convertirDateGviz(cols[0]?.v);
      const dureeJour = Math.max(1, parseInt(cols[1]?.v, 10) || 1);
      const message = String(cols[2]?.v || "").trim();
      const niveau = normaliserNiveau(cols[3]?.v);
      const idBrut = cols[4]?.v;

      if (!start || !message) {
        continue;
      }

      const end = new Date(start);
      end.setDate(end.getDate() + dureeJour);
      end.setMilliseconds(end.getMilliseconds() - 1);

      if (maintenant < start || maintenant > end) {
        continue;
      }

      const notif = {
        start,
        end,
        message,
        niveau,
        id: idBrut ? String(idBrut) : ""
      };
      notif.id = creerIdStable(notif);
      notifs.push(notif);
    }

    notifs.sort((a, b) => b.start.getTime() - a.start.getTime());
    return notifs;
  }

  function estModalAproposVisible() {
    const modal = document.getElementById("modal-apropos");
    if (!modal) {
      return false;
    }
    return modal.classList.contains("est-visible") || modal.getAttribute("aria-hidden") === "false";
  }

  function attendreFermetureApropos() {
    if (!estModalAproposVisible()) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const modal = document.getElementById("modal-apropos");
      let observer = null;

      const terminer = () => {
        document.removeEventListener("alice:apropos-ferme", onEvent);
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        resolve();
      };

      const verifier = () => {
        if (!estModalAproposVisible()) {
          terminer();
        }
      };

      const onEvent = () => {
        terminer();
      };

      document.addEventListener("alice:apropos-ferme", onEvent, { once: true });

      if (modal && typeof MutationObserver === "function") {
        observer = new MutationObserver(verifier);
        observer.observe(modal, { attributes: true, attributeFilter: ["class", "aria-hidden"] });
      }
    });
  }

  function dejaVue(id) {
    try {
      return localStorage.getItem(`${CLE_VU_PREFIX}${id}`) === "1";
    } catch {
      return false;
    }
  }

  function marquerCommeVue(id) {
    try {
      localStorage.setItem(`${CLE_VU_PREFIX}${id}`, "1");
    } catch {
      // Ignore les erreurs de stockage.
    }
  }

  function creerBanniere() {
    const banniere = document.createElement("div");
    banniere.id = "notification-banniere";
    banniere.className = "notification-banniere";
    banniere.setAttribute("role", "status");
    banniere.setAttribute("aria-live", "polite");
    banniere.hidden = true;

    const message = document.createElement("div");
    message.className = "notification-banniere-message";

    const fermer = document.createElement("button");
    fermer.type = "button";
    fermer.className = "notification-banniere-fermer";
    fermer.setAttribute("aria-label", "Fermer la notification");
    fermer.textContent = "×";

    banniere.appendChild(message);
    banniere.appendChild(fermer);
    document.body.appendChild(banniere);

    return { banniere, message, fermer };
  }

  function afficherBanniere(notification) {
    const ui = creerBanniere();
    const { banniere, message, fermer } = ui;
    let timer = null;

    banniere.classList.remove("notification-banniere--warning", "notification-banniere--critical");
    if (notification.niveau === "warning") {
      banniere.classList.add("notification-banniere--warning");
    } else if (notification.niveau === "critical") {
      banniere.classList.add("notification-banniere--critical");
    }

    message.textContent = notification.message;
    marquerCommeVue(notification.id);
    banniere.hidden = false;
    window.requestAnimationFrame(() => {
      banniere.classList.add("est-visible");
    });

    const fermerBanniere = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      banniere.classList.remove("est-visible");
      window.setTimeout(() => {
        banniere.remove();
      }, 220);
    };

    fermer.addEventListener("click", fermerBanniere);
    timer = window.setTimeout(fermerBanniere, DUREE_AFFICHAGE_MS);
  }

  async function initialiserNotifications() {
    await attendreFermetureApropos();
    const maintenant = new Date();

    let texte;
    try {
      const reponse = await fetch(URL_NOTIFICATIONS, { cache: "no-store" });
      if (!reponse.ok) {
        throw new Error(`HTTP ${reponse.status}`);
      }
      texte = await reponse.text();
    } catch (erreur) {
      console.warn("Notifications indisponibles:", erreur);
      return;
    }

    let actives = [];
    try {
      actives = lireNotifsActives(texte, maintenant);
    } catch (erreur) {
      console.warn("Notifications invalides:", erreur);
      return;
    }

    const prochaine = actives.find((n) => !dejaVue(n.id));
    if (!prochaine) {
      return;
    }
    afficherBanniere(prochaine);
  }

  initialiserNotifications();
})();
