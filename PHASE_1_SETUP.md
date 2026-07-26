# Phase 1 - Boussole du Savoir: Guide de Démarrage

Date: 2026-07-26
Utilisateur: Cherif Chabi (cherif.chabi@digiglesolutions.com)
Répertoire local: `c:\Users\LENOVO\Music\Boussole du Savoir`

---

## 📋 Vue d'ensemble des tâches

Cette phase comprend trois étapes principales:
1. **Créer le dépôt GitHub public** avec configuration de base
2. **Configurer le projet sur Vercel** avec la base de données PostgreSQL
3. **Initialiser l'environnement local** avec Next.js et connexion à la BD

---

## ✅ ÉTAPE 1: Créer le dépôt GitHub

### Étape 1.1 - Accéder à la création de repo
1. Allez à https://github.com/new
2. Authentifiez-vous avec votre compte GitHub (si nécessaire)

### Étape 1.2 - Configurer le repository

**Owner:** Cherif Chabi

**Repository name:** `boussole-du-savoir`

**Description:** 
```
Plateforme éducative ludo-éducative pour système béninois (primaire → université)
```

**Visibilité:** ✅ **Public**

**Initialiser ce repository avec:**
- ✅ Ajouter un README file
- ☐ Ajouter .gitignore (on le fera après)
- ☐ Choisir une license (on la fera après)

→ Cliquez sur **"Create repository"**

### Étape 1.3 - Ajouter .gitignore (Node.js)

Une fois le repo créé:

1. Cliquez sur le bouton **"Add file"** → **"Create new file"**
2. Nommez le fichier: `.gitignore`
3. Collez le contenu suivant:

```
# Dependencies
node_modules/
/.pnp
.pnp.js
.yarn/install-state.gz

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
```

4. Cliquez sur **"Commit changes..."**
5. Message: `Add .gitignore for Node.js`
6. Confirmez

### Étape 1.4 - Ajouter LICENSE (MIT)

1. Cliquez sur **"Add file"** → **"Create new file"**
2. Nommez le fichier: `LICENSE`
3. Collez le contenu suivant:

```
MIT License

Copyright (c) 2026 Cherif Chabi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

4. Cliquez sur **"Commit changes..."**
5. Message: `Add MIT License`
6. Confirmez

### Étape 1.5 - Mettre à jour le README

1. Cliquez sur le fichier **README.md** existant
2. Cliquez sur l'icône ✏️ (edit)
3. Remplacez le contenu par:

```markdown
# Boussole du Savoir

Plateforme éducative ludo-éducative pour le système béninois (primaire → université)

## 🎯 Objectif

Fournir une plateforme d'apprentissage interactive et adaptée au contexte éducatif béninois.

## 🚀 En développement

Phase 1: Configuration initiale du projet

## 📝 Licence

MIT License - Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👤 Auteur

Cherif Chabi - cherif.chabi@digiglesolutions.com
```

4. Cliquez sur **"Commit changes..."**
5. Message: `Update README with project description`
6. Confirmez

### ✅ Étape 1 terminée
Vous devez maintenant avoir un repo GitHub public avec:
- ✅ README.md
- ✅ .gitignore
- ✅ LICENSE (MIT)

**Copiez l'URL de votre repo:** `https://github.com/Cherif-Chabi/boussole-du-savoir`

---

## ✅ ÉTAPE 2: Configurer le projet sur Vercel

### Étape 2.1 - Se connecter à Vercel

1. Allez à https://vercel.com
2. Cliquez sur **"Sign in"**
3. Utilisez votre adresse email: `cherif.chabi@digiglesolutions.com`
   - Si vous n'avez pas de compte Vercel, cliquez sur **"Sign up"** et créez un compte
   - Authentifiez-vous avec GitHub pour une intégration plus simple

### Étape 2.2 - Importer le repo GitHub

1. Cliquez sur **"New Project"** (ou **"Add New..."** → **"Project"**)
2. Sélectionnez **"Import Git Repository"**
3. Cherchez et sélectionnez: `boussole-du-savoir`
   - Si le repo n'apparaît pas, cliquez sur **"Adjust GitHub Permissions"** et autorisez l'accès
4. Cliquez sur **"Import"**

### Étape 2.3 - Configurer le projet

Dans l'écran de configuration:

**Project Name:** `boussole-du-savoir` (ou laissez par défaut)

**Framework Preset:** Next.js (devrait être auto-détecté)

**Build & Development Settings:**
- Laissez les paramètres par défaut
- Vercel détectera automatiquement la structure Next.js

Cliquez sur **"Deploy"**

⏳ Attendez que le déploiement initial soit terminé (quelques minutes)

### Étape 2.4 - Ajouter Vercel Postgres

Une fois le projet créé:

1. Allez dans l'onglet **"Storage"** du projet Vercel
2. Cliquez sur **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Configuration:
   - **Database Name:** `boussole_du_savoir` (ou `boussole-dev`)
   - **Region:** Sélectionnez une région proche (par ex. `us-east-1` ou la plus proche)
