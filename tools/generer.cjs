// Génère les fichiers statiques pour la version hébergée :
//  - s/<sujet>.html : une page par sujet avec ses balises d'aperçu (Open Graph), qui renvoie vers la fiche ;
//  - og/*.png : les images d'aperçu 1200×630 ;
//  - icons/*.png : les icônes d'installation (192, 512, masquable, Apple).
// Lancer : npm run generer   (option : SITE=https://exemple.fr/ pour des adresses absolues)
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const racine = path.join(__dirname, "..");
const site = (process.env.SITE || "").replace(/\/?$/, process.env.SITE ? "/" : "");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n, dec = 0) => n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
const valeur = (c) => c.affichage || fmt(c.valeur, c.decimales) + c.unite;
const police = (f) => `data:font/woff2;base64,${fs.readFileSync(path.join(racine, "fonts", f)).toString("base64")}`;

const gabarit = ({ couleur, haut, grand, texte, bas }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; font-weight: 400 700; src: url(${police("inter-latin.woff2")}); }
@font-face { font-family: "Space Grotesk"; font-weight: 500 700; src: url(${police("space-grotesk-latin.woff2")}); }
html, body { margin: 0; width: 1200px; height: 630px; }
body { box-sizing: border-box; padding: 64px 72px; color: #fff; font-family: Inter, sans-serif; display: flex; flex-direction: column; justify-content: space-between;
  background: radial-gradient(90% 120% at 0% 0%, ${couleur}99 0%, transparent 60%), linear-gradient(135deg, #14122b, #0b0b14); }
.haut { font: 600 34px "Space Grotesk", sans-serif; opacity: .95; }
.grand { font: 700 128px/1 "Space Grotesk", sans-serif; letter-spacing: -0.04em; margin: 18px 0 14px; }
.texte { font-size: 34px; line-height: 1.3; max-width: 1000px; }
.bas { display: flex; justify-content: space-between; font-size: 24px; opacity: .75; }
</style></head><body><div><div class="haut">${esc(haut)}</div><div class="grand">${esc(grand)}</div><div class="texte">${esc(texte)}</div></div><div class="bas">${bas}</div></body></html>`;

(async () => {
  const { SUJETS, SOURCES, MAJ } = await import(pathToFileURL(path.join(racine, "data.js")).href);
  for (const d of ["s", "og", "icons"]) fs.mkdirSync(path.join(racine, d), { recursive: true });

  // Pages par sujet.
  for (const s of SUJETS) {
    const c = s.chiffres[0];
    const titre = `${s.titre} : ${valeur(c)} ${c.label}`;
    const desc = `${s.accroche} Chiffres sourcés (${SOURCES[c.source].editeur}) et ce qui fait débat. Outil militant en faveur de la gauche.`;
    const cible = `../#/fiche/${s.id}`;
    fs.writeFileSync(path.join(racine, "s", `${s.id}.html`), `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(s.titre)} · Gaucho</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Gaucho">
  <meta property="og:title" content="${esc(titre)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${site ? `${site}og/${s.id}.png` : `../og/${s.id}.png`}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  ${site ? `<meta property="og:url" content="${site}s/${s.id}.html">\n  <link rel="canonical" href="${site}#/fiche/${s.id}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta http-equiv="refresh" content="0; url=${cible}">
  <script>location.replace(${JSON.stringify(cible)});</script>
</head>
<body style="font-family:system-ui,sans-serif;background:#0b0b14;color:#f4f3fb;padding:24px">
  <p><a href="${cible}" style="color:#ff7a59">Ouvrir la fiche « ${esc(s.titre)} »</a></p>
</body>
</html>
`);
  }

  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const rendre = async (html, fichier) => { await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: path.join(racine, fichier) }); };
  const pied = `<span>Outil militant pro-gauche · gaucho</span><span>Chiffres vérifiés le ${esc(MAJ)}</span>`;
  for (const s of SUJETS) {
    const c = s.chiffres[0];
    await rendre(gabarit({ couleur: s.couleur, haut: `${s.emoji}  ${s.titre}`, grand: valeur(c), texte: c.label, bas: pied }), `og/${s.id}.png`);
  }
  await rendre(gabarit({ couleur: "#ff3d6e", haut: "Gaucho", grand: "Parlons de ce qui compte.", texte: "Des chiffres vérifiés, leurs nuances et une méthode respectueuse pour parler politique avec un proche.", bas: pied })
    .replace(".grand { font: 700 128px/1", ".grand { font: 700 92px/1.05"), "og/accueil.png");

  // Icônes d'installation à partir d'icon.svg.
  const svg = fs.readFileSync(path.join(racine, "icon.svg"), "utf8");
  const icone = async (taille, fichier, masquable = false) => {
    await p.setViewportSize({ width: taille, height: taille });
    const interieur = masquable ? svg.replace('rx="18"', 'rx="0"').replace("<path", '<g transform="translate(9.6 9.6) scale(.7)"><path').replace("</svg>", "</g></svg>") : svg;
    await p.setContent(`<html><body style="margin:0;background:transparent">${interieur.replace("<svg ", `<svg width="${taille}" height="${taille}" `)}</body></html>`);
    await p.screenshot({ path: path.join(racine, fichier), omitBackground: !masquable, clip: { x: 0, y: 0, width: taille, height: taille } });
  };
  await icone(192, "icons/icon-192.png");
  await icone(512, "icons/icon-512.png");
  await icone(512, "icons/icon-maskable-512.png", true);
  await icone(180, "icons/apple-touch-icon.png", true);
  await b.close();
  console.log(`OK : ${SUJETS.length} pages par sujet, ${SUJETS.length + 1} images d'aperçu, 4 icônes.`);
})().catch((e) => { console.error(e); process.exit(1); });
