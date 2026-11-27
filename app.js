import { SOURCES, SUJETS, OBJECTIONS, QUIZ, HISTOIRE, ETAPES, A_EVITER, MAJ, PROFILS, VOTE, CADRE_PROPOSITIONS, RECHERCHE_DIALOGUE, EDITEUR, RESERVE, NOUVEAUTES } from "./data.js";
import qrcode from "./vendor/qrcode.js";

const app = document.getElementById("app");

// ---------- Petits utilitaires ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

const srcLink = (id, { texte = false, prefixe = "" } = {}) => {
  const s = SOURCES[id];
  if (!s) return "";
  // Dans une tuile déjà cliquable, pas de lien imbriqué : on affiche la source en texte.
  if (texte) return `<span class="source-link">Source : ${esc(s.editeur)}, ${esc(s.date)}</span>`;
  return `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener">${prefixe}${esc(s.editeur)}, ${esc(s.date)}</a>`;
};
const srcLinks = (ids) => `<div class="sources-inline">${[...new Set(ids)].map(srcLink).join("")}</div>`;

const fmt = (n, dec = 0) => n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
const valeurTexte = (c) => c.affichage || fmt(c.valeur, c.decimales) + c.unite;
const ANNEE_MAJ = Number(MAJ.match(/\d{4}/)[0]);
const estAncien = (c) => c.annee && ANNEE_MAJ - c.annee > 5;

// Version hébergée (avec manifeste) ou fichier unique / visionneuse.
const estHeberge = () => !!document.querySelector('link[rel="manifest"]') && location.protocol !== "file:";
const urlBase = () => EDITEUR.site || location.href.split("#")[0].split("?")[0];
const lienFiche = (ids) => (estHeberge() && ids.length === 1 && !EDITEUR.site.includes("#")
  ? `${urlBase()}s/${ids[0]}.html` : `${urlBase()}#/fiche/${ids.join(",")}`);

// Période de réserve électorale : ?date=2027-04-17T10:00 permet de la tester.
function maintenant() {
  const q = new URLSearchParams(location.search).get("date");
  const t = q ? new Date(q) : new Date();
  return isNaN(t) ? new Date() : t;
}
function periodeReserve() {
  const n = maintenant();
  return RESERVE.find((r) => n >= new Date(r.debut) && n < new Date(r.fin)) || null;
}

// Jours restants avant une date (minuit, heure de Paris en hiver/printemps).
function joursAvant(iso) {
  const cible = new Date(`${iso}T00:00:00+01:00`);
  return Math.ceil((cible - maintenant()) / 864e5);
}

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/>',
  spark: '<path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z"/>',
  arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  share: '<path d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6"/>',
  vote: '<path d="M4 12h16v8H4zM8 12V5h8v7M10 8.5l1.5 1.5L14 7.5"/>',
  table: '<path d="M4 6h16v10H4zM9 20h6M12 16v4"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 9"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
  flip: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/>',
  whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
};
const icon = (n, size = 20, fill = false) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="${fill ? "currentColor" : "none"}" stroke="${fill ? "none" : "currentColor"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

// ---------- Navigation ----------
const NAV = [
  { href: "#/", label: "Accueil", icon: "home", match: (r) => r === "" },
  { href: "#/sujets", label: "Sujets", icon: "grid", match: (r) => r.startsWith("sujet") },
  { href: "#/objections", label: "Objections", icon: "shield", match: (r) => r === "objections" },
  { href: "#/dialogue", label: "Dialogue", icon: "chat", match: (r) => r === "dialogue" },
  { href: "#/voter", label: "Voter", icon: "vote", match: (r) => r === "voter" },
];

function renderNav(route) {
  document.querySelectorAll("[data-nav]").forEach((nav) => {
    nav.innerHTML = NAV.map((n) =>
      `<a class="nav-link" href="${n.href}"${n.match(route) ? ' aria-current="page"' : ""}>${icon(n.icon)}<span>${n.label}</span></a>`
    ).join("");
  });
}

// ---------- Vues ----------
function viewAccueil() {
  const pauvrete = SUJETS[0].chiffres[0];
  const fisc = SUJETS[1].chiffres[0];
  return `
  <section class="view">
    <div class="hero">
      <span class="eyebrow">Présidentielle 2027 · préparer une vraie discussion</span>
      <h1>Parlons de ce qui <span class="grad-text">compte vraiment.</span></h1>
      <p class="lead">Un outil pour convaincre un proche de voter à gauche sans le braquer : partir de ses préoccupations, apporter des chiffres vérifiés, répondre aux objections avec honnêteté.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#/sujets">Préparer ma conversation ${icon("arrow", 18)}</a>
        <a class="btn btn-ghost" href="#/quiz">Tester ses idées reçues</a>
      </div>
    </div>

    <div class="bento stagger">
      <a class="card tile tile-gradient span-4" href="#/sujet/${SUJETS[0].id}">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <span class="eyebrow" style="color:rgba(255,255,255,.85)">Le chiffre qui parle</span>
        <div>
          <div class="stat-big" data-count="${pauvrete.valeur}" data-dec="${pauvrete.decimales}" data-unit="${esc(pauvrete.unite)}">${fmt(pauvrete.valeur, pauvrete.decimales)}${esc(pauvrete.unite)}</div>
          <p>${esc(pauvrete.label)}</p>
        </div>
        ${srcLink(pauvrete.source, { texte: true })}
      </a>
      <a class="card tile span-2" href="#/sujet/${SUJETS[1].id}">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <span class="eyebrow">Impôts</span>
        <div>
          <div class="stat-big grad-text" data-count="${fisc.valeur}" data-dec="0" data-unit="${esc(fisc.unite)}">${fmt(fisc.valeur)}${esc(fisc.unite)}</div>
          <p>de taux d'imposition global pour les milliardaires, moins que les autres foyers aisés.</p>
        </div>
        ${srcLink(fisc.source, { texte: true })}
      </a>
      <a class="card tile span-2" href="#/objections">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>« On n'a pas les moyens »</h3>
        <p>${OBJECTIONS.length} objections courantes, ce qu'elles ont de vrai et comment y répondre.</p>
      </a>
      <a class="card tile span-2" href="#/dialogue">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>L'art d'en parler</h3>
        <p>5 étapes pour une discussion respectueuse, et ce que la recherche en dit vraiment.</p>
      </a>
      <a class="card tile span-2" href="#/histoire">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>Ce que la gauche a changé</h3>
        <p>Congés payés, Sécu, retraite à 60 ans… ${HISTOIRE.length} dates qui ont changé la vie.</p>
      </a>
      <a class="card tile span-2" href="#/entrainement">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>S'entraîner</h3>
        <p>Les objections en cartes à retourner, pour avoir la réponse en tête le jour venu.</p>
      </a>
      <a class="card tile span-2" href="#/memo">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>Fiche mémo</h3>
        <p>Tes sujets sur un seul écran, à garder dans la poche ou à imprimer.</p>
      </a>
      <a class="card tile span-2" href="#/kit">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>Kit terrain</h3>
        <p>Une feuille A5 avec trois chiffres, les dates et un QR code, pour un marché ou une sortie d'école.</p>
      </a>
    </div>

    <div class="section">
      <h2>Qui veux-tu convaincre ?</h2>
      <p class="muted-lead">Choisis une porte d'entrée. Le fond reste le même pour tout le monde, seule la manière d'ouvrir la discussion change. Rien n'est enregistré sur la personne.</p>
      <div class="profils stagger">
        ${PROFILS.map((p) => `
          <a class="card profil" href="#/profil/${p.id}">
            <span class="emoji" aria-hidden="true">${p.emoji}</span>
            <strong>${esc(p.titre)}</strong>
            <span class="sub">${esc(p.portrait)}</span>
          </a>`).join("")}
      </div>
    </div>

    <a class="card vote-banner" href="#/voter">
      <span class="vote-icon">${icon("vote", 26)}</span>
      <span><strong>Premier tour le ${esc(VOTE.premierTour)}</strong><br><span class="sub">Inscription jusqu'au ${esc(VOTE.limiteInscription)}. Vérifier, s'inscrire, faire une procuration.</span>${compteARebours()}</span>
      <span class="tile-arrow">${icon("arrow", 16)}</span>
    </a>

    <div class="section">
      <h2>Notre charte</h2>
      <div class="promise stagger">
        <div class="card"><strong>Zéro chiffre inventé</strong><p>Chaque donnée renvoie à sa source : Insee, Drees, Sénat, IPP…</p></div>
        <div class="card"><strong>La nuance incluse</strong><p>Chaque sujet montre aussi l'objection la plus solide. C'est ce qui rend le reste crédible.</p></div>
        <div class="card"><strong>Respect avant tout</strong><p>On écoute, on ne méprise pas. L'objectif est une conversation, pas une victoire.</p></div>
      </div>
    </div>
    ${footer()}
  </section>`;
}

