# 🧭 Boussole du Savoir

**Plateforme éducative ludo-éducative** pour le système béninois, couvrant primaire, collège/lycée et université.

---

## 🚀 Quick Start

### Pour commencer localement :

```bash
# 1. Cloner le repo
git clone https://github.com/cherif-chabi/boussole-du-savoir.git
cd boussole-du-savoir

# 2. Installer dépendances
npm install

# 3. Configurer .env.local (voir .env.example)
cp .env.example .env.local
# Remplissez DATABASE_URL, NEXTAUTH_SECRET, CLAUDE_API_KEY

# 4. Initialiser la base de données
psql $DATABASE_URL -f utils/db/schema.sql

# 5. Démarrer le dev server
npm run dev

# 6. Ouvrir http://localhost:3000
```

---

## 📁 Structure du Projet

```
boussole-du-savoir/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── dashboard/         # Dashboard principal
│   ├── learning/          # Learning hub
│   ├── chat/              # Chat IA tuteur
│   ├── api/               # API routes
│   ├── globals.css        # Styles globaux
│   └── layout.tsx         # Root layout
│
├── components/            # Composants réutilisables
│   ├── layout/
│   ├── learning/
│   ├── chat/
│   └── ui/
│
├── lib/                   # Logique et utilitaires
│   ├── auth.ts
│   ├── claude.ts
│   ├── db.ts
│   └── cache-manager.ts
│
├── types/                 # Types TypeScript
├── styles/                # CSS custom
├── public/                # Assets (images, vidéos, icons)
├── utils/
│   ├── db/                # Schema SQL + migrations
│   └── seed/              # Scripts seed
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── CLAUDE.md              # Architecture complète
```

---

## 🎨 Design System

Trois palettes de couleurs adaptées par branche :

### Primaire (6-12 ans) 🎨
- Rose vif (#FF6B9D)
- Orange chaud (#F5A962)
- Teal menthe (#7ED4CE)

### Collège/Lycée (11-18 ans) 📚
- Bleu profond (#2C5AA0)
- Beige crème (#F5E6D3)
- Or doux (#D4AF37)

### Université (18+) 🎓
- Bleu-gris (#2C3E50)
- Gris clair (#ECF0F1)
- Teal moderne (#1ABC9C)

Voir `DESIGN_SYSTEM.md` pour détails complets.

---

## 📚 Phases d'Implémentation

### Phase 1 ✅ (En cours)
- [x] Repo GitHub + Vercel
- [x] Next.js scaffolding
- [x] Vercel Postgres setup
- [x] Schema BD complet
- [ ] Auth NextAuth.js
- [ ] Landing page + profil

### Phase 2 🔄 (À venir)
- [ ] Seed contenu initial
- [ ] QuizEngine component
- [ ] Génération Claude API
- [ ] Cache BD + Prompt Caching

### Phase 3 (Planifié)
- [ ] Profil utilisateur persistant
- [ ] Chat IA intégré
- [ ] Dashboard progression

### Phase 4-7 (À définir)
- [ ] Design final + illustrations
- [ ] Déploiement production
- [ ] Monitoring

---

## 🔐 Sécurité

- **Secrets** : Tous dans `.env.local` (jamais en git)
- **Database** : Vercel Postgres managed
- **Auth** : NextAuth.js + bcrypt hashing
- **API Claude** : Clé stockée serveur-side

---

## 🚢 Déploiement

Vercel auto-déploie à chaque push sur `main` :

```
git push origin main
  ↓
GitHub webhook
  ↓
Vercel builds + tests
  ↓
Deploy live (https://boussole-du-savoir.vercel.app)
```

---

## 📖 Documentation

- **[CLAUDE.md](./CLAUDE.md)** : Architecture système complète
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** : Palettes + composants
- **[.env.example](./.env.example)** : Variables d'environnement

---

## 🛠️ Tech Stack

- **Frontend** : Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend** : Next.js API Routes (serverless)
- **Database** : Vercel Postgres
- **Auth** : NextAuth.js + bcryptjs
- **LLM** : Anthropic Claude API
- **Deployment** : Vercel
- **Version Control** : GitHub

---

## 👤 Auteur

**Chérif Chabi**
- Email : cherif.chabi@digiglesolutions.com
- GitHub : [@cherif-chabi](https://github.com/cherif-chabi)
- Parcours : Technicien sécurité systèmes & réseaux, Automatisation IA/HubSpot/Zapier

---

## 📝 License

MIT © 2026 Chérif Chabi

---

## 🎯 Vision

Accompagner chaque enfant béninois de la petite enfance jusqu'à l'université avec une plateforme unique, adaptée, ludique et inspirante. ✨

---

**Status** : Phase 1 en cours
**Last updated** : 2026-07-26
