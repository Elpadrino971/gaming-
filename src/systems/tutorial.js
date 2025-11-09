// Système de tutoriel interactif
export class TutorialSystem {
    constructor(game) {
        this.game = game;
        this.currentStep = 0;
        this.completed = false;
        this.active = false;

        this.steps = [
            {
                id: 'welcome',
                title: '👋 Bienvenue dans Life Empire !',
                message: 'Tu vas bâtir un empire économique. Mais attention : chaque décision a des conséquences sur l\'environnement, la moralité et la stabilité sociale.',
                target: null,
                highlight: '.dashboard',
                action: null
            },
            {
                id: 'resources',
                title: '📊 Comprendre les métriques',
                message: 'Tu gères 5 ressources : Richesse (argent), Environnement (pollution), Moralité (éthique), Influence (pouvoir) et Stabilité (paix sociale). Toutes sont importantes !',
                target: '.dashboard',
                highlight: '.metric-card',
                action: null
            },
            {
                id: 'profile',
                title: '🎭 Ton profil s\'adapte',
                message: 'Selon tes choix, tu deviendras Capitaliste pur, Éco-leader ou Mafieux. Ton profil évolue en temps réel !',
                target: '.profile-indicator',
                highlight: '.profile-indicator',
                action: null
            },
            {
                id: 'buyIndustry',
                title: '🏭 Acheter ta première industrie',
                message: 'Clique sur "Acheter" pour le Stand de limonade. Chaque industrie génère des revenus passifs mais a un impact sur tes autres métriques.',
                target: '.industry-list',
                highlight: '.industry-item:first-child',
                action: 'buyFirstIndustry',
                waitForAction: true
            },
            {
                id: 'income',
                title: '💰 Revenus passifs',
                message: 'Regarde ! Ton argent augmente automatiquement. C\'est le cœur du jeu idle/incremental.',
                target: '.metric-card.wealth',
                highlight: '.income-indicator',
                action: null
            },
            {
                id: 'buyMore',
                title: '📈 Expansion',
                message: 'Achète plus d\'industries pour augmenter tes revenus. Nouvelles industries se débloquent avec ta progression !',
                target: '.industry-list',
                highlight: '.industry-list',
                action: null
            },
            {
                id: 'events',
                title: '📰 Événements & Décisions',
                message: 'Des événements apparaîtront ici avec des choix à faire. Chaque décision a des conséquences multidimensionnelles !',
                target: '#eventFeed',
                highlight: '.panel:last-child',
                action: null
            },
            {
                id: 'achievements',
                title: '🏆 Succès à débloquer',
                message: 'Débloquer des achievements te donne des récompenses ! Clique sur l\'icône 🏆 en haut pour voir ta progression.',
                target: '.header-buttons',
                highlight: '.btn-achievements',
                action: null
            },
            {
                id: 'complete',
                title: '✅ Prêt à jouer !',
                message: 'Tu sais l\'essentiel ! Maintenant, bâtis ton empire comme tu le souhaites. Bonne chance !',
                target: null,
                highlight: null,
                action: 'completeTutorial'
            }
        ];
    }

    start() {
        if (this.completed) return;

        this.active = true;
        this.currentStep = 0;
        this.showCurrentStep();
    }

    showCurrentStep() {
        if (this.currentStep >= this.steps.length) {
            this.complete();
            return;
        }

        const step = this.steps[this.currentStep];

        // Remove previous highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });

        // Add highlight to target
        if (step.highlight) {
            const target = document.querySelector(step.highlight);
            if (target) {
                target.classList.add('tutorial-highlight');
            }
        }

        // Show tutorial message
        this.game.ui.showTutorialMessage(step);

        // Execute step action if any
        if (step.action && !step.waitForAction) {
            this.executeAction(step.action);
        }
    }

    nextStep() {
        const step = this.steps[this.currentStep];

        // Don't auto-advance if waiting for action
        if (step.waitForAction) {
            return;
        }

        this.currentStep++;
        this.showCurrentStep();
    }

    skipTutorial() {
        this.active = false;
        this.completed = true;
        this.cleanup();
        this.save();
    }

    complete() {
        this.active = false;
        this.completed = true;
        this.cleanup();
        this.save();

        this.game.ui.showMessage('Tutoriel terminé ! Bon jeu ! 🎮', 'positive');
    }

    cleanup() {
        // Remove all highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });

        // Close tutorial overlay
        const overlay = document.getElementById('tutorialOverlay');
        if (overlay) {
            overlay.remove();
        }
    }

    executeAction(action) {
        switch (action) {
            case 'completeTutorial':
                this.complete();
                break;
        }
    }

    // Called when player buys first industry
    onFirstIndustryBought() {
        const step = this.steps[this.currentStep];
        if (step && step.id === 'buyIndustry' && step.waitForAction) {
            setTimeout(() => {
                this.currentStep++;
                this.showCurrentStep();
            }, 1000);
        }
    }

    save() {
        return {
            completed: this.completed,
            currentStep: this.currentStep
        };
    }

    load(data) {
        if (data) {
            this.completed = data.completed || false;
            this.currentStep = data.currentStep || 0;
        }

        // Auto-start tutorial if not completed
        if (!this.completed) {
            setTimeout(() => this.start(), 500);
        }
    }
}
