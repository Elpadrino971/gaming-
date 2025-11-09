// Moteur de jeu principal
import { ResourceSystem } from '../systems/resources.js';
import { DecisionSystem } from '../systems/decisions.js';
import { AchievementSystem } from '../systems/achievements.js';
import { StatisticsSystem } from '../systems/statistics.js';
import { UIManager } from '../ui/dashboard.js';
import { INDUSTRIES, getIndustryCost, checkUnlock, getTotalIncome, getTotalEnvironmentalImpact } from '../data/industries.js';
import { EVENTS, generateDynamicEvent } from '../data/events.js';

class GameEngine {
    constructor() {
        this.resources = new ResourceSystem();
        this.decisions = new DecisionSystem(this);
        this.achievements = new AchievementSystem(this);
        this.statistics = new StatisticsSystem(this);
        this.industries = JSON.parse(JSON.stringify(INDUSTRIES)); // Deep copy
        this.events = EVENTS;
        this.triggeredEvents = new Set();

        this.ui = null;
        this.lastUpdate = Date.now();
        this.tickRate = 100; // Update every 100ms
        this.eventCheckInterval = 5000; // Check for events every 5 seconds
        this.lastEventCheck = Date.now();

        this.isRunning = false;
        this.saveInterval = 30000; // Auto-save every 30 seconds
        this.lastSave = Date.now();
    }

    init() {
        console.log('🎮 Life Empire - Initializing...');

        // Try to load saved game
        const loaded = this.load();
        if (loaded) {
            console.log('💾 Game loaded from save');
        } else {
            console.log('🆕 New game started');
        }

        // Initialize UI
        this.ui = new UIManager(this);
        this.ui.update();

        // Start game loop
        this.start();

        console.log('✅ Life Empire - Ready!');
    }

