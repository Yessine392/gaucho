import { SOURCES, SUJETS, OBJECTIONS, QUIZ, HISTOIRE, ETAPES, A_EVITER, MAJ, PROFILS, VOTE, CADRE_PROPOSITIONS, RECHERCHE_DIALOGUE } from "./data.js";

const app = document.getElementById("app");

// ---------- Petits utilitaires ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

const srcLink = (id, { texte = false } = {}) => {
  const s = SOURCES[id];
  if (!s) return "";
  // Dans une tuile déjà cliquable, pas de lien imbriqué : on affiche la source en texte.
  if (texte) return `<span class="source-link">Source : ${esc(s.editeur)}, ${esc(s.date)}</span>`;
  return `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.editeur)}, ${esc(s.date)}</a>`;
};
const srcLinks = (ids) => `<div class="sources-inline">${[...new Set(ids)].map(srcLink).join("")}</div>`;

const fmt = (n, dec = 0) => n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });

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
      <span><strong>Premier tour le ${esc(VOTE.premierTour)}</strong><br><span class="sub">Inscription jusqu'au ${esc(VOTE.limiteInscription)}. Vérifier, s'inscrire, faire une procuration.</span></span>
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

function blocSujet(s, { compact = false } = {}) {
  return `
    <div class="subject-hero" style="--c:${s.couleur}">
      <span class="emoji" aria-hidden="true">${s.emoji}</span>
      ${compact ? `<h2 style="font-size:2rem">${esc(s.titre)}</h2>` : `<h1>${esc(s.titre)}</h1>`}
      <p class="lead">${esc(s.accroche)}</p>
      <div class="ask"><b>Question pour ouvrir</b>« ${esc(s.question)} »</div>
    </div>
    <div class="stats stagger">
      ${s.chiffres.map((c) => `
        <div class="card stat" style="--c:${s.couleur}">
          <div class="num" ${c.affichage ? "" : `data-count="${c.valeur}" data-dec="${c.decimales}" data-unit="${esc(c.unite)}"`}>${c.affichage ? esc(c.affichage) : fmt(c.valeur, c.decimales) + esc(c.unite)}</div>
          <p>${esc(c.label)}</p>
          ${srcLink(c.source)}
        </div>`).join("")}
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
      <button class="btn btn-ghost" type="button" data-share="${s.id}">${icon("share", 18)} Partager le lien</button>
      <button class="btn btn-ghost" type="button" data-image="${s.id}">${icon("image", 18)} Image à partager</button>
    </div>
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
      ${HISTOIRE.map((h) => `<div class="card event"><span class="year">${esc(h.annee)}</span><h3>${esc(h.titre)}</h3><p>${esc(h.texte)}</p>${h.source ? `<div class="sources-inline">${srcLink(h.source)}</div>` : ""}</div>`).join("")}
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
    <p class="small-note">${esc(VOTE.exception)} ${srcLinks(VOTE.sources)}</p>
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

async function imageSujet(s) {
  const W = 1080, H = 1350, P = 90;
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
  let y = P + 40;
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 44px 'Space Grotesk', sans-serif";
  ctx.fillText(`${s.emoji}  ${s.titre}`, P, y);
  y += 220;
  ctx.font = "700 190px 'Space Grotesk', sans-serif";
  ctx.fillText(c.affichage || fmt(c.valeur, c.decimales) + c.unite, P, y);
  y += 90;
  ctx.font = "500 46px Inter, sans-serif";
  for (const l of lignes(ctx, c.label, W - 2 * P)) { ctx.fillText(l, P, y); y += 62; }
  y += 10;
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "400 32px Inter, sans-serif";
  ctx.fillText(`Source : ${src.editeur}, ${src.date}`, P, y);
  y += 90;
  ctx.fillStyle = "rgba(245,158,11,.16)";
  ctx.font = "400 34px Inter, sans-serif";
  const nuance = lignes(ctx, s.nuance, W - 2 * P - 70).slice(0, 7);
  const hBoite = 90 + nuance.length * 48;
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(P, y, W - 2 * P, hBoite, 28) : ctx.rect(P, y, W - 2 * P, hBoite); ctx.fill();
  ctx.fillStyle = "#fbbf24"; ctx.font = "700 28px Inter, sans-serif";
  ctx.fillText("LA NUANCE À CONNAÎTRE", P + 30, y + 52);
  ctx.fillStyle = "#ffffff"; ctx.font = "400 34px Inter, sans-serif";
  nuance.forEach((l, i) => ctx.fillText(l, P + 30, y + 104 + i * 48));
  ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = "500 30px Inter, sans-serif";
  ctx.fillText("gaucho · chiffres vérifiés le " + MAJ, P, H - P);
  return new Promise((res) => cv.toBlob(res, "image/png"));
}

async function partagerImage(id) {
  const s = SUJETS.find((x) => x.id === id);
  if (!s) return;
  const blob = await imageSujet(s);
  if (!blob) { toast("Impossible de créer l'image."); return; }
  const fichier = new File([blob], `gaucho-${s.id}.png`, { type: "image/png" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
      await navigator.share({ files: [fichier], title: s.titre, text: texteSujet(s) });
      return;
    }
  } catch (e) { if (e && e.name === "AbortError") return; }
  // Dans la visionneuse claude.ai, l'enregistrement passe par la capacité « downloads ».
  const dl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
  if (dl) {
    try { await dl.save({ filename: fichier.name, data: blob }); toast("Image enregistrée."); }
    catch (e) { if (!e || e.code !== "declined") toast("Impossible d'enregistrer l'image ici."); }
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = fichier.name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  toast("Image enregistrée.");
}

function viewIntrouvable() {
  return `<section class="view"><div class="page-head"><h1>Page introuvable</h1><p class="lead">Ce lien ne mène nulle part.</p></div><a class="btn btn-primary" href="#/">Retour à l'accueil</a></section>`;
}

