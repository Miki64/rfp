// Rocha Finance & Patrimoine - Modern Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initProfileTabs();
  initSimulator();
  initArticleModal();
  initTeamModal();
  initBookingModal();
  initVipModal();
  initContactForm();
});

// 1. Navigation Scroll Effect
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-xl', 'py-3');
      navbar.classList.remove('py-5');
    } else {
      navbar.classList.remove('shadow-xl', 'py-3');
      navbar.classList.add('py-5');
    }
  });
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const links = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  links.forEach(l => l.addEventListener('click', closeMenu));
}

// 3. Profile Switcher Tabs (Particuliers / Libéraux / Entreprises)
const profilesData = {
  particuliers: {
    title: "Particuliers & Familles",
    tagline: "Sécuriser, faire fructifier et transmettre dans les meilleures conditions",
    desc: "Vous souhaitez réduire la pression fiscale (IR, IFI), préparer votre retraite, financer les études de vos enfants ou organiser une transmission sereine et optimisée ? Nous construisons une stratégie sur-mesure à chaque étape de votre vie.",
    keyPoints: [
      "Optimisation fiscale sur-mesure (Dispositif Jeanbrun 2026, PER, défiscalisation ciblée)",
      "Placements haut de gamme en architecture 100% ouverte (produits structurés, contrats luxembourgeois)",
      "Transmission successorale sans friction et protection du conjoint"
    ],
    ctaText: "Construire ma stratégie patrimoniale",
    ctaTarget: "particulier",
    badge: "Gestion Privée"
  },
  liberaux: {
    title: "Professions Libérales & Médicales",
    tagline: "Des solutions dédiées aux médecins, chirurgiens, kinés, pharmaciens, avocats",
    desc: "Votre temps est compté et vos journées sont denses. Nous protégeons vos revenus d'activité, optimisons vos charges sociales et fiscales, gérons votre trésorerie professionnelle et préparons votre retraite de manière proactive.",
    keyPoints: [
      "Financement de rachat de patientèle, cabinet ou officine aux meilleures conditions",
      "Régimes de retraite et prévoyance Madelin / PER avec déductibilité maximale",
      "Passage en SELARL / SPFPL et optimisation de la rémunération du praticien"
    ],
    ctaText: "Bilan libéral & médical offert",
    ctaTarget: "liberal",
    badge: "Expertise Libérale"
  },
  entreprises: {
    title: "Chefs d'Entreprise & Dirigeants",
    tagline: "Dynamiser la trésorerie dormante et préparer 'votre vie d'après'",
    desc: "La frontière entre patrimoine professionnel et patrimoine privé est étroite. Nous accompagnons les dirigeants pour faire fructifier leurs excédents de trésorerie, structurer l'actionnariat (holding, pacte Dutreil) et sécuriser la cession d'entreprise.",
    keyPoints: [
      "Rémunération de la trésorerie d'entreprise sans risque inconsidéré",
      "Accompagnement pré-cession 'Ma vie d'après' (apport-cession 150-0 B ter, cash-out)",
      "Épargne salariale attractive : PEE, PERCOL et partage de la valeur exonéré"
    ],
    ctaText: "Audit dirigeant & trésorerie",
    ctaTarget: "entreprise",
    badge: "Corporate & Cession"
  }
};

function initProfileTabs() {
  const tabBtns = document.querySelectorAll('.profile-tab-btn');
  const titleEl = document.getElementById('profile-title');
  const taglineEl = document.getElementById('profile-tagline');
  const descEl = document.getElementById('profile-desc');
  const pointsEl = document.getElementById('profile-points');
  const ctaBtn = document.getElementById('profile-cta-btn');
  const badgeEl = document.getElementById('profile-badge');

  if (!tabBtns.length || !titleEl) return;

  function setProfile(key) {
    const data = profilesData[key];
    if (!data) return;

    tabBtns.forEach(btn => {
      if (btn.dataset.profile === key) {
        btn.classList.add('bg-white', 'text-navy-900', 'shadow-md', 'font-bold', 'border-b-2', 'border-gold-500');
        btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      } else {
        btn.classList.remove('bg-white', 'text-navy-900', 'shadow-md', 'font-bold', 'border-b-2', 'border-gold-500');
        btn.classList.add('text-slate-600', 'hover:bg-slate-100');
      }
    });

    titleEl.textContent = data.title;
    taglineEl.textContent = data.tagline;
    descEl.textContent = data.desc;
    badgeEl.textContent = data.badge;
    ctaBtn.textContent = data.ctaText;
    ctaBtn.onclick = () => openBookingModal(`Bilan Patrimonial - Profil ${data.title}`);

    pointsEl.innerHTML = data.keyPoints.map(pt => `
      <li class="flex items-start gap-3">
        <div class="w-5 h-5 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
        <span class="text-slate-700 text-sm md:text-base">${pt}</span>
      </li>
    `).join('');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => setProfile(btn.dataset.profile));
  });

  setProfile('particuliers');
}