    start() {
        this.isRunning = true;
        this.gameLoop();
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop() {
        if (!this.isRunning) return;

        const now = Date.now();
        const deltaTime = (now - this.lastUpdate) / 1000; // Convert to seconds
        this.lastUpdate = now;

        // Update game systems
        this.update(deltaTime);

        // Check for events
        if (now - this.lastEventCheck > this.eventCheckInterval) {
            this.checkForEvents();
            this.lastEventCheck = now;
        }

        // Auto-save
        if (now - this.lastSave > this.saveInterval) {
            this.save();
            this.lastSave = now;
        }

        // Update UI
        this.ui.update();

        // Schedule next frame
        setTimeout(() => this.gameLoop(), this.tickRate);
    }

    update(deltaTime) {
        // Update resources
        this.resources.update(deltaTime);

        // Check for industry unlocks
        this.checkUnlocks();

        // Update total income from industries
        const totalIncome = getTotalIncome(this.industries);
        this.resources.setIncome(totalIncome);

        // Update environmental decay from industries
        const totalEnvironmentalImpact = getTotalEnvironmentalImpact(this.industries);
        this.resources.setEnvironmentalDecay(-totalEnvironmentalImpact);

        // Update achievements
        this.achievements.update(deltaTime);

        // Update statistics
        this.statistics.update(deltaTime);
    }

    checkForEvents() {
        // Check trigger conditions for all events
        for (const event of Object.values(this.events)) {
            if (event.triggerCondition && event.triggerCondition(this)) {
                this.triggerEvent(event);
                this.triggeredEvents.add(event.id);
                break; // Only trigger one event at a time
            }
        }

        // Check for dynamic events
        const dynamicEvent = generateDynamicEvent(this);
        if (dynamicEvent) {
            if (dynamicEvent.autoEffect) {
                dynamicEvent.autoEffect();
            } else {
                this.triggerEvent(dynamicEvent);
            }
        }
    }

    triggerEvent(event) {
        console.log('🎲 Event triggered:', event.title);

        // Record event stats
        this.statistics.recordEventTriggered(event.type);

        if (event.choices) {
            // Decision event
            this.decisions.presentDecision(event);
            this.ui.showDecision(event);
        } else {
            // Info event
            this.ui.showMessage(event.description, event.type);
        }
    }

    addEvent(message, type = 'neutral') {
        this.ui.showMessage(message, type);
    }

    buyIndustry(industryId) {
        const industry = this.industries[industryId];
        if (!industry || !industry.unlocked) {
            console.log('❌ Industry not available:', industryId);
            return false;
        }

        const cost = getIndustryCost(industry);

        if (!this.resources.canAfford(cost)) {
            this.ui.showMessage('Pas assez de ressources pour acheter cette industrie.', 'negative');
            return false;
        }

        // Purchase
        this.resources.spend(cost);
        industry.count++;

        // Apply immediate effects
        if (industry.baseMoralityImpact !== 0) {
            this.resources.add('morality', industry.baseMoralityImpact);
        }

        // Record stats
        this.statistics.recordIndustryBought();
        this.statistics.recordMoneySpent(cost.wealth || 0);

        // Add notification
        this.ui.showMessage(
            `${industry.icon} ${industry.name} achetée ! Revenue: +${industry.baseIncome}/s`,
            'positive'
        );

        console.log('✅ Purchased:', industry.name);
        return true;
    }

    getIndustryCost(industry) {
        return getIndustryCost(industry);
    }

    checkUnlocks() {
        for (const industry of Object.values(this.industries)) {
            if (!industry.unlocked) {
                const canUnlock = checkUnlock(industry, this.resources);
                if (canUnlock) {
                    industry.unlocked = true;
                    this.ui.showMessage(
                        `🔓 Nouvelle industrie disponible: ${industry.name}`,
                        'positive'
                    );
                    console.log('🔓 Unlocked:', industry.name);
                }
            }
        }
    }

    save() {
        const saveData = {
            resources: this.resources.save(),
            industries: {},
            decisions: this.decisions.save(),
            achievements: this.achievements.save(),
            statistics: this.statistics.save(),
            triggeredEvents: Array.from(this.triggeredEvents),
            timestamp: Date.now()
        };

        // Save industries state
        for (const [id, industry] of Object.entries(this.industries)) {
            saveData.industries[id] = {
                count: industry.count,
                unlocked: industry.unlocked
            };
        }

        localStorage.setItem('lifeEmpire_save', JSON.stringify(saveData));
        console.log('💾 Game saved');
        return true;
    }

    load() {
        const saveData = localStorage.getItem('lifeEmpire_save');
        if (!saveData) return false;

        try {
            const data = JSON.parse(saveData);

            // Load resources
            if (data.resources) {
                this.resources.load(data.resources);
            }

            // Load industries
            if (data.industries) {
                for (const [id, savedIndustry] of Object.entries(data.industries)) {
                    if (this.industries[id]) {
                        this.industries[id].count = savedIndustry.count;
                        this.industries[id].unlocked = savedIndustry.unlocked;
                    }
                }
            }

            // Load decisions
            if (data.decisions) {
                this.decisions.load(data.decisions);
            }

            // Load achievements
            if (data.achievements) {
                this.achievements.load(data.achievements);
            }

            // Load statistics
            if (data.statistics) {
                this.statistics.load(data.statistics);
            }

            // Load triggered events
            if (data.triggeredEvents) {
                this.triggeredEvents = new Set(data.triggeredEvents);
            }

            console.log('💾 Loaded save from:', new Date(data.timestamp));
            return true;
        } catch (e) {
            console.error('❌ Failed to load save:', e);
            return false;
        }
    }

    reset() {
        if (confirm('Es-tu sûr de vouloir recommencer ? Toute progression sera perdue.')) {
            localStorage.removeItem('lifeEmpire_save');
            localStorage.removeItem('lifeEmpire_resources');
            location.reload();
        }
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
    window.game.init();

    // Add reset button to console
    console.log('💡 Pour recommencer: game.reset()');
    console.log('💾 Pour sauvegarder: game.save()');
    console.log('🎮 Pour arrêter: game.stop()');
    console.log('▶️ Pour démarrer: game.start()');
});

export default GameEngine;
