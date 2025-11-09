// Données des industries disponibles
export const INDUSTRIES = {
    lemonade: {
        id: 'lemonade',
        name: 'Stand de limonade',
        description: 'Un humble début. Produit $2/s',
        icon: '🍋',
        baseCost: { wealth: 50 },
        baseIncome: 2,
        baseEnvironmentalImpact: -0.01,
        baseMoralityImpact: 0.1,
        costMultiplier: 1.15,
        unlocked: true,
        count: 0
    },

    bakery: {
        id: 'bakery',
        name: 'Boulangerie',
        description: 'Pain frais quotidien. Produit $10/s',
        icon: '🥖',
        baseCost: { wealth: 500 },
        baseIncome: 10,
        baseEnvironmentalImpact: -0.05,
        baseMoralityImpact: 0.2,
        costMultiplier: 1.15,
        unlocked: true,
        count: 0
    },

    farm: {
        id: 'farm',
        name: 'Ferme biologique',
        description: 'Agriculture durable. Produit $50/s',
        icon: '🌾',
        baseCost: { wealth: 5000 },
        baseIncome: 50,
        baseEnvironmentalImpact: 0.1,
        baseMoralityImpact: 0.5,
        costMultiplier: 1.2,
        unlocked: true,
        count: 0
    },

    factory: {
        id: 'factory',
        name: 'Usine textile',
        description: 'Production de masse. Produit $200/s',
        icon: '🏭',
        baseCost: { wealth: 25000 },
        baseIncome: 200,
        baseEnvironmentalImpact: -0.5,
        baseMoralityImpact: -0.2,
        costMultiplier: 1.25,
        requiresWealth: 10000,
        unlocked: false,
        count: 0
    },

    oilWell: {
        id: 'oilWell',
        name: 'Puits de pétrole',
        description: 'Énergie fossile. Produit $800/s',
        icon: '🛢️',
        baseCost: { wealth: 100000 },
        baseIncome: 800,
        baseEnvironmentalImpact: -2,
        baseMoralityImpact: -1,
        costMultiplier: 1.3,
        requiresWealth: 50000,
        unlocked: false,
        count: 0
    },

    solarFarm: {
        id: 'solarFarm',
        name: 'Ferme solaire',
        description: 'Énergie propre. Produit $400/s',
        icon: '☀️',
        baseCost: { wealth: 150000 },
        baseIncome: 400,
        baseEnvironmentalImpact: 1,
        baseMoralityImpact: 1.5,
        costMultiplier: 1.2,
        requiresWealth: 50000,
        unlocked: false,
        count: 0
    },

    techStartup: {
        id: 'techStartup',
        name: 'Startup Tech',
        description: 'Innovation numérique. Produit $1500/s',
        icon: '💻',
        baseCost: { wealth: 500000 },
        baseIncome: 1500,
        baseEnvironmentalImpact: -0.3,
        baseMoralityImpact: 0.5,
        costMultiplier: 1.25,
        requiresWealth: 200000,
        requiresInfluence: 20,
        unlocked: false,
        count: 0
    },

    casino: {
        id: 'casino',
        name: 'Casino',
        description: 'Divertissement... et addiction. Produit $3000/s',
        icon: '🎰',
        baseCost: { wealth: 1000000 },
        baseIncome: 3000,
        baseEnvironmentalImpact: -0.2,
        baseMoralityImpact: -2,
        costMultiplier: 1.3,
        requiresWealth: 500000,
        requiresInfluence: 30,
        unlocked: false,
        count: 0
    },

    bank: {
        id: 'bank',
        name: 'Banque',
        description: 'Finance mondiale. Produit $5000/s',
        icon: '🏦',
        baseCost: { wealth: 5000000 },
        baseIncome: 5000,
        baseEnvironmentalImpact: -0.1,
        baseMoralityImpact: -0.5,
        costMultiplier: 1.2,
        requiresWealth: 2000000,
        requiresInfluence: 40,
        unlocked: false,
        count: 0
    },

    armsDealer: {
        id: 'armsDealer',
        name: 'Commerce d\'armes',
        description: 'Contrats militaires. Produit $10000/s',
        icon: '⚔️',
        baseCost: { wealth: 10000000 },
        baseIncome: 10000,
        baseEnvironmentalImpact: -1,
        baseMoralityImpact: -5,
        costMultiplier: 1.35,
        requiresWealth: 5000000,
        requiresInfluence: 50,
        requiresMorality: -20, // Can only buy if morality is low enough
        unlocked: false,
        count: 0
    },

    pharmaceuticals: {
        id: 'pharmaceuticals',
        name: 'Laboratoire pharmaceutique',
        description: 'Santé et recherche. Produit $7000/s',
        icon: '💊',
        baseCost: { wealth: 8000000 },
        baseIncome: 7000,
        baseEnvironmentalImpact: -0.5,
        baseMoralityImpact: 2,
        costMultiplier: 1.25,
        requiresWealth: 3000000,
        requiresInfluence: 35,
        unlocked: false,
        count: 0
    },

    spaceProgram: {
        id: 'spaceProgram',
        name: 'Programme spatial',
        description: 'Exploration et tourisme spatial. Produit $20000/s',
        icon: '🚀',
        baseCost: { wealth: 50000000 },
        baseIncome: 20000,
        baseEnvironmentalImpact: -1.5,
        baseMoralityImpact: 1,
        costMultiplier: 1.4,
        requiresWealth: 20000000,
        requiresInfluence: 60,
        unlocked: false,
        count: 0
    },

    aiResearch: {
        id: 'aiResearch',
        name: 'Centre de recherche IA',
        description: 'Intelligence artificielle avancée. Produit $15000/s',
        icon: '🤖',
        baseCost: { wealth: 30000000 },
        baseIncome: 15000,
        baseEnvironmentalImpact: -0.8,
        baseMoralityImpact: 0,
        costMultiplier: 1.3,
        requiresWealth: 15000000,
        requiresInfluence: 55,
        unlocked: false,
        count: 0
    },

    // New industries - Extended content
    restaurant: {
        id: 'restaurant',
        name: 'Restaurant gastronomique',
        description: 'Cuisine raffinée. Produit $75/s',
        icon: '🍽️',
        baseCost: { wealth: 8000 },
        baseIncome: 75,
        baseEnvironmentalImpact: -0.15,
        baseMoralityImpact: 0.3,
        costMultiplier: 1.18,
        requiresWealth: 3000,
        unlocked: false,
        count: 0
    },

    miningOperation: {
        id: 'miningOperation',
        name: 'Exploitation minière',
        description: 'Extraction de ressources. Produit $500/s',
        icon: '⛏️',
        baseCost: { wealth: 75000 },
        baseIncome: 500,
        baseEnvironmentalImpact: -1.5,
        baseMoralityImpact: -0.5,
        costMultiplier: 1.28,
        requiresWealth: 30000,
        unlocked: false,
        count: 0
    },

    recyclePlant: {
        id: 'recyclePlant',
        name: 'Usine de recyclage',
        description: 'Transformation de déchets. Produit $300/s',
        icon: '♻️',
        baseCost: { wealth: 120000 },
        baseIncome: 300,
        baseEnvironmentalImpact: 1.5,
        baseMoralityImpact: 1.2,
        costMultiplier: 1.22,
        requiresWealth: 50000,
        unlocked: false,
        count: 0
    },

    windFarm: {
        id: 'windFarm',
        name: 'Parc éolien',
        description: 'Énergie renouvelable. Produit $600/s',
        icon: '💨',
        baseCost: { wealth: 200000 },
        baseIncome: 600,
        baseEnvironmentalImpact: 1.2,
        baseMoralityImpact: 1,
        costMultiplier: 1.23,
        requiresWealth: 80000,
        unlocked: false,
        count: 0
    },

    mediaEmpire: {
        id: 'mediaEmpire',
        name: 'Empire médiatique',
        description: 'Contrôle de l\'information. Produit $2500/s',
        icon: '📺',
        baseCost: { wealth: 2000000 },
        baseIncome: 2500,
        baseEnvironmentalImpact: -0.3,
        baseMoralityImpact: -1,
        costMultiplier: 1.28,
        requiresWealth: 800000,
        requiresInfluence: 35,
        unlocked: false,
        count: 0
    },

    hospital: {
        id: 'hospital',
        name: 'Hôpital privé',
        description: 'Soins de santé premium. Produit $4000/s',
        icon: '🏥',
        baseCost: { wealth: 6000000 },
        baseIncome: 4000,
        baseEnvironmentalImpact: -0.4,
        baseMoralityImpact: 3,
        costMultiplier: 1.24,
        requiresWealth: 2500000,
        requiresInfluence: 30,
        unlocked: false,
        count: 0
    },

    luxuryBrand: {
        id: 'luxuryBrand',
        name: 'Marque de luxe',
        description: 'Produits haut de gamme. Produit $8000/s',
        icon: '👜',
        baseCost: { wealth: 12000000 },
        baseIncome: 8000,
        baseEnvironmentalImpact: -1,
        baseMoralityImpact: -0.5,
        costMultiplier: 1.3,
        requiresWealth: 5000000,
        requiresInfluence: 45,
        unlocked: false,
        count: 0
    },

    realEstate: {
        id: 'realEstate',
        name: 'Empire immobilier',
        description: 'Investissement foncier. Produit $6000/s',
        icon: '🏢',
        baseCost: { wealth: 15000000 },
        baseIncome: 6000,
        baseEnvironmentalImpact: -0.8,
        baseMoralityImpact: -0.3,
        costMultiplier: 1.26,
        requiresWealth: 6000000,
        requiresInfluence: 40,
        unlocked: false,
        count: 0
    },

    cryptoMining: {
        id: 'cryptoMining',
        name: 'Minage de crypto',
        description: 'Ferme de cryptomonnaie. Produit $12000/s',
        icon: '₿',
        baseCost: { wealth: 20000000 },
        baseIncome: 12000,
        baseEnvironmentalImpact: -3,
        baseMoralityImpact: -0.8,
        costMultiplier: 1.35,
        requiresWealth: 10000000,
        requiresInfluence: 50,
        unlocked: false,
        count: 0
    },

    oceanCleanup: {
        id: 'oceanCleanup',
        name: 'Nettoyage des océans',
        description: 'Projet environnemental. Produit $3000/s',
        icon: '🌊',
        baseCost: { wealth: 25000000 },
        baseIncome: 3000,
        baseEnvironmentalImpact: 3,
        baseMoralityImpact: 5,
        costMultiplier: 1.2,
        requiresWealth: 12000000,
        requiresInfluence: 60,
        unlocked: false,
        count: 0
    },

    quantumComputing: {
        id: 'quantumComputing',
        name: 'Calcul quantique',
        description: 'Technologie de pointe. Produit $25000/s',
        icon: '⚛️',
        baseCost: { wealth: 80000000 },
        baseIncome: 25000,
        baseEnvironmentalImpact: -1.2,
        baseMoralityImpact: 1,
        costMultiplier: 1.32,
        requiresWealth: 40000000,
        requiresInfluence: 70,
        unlocked: false,
        count: 0
    },

    geneticsLab: {
        id: 'geneticsLab',
        name: 'Laboratoire génétique',
        description: 'Biotechnologie avancée. Produit $18000/s',
        icon: '🧬',
        baseCost: { wealth: 60000000 },
        baseIncome: 18000,
        baseEnvironmentalImpact: -0.6,
        baseMoralityImpact: -2,
        costMultiplier: 1.28,
        requiresWealth: 30000000,
        requiresInfluence: 65,
        unlocked: false,
        count: 0
    },

    fusionReactor: {
        id: 'fusionReactor',
        name: 'Réacteur à fusion',
        description: 'Énergie du futur. Produit $30000/s',
        icon: '⚡',
        baseCost: { wealth: 100000000 },
        baseIncome: 30000,
        baseEnvironmentalImpact: 2,
        baseMoralityImpact: 2,
        costMultiplier: 1.35,
        requiresWealth: 50000000,
        requiresInfluence: 75,
        unlocked: false,
        count: 0
    },

    martianColony: {
        id: 'martianColony',
        name: 'Colonie martienne',
        description: 'Expansion interplanétaire. Produit $50000/s',
        icon: '🔴',
        baseCost: { wealth: 500000000 },
        baseIncome: 50000,
        baseEnvironmentalImpact: 0,
        baseMoralityImpact: 3,
        costMultiplier: 1.5,
        requiresWealth: 200000000,
        requiresInfluence: 85,
        unlocked: false,
        count: 0
    },

    globalNetwork: {
        id: 'globalNetwork',
        name: 'Réseau global',
        description: 'Internet satellitaire mondial. Produit $40000/s',
        icon: '🛰️',
        baseCost: { wealth: 200000000 },
        baseIncome: 40000,
        baseEnvironmentalImpact: -1,
        baseMoralityImpact: 1.5,
        costMultiplier: 1.38,
        requiresWealth: 100000000,
        requiresInfluence: 80,
        unlocked: false,
        count: 0
    }
};