function viewSujets() {
  const choisis = new Set(store.get("sujets", []));
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Étape 1 sur 2</span>
      <h1>Qu'est-ce qui compte pour cette personne ?</h1>
      <p class="lead">Choisis jusqu'à 3 préoccupations. On prépare un argumentaire sur mesure, avec la question pour ouvrir la discussion.</p>
    </div>
    <div class="choices stagger" role="group" aria-label="Préoccupations">
      ${SUJETS.map((s) => `
        <button class="choice" type="button" data-choice="${s.id}" aria-pressed="${choisis.has(s.id)}" style="--c:${s.couleur}">
          <span class="check">${icon("check", 14)}</span>
          <span class="emoji" aria-hidden="true">${s.emoji}</span>
          <strong>${esc(s.titre)}</strong>
          <span class="sub">${esc(s.accroche)}</span>
        </button>`).join("")}
    </div>
    <div class="sticky-cta">
      <span id="choice-count"></span>
      <a class="btn btn-primary" id="go-argu" href="#/argumentaire">Voir l'argumentaire ${icon("arrow", 18)}</a>
    </div>
  </section>`;
}

function bindSujets() {
  const maj = () => {
    const sel = store.get("sujets", []);
    const n = sel.length;
    document.getElementById("choice-count").textContent = n === 0 ? "Aucun sujet choisi" : `${n} sujet${n > 1 ? "s" : ""} sur 3`;
    const go = document.getElementById("go-argu");
    if (n === 0) { go.removeAttribute("href"); go.setAttribute("aria-disabled", "true"); }
    else { go.setAttribute("href", "#/argumentaire"); go.removeAttribute("aria-disabled"); }
  };
  app.querySelectorAll("[data-choice]").forEach((b) => b.addEventListener("click", () => {
    let sel = store.get("sujets", []);
    const id = b.dataset.choice;
    if (sel.includes(id)) sel = sel.filter((x) => x !== id);
    else {
      if (sel.length >= 3) { toast("3 sujets maximum : mieux vaut creuser que survoler."); return; }
      sel.push(id);
    }
    store.set("sujets", sel);
    b.setAttribute("aria-pressed", sel.includes(id));
    maj();
  }));
  maj();
}

function origine(c) {
  return `
    <details class="origine">
      <summary>D'où vient ce chiffre ?</summary>
      <p>${esc(c.definition)}</p>
      <p class="small-note">Données de ${c.annee}.${estAncien(c) ? " C'est ancien : regarde s'il existe une mise à jour avant de t'en servir." : ""}</p>
    </details>`;
}

function carteChiffre(c, s, { verifier = false } = {}) {
  return `
    <div class="card stat" style="--c:${s.couleur}">
      ${estAncien(c) ? `<span class="badge-ancien" title="Donnée de plus de cinq ans">Donnée de ${c.annee}</span>` : ""}
      <div class="num" ${c.affichage ? "" : `data-count="${c.valeur}" data-dec="${c.decimales}" data-unit="${esc(c.unite)}"`}>${esc(valeurTexte(c))}</div>
      <p>${esc(c.label)}</p>
      ${srcLink(c.source, { prefixe: verifier ? "Vérifier : " : "" })}
      ${origine(c)}
    </div>`;
}

function blocSujet(s, { compact = false } = {}) {
  return `
    <div class="subject-hero" style="--c:${s.couleur}">
      <span class="emoji" aria-hidden="true">${s.emoji}</span>
      ${compact ? `<h2 style="font-size:2rem">${esc(s.titre)}</h2>` : `<h1>${esc(s.titre)}</h1>`}
      <p class="lead">${esc(s.accroche)}</p>
      <div class="ask"><b>Question pour ouvrir</b>« ${esc(s.question)} »</div>
    </div>
    <div class="stats stagger">
      ${s.chiffres.map((c) => carteChiffre(c, s)).join("")}
    </div>
    <div class="blocks" style="--c:${s.couleur}">
      <div class="card">
        <div class="label"><span class="dot"></span>Le constat</div>
        <p>${esc(s.constat)}</p>
        ${srcLinks(s.constatSources)}
      </div>
      <div class="card">
        <div class="label"><span class="dot"></span>${esc(CADRE_PROPOSITIONS.titre)}</div>
        <ul class="list">${s.propositions.map((p) => `<li><span>${esc(p)}</span></li>`).join("")}</ul>
        <p class="small-note">${esc(CADRE_PROPOSITIONS.note)} ${srcLink(CADRE_PROPOSITIONS.source)}</p>
        ${srcLinks(s.propositionsSource)}
      </div>
      <div class="card nuance wide">
        <div class="label"><span class="dot"></span>La nuance à connaître</div>
        <p>${esc(s.nuance)}</p>
        ${srcLinks([s.nuanceSource])}
      </div>
    </div>`;
}

function viewSujet(id) {
  const i = SUJETS.findIndex((s) => s.id === id);
  if (i < 0) return viewIntrouvable();
  const s = SUJETS[i];
  const prev = SUJETS[(i - 1 + SUJETS.length) % SUJETS.length];
  const next = SUJETS[(i + 1) % SUJETS.length];
  return `
  <section class="view">
    ${blocSujet(s)}
    <div class="btn-row center">
      <a class="btn btn-primary" href="#/table/${s.id}">${icon("table", 18)} Mode À table</a>
      <button class="btn btn-ghost" type="button" data-share="${s.id}">${icon("share", 18)} Partager la fiche</button>
      <button class="btn btn-ghost" type="button" data-wa="${s.id}">${icon("whatsapp", 18)} WhatsApp</button>
      <button class="btn btn-ghost" type="button" data-image="${s.id}">${icon("image", 18)} Image carrée</button>
      <button class="btn btn-ghost" type="button" data-image="${s.id}" data-format="story">${icon("image", 18)} Format story</button>
    </div>
    <p class="small-note center">Le lien ouvre une <a href="#/fiche/${s.id}">fiche écrite pour la personne</a>, avec les sources et ce qui fait débat.</p>
    <div class="pager">
      <a class="btn btn-ghost" href="#/sujet/${prev.id}">← ${esc(prev.titre)}</a>
      <a class="btn btn-ghost" href="#/sujet/${next.id}">${esc(next.titre)} →</a>
    </div>
  </section>`;
}

function viewArgumentaire() {
  const sel = store.get("sujets", []).map((id) => SUJETS.find((s) => s.id === id)).filter(Boolean);
  if (!sel.length) {
    return `<section class="view"><div class="page-head"><h1>Aucun sujet choisi</h1><p class="lead">Commence par choisir ce qui compte pour la personne.</p></div><a class="btn btn-primary" href="#/sujets">Choisir des sujets</a></section>`;
  }
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Étape 2 sur 2</span>
      <h1>Ton argumentaire <span class="grad-text">sur mesure</span></h1>
      <p class="lead">Commence par la question, écoute la réponse, puis choisis un seul chiffre. Garde la nuance en tête : elle te rendra crédible.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#/table/${sel.map((s) => s.id).join(",")}">${icon("table", 18)} Mode À table</a>
        <button class="btn btn-ghost" type="button" data-share="${sel.map((s) => s.id).join(",")}">${icon("share", 18)} Envoyer ou copier</button>
        <a class="btn btn-ghost" href="#/memo">${icon("print", 18)} Fiche mémo</a>
        <a class="btn btn-ghost" href="#/dialogue">Revoir les 5 étapes</a>
      </div>
    </div>
    ${sel.map((s) => `<div class="section">${blocSujet(s, { compact: true })}</div>`).join("")}
    ${carteRespect()}
    <div class="pager"><a class="btn btn-ghost" href="#/sujets">← Changer de sujets</a><a class="btn btn-ghost" href="#/objections">Préparer les objections →</a></div>
  </section>`;
}

