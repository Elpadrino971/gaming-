// Système de succès et achievements
export class AchievementSystem {
    constructor(game) {
        this.game = game;
        this.achievements = this.initializeAchievements();
        this.unlockedAchievements = new Set();
    }

    initializeAchievements() {
        return {
            // Wealth achievements
            firstThousand: {
                id: 'firstThousand',
                title: '💰 Petit entrepreneur',
                description: 'Atteindre $1,000',
                category: 'wealth',
                checkCondition: (game) => game.resources.get('wealth') >= 1000,
                reward: { influence: 2 }
            },
            millionaire: {
                id: 'millionaire',
                title: '💎 Millionnaire',
                description: 'Atteindre $1,000,000',
                category: 'wealth',
                checkCondition: (game) => game.resources.get('wealth') >= 1000000,
                reward: { influence: 10 }
            },
            billionaire: {
                id: 'billionaire',
                title: '👑 Milliardaire',
                description: 'Atteindre $1,000,000,000',
                category: 'wealth',
                checkCondition: (game) => game.resources.get('wealth') >= 1000000000,
                reward: { influence: 25 }
            },

            // Environmental achievements
            ecoWarrior: {
                id: 'ecoWarrior',
                title: '🌱 Guerrier écologiste',
                description: 'Maintenir l\'environnement à 90%+ pendant 5 minutes',
                category: 'environment',
                timeRequired: 300000, // 5 minutes
                currentTime: 0,
                checkCondition: (game) => game.resources.get('environment') >= 90,
                reward: { morality: 10, influence: 5 }
            },
            planetSaver: {
                id: 'planetSaver',
                title: '🌍 Sauveur de planète',
                description: 'Atteindre 100% d\'environnement après être tombé sous 30%',
                category: 'environment',
                metaData: { hitLowPoint: false },
                checkCondition: (game, achievement) => {
                    if (game.resources.get('environment') < 30) {
                        achievement.metaData.hitLowPoint = true;
                    }
                    return achievement.metaData.hitLowPoint &&
                           game.resources.get('environment') >= 100;
                },
                reward: { environment: 5, influence: 15 }
            },

            // Morality achievements
            saint: {
                id: 'saint',
                title: '😇 Saint',
                description: 'Atteindre 100% de moralité',
                category: 'morality',
                checkCondition: (game) => game.resources.get('morality') >= 100,
                reward: { stability: 10, influence: 10 }
            },
            villain: {
                id: 'villain',
                title: '😈 Vilain',
                description: 'Tomber à 0% de moralité',
                category: 'morality',
                checkCondition: (game) => game.resources.get('morality') <= 0,
                reward: { influence: 15 }
            },
            redeemed: {
                id: 'redeemed',
                title: '✨ Rédemption',
                description: 'Passer de 10% à 90% de moralité',
                category: 'morality',
                metaData: { hitLowPoint: false },
                checkCondition: (game, achievement) => {
                    if (game.resources.get('morality') <= 10) {
                        achievement.metaData.hitLowPoint = true;
                    }
                    return achievement.metaData.hitLowPoint &&
                           game.resources.get('morality') >= 90;
                },
                reward: { morality: 5, stability: 10 }
            },

            // Industry achievements
            industrialist: {
                id: 'industrialist',
                title: '🏭 Industriel',
                description: 'Posséder 10 industries différentes',
                category: 'industry',
                checkCondition: (game) => {
                    const owned = Object.values(game.industries).filter(i => i.count > 0);
                    return owned.length >= 10;
                },
                reward: { wealth: 50000, influence: 5 }
            },
            tycoon: {
                id: 'tycoon',
                title: '🎩 Magnat',
                description: 'Posséder toutes les industries',
                category: 'industry',
                checkCondition: (game) => {
                    const owned = Object.values(game.industries).filter(i => i.count > 0);
                    const total = Object.values(game.industries).filter(i => i.unlocked);
                    return owned.length === total.length && total.length >= 13;
                },
                reward: { wealth: 500000, influence: 20 }
            },
            massProduction: {
                id: 'massProduction',
                title: '⚙️ Production de masse',
                description: 'Avoir 100 industries au total',
                category: 'industry',
                checkCondition: (game) => {
                    const total = Object.values(game.industries)
                        .reduce((sum, i) => sum + i.count, 0);
                    return total >= 100;
                },
                reward: { wealth: 100000 }
            },

            // Decision achievements
            diplomat: {
                id: 'diplomat',
                title: '🤝 Diplomate',
                description: 'Prendre 10 décisions',
                category: 'decision',
                checkCondition: (game) => {
                    return game.decisions.decisionHistory.length >= 10;
                },
                reward: { influence: 5, morality: 5 }
            },
            strategist: {
                id: 'strategist',
                title: '🎯 Stratège',
                description: 'Prendre 50 décisions',
                category: 'decision',
                checkCondition: (game) => {
                    return game.decisions.decisionHistory.length >= 50;
                },
                reward: { influence: 15, morality: 10 }
            },

            // Special achievements
            balanced: {
                id: 'balanced',
                title: '⚖️ Équilibre parfait',
                description: 'Avoir toutes les métriques à 50% exactement',
                category: 'special',
                checkCondition: (game) => {
                    const metrics = ['environment', 'morality', 'influence', 'stability'];
                    return metrics.every(m => {
                        const val = game.resources.get(m);
                        return val >= 49 && val <= 51;
                    });
                },
                reward: { wealth: 250000, influence: 10 }
            },
            perfectEmpire: {
                id: 'perfectEmpire',
                title: '🏆 Empire parfait',
                description: 'Avoir toutes les métriques à 100%',
                category: 'special',
                checkCondition: (game) => {
                    const metrics = ['environment', 'morality', 'influence', 'stability'];
                    return metrics.every(m => game.resources.get(m) >= 100);
                },
                reward: { wealth: 1000000 }
            },
            chaosLord: {
                id: 'chaosLord',
                title: '🔥 Seigneur du chaos',
                description: 'Avoir stabilité à 0% mais richesse > $10M',
                category: 'special',
                checkCondition: (game) => {
                    return game.resources.get('stability') <= 0 &&
                           game.resources.get('wealth') >= 10000000;
                },
                reward: { influence: 20 }
            },

            // Time-based achievements
            dedicated: {
                id: 'dedicated',
                title: '⏰ Dévoué',
                description: 'Jouer pendant 30 minutes',
                category: 'time',
                timeRequired: 1800000, // 30 minutes
                currentTime: 0,
                checkCondition: () => true, // Always tracking
                reward: { wealth: 100000 }
            },
            veteran: {
                id: 'veteran',
                title: '🎖️ Vétéran',
                description: 'Jouer pendant 2 heures',
                category: 'time',
                timeRequired: 7200000, // 2 hours
                currentTime: 0,
                checkCondition: () => true,
                reward: { wealth: 500000, influence: 10 }
            },

            // Income achievements
            passiveIncome: {
                id: 'passiveIncome',
                title: '💸 Revenu passif',
                description: 'Atteindre $1,000/s de revenus',
                category: 'income',
                checkCondition: (game) => game.resources.getIncome() >= 1000,
                reward: { influence: 5 }
            },
            incomeEmpire: {
                id: 'incomeEmpire',
                title: '💰 Empire de revenus',
                description: 'Atteindre $10,000/s de revenus',
                category: 'income',
                checkCondition: (game) => game.resources.getIncome() >= 10000,
                reward: { influence: 15 }
            },

            // Profile achievements
            capitalistPure: {
                id: 'capitalistPure',
                title: '📈 Capitaliste pur',
                description: 'Être identifié comme Capitaliste pur',
                category: 'profile',
                checkCondition: (game) => {
                    return game.resources.getPlayerProfile() === 'Capitaliste pur';
                },
                reward: { wealth: 100000 }
            },
            ecoLeader: {
                id: 'ecoLeader',
                title: '🌿 Leader écologique',
                description: 'Être identifié comme Éco-leader',
                category: 'profile',
                checkCondition: (game) => {
                    return game.resources.getPlayerProfile() === 'Éco-leader';
                },
                reward: { environment: 10, morality: 10 }
            },
            mafioso: {
                id: 'mafioso',
                title: '🎭 Mafieux',
                description: 'Être identifié comme Mafieux',
                category: 'profile',
                checkCondition: (game) => {
                    return game.resources.getPlayerProfile() === 'Mafieux';
                },
                reward: { influence: 20 }
            }
        };
    }

