// Moteur de décisions avec conséquences multidimensionnelles
export class DecisionSystem {
    constructor(game) {
        this.game = game;
        this.pendingDecision = null;
        this.decisionHistory = [];
    }

    // Présenter une décision au joueur
    presentDecision(event) {
        this.pendingDecision = event;
        return event;
    }

    // Exécuter un choix
    executeChoice(choice) {
        if (!this.pendingDecision) return;

        // Vérifier si le joueur peut payer le coût
        if (choice.cost) {
            const canAfford = this.game.resources.canAfford(choice.cost);
            if (!canAfford) {
                return {
                    success: false,
                    message: 'Tu n\'as pas les ressources nécessaires pour ce choix.'
                };
            }

            // Payer le coût
            this.game.resources.spend(choice.cost);
        }

        // Appliquer les effets
        if (choice.effects) {
            for (const [resource, amount] of Object.entries(choice.effects)) {
                this.game.resources.add(resource, amount);
            }
        }

        // Effet spécial si présent
        if (choice.specialEffect) {
            choice.specialEffect(this.game);
        }

        // Enregistrer la décision dans l'historique
        this.decisionHistory.push({
            event: this.pendingDecision.id || this.pendingDecision.title,
            choice: choice.text,
            timestamp: Date.now()
        });

        // Retourner le résultat
        const result = {
            success: true,
            outcome: choice.outcome,
            message: choice.outcome
        };

        this.pendingDecision = null;
        return result;
    }

    // Analyser les tendances de décisions du joueur
    getDecisionTendencies() {
        const tendencies = {
            capitalist: 0,
            ecological: 0,
            ethical: 0,
            corrupt: 0
        };

        // Analyser l'historique
        for (const decision of this.decisionHistory) {
            // Cette logique peut être enrichie avec des tags sur les choix
            if (decision.choice.includes('généreux') || decision.choice.includes('éthique')) {
                tendencies.ethical++;
            }
            if (decision.choice.includes('minimum') || decision.choice.includes('économiser')) {
                tendencies.capitalist++;
            }
            if (decision.choice.includes('noir') || decision.choice.includes('soudoyer')) {
                tendencies.corrupt++;
            }
            if (decision.choice.includes('écologique') || decision.choice.includes('nettoyage')) {
                tendencies.ecological++;
            }
        }

        return tendencies;
    }

    // Obtenir le profil dominant
    getDominantProfile() {
        const tendencies = this.getDecisionTendencies();
        const dominant = Object.entries(tendencies).reduce((a, b) =>
            a[1] > b[1] ? a : b
        );

        const profileMap = {
            capitalist: 'Capitaliste pur',
            ecological: 'Éco-leader',
            corrupt: 'Mafieux',
            ethical: 'Humaniste'
        };

        return profileMap[dominant[0]] || 'Entrepreneur';
    }

    // Sauvegarder
    save() {
        return {
            decisionHistory: this.decisionHistory,
            pendingDecision: this.pendingDecision
        };
    }

    // Charger
    load(data) {
        if (data.decisionHistory) {
            this.decisionHistory = data.decisionHistory;
        }
        if (data.pendingDecision) {
            this.pendingDecision = data.pendingDecision;
        }
    }
}
