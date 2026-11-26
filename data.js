// Toutes les données de l'application.
// Règle : chaque chiffre renvoie à une source (clé de SOURCES). Le test
// tests/data.test.mjs vérifie qu'aucun fait n'est publié sans source.
// Dernière vérification des chiffres : 26 novembre 2026.

export const MAJ = "26 novembre 2026";

export const SOURCES = {
  inseePauvrete: {
    titre: "Niveau de vie et pauvreté en 2023",
    editeur: "Insee Première n° 2063",
    date: "juillet 2025",
    url: "https://www.insee.fr/fr/statistiques/8600989",
  },
  inseePauvrete2117: {
    titre: "En 2024, le taux de pauvreté est stable et les inégalités atteignent un niveau inédit depuis trente ans",
    editeur: "Insee Première n° 2117",
    date: "juillet 2026",
    url: "https://www.insee.fr/fr/statistiques/9019316",
  },
  ippMilliardaires: {
    titre: "Quels impôts les milliardaires paient-ils ? (note n° 92)",
    editeur: "Institut des politiques publiques",
    date: "juin 2023",
    url: "https://www.ipp.eu/publication/note-ipp-n92-quels-impots-les-milliardaires-paient-ils/",
  },
  anRapportZucman: {
    titre: "Rapport sur la proposition de loi « impôt plancher de 2 % » (500 plus grandes fortunes, d'après Challenges)",
    editeur: "Assemblée nationale, commission des finances",
    date: "février 2025",
    url: "https://www.assemblee-nationale.fr/dyn/17/rapports/cion_fin/l17b0930_rapport-fond.pdf",
  },
  senatZucman: {
    titre: "Taxe « Zucman » : le Sénat rejette la création d'un nouvel impôt sur les ultra-riches",
    editeur: "Public Sénat",
    date: "12 juin 2025",
    url: "https://www.publicsenat.fr/actualites/economie/taxe-zucman-le-senat-rejette-la-creation-dun-nouvel-impot-sur-les-ultra-riches",
  },
  senatHautsPatrimoines: {
    titre: "Rapport d'information sur l'imposition des hauts patrimoines (chiffrage de la DG Trésor)",
    editeur: "Sénat",
    date: "juin 2026",
    url: "https://www.senat.fr/rap/r25-760/r25-7601.pdf",
  },
  senatAides: {
    titre: "Commission d'enquête sur les aides publiques aux grandes entreprises",
    editeur: "Sénat, rapport n° 808",
    date: "juillet 2025",
    url: "https://www.senat.fr/rap/r24-808-1/r24-808-18.html",
  },
  franceStrategieISF: {
    titre: "Suppression de l'ISF, IFI, flat tax : quel bilan ?",
    editeur: "Vie publique, d'après France Stratégie",
    date: "octobre 2021",
    url: "https://www.vie-publique.fr/en-bref/281993-suppression-de-lisf-bilan-2021-sur-la-fiscalite-du-capital",
  },
  ippExpatriation: {
    titre: "Effets sur la création d'entreprises, l'expatriation et la circulation de l'épargne des réformes de la fiscalité du capital",
    editeur: "Institut des politiques publiques",
    date: "octobre 2023",
    url: "https://www.ipp.eu/publication/effets-sur-la-creation-dentreprises-lexpatriation-et-la-circulation-de-lepargne-des-reformes-de-la-fiscalite-du-capital/",
  },
  dreesLits: {
    titre: "Établissements de santé : baisse modérée des lits en 2025",
    editeur: "Drees, Études et Résultats n° 1394",
    date: "octobre 2026",
    url: "https://drees.solidarites-sante.gouv.fr/publications-communique-de-presse/etudes-et-resultats/261028-etablissements-de-sante-baisse-moderee-des-lits-en-2025-et-progression-des-places-hopistalisation",
  },
  fondationLogement: {
    titre: "L'état du mal-logement en France 2026 (31e rapport)",
    editeur: "Fondation pour le logement des défavorisés",
    date: "février 2026",
    url: "https://www.fondationpourlelogement.fr/wp-content/uploads/2026/02/reml-2026-rapport-etat-mal-logement-2026.pdf",
  },
  onrePassoires: {
    titre: "Le parc de logements par classe de performance énergétique au 1er janvier 2025",
    editeur: "SDES / Observatoire national de la rénovation énergétique",
    date: "novembre 2025",
    url: "https://www.statistiques.developpement-durable.gouv.fr/le-parc-de-logements-par-classe-de-performance-energetique-au-1er-janvier-2025",
  },
  ofceCarbone: {
    titre: "Riches et pauvres, inégaux dans la capacité à polluer (données OFCE)",
    editeur: "Observatoire des inégalités",
    date: "décembre 2022",
    url: "https://www.inegalites.fr/emissions-co2",
  },
  inseeDette: {
    titre: "Le compte des administrations publiques en 2025",
    editeur: "Insee Première n° 2106",
    date: "mai 2026",
    url: "https://www.insee.fr/fr/statistiques/8997691",
  },
  viePubliqueRetraites: {
    titre: "Loi du 30 décembre 2025 de financement de la sécurité sociale pour 2026",
    editeur: "Vie publique",
    date: "janvier 2026",
    url: "https://www.vie-publique.fr/loi/300445-loi-de-financement-de-la-securite-sociale-2026-retraites-lfss",
  },
  senatRetraites: {
    titre: "Projet de loi de finances pour 2027 : régimes sociaux et de retraite",
    editeur: "Sénat, rapport général n° 156",
    date: "novembre 2026",
    url: "https://www.senat.fr/rap/l26-156-325/l26-156-3250.html",
  },
  senatRetablitRetraites: {
    titre: "Le Sénat rétablit la réforme des retraites de 2023, contre l'avis du gouvernement",
    editeur: "Public Sénat",
    date: "17 novembre 2026",
    url: "https://www.publicsenat.fr/actualites/politique/le-senat-vote-la-reactivation-de-la-reforme-des-retraites-de-2023-contre-lavis-du-gouvernement",
  },
  inseeImmigres: {
    titre: "Population immigrée et étrangère en France",
    editeur: "Insee",
    date: "juin 2026",
    url: "https://www.insee.fr/fr/statistiques/2381757",
  },
  inseeImmigresUE: {
    titre: "L'essentiel sur… les immigrés et les étrangers",
    editeur: "Insee",
    date: "juin 2026",
    url: "https://www.insee.fr/fr/statistiques/3633212",
  },
  ocdeImmigration: {
    titre: "Perspectives des migrations internationales 2021, chapitre sur l'incidence budgétaire",
    editeur: "OCDE",
    date: "octobre 2021",
    url: "https://www.oecd.org/content/dam/oecd/fr/publications/reports/2021/10/international-migration-outlook-2021_ea4f9277/da2bbd99-fr.pdf",
  },
  financePourTousOCDE: {
    titre: "L'immigration n'est pas un fardeau pour les finances publiques (résumé de l'étude OCDE)",
    editeur: "La finance pour tous",
    date: "novembre 2021",
    url: "https://www.lafinancepourtous.com/2021/11/17/limmigration-nest-pas-un-fardeau-pour-les-finances-publiques",
  },
  montaigneRetraites: {
    titre: "Législatives 2024 : abroger la réforme des retraites et restaurer la retraite à 60 ans (chiffrage)",
    editeur: "Institut Montaigne (think tank libéral)",
    date: "juillet 2024",
    url: "https://www.institutmontaigne.org/legislatives-2024/nouveau-front-populaire/abroger-la-reforme-des-retraites-restaurer-la-retraite-a-60-ans-en-prenant-en-compte-le-rsa-en-portant-le-minimum-contributif-au-smic",
  },
  scrutinZucman2026: {
    titre: "Analyse du scrutin n° 8859 : taxe Zucman, projet de loi de finances pour 2027",
    editeur: "Assemblée nationale",
    date: "16 octobre 2026",
    url: "https://www.assemblee-nationale.fr/dyn/17/scrutins/8859",
  },
  programmeNFP: {
    titre: "Contrat de législature du Nouveau Front populaire",
    editeur: "Nouveau Front populaire",
    date: "juin 2024",
    url: "https://lafranceinsoumise.fr/wp-content/uploads/2024/06/Programme-nouveaufrontpopulaire.pdf",
  },
  ofceNFP: {
    titre: "Les principales mesures économiques du programme du NFP et leurs chiffrages",
    editeur: "OFCE",
    date: "juin 2024",
    url: "https://www.ofce-legislatives2024.fr/programmes/nfp.html",
  },
  nosParlementairesZucman: {
    titre: "Taxe Zucman : le détail du vote de l'Assemblée, groupe par groupe",
    editeur: "NosParlementaires.fr, d'après les scrutins de l'Assemblée",
    date: "août 2026",
    url: "https://nosparlementaires.fr/actualites/taxe-zucman-detail-vote-fevrier-2025-groupe-par-groupe",
  },
  humaniteNFP: {
    titre: "ISF, smic à 1 600 euros net… Ce qu'il faut retenir du programme économique du NFP",
    editeur: "L'Humanité",
    date: "juin 2024",
    url: "https://www.humanite.fr/social-et-economie/dissolution/isf-smic-a-1-600-euros-net-ce-quil-faut-retenir-du-programme-economique-du-nouveau-front-populaire",
  },
  infoGouvPresidentielle: {
    titre: "Élection présidentielle 2027 : dates, calendrier et démarches",
    editeur: "info.gouv.fr, site du Gouvernement",
    date: "novembre 2026",
    url: "https://www.info.gouv.fr/actualite/election-presidentielle-2027",
  },
  inseeMalInscrits: {
    titre: "Listes électorales : 16,5 % des électeurs mal inscrits en 2022 (d'après l'Insee)",
    editeur: "Vie publique",
    date: "2024",
    url: "https://www.vie-publique.fr/en-bref/293290-listes-electorales-165-des-electeurs-mal-inscrits-en-2022",
  },
  publicSenatGauche2027: {
    titre: "Élection présidentielle : qui sont les candidats à gauche ?",
    editeur: "Public Sénat",
    date: "2026",
    url: "https://www.publicsenat.fr/actualites/politique/election-presidentielle-qui-sont-les-candidats-a-gauche",
  },
  ssmsiChiffres2026: {
    titre: "Chiffres clés Insécurité et délinquance, édition 2026",
    editeur: "SSMSI, ministère de l'Intérieur",
    date: "novembre 2026",
    url: "https://statistiques.interieur.gouv.fr/ssmsi/publications/chiffres-cles-insecurite-et-delinquance-edition-2026",
  },
  ssmsiVRS: {
    titre: "Vécu et ressenti en matière de sécurité : victimation, délinquance et sentiment d'insécurité",
    editeur: "SSMSI, ministère de l'Intérieur",
    date: "octobre 2026",
    url: "https://statistiques.interieur.gouv.fr/ssmsi/publications/vecu-et-ressenti-en-matiere-de-securite-victimation-delinquance-et-sentiment-0",
  },
  deppPisa2025: {
    titre: "PISA 2025 : les acquis des élèves de 15 ans en baisse en France et dans l'OCDE (Note d'information n° 26.40)",
    editeur: "DEPP, ministère de l'Éducation nationale",
    date: "septembre 2026",
    url: "https://www.education.gouv.fr/depp/pisa-2025-les-acquis-des-eleves-de-15-ans-en-comprehension-de-l-ecrit-et-en-culture-mathematique-en-505645",
  },
  hcspNiveauScolaire: {
    titre: "Niveau scolaire : éléments de diagnostic et propositions",
    editeur: "Haut-commissariat à la Stratégie et au Plan",
    date: "août 2026",
    url: "https://www.strategie-plan.gouv.fr/files/files/Publications/2026/2026-08-31%20-%20Rapport%20Niveau%20scolaire/HCSP-2026-RAPPORT-Niveau-scolaire.pdf",
  },
  inseeChomageT3: {
    titre: "Au troisième trimestre 2026, le taux de chômage s'établit à 8,2 %",
    editeur: "Insee, Informations rapides n° 270",
    date: "novembre 2026",
    url: "https://www.insee.fr/fr/statistiques/9118603",
  },
  inseeChomageT2: {
    titre: "Au deuxième trimestre 2026, le taux de chômage augmente de 0,2 point et atteint 8,3 %",
    editeur: "Insee, Informations rapides n° 192",
    date: "août 2026",
    url: "https://www.insee.fr/fr/statistiques/9032359",
  },
  inseeEmploi: {
    titre: "Emploi, chômage, travail : l'essentiel",
    editeur: "Insee",
    date: "octobre 2026",
    url: "https://www.insee.fr/fr/statistiques/8996926",
  },
  fraudeMinistere: {
    titre: "Fraudes fiscales et sociales : plus de 20 milliards d'euros détectés et redressés en 2025",
    editeur: "Ministère de l'Économie (fraude sociale estimée par le HCFiPS)",
    date: "avril 2026",
    url: "https://presse.economie.gouv.fr/?p=174412",
  },
  fraudeTF1: {
    titre: "Entre la fraude fiscale et la fraude sociale, qu'est-ce qui coûte le plus à l'État ?",
    editeur: "TF1 Info, d'après le HCFiPS et la Cour des comptes",
    date: "juillet 2026",
    url: "https://www.tf1info.fr/economie/verif-entre-la-fraude-fiscale-et-la-fraude-sociale-qu-est-ce-qui-coute-le-plus-a-l-etat-2453310.html",
  },
  caeHeritage: {
    titre: "Repenser l'héritage (note n° 69)",
    editeur: "Conseil d'analyse économique",
    date: "décembre 2021",
    url: "https://cae-eco.fr/repenser-lheritage",
  },
  ccomptesSuccessions: {
    titre: "Les droits de succession, communication à la commission des finances de l'Assemblée nationale",
    editeur: "Cour des comptes",
    date: "septembre 2024",
    url: "https://www.vie-publique.fr/files/rapport/pdf/295513.pdf",
  },
  inseeDepensesUE: {
    titre: "Dépenses des administrations publiques dans l'Union européenne",
    editeur: "Insee, d'après Eurostat",
    date: "juillet 2026",
    url: "https://www.insee.fr/fr/statistiques/2381406",
  },
  fipecoDepenses: {
    titre: "La définition, le niveau et la répartition des dépenses publiques",
    editeur: "FIPECO (François Ecalle, ancien de la Cour des comptes)",
    date: "mai 2026",
    url: "https://www.fipeco.fr/fiche/La-d%C3%A9finition,-le-niveau-et-la-r%C3%A9partition-des-d%C3%A9penses-publiques",
  },
  pons2018: {
    titre: "Will a Five-Minute Discussion Change Your Mind? A Countrywide Experiment on Voter Choice in France",
    editeur: "Vincent Pons, American Economic Review",
    date: "2018",
    url: "https://www.aeaweb.org/articles?id=10.1257/aer.20160524",
  },
  braconnier2017: {
    titre: "Voter Registration Costs and Disenfranchisement: Experimental Evidence from France",
    editeur: "Braconnier, Dormagen & Pons, American Political Science Review",
    date: "2017",
    url: "https://www.cambridge.org/core/journals/american-political-science-review/article/abs/voter-registration-costs-and-disenfranchisement-experimental-evidence-from-france/CAA4ADFFA50811B3CFAA68F1D809CAB9",
  },
  kalla2020: {
    titre: "Reducing Exclusionary Attitudes through Interpersonal Conversation",
    editeur: "Kalla & Broockman, American Political Science Review",
    date: "2020",
    url: "https://www.cambridge.org/core/journals/american-political-science-review/article/reducing-exclusionary-attitudes-through-interpersonal-conversation-evidence-from-three-field-experiments/4AA5B97806A4CAFBAB0651F5DAD8F223",
  },
  broockman2016: {
    titre: "Durably reducing transphobia: A field experiment on door-to-door canvassing",
    editeur: "Broockman & Kalla, Science",
    date: "2016",
    url: "https://www.science.org/doi/10.1126/science.aad9713",
  },
};