// Helper function to get current cost of an industry
export function getIndustryCost(industry) {
    const costs = {};
    for (const [resource, baseCost] of Object.entries(industry.baseCost)) {
        costs[resource] = Math.floor(baseCost * Math.pow(industry.costMultiplier, industry.count));
    }
    return costs;
}

// Check if an industry can be unlocked
export function checkUnlock(industry, resources) {
    if (industry.unlocked) return true;

    let canUnlock = true;

    if (industry.requiresWealth && resources.get('wealth') < industry.requiresWealth) {
        canUnlock = false;
    }

    if (industry.requiresInfluence && resources.get('influence') < industry.requiresInfluence) {
        canUnlock = false;
    }

    if (industry.requiresMorality !== undefined) {
        const morality = resources.get('morality');
        if (industry.requiresMorality < 0) {
            // Need LOW morality
            if (morality > 50 + industry.requiresMorality) {
                canUnlock = false;
            }
        } else {
            // Need HIGH morality
            if (morality < industry.requiresMorality) {
                canUnlock = false;
            }
        }
    }

    return canUnlock;
}

// Get total income from all industries
export function getTotalIncome(industries) {
    let total = 0;
    for (const industry of Object.values(industries)) {
        if (industry.count > 0) {
            total += industry.baseIncome * industry.count;
        }
    }
    return total;
}

// Get total environmental impact
export function getTotalEnvironmentalImpact(industries) {
    let total = 0;
    for (const industry of Object.values(industries)) {
        if (industry.count > 0) {
            total += industry.baseEnvironmentalImpact * industry.count;
        }
    }
    return total;
}