function viewObjections() {
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Répondre sans braquer</span>
      <h1>Les objections, <span class="grad-text">prises au sérieux</span></h1>
      <p class="lead">Pour chaque objection : ce qu'elle a de vrai d'abord, puis une réponse sourcée. Reconnaître le vrai, c'est ce qui ouvre l'écoute.</p>
      <div class="btn-row"><a class="btn btn-primary" href="#/entrainement">${icon("flip", 18)} M'entraîner en cartes</a></div>
    </div>
    <label class="search">
      <span class="sr-only">Rechercher une objection</span>
      ${icon("search", 20)}
      <input type="search" id="q" placeholder="Impôts, dette, immigration…" autocomplete="off">
    </label>
    <div class="accordion stagger" id="acc">
      ${OBJECTIONS.map((o) => `
        <details class="card acc" data-text="${esc((o.objection + " " + o.vrai + " " + o.reponse).toLowerCase())}">
          <summary>« ${esc(o.objection)} »</summary>
          <div class="acc-body">
            <div class="true"><b>Ce qui est vrai</b>${esc(o.vrai)}</div>
            <div class="resp"><b>Ce qu'on peut répondre</b>${esc(o.reponse)}</div>
            ${srcLinks(o.sources)}
          </div>
        </details>`).join("")}
    </div>
    <p class="empty" id="empty" hidden>Aucune objection ne correspond. Essaie un autre mot.</p>
  </section>`;
}

function bindObjections() {
  const q = document.getElementById("q");
  const items = [...app.querySelectorAll(".acc")];
  q.addEventListener("input", () => {
    const t = q.value.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let n = 0;
    items.forEach((d) => {
      const ok = !t || d.dataset.text.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(t);
      d.hidden = !ok; if (ok) n++;
    });
    document.getElementById("empty").hidden = n > 0;
  });
}

function viewDialogue() {
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">La méthode</span>
      <h1>Convaincre, c'est d'abord <span class="grad-text">écouter.</span></h1>
      <p class="lead">${esc(RECHERCHE_DIALOGUE.texte)}</p>
      ${srcLinks(RECHERCHE_DIALOGUE.sources)}
    </div>
    <div class="steps stagger">
      ${ETAPES.map((e, i) => `
        <div class="card step">
          <span class="n">${i + 1}</span>
          <div><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p><div class="ex">${esc(e.exemple)}</div></div>
        </div>`).join("")}
    </div>
    <div class="section avoid">
      <h2>À éviter</h2>
      <div class="card"><ul class="list">${A_EVITER.map((a) => `<li><span>${esc(a)}</span></li>`).join("")}</ul></div>
    </div>
    ${carteRespect()}
    <div class="pager"><a class="btn btn-primary" href="#/sujets">Préparer ma conversation ${icon("arrow", 18)}</a></div>
  </section>`;
}

let quizState = { i: 0, score: 0, repondu: false };
function viewQuiz() {
  const { i, score } = quizState;
  if (i >= QUIZ.length) {
    return `
    <section class="view quiz-wrap">
      <div class="card quiz-card">
        <span class="eyebrow" style="justify-self:center">Résultat</span>
        <div class="score grad-text">${score}/${QUIZ.length}</div>
        <p class="lead" style="margin:0 auto">${score === QUIZ.length ? "Sans faute ! Tu es prêt·e pour la discussion." : "Les idées reçues ont la vie dure. Ces chiffres sont de bons points de départ pour en parler."}</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-primary" type="button" id="restart">Recommencer</button>
          <button class="btn btn-ghost" type="button" data-share-quiz="${score}">${icon("share", 18)} Vérifier ensemble</button>
        </div>
      </div>
    </section>`;
  }
  const item = QUIZ[i];
  return `
  <section class="view quiz-wrap">
    <div class="page-head" style="margin-bottom:0">
      <span class="eyebrow">Vrai ou faux · ${i + 1}/${QUIZ.length}</span>
      <div class="progress" aria-hidden="true"><span style="width:${(i / QUIZ.length) * 100}%"></span></div>
    </div>
    <div class="card quiz-card">
      <p class="q">${esc(item.affirmation)}</p>
      <div class="quiz-actions">
        <button class="qbtn" type="button" data-rep="true">Vrai</button>
        <button class="qbtn" type="button" data-rep="false">Faux</button>
      </div>
      <div id="verdict" aria-live="polite"></div>
    </div>
  </section>`;
}

function bindQuiz() {
  const restart = document.getElementById("restart");
  if (restart) restart.addEventListener("click", () => { quizState = { i: 0, score: 0, repondu: false }; route(); });
  app.querySelectorAll("[data-rep]").forEach((b) => b.addEventListener("click", () => {
    if (quizState.repondu) return;
    quizState.repondu = true;
    const item = QUIZ[quizState.i];
    const choix = b.dataset.rep === "true";
    const juste = choix === item.reponse;
    if (juste) quizState.score++;
    app.querySelectorAll("[data-rep]").forEach((x) => x.classList.add((x.dataset.rep === "true") === item.reponse ? "is-ok" : "is-ko"));
    document.getElementById("verdict").innerHTML = `
      <div class="verdict">
        <span class="badge ${juste ? "ok" : "ko"}">${juste ? "Bien vu" : "Raté"} · c'est ${item.reponse ? "vrai" : "faux"}</span>
        <p>${esc(item.explication)}</p>
        ${item.nuance ? `<p class="quiz-nuance"><b>La nuance :</b> ${esc(item.nuance)}</p>` : ""}
        ${srcLink(item.source)}
        <button class="btn btn-primary" type="button" id="next" style="justify-self:center;margin-top:8px">${quizState.i + 1 < QUIZ.length ? "Question suivante" : "Voir mon score"} →</button>
      </div>`;
    document.getElementById("next").addEventListener("click", () => { quizState.i++; quizState.repondu = false; route(); });
  }));
}

function viewHistoire() {
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Mémoire</span>
      <h1>Ce que la gauche <span class="grad-text">a changé</span></h1>
      <p class="lead">Quand on dit « voter ne sert à rien », ces dates répondent. Beaucoup de droits qu'on croit naturels ont été conquis par des majorités de gauche, et certains s'arrachent encore depuis l'opposition.</p>
    </div>
    <div class="timeline stagger">
      ${HISTOIRE.map((h) => `<div class="card event"><span class="year">${esc(h.annee)}</span><h3>${esc(h.titre)}</h3><p>${esc(h.texte)}</p>${h.nuance ? `<p class="quiz-nuance"><b>La nuance :</b> ${esc(h.nuance)}</p>` : ""}${srcLinks(h.sources || [h.source])}</div>`).join("")}
    </div>
  </section>`;
}

function viewSources() {
  const items = Object.values(SOURCES).sort((a, b) => a.editeur.localeCompare(b.editeur, "fr"));
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Méthode</span>
      <h1>Sources et <span class="grad-text">méthode</span></h1>
      <p class="lead">Les chiffres ont été vérifiés le ${esc(MAJ)} auprès de leur source. Nous privilégions la statistique publique (Insee, Drees, SDES), les rapports parlementaires et la recherche. Quand une source est engagée (fondation, ONG, programme politique), nous le disons. Une erreur ? Signale-la sur le dépôt du projet.</p>
    </div>
    <ul class="sources-list stagger">
      ${items.map((s) => `<li class="card"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.titre)}</a><small>${esc(s.editeur)} · ${esc(s.date)}</small></li>`).join("")}
    </ul>
  </section>`;
}

function carteRespect() {
  return `
    <div class="card respect">
      <span class="emoji" aria-hidden="true">🤝</span>
      <div>
        <h3>Elle ou il ne votera pas à gauche ? C'est son droit.</h3>
        <p>Remercie pour l'échange, propose d'en reparler et envoie la source si elle ou il la veut. L'essentiel, c'est qu'elle ou il vote en connaissance de cause. Une relation préservée vaut plus qu'une discussion gagnée.</p>
      </div>
    </div>`;
}

