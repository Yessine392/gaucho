import { SOURCES, SUJETS, OBJECTIONS, QUIZ, HISTOIRE, ETAPES, A_EVITER, MAJ } from "./data.js";

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
};
const icon = (n, size = 20, fill = false) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="${fill ? "currentColor" : "none"}" stroke="${fill ? "none" : "currentColor"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

// ---------- Navigation ----------
const NAV = [
  { href: "#/", label: "Accueil", icon: "home", match: (r) => r === "" },
  { href: "#/sujets", label: "Sujets", icon: "grid", match: (r) => r.startsWith("sujet") },
  { href: "#/objections", label: "Objections", icon: "shield", match: (r) => r === "objections" },
  { href: "#/dialogue", label: "Dialogue", icon: "chat", match: (r) => r === "dialogue" },
  { href: "#/quiz", label: "Quiz", icon: "spark", match: (r) => r === "quiz" },
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
        <p>5 étapes tirées de la recherche pour changer d'avis durablement.</p>
      </a>
      <a class="card tile span-2" href="#/histoire">
        <span class="tile-arrow">${icon("arrow", 16)}</span>
        <h3>Ce que la gauche a changé</h3>
        <p>Congés payés, Sécu, retraite à 60 ans… ${HISTOIRE.length} dates qui ont changé la vie.</p>
      </a>
    </div>

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
    go.toggleAttribute("aria-disabled", n === 0);
    go.style.pointerEvents = n === 0 ? "none" : "";
    go.style.opacity = n === 0 ? ".4" : "";
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
        <div class="label"><span class="dot"></span>Ce que propose la gauche</div>
        <ul class="list">${s.propositions.map((p) => `<li><span>${esc(p)}</span></li>`).join("")}</ul>
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
    <div class="pager">
      <a class="btn btn-ghost" href="#/sujet/${prev.id}">← ${esc(prev.titre)}</a>
      <button class="btn btn-ghost" type="button" data-share="${s.id}">${icon("share", 18)} Partager</button>
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
        <button class="btn btn-primary" type="button" data-share="${sel.map((s) => s.id).join(",")}">${icon("share", 18)} Envoyer ou copier</button>
        <a class="btn btn-ghost" href="#/dialogue">Revoir les 5 étapes</a>
      </div>
    </div>
    ${sel.map((s) => `<div class="section">${blocSujet(s, { compact: true })}</div>`).join("")}
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
      <p class="lead">Des expériences menées auprès de milliers d'électeurs montrent qu'une conversation sans jugement, où l'on échange des histoires personnelles, change les avis durablement. Les arguments seuls, eux, n'ont presque pas d'effet.</p>
      ${srcLinks(["kalla2020", "broockman2016"])}
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

function viewIntrouvable() {
  return `<section class="view"><div class="page-head"><h1>Page introuvable</h1><p class="lead">Ce lien ne mène nulle part.</p></div><a class="btn btn-primary" href="#/">Retour à l'accueil</a></section>`;
}

function footer() {
  return `<div class="footer-links"><a href="#/histoire">Ce que la gauche a changé</a>·<a href="#/sources">Sources et méthode</a>·<span>Chiffres vérifiés le ${esc(MAJ)}</span></div>`;
}

// ---------- Partage ----------
function texteSujet(s) {
  const c = s.chiffres[0];
  const src = SOURCES[c.source];
  return `${s.emoji} ${s.titre} : ${c.affichage || fmt(c.valeur, c.decimales) + c.unite} ${c.label} (source : ${src.editeur}, ${src.url}).`;
}

async function partager(texte) {
  const url = location.href.split("#")[0];
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
    partager(ids.map((id) => texteSujet(SUJETS.find((s) => s.id === id))).join("\n\n"));
  }));
  app.querySelectorAll("[data-share-quiz]").forEach((b) => b.addEventListener("click", () => {
    partager(`J'ai eu ${b.dataset.shareQuiz}/${QUIZ.length} au vrai ou faux sur la pauvreté, les impôts et les services publics, chaque réponse avec sa source. On le fait ensemble ?`);
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
      case "argumentaire": html = viewArgumentaire(); break;
      case "objections": html = viewObjections(); bind = bindObjections; break;
      case "dialogue": html = viewDialogue(); break;
      case "quiz": html = viewQuiz(); bind = bindQuiz; break;
      case "histoire": html = viewHistoire(); break;
      case "sources": html = viewSources(); break;
      default: html = viewIntrouvable();
    }
    app.innerHTML = html;
    renderNav(page === "argumentaire" ? "sujet" : page === "sujets" ? "sujet" : page);
    bind && bind();
    bindPartage();
    animerCompteurs();
    window.scrollTo({ top: 0 });
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
