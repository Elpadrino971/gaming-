// Système de ressources multidimensionnelles
export class ResourceSystem {
    constructor() {
        this.resources = {
            wealth: {
                value: 1000,
                max: 1000000000,
                income: 0,
                label: 'Richesse',
                icon: '💰',
                format: this.formatMoney
            },
            environment: {
                value: 100,
                max: 100,
                min: 0,
                decay: 0,
                label: 'Environnement',
                icon: '🌍',
                format: (v) => `${Math.round(v)}%`
            },
            morality: {
                value: 50,
                max: 100,
                min: 0,
                drift: 0,
                label: 'Moralité',
                icon: '⚖️',
                format: (v) => `${Math.round(v)}%`
            },
            influence: {
                value: 10,
                max: 100,
                min: 0,
                growth: 0,
                label: 'Influence',
                icon: '📢',
                format: (v) => `${Math.round(v)}%`
            },
            stability: {
                value: 100,
                max: 100,
                min: 0,
                volatility: 0,
                label: 'Stabilité',
                icon: '🏛️',
                format: (v) => `${Math.round(v)}%`
            }
        };

        this.multipliers = {
            wealth: 1,
            environment: 1,
            morality: 1,
            influence: 1,
            stability: 1
        };
    }

    formatMoney(value) {
        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
        return `$${Math.round(value)}`;
    }

    get(resourceName) {
        return this.resources[resourceName]?.value || 0;
    }

    set(resourceName, value) {
        const resource = this.resources[resourceName];
        if (!resource) return;

        resource.value = Math.max(
            resource.min || 0,
            Math.min(resource.max, value)
        );
    }

    add(resourceName, amount) {
        const currentValue = this.get(resourceName);
        this.set(resourceName, currentValue + amount);
    }

    canAfford(costs) {
        for (const [resource, cost] of Object.entries(costs)) {
            if (this.get(resource) < cost) return false;
        }
        return true;
    }

    spend(costs) {
        if (!this.canAfford(costs)) return false;

        for (const [resource, cost] of Object.entries(costs)) {
            this.add(resource, -cost);
        }
        return true;
    }

    update(deltaTime) {
        // Update wealth based on income
        if (this.resources.wealth.income > 0) {
            this.add('wealth', this.resources.wealth.income * deltaTime * this.multipliers.wealth);
        }

        // Environmental decay
        if (this.resources.environment.decay > 0) {
            this.add('environment', -this.resources.environment.decay * deltaTime);
        }

        // Morality drift (towards neutral over time)
        const moralityDrift = (50 - this.get('morality')) * 0.001 * deltaTime;
        this.add('morality', moralityDrift);

        // Influence growth
        if (this.resources.influence.growth > 0) {
            this.add('influence', this.resources.influence.growth * deltaTime);
        }

        // Stability is affected by morality and environment
        const targetStability = (this.get('morality') + this.get('environment')) / 2;
        const stabilityChange = (targetStability - this.get('stability')) * 0.01 * deltaTime;
        this.add('stability', stabilityChange);
    }

    setIncome(amount) {
        this.resources.wealth.income = amount;
    }

    addIncome(amount) {
        this.resources.wealth.income += amount;
    }

    getIncome() {
        return this.resources.wealth.income;
    }

    setEnvironmentalDecay(rate) {
        this.resources.environment.decay = rate;
    }

    addEnvironmentalDecay(rate) {
        this.resources.environment.decay += rate;
    }

    // Calculate player's current profile based on actions
    getPlayerProfile() {
        const wealth = this.get('wealth');
        const environment = this.get('environment');
        const morality = this.get('morality');
        const influence = this.get('influence');

        // Profile scoring
        const capitalistScore = (wealth / 100000) + (100 - environment) + (influence);
        const ecoScore = environment + morality + (100 - influence);
        const mafiaScore = (wealth / 50000) + (100 - morality) + (100 - environment) + influence;

        const scores = {
            'Capitaliste pur': capitalistScore,
            'Éco-leader': ecoScore,
            'Mafieux': mafiaScore
        };

        // Early game default
        if (wealth < 5000) {
            return 'Entrepreneur';
        }

        // Return dominant profile
        return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    // Get all resources for display
    getAll() {
        return Object.entries(this.resources).map(([name, resource]) => ({
            name,
            ...resource,
            percentage: ((resource.value - (resource.min || 0)) / (resource.max - (resource.min || 0))) * 100
        }));
    }

    // Save to localStorage
    save() {
        const saveData = {
            resources: {},
            multipliers: this.multipliers
        };

        for (const [name, resource] of Object.entries(this.resources)) {
            saveData.resources[name] = {
                value: resource.value,
                income: resource.income,
                decay: resource.decay,
                growth: resource.growth,
                drift: resource.drift,
                volatility: resource.volatility
            };
        }

        localStorage.setItem('lifeEmpire_resources', JSON.stringify(saveData));
    }

    // Load from localStorage
    load() {
        const saveData = localStorage.getItem('lifeEmpire_resources');
        if (!saveData) return false;

        try {
            const data = JSON.parse(saveData);

            for (const [name, savedResource] of Object.entries(data.resources)) {
                if (this.resources[name]) {
                    Object.assign(this.resources[name], savedResource);
                }
            }

            if (data.multipliers) {
                this.multipliers = data.multipliers;
            }

            return true;
        } catch (e) {
            console.error('Failed to load resources:', e);
            return false;
        }
    }
}
