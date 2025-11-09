# 🚀 Guide de déploiement

## Déploiement GitHub Pages

Life Empire peut être déployé gratuitement sur GitHub Pages.

### Étape 1 : Push sur GitHub

```bash
git add .
git commit -m "Initial release: Life Empire v0.1"
git push origin main
```

### Étape 2 : Activer GitHub Pages

1. Va dans **Settings** de ton repo GitHub
2. Clique sur **Pages** dans le menu latéral
3. Sous **Source**, sélectionne la branche `main` et dossier `/ (root)`
4. Clique sur **Save**

### Étape 3 : Accéder au jeu

Ton jeu sera disponible à :
```
https://[ton-username].github.io/[nom-du-repo]/
```

Exemple :
```
https://elpadrino971.github.io/gaming-/
```

## Déploiement Netlify

### Option 1 : Interface Web

1. Va sur [netlify.com](https://www.netlify.com/)
2. Clique sur **Add new site** > **Import an existing project**
3. Connecte ton repo GitHub
4. Paramètres :
   - **Build command** : (laisse vide)
   - **Publish directory** : (laisse vide ou `.`)
5. Clique sur **Deploy**

### Option 2 : Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod
```

## Déploiement Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

## Déploiement sur serveur web classique

### Upload via FTP/SFTP

1. Copie tous les fichiers du projet sur ton serveur
2. Assure-toi que `index.html` est à la racine
3. Configure le serveur pour servir les fichiers statiques
4. Accède à `https://ton-domaine.com`

### Configuration Apache

Crée un fichier `.htaccess` :

```apache
# Enable CORS for ES6 modules
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name ton-domaine.com;
    root /path/to/life-empire;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1w;
        add_header Cache-Control "public, immutable";
    }

    # CORS for ES6 modules
    add_header Access-Control-Allow-Origin *;
}
```

## Optimisations pour production

### 1. Minification (optionnel)

Pour réduire la taille des fichiers :

```bash
npm install -g terser html-minifier

# Minifier JS
terser src/core/game.js -o src/core/game.min.js -c -m

# Minifier HTML
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
```

### 2. Compression Gzip

La plupart des hébergeurs modernes font ça automatiquement.

### 3. CDN (optionnel)

Pour de meilleures performances globales, utilise un CDN comme :
- Cloudflare (gratuit)
- CloudFront
- Fastly

## Variables d'environnement (futur)

Quand l'intégration GPT sera ajoutée :

```javascript
// .env (NE PAS COMMITER)
OPENAI_API_KEY=sk-...
```

Pour déploiement :
1. GitHub Pages : Utilise GitHub Secrets
2. Netlify : Ajoute dans **Site settings** > **Environment variables**
3. Vercel : Ajoute dans **Settings** > **Environment Variables**

## Monitoring et Analytics (optionnel)

### Google Analytics

Ajoute dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (alternative respectueuse de la vie privée)

```html
<script defer data-domain="ton-domaine.com" src="https://plausible.io/js/script.js"></script>
```

## Troubleshooting déploiement

### Modules ES6 ne chargent pas

Assure-toi que :
1. Les fichiers ont l'extension `.js`
2. Le serveur envoie le bon MIME type (`application/javascript`)
3. CORS est activé si nécessaire

### 404 sur les fichiers

Vérifie :
1. Les chemins sont relatifs (pas absolus)
2. La casse des noms de fichiers (Unix est case-sensitive)
3. Les permissions des fichiers (644 pour fichiers, 755 pour dossiers)

### Problème de cache

Force le rafraîchissement :
- Chrome/Firefox : `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
- Ou ajoute un paramètre de version : `game.js?v=1.0.1`

## Checklist pré-déploiement

- [ ] Tous les fichiers sont commités
- [ ] .gitignore exclut les fichiers sensibles
- [ ] README.md est à jour
- [ ] Le jeu fonctionne en local
- [ ] Aucune API key n'est hardcodée
- [ ] Les chemins des imports sont corrects
- [ ] License et copyright sont définis

## Mise à jour du jeu

```bash
# Faire les modifications
git add .
git commit -m "Update: description des changements"
git push origin main

# GitHub Pages/Netlify/Vercel déploieront automatiquement
```

---

**Le jeu est maintenant en ligne ! 🎉**

Partage le lien et profite de Life Empire !
