// Système de statistiques de partie
export class StatisticsSystem {
    constructor(game) {
        this.game = game;
        this.stats = this.initializeStats();
    }

    initializeStats() {
        return {
            // Time stats
            sessionStartTime: Date.now(),
            totalPlayTime: 0, // milliseconds
            sessionsPlayed: 1,

            // Economic stats
            totalMoneyEarned: 0,
            totalMoneySpent: 0,
            highestWealth: 0,
            industriesBought: 0,

            // Decision stats
            totalDecisions: 0,
            moralDecisions: 0,
            immoralDecisions: 0,
            neutralDecisions: 0,

            // Achievement stats
            achievementsUnlocked: 0,
            achievementScore: 0,

            // Resource highs/lows
            lowestEnvironment: 100,
            highestEnvironment: 100,
            lowestMorality: 50,
            highestMorality: 50,
            highestInfluence: 10,
            highestIncome: 0,

            // Industry stats
            industriesUnlocked: 3, // Starting industries
            totalIndustriesOwned: 0,
            mostOwnedIndustry: null,
            mostOwnedIndustryCount: 0,

            // Events stats
            eventsTriggered: 0,
            positiveEvents: 0,
            negativeEvents: 0,
            neutralEvents: 0
        };
    }

    update(deltaTime) {
        // Update play time
        this.stats.totalPlayTime += deltaTime * 1000;

        // Track highest wealth
        const currentWealth = this.game.resources.get('wealth');
        if (currentWealth > this.stats.highestWealth) {
            this.stats.highestWealth = currentWealth;
        }

        // Track environment extremes
        const environment = this.game.resources.get('environment');
        if (environment < this.stats.lowestEnvironment) {
            this.stats.lowestEnvironment = environment;
        }
        if (environment > this.stats.highestEnvironment) {
            this.stats.highestEnvironment = environment;
        }

        // Track morality extremes
        const morality = this.game.resources.get('morality');
        if (morality < this.stats.lowestMorality) {
            this.stats.lowestMorality = morality;
        }
        if (morality > this.stats.highestMorality) {
            this.stats.highestMorality = morality;
        }

        // Track highest influence
        const influence = this.game.resources.get('influence');
        if (influence > this.stats.highestInfluence) {
            this.stats.highestInfluence = influence;
        }

        // Track highest income
        const income = this.game.resources.getIncome();
        if (income > this.stats.highestIncome) {
            this.stats.highestIncome = income;
        }

        // Update total industries owned
        let totalOwned = 0;
        let mostOwned = null;
        let mostOwnedCount = 0;

        for (const industry of Object.values(this.game.industries)) {
            totalOwned += industry.count;

            if (industry.count > mostOwnedCount) {
                mostOwnedCount = industry.count;
                mostOwned = industry.name;
            }
        }

        this.stats.totalIndustriesOwned = totalOwned;
        this.stats.mostOwnedIndustry = mostOwned;
        this.stats.mostOwnedIndustryCount = mostOwnedCount;

        // Update industries unlocked count
        this.stats.industriesUnlocked = Object.values(this.game.industries)
            .filter(i => i.unlocked).length;

        // Update achievements
        if (this.game.achievements) {
            this.stats.achievementsUnlocked = this.game.achievements.unlockedAchievements.size;
        }

        // Update decisions
        if (this.game.decisions) {
            this.stats.totalDecisions = this.game.decisions.decisionHistory.length;
        }
    }

    recordMoneyEarned(amount) {
        this.stats.totalMoneyEarned += amount;
    }

    recordMoneySpent(amount) {
        this.stats.totalMoneySpent += amount;
    }

    recordIndustryBought() {
        this.stats.industriesBought++;
    }

    recordDecision(type) {
        this.stats.totalDecisions++;

        if (type === 'moral') {
            this.stats.moralDecisions++;
        } else if (type === 'immoral') {
            this.stats.immoralDecisions++;
        } else {
            this.stats.neutralDecisions++;
        }
    }

    recordEventTriggered(type) {
        this.stats.eventsTriggered++;

        if (type === 'positive') {
            this.stats.positiveEvents++;
        } else if (type === 'negative') {
            this.stats.negativeEvents++;
        } else {
            this.stats.neutralEvents++;
        }
    }

    getPlayTimeFormatted() {
        const seconds = Math.floor(this.stats.totalPlayTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    getFormattedStats() {
        return {
            'Temps de jeu': this.getPlayTimeFormatted(),
            'Richesse maximale': this.game.resources.resources.wealth.format(this.stats.highestWealth),
            'Revenu maximum': `${this.game.resources.resources.wealth.format(this.stats.highestIncome)}/s`,
            'Industries possédées': this.stats.totalIndustriesOwned,
            'Industries débloquées': this.stats.industriesUnlocked,
            'Décisions prises': this.stats.totalDecisions,
            'Succès débloqués': this.stats.achievementsUnlocked,
            'Événements vus': this.stats.eventsTriggered,
            'Environnement minimum': `${Math.round(this.stats.lowestEnvironment)}%`,
            'Moralité minimum': `${Math.round(this.stats.lowestMorality)}%`,
            'Influence maximum': `${Math.round(this.stats.highestInfluence)}%`
        };
    }

    getScoreCalculation() {
        // Calculate overall score based on multiple factors
        const wealthScore = Math.min(1000, this.stats.highestWealth / 10000);
        const achievementScore = this.stats.achievementsUnlocked * 100;
        const decisionScore = this.stats.totalDecisions * 10;
        const industryScore = this.stats.industriesUnlocked * 50;
        const moralityBonus = this.stats.highestMorality > 70 ? 500 : 0;
        const environmentBonus = this.stats.lowestEnvironment > 50 ? 500 : 0;

        const totalScore = Math.floor(
            wealthScore + achievementScore + decisionScore +
            industryScore + moralityBonus + environmentBonus
        );

        return {
            total: totalScore,
            breakdown: {
                richesse: Math.floor(wealthScore),
                succès: achievementScore,
                décisions: decisionScore,
                industries: industryScore,
                moralité: moralityBonus,
                environnement: environmentBonus
            }
        };
    }

    getRank() {
        const score = this.getScoreCalculation().total;

        if (score >= 10000) return { rank: 'Légende Mondiale', icon: '👑' };
        if (score >= 5000) return { rank: 'Titan de l\'industrie', icon: '🏆' };
        if (score >= 2500) return { rank: 'Magnat Influent', icon: '💎' };
        if (score >= 1000) return { rank: 'Entrepreneur à succès', icon: '⭐' };
        if (score >= 500) return { rank: 'Patron prometteur', icon: '📈' };
        if (score >= 100) return { rank: 'Entrepreneur débutant', icon: '🌱' };
        return { rank: 'Novice', icon: '🎯' };
    }

    save() {
        return {
            stats: this.stats
        };
    }

    load(data) {
        if (data.stats) {
            Object.assign(this.stats, data.stats);
            this.stats.sessionsPlayed++;
        }
    }
}
