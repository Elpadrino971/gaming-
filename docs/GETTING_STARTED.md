# 🚀 Guide de démarrage - Life Empire

## Installation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur HTTP local (optionnel pour développement)

### Méthode 1 : Lancer directement (le plus simple)

```bash
# Ouvrir index.html dans un navigateur
# Double-cliquer sur index.html
# OU
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Méthode 2 : Serveur local (recommandé)

```bash
# Option A : Python (généralement déjà installé)
python3 -m http.server 8000

# Option B : Node.js (si installé)
npx http-server -p 8000

# Option C : PHP (si installé)
php -S localhost:8000
```

Puis ouvrir : `http://localhost:8000`

## Premiers pas

### 1. Comprendre les métriques

**💰 Richesse**
- Ta ressource principale
- Utilisée pour acheter des industries
- Augmente avec tes revenus passifs

**🌍 Environnement**
- Impact écologique de ton empire
- Diminue avec les industries polluantes
- Affecte la stabilité sociale

**⚖️ Moralité**
- Ton éthique des affaires
- Influence par tes décisions
- Détermine certaines opportunités

**📢 Influence**
- Ton pouvoir médiatique et politique
- Débloque des industries premium
- Permet de façonner la narration

**🏛️ Stabilité**
- Santé sociale de ton empire
- Affectée par moralité et environnement
- Trop basse = risque de révoltes

### 2. Acheter des industries

- Commence avec le **Stand de limonade** (🍋)
- Achète des **Boulangeries** (🥖) pour augmenter tes revenus
- Débloque de nouvelles industries en augmentant ta richesse

### 3. Faire des choix stratégiques

Les événements te proposent des **choix moraux** :

- **Capitaliste** : Maximise les profits, peu importe les conséquences
- **Éco-leader** : Croissance durable, respect de l'environnement
- **Mafieux** : Profits rapides, méthodes douteuses

Ton **profil joueur** s'adapte à tes décisions !

## Stratégies de jeu

### 🏆 Stratégie "Capitaliste pur"

**Objectif** : Richesse maximale

1. Achète toutes les industries rentables
2. Ignore l'environnement et la moralité
3. Choisis toujours l'option la plus profitable
4. Investis dans pétrole, casino, armes

**⚠️ Risques** :
- Stabilité sociale faible
- Scandales médiatiques
- Révoltes et crises

### 🌱 Stratégie "Éco-leader"

**Objectif** : Empire durable et respecté

1. Privilégie les fermes biologiques et solaire
2. Évite pétrole et industries polluantes
3. Choisis les options éthiques
4. Investis dans la recherche et pharmaceutique

**⚠️ Compromis** :
- Croissance plus lente
- Revenus inférieurs au capitaliste
- Nécessite patience

### 🎭 Stratégie "Mafieux"

**Objectif** : Pouvoir absolu

1. Accumule influence rapidement
2. Soudoie, manipule, menace
3. Achète casino, armes, banques
4. Contrôle la narration médiatique

**⚠️ Risques** :
- Moralité très basse
- Enquêtes judiciaires
- Effondrement brutal possible

### 🧠 Stratégie "Équilibrée" (Recommandée pour débuter)

**Objectif** : Croissance stable

1. Mix d'industries rentables et durables
2. Garde toutes les métriques > 40%
3. Adapte tes choix selon la situation
4. Investis dans influence et stabilité

## Conseils avancés

### 💡 Déblocages d'industries

Certaines industries ont des **conditions spéciales** :

- **Usine textile** : Richesse > $10K
- **Puits de pétrole** : Richesse > $50K
- **Startup Tech** : Richesse > $200K + Influence > 20
- **Commerce d'armes** : Richesse > $5M + Moralité < 30
- **Programme spatial** : Richesse > $20M + Influence > 60

### 🎯 Optimisation des revenus

- Achète plusieurs fois la même industrie pour **boost exponentiel**
- Le coût augmente de 15-40% à chaque achat (selon l'industrie)
- Industries early-game : Faible coût, faibles revenus
- Industries late-game : Coût énorme, revenus massifs

### 🔄 Système de sauvegarde

Le jeu **sauvegarde automatiquement** toutes les 30 secondes.

Commandes console :
```javascript
game.save()     // Sauvegarder manuellement
game.reset()    // Recommencer à zéro
game.stop()     // Arrêter le jeu
game.start()    // Démarrer le jeu
```

### 🎲 Événements déclenchés

Les événements se déclenchent selon **tes métriques** :

- **Crise environnementale** : Environnement < 70%
- **Scandale médiatique** : Moralité < 40%
- **Grève des employés** : Stabilité < 60%
- **Contrat gouvernemental** : Influence > 30%
- **Prix d'excellence** : Moralité > 80% + Environnement > 70%

## Troubleshooting

### Le jeu ne charge pas

1. Vérifie la console navigateur (F12)
2. Assure-toi que JavaScript est activé
3. Utilise un serveur local plutôt que file://

### Les événements ne se déclenchent pas

- Chaque événement ne se déclenche **qu'une fois** par partie
- Certains événements ont des **conditions strictes**
- Le système vérifie les événements toutes les 5 secondes

### Problème de sauvegarde

- Vérifie que localStorage est activé dans ton navigateur
- N'utilise pas le mode navigation privée
- Vide le cache si nécessaire

## Commandes console utiles

```javascript
// Voir l'état des ressources
game.resources.getAll()

// Voir le profil actuel
game.resources.getPlayerProfile()

// Voir les industries
game.industries

// Ajouter de l'argent (triche)
game.resources.add('wealth', 100000)

// Débloquer toutes les industries (triche)
for (let i of Object.values(game.industries)) { i.unlocked = true }
```

## Prochaines étapes

Une fois familiarisé avec le jeu :

1. Explore différentes stratégies
2. Essaie d'atteindre $1 Billion
3. Teste les trois profils (Capitaliste, Éco, Mafieux)
4. Cherche tous les événements possibles

## Besoin d'aide ?

- Consulte le README.md pour la documentation complète
- Vérifie docs/AI_NARRATIVE_INTEGRATION.md pour comprendre l'IA
- Ouvre la console (F12) pour les messages de debug

---

**Bon jeu ! 🎮**
