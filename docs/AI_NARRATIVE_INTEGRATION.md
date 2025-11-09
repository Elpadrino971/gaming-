# 🤖 Intégration de l'IA Narrative

## Vue d'ensemble

Le système d'IA narrative de Life Empire génère dynamiquement des événements et des histoires basées sur les actions du joueur, créant une expérience unique pour chaque partie.

## Architecture

### 1. Système d'événements actuel (v0.1)

Le prototype actuel utilise un système d'événements **prédéfinis** avec conditions de déclenchement dynamiques :

```javascript
// Événement déclenché quand le joueur atteint certains seuils
environmentalCrisis: {
    triggerCondition: (game) => {
        return game.resources.get('environment') < 70 &&
               game.resources.get('wealth') > 10000 &&
               !game.triggeredEvents.has('environmentalCrisis');
    }
}
```

### 2. Intégration future de l'IA générative (v0.2+)

L'intégration de GPT permettra de générer des événements **uniques et contextuels**.

## Plan d'intégration GPT

### Phase 1 : Configuration API

```javascript
// src/ai/narrative-engine.js
export class NarrativeAIEngine {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-4';
    }

    async generateEvent(context) {
        const prompt = this.buildPrompt(context);
        const response = await this.callGPT(prompt);
        return this.parseEventResponse(response);
    }
}
```

### Phase 2 : Génération de contexte

Le système transmet l'état actuel du jeu à l'IA :

```javascript
buildPrompt(context) {
    return `
Tu es le narrateur d'un jeu de gestion d'empire appelé "Life Empire".

État actuel du joueur:
- Richesse: ${context.wealth}
- Impact environnemental: ${context.environment}%
- Moralité: ${context.morality}%
- Influence: ${context.influence}%
- Profil: ${context.profile}

Industries possédées:
${context.industries.map(i => `- ${i.name} (x${i.count})`).join('\n')}

Décisions récentes:
${context.recentDecisions.map(d => `- ${d}`).join('\n')}

Génère un événement immersif et cohérent avec l'historique du joueur.
L'événement doit:
1. Avoir un titre court et percutant
2. Une description de 2-3 phrases
3. 2-3 choix possibles avec des conséquences claires

Format JSON:
{
    "title": "...",
    "description": "...",
    "type": "positive|negative|neutral",
    "choices": [
        {
            "text": "...",
            "effects": {
                "wealth": 0,
                "environment": 0,
                "morality": 0,
                "influence": 0,
                "stability": 0
            },
            "outcome": "..."
        }
    ]
}
`;
}
```

### Phase 3 : Détection de contradictions

L'IA peut confronter le joueur à ses contradictions :

```javascript
detectContradictions(player) {
    // Exemple : Joueur se dit écolo mais possède des puits de pétrole
    if (player.profile === 'Éco-leader' && player.hasIndustry('oilWell')) {
        return {
            type: 'contradiction',
            message: 'Les médias pointent du doigt ton hypocrisie...'
        };
    }
}
```

### Phase 4 : Arcs narratifs adaptatifs

L'IA peut créer des **arcs narratifs sur plusieurs événements** :

```javascript
class StoryArc {
    constructor(theme, duration) {
        this.theme = theme; // 'environmental_crisis', 'political_rise', 'scandal'
        this.duration = duration; // Nombre d'événements
        this.currentStep = 0;
        this.history = [];
    }

    async generateNextEvent(game) {
        const context = {
            arc: this.theme,
            step: this.currentStep,
            history: this.history,
            gameState: game.getState()
        };

        const event = await narrativeAI.generateEvent(context);
        this.history.push(event);
        this.currentStep++;

        return event;
    }
}
```

## Exemples d'utilisation

### Événement généré par IA - Capitaliste

```json
{
    "title": "🏦 Scandale bancaire de ton empire",
    "description": "Tes pratiques financières douteuses ont été révélées par un lanceur d'alerte. La presse internationale s'enflamme.",
    "type": "negative",
    "choices": [
        {
            "text": "Lancer une contre-enquête ($50K)",
            "effects": {
                "wealth": -50000,
                "influence": 5,
                "morality": -5
            },
            "outcome": "Tu noies le scandale sous ta propre narration médiatique."
        },
        {
            "text": "Accepter ta responsabilité publiquement",
            "effects": {
                "wealth": -100000,
                "morality": 10,
                "stability": -5
            },
            "outcome": "Ton honnêteté surprend. Tu perds de l'argent mais gagnes du respect."
        }
    ]
}
```