    update(deltaTime) {
        for (const achievement of Object.values(this.achievements)) {
            // Skip already unlocked
            if (this.unlockedAchievements.has(achievement.id)) continue;

            // Update time-based achievements
            if (achievement.timeRequired) {
                if (achievement.checkCondition(this.game, achievement)) {
                    achievement.currentTime = (achievement.currentTime || 0) + deltaTime * 1000;

                    if (achievement.currentTime >= achievement.timeRequired) {
                        this.unlockAchievement(achievement);
                    }
                } else {
                    achievement.currentTime = 0; // Reset if condition not met
                }
            } else {
                // Regular achievements
                if (achievement.checkCondition(this.game, achievement)) {
                    this.unlockAchievement(achievement);
                }
            }
        }
    }

    unlockAchievement(achievement) {
        if (this.unlockedAchievements.has(achievement.id)) return;

        this.unlockedAchievements.add(achievement.id);

        // Apply rewards
        if (achievement.reward) {
            for (const [resource, amount] of Object.entries(achievement.reward)) {
                this.game.resources.add(resource, amount);
            }
        }

        // Notify player
        this.game.ui.showAchievement(achievement);

        console.log('🏆 Achievement unlocked:', achievement.title);
    }

    getProgress() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.unlockedAchievements.size;
        return {
            unlocked,
            total,
            percentage: (unlocked / total) * 100
        };
    }

    getAchievementsByCategory() {
        const categories = {};

        for (const achievement of Object.values(this.achievements)) {
            const category = achievement.category;
            if (!categories[category]) {
                categories[category] = {
                    achievements: [],
                    unlocked: 0,
                    total: 0
                };
            }

            categories[category].achievements.push(achievement);
            categories[category].total++;

            if (this.unlockedAchievements.has(achievement.id)) {
                categories[category].unlocked++;
            }
        }

        return categories;
    }

    save() {
        return {
            unlockedAchievements: Array.from(this.unlockedAchievements),
            achievementsMetaData: Object.entries(this.achievements)
                .filter(([_, achievement]) => achievement.metaData)
                .reduce((acc, [id, achievement]) => {
                    acc[id] = achievement.metaData;
                    return acc;
                }, {}),
            timers: Object.entries(this.achievements)
                .filter(([_, achievement]) => achievement.currentTime)
                .reduce((acc, [id, achievement]) => {
                    acc[id] = achievement.currentTime;
                    return acc;
                }, {})
        };
    }

    load(data) {
        if (data.unlockedAchievements) {
            this.unlockedAchievements = new Set(data.unlockedAchievements);
        }

        if (data.achievementsMetaData) {
            for (const [id, metaData] of Object.entries(data.achievementsMetaData)) {
                if (this.achievements[id]) {
                    this.achievements[id].metaData = metaData;
                }
            }
        }

        if (data.timers) {
            for (const [id, time] of Object.entries(data.timers)) {
                if (this.achievements[id]) {
                    this.achievements[id].currentTime = time;
                }
            }
        }
    }
}