// 4. Interactive Patrimonial Diagnostic Simulator
function initSimulator() {
  const taxRateInput = document.getElementById('sim-tax-rate');
  const monthlySavingsInput = document.getElementById('sim-savings');
  const capitalInput = document.getElementById('sim-capital');
  const horizonInput = document.getElementById('sim-horizon');

  const taxValDisplay = document.getElementById('sim-tax-val');
  const savingsValDisplay = document.getElementById('sim-savings-val');
  const capitalValDisplay = document.getElementById('sim-capital-val');
  const horizonValDisplay = document.getElementById('sim-horizon-val');

  const projectedGainDisplay = document.getElementById('sim-projected-gain');
  const taxEconomyDisplay = document.getElementById('sim-tax-economy');
  const recommendationDisplay = document.getElementById('sim-recommendation');

  if (!taxRateInput) return;

  function calculate() {
    const taxRate = parseInt(taxRateInput.value, 10);
    const monthlySavings = parseInt(monthlySavingsInput.value, 10);
    const capital = parseInt(capitalInput.value, 10);
    const years = parseInt(horizonInput.value, 10);

    taxValDisplay.textContent = `${taxRate}%`;
    savingsValDisplay.textContent = `${monthlySavings.toLocaleString('fr-FR')} €/mois`;
    capitalValDisplay.textContent = `${capital.toLocaleString('fr-FR')} €`;
    horizonValDisplay.textContent = `${years} ans`;

    // Projected calculation: compound interest estimate at 5.2% net vs bank account (0.5%)
    const rateDiff = 0.047;
    let wealthGain = 0;
    
    // Future value of lump sum
    const futureCapital = capital * Math.pow(1 + rateDiff, years);
    wealthGain += (futureCapital - capital);

    // Future value of regular monthly contributions
    for (let m = 1; m <= years * 12; m++) {
      const remainingYears = (years * 12 - m) / 12;
      wealthGain += monthlySavings * Math.pow(1 + rateDiff, remainingYears) - monthlySavings;
    }

    // Estimated tax economy over period based on PER / Jeanbrun / Défiscalisation
    const annualDeductionPotential = Math.min(monthlySavings * 12 * (taxRate / 100), 18000);
    const totalTaxEconomy = Math.round(annualDeductionPotential * Math.min(years, 6));

    projectedGainDisplay.textContent = `+${Math.round(wealthGain).toLocaleString('fr-FR')} €`;
    taxEconomyDisplay.textContent = `Jusqu'à ${totalTaxEconomy.toLocaleString('fr-FR')} €`;

    // Tailored recommendation text
    let reco = "";
    if (taxRate >= 30) {
      reco = "Fort effet de levier fiscal : Combinaison PER individuel + Dispositif Jeanbrun 2026 + Produits structurés dédiés.";
    } else if (capital >= 100000) {
      reco = "Optimisation de capital : Allocation sur-mesure en architecture ouverte avec garantie ou protection partielle du capital.";
    } else {
      reco = "Développement patrimonial : Plan d'épargne programmé régulier pour neutraliser la volatilité des marchés.";
    }
    recommendationDisplay.textContent = reco;
  }

  [taxRateInput, monthlySavingsInput, capitalInput, horizonInput].forEach(inp => {
    inp.addEventListener('input', calculate);
  });

  calculate();
}