function viewProfil(id) {
  const p = PROFILS.find((x) => x.id === id);
  if (!p) return viewIntrouvable();
  const sujets = p.sujets.map((sid) => SUJETS.find((s) => s.id === sid));
  const objs = p.objections.map((oid) => OBJECTIONS.find((o) => o.id === oid));
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Porte d'entrée</span>
      <h1><span aria-hidden="true">${p.emoji}</span> ${esc(p.titre)}</h1>
      <p class="lead">${esc(p.portrait)}</p>
    </div>
    <div class="blocks">
      <div class="card">
        <div class="label"><span class="dot"></span>Par où commencer</div>
        <p>${esc(p.entree)}</p>
        <div class="ask"><b>Question pour ouvrir</b>« ${esc(p.question)} »</div>
      </div>
      <div class="card">
        <div class="label"><span class="dot"></span>Les sujets qui marchent souvent</div>
        <ul class="list">${sujets.map((s) => `<li><span><a href="#/sujet/${s.id}">${s.emoji} ${esc(s.titre)}</a> : ${esc(s.accroche)}</span></li>`).join("")}</ul>
        <p class="small-note">Ce ne sont que des pistes : sa réponse à la première question compte plus que ce profil.</p>
      </div>
      <div class="card wide">
        <div class="label"><span class="dot"></span>Les objections à préparer</div>
        <ul class="list">${objs.map((o) => `<li><span>« ${esc(o.objection)} »</span></li>`).join("")}</ul>
      </div>
    </div>
    <div class="btn-row center">
      <button class="btn btn-primary" type="button" data-profil="${p.id}">Préparer avec ces sujets ${icon("arrow", 18)}</button>
      <a class="btn btn-ghost" href="#/objections">Voir les objections</a>
      <a class="btn btn-ghost" href="#/voter">${icon("vote", 18)} L'aider à voter</a>
    </div>
  </section>`;
}

function bindProfil() {
  const b = app.querySelector("[data-profil]");
  if (!b) return;
  b.addEventListener("click", () => {
    store.set("sujets", PROFILS.find((p) => p.id === b.dataset.profil).sujets);
    location.hash = "#/argumentaire";
  });
}

function viewVoter() {
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Présidentielle 2027</span>
      <h1>L'aider à <span class="grad-text">aller voter</span></h1>
      <p class="lead">${esc(VOTE.recherche)}</p>
      ${srcLinks(VOTE.rechercheSources)}
    </div>
    <div class="vote-dates stagger">
      <div class="card"><span class="eyebrow">Inscription</span><strong>${esc(VOTE.limiteInscription)}</strong><p>Date limite, en ligne ou en mairie.</p></div>
      <div class="card"><span class="eyebrow">Premier tour</span><strong>${esc(VOTE.premierTour)}</strong><p>La veille dans plusieurs territoires d'outre-mer.</p></div>
      <div class="card"><span class="eyebrow">Second tour</span><strong>${esc(VOTE.secondTour)}</strong><p>Entre les deux candidats arrivés en tête.</p></div>
    </div>
    ${compteARebours()}
    <p class="small-note">${esc(VOTE.exception)} ${srcLinks(VOTE.sources)}</p>
    <div class="btn-row"><button class="btn btn-ghost" type="button" data-ics>${icon("calendar", 18)} Ajouter les dates à mon agenda</button></div>
    <div class="section">
      <h2>Les démarches officielles</h2>
      <div class="links-grid stagger">
        ${VOTE.liens.map((l) => `<a class="card link-card" href="${esc(l.url)}" target="_blank" rel="noopener"><span>${esc(l.titre)}</span>${icon("arrow", 18)}</a>`).join("")}
      </div>
    </div>
    <div class="section">
      <h2>Un plan de vote en 3 questions</h2>
      <p class="muted-lead">Pose-les ensemble, sans insister. Avoir un plan précis aide à passer de l'intention à l'acte.</p>
      <div class="steps stagger">
        ${VOTE.plan.map((e, i) => `
          <div class="card step">
            <span class="n">${i + 1}</span>
            <div><h3>${esc(e.q)}</h3><p>${esc(e.aide)}</p></div>
          </div>`).join("")}
      </div>
      <div class="btn-row center"><button class="btn btn-ghost" type="button" data-share-vote>${icon("share", 18)} Envoyer les dates et les liens</button></div>
    </div>
  </section>`;
}

// ---------- Mode « À table » ----------
let wakeLock = null;
async function garderEcranAllume() {
  try { if ("wakeLock" in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request("screen"); wakeLock.addEventListener("release", () => { wakeLock = null; }); } }
  catch { /* refusé ou indisponible : sans gravité */ }
}
function libererEcran() { if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; } }

function viewTable(param) {
  const ids = (param || store.get("sujets", []).join(",")).split(",");
  const sel = ids.map((id) => SUJETS.find((s) => s.id === id)).filter(Boolean);
  if (!sel.length) return viewIntrouvable();
  const cartes = sel.map((s) => {
    const c = s.chiffres[0];
    return `
      <article class="table-card" style="--c:${s.couleur}" aria-label="${esc(s.titre)}">
        <span class="table-tag">${s.emoji} ${esc(s.titre)}</span>
        <p class="table-q">« ${esc(s.question)} »</p>
        <div class="table-stat"><span class="num">${c.affichage ? esc(c.affichage) : fmt(c.valeur, c.decimales) + esc(c.unite)}</span><span>${esc(c.label)}</span>${srcLink(c.source)}</div>
        <div class="table-nuance"><b>Si on te dit « oui, mais… »</b>${esc(s.nuance)}</div>
      </article>`;
  });
  cartes.push(`<article class="table-card fin" aria-label="Pour finir">${carteRespect()}<a class="btn btn-ghost" href="#/voter">${icon("vote", 18)} Dates et inscription</a></article>`);
  return `
  <section class="view table-mode">
    <div class="table-bar">
      <a class="btn btn-ghost" href="#/argumentaire">← Quitter</a>
      <span id="table-pos" aria-live="polite"></span>
      <button class="btn btn-ghost" type="button" id="plein-ecran">Plein écran</button>
    </div>
    <div class="table-track" id="track" tabindex="0" aria-label="Fiches, fais défiler horizontalement">${cartes.join("")}</div>
    <div class="table-nav">
      <button class="btn btn-ghost" type="button" id="t-prev" aria-label="Fiche précédente">←</button>
      <button class="btn btn-primary" type="button" id="t-next" aria-label="Fiche suivante">→</button>
    </div>
    <p class="small-note center">L'écran reste allumé tant que cette page est ouverte, si ton téléphone le permet.</p>
  </section>`;
}

function bindTable() {
  const track = document.getElementById("track");
  if (!track) return;
  garderEcranAllume();
  const cards = [...track.children];
  const pos = document.getElementById("table-pos");
  const courant = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
  const maj = () => { pos.textContent = `${Math.min(cards.length, courant() + 1)} / ${cards.length}`; };
  const aller = (d) => {
    const i = Math.max(0, Math.min(cards.length - 1, courant() + d));
    track.scrollTo({ left: i * track.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  document.getElementById("t-prev").addEventListener("click", () => aller(-1));
  document.getElementById("t-next").addEventListener("click", () => aller(1));
  track.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") aller(1); if (e.key === "ArrowLeft") aller(-1); });
  track.addEventListener("scroll", maj, { passive: true });
  const pe = document.getElementById("plein-ecran");
  if (!document.documentElement.requestFullscreen) pe.hidden = true;
  pe.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  });
  maj();
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && location.hash.startsWith("#/table")) garderEcranAllume(); });

// ---------- Image de partage ----------
function lignes(ctx, texte, largeur) {
  const mots = texte.split(" "), out = [];
  let l = "";
  for (const m of mots) {
    const t = l ? l + " " + m : m;
    if (ctx.measureText(t).width > largeur && l) { out.push(l); l = m; } else l = t;
  }
  if (l) out.push(l);
  return out;
}

function dessinerQR(ctx, texte, x, y, taille) {
  const qr = qrcode(0, "M");
  qr.addData(texte); qr.make();
  const n = qr.getModuleCount(), marge = 2, cell = taille / (n + 2 * marge);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(x, y, taille, taille);
  ctx.fillStyle = "#0b0b14";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (qr.isDark(r, c)) ctx.fillRect(x + (c + marge) * cell, y + (r + marge) * cell, Math.ceil(cell), Math.ceil(cell));
  }
}

function qrSvg(texte, taille = 160) {
  const qr = qrcode(0, "M");
  qr.addData(texte); qr.make();
  const n = qr.getModuleCount(), m = 2;
  let d = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
  return `<svg class="qr" viewBox="0 0 ${n + 2 * m} ${n + 2 * m}" width="${taille}" height="${taille}" role="img" aria-label="QR code vers ${esc(texte)}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#0b0b14"/></svg>`;
}

