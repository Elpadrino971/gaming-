// Événements et décisions du jeu
export const EVENTS = {
    // Événements de début de jeu
    firstEmployee: {
        id: 'firstEmployee',
        title: '👔 Premier employé',
        description: 'Ton entreprise grandit. Tu dois embaucher quelqu\'un. Quel salaire proposes-tu ?',
        type: 'neutral',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 2000 && !game.triggeredEvents.has('firstEmployee');
        },
        choices: [
            {
                text: 'Salaire généreux ($500)',
                cost: { wealth: 500 },
                effects: { morality: 5, stability: 3 },
                outcome: 'Ton employé est motivé et loyal.'
            },
            {
                text: 'Salaire minimum ($200)',
                cost: { wealth: 200 },
                effects: { morality: -2, stability: -1 },
                outcome: 'Ton employé fait le strict minimum.'
            },
            {
                text: 'Au noir ($100)',
                cost: { wealth: 100 },
                effects: { morality: -5, wealth: 50 },
                outcome: 'Tu économises, mais ta réputation en souffre.'
            }
        ]
    },

    environmentalCrisis: {
        id: 'environmentalCrisis',
        title: '🌍 Crise environnementale locale',
        description: 'Tes activités polluent la rivière locale. Les habitants protestent.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('environment') < 70 &&
                   game.resources.get('wealth') > 10000 &&
                   !game.triggeredEvents.has('environmentalCrisis');
        },
        choices: [
            {
                text: 'Investir dans le nettoyage ($5000)',
                cost: { wealth: 5000 },
                effects: { environment: 10, morality: 5, influence: 3 },
                outcome: 'Les habitants te remercient. Ta réputation s\'améliore.'
            },
            {
                text: 'Ignorer les protestations',
                cost: {},
                effects: { morality: -5, influence: -3, stability: -5 },
                outcome: 'Les manifestations s\'intensifient. Ton image en prend un coup.'
            },
            {
                text: 'Soudoyer les médias ($2000)',
                cost: { wealth: 2000 },
                effects: { morality: -8, influence: 5 },
                outcome: 'Le scandale est étouffé... pour l\'instant.'
            }
        ]
    },

    mediaScandal: {
        id: 'mediaScandal',
        title: '📰 Scandale médiatique',
        description: 'Un journaliste enquête sur tes pratiques douteuses.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('morality') < 40 &&
                   game.resources.get('wealth') > 50000 &&
                   !game.triggeredEvents.has('mediaScandal');
        },
        choices: [
            {
                text: 'Tout avouer publiquement',
                cost: {},
                effects: { morality: 10, wealth: -10000, stability: -5 },
                outcome: 'Ton honnêteté est saluée, mais tu perds des clients.'
            },
            {
                text: 'Contre-attaquer médiatiquement ($10000)',
                cost: { wealth: 10000 },
                effects: { influence: 5, morality: -3 },
                outcome: 'Tu noies le scandale sous ta propre narration.'
            },
            {
                text: 'Menacer le journaliste',
                cost: {},
                effects: { morality: -10, stability: -3 },
                outcome: 'Le journaliste recule... mais d\'autres prendront le relais.'
            }
        ]
    },

    governmentContract: {
        id: 'governmentContract',
        title: '🏛️ Contrat gouvernemental',
        description: 'Le gouvernement te propose un contrat lucratif... avec des zones grises éthiques.',
        type: 'neutral',
        triggerCondition: (game) => {
            return game.resources.get('influence') > 30 &&
                   game.resources.get('wealth') > 100000 &&
                   !game.triggeredEvents.has('governmentContract');
        },
        choices: [
            {
                text: 'Accepter sans poser de questions',
                cost: {},
                effects: { wealth: 50000, morality: -10, influence: 10 },
                outcome: 'L\'argent coule à flots. Tu préfères ne pas savoir d\'où il vient.'
            },
            {
                text: 'Négocier des clauses éthiques',
                cost: {},
                effects: { wealth: 25000, morality: 5, influence: 5 },
                outcome: 'Tu gagnes moins, mais tu dors mieux la nuit.'
            },
            {
                text: 'Refuser',
                cost: {},
                effects: { morality: 8, influence: -5 },
                outcome: 'Ton intégrité est intacte, mais tu perds de l\'influence politique.'
            }
        ]
    },

    workerStrike: {
        id: 'workerStrike',
        title: '✊ Grève des employés',
        description: 'Tes employés réclament de meilleures conditions de travail.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('stability') < 60 &&
                   game.resources.get('wealth') > 200000 &&
                   !game.triggeredEvents.has('workerStrike');
        },
        choices: [
            {
                text: 'Accepter leurs demandes ($30000)',
                cost: { wealth: 30000 },
                effects: { stability: 15, morality: 8, influence: -2 },
                outcome: 'Tes employés sont satisfaits et plus productifs.'
            },
            {
                text: 'Négocier un compromis ($15000)',
                cost: { wealth: 15000 },
                effects: { stability: 8, morality: 3 },
                outcome: 'Un compromis acceptable pour tous.'
            },
            {
                text: 'Licencier les meneurs',
                cost: {},
                effects: { stability: -10, morality: -10, wealth: 5000 },
                outcome: 'La grève s\'arrête... mais la tension monte.'
            }
        ]
    },

    innovationOpportunity: {
        id: 'innovationOpportunity',
        title: '💡 Opportunité d\'innovation',
        description: 'Un jeune chercheur te propose une technologie révolutionnaire mais risquée.',
        type: 'positive',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 500000 &&
                   game.resources.get('influence') > 40 &&
                   !game.triggeredEvents.has('innovationOpportunity');
        },
        choices: [
            {
                text: 'Investir massivement ($200000)',
                cost: { wealth: 200000 },
                effects: { influence: 10 },
                outcome: 'Pari risqué... le temps dira si c\'était judicieux.',
                specialEffect: (game) => {
                    // 50% chance de succès
                    if (Math.random() > 0.5) {
                        game.resources.add('wealth', 500000);
                        game.addEvent('Innovation réussie ! Tu gagnes $500K et deviens un visionnaire.', 'positive');
                    } else {
                        game.addEvent('L\'innovation a échoué. Tu perds ton investissement.', 'negative');
                    }
                }
            },
            {
                text: 'Investir prudemment ($50000)',
                cost: { wealth: 50000 },
                effects: { influence: 3 },
                outcome: 'Approche mesurée avec risques limités.'
            },
            {
                text: 'Voler l\'idée',
                cost: {},
                effects: { morality: -15, influence: 5 },
                outcome: 'Tu profites de l\'innovation... au prix de ton intégrité.'
            }
        ]
    },

    ecoMovement: {
        id: 'ecoMovement',
        title: '🌱 Mouvement écologiste',
        description: 'Un puissant mouvement écologiste cible tes industries polluantes.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('environment') < 50 &&
                   game.resources.get('influence') > 30 &&
                   !game.triggeredEvents.has('ecoMovement');
        },
        choices: [
            {
                text: 'Conversion écologique ($100000)',
                cost: { wealth: 100000 },
                effects: { environment: 20, morality: 10, influence: 5 },
                outcome: 'Tu deviens un leader de la transition verte.'
            },
            {
                text: 'Greenwashing ($20000)',
                cost: { wealth: 20000 },
                effects: { influence: 5, morality: -5 },
                outcome: 'Tu fais semblant d\'être vert... ça marche pour l\'instant.'
            },
            {
                text: 'Lobbying anti-écolo ($50000)',
                cost: { wealth: 50000 },
                effects: { morality: -15, influence: 10, environment: -5 },
                outcome: 'Tu combats le mouvement avec du lobbying agressif.'
            }
        ]
    },

    competitorSabotage: {
        id: 'competitorSabotage',
        title: '🎯 Guerre des concurrents',
        description: 'Un concurrent tente de te voler des parts de marché par des moyens douteux.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 1000000 &&
                   !game.triggeredEvents.has('competitorSabotage');
        },
        choices: [
            {
                text: 'Contre-attaque légale ($80000)',
                cost: { wealth: 80000 },
                effects: { morality: 5, influence: 3, stability: 2 },
                outcome: 'Tu défends ton empire par les voies légales.'
            },
            {
                text: 'Espionnage industriel ($40000)',
                cost: { wealth: 40000 },
                effects: { morality: -8, influence: 5 },
                outcome: 'Tu joues leur jeu... et tu gagnes.'
            },
            {
                text: 'Rachat hostile ($500000)',
                cost: { wealth: 500000 },
                effects: { influence: 15, morality: -3 },
                outcome: 'Tu élimines la concurrence en l\'avalant.'
            }
        ]
    },

    // New events - Extended content
    taxAudit: {
        id: 'taxAudit',
        title: '🔍 Contrôle fiscal',
        description: 'L\'administration fiscale audite tes comptes. As-tu été honnête ?',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 500000 &&
                   game.resources.get('morality') < 60 &&
                   !game.triggeredEvents.has('taxAudit');
        },
        choices: [
            {
                text: 'Tout déclarer honnêtement',
                cost: { wealth: 100000 },
                effects: { morality: 10, stability: 5 },
                outcome: 'Tu paies tes impôts. Ton image s\'améliore.'
            },
            {
                text: 'Optimisation fiscale agressive ($50000)',
                cost: { wealth: 50000 },
                effects: { morality: -5, influence: 3 },
                outcome: 'Tu exploites les failles légales. Risqué mais profitable.'
            },
            {
                text: 'Corruption des auditeurs ($30000)',
                cost: { wealth: 30000 },
                effects: { morality: -15, stability: -5 },
                outcome: 'Le contrôle se termine miraculeusement bien...'
            }
        ]
    },

    whistleblower: {
        id: 'whistleblower',
        title: '📢 Lanceur d\'alerte',
        description: 'Un employé menace de révéler tes pratiques secrètes à la presse.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('morality') < 30 &&
                   game.resources.get('wealth') > 2000000 &&
                   !game.triggeredEvents.has('whistleblower');
        },
        choices: [
            {
                text: 'Négocier un accord de confidentialité ($200000)',
                cost: { wealth: 200000 },
                effects: { morality: -5, stability: 2 },
                outcome: 'Le silence s\'achète... pour le moment.'
            },
            {
                text: 'Licencier et décrédibiliser',
                cost: {},
                effects: { morality: -10, stability: -8, influence: -5 },
                outcome: 'Tu le fais taire, mais d\'autres pourraient suivre.'
            },
            {
                text: 'Assumer et réformer ($500000)',
                cost: { wealth: 500000 },
                effects: { morality: 15, stability: 10 },
                outcome: 'Tu reconnais tes erreurs et changes tes pratiques.'
            }
        ]
    },

    climateProtests: {
        id: 'climateProtests',
        title: '🌍 Manifestations climatiques',
        description: 'Des milliers de militants bloquent tes installations pour protester contre ta pollution.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('environment') < 40 &&
                   game.resources.get('influence') > 40 &&
                   !game.triggeredEvents.has('climateProtests');
        },
        choices: [
            {
                text: 'Plan de transition verte ($1M)',
                cost: { wealth: 1000000 },
                effects: { environment: 15, morality: 10, stability: 8 },
                outcome: 'Tu annonces un plan de transition écologique ambitieux.'
            },
            {
                text: 'Répression policière',
                cost: {},
                effects: { morality: -15, stability: -10, environment: -5 },
                outcome: 'Tu brises le mouvement par la force. Ton image est ruinée.'
            },
            {
                text: 'Dialogue et compromis ($300000)',
                cost: { wealth: 300000 },
                effects: { environment: 8, morality: 5, stability: 5 },
                outcome: 'Tu négocies des compromis acceptables.'
            }
        ]
    },

    hackAttack: {
        id: 'hackAttack',
        title: '💻 Cyberattaque',
        description: 'Des hackers ont infiltré tes systèmes et menacent de tout publier.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 5000000 &&
                   !game.triggeredEvents.has('hackAttack');
        },
        choices: [
            {
                text: 'Payer la rançon ($500000)',
                cost: { wealth: 500000 },
                effects: { morality: -5, stability: -3 },
                outcome: 'Tu paies. Les données ne fuient pas... cette fois.'
            },
            {
                text: 'Refuser et renforcer la sécurité ($800000)',
                cost: { wealth: 800000 },
                effects: { morality: 5, stability: 5 },
                outcome: 'Tu refuses de céder au chantage et sécurises tout.'
            },
            {
                text: 'Contre-attaque cyber ($300000)',
                cost: { wealth: 300000 },
                effects: { morality: -8, influence: 5 },
                outcome: 'Tu engages des hackers pour riposter.'
            }
        ]
    },

    celebrityEndorsement: {
        id: 'celebrityEndorsement',
        title: '⭐ Soutien de célébrité',
        description: 'Une célébrité influente veut soutenir publiquement ton empire.',
        type: 'positive',
        triggerCondition: (game) => {
            return game.resources.get('influence') > 50 &&
                   game.resources.get('morality') > 60 &&
                   !game.triggeredEvents.has('celebrityEndorsement');
        },
        choices: [
            {
                text: 'Accepter gracieusement',
                cost: {},
                effects: { influence: 10, wealth: 250000 },
                outcome: 'Le soutien de la star booste ton image et tes ventes.'
            },
            {
                text: 'Partenariat payant ($500000)',
                cost: { wealth: 500000 },
                effects: { influence: 20, wealth: 800000 },
                outcome: 'Investissement massif qui rapporte gros.'
            },
            {
                text: 'Refuser poliment',
                cost: {},
                effects: { morality: 5 },
                outcome: 'Ton humilité est remarquée.'
            }
        ]
    },

    naturalDisaster: {
        id: 'naturalDisaster',
        title: '🌪️ Catastrophe naturelle',
        description: 'Un ouragan dévaste une région où tu as des installations.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 3000000 &&
                   !game.triggeredEvents.has('naturalDisaster');
        },
        choices: [
            {
                text: 'Aide d\'urgence massive ($1M)',
                cost: { wealth: 1000000 },
                effects: { morality: 15, influence: 10, stability: 8 },
                outcome: 'Ta générosité fait la une. Tu es un héros.'
            },
            {
                text: 'Aide minimale ($200000)',
                cost: { wealth: 200000 },
                effects: { morality: 2, stability: 1 },
                outcome: 'Tu fais le minimum requis.'
            },
            {
                text: 'Profiter pour reconstruire en mieux ($2M)',
                cost: { wealth: 2000000 },
                effects: { wealth: 500000, environment: 10, morality: 8 },
                outcome: 'Tu reconstruis écologiquement et profits des subventions.'
            }
        ]
    },

    blackmail: {
        id: 'blackmail',
        title: '📸 Chantage',
        description: 'Quelqu\'un possède des informations compromettantes sur toi.',
        type: 'negative',
        triggerCondition: (game) => {
            return game.resources.get('morality') < 40 &&
                   game.resources.get('wealth') > 10000000 &&
                   !game.triggeredEvents.has('blackmail');
        },
        choices: [
            {
                text: 'Payer le silence ($2M)',
                cost: { wealth: 2000000 },
                effects: { morality: -5, stability: -2 },
                outcome: 'Tu paies. Le chantage pourrait recommencer.'
            },
            {
                text: 'Tout révéler toi-même',
                cost: {},
                effects: { morality: 10, influence: -10, stability: -5 },
                outcome: 'Tu prends les devants. C\'est douloureux mais libérateur.'
            },
            {
                text: 'Éliminer le problème ($500000)',
                cost: { wealth: 500000 },
                effects: { morality: -20, stability: 5 },
                outcome: 'Le maître chanteur "disparaît" mystérieusement.'
            }
        ]
    },

    investorInterest: {
        id: 'investorInterest',
        title: '💼 Investisseurs intéressés',
        description: 'Un grand fonds d\'investissement veut entrer dans ton capital.',
        type: 'positive',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 5000000 &&
                   game.resources.get('influence') > 45 &&
                   !game.triggeredEvents.has('investorInterest');
        },
        choices: [
            {
                text: 'Accepter ($5M d\'injection)',
                cost: {},
                effects: { wealth: 5000000, influence: 10, morality: -3 },
                outcome: 'Tu gagnes de l\'argent mais perds de l\'indépendance.'
            },
            {
                text: 'Refuser et rester indépendant',
                cost: {},
                effects: { morality: 5, influence: -2 },
                outcome: 'Tu gardes le contrôle total de ton empire.'
            },
            {
                text: 'Négocier des termes favorables',
                cost: {},
                effects: { wealth: 3000000, influence: 8 },
                outcome: 'Bon compromis entre argent et contrôle.'
            }
        ]
    },

    unionFormation: {
        id: 'unionFormation',
        title: '✊ Formation de syndicat',
        description: 'Tes employés veulent former un syndicat pour défendre leurs droits.',
        type: 'neutral',
        triggerCondition: (game) => {
            return game.resources.get('stability') < 70 &&
                   game.resources.get('wealth') > 1000000 &&
                   !game.triggeredEvents.has('unionFormation');
        },
        choices: [
            {
                text: 'Soutenir la formation',
                cost: {},
                effects: { morality: 10, stability: 15, wealth: -50000 },
                outcome: 'Tu gagnes le respect mais acceptes des coûts plus élevés.'
            },
            {
                text: 'Négocier des compromis',
                cost: {},
                effects: { morality: 3, stability: 8 },
                outcome: 'Compromis acceptable pour tous.'
            },
            {
                text: 'Combattre la syndicalisation',
                cost: { wealth: 100000 },
                effects: { morality: -10, stability: -10, influence: 5 },
                outcome: 'Tu brises le mouvement mais créés du ressentiment.'
            }
        ]
    },

    technologyBreakthrough: {
        id: 'technologyBreakthrough',
        title: '🔬 Percée technologique',
        description: 'Ton équipe R&D a fait une découverte révolutionnaire !',
        type: 'positive',
        triggerCondition: (game) => {
            return game.resources.get('wealth') > 10000000 &&
                   game.resources.get('influence') > 55 &&
                   !game.triggeredEvents.has('technologyBreakthrough');
        },
        choices: [
            {
                text: 'Breveter et commercialiser',
                cost: {},
                effects: { wealth: 5000000, influence: 15, morality: -2 },
                outcome: 'Tu monopolises la technologie et fais fortune.'
            },
            {
                text: 'Open source pour tous',
                cost: {},
                effects: { morality: 20, influence: 25, environment: 10 },
                outcome: 'Tu changes le monde. Ton nom entre dans l\'histoire.'
            },
            {
                text: 'Vendre aux enchères ($10M)',
                cost: {},
                effects: { wealth: 10000000, morality: -5 },
                outcome: 'Tu vends au plus offrant.'
            }
        ]
    }
};

