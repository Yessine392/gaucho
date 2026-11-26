// Vérifie que chaque contenu publié renvoie à une source existante.
// Lancer : node tests/data.test.mjs
import assert from "node:assert/strict";
import { SOURCES, SUJETS, OBJECTIONS, QUIZ } from "../data.js";

const ids = new Set(Object.keys(SOURCES));
const verifier = (id, ou) => assert.ok(ids.has(id), `Source inconnue « ${id} » dans ${ou}`);
let n = 0;

for (const [id, s] of Object.entries(SOURCES)) {
  assert.match(s.url, /^https:\/\//, `URL non https pour ${id}`);
  for (const k of ["titre", "editeur", "date"]) assert.ok(s[k], `Champ ${k} manquant pour ${id}`);
}

for (const s of SUJETS) {
  assert.ok(s.chiffres.length > 0, `${s.id} : aucun chiffre`);
  for (const c of s.chiffres) { verifier(c.source, `${s.id} (chiffre)`); assert.equal(typeof c.valeur, "number"); n++; }
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

for (const q of QUIZ) { verifier(q.source, `quiz « ${q.affirmation.slice(0, 30)}… »`); assert.equal(typeof q.reponse, "boolean"); n++; }

const utilisees = new Set([
  ...SUJETS.flatMap((s) => [...s.chiffres.map((c) => c.source), ...s.constatSources, ...s.propositionsSource, s.nuanceSource]),
  ...OBJECTIONS.flatMap((o) => o.sources), ...QUIZ.map((q) => q.source),
]);
const orphelines = [...ids].filter((id) => !utilisees.has(id) && !["kalla2020", "broockman2016"].includes(id));
assert.deepEqual(orphelines, [], `Sources jamais citées : ${orphelines.join(", ")}`);

console.log(`OK : ${n} contenus vérifiés, ${ids.size} sources.`);
