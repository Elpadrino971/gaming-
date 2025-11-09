# 🚀 Déploiement Rapide

## GitHub Pages (Recommandé - 100% Gratuit)

### Étape 1 : Activer GitHub Pages

1. Va sur ton repo : `https://github.com/Elpadrino971/gaming-`
2. Clique sur **Settings** (⚙️)
3. Dans le menu gauche, clique sur **Pages**
4. Sous **Source** :
   - **Branch** : Sélectionne `claude/life-empire-game-design-011CUwTEaUhKVPo3fhSzM6pt`
   - **Folder** : Sélectionne `/ (root)`
5. Clique sur **Save**

### Étape 2 : Attendre le déploiement

- GitHub va builder automatiquement (1-2 minutes)
- Tu verras un message : "Your site is ready to be published"
- Puis : "Your site is live at..."

### Étape 3 : Accéder à ton jeu

Ton jeu sera accessible sur :
```
https://elpadrino971.github.io/gaming-/
```

**C'est tout ! 🎉**

---

## Alternative : Netlify (Drag & Drop)

Si tu préfères Netlify :

1. Va sur [netlify.com](https://www.netlify.com/)
2. Login avec GitHub
3. **Sites** → **Add new site** → **Import an existing project**
4. Choisis ton repo GitHub
5. Settings :
   - **Build command** : (laisse vide)
   - **Publish directory** : `.` ou laisse vide
6. Clique **Deploy**

Ton jeu sera sur : `https://ton-site.netlify.app`

---

## Alternative : Vercel (Ultra Rapide)

1. Installe Vercel CLI :
```bash
npm install -g vercel
```

2. Dans le dossier du jeu :
```bash
vercel --prod
```

3. Suis les instructions

---

## Partager ton jeu

Une fois déployé, partage le lien :
- Sur Reddit (r/WebGames, r/incremental_games)
- Sur Twitter/X
- Sur Discord
- Avec tes amis !

---

## Mise à jour du jeu

Pour mettre à jour après déploiement :

### GitHub Pages
```bash
git add .
git commit -m "Update: description"
git push origin claude/life-empire-game-design-011CUwTEaUhKVPo3fhSzM6pt
```
→ Auto-déploiement en 1-2 minutes

### Netlify
→ Auto-déploiement automatique dès que tu push

### Vercel
```bash
vercel --prod
```

---

**Profite de ton jeu en ligne ! 🎮**
