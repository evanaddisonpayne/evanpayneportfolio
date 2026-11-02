// French (France) copy for the portfolio pages, translated from content/en.ts.
// Same keys and structure as the English. Non-breaking spaces follow the no-orphan rule, narrow no-break spaces
// sit before\u202f;\u202f!\u202f? and inside guillemets, and the "   ·   " runs are the eyebrow separators.

import type { Dict } from "./en";

export const fr: Dict = {
  locale: "fr",
  langName: "Français",

  meta: {
    defaultTitle: "Evan Addison Payne · Stratégie de marque et de croissance",
    description:
      "Evan Addison Payne est Director of Brand & Growth Strategy chez The Starr Conspiracy, à Chicago. Il aide les entreprises Work Tech, HR tech et SaaS à cesser de parler comme leurs\u00a0concurrents.",
    ogLocale: "fr_FR",
  },

  site: {
    title: "Director, Brand & Growth\u00a0Strategy",
    city: "Chicago, IL",
  },

  common: {
    skip: "Aller au contenu",
    homeLabel: "{name}, accueil",
    readCase: "Lire le cas\u00a0\u00a0→",
    portraitAlt: "Portrait gravé au trait d’Evan, en casquette et lunettes aviateur, souriant",
    deskAlt:
      "Dessin gravé au trait d’un bureau la nuit\u00a0: lampe, carnet ouvert, platine vinyle, et les gratte-ciel de Chicago par la\u00a0fenêtre",
    languageLabel: "Langue",
  },

  nav: {
    links: [
      { href: "/work", label: "Projets" },
      { href: "/writing", label: "Écrits" },
      { href: "/about", label: "À propos" },
      { href: "/resume", label: "CV" },
    ],
    mainLabel: "Principal",
    cta: "Parlons-en",
    menu: "MENU",
    close: "FERMER",
    menuLabel: "Menu",
  },

  footer: {
    eyebrow: "Parlons-en",
    heading: "Si vous en avez assez de ressembler à tout le monde, servez-vous un verre et racontez-moi ce qui se\u00a0passe.",
    button: "Parlons-en",
    navLabel: "Pied de page",
  },

  home: {
    hero: {
      h1: "Sous tous ces messages prudents et poncés se cache une entreprise qui mérite qu’on s’en\u00a0souvienne.",
      lede:
        "Je suis Evan Addison Payne, et je pilote la stratégie de marque et de croissance d’entreprises Work Tech, HR tech et SaaS. Je fouille les decks, les documents de positionnement et les murs de post-it jusqu’à trouver ce que vous seul pouvez dire. Ensuite, je vous aide à le dire haut et fort, en le pensant vraiment, à des acheteurs qui ont entendu toutes les variantes possibles de «\u202fplateforme\u00a0tout-en-un\u202f».",
      cta: "Parlons-en",
      secondary: "Lire Brand\u00a0Therapy",
    },
    stances: {
      eyebrow: "Mes convictions",
      h2: "Cinq sujets pour lesquels je me battrai au bar, au dîner et en pleine revue\u00a0trimestrielle.",
      tarotAlt: "Carte de tarot {n}, {name}",
      items: [
        {
          n: 1,
          name: "La Foule",
          title: "L’uniformité est un problème de chiffre\u00a0d’affaires.",
          body: "Quand les acheteurs ne savent pas vous distinguer, ils choisissent le moins cher ou celui dont ils ont entendu parler en premier, et vous finissez par payer plein tarif un marketing dont personne ne se\u00a0souvient.",
        },
        {
          n: 2,
          name: "Le Comité",
          title: "Le consensus tue les\u00a0marques.",
          body: "Chaque «\u202fon pourrait adoucir un peu\u202f» ponce une aspérité de plus, jusqu’à ce qu’il ne reste qu’un message validé par tout le monde et que personne n’est capable de\u00a0répéter.",
        },
        {
          n: 3,
          name: "L’Étincelle",
          title: "L’IA est un accélérateur, pas un\u00a0substitut.",
          body: "Je m’en sers tous les jours, et elle est brillante pour aller plus vite. Elle ne sert à rien pour décider où vous devriez aller, et ça, c’est toujours votre\u00a0travail.",
        },
        {
          n: 4,
          name: "La Boussole",
          title: "Le positionnement avant la demand\u00a0gen.",
          body: "Quand le pipeline s’essouffle, le réflexe est de dépenser plus. Le problème se situe généralement en amont, dans un récit qui n’a jamais donné à personne une raison de vous\u00a0choisir.",
        },
        {
          n: 5,
          name: "Le Fantôme",
          title: "Prudent ne veut pas dire sans\u00a0risque.",
          body: "Jouer la sécurité semble responsable, jusqu’au jour où vous réalisez que personne n’avait remarqué votre\u00a0présence.",
        },
      ],
    },
    newsletter: {
      eyebrow: "La newsletter   ·   Sur LinkedIn, en anglais",
      name: "Brand Therapy",
      lede:
        "Une newsletter pour tous ceux qui ont subi un atelier messaging de trop. Chaque numéro prend une chose qui cloche en silence dans les marques B2B, la démonte sur la table et vous dit ce que je ferais vraiment. Aucun framework au joli acronyme\u00a0nécessaire.",
      quote: "Vous ne manquez pas de marketing. Vous manquez de\u00a0différenciation.",
      from: "Extrait du numéro\u00a0(I)",
      issueTitle: "Vous vous ressemblez tous. Ça coûte des\u00a0millions.",
      read: "Lire le numéro\u00a0(I)",
      subscribe: "S’abonner sur\u00a0LinkedIn",
      tarotAlt: "Carte du numéro (I), Vous vous ressemblez tous",
    },
    work: {
      eyebrow: "Projets choisis",
      h2: "Les preuves, avec des noms quand j’ai le droit de les citer, et des descriptions honnêtes quand je ne l’ai\u00a0pas.",
      seeAll: "Voir tous les projets\u00a0\u00a0→",
    },
    about: {
      eyebrow: "À propos",
      h2: "En réunion stratégique, c’est moi qui pose la question que tout le monde espérait éviter. Puis je reste, et je fais le\u00a0travail.",
      lede:
        "Le jour, je suis Director of Brand & Growth Strategy chez The Starr Conspiracy, une agence B2B nativement IA. Je travaille surtout avec des entreprises Work Tech, HR tech et SaaS qui ont un vrai produit, et un marché incapable de les distinguer du fournisseur d’à côté. Je les aide à comprendre pourquoi, puis je corrige le\u00a0tir.",
      habits: ["Avoir tort tout\u00a0haut", "Diagnostiquer, puis\u00a0dépenser", "Je le fabrique\u00a0moi-\u2060même"],
      italic:
        "La plupart de mes congés servent à découvrir un endroit nouveau. Douze pays pour l’instant, et je suis loin d’avoir fini. De retour à Chicago, mes soirées préférées sont celles où je\u00a0reçois.",
      more: "Lire la version\u00a0longue",
      stampsAlt: "Tampons de passeport\u00a0: ORD, port d’attache. AMS, un jour. PRG, allez-y.",
    },
  },

  about: {
    title: "À propos",
    hero: {
      eyebrow: "À propos",
      h1: "En réunion stratégique, c’est moi qui pose la question que tout le monde espérait éviter. Puis je reste, et je fais le\u00a0travail.",
      lede:
        "Je suis Evan Addison Payne, Director of Brand & Growth Strategy chez The Starr Conspiracy, une agence B2B nativement IA. Je vis à Chicago. Je travaille surtout avec des entreprises Work Tech, HR tech et SaaS qui ont un vrai produit, et un marché incapable de les distinguer du fournisseur d’à côté. Je les aide à comprendre pourquoi, puis je corrige le\u00a0tir.",
      cta: "Parlons-en",
      resume: "Voir le\u00a0CV",
    },
    long: {
      eyebrow: "Le chemin des écoliers",
      h2: "L’Arkansas, puis directement au\u00a0travail.",
      lede:
        "Je suis passé directement de la University of Arkansas à une société de production, puis au marketing civique et associatif, puis à la tech B2B. Chacun de ces postes avait un chiffre à tenir, et chacun m’a appris quelque chose qui me sert\u00a0encore.",
      careerLabel: "Parcours",
      // [year, line 1, line 2] for the career strip. Org names stay as they are.
      stops: [
        ["2017", "Intercut", "Productions"],
        ["2020", "Bentonville", "Chamber"],
        ["2021", "The Starr", "Conspiracy"],
        ["2023", "SF AIDS", "Foundation"],
        ["2024", "hireEZ", ""],
        ["2025", "The Starr", "Conspiracy"],
        ["AUJOURD’HUI", "Director,", "Brand &\u00a0Growth"],
      ],
      chapters: [
        {
          n: "I",
          title: "La salle",
          meta: "De 2017 à 2020   ·   Production",
          body: "Trois ans comme Chief of Staff chez Intercut Productions, à gérer les comptes et à transformer des initiatives de groupes du Fortune 500 en histoires que les gens regardaient vraiment jusqu’au bout. L’essentiel de ce que je sais sur l’art de capter l’attention d’une salle et de la garder, je l’ai appris\u00a0là-\u2060bas.",
          chips: ["Clients Fortune\u00a0500", "Émission nommée aux\u00a0Emmy"],
        },
        {
          n: "II",
          title: "La mission",
          meta: "De 2020 à 2024   ·   Civique et associatif",
          body: "Une chambre de commerce en concurrence à l’échelle nationale pour attirer les talents, puis un programme associatif de 10\u00a0M$ où chaque dollar devait servir la mission. Le travail devait parler aux gens à qui il s’adressait, pas seulement à ceux qui le\u00a0validaient.",
          chips: ["+78\u00a0%\u00a0d’impressions", "Budget de 10\u00a0M$"],
        },
        {
          n: "III",
          title: "Le chiffre",
          meta: "De 2021 à aujourd’hui   ·   B2B SaaS et HR tech",
          body: "La stratégie marketing chez The Starr Conspiracy, un objectif mensuel de 2,2\u00a0M$ chez hireEZ, puis retour chez TSC pour diriger la marque et la croissance. Tout ce que je touche aujourd’hui se mesure au pipeline et au chiffre\u00a0d’affaires.",
          chips: ["1,72\u00a0M$\u00a0d’ARR", "+15–20\u00a0% sur\u00a0l’objectif"],
        },
      ],
      education: "University of Arkansas, B.S. in Business Administration, spécialités marketing et\u00a0économie.",
      resumeLink: "Voir le CV complet\u00a0\u00a0→",
    },
    how: {
      eyebrow: "Ma façon de travailler",
      h2: "À quoi ressemble le travail avec\u00a0moi.",
      habits: [
        {
          title: "Avoir tort tout\u00a0haut",
          body: "Je pose tôt un point de vue clair sur la table, même s’il s’avère faux. Une équipe peut réagir à quelque chose de précis. Elle ne peut pas faire grand-chose d’un deck assez prudent pour donner raison à tout le\u00a0monde.",
        },
        {
          title: "Diagnostiquer, puis\u00a0dépenser",
          body: "Avant d’ajouter du budget, je veux savoir ce qui est vraiment cassé. Un pipeline mou est souvent un problème de positionnement, et dépenser plus sur un message dont personne ne se souvient ne fait que le rendre plus\u00a0cher.",
        },
        {
          title: "Je le fabrique\u00a0moi-\u2060même",
          body: "Je sais ouvrir Figma et construire le livrable moi-même, donc l’idée que vous validez est celle qui sort. Rien ne se perd entre le deck stratégique et le\u00a0designer.",
        },
      ],
    },
    outside: {
      eyebrow: "En dehors du travail",
      h2: "Je suis généralement\u00a0ailleurs.",
      paragraphs: [
        "La plupart de mes congés servent à découvrir un endroit nouveau. Douze pays pour l’instant, et je suis loin d’avoir fini. Chaque nouvelle ville commence de la même façon. Je trouve le bon bar, puis je marche jusqu’à me perdre. Si vous me demandez où aller ensuite, je vous répondrai\u00a0Prague.",
        "De retour à Chicago, mes soirées préférées sont celles où je reçois. Une longue table, un grand dîner, et des amis qui restent bien plus tard que prévu. Lollapalooza, c’est mon festival. Industry, c’est ma série du moment. Et tard le soir, c’est Charli XCX, John Summit ou Slayyyter, en général pendant que je m’attaque à ce qui m’a résisté dans la\u00a0journée.",
      ],
      list: [
        ["En boucle", "Charli XCX, John Summit,\u00a0Slayyyter."],
        ["À l’écran", "Industry, sur\u00a0HBO."],
        ["Envoyez un ami\u00a0à", "Prague."],
        ["Un jour", "Une maison sur un canal\u00a0d’Amsterdam."],
      ],
      mapTitle: "Là où je suis allé\u00a0: une carte interactive des vols et des trajets en train de 2016 à 2026",
    },
  },

  work: {
    title: "Projets",
    eyebrow: "Projets",
    h1: "Dix ans de travail, classés selon le problème résolu plutôt que selon le logo sur la\u00a0porte.",
    lede:
      "Certains noms vous diront quelque chose, d’autres sont sous NDA, mais tout est réel et chaque chiffre est un chiffre que j’assume. Quand j’ai dirigé, je le dis. Quand ce n’était pas le cas, je le dis\u00a0aussi.",
    casesLabel: "Études de cas",
  },

  caseStudy: {
    situation: "(I)   La\u00a0situation",
    did: "(II)   Ce que j’ai\u00a0fait",
    result: "(III)   Ce qui en est\u00a0sorti",
    next: "Cas suivant",
  },

  writing: {
    title: "Écrits",
    eyebrow: "Écrits",
    h1: "Ce que je dirais en réunion si nous avions plus de\u00a0temps.",
    lede: "De courts essais sur le positionnement, la marque et ce à quoi l’IA sert vraiment. Surtout sur la tech B2B, parfois sur tout le\u00a0reste.",
    featured: {
      meta: "(I)\u00a0\u00a0\u00a0Positionnement\u00a0\u00a0\u00a0·\u00a0\u00a0\u00a0À la\u00a0une",
      title: "Vous vous ressemblez tous. Ça coûte des\u00a0millions.",
      dek: "La Work Tech a un problème d’uniformité. Et non, un énième atelier messaging ne va pas le\u00a0régler.",
      date: "avril 2026\u00a0\u00a0\u00a0·\u00a0\u00a0\u00a06 min de\u00a0lecture",
      read: "Lire l’article ",
    },
  },

  share: {
    label: "Partager",
    copy: "Copier le\u00a0lien",
    copied: "Copié",
  },

  contact: {
    title: "Parlons-en",
    eyebrow: "Parlons-en",
    h1: "Dites-moi ce qui se\u00a0passe.",
    lede:
      "Une marque qui ressemble à toutes les autres, un chiffre de croissance qui ne bouge pas, ou un poste que vous cherchez à pourvoir. Envoyez-moi la version courte, je m’occupe du\u00a0reste.",
    linkedin: {
      label: "LinkedIn",
      h: "Le moyen le plus rapide de me\u00a0joindre.",
      d: "Mon profil est ouvert, vous pouvez donc m’écrire directement, sans être en relation. Dites-moi ce qui se passe et où vous\u00a0travaillez.",
      button: "M’écrire sur LinkedIn\u00a0\u00a0→",
    },
    email: {
      label: "E-mail",
      h: "Vous préférez\u00a0l’e-mail\u202f?",
      d: "Je réponds tout aussi vite dans les deux\u00a0cas.",
      show: "Afficher l’adresse\u00a0e-\u2060mail",
      copy: "Copier",
      copied: "Copié",
    },
    nextLabel: "La suite",
    steps: [
      ["Je le lis\u00a0moi-\u2060même.", "Pas d’assistant, pas de transfert, pas de numéro de\u00a0ticket."],
      ["Je vous\u00a0réponds.", "En général sous deux jours\u00a0ouvrés."],
      ["On fixe un\u00a0appel.", "Trente minutes, si ça semble coller. Sinon, je vous le dis, et je vous oriente vers une meilleure piste quand je le\u00a0peux."],
    ],
    beforeLabel: "Avant de\u00a0m’écrire",
    resumeLink: "Le CV complet\u00a0\u00a0→",
    workLink: "Projets choisis\u00a0\u00a0→",
  },

  resume: {
    title: "CV",
    kicker: "CV",
    role: ["Director of Brand & Growth\u00a0Strategy", "The Starr\u00a0Conspiracy", "Chicago"],
    pos: "Je dirige la stratégie de marque et de croissance d’entreprises B2B SaaS et HR tech, de la décision de positionnement jusqu’au pipeline qu’elle doit\u00a0produire.",
    pdf: "Télécharger le\u00a0PDF",
    linkedin: "LinkedIn\u00a0\u00a0→",
    scope: [
      { num: "10+", label: "ans en marque et en\u00a0croissance" },
      { num: "7", label: "personnes sous ma responsabilité\u00a0directe" },
      { num: "75 + 1\u00a0000", label: "collègues et bénévoles dans un travail\u00a0transverse" },
      { num: "3", label: "régions clientes\u00a0: Amérique du Nord, EMEA et\u00a0APAC" },
    ],
    labels: { results: "Résultats", experience: "Expérience", capabilities: "Compétences", education: "Formation" },
    results: [
      {
        num: "+15–20\u00a0%",
        text: "Objectif de chiffre d’affaires mensuel de 2,2\u00a0M$ dépassé de 15 à 20\u00a0%, de façon régulière, à la tête de l’équipe SEO, paid media et\u00a0contenu.",
        org: "hireEZ",
        year: "2024",
      },
      {
        num: "10\u00a0M$",
        text: "Pilotage de bout en bout d’un budget événementiel et marketing de 10\u00a0M$. Les lancements de la boutique en ligne ont rapporté en moyenne plus de 125\u00a0k$ dans leurs 24 premières\u00a0heures.",
        org: "San Francisco AIDS Foundation",
        year: "2023–24",
      },
      {
        num: "1,72\u00a0M$",
        text: "Supervision de 1,72\u00a0M$ de revenus annuels récurrents avec un NPS de 9,75, et 600\u00a0k$ d’upsell identifiés avec les directeurs\u00a0commerciaux.",
        org: "The Starr Conspiracy",
        year: "2021–22",
      },
    ],
    jobs: [
      {
        org: "The Starr Conspiracy",
        when: "2025 – aujourd’hui",
        where: "Chicago",
        note: "Retour en février 2025, promu Director 14 mois plus\u00a0tard.",
        roles: [
          {
            title: "Director of Brand & Growth\u00a0Strategy",
            when: "avril 2026 – aujourd’hui",
            mandate:
              "Stratégie de marque et de croissance pour des clients B2B SaaS et HR tech, avec une équipe transverse couvrant contenu, design, digital, analytics et stratégie\u00a0client.",
            bullets: [
              "Direction du positionnement de catégorie et des messages, avec en ligne de mire le win rate des clients et l’engagement des\u00a0dirigeants.",
              "Pilotage de programmes de thought leadership pour dirigeants, qui augmentent la part de voix dans les médias HR tech et sur\u00a0LinkedIn.",
              "Responsabilité des tableaux de bord d’attribution, de reporting et de KPI qui servent à optimiser le CAC et la\u00a0conversion.",
            ],
          },
          {
            title: "Marketing & Brand\u00a0Strategist",
            when: "févr. 2025 – avril 2026",
            mandate: "Grands comptes de la tech B2B, avec un accent sur la croissance intégrant l’IA et l’Answer Engine\u00a0Optimization.",
            bullets: [
              "Migration de clients grands comptes de la recherche traditionnelle vers l’Answer Engine Optimization, pour accélérer l’arrivée de leads\u00a0qualifiés.",
              "Organisation d’événements clients en présentiel en Amérique du Nord, EMEA et APAC, qui ont généré des leads\u00a0qualifiés.",
              "NPS de 9,5 maintenu sur les comptes clients clés, avec détection précoce des comptes à risque et pilotage des actions qui ont protégé le chiffre d’affaires à long\u00a0terme.",
            ],
          },
        ],
      },
      {
        org: "hireEZ",
        when: "2024 – 2025",
        where: "Mountain View, CA",
        roles: [
          {
            title: "Senior Manager, Digital\u00a0Marketing",
            mandate: "HR tech. À la tête de l’équipe SEO, paid media et contenu, face à un objectif de chiffre d’affaires mensuel de 2,2\u00a0M$.",
            bullets: [
              "Objectif dépassé de 15 à 20\u00a0%, de façon\u00a0régulière.",
              "Mise en place de méthodes agiles et de sprints de performance hebdomadaires pour repérer les campagnes gagnantes et les faire monter en\u00a0puissance.",
            ],
          },
        ],
      },
      {
        org: "San Francisco AIDS Foundation, AIDS/\u200bLifeCycle",
        when: "2023 – 2024",
        where: "San Francisco",
        roles: [
          {
            title: "Director of Marketing, Communications & Digital\u00a0Engagement",
            mandate: "Direction du service marketing sur un budget événementiel et marketing de 10\u00a0M$, dont environ 200\u00a0k$ par an en paid\u00a0media.",
            bullets: [
              "Alignement de l’engagement digital multicanal sur les objectifs de chiffre d’affaires à long terme, et construction de plans intégrés pour la conversion MQL et\u00a0SQL.",
              "Travail en binôme avec la direction sur les plans de croissance, et pilotage du déploiement et de la conduite du changement pour des plateformes tierces et sur\u00a0mesure.",
              "Des lancements de boutique en ligne à plus de 125\u00a0k$ de chiffre d’affaires en moyenne sur les 24 premières\u00a0heures.",
            ],
          },
        ],
      },
      {
        org: "The Starr Conspiracy",
        when: "2021 – 2022",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Marketing Strategist",
            mandate: "Marketing produit et go-to-market de nouveaux logiciels sur un portefeuille de comptes\u00a0clés.",
            bullets: [
              "Supervision de 1,72\u00a0M$ de revenus annuels récurrents avec un NPS de 9,75, et 600\u00a0k$ d’upsell et de cross-sell ajoutés avec les directeurs\u00a0commerciaux.",
              "Direction des design sprints et de la stratégie go-to-market de nouveaux logiciels. Les decks commerciaux, investisseurs et analystes, je les ai construits\u00a0moi-\u2060même.",
            ],
          },
        ],
      },
      {
        org: "Greater Bentonville Area Chamber of\u00a0Commerce",
        when: "2020 – 2021",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Director of Marketing &\u00a0Communications",
            mandate: "Marque, RP, réseaux sociaux et e-mailing pour une chambre de commerce régionale en concurrence nationale pour les\u00a0talents.",
            bullets: [
              "Refonte de la marque pour permettre à la chambre de rivaliser à l’échelle nationale pour attirer télétravailleurs et entreprises en quête\u00a0d’implantation.",
              "Impressions sur les réseaux sociaux en hausse de 78\u00a0% en moins de six mois, sans aucune promotion\u00a0payante.",
            ],
          },
        ],
      },
      {
        org: "Intercut Productions",
        when: "2017 – 2020",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Chief of\u00a0Staff",
            mandate: "Gestion de comptes, création et production pour des clients du Fortune\u00a0500.",
            bullets: [
              "Recrutement et encadrement des photographes, chefs opérateurs, monteurs et designers, et pilotage des budgets et des feuilles de\u00a0route.",
              "J’ai aidé à fabriquer une émission de télévision nommée aux\u00a0Emmy.",
            ],
          },
        ],
      },
    ],
    capabilities: [
      { t: "Stratégie de marque et de\u00a0catégorie", b: "Positionnement de catégorie, messages, et le thought leadership des dirigeants qui les porte sur le\u00a0marché." },
      { t: "Programmes de\u00a0croissance", b: "Go-to-market multicanal en paid, organique, e-mail, social, événements et partenaires, avec l’attribution qui montre ce qui a\u00a0marché." },
      { t: "Recherche et croissance à l’ère de\u00a0l’IA", b: "Answer Engine Optimization et programmes de croissance intégrant l’IA pour le B2B grands\u00a0comptes." },
      {
        t: "Équipes et\u00a0budgets",
        b: "Entraîneur-joueur d’équipes transverses, responsable d’objectifs de chiffre d’affaires et d’un budget à huit chiffres, et de la communication de direction qui fait aboutir une\u00a0décision.",
      },
      { t: "Les mains dans le\u00a0cambouis", b: "Figma, Adobe Creative Suite et design sprints. Je construis encore moi-même les decks, les sites et les\u00a0supports." },
    ],
    education: {
      where: "Fayetteville, AR",
      school: "University of\u00a0Arkansas",
      degree: "B.S. in Business Administration, spécialités marketing et\u00a0économie",
      more: "Références, lettres de recommandation et certifications sur demande.\u00a0\u00a0",
      contact: "Me contacter\u00a0→",
    },
  },

  notFound: {
    tarotAlt: "Carte de tarot (404), Le Fantôme",
    eyebrow: "Erreur   ·   404",
    h1: ["Cette page ", "est invisible."],
    lede:
      "Ce qui, comme par hasard, est ce qui coûte le plus cher à une marque. La page que vous cherchiez a déménagé ou n’a jamais existé. Dans les deux cas, le meilleur est à un\u00a0clic.",
    home: "Retour à\u00a0l’accueil",
    work: "Voir les\u00a0projets",
  },
};