// Les préoccupations par lesquelles on entre dans la conversation.
export const SUJETS = [
  {
    id: "pouvoir-achat",
    emoji: "🛒",
    titre: "Pouvoir d'achat",
    accroche: "Finir le mois sans calculer chaque course.",
    couleur: "#ff4d6d",
    question: "Qu'est-ce qui pèse le plus dans ton budget en ce moment ?",
    chiffres: [
      { valeur: 15.4, unite: "%", decimales: 1, label: "de la population sous le seuil de pauvreté en 2024, comme en 2023 : le niveau le plus haut depuis 1996", source: "inseePauvrete2117" },
      { valeur: 9.8, unite: " M", decimales: 1, label: "de personnes pauvres en 2024, après un bond de 650 000 en 2023", source: "inseePauvrete2117" },
    ],
    constat: "La pauvreté a bondi en 2023 et ne recule pas en 2024. Surtout, les inégalités de niveau de vie atteignent en 2024 leur niveau le plus élevé depuis trente ans (indice de Gini de 0,302), portées par les revenus du patrimoine des plus aisés.",
    constatSources: ["inseePauvrete2117", "inseePauvrete"],
    propositions: [
      "Porter le SMIC à 1 600 € net et indexer les salaires sur l'inflation.",
      "Bloquer les prix des produits de première nécessité (alimentation, énergie, carburants).",
      "Revaloriser les APL de 10 % et le point d'indice des fonctionnaires.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Ces propositions sont celles du programme du NFP de 2024 ; leurs chiffrages datent de cette campagne et le SMIC a été revalorisé depuis. À l'époque, le coût d'un SMIC à 1 600 € était estimé de 3 à 23 milliards d'euros selon les chiffrages compilés par l'OFCE, et l'Institut Montaigne évoquait 230 000 à 380 000 emplois menacés. Mieux vaut le dire que se le faire opposer.",
    nuanceSource: "ofceNFP",
  },
  {
    id: "justice-fiscale",
    emoji: "⚖️",
    titre: "Justice fiscale",
    accroche: "Que chacun paie selon ses moyens, vraiment.",
    couleur: "#f59e0b",
    question: "Tu trouves que l'effort est bien réparti entre tout le monde ?",
    chiffres: [
      { valeur: 26, unite: " %", decimales: 0, label: "de taux d'imposition global pour les milliardaires, contre 46 % pour les 0,1 % les plus riches (données 2016)", source: "ippMilliardaires" },
      { valeur: 1228, unite: " Md€", decimales: 0, label: "de patrimoine cumulé pour les 500 plus grandes fortunes en 2024, contre 124 Md€ en 2003", source: "anRapportZucman" },
    ],
    constat: "L'impôt est progressif pour l'immense majorité des Français, puis devient régressif tout en haut : les plus grandes fortunes laissent leurs revenus dans des sociétés et paient surtout l'impôt sur les sociétés. Côté État, les aides publiques aux entreprises atteignent jusqu'à 211 milliards d'euros en 2023 au sens le plus large (108 Md€ au sens strict), sans évaluation d'ensemble.",
    constatSources: ["ippMilliardaires", "senatAides"],
    propositions: [
      "Un impôt plancher de 2 % sur les patrimoines de plus de 100 millions d'euros (« taxe Zucman », environ 1 800 foyers), votée par toute la gauche à l'Assemblée en février 2025, puis à nouveau en octobre 2025 et en octobre 2026.",
      "Rétablir un ISF avec un volet climatique, rétablir l'exit tax et rendre l'impôt sur le revenu plus progressif (14 tranches).",
      "Conditionner les aides publiques aux entreprises à des critères sociaux et environnementaux, avec remboursement en cas de non-respect.",
    ],
    propositionsSource: ["programmeNFP", "nosParlementairesZucman", "scrutinZucman2026"],
    nuance: "Le rendement de la taxe Zucman est contesté : 15 à 25 Md€ selon ses promoteurs, 3,5 à 5,5 Md€ après « effets de comportement » selon la DG Trésor, avec un risque constitutionnel. Adoptée à l'Assemblée en février 2025, elle a été rejetée au Sénat en juin 2025, puis par les députés dans les budgets 2026 et 2027.",
    nuanceSource: "senatHautsPatrimoines",
  },
  {
    id: "sante",
    emoji: "🩺",
    titre: "Santé et hôpital",
    accroche: "Être soigné vite, partout, sans avancer les frais.",
    couleur: "#22c55e",
    question: "Est-ce que toi ou tes proches avez eu du mal à trouver un médecin ou une place à l'hôpital ?",
    chiffres: [
      { valeur: 47700, unite: "", decimales: 0, label: "lits d'hospitalisation complète en moins entre fin 2013 et fin 2025 (−11,6 %)", source: "dreesLits" },
      { valeur: 365100, unite: "", decimales: 0, label: "lits restants fin 2025", source: "dreesLits" },
    ],
    constat: "La baisse des lits se poursuit depuis plus de dix ans. La Drees ne compte que les lits réellement en état d'accueillir des patients : ceux fermés faute de personnel sont exclus du décompte.",
    constatSources: ["dreesLits"],
    propositions: [
      "Rattraper les postes manquants à l'hôpital public et revaloriser le travail de nuit et du week-end.",
      "Réguler l'installation des médecins dans les déserts médicaux.",
      "Un plan Grand âge : rénovation des Ehpad et formation des professionnels.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Toutes les fermetures ne sont pas des reculs : une partie correspond au « virage ambulatoire » (soins sans nuitée), et les places d'hospitalisation partielle augmentent (+3,5 % en 2025). En 2025, l'hôpital public a même regagné 200 lits.",
    nuanceSource: "dreesLits",
  },
  {
    id: "logement",
    emoji: "🏠",
    titre: "Logement",
    accroche: "Un toit digne à un prix qu'on peut payer.",
    couleur: "#3b82f6",
    question: "Ton loyer ou ton crédit, ça représente quelle part de ce que tu gagnes ?",
    chiffres: [
      { valeur: 2.8, unite: " M", decimales: 1, label: "de ménages en attente d'un logement social en 2025, un record", source: "fondationLogement" },
      { valeur: 350000, unite: "", decimales: 0, label: "personnes sans domicile selon la Fondation, sur un champ plus large que les 143 000 recensées par l'Insee en 2012", source: "fondationLogement" },
    ],
    constat: "Seule une demande de logement social sur dix a reçu une réponse favorable en 2024, contre une sur six en 2017. 4,2 millions de personnes sont mal logées, et les expulsions avec le concours de la force publique ont atteint un record en 2024.",
    constatSources: ["fondationLogement"],
    propositions: [
      "Construire 200 000 logements publics par an pendant cinq ans, aux meilleures normes écologiques.",
      "Encadrer les loyers obligatoirement dans les zones tendues.",
      "Interdire les expulsions sans proposition de relogement et créer une garantie universelle des loyers.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Les chiffres du mal-logement viennent d'une fondation engagée, qui les construit à partir de données publiques ; la dernière enquête Insee sur les sans-domicile date de 2012 et une nouvelle est en cours.",
    nuanceSource: "fondationLogement",
  },
  {
    id: "climat",
    emoji: "🌍",
    titre: "Climat",
    accroche: "Une transition juste, pas payée par les plus modestes.",
    couleur: "#10b981",
    question: "Qu'est-ce qui te paraît injuste dans la façon dont on demande des efforts pour le climat ?",
    chiffres: [
      { valeur: 2.7, unite: "×", decimales: 1, label: "plus d'émissions pour les 10 % de ménages les plus riches que pour les 10 % les plus pauvres", source: "ofceCarbone" },
      { valeur: 3.9, unite: " M", decimales: 1, label: "de résidences principales sont des passoires énergétiques (DPE F ou G) au 1er janvier 2025", source: "onrePassoires" },
    ],
    constat: "Un ménage parmi les 10 % les plus riches émet environ 40 tonnes de CO₂e par an, contre 15 tonnes pour les 10 % les plus pauvres. Côté logement, 13,8 % des logements loués dans le privé sont des passoires énergétiques, contre 5,8 % dans le logement social.",
    constatSources: ["ofceCarbone", "onrePassoires"],
    propositions: [
      "Isoler complètement les logements, avec une prise en charge totale des travaux pour les ménages modestes.",
      "Un ISF avec un volet climatique et une loi énergie-climat visant la neutralité carbone en 2050.",
      "Un plan rail et fret, la TVA à 5,5 % sur les transports en commun et une gratuité ciblée pour les jeunes et les précaires.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Le nombre de passoires baisse (836 000 de moins en deux ans), mais près de 40 % de la dernière baisse vient d'un changement de calcul du DPE, pas de travaux. Après ce changement de calcul, on compte plutôt 3,2 millions de passoires. Les écarts d'émissions entre riches et pauvres varient aussi selon les études, l'année des données et le fait de compter par ménage ou par personne.",
    nuanceSource: "onrePassoires",
  },
  {
    id: "retraites",
    emoji: "🧓",
    titre: "Retraites",
    accroche: "Partir à un âge où l'on peut encore profiter.",
    couleur: "#a855f7",
    question: "À quel âge tu te vois t'arrêter, vu ton métier ?",
    chiffres: [
      { valeur: 62.75, unite: " ans", decimales: 2, label: "âge légal pour la génération 1964, après la suspension de la réforme jusqu'en 2028 (au lieu de 63 ans)", source: "viePubliqueRetraites", affichage: "62 ans 9 mois" },
      { valeur: 1.8, unite: " Md€", decimales: 1, label: "par an : coût estimé de la suspension en année pleine", source: "senatRetraites" },
    ],
    constat: "La réforme de 2023 (64 ans) est suspendue jusqu'en 2028 par la loi de financement de la Sécurité sociale pour 2026, une mesure négociée par les socialistes avec le gouvernement Lecornu. Le 17 novembre 2026, la majorité de droite et du centre au Sénat a voté son rétablissement, en première lecture : le débat n'est pas clos.",
    constatSources: ["viePubliqueRetraites", "senatRetablitRetraites"],
    propositions: [
      "Abroger la réforme de 2023 et réaffirmer l'objectif d'un droit à la retraite à 60 ans.",
      "Rétablir les critères de pénibilité et porter le minimum contributif au niveau du SMIC.",
      "Financer par des cotisations sur les dividendes, l'épargne salariale et les hauts salaires.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Revenir à 60 ans coûte cher : de 27 milliards d'euros par an (chiffrage repris par ses promoteurs) à 53 Md€ (gouvernement), et jusqu'à 58 Md€ avec les mesures d'accompagnement selon l'Institut Montaigne, un think tank libéral (chiffrages de 2024). La gauche doit montrer d'où viendront ces recettes, c'est la question qui reviendra.",
    nuanceSource: "montaigneRetraites",
  },
  {
    id: "securite",
    emoji: "🛡️",
    titre: "Sécurité",
    accroche: "Se sentir tranquille chez soi, dans la rue, dans le bus.",
    couleur: "#0ea5e9",
    question: "Est-ce que tu te sens en sécurité dans ton quartier ou dans les transports ?",
    chiffres: [
      { valeur: 472400, unite: "", decimales: 0, label: "victimes de violences physiques enregistrées en 2025, 5 % de plus en un an", source: "ssmsiChiffres2026" },
      { valeur: 132100, unite: "", decimales: 0, label: "victimes de violences sexuelles enregistrées en 2025 (+8 %)", source: "ssmsiChiffres2026" },
    ],
    constat: "Les violences enregistrées par la police et la gendarmerie augmentent chaque année depuis 2016. Dans l'enquête de victimation, les habitants des grandes villes se disent plus souvent inquiets dans leur quartier et dans les transports, et à peine plus d'un sur deux est satisfait de l'action de proximité des forces de l'ordre.",
    constatSources: ["ssmsiChiffres2026", "ssmsiVRS"],
    propositions: [
      "Rétablir la police de proximité et maintenir toutes les gendarmeries.",
      "Plus d'enquêteurs : police judiciaire, police scientifique, unités contre le narcotrafic, la délinquance financière et les réseaux mafieux.",
      "Donner des moyens à la justice (magistrats, greffiers, protection judiciaire de la jeunesse) pour juger dans un délai raisonnable.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "Ces chiffres comptent les faits enregistrés : une hausse peut aussi traduire des victimes qui portent davantage plainte, notamment pour les violences sexuelles. Sur ce sujet, mieux vaut parler de moyens concrets (enquêteurs, justice plus rapide) que d'opposer prévention et répression.",
    nuanceSource: "ssmsiChiffres2026",
  },
  {
    id: "ecole",
    emoji: "🎒",
    titre: "École",
    accroche: "Que chaque enfant ait sa chance, quel que soit son quartier.",
    couleur: "#eab308",
    question: "Comment ça se passe à l'école pour tes enfants, ou pour ceux de ton entourage ?",
    chiffres: [
      { valeur: 95, unite: " points", decimales: 0, label: "d'écart en maths à 15 ans entre élèves très favorisés et très défavorisés, contre 83 en moyenne dans l'OCDE (PISA 2025)", source: "deppPisa2025" },
      { valeur: 4, unite: "", decimales: 0, label: "pays de l'OCDE seulement où l'origine sociale pèse plus qu'en France sur les résultats en maths (PISA 2022)", source: "hcspNiveauScolaire" },
    ],
    constat: "Les résultats des élèves de 15 ans baissent en France comme dans l'OCDE. Mais la France reste l'un des pays où le milieu social des parents pèse le plus sur la réussite, en lecture comme en maths.",
    constatSources: ["deppPisa2025", "hcspNiveauScolaire"],
    propositions: [
      "Aller vers la gratuité intégrale de l'école : cantine, fournitures, transports, activités périscolaires.",
      "Réduire les effectifs pour passer sous la moyenne européenne de 19 élèves par classe.",
      "Moduler les dotations des établissements, y compris privés, selon leur respect d'objectifs de mixité sociale.",
    ],
    propositionsSource: ["programmeNFP"],
    nuance: "La baisse du niveau touche presque toute l'OCDE, et l'écart entre bons et moins bons élèves n'est pas plus grand en France qu'ailleurs : c'est le poids de l'origine sociale qui fait exception. Réduire la taille des classes a déjà commencé en éducation prioritaire, et l'effort coûte cher.",
    nuanceSource: "hcspNiveauScolaire",
  },
  {
    id: "travail",
    emoji: "🔧",
    titre: "Travail",
    accroche: "Un emploi stable, qui paie et qui ne casse pas le corps.",
    couleur: "#f97316",
    question: "Dans ton travail, qu'est-ce qui a changé ces dernières années ?",
    chiffres: [
      { valeur: 8.2, unite: " %", decimales: 1, label: "de chômage au 3e trimestre 2026, 0,4 point de plus en un an", source: "inseeChomageT3" },
      { valeur: 150000, unite: "", decimales: 0, label: "chômeurs de plus en un an, pour 2,6 millions au total", source: "inseeChomageT3" },
    ],
    constat: "Après des années de baisse, le chômage remonte depuis 2025. Au 2e trimestre 2026, il a atteint son plus haut niveau depuis 2019, en dehors de la crise sanitaire.",
    constatSources: ["inseeChomageT2", "inseeChomageT3"],
    propositions: [
      "Abroger les réformes de l'assurance chômage.",
      "Abroger les lois travail et rétablir le « principe de faveur » : un accord d'entreprise ne peut pas être moins favorable que la loi.",
      "Reconnaître comme salariés les travailleurs des plateformes et faire respecter l'égalité salariale entre femmes et hommes.",
    ],
    propositionsSource: ["programmeNFP", "ofceNFP"],
    nuance: "Le chômage reste bien en dessous de son pic de 2015, et le sous-emploi (temps partiel subi) est à son plus bas depuis vingt ans. Le reconnaître rend le reste plus crédible.",
    nuanceSource: "inseeEmploi",
  },
];

// Objections courantes, avec ce qu'elles ont de vrai.
export const OBJECTIONS = [
  {
    id: "impots",
    objection: "La gauche, c'est des impôts en plus pour tout le monde.",
    vrai: "Oui, la gauche propose plus de recettes fiscales. Le nier ferait perdre toute crédibilité.",
    reponse: "Les hausses ciblent le sommet : l'impôt plancher de 2 % ne concernerait qu'environ 1 800 foyers ayant plus de 100 millions d'euros. Aujourd'hui, les milliardaires paient un taux global de 26 %, inférieur aux 46 % des 0,1 % les plus aisés. Demander : « Comment tu verrais un effort juste entre un salarié et quelqu'un qui a 100 millions ? »",
    sources: ["ippMilliardaires", "senatZucman"],
  },
  {
    id: "dette",
    objection: "On n'a pas les moyens, la dette explose déjà.",
    vrai: "La dette atteint 115,7 % du PIB fin 2025 et le déficit 5,1 %. C'est un vrai sujet.",
    reponse: "La question est de savoir qui fait l'effort. Selon une commission d'enquête du Sénat, les aides publiques aux entreprises ont atteint jusqu'à 211 Md€ en 2023 au sens le plus large (108 Md€ au sens strict), sans évaluation d'ensemble. La gauche propose de chercher des recettes là où elles sont, plutôt que de couper dans l'hôpital ou l'école.",
    sources: ["inseeDette", "senatAides"],
  },
  {
    id: "exil",
    objection: "Si on taxe les riches, ils partiront tous.",
    vrai: "Des départs existent, et le départ d'un actionnaire principal peut affaiblir son entreprise.",
    reponse: "Les évaluations de la suppression de l'ISF montrent des mouvements de quelques centaines de foyers, sur environ 150 000 assujettis à l'IFI, et aucun effet mesurable sur l'investissement des entreprises existantes. La gauche propose aussi de rétablir une « exit tax » pour limiter l'évasion.",
    sources: ["franceStrategieISF", "ippExpatriation", "programmeNFP"],
  },
  {
    id: "tous-pareils",
    objection: "Ils sont tous pareils, voter ne change rien.",
    vrai: "La déception est compréhensible, y compris envers la gauche au pouvoir (le quinquennat Hollande en a déçu beaucoup).",
    reponse: "Les votes changent pourtant des vies : congés payés (1936), Sécurité sociale (1945), retraite à 60 ans et 5e semaine (1982), RMI (1988), CMU (1999), mariage pour tous (2013). Plus récemment, la suspension de la réforme des retraites a été négociée par les socialistes dans le budget de la Sécurité sociale pour 2026, même si le Sénat a voté son rétablissement.",
    sources: ["viePubliqueRetraites", "senatRetablitRetraites"],
  },
  {
    id: "smic-emploi",
    objection: "Augmenter le SMIC, ça va tuer les petites entreprises.",
    vrai: "Une hausse forte et rapide peut fragiliser des TPE. Les chiffrages d'impact sur l'emploi existent et divergent.",
    reponse: "Le NFP prévoyait d'accompagner les PME, par exemple avec des avances à taux zéro, et de réserver aux TPE-PME une part de la sous-traitance des grands groupes. Un salaire plus élevé, c'est aussi plus de clients pour les commerces.",
    sources: ["ofceNFP", "humaniteNFP", "programmeNFP"],
  },
  {
    id: "immigration",
    objection: "Le vrai problème, c'est l'immigration.",
    vrai: "La part d'immigrés a augmenté : 11,6 % de la population en 2025 (estimation provisoire), contre 7,4 % en 1975. C'est une inquiétude réelle, à écouter sans mépris.",
    reponse: "Avec 14 % de personnes nées à l'étranger, la France est dans la moyenne de l'Union européenne (14,4 %). Selon l'OCDE, sur 2006-2018, les immigrés en France ont payé plus d'impôts et de cotisations qu'ils n'ont coûté en santé, éducation et protection sociale (+1,02 % du PIB par an) ; en ajoutant la défense, la dette et les autres biens publics, le solde devient négatif (−0,85 % du PIB). Dans les deux cas, cela n'explique pas à lui seul la dette ou les fins de mois difficiles. Les chiffres de l'Insee connaissent une rupture de série en 2024, donc prudence sur les comparaisons. Surtout, demander ce qui, concrètement, l'inquiète dans sa vie (travail, quartier, école), écouter, puis voir ensemble si salaires, logement et services publics en font partie.",
    sources: ["inseeImmigres", "inseeImmigresUE", "ocdeImmigration", "financePourTousOCDE"],
  },
  {
    id: "rn-social",
    objection: "Le RN aussi défend les petits salaires.",
    vrai: "Le RN a voté contre la réforme des retraites et parle beaucoup de pouvoir d'achat.",
    reponse: "Sur la taxe Zucman, le RN s'est abstenu à l'Assemblée en février 2025, puis a voté contre en octobre 2025. Le 16 octobre 2026, ses 37 députés présents ont encore voté contre (rejet par 70 voix contre 35). Comparer les votes concrets, pas les discours : c'est la gauche qui a voté pour faire contribuer les très hauts patrimoines.",
    sources: ["nosParlementairesZucman", "scrutinZucman2026"],
  },
  {
    id: "fraude",
    objection: "Avant de parler d'impôts, il faut arrêter la fraude aux aides sociales.",
    vrai: "La fraude sociale existe : environ 14 milliards d'euros par an selon le Haut Conseil du financement de la protection sociale, fraude non découverte comprise.",
    reponse: "Plus de la moitié (52 %) vient de cotisations non payées, surtout du travail dissimulé par des employeurs ; 36 % vient des allocataires et 12 % de professionnels de santé. La fraude fiscale, elle, n'a même pas d'estimation officielle d'ensemble, et la Cour des comptes la juge « mal connue ». Lutter contre toutes les fraudes, oui : la gauche proposait aussi des recrutements contre la fraude fiscale et douanière.",
    sources: ["fraudeMinistere", "fraudeTF1", "ofceNFP"],
  },
  {
    id: "heritage",
    objection: "Taxer l'héritage, c'est taxer deux fois le travail d'une vie.",
    vrai: "L'héritage touche à l'intime, et la France est déjà le pays de l'OCDE où ces droits pèsent le plus dans le PIB (0,74 %).",
    reponse: "Chaque enfant peut recevoir 100 000 € de chacun de ses parents sans rien payer. La moitié des Français héritera de moins de 70 000 € dans sa vie, et la part du patrimoine hérité est passée de 35 % à 60 % depuis les années 1970. Ce sont surtout les très grandes transmissions qui profitent des exonérations (assurance-vie, pacte Dutreil) : c'est là que se joue la justice, pas sur la maison familiale.",
    sources: ["caeHeritage", "ccomptesSuccessions"],
  },
  {
    id: "depenses",
    objection: "Il suffit de couper dans les dépenses publiques.",
    vrai: "Les dépenses publiques sont très élevées : 57,2 % du PIB en 2025, au deuxième rang de l'Union européenne (49,5 % en moyenne).",
    reponse: "Environ la moitié de l'écart avec la moyenne européenne vient des prestations sociales, surtout les retraites et la santé (25,7 % du PIB contre 21,9 %). Couper, c'est donc choisir : les pensions, l'hôpital ou l'école ? Demander : « Tu couperais où, concrètement ? » La gauche préfère faire contribuer davantage les plus hauts patrimoines.",
    sources: ["inseeDepensesUE", "fipecoDepenses"],
  },
];

// Quiz « Vrai ou faux » : chaque réponse est sourcée.
export const QUIZ = [
  {
    affirmation: "Le taux de pauvreté en France est au plus haut depuis le début de la série Insee en 1996.",
    reponse: true,
    explication: "15,4 % en 2023, stable en 2024 : un record depuis 1996.",
    source: "inseePauvrete2117",
  },
  {
    affirmation: "Les milliardaires français paient proportionnellement plus d'impôts que les autres foyers aisés.",
    reponse: false,
    explication: "Leur taux global était d'environ 26 %, contre 46 % pour les 0,1 % les plus riches (IPP, données 2016).",
    source: "ippMilliardaires",
  },
  {
    affirmation: "Les aides publiques aux entreprises dépassent 100 milliards d'euros par an.",
    reponse: true,
    explication: "108 Md€ en 2023 au sens strict, et jusqu'à 211 Md€ au sens le plus large, selon une commission d'enquête du Sénat.",
    source: "senatAides",
  },
  {
    affirmation: "La France compte beaucoup plus de personnes nées à l'étranger que la moyenne de l'Union européenne.",
    reponse: false,
    explication: "14,0 % en France contre 14,4 % dans l'UE en 2025 : la France est dans la moyenne.",
    source: "inseeImmigresUE",
  },
  {
    affirmation: "Les hôpitaux et cliniques ont perdu plus de 40 000 lits d'hospitalisation complète depuis 2013.",
    reponse: true,
    explication: "47 700 lits en moins entre fin 2013 et fin 2025, selon la Drees.",
    source: "dreesLits",
  },
  {
    affirmation: "La suppression de l'ISF a fait revenir des milliers de grandes fortunes en France.",
    reponse: false,
    explication: "Les retours se comptent en centaines de foyers par an, pour des effets jugés « de faible ampleur ».",
    source: "franceStrategieISF",
  },
];

// Conquêtes sociales portées par la gauche (au pouvoir, ou en négociant depuis l'opposition).
export const HISTOIRE = [
  { annee: "1936", titre: "Congés payés et semaine de 40 heures", texte: "Le Front populaire instaure deux semaines de congés payés." },
  { annee: "1945", titre: "Sécurité sociale", texte: "Issue du programme du Conseil national de la Résistance, généralisée notamment par le ministre communiste Ambroise Croizat." },
  { annee: "1981", titre: "Abolition de la peine de mort", texte: "Portée par Robert Badinter." },
  { annee: "1982", titre: "Retraite à 60 ans, 39 heures, 5e semaine", texte: "Sous le gouvernement Mauroy." },
  { annee: "1988", titre: "Revenu minimum d'insertion", texte: "Le RMI, ancêtre du RSA, créé sous Michel Rocard." },
  { annee: "1999", titre: "CMU et PACS", texte: "La couverture maladie universelle ouvre l'accès aux soins à tous, et le PACS offre un cadre légal aux couples, y compris de même sexe." },
  { annee: "2013", titre: "Mariage pour tous", texte: "L'égalité des droits pour les couples de même sexe." },
  { annee: "2025", titre: "Suspension de la réforme des retraites", texte: "Négociée par les socialistes dans le budget de la Sécurité sociale pour 2026, avec un gouvernement qui n'est pas de gauche.", source: "viePubliqueRetraites" },
];

// Propositions : programme commun du NFP (2024). Pour 2027, la gauche part divisée.
export const CADRE_PROPOSITIONS = {
  titre: "Ce que proposait le NFP (2024)",
  note: "Ces mesures viennent du programme commun de la gauche de 2024. Pour 2027, la gauche part avec plusieurs candidatures : compare les programmes de chacune.",
  source: "publicSenatGauche2027",
};

// Aller voter : dates officielles et démarches.
export const VOTE = {
  premierTour: "dimanche 18 avril 2027",
  secondTour: "dimanche 2 mai 2027",
  limiteInscription: "vendredi 12 mars 2027",
  exception: "Dans certains cas (18 ans, déménagement pour le travail, nationalité récente), l'inscription reste possible jusqu'au 8 avril 2027.",
  sources: ["infoGouvPresidentielle"],
  recherche: "Faire voter quelqu'un qui partage déjà tes idées compte autant que convaincre. En France, en 2022, 16,5 % des électeurs étaient mal inscrits, souvent après un déménagement, et ils votent beaucoup moins. Une expérience menée en France a montré que de simples visites pour aider à s'inscrire augmentent nettement l'inscription, puis le vote.",
  rechercheSources: ["inseeMalInscrits", "braconnier2017"],
  liens: [
    { titre: "Vérifier mon inscription et mon bureau de vote", url: "https://www.elections.interieur.gouv.fr/mes-demarches/je-verifie-ma-situation-electorale" },
    { titre: "M'inscrire sur les listes électorales", url: "https://www.elections.interieur.gouv.fr/mes-demarches/je-minscris-sur-listes-electorales" },
    { titre: "Faire une procuration (Maprocuration)", url: "https://www.maprocuration.gouv.fr/" },
  ],
  plan: [
    { q: "Quel jour et à quelle heure tu y vas ?", aide: "Le matin avant les courses, après le déjeuner… Un moment précis, c'est plus facile à tenir." },
    { q: "Comment tu t'y rends, et avec qui ?", aide: "À pied, en voiture, avec un ami ou la famille : y aller à plusieurs aide à ne pas oublier." },
    { q: "Qu'est-ce qui pourrait t'en empêcher ?", aide: "Travail, vacances, garde d'enfant : si c'est le cas, une procuration se fait en quelques minutes." },
  ],
};

// Portes d'entrée selon la personne. Rien n'est enregistré sur elle.
export const PROFILS = [
  {
    id: "abstention",
    emoji: "🤷",
    titre: "Ne vote plus",
    portrait: "« À quoi bon, ils sont tous pareils. »",
    entree: "Ne pas parler de partis. Partir d'un problème concret qui l'agace, puis montrer qu'un vote a déjà changé ce genre de problème. Et vérifier ensemble l'inscription.",
    question: "Qu'est-ce qui, concrètement, te fait penser que voter ne change rien ?",
    sujets: ["pouvoir-achat", "logement"],
    objections: ["tous-pareils"],
  },
  {
    id: "rn",
    emoji: "😤",
    titre: "Tenté·e par le RN",
    portrait: "« Au moins eux, ils parlent des gens comme moi. »",
    entree: "Ne pas faire la morale. Reconnaître la colère, parler salaires et services publics, puis comparer les votes concrets plutôt que les discours.",
    question: "Qu'est-ce qui t'a donné envie de les écouter ?",
    sujets: ["pouvoir-achat", "securite"],
    objections: ["rn-social", "immigration", "fraude"],
  },
  {
    id: "centre",
    emoji: "🧭",
    titre: "Plutôt au centre",
    portrait: "« La gauche, c'est sympa, mais pas sérieux sur l'argent. »",
    entree: "Commencer par la crédibilité : reconnaître la dette, montrer les chiffrages et leurs limites, puis parler de justice fiscale.",
    question: "Pour toi, c'est quoi un budget juste ?",
    sujets: ["justice-fiscale", "sante"],
    objections: ["dette", "depenses", "impots"],
  },
  {
    id: "jeune",
    emoji: "🎧",
    titre: "Jeune qui ne vote pas",
    portrait: "« La politique, ça ne me concerne pas. »",
    entree: "Parler de son quotidien (loyer, études, climat, premier boulot) et l'aider à s'inscrire : c'est souvent là que tout bloque.",
    question: "Qu'est-ce qui te prend le plus la tête en ce moment ?",
    sujets: ["logement", "climat", "travail"],
    objections: ["tous-pareils"],
  },
];

// Ce que dit la recherche sur les conversations politiques.
export const RECHERCHE_DIALOGUE = {
  texte: "Des expériences de terrain, surtout aux États-Unis, montrent qu'une conversation sans jugement, où l'on échange des histoires personnelles, peut faire évoluer des opinions de façon modeste mais durable, alors que les arguments seuls ont souvent peu d'effet. Ces études portent surtout sur des attitudes (envers les immigrés, les personnes trans), pas directement sur le vote. En France, le porte-à-porte de 2012 n'a pas changé la participation, mais a eu un effet modeste et réel sur le vote.",
  sources: ["kalla2020", "broockman2016", "pons2018"],
};

// Méthode de conversation fondée sur la recherche.
export const ETAPES = [
  {
    titre: "Écouter d'abord",
    texte: "Demande ce qui l'inquiète, et laisse parler sans corriger. Reformule pour montrer que tu as compris.",
    exemple: "« Si je te suis bien, ce qui te fatigue, c'est d'avoir l'impression de travailler plus pour gagner moins ? »",
  },
  {
    titre: "Partir de son vécu",
    texte: "Une histoire personnelle convainc plus qu'une liste de chiffres. Demande une situation concrète, partage la tienne.",
    exemple: "« Ça m'a fait pareil quand ma mère a attendu huit mois un rendez-vous. Toi, ça t'est déjà arrivé ? »",
  },
  {
    titre: "Un fait, pas dix",
    texte: "Choisis le chiffre le plus parlant pour sa préoccupation, avec sa source. Un seul, bien expliqué.",
    exemple: "« L'Insee dit que la pauvreté n'a jamais été aussi haute depuis 1996. Ce n'est pas qu'une impression. »",
  },
  {
    titre: "Reconnaître ce qui est vrai",
    texte: "Admets les limites des propositions de gauche. C'est ce qui rend le reste crédible.",
    exemple: "« C'est vrai que ça coûte cher. La vraie question, c'est qui paie. »",
  },
  {
    titre: "Laisser respirer",
    texte: "Personne ne change d'avis en une discussion. Pose une question ouverte et propose d'en reparler.",
    exemple: "« Je ne te demande pas de me donner raison. Tu veux que je t'envoie la source ? »",
  },
];

export const A_EVITER = [
  "Se moquer ou traiter l'autre d'ignorant : ça ferme la porte.",
  "Assener une avalanche de chiffres : les arguments seuls changent souvent peu les avis.",
  "Inventer ou arrondir un chiffre à son avantage : un seul faux chiffre ruine tout le reste.",
  "Vouloir gagner la discussion : l'objectif est qu'elle ou il y repense après.",
];
