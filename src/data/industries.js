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