async function imageSujet(s, format = "post") {
  const W = 1080, H = format === "story" ? 1920 : 1350, P = 90;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  try { await document.fonts.ready; } catch { /* police par défaut */ }
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#14122b"); g.addColorStop(1, "#0b0b14");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const halo = ctx.createRadialGradient(W * 0.15, H * 0.1, 0, W * 0.15, H * 0.1, W * 0.9);
  halo.addColorStop(0, s.couleur + "88"); halo.addColorStop(1, "transparent");
  ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
  const c = s.chiffres[0], src = SOURCES[c.source];
  const story = format === "story";
  let y = P + (story ? 120 : 40);
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 44px 'Space Grotesk', sans-serif";
  ctx.fillText(`${s.emoji}  ${s.titre}`, P, y);
  y += story ? 260 : 200;
  let taille = 190;
  ctx.font = `700 ${taille}px 'Space Grotesk', sans-serif`;
  while (ctx.measureText(valeurTexte(c)).width > W - 2 * P && taille > 90) { taille -= 10; ctx.font = `700 ${taille}px 'Space Grotesk', sans-serif`; }
  ctx.fillText(valeurTexte(c), P, y);
  y += 84;
  ctx.font = "500 42px Inter, sans-serif";
  for (const l of lignes(ctx, c.label, W - 2 * P)) { ctx.fillText(l, P, y); y += 56; }
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "400 30px Inter, sans-serif";
  for (const l of lignes(ctx, `Source : ${src.editeur}, ${src.date}${estAncien(c) ? ` (données de ${c.annee})` : ""}`, W - 2 * P)) { y += 4; ctx.fillText(l, P, y); y += 38; }
  y += 36;
  // Pied : QR code, adresse, mention militante. La nuance prend toute la place restante, en entier.
  const Q = 190, piedH = Q + 40;
  const dispo = H - P - piedH - y - 30;
  let tN = 34, nuance;
  for (; tN >= 22; tN -= 2) {
    ctx.font = `400 ${tN}px Inter, sans-serif`;
    nuance = lignes(ctx, s.nuance, W - 2 * P - 60);
    if (84 + nuance.length * tN * 1.4 + 20 <= dispo) break;
  }
  const hBoite = 84 + nuance.length * tN * 1.4 + 20;
  ctx.fillStyle = "rgba(245,158,11,.16)";
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(P, y, W - 2 * P, hBoite, 28) : ctx.rect(P, y, W - 2 * P, hBoite); ctx.fill();
  ctx.fillStyle = "#fbbf24"; ctx.font = "700 26px Inter, sans-serif";
  ctx.fillText("CE QUI FAIT DÉBAT", P + 30, y + 50);
  ctx.fillStyle = "#ffffff"; ctx.font = `400 ${tN}px Inter, sans-serif`;
  nuance.forEach((l, i) => ctx.fillText(l, P + 30, y + 98 + i * tN * 1.4));
  const yPied = H - P - Q;
  const lien = lienFiche([s.id]);
  dessinerQR(ctx, lien, W - P - Q, yPied, Q);
  ctx.fillStyle = "#ffffff"; ctx.font = "600 30px Inter, sans-serif";
  ctx.fillText("La fiche complète et ses sources :", P, yPied + 40);
  ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "400 26px Inter, sans-serif";
  const lienCourt = lien.replace(/^https?:\/\//, "");
  lignes(ctx, lienCourt.length > 70 ? lienCourt.slice(0, 67) + "…" : lienCourt, W - 2 * P - Q - 30).slice(0, 2).forEach((l, i) => ctx.fillText(l, P, yPied + 82 + i * 34));
  ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = "500 24px Inter, sans-serif";
  ctx.fillText("Outil militant pro-gauche · gaucho", P, yPied + Q - 38);
  ctx.fillText(`Réf. ${s.id}-${ANNEE_MAJ} · chiffres vérifiés le ${MAJ}`, P, yPied + Q - 4);
  return new Promise((res) => cv.toBlob(res, "image/png"));
}

async function partagerImage(id, format) {
  if (bloqueParReserve()) return;
  const s = SUJETS.find((x) => x.id === id);
  if (!s) return;
  const blob = await imageSujet(s, format);
  if (!blob) { toast("Impossible de créer l'image."); return; }
  const fichier = new File([blob], `gaucho-${s.id}${format === "story" ? "-story" : ""}.png`, { type: "image/png" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
      await navigator.share({ files: [fichier], title: s.titre, text: `${texteSujet(s)}\n${lienFiche([s.id])}` });
      return;
    }
  } catch (e) { if (e && e.name === "AbortError") return; }
  enregistrer(blob, fichier.name, "Image enregistrée.");
}

// Enregistre un fichier : capacité « downloads » dans la visionneuse claude.ai, sinon lien classique.
async function enregistrer(blob, nom, message) {
  const dl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
  if (dl) {
    try { await dl.save({ filename: nom, data: blob }); toast(message); }
    catch (e) { if (!e || e.code !== "declined") toast("Impossible d'enregistrer le fichier ici."); }
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  toast(message);
}

function viewIntrouvable() {
  return `<section class="view"><div class="page-head"><h1>Page introuvable</h1><p class="lead">Ce lien ne mène nulle part.</p></div><a class="btn btn-primary" href="#/">Retour à l'accueil</a></section>`;
}

function footer() {
  const nouveau = store.get("vu-nouveautes", 0) < NOUVEAUTES[0].id;
  return `<div class="footer-links">
    <a href="#/quiz">Vrai ou faux</a>·<a href="#/entrainement">Entraînement</a>·<a href="#/memo">Fiche mémo</a>·<a href="#/kit">Kit terrain</a>·<a href="#/histoire">Ce que la gauche a changé</a>·<a href="#/sources">Sources et méthode</a>·<a href="#/nouveautes">Quoi de neuf${nouveau ? ' <span class="nouveau">nouveau</span>' : ""}</a>·<a href="#/a-propos">À propos, mentions légales</a>·<span>Chiffres vérifiés le ${esc(MAJ)}</span>
    <button class="btn btn-ghost btn-small" type="button" data-installer hidden>${icon("download", 16)} Installer l'appli</button>
  </div>`;
}

// ---------- Partage ----------
// Message pour la personne : il commence par une question, pas par une leçon.
function texteSujet(s) {
  const c = s.chiffres[0];
  const src = SOURCES[c.source];
  return `${s.question}\n\nJe suis tombé·e sur ce chiffre : ${valeurTexte(c)} ${c.label} (${src.editeur}). Je t'envoie la fiche, avec les sources et ce qui fait débat. Tu en penses quoi ?`;
}
function texteSujets(ids) {
  const sel = ids.map((id) => SUJETS.find((s) => s.id === id)).filter(Boolean);
  if (sel.length === 1) return texteSujet(sel[0]);
  return `${sel[0].question}\n\nJ'ai regardé quelques chiffres sur ${sel.map((s) => s.titre.toLowerCase()).join(", ")}, tous sourcés. Je t'envoie la fiche, tu me diras ce que tu en penses ?`;
}

function bloqueParReserve() {
  const r = periodeReserve();
  if (r) toast(`Période de réserve du ${r.tour} : le partage reprend dimanche après 20 h.`);
  return !!r;
}

async function partager(texte, url) {
  if (bloqueParReserve()) return;
  const data = { title: "Gaucho", text: texte, url };
  try {
    if (navigator.share) { await navigator.share(data); return; }
  } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(`${texte}\n${url}`); toast("Copié, il n'y a plus qu'à coller."); }
  catch { toast("Impossible de copier automatiquement."); }
}

function bindPartage() {
  app.querySelectorAll("[data-share]").forEach((b) => b.addEventListener("click", () => {
    const ids = b.dataset.share.split(",");
    partager(texteSujets(ids), lienFiche(ids));
  }));
  app.querySelectorAll("[data-wa]").forEach((b) => b.addEventListener("click", () => {
    if (bloqueParReserve()) return;
    const ids = b.dataset.wa.split(",");
    window.open(`https://wa.me/?text=${encodeURIComponent(`${texteSujets(ids)}\n${lienFiche(ids)}`)}`, "_blank", "noopener");
  }));
  app.querySelectorAll("[data-image]").forEach((b) => b.addEventListener("click", () => partagerImage(b.dataset.image, b.dataset.format)));
  app.querySelectorAll("[data-share-quiz]").forEach((b) => b.addEventListener("click", () => {
    partager(`Tu crois que la pauvreté a baissé ces dernières années ? J'ai fait un vrai ou faux sur la pauvreté, les impôts et les services publics, chaque réponse avec sa source (${b.dataset.shareQuiz}/${QUIZ.length} pour moi). Tu le fais ?`, `${urlBase()}#/quiz`);
  }));
  app.querySelectorAll("[data-share-vote]").forEach((b) => b.addEventListener("click", () => {
    partager(`Tu sais où tu votes en avril ? Inscription jusqu'au ${VOTE.limiteInscription}, premier tour le ${VOTE.premierTour}, second tour le ${VOTE.secondTour}.\n${VOTE.liens.map((l) => `${l.titre} : ${l.url}`).join("\n")}`, `${urlBase()}#/voter`);
  }));
  app.querySelectorAll("[data-ics]").forEach((b) => b.addEventListener("click", () => {
    enregistrer(new Blob([calendrierIcs()], { type: "text/calendar" }), "presidentielle-2027.ics", "Fichier agenda enregistré : ouvre-le pour ajouter les dates.");
  }));
  app.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => {
    // Le kit terrain s'imprime en A5 ; la fiche mémo sur la page par défaut.
    const a5 = location.hash.startsWith("#/kit") ? Object.assign(document.createElement("style"), { textContent: "@page { size: A5; margin: 8mm; }" }) : null;
    if (a5) document.head.appendChild(a5);
    window.print();
    if (a5) setTimeout(() => a5.remove(), 1000);
  }));
  app.querySelectorAll("[data-installer]").forEach((b) => {
    b.hidden = !invitationInstall;
    b.addEventListener("click", async () => {
      if (!invitationInstall) return;
      invitationInstall.prompt();
      try { await invitationInstall.userChoice; } catch { /* ignoré */ }
      invitationInstall = null;
      app.querySelectorAll("[data-installer]").forEach((x) => { x.hidden = true; });
    });
  });
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ---------- Compteurs animés ----------
function animerCompteurs() {
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = app.querySelectorAll("[data-count]");
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { lancer(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.4 }) : null;
  function lancer(el) {
    const fin = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, unite = el.dataset.unit || "";
    if (reduit) { el.textContent = fmt(fin, dec) + unite; return; }
    const t0 = performance.now(), duree = 1100;
    const pas = (t) => {
      const p = Math.min(1, (t - t0) / duree), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(fin * e, dec) + unite;
      if (p < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  }
  els.forEach((el) => (io ? io.observe(el) : lancer(el)));
}

// ---------- Compte à rebours et agenda ----------
function compteARebours() {
  const ins = joursAvant(VOTE.iso.inscription), t1 = joursAvant(VOTE.iso.premierTour), t2 = joursAvant(VOTE.iso.secondTour);
  const morceaux = [];
  if (ins >= 0) morceaux.push(`<span class="cd"><b>${ins === 0 ? "Aujourd'hui" : `J-${ins}`}</b> fin des inscriptions</span>`);
  if (t1 >= 0) morceaux.push(`<span class="cd"><b>${t1 === 0 ? "Aujourd'hui" : `J-${t1}`}</b> premier tour</span>`);
  else if (t2 >= 0) morceaux.push(`<span class="cd"><b>${t2 === 0 ? "Aujourd'hui" : `J-${t2}`}</b> second tour</span>`);
  return morceaux.length ? `<span class="countdown">${morceaux.join("")}</span>` : "";
}

function calendrierIcs() {
  const echap = (t) => t.replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const jour = (iso) => iso.replace(/-/g, "");
  const lendemain = (iso) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10).replace(/-/g, ""); };
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const evt = (id, iso, titre, desc, rappel) => [
    "BEGIN:VEVENT", `UID:${id}-2027@gaucho`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${jour(iso)}`, `DTEND;VALUE=DATE:${lendemain(iso)}`,
    `SUMMARY:${echap(titre)}`, `DESCRIPTION:${echap(desc)}`,
    "BEGIN:VALARM", `TRIGGER:-P${rappel}D`, "ACTION:DISPLAY", `DESCRIPTION:${echap(titre)}`, "END:VALARM", "END:VEVENT",
  ];
  const lignesIcs = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gaucho//Presidentielle 2027//FR", "CALSCALE:GREGORIAN",
    ...evt("inscription", VOTE.iso.inscription, "Dernier jour pour s'inscrire sur les listes électorales", `Vérifier ou s'inscrire : ${VOTE.liens[0].url}`, 7),
    ...evt("tour1", VOTE.iso.premierTour, "Présidentielle : premier tour", `Pas disponible ? Procuration : ${VOTE.liens[2].url}`, 3),
    ...evt("tour2", VOTE.iso.secondTour, "Présidentielle : second tour", `Pas disponible ? Procuration : ${VOTE.liens[2].url}`, 3),
    "END:VCALENDAR",
  ];
  return lignesIcs.join("\r\n") + "\r\n";
}