// Événements automatiques basés sur les métriques
export function generateDynamicEvent(game) {
    const wealth = game.resources.get('wealth');
    const environment = game.resources.get('environment');
    const morality = game.resources.get('morality');
    const influence = game.resources.get('influence');
    const stability = game.resources.get('stability');

    // Événement catastrophe environnementale
    if (environment < 20 && Math.random() < 0.1) {
        return {
            title: '⚠️ Catastrophe environnementale',
            description: 'Tes industries ont détruit l\'écosystème local. Les conséquences sont graves.',
            type: 'negative',
            autoEffect: () => {
                game.resources.add('wealth', -wealth * 0.1);
                game.resources.add('morality', -15);
                game.resources.add('stability', -20);
                game.addEvent('Catastrophe ! Tu perds 10% de ta richesse et ta réputation s\'effondre.', 'negative');
            }
        };
    }

    // Événement révolte sociale
    if (stability < 30 && Math.random() < 0.1) {
        return {
            title: '🔥 Révolte sociale',
            description: 'L\'instabilité sociale atteint un point critique. Tes affaires sont attaquées.',
            type: 'negative',
            autoEffect: () => {
                game.resources.add('wealth', -wealth * 0.05);
                game.resources.add('stability', -10);
                game.addEvent('Émeutes ! Tes installations sont vandalisées.', 'negative');
            }
        };
    }

    // Événement prix d'excellence
    if (morality > 80 && environment > 70 && Math.random() < 0.05) {
        return {
            title: '🏆 Prix d\'excellence',
            description: 'Ton empire éthique et durable est reconnu mondialement !',
            type: 'positive',
            autoEffect: () => {
                game.resources.add('influence', 10);
                game.resources.add('wealth', 50000);
                game.addEvent('Tu reçois un prix international ! +$50K et +10 influence.', 'positive');
            }
        };
    }

    return null;
}