// 5. Deep-dive Article Modal (All Original Content)
const articlesDatabase = {
  jeanbrun: {
    title: "Dispositif Jeanbrun 2026 (Statut de Bailleur Privé)",
    subtitle: "Nouveauté fiscale majeure : à quoi ça sert et comment ça marche ?",
    author: "Philippe Rocha & Cabinet RFP",
    date: "Loi de Finances 2026",
    category: "Fiscalité & Immobilier",
    badge: "Exclusivité 2026",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p class="font-semibold text-amber-950">📌 En résumé :</p>
          <p class="text-sm text-amber-900 mt-1">Le dispositif Jeanbrun, aussi appelé "Relance logement" ou "statut de bailleur privé", est désormais en vigueur en France pour les investissements réalisés jusqu'au 31 décembre 2028. Il vise à relancer l'offre locative avec un mécanisme d'amortissement fiscal très puissant.</p>
        </div>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Pourquoi ce nouveau dispositif ?</h3>
        <p>L'objectif est simple : remettre des logements sur le marché locatif, à un moment où l'offre s'est fortement tendue, notamment pour les étudiants, apprentis et jeunes actifs, après la fin programmée du dispositif Pinel.</p>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Comment fonctionne le mécanisme d'amortissement ?</h3>
        <p>Contrairement aux réductions d'impôts classiques calculées en pourcentage du prix d'achat, le dispositif Jeanbrun s'appuie sur le principe de l'<strong>amortissement du bien immobilier</strong> sur vos revenus locatifs et globaux :</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Amortissement fiscal déductible :</strong> Possibilité d'amortir le bâti chaque année, créant un déficit foncier imputable selon les règles en vigueur.</li>
          <li><strong>Plafonds de loyers modérés :</strong> En contrepartie, le bailleur s'engage à louer le bien à un loyer plafonné à des locataires sous conditions de ressources.</li>
          <li><strong>Engagement de location :</strong> Engagement sur une durée minimale (6 à 9 ans minimum) en résidence principale du locataire.</li>
        </ul>

        <h3 class="text-xl font-bold text-navy-950 font-serif">L'analyse du Cabinet Rocha Finance & Patrimoine</h3>
        <p>Chez Rocha Finance & Patrimoine, nous analysons minutieusement l'adéquation du dispositif Jeanbrun avec votre situation personnelle :</p>
        <blockquote class="p-4 border-l-4 border-gold-500 bg-slate-50 italic text-slate-800">
          "Un bon investissement défiscalisant reste avant tout un excellent investissement immobilier : emplacement, dynamisme du bassin d'emploi toulonnais ou régional, qualité des prestations et rentabilité intrinsèque. Ne faites jamais un investissement uniquement pour le cadeau fiscal !"
        </blockquote>
        <p>Nous sélectionnons pour vous les programmes les plus solides avec nos promoteurs partenaires et gérons l'ensemble des simulations financières préalables.</p>
      </div>
    `
  },
  fiscalite: {
    title: "Comment révolutionner ma fiscalité ?",
    subtitle: "IR, IFI, CSG/CRDS, CEHR, CDHR : reprenez le contrôle en toute légalité",
    author: "Philippe Rocha",
    date: "Analyse Fiscale",
    category: "Optimisation Fiscale",
    badge: "Stratégie Fiscale",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p class="text-lg font-medium text-navy-900">Impôt sur le revenu, CSG, CRDS, contribution exceptionnelle sur les hauts revenus (CEHR), contribution différentielle sur les hauts revenus (CDHR)... vous n'en pouvez plus de la pression fiscale ?</p>
        
        <p>Pourtant, il existe de nombreuses solutions pour diminuer significativement la facture fiscale. Mais pour cela, il faut rencontrer de <strong>vrais spécialistes de la gestion de patrimoine indépendants</strong>, qui ont un regard global sur l'ensemble de vos actifs.</p>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Notre philosophie en 3 piliers</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-gold-600 font-bold mb-1">1. Diagnostic à 360°</div>
            <p class="text-xs text-slate-600">Avant de chercher à vous faire payer moins d'impôts, nous comprenons comment votre patrimoine est structuré et quels sont vos projets de vie.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-gold-600 font-bold mb-1">2. Diversification</div>
            <p class="text-xs text-slate-600">Mobilisation combinée de l'immobilier, des enveloppes financières (PER, Assurance-vie, FIP/FCPI, Girardin) et des structures juridiques (Holding, SCI).</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-gold-600 font-bold mb-1">3. Synergie Interprofessionnelle</div>
            <p class="text-xs text-slate-600">Coordination étroite avec votre notaire, avocat fiscaliste et expert-comptable pour une sécurité juridique totale.</p>
          </div>
        </div>

        <p>Le résultat ? Des économies fiscales immédiates et pérennes, réinvesties dans des actifs qui créent de la valeur réelle pour votre famille.</p>
      </div>
    `
  },
  epargne: {
    title: "L'épargne sur-mesure",
    subtitle: "Pourquoi se limiter aux produits standardisés de votre banque de réseau ?",
    author: "Philippe Rocha",
    date: "Investissement & Finance",
    category: "Architecture Ouverte",
    badge: "Sur-Mesure",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p class="italic font-medium text-slate-800">"Mais qu'est-ce que c'est que ce truc ? Encore une arnaque commerciale où on vous présente un placement soi-disant 'sur-mesure' qui finalement se retrouve dans la poche de tous les clients de la banque ? Du marketing quoi ?"</p>
        
        <p class="text-lg font-bold text-gold-700">Et bien non ! Chez ROCHA Finance & Patrimoine, le sur-mesure peut aller très loin.</p>

        <p>Il est même possible de créer des <strong>produits structurés et des fonds dédiés que vous seul posséderez</strong>, et vous pouvez même en choisir le nom !</p>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Ce que permet l'architecture 100% ouverte :</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Zéro conflit d'intérêt :</strong> Nous ne vendons pas les produits 'maison' d'un grand groupe bancaire. Nous sélectionnons les meilleurs gérants mondiaux (Carmignac, Pictet, Murano, Eres, Selencia, etc.).</li>
          <li><strong>Protection du capital ajustée :</strong> Vous choisissez le curseur exact entre rendement espéré et protection de votre capital (produits structurés à capital 100% garanti ou avec coussin de sécurité).</li>
          <li><strong>Contrats d'Assurance-Vie français et luxembourgeois :</strong> Super-privilège luxembourgeois pour les patrimoines significatifs, multicartes et multi-devises.</li>
        </ul>

        <div class="p-4 bg-navy-900 text-white rounded-xl">
          <p class="text-sm font-light">💡 "Un bon placement, ce n'est pas le placement le plus à la mode. C'est celui dont la liquidité, le rendement et le risque correspondent exactement à votre projet de vie."</p>
        </div>
      </div>
    `
  },
  retraite: {
    title: "Préparer ma retraite (Salarié, Libéral, Chef d'Entreprise)",
    subtitle: "Le modèle par répartition faiblit : comment sanctuariser vos revenus futurs ?",
    author: "Philippe Rocha & Équipe",
    date: "Bilan Retraite",
    category: "Prévoyance & Revenus",
    badge: "Indispensable",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p>Le système de retraite français repose sur un modèle de répartition créé en 1945. À l'époque, il y avait 7 à 8 actifs pour 1 retraité qui décédait en moyenne à 65 ans.</p>
        
        <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-950 text-sm">
          <strong>Le constat chiffré aujourd'hui :</strong> Ce ratio n'est plus que de <strong>1,7 actif pour 1 retraité</strong> (qui a une espérance de vie de 85 ans), et devrait chuter à 1,4 d'ici 2070. Le taux de remplacement n'est que de 55% pour un cadre et descend souvent entre <strong>40% et 50% pour un entrepreneur ou une profession libérale</strong> !
        </div>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Comment le Cabinet RFP procède :</h3>
        <ol class="list-decimal pl-5 space-y-3">
          <li><strong>Diagnostic précis de vos futures pensions :</strong> Reconstitution complète de carrière, détection des anomalies de trimestres et simulation des montants exacts à différents âges de départ.</li>
          <li><strong>Création de solutions sur-mesure :</strong> PER individuel, PER collectif, immobilier de rente, démembrement temporaire de propriété.</li>
          <li><strong>Accompagnement dans la durée :</strong> Ajustement des versements aux réformes fiscales successives.</li>
          <li><strong>Liquidation de vos droits :</strong> Prise en charge des démarches administratives pour déclencher vos rentes et capitaux au moment venu sans stress.</li>
        </ol>
      </div>
    `
  },
  transmission: {
    title: "Chef d'entreprise : 'Ma vie d'après'",
    subtitle: "Cession, transmission, pacte Dutreil, réinvestissement : franchir le cap avec sérénité",
    author: "Philippe Rocha",
    date: "Conseil Dirigeant",
    category: "Cession d'Entreprise",
    badge: "Haut de Bilan",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p>Ça y est, vous commencez à y réfléchir sérieusement... C'est en même temps une joie, un déchirement, et parfois une angoisse. Ce moment, celui de la cession de votre entreprise qui rime souvent avec le départ à la retraite, arrive. Et beaucoup de questions se bousculent :</p>
        
        <ul class="list-disc pl-5 space-y-1 text-slate-800 font-medium">
          <li>Vais-je conserver un niveau de vie équivalent ?</li>
          <li>Comment va être taxée la plus-value de cession ? (Flat tax, abattements dirigeants, régime d'apport-cession 150-0 B ter ?)</li>
          <li>Comment protéger mes enfants et transmettre une partie avant la vente ?</li>
        </ul>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Notre accompagnement avant, pendant et après la cession</h3>
        <p>Ne préparez pas votre cession 3 mois avant la signature chez le notaire ! L'optimisation se joue <strong>2 à 3 ans en amont</strong> :</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Mise en place d'une <strong>Holding passive ou animatrice</strong> avec report d'imposition (article 150-0 B ter).</li>
          <li>Donation avant cession avec purge des plus-values pour vos enfants.</li>
          <li>Déploiement du <strong>Pacte Dutreil</strong> pour une transmission familiale avec exonération de 75% des droits.</li>
          <li>Construction d'un portefeuille d'actifs de rendement pour assurer votre rente pérenne 'après l'entreprise'.</li>
        </ul>
      </div>
    `
  },
  tresorerie: {
    title: "Rémunérer la trésorerie de mon entreprise",
    subtitle: "Ne laissez plus dormir des centaines de milliers d'euros sur vos comptes courants",
    author: "Gérard & Philippe Rocha",
    date: "Gestion Trésorerie Pro",
    category: "Corporate Finance",
    badge: "Entreprises & Sociétés",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p>Vous êtes une Société commerciale, une holding, une association, ou une profession libérale ? Nous le constatons régulièrement : les sommes laissées 'dormir' sur les comptes courants sont parfois astronomiques (centaines de milliers, voire millions d'euros) et totalement érodées par l'inflation !</p>

        <p class="font-medium text-navy-950">Les placer ? Pourquoi pas... mais vous craignez le blocage ou le risque ?</p>
        
        <p>Chez ROCHA Finance & Patrimoine, nous mettons en place des <strong>solutions de trésorerie sur-mesure adaptées à chaque horizon :</strong></p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Court terme (liquidité disponible) :</strong> Comptes à terme négociés auprès de nos banques partenaires, contrats de capitalisation personne morale, obligations court terme de grande qualité.</li>
          <li><strong>Moyen et long terme :</strong> Usufruit temporaire de SCPI, produits de trésorerie structurés à capital garanti, gestion sous mandat dédiée aux personnes morales.</li>
          <li><strong>Traitement comptable optimisé :</strong> Respect des normes comptables et optimisation de l'IS (Impôt sur les Sociétés).</li>
        </ul>
      </div>
    `
  },
  credit: {
    title: "Financer mes projets personnels et professionnels à crédit",
    subtitle: "Pharmacies, cabinets médicaux, restructurations, cash-out : obtenez les meilleures conditions",
    author: "Philippe Rocha",
    date: "Recherche de Financement",
    category: "Crédit & Financement",
    badge: "Courtiership",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p>Vous allez sauter le pas et créer votre entreprise ? Vous êtes déjà entrepreneur et vous devez financer des investissements lourds ? Vous souhaitez racheter les parts de votre associé ou réaliser une opération de 'cash-out' ?</p>

        <p class="font-medium text-navy-950">Comment présenter votre dossier ? Comment négocier le taux, les garanties, l'assurance emprunteur sans se faire pénaliser par les banques ?</p>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Notre expérience du terrain bancaire</h3>
        <p>En tant qu'ancien banquier et courtier agréé en opérations de banque (ORIAS n° 12 064 891), Philippe Rocha connaît exactement les ratios d'acceptation, les marges de négociation et les attentes des comités de crédit.</p>
        
        <p>Nous avons accompagné avec succès :</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Des financements d'<strong>officines de pharmacie</strong> et regroupements.</li>
          <li>Des acquisitions de <strong>cabinets de kinésithérapie, dentaires ou médicaux</strong>.</li>
          <li>Des restructurations financières et refinancements de dettes professionnelles.</li>
        </ul>
        <p class="text-gold-700 font-semibold">Les gains obtenus sur le coût total du crédit et de l'assurance atteignent régulièrement plusieurs dizaines de milliers d'euros.</p>
      </div>
    `
  },
  epargne_salariale: {
    title: "L'Épargne Salariale & Partage de la Valeur",
    subtitle: "PEE, PEI, PERCOL, PPV : optimiser la fiscalité pour le dirigeant et motiver l'équipe",
    author: "Philippe Rocha",
    date: "Dispositif d'Entreprise",
    category: "Épargne Salariale",
    badge: "Optimisation Salariale",
    content: `
      <div class="space-y-6 text-slate-700 leading-relaxed text-base">
        <p>L'épargne salariale est accessible aux salariés mais aussi aux <strong>dirigeants d'entreprises employant au moins un salarié</strong>. C'est l'un des outils d'optimisation sociale et fiscale les plus puissants du droit français.</p>

        <h3 class="text-xl font-bold text-navy-950 font-serif">Les avantages décisifs :</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Exonération de cotisations sociales :</strong> Les sommes versées au titre de l'intéressement, de la participation et de l'abondement sont exonérées de cotisations sociales (hors CSG/CRDS).</li>
          <li><strong>Déductibilité de l'IS :</strong> L'abondement de l'entreprise est intégralement déductible du résultat imposable.</li>
          <li><strong>Exonération d'impôt sur le revenu :</strong> Pour le bénéficiaire (salarié ou dirigeant), les sommes bloquées 5 ans (PEE) ou jusqu'à la retraite (PERCOL) sortent nettes d'impôt sur le revenu (hors prélèvements sociaux sur les gains).</li>
        </ul>

        <p>En partenariat avec <strong>Eres</strong>, leader indépendant de l'épargne salariale, nous concevons un accord d'épargne d'entreprise clé en main adapté à la taille de votre structure.</p>
      </div>
    `
  }
};

function initArticleModal() {
  const modal = document.getElementById('article-modal');
  const modalOverlay = document.getElementById('article-modal-overlay');
  const modalClose = document.getElementById('article-modal-close');
  const modalTitle = document.getElementById('article-modal-title');
  const modalSubtitle = document.getElementById('article-modal-subtitle');
  const modalCategory = document.getElementById('article-modal-category');
  const modalDate = document.getElementById('article-modal-date');
  const modalBody = document.getElementById('article-modal-body');
  const modalCta = document.getElementById('article-modal-cta');

  if (!modal) return;

  function openArticle(key) {
    const art = articlesDatabase[key];
    if (!art) return;

    modalTitle.textContent = art.title;
    modalSubtitle.textContent = art.subtitle;
    modalCategory.textContent = art.category;
    modalDate.textContent = `${art.author} · ${art.date}`;
    modalBody.innerHTML = art.content;

    modalCta.onclick = () => {
      closeArticle();
      openBookingModal(`Échange au sujet de : ${art.title}`);
    };

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeArticle() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.openArticleModal = openArticle;

  if (modalClose) modalClose.addEventListener('click', closeArticle);
  if (modalOverlay) modalOverlay.addEventListener('click', closeArticle);

  document.querySelectorAll('[data-open-article]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openArticle(btn.dataset.openArticle);
    });
  });
}

// 6. Team Members Modal (With Phoenix the Cat Story!)
const teamData = {
  philippe: {
    name: "Philippe ROCHA",
    role: "Fondateur & Gérant du Cabinet",
    subtitle: "Conseiller en Gestion de Patrimoine Diplômé · Membre ANACOFI-CIF",
    img: "assets/img/philippe-rocha.jpg",
    bio: `
      <p class="mb-3">Après plusieurs années d'expérience réussie dans la banque de détail et le conseil financier institutionnel, Philippe a choisi de créer le Cabinet ROCHA Finance & Patrimoine pour se libérer des contraintes commerciales des banques traditionnelles.</p>
      <p class="mb-3">Sa vision : <strong>l'indépendance sans concession, l'excellence financière et une relation humaine chaleureuse</strong>. Philippe intervient personnellement sur les dossiers de haut niveau patrimonial, l'optimisation fiscale complexe, les restructurations de crédit et la préparation à la cession d'entreprise.</p>
      <p>Engagé au niveau local, il est l'initiateur de l'opération annuelle <em>'Faites rimer rentabilité et générosité'</em> qui reverse chaque année des dons concrets aux associations du Var et de la région.</p>
    `
  },
  sanae: {
    name: "Sanae CHDIYYAK",
    role: "Associée & Conseillère en Gestion de Patrimoine",
    subtitle: "Experte en Stratégie Patrimoniale & Allocations d'Actifs",
    img: "assets/img/sanae-chdiyyak.jpg",
    bio: `
      <p class="mb-3">Associée du cabinet, Sanae accompagne les particuliers, familles et professions libérales avec une rigueur technique remarquable et une écoute active particulièrement saluée par nos clients.</p>
      <p class="mb-3">Spécialiste de l'épargne sur-mesure, de la préparation à la retraite et de la protection de la famille, elle sait vulgariser les mécanismes fiscaux et financiers les plus complexes pour donner à chacun la maîtrise de ses décisions.</p>
      <p>Comme en témoignent les avis déposés sur notre fiche Google, sa disponibilité et la pertinence de ses analyses font d'elle une interlocutrice de référence au sein du cabinet.</p>
    `
  },
  lisa: {
    name: "Lisa GUFONI",
    role: "Conseillère Clientèle",
    subtitle: "Accueil, Relation Client & Suivi Opérationnel",
    img: "assets/img/lisa-gufoni.jpg",
    bio: `
      <p class="mb-3">Lisa est le cœur battant de la relation clientèle au cabinet. Elle veille à ce que chaque client bénéficie d'une réactivité exemplaire et d'un traitement soigné de ses demandes.</p>
      <p class="mb-3">Elle assure la liaison quotidienne avec nos partenaires assureurs, sociétés de gestion et banques dépositaires pour fluidifier l'exécution de vos opérations patrimoniales.</p>
      <p>Souriante, organisée et bienveillante, elle incarne au quotidien l'accueil chaleureux qui caractérise Rocha Finance & Patrimoine.</p>
    `
  },
  phoenix: {
    name: "PHOENIX 🐾",
    role: "Responsable Bien-être & Ronrons",
    subtitle: "Mascotte Officielle & Ambassadeur Tendresse du Cabinet",
    img: "assets/img/phoenix.jpg",
    bio: `
      <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 mb-4 text-sm text-amber-950 font-serif italic">
        "Une vie qui n'a pas si bien commencé, mais qui a trouvé son refuge chaleureux chez Rocha Finance & Patrimoine."
      </div>
      <p class="mb-3">Phoenix est né en 2021 en Corse où il a vécu une vie de jeune chat libre dans la rue. Il a appris à se battre pour sa survie. C'est lors d'un incendie dans un restaurant de plage où il avait l'habitude de cantiner qu'il a perdu sa maison de fortune... et sa queue !</p>
      <p class="mb-3">Pris en charge par les formidables bénévoles de l'<strong>Association SOLEÏ</strong>, il lui fallait un havre de paix sécurisant, loin des rivalités de quartier, avec des humains attentifs pour le choyer. Le Cabinet Rocha Finance & Patrimoine a immédiatement craqué et a ouvert grand ses portes pour l'adopter !</p>
      <p class="mb-3">Aujourd'hui, Phoenix veille sur le cabinet, dispense ses ronronthérapies antistress à l'équipe et accueille nos clients les plus curieux avec une bonhomie irrésistible. Une preuve vivante que la finance de haut niveau peut être profondément humaine et protectrice de la vie.</p>
      <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Adopté grâce à l'association SOLEÏ</span>
        <span class="font-bold text-gold-700">#BienÊtreAuBureau</span>
      </div>
    `
  },
  alternants: {
    name: "Lorie, Maeline & Charly",
    role: "Assistants Commerciaux & Alternants",
    subtitle: "L'énergie de la relève au service de votre satisfaction",
    img: "assets/img/team-group.jpg",
    bio: `
      <p class="mb-3">Le cabinet investit activement dans la jeunesse et la transmission des savoirs. <strong>Lorie Righi</strong>, <strong>Maeline Arhel</strong> et <strong>Charly Pinsonneau</strong> renforcent chaque jour nos équipes commerciales et administratives.</p>
      <p class="mb-3">Ils participent activement à la préparation des bilans patrimoniaux, aux études comparatives de solutions financières et à la veille réglementaire sous la supervision directe de Philippe et Sanae.</p>
      <p>Leur enthousiasme et leur implication quotidienne participent pleinement au dynamisme et à la fraîcheur de notre cabinet toulonnais.</p>
    `
  }
};

function initTeamModal() {
  const modal = document.getElementById('team-modal');
  const modalOverlay = document.getElementById('team-modal-overlay');
  const modalClose = document.getElementById('team-modal-close');
  const modalImg = document.getElementById('team-modal-img');
  const modalName = document.getElementById('team-modal-name');
  const modalRole = document.getElementById('team-modal-role');
  const modalSubtitle = document.getElementById('team-modal-subtitle');
  const modalBio = document.getElementById('team-modal-bio');

  if (!modal) return;

  function openTeam(key) {
    const mem = teamData[key];
    if (!mem) return;

    modalImg.src = mem.img;
    modalImg.alt = mem.name;
    modalName.textContent = mem.name;
    modalRole.textContent = mem.role;
    modalSubtitle.textContent = mem.subtitle;
    modalBio.innerHTML = mem.bio;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeTeam() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.openTeamModal = openTeam;

  if (modalClose) modalClose.addEventListener('click', closeTeam);
  if (modalOverlay) modalOverlay.addEventListener('click', closeTeam);

  document.querySelectorAll('[data-open-team]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openTeam(btn.dataset.openTeam);
    });
  });
}

// 7. Booking Appointment Modal
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const modalOverlay = document.getElementById('booking-modal-overlay');
  const modalClose = document.getElementById('booking-modal-close');
  const modalSubject = document.getElementById('booking-subject-input');
  const bookingForm = document.getElementById('booking-form');
  const successNotice = document.getElementById('booking-success-notice');

  if (!modal) return;

  function openBooking(prefillSubject = "") {
    if (modalSubject && prefillSubject) {
      modalSubject.value = prefillSubject;
    }
    if (successNotice) successNotice.classList.add('hidden');
    if (bookingForm) bookingForm.classList.remove('hidden');

    // Default date to next business day
    const dateInput = document.getElementById('booking-date-input');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeBooking() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.openBookingModal = openBooking;

  if (modalClose) modalClose.addEventListener('click', closeBooking);
  if (modalOverlay) modalOverlay.addEventListener('click', closeBooking);

  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = btn.dataset.bookingSubject || "";
      openBooking(subject);
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.classList.add('hidden');
      if (successNotice) successNotice.classList.remove('hidden');
    });
  }
}

// 8. VIP Club Modal
function initVipModal() {
  const modal = document.getElementById('vip-modal');
  const modalOverlay = document.getElementById('vip-modal-overlay');
  const modalClose = document.getElementById('vip-modal-close');

  if (!modal) return;

  function openVip() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeVip() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.openVipModal = openVip;

  if (modalClose) modalClose.addEventListener('click', closeVip);
  if (modalOverlay) modalOverlay.addEventListener('click', closeVip);

  document.querySelectorAll('[data-open-vip]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVip();
    });
  });
}

// 9. Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Transmission en cours...`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => successBox.classList.add('hidden'), 8000);
      }
    }, 1200);
  });
}

// Close modals with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['article-modal', 'team-modal', 'booking-modal', 'vip-modal'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.classList.contains('hidden')) {
        el.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});