// ---------- Fiche pour la personne qui reçoit le lien ----------
function viewFiche(param) {
  const sel = (param || "").split(",").map((id) => SUJETS.find((s) => s.id === id)).filter(Boolean);
  if (!sel.length) return viewIntrouvable();
  return `
  <section class="view fiche">
    <div class="page-head">
      <span class="eyebrow">Une fiche pour toi</span>
      <h1>${sel.length === 1 ? `<span aria-hidden="true">${sel[0].emoji}</span> ${esc(sel[0].titre)}` : "Quelques chiffres à regarder"}</h1>
      <p class="lead">Quelqu'un qui tient à ton avis t'a envoyé ces chiffres. Chacun renvoie à sa source : ouvre-la pour vérifier par toi-même, et fais-toi ta propre idée.</p>
    </div>
    ${sel.map((s) => `
      <div class="section" style="--c:${s.couleur}">
        ${sel.length > 1 ? `<h2><span aria-hidden="true">${s.emoji}</span> ${esc(s.titre)}</h2>` : ""}
        <div class="stats">${s.chiffres.map((c) => carteChiffre(c, s, { verifier: true })).join("")}</div>
        <div class="blocks" style="--c:${s.couleur}">
          <div class="card">
            <div class="label"><span class="dot"></span>Ce que disent les chiffres</div>
            <p>${esc(s.constat)}</p>
            ${srcLinks(s.constatSources)}
          </div>
          <div class="card">
            <div class="label"><span class="dot"></span>${esc(CADRE_PROPOSITIONS.titre)}</div>
            <ul class="list">${s.propositions.map((p) => `<li><span>${esc(p)}</span></li>`).join("")}</ul>
            <p class="small-note">${esc(CADRE_PROPOSITIONS.note)} ${srcLink(CADRE_PROPOSITIONS.source)}</p>
          </div>
          <div class="card nuance wide">
            <div class="label"><span class="dot"></span>Ce qui fait débat</div>
            <p>${esc(s.nuance)}</p>
            ${srcLinks([s.nuanceSource])}
          </div>
        </div>
      </div>`).join("")}
    <a class="card vote-banner" href="${esc(VOTE.liens[0].url)}" target="_blank" rel="noopener">
      <span class="vote-icon">${icon("vote", 26)}</span>
      <span><strong>Vérifie ton inscription sur les listes</strong><br><span class="sub">Site officiel du ministère de l'Intérieur. Inscription possible jusqu'au ${esc(VOTE.limiteInscription)}, premier tour le ${esc(VOTE.premierTour)}.</span></span>
      <span class="tile-arrow">${icon("arrow", 16)}</span>
    </a>
    <p class="small-note center">Gaucho est un outil militant en faveur de la gauche. Chiffres vérifiés le ${esc(MAJ)}. <a href="#/a-propos">Qui l'édite et comment il fonctionne</a> · <a href="#/sources">toutes les sources</a></p>
    <div class="btn-row center"><a class="btn btn-ghost" href="#/quiz">Faire le vrai ou faux</a><a class="btn btn-ghost" href="#/histoire">Ce que la gauche a changé</a></div>
  </section>`;
}