5. Cliquez sur **"Create"**

⏳ Attendez que la base de données soit créée

### Étape 2.5 - Copier la DATABASE_URL

1. Dans l'onglet **"Storage"**, trouvez votre base de données
2. Cliquez sur la base de données
3. Allez dans l'onglet **".env.local"**
4. Vous verrez quelque chose comme:
```
POSTGRES_URL="postgresql://user:password@host:5432/boussole_du_savoir"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/boussole_du_savoir"
```

**⚠️ Attention:** Gardez ces valeurs bien sécurisées! Ne les partagez jamais publiquement.

5. Cliquez sur **"Copy"** pour copier les variables dans votre presse-papiers
6. **Conservez ces valeurs pour l'étape 3**

### ✅ Étape 2 terminée

Vous avez:
- ✅ Un projet Vercel connecté au repo GitHub
- ✅ Une base de données PostgreSQL créée
- ✅ Les variables d'environnement à portée de main

---

## ✅ ÉTAPE 3: Initialiser l'environnement local

### Étape 3.1 - Cloner le repo

Ouvrez **PowerShell** ou **Terminal** et exécutez:

```powershell
cd "c:\Users\LENOVO\Music\Boussole du Savoir"
git clone https://github.com/Cherif-Chabi/boussole-du-savoir.git .
```

⏳ Attendez que le clone soit terminé

### Étape 3.2 - Installer Next.js

Dans le même terminal:

```powershell
npx create-next-app@latest . --typescript --tailwind --app --no-git
```

Répondez aux questions comme suit:
- **ESLint?** → Yes
- **Autres questions** → Acceptez les paramètres par défaut

⏳ L'installation peut prendre plusieurs minutes

### Étape 3.3 - Créer le fichier .env.local

1. Créez un fichier `.env.local` à la racine du projet:

```powershell
# Créer le fichier
New-Item -Path ".env.local" -ItemType File -Force
```

2. Ouvrez le fichier dans votre éditeur préféré (VS Code, Notepad++, etc.)

3. Collez le contenu suivant:

```
# Database
POSTGRES_URL="postgresql://user:password@host:5432/boussole_du_savoir"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Claude API (optionnel pour Phase 1)
CLAUDE_API_KEY="your-claude-api-key-here"
```

⚠️ **À faire:**
- Remplacez `POSTGRES_URL` avec la valeur que vous avez copiée de Vercel (étape 2.5)
- Générez une `NEXTAUTH_SECRET` aléatoire (minimum 32 caractères)
  - Exemple: `openssl rand -base64 32` (Linux/Mac) ou utilisez un générateur en ligne
  - Pour Windows: utilisez un générateur UUID ou générez une chaîne aléatoire longue

### Étape 3.4 - Installer les dépendances Node.js

```powershell
npm install
```

⏳ Attendez que toutes les dépendances soient installées

### Étape 3.5 - Vérifier que tout fonctionne

```powershell
npm run dev
```

Vous devriez voir:
```
> boussole-du-savoir@0.1.0 dev
> next dev

  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  ...
```

Ouvrez http://localhost:3000 dans votre navigateur et vous devriez voir la page Next.js par défaut.

✅ **Succès!** Votre environnement local est prêt

---

## 📊 Résumé: Statut de Phase 1

| Tâche | Statut |
|-------|--------|
| Créer repo GitHub `boussole-du-savoir` | ✅ Terminé |
| Configurer .gitignore et LICENSE | ✅ Terminé |
| Mettre à jour README | ✅ Terminé |
| Créer projet Vercel | ✅ Terminé |
| Configurer Vercel Postgres | ✅ Terminé |
| Cloner repo localement | ✅ Terminé |
| Installer Next.js | ✅ Terminé |
| Configurer .env.local | ✅ Terminé |
| Vérifier l'installation locale | ✅ Terminé |

---

## 🔗 Ressources utiles

- **GitHub:** https://github.com/Cherif-Chabi/boussole-du-savoir
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/postgres

---

## 📝 Prochaines étapes (Phase 2+)

- [ ] Configurer la structure de la base de données
- [ ] Mettre en place l'authentification NextAuth
- [ ] Créer les composants UI de base
- [ ] Intégrer l'API Claude (si nécessaire)
- [ ] Déployer la version initiale

---

## ❓ Besoin d'aide?

Si vous rencontrez des problèmes:

1. **GitHub:** Vérifiez que le repo est public et accessible
2. **Vercel:** Assurez-vous que vous êtes connecté avec le bon compte
3. **Local:** Vérifiez que Node.js et Git sont installés correctement
4. **BD:** Gardez la DATABASE_URL sécurisée et ne la committez jamais

---

**Document créé:** 2026-07-26
**Prêt pour Phase 1 ✅**