function footer() {
  return `<div class="footer-links"><a href="#/quiz">Vrai ou faux</a>·<a href="#/histoire">Ce que la gauche a changé</a>·<a href="#/sources">Sources et méthode</a>·<span>Chiffres vérifiés le ${esc(MAJ)}</span></div>`;
}

// ---------- Partage ----------
function texteSujet(s) {
  const c = s.chiffres[0];
  const src = SOURCES[c.source];
  return `${s.emoji} ${s.titre} : ${c.affichage || fmt(c.valeur, c.decimales) + c.unite} ${c.label} (source : ${src.editeur}, ${src.url}).`;
}

async function partager(texte, chemin = "") {
  const url = location.href.split("#")[0] + chemin;
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
    partager(ids.map((id) => texteSujet(SUJETS.find((s) => s.id === id))).join("\n\n"), ids.length === 1 ? `#/sujet/${ids[0]}` : `#/argumentaire/${ids.join(",")}`);
  }));
  app.querySelectorAll("[data-image]").forEach((b) => b.addEventListener("click", () => partagerImage(b.dataset.image)));
  app.querySelectorAll("[data-share-quiz]").forEach((b) => b.addEventListener("click", () => {
    partager(`J'ai eu ${b.dataset.shareQuiz}/${QUIZ.length} au vrai ou faux sur la pauvreté, les impôts et les services publics, chaque réponse avec sa source. On le fait ensemble ?`, "#/quiz");
  }));
  app.querySelectorAll("[data-share-vote]").forEach((b) => b.addEventListener("click", () => {
    partager(`Présidentielle : inscription jusqu'au ${VOTE.limiteInscription}, premier tour le ${VOTE.premierTour}, second tour le ${VOTE.secondTour}.\n${VOTE.liens.map((l) => `${l.titre} : ${l.url}`).join("\n")}`, "#/voter");
  }));
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
      default: html = viewIntrouvable();
    }
    if (page !== "table") libererEcran();
    app.innerHTML = html;
    document.body.classList.toggle("mode-table", page === "table");
    renderNav(["argumentaire", "sujets", "table"].includes(page) ? "sujet" : page === "profil" ? "" : page);
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
document.getElementById("theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", root.dataset.theme);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", root.dataset.theme === "dark" ? "#0b0b14" : "#f7f6fb");
});

window.addEventListener("hashchange", route);
route();

// Hors ligne : seulement pour la version hébergée avec son manifeste (pas pour le fichier unique).
if ("serviceWorker" in navigator && document.querySelector('link[rel="manifest"]') && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