// ---------- Fiche mémo (un écran, imprimable) ----------
function viewMemo() {
  let sel = store.get("sujets", []).map((id) => SUJETS.find((s) => s.id === id)).filter(Boolean);
  const parDefaut = !sel.length;
  if (parDefaut) sel = SUJETS.slice(0, 3);
  return `
  <section class="view memo">
    <div class="page-head no-print">
      <span class="eyebrow">Fiche mémo</span>
      <h1>L'essentiel <span class="grad-text">sur un écran</span></h1>
      <p class="lead">${parDefaut ? "Tu n'as pas encore choisi de sujets : voici les trois premiers. " : ""}Une question, un chiffre, une nuance par sujet. À relire avant de te lancer, ou à imprimer.</p>
      <div class="btn-row">
        <button class="btn btn-primary" type="button" data-print>${icon("print", 18)} Imprimer</button>
        <a class="btn btn-ghost" href="#/sujets">Changer de sujets</a>
      </div>
    </div>
    <div class="memo-sheet">
      <h2 class="print-only">Gaucho · fiche mémo</h2>
      <div class="memo-grid">
        ${sel.map((s) => { const c = s.chiffres[0]; return `
          <div class="card memo-item" style="--c:${s.couleur}">
            <h3><span aria-hidden="true">${s.emoji}</span> ${esc(s.titre)}</h3>
            <p class="memo-q">« ${esc(s.question)} »</p>
            <p><strong class="memo-num">${esc(valeurTexte(c))}</strong> ${esc(c.label)} <span class="small-note">(${esc(SOURCES[c.source].editeur)}${estAncien(c) ? `, données de ${c.annee}` : ""})</span></p>
            <p class="memo-nuance"><b>Si on te dit « oui, mais »</b> ${esc(s.nuance)}</p>
          </div>`; }).join("")}
      </div>
      <div class="memo-grid memo-bas">
        <div class="card memo-item"><h3>La méthode</h3><ol class="memo-ol">${ETAPES.map((e) => `<li>${esc(e.titre)}</li>`).join("")}</ol></div>
        <div class="card memo-item"><h3>À éviter</h3><ul class="memo-ol">${A_EVITER.slice(0, 4).map((a) => `<li>${esc(a)}</li>`).join("")}</ul></div>
        <div class="card memo-item"><h3>Les dates</h3><p>Inscription : <b>${esc(VOTE.limiteInscription)}</b><br>1er tour : <b>${esc(VOTE.premierTour)}</b><br>2nd tour : <b>${esc(VOTE.secondTour)}</b></p></div>
      </div>
      <p class="small-note print-only">Chiffres vérifiés le ${esc(MAJ)}. Sources détaillées dans l'application.</p>
    </div>
  </section>`;
}

// ---------- Entraînement aux objections (cartes à retourner) ----------
let entrainement = { i: 0, sues: 0, revoir: [], ordre: null };
function viewEntrainement() {
  if (!entrainement.ordre) entrainement.ordre = OBJECTIONS.map((_, k) => k);
  const { i, ordre } = entrainement;
  if (i >= ordre.length) {
    const aRevoir = entrainement.revoir.map((k) => OBJECTIONS[k]);
    return `
    <section class="view quiz-wrap">
      <div class="card quiz-card">
        <span class="eyebrow" style="justify-self:center">Entraînement terminé</span>
        <div class="score grad-text">${entrainement.sues}/${ordre.length}</div>
        <p class="lead" style="margin:0 auto">${aRevoir.length ? "Les objections à revoir sont ci-dessous. Relis surtout ce qu'elles ont de vrai : c'est ce qui ouvre l'écoute." : "Tu avais toutes les réponses en tête. Prêt·e pour la vraie discussion."}</p>
        ${aRevoir.length ? `<ul class="list" style="text-align:left">${aRevoir.map((o) => `<li><span>« ${esc(o.objection)} »</span></li>`).join("")}</ul>` : ""}
        <div class="btn-row" style="justify-content:center">
          ${aRevoir.length ? `<button class="btn btn-primary" type="button" data-train="revoir">Revoir ces ${aRevoir.length} cartes</button>` : ""}
          <button class="btn btn-ghost" type="button" data-train="tout">Tout recommencer</button>
        </div>
      </div>
    </section>`;
  }
  const o = OBJECTIONS[ordre[i]];
  return `
  <section class="view quiz-wrap">
    <div class="page-head" style="margin-bottom:0">
      <span class="eyebrow">S'entraîner · carte ${i + 1}/${ordre.length}</span>
      <h1 class="sr-only">S'entraîner aux objections</h1>
      <div class="progress" aria-hidden="true"><span style="width:${(i / ordre.length) * 100}%"></span></div>
    </div>
    <div class="flip" id="flip">
      <div class="flip-inner">
        <div class="card flip-face flip-front">
          <span class="eyebrow">On te dit</span>
          <p class="q">« ${esc(o.objection)} »</p>
          <p class="small-note">Réfléchis à ta réponse : qu'est-ce qui est vrai là-dedans, et qu'est-ce que tu répondrais ?</p>
          <button class="btn btn-primary" type="button" id="retourner">${icon("flip", 18)} Retourner la carte</button>
        </div>
        <div class="card flip-face flip-back" aria-hidden="true">
          <div class="true"><b>Ce qui est vrai</b>${esc(o.vrai)}</div>
          <div class="resp"><b>Ce qu'on peut répondre</b>${esc(o.reponse)}</div>
          ${srcLinks(o.sources)}
          <div class="quiz-actions">
            <button class="qbtn" type="button" data-auto="ok" tabindex="-1">Je savais</button>
            <button class="qbtn" type="button" data-auto="ko" tabindex="-1">À revoir</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function bindEntrainement() {
  app.querySelectorAll("[data-train]").forEach((b) => b.addEventListener("click", () => {
    const ordre = b.dataset.train === "revoir" ? entrainement.revoir : null;
    entrainement = { i: 0, sues: 0, revoir: [], ordre };
    route();
  }));
  const flip = document.getElementById("flip");
  if (!flip) return;
  const dos = flip.querySelector(".flip-back"), face = flip.querySelector(".flip-front");
  document.getElementById("retourner").addEventListener("click", () => {
    flip.classList.add("is-flipped");
    dos.removeAttribute("aria-hidden"); face.setAttribute("aria-hidden", "true");
    dos.querySelectorAll("[data-auto]").forEach((x) => x.removeAttribute("tabindex"));
    dos.querySelector("[data-auto]").focus({ preventScroll: true });
  });
  dos.querySelectorAll("[data-auto]").forEach((b) => b.addEventListener("click", () => {
    const k = entrainement.ordre[entrainement.i];
    if (b.dataset.auto === "ok") entrainement.sues++; else entrainement.revoir.push(k);
    entrainement.i++;
    route();
  }));
}

// ---------- Kit terrain (A5 imprimable) ----------
function viewKit() {
  const choix = [["pouvoir-achat", 0], ["justice-fiscale", 0], ["sante", 0]].map(([id, k]) => { const s = SUJETS.find((x) => x.id === id); return { s, c: s.chiffres[k] }; });
  const lien = urlBase();
  return `
  <section class="view kit">
    <div class="page-head no-print">
      <span class="eyebrow">Kit terrain</span>
      <h1>Une feuille <span class="grad-text">à tendre</span></h1>
      <p class="lead">Format A5 : trois chiffres sourcés, les dates de l'élection et un QR code vers l'application. Pour un marché, une sortie d'école ou un repas de famille.</p>
      <div class="btn-row">
        <button class="btn btn-primary" type="button" data-print>${icon("print", 18)} Imprimer en A5</button>
      </div>
      <p class="small-note">Avant d'imprimer pour distribuer : complète l'éditeur et l'imprimeur dans les <a href="#/a-propos">mentions légales</a>, et ne distribue plus rien à partir de la veille du scrutin.</p>
    </div>
    <div class="kit-sheet">
      <p class="kit-eyebrow">Présidentielle · ${esc(VOTE.premierTour)}</p>
      <h2>On en parle ?</h2>
      <div class="kit-stats">
        ${choix.map(({ s, c }) => `
          <div class="kit-stat">
            <strong>${esc(valeurTexte(c))}</strong>
            <span>${esc(c.label)}</span>
            <small>${esc(SOURCES[c.source].editeur)}, ${esc(SOURCES[c.source].date)}${estAncien(c) ? ` (données de ${c.annee})` : ""}</small>
          </div>`).join("")}
      </div>
      <div class="kit-bas">
        <div>
          <p><b>Inscription jusqu'au ${esc(VOTE.limiteInscription)}</b><br>Vérifie ton inscription sur elections.interieur.gouv.fr</p>
          <p>1er tour ${esc(VOTE.premierTour)} · 2nd tour ${esc(VOTE.secondTour)}</p>
          <p class="kit-mention">Document militant en faveur de la gauche. Éditeur : ${esc(EDITEUR.nom)}. Imprimeur : ${esc(EDITEUR.imprimeur)}. Ne pas jeter sur la voie publique.</p>
        </div>
        <div class="kit-qr">${qrSvg(lien, 120)}<small>Sources, nuances et méthode</small></div>
      </div>
    </div>
  </section>`;
}

// ---------- Quoi de neuf ----------
function viewNouveautes() {
  const vu = store.get("vu-nouveautes", 0);
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Journal</span>
      <h1>Quoi de <span class="grad-text">neuf ?</span></h1>
      <p class="lead">Ce qui a changé dans l'application, et quand les chiffres ont été vérifiés pour la dernière fois (${esc(MAJ)}).</p>
    </div>
    <div class="timeline stagger">
      ${NOUVEAUTES.map((n) => `<div class="card event"><span class="year">${esc(n.date)}${n.id > vu ? ' <span class="nouveau">nouveau</span>' : ""}</span><h3>${esc(n.titre)}</h3><p>${esc(n.texte)}</p></div>`).join("")}
    </div>
  </section>`;
}