### Événement généré par IA - Éco-leader

```json
{
    "title": "🌍 Prix Nobel de l'environnement",
    "description": "Tes efforts pour un capitalisme durable sont reconnus mondialement. Tu es nominé pour le prix Nobel de la paix.",
    "type": "positive",
    "choices": [
        {
            "text": "Accepter et faire un discours mondial",
            "effects": {
                "influence": 20,
                "morality": 10,
                "wealth": 100000
            },
            "outcome": "Tu deviens l'icône mondiale du capitalisme éthique."
        },
        {
            "text": "Refuser avec humilité",
            "effects": {
                "morality": 5,
                "influence": -5
            },
            "outcome": "Ton humilité renforce ton image, mais tu perds en visibilité."
        }
    ]
}
```

## Implémentation technique

### Installation

```bash
npm install openai
```

### Configuration

```javascript
// .env
OPENAI_API_KEY=your_api_key_here
```

### Intégration dans le moteur de jeu

```javascript
// src/core/game.js
import { NarrativeAIEngine } from '../ai/narrative-engine.js';

class GameEngine {
    constructor() {
        // ... existing code
        this.narrativeAI = new NarrativeAIEngine(process.env.OPENAI_API_KEY);
    }

    async checkForAIEvents() {
        if (Math.random() < 0.1) { // 10% chance par check
            const context = this.buildAIContext();
            const aiEvent = await this.narrativeAI.generateEvent(context);
            this.triggerEvent(aiEvent);
        }
    }
}
```

## Sécurité et coûts

### Limites de coûts

```javascript
class NarrativeAIEngine {
    constructor(apiKey, dailyLimit = 1000) {
        this.dailyLimit = dailyLimit; // Limite de requêtes par jour
        this.requestCount = 0;
    }

    async generateEvent(context) {
        if (this.requestCount >= this.dailyLimit) {
            return this.getFallbackEvent();
        }
        // ... appel API
        this.requestCount++;
    }
}
```

### Modération du contenu

```javascript
async generateEvent(context) {
    const event = await this.callGPT(prompt);

    // Vérifier que le contenu est approprié
    if (this.containsInappropriateContent(event)) {
        return this.getFallbackEvent();
    }

    return event;
}
```

## Roadmap d'intégration

### ✅ Phase 1 (Actuelle - v0.1)
- Événements prédéfinis avec conditions dynamiques
- Système de décisions à choix multiples
- Profil joueur adaptatif

### 🚧 Phase 2 (v0.2) - IA Basique
- Intégration API GPT-4
- Génération d'événements simples
- Détection de contradictions

### 📋 Phase 3 (v0.3) - IA Avancée
- Arcs narratifs sur plusieurs événements
- Mémoire contextuelle améliorée
- Personnalités de NPCs générées par IA

### 📋 Phase 4 (v1.0) - IA Complète
- Monde dynamique entièrement géré par IA
- Scénarios infinis et uniques
- Dialogues de NPCs génératifs
- Conséquences à très long terme

## Alternatives sans API (Fallback)

Si pas d'API GPT disponible, utiliser :

1. **Système de templates avancé** :
```javascript
const templates = {
    scandal: [
        "Un journaliste enquête sur {industry}",
        "Des documents compromettants sur {industry} ont fuité"
    ]
};
```

2. **Génération procédurale basée sur règles** :
```javascript
generateEventFromRules(gameState) {
    if (gameState.environment < 30 && gameState.wealth > 1M) {
        return eventTemplates.environmentalCatastrophe;
    }
}
```

## Conclusion

L'IA narrative est le **différenciateur clé** de Life Empire. La v0.1 pose les bases avec un système solide et extensible, prêt pour l'intégration future de GPT.

Le système actuel fonctionne sans API externe, garantissant une expérience complète même sans coûts d'API.

---

**Note** : L'intégration complète de GPT sera réalisée en v0.2 après validation du prototype actuel.
