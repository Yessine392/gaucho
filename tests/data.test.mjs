// Vérifie que chaque contenu publié renvoie à une source existante.
// Lancer : node tests/data.test.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { SOURCES, SUJETS, OBJECTIONS, QUIZ, HISTOIRE, PROFILS, VOTE, CADRE_PROPOSITIONS, RECHERCHE_DIALOGUE, EDITEUR, RESERVE, NOUVEAUTES, MAJ } from "../data.js";

const ids = new Set(Object.keys(SOURCES));
const verifier = (id, ou) => assert.ok(ids.has(id), `Source inconnue « ${id} » dans ${ou}`);
let n = 0;

for (const [id, s] of Object.entries(SOURCES)) {
  assert.match(s.url, /^https:\/\//, `URL non https pour ${id}`);
  for (const k of ["titre", "editeur", "date"]) assert.ok(s[k], `Champ ${k} manquant pour ${id}`);
}

for (const s of SUJETS) {
  assert.ok(s.chiffres.length > 0, `${s.id} : aucun chiffre`);
  for (const c of s.chiffres) {
    verifier(c.source, `${s.id} (chiffre)`); assert.equal(typeof c.valeur, "number");
    // « D'où vient ce chiffre » : année des données et définition obligatoires.
    assert.ok(Number.isInteger(c.annee) && c.annee > 1990 && c.annee <= Number(MAJ.match(/\d{4}/)[0]), `${s.id} : année des données manquante ou invalide`);
    assert.ok(c.definition && c.definition.length > 30, `${s.id} : définition du chiffre manquante`);
    n++;
  }
  assert.ok(s.constatSources.length, `${s.id} : constat sans source`);
  s.constatSources.forEach((x) => verifier(x, `${s.id} (constat)`));
  assert.ok(Array.isArray(s.propositionsSource) && s.propositionsSource.length, `${s.id} : propositions sans source`);
  s.propositionsSource.forEach((x) => verifier(x, `${s.id} (propositions)`));
  verifier(s.nuanceSource, `${s.id} (nuance)`);
  assert.ok(s.nuance.length > 40, `${s.id} : la nuance est obligatoire`);
  n += 3;
}

for (const o of OBJECTIONS) {
  assert.ok(o.vrai && o.reponse, `${o.id} : il faut ce qui est vrai et une réponse`);
  assert.ok(o.sources.length, `${o.id} : objection sans source`);
  o.sources.forEach((x) => verifier(x, `objection ${o.id}`));
  n++;
}

for (const q of QUIZ) {
  verifier(q.source, `quiz « ${q.affirmation.slice(0, 30)}… »`); assert.equal(typeof q.reponse, "boolean");
  assert.ok(q.nuance && q.nuance.length > 40, `quiz « ${q.affirmation.slice(0, 30)}… » : nuance obligatoire`);
  n++;
}

for (const h of HISTOIRE) {
  const hs = h.sources || [h.source];
  assert.ok(hs.length && hs.every(Boolean), `histoire ${h.annee} : date sans source`);
  hs.forEach((x) => verifier(x, `histoire ${h.annee}`));
  n++;
}

// Version hébergée : une page d'aperçu par sujet (npm run generer).
for (const s of SUJETS) assert.ok(existsSync(new URL(`../s/${s.id}.html`, import.meta.url)), `page s/${s.id}.html manquante : lancer npm run generer`);

// Mentions légales, période de réserve, nouveautés.
for (const k of ["nom", "directeur", "contact", "hebergeur", "imprimeur", "independance"]) assert.ok(EDITEUR[k], `mention légale « ${k} » absente`);
for (const r of RESERVE) {
  const debut = new Date(r.debut), fin = new Date(r.fin);
  assert.ok(!isNaN(debut) && !isNaN(fin) && debut < fin, `période de réserve invalide (${r.tour})`);
}
assert.ok(new Date(RESERVE[0].fin) <= new Date(`${VOTE.iso.premierTour}T23:59:59+02:00`), "réserve du premier tour après le scrutin");
assert.ok(new Date(RESERVE[1].fin) <= new Date(`${VOTE.iso.secondTour}T23:59:59+02:00`), "réserve du second tour après le scrutin");
const idsNouv = NOUVEAUTES.map((x) => x.id);
assert.deepEqual(idsNouv, [...idsNouv].sort((a, b) => b - a), "nouveautés : du plus récent au plus ancien");

const sujetIds = new Set(SUJETS.map((s) => s.id));
const objIds = new Set(OBJECTIONS.map((o) => o.id));
assert.equal(sujetIds.size, SUJETS.length, "id de sujet en double");
assert.equal(objIds.size, OBJECTIONS.length, "id d'objection en double");
for (const p of PROFILS) {
  p.sujets.forEach((id) => assert.ok(sujetIds.has(id), `profil ${p.id} : sujet inconnu ${id}`));
  p.objections.forEach((id) => assert.ok(objIds.has(id), `profil ${p.id} : objection inconnue ${id}`));
  assert.ok(p.sujets.length <= 3, `profil ${p.id} : 3 sujets maximum`);
  n++;
}
const autres = [...VOTE.sources, ...VOTE.rechercheSources, CADRE_PROPOSITIONS.source, ...RECHERCHE_DIALOGUE.sources];
autres.forEach((x) => verifier(x, "pages Voter, Dialogue ou propositions"));
VOTE.liens.forEach((l) => assert.match(l.url, /^https:\/\//));

const utilisees = new Set([
  ...SUJETS.flatMap((s) => [...s.chiffres.map((c) => c.source), ...s.constatSources, ...s.propositionsSource, s.nuanceSource]),
  ...OBJECTIONS.flatMap((o) => o.sources), ...QUIZ.map((q) => q.source), ...HISTOIRE.flatMap((h) => h.sources || [h.source]), ...autres,
]);
const orphelines = [...ids].filter((id) => !utilisees.has(id));
assert.deepEqual(orphelines, [], `Sources jamais citées : ${orphelines.join(", ")}`);

console.log(`OK : ${n} contenus vérifiés, ${ids.size} sources.`);