// ---------- À propos, mentions légales, confidentialité ----------
const CLES_LOCALES = ["sujets", "theme", "vu-nouveautes"];
function viewAPropos() {
  return `
  <section class="view">
    <div class="page-head">
      <span class="eyebrow">Transparence</span>
      <h1>À propos et <span class="grad-text">mentions légales</span></h1>
      <p class="lead">${esc(EDITEUR.independance)}</p>
    </div>
    <div class="blocks">
      <div class="card">
        <div class="label"><span class="dot"></span>Mentions légales</div>
        <dl class="mentions">
          <dt>Éditeur</dt><dd>${esc(EDITEUR.nom)}</dd>
          <dt>Directeur ou directrice de la publication</dt><dd>${esc(EDITEUR.directeur)}</dd>
          <dt>Contact</dt><dd>${esc(EDITEUR.contact)}</dd>
          <dt>Hébergeur</dt><dd>${esc(EDITEUR.hebergeur)}</dd>
        </dl>
      </div>
      <div class="card">
        <div class="label"><span class="dot"></span>Confidentialité</div>
        <p>Aucun compte, aucun cookie, aucune mesure d'audience, aucune publicité. Les polices sont hébergées avec l'application : ton appareil ne contacte aucun service tiers tant que tu n'ouvres pas une source ou un lien de partage.</p>
        <p style="margin-top:10px">Seuls ton choix de sujets, ton thème clair ou sombre et la dernière nouveauté vue sont gardés <b>sur ton appareil</b> (stockage local du navigateur). Rien n'est envoyé, et rien n'est enregistré sur la personne avec qui tu parles.</p>
        <div class="btn-row" style="margin-top:12px"><button class="btn btn-ghost" type="button" id="effacer">Effacer mes données locales</button></div>
      </div>
      <div class="card wide">
        <div class="label"><span class="dot"></span>Règles électorales respectées</div>
        <ul class="list">
          <li><span>Pas de publicité payante ni de contenu sponsorisé pour promouvoir l'application, comme l'interdit le code électoral pendant les six mois qui précèdent le scrutin.</span></li>
          <li><span>Période de réserve : à partir du vendredi qui précède chaque tour (veille du vote outre-mer) jusqu'au dimanche 20 h, les boutons de partage sont désactivés.</span></li>
          <li><span>Les propositions citées sont celles du programme commun de la gauche de 2024, présentées comme telles. Chaque chiffre renvoie à sa source et à sa nuance.</span></li>
        </ul>
      </div>
    </div>
  </section>`;
}

function bindAPropos() {
  const b = document.getElementById("effacer");
  if (!b) return;
  b.addEventListener("click", () => {
    try { CLES_LOCALES.forEach((k) => localStorage.removeItem(k)); } catch { /* indisponible */ }
    toast("Données locales effacées.");
  });
}

// ---------- Routeur ----------
function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [page, param] = hash.split("/");
  const rendu = () => {
    let html, bind;
    switch (page) {
      case "": html = viewAccueil(); break;
      case "sujets": html = viewSujets(); bind = bindSujets; break;
      case "sujet": html = viewSujet(param); break;
      case "argumentaire":
        if (param) store.set("sujets", param.split(",").filter((id) => SUJETS.some((s) => s.id === id)).slice(0, 3));
        html = viewArgumentaire(); break;
      case "profil": html = viewProfil(param); bind = bindProfil; break;
      case "voter": html = viewVoter(); break;
      case "table": html = viewTable(param); bind = bindTable; break;
      case "objections": html = viewObjections(); bind = bindObjections; break;
      case "dialogue": html = viewDialogue(); break;
      case "quiz": html = viewQuiz(); bind = bindQuiz; break;
      case "histoire": html = viewHistoire(); break;
      case "sources": html = viewSources(); break;
      case "fiche": html = viewFiche(param); break;
      case "memo": html = viewMemo(); break;
      case "entrainement": html = viewEntrainement(); bind = bindEntrainement; break;
      case "kit": html = viewKit(); break;
      case "nouveautes": html = viewNouveautes(); store.set("vu-nouveautes", NOUVEAUTES[0].id); break;
      case "a-propos": html = viewAPropos(); bind = bindAPropos; break;
      default: html = viewIntrouvable();
    }
    const reserve = periodeReserve();
    document.body.classList.toggle("reserve", !!reserve);
    if (reserve) html = `<div class="card reserve-banner" role="status"><strong>Période de réserve électorale (${esc(reserve.tour)})</strong> Le code électoral interdit toute nouvelle propagande à partir de la veille du scrutin. Le partage est désactivé jusqu'à dimanche 20 h. <a href="#/voter">Où et comment voter</a></div>` + html;
    if (page !== "table") libererEcran();
    app.innerHTML = html;
    document.body.classList.toggle("mode-table", page === "table");
    renderNav(["argumentaire", "sujets", "table", "memo"].includes(page) ? "sujet" : page === "entrainement" ? "objections" : ["profil", "fiche"].includes(page) ? "" : page);
    bind && bind();
    bindPartage();
    animerCompteurs();
    window.scrollTo({ top: 0 });
    // Accessibilité : titre de l'onglet et focus sur le nouveau contenu.
    const h1 = app.querySelector("h1");
    document.title = h1 && page ? `${h1.textContent.trim()} · Gaucho` : "Gaucho · Parlons de ce qui compte";
    if (!premierChargement) {
      const cible = page === "table" ? document.getElementById("track") : h1;
      if (cible) { if (!cible.hasAttribute("tabindex")) cible.setAttribute("tabindex", "-1"); cible.focus({ preventScroll: true }); }
    }
    premierChargement = false;
  };
  if (premierRendu || !document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    premierRendu = false;
    rendu();
    return;
  }
  const t = document.startViewTransition(rendu);
  t.ready.catch(() => {});
  t.finished.catch(() => {});
}
let premierRendu = true;
let premierChargement = true;

// ---------- Thème ----------
const root = document.documentElement;
const themeSaved = store.get("theme", null);
root.dataset.theme = themeSaved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
const majThemeColor = () => document.querySelector('meta[name="theme-color"]').setAttribute("content", root.dataset.theme === "dark" ? "#0b0b14" : "#f7f6fb");
majThemeColor();
document.getElementById("theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", root.dataset.theme);
  majThemeColor();
});

// Installation (Android, ordinateur) : on garde l'invitation pour un bouton discret.
let invitationInstall = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  invitationInstall = e;
  app.querySelectorAll("[data-installer]").forEach((x) => { x.hidden = false; });
});

window.addEventListener("hashchange", route);
route();

// Hors ligne : seulement pour la version hébergée avec son manifeste (pas pour le fichier unique).
if ("serviceWorker" in navigator && document.querySelector('link[rel="manifest"]') && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
