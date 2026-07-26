# Boussole du Savoir — Architecture & Guide d'Implémentation

**Plateforme éducative ludo-éducative** (style Duolingo) pour le système éducatif béninois, couvrant primaire, collège/lycée et université.

---

## 1. Vue d'ensemble du projet

### Objectif
Accompagner l'enfant de la petite enfance jusqu'à l'université avec une application unique, adaptée au contexte béninois, mélangeant gamification (cœurs, scores, niveaux) et contenu pédagogique riche (vidéos, quizzes, chat IA).

### Trois branches principales

#### **Primaire (6-12 ans)**
- 20 niveaux, 10 questions/niveau
- Catégories : lettres/alphabet, lecture, culture générale, animaux, nourriture/nutrition, sciences de base
- Vidéo éducative intégrée par niveau (chanson/dessin animé pédagogique)
- Progression : 1-5 (découverte), 6-12 (consolidation), 13-20 (approfondissement)

#### **Collège/Lycée (11-18 ans)**
- 20 niveaux, 15 questions/niveau
- **Collège (6ème-3ème)** : Maths, Physique-Chimie, Lecture, Communication écrite, Histoire-Géographie, Anglais, SVT
- **Lycée (2nde, 1ère, Terminale)** avec séries A/B/C/D
  - Séries A & B : accent langues (Français, Anglais, Espagnol, Allemand A)
  - Séries C & D : accent maths & sciences
- Vidéo pédagogique par niveau (capsules adaptées 11-18 ans)

#### **Université (18+ ans)**
- 30 niveaux, 20 questions/niveau
- Domaines : **IA**, **Informatique**, **Médecine**, **Droit**, **Économie/Gestion** (extensible)
- **Topo pré-jeu** : résumé domaine, débouchés actuels, métiers de l'avenir (impact IA)
- Vidéos : vulgarisation, conférences courtes, témoignages professionnels

---

## 2. Fonctionnalités clés

### 2.1 Système de cœurs (Vies)
- Chaque niveau démarre avec **3 cœurs**
- 1 mauvaise réponse = perte 1 cœur
- 0 cœurs restants = niveau **reprend à zéro**
- Affichage temps réel pendant le jeu

### 2.2 Profil utilisateur persistant
- Nom, prénom, niveau d'études, domaine (université)
- Avatar
- Historique complet : progression par sujet, scores, cœurs, dates transitions
- Préférences : langue (FR/Fon/Yoruba futur), notifications

### 2.3 Dashboard (Suivi)
- Vue progression visuelle par branche
- Graphiques : matières fortes/faibles, historique scores
- Badges unlock (5 quizzes complétés, streak 7j, etc.)
- Recommandations de contenu

### 2.4 Interface niveaux (Tuiles)
- Style Duolingo : cases cliquables en grille/parcours
- Case verrouillée si niveau précédent non complété
- Indicateur visuel : non commencé / en cours / réussi (avec score)
- Clic → ouvre écran de jeu

### 2.5 Chat IA intégré
- Accessible à tout moment
- Tuteur adapté à l'âge/niveau de l'utilisateur
- Contexte enrichi si dans un quiz (explications, clarifications)
- Historique conversation (optionnel persistant)

### 2.6 Onglets informatifs
- **"À propos"** : mission, philosophie pédagogique, vision long terme
- **"Biographie auteur"** : Chérif (parcours, motivation, réseaux sociaux, contact)

### 2.7 Vidéos embarquées
- Lecteur HTML5 intégré (pas juste liens externes)
- Courtes durée (5-15 min) adaptées data limit mobile
- Par niveau/thème

---

## 3. Stack technique

### Frontend
- **Framework** : Next.js 14+ (App Router)
- **UI Library** : React 18+
- **Styling** : Tailwind CSS + custom design system
- **Animations** : Framer Motion (transitions quiz)
- **Video** : HTML5 `<video>` + react-player (fallback)
- **Charts** : Recharts (dashboard progression)

### Backend
- **Runtime** : Next.js API Routes (serverless)
- **Authentication** : NextAuth.js (JWT + session)
- **Database** : Vercel Postgres (PostgreSQL managed)
- **Cache** : Vercel Postgres `content_cache` table + Claude Prompt Caching
- **LLM API** : Anthropic Claude API (générations quiz + chat)

### Infrastructure
- **Hosting** : Vercel (free tier, auto-scaling)
- **Repository** : GitHub (public)
- **Environment** : `.env.local` (secrets, nunca committer)

### Tools & Libraries
- **ORM** : `node-postgres` (simple) ou Prisma (typed)
- **Auth** : `next-auth` + `bcryptjs`
- **Validation** : `zod`
- **HTTP Client** : `fetch` (native)
- **Logging** : `pino` (optionnel, monitoring)

---

## 4. Arborescence complète

```
boussole-du-savoir/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml              # CI/CD auto Vercel
│   │   └── cache-warmup.yml        # Pré-générer contenu
│   └── ISSUE_TEMPLATE/
│
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout + theme
│   ├── page.tsx                    # Landing / Home
│   ├── globals.css
│   │
│   ├── (auth)/                     # Auth group (no header)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   │
│   ├── dashboard/                  # Main hub (protégé)
│   │   ├── page.tsx                # Vue progression + niveaux
│   │   ├── profile/page.tsx        # Édition profil
│   │   └── layout.tsx              # Header + sidebar
│   │
│   ├── learning/                   # Learning hub
│   │   ├── page.tsx                # Sélection sujet/niveau
│   │   ├── [subject]/
│   │   │   ├── page.tsx            # Grille niveaux
│   │   │   └── [level]/
│   │   │       ├── page.tsx        # Détails + boutton "Jouer"
│   │   │       ├── quiz/[quizId]/page.tsx  # Écran jeu
│   │   │       └── layout.tsx
│   │   └── layout.tsx
│   │
│   ├── chat/                       # Chat tuteur IA
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── about/
│   │   ├── app/page.tsx            # À propos application
│   │   └── author/page.tsx         # Biographie Chérif
│   │
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       │
│       ├── user/
│       │   ├── profile/route.ts    # GET/POST profil
│       │   ├── progress/route.ts   # GET/POST scores
│       │   └── badges/route.ts
│       │
│       ├── content/
│       │   ├── generate/route.ts   # POST (Claude + cache)
│       │   ├── quiz/[quizId]/route.ts
│       │   ├── videos/route.ts
│       │   └── topo/[domain]/route.ts  # Topo université
│       │
│       ├── chat/
│       │   └── route.ts            # POST messages
│       │
│       └── cache/
│           ├── warmup/route.ts     # Job pré-génération
│           └── status/route.ts     # Diagnostics
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── learning/
│   │   ├── QuizEngine.tsx          # Moteur réutilisable
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx         # Cœurs + score
│   │   ├── LevelGrid.tsx           # Tuiles niveaux
│   │   └── VideoPlayer.tsx
│   │
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   │
│   ├── dashboard/
│   │   ├── ProgressChart.tsx       # Recharts
│   │   ├── StatsCard.tsx
│   │   └── BadgeList.tsx
│   │
│   ├── content/
│   │   ├── ContentCard.tsx
│   │   └── IllustrationLoader.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── Badge.tsx
│       └── Spinner.tsx
│
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── claude.ts                   # Client API Claude
│   ├── db.ts                       # Vercel Postgres client
│   ├── cache-manager.ts            # Logique cache
│   ├── prompt-templates.ts         # Templates génération
│   ├── utils.ts                    # Utilitaires
│   └── constants.ts                # Config statique
│
├── types/
│   ├── user.ts                     # User, Profile
│   ├── content.ts                  # Quiz, Question, Content
│   ├── cache.ts                    # CacheEntry
│   └── api.ts                      # Types API
│
├── public/
│   ├── illustrations/
│   │   ├── primaire/
│   │   ├── college-lycee/
│   │   └── universite/
│   │
│   ├── videos/                     # Hosting vidéos
│   │   ├── tutorials/
│   │   └── explanations/
│   │
│   ├── icons/                      # Custom icons
│   └── favicon.ico
│
├── utils/
│   ├── db/
│   │   ├── schema.sql              # DDL complet
│   │   └── migrations/
│   │       ├── 001_init_users.sql
│   │       ├── 002_init_content.sql
│   │       ├── 003_init_cache.sql
│   │       └── 004_init_chat.sql
│   │
│   └── seed/
│       ├── seed-content.ts         # Population initiale
│       ├── seed-users.ts           # Users test
│       └── warmup-cache.ts         # Pré-cache
│
├── styles/
│   ├── theme.css                   # Variables design
│   └── animations.css
│
├── middleware.ts                   # Auth middleware
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── .env.example                    # Template variables
├── .env.local                      # Secrets (gitignore)
├── .gitignore
├── README.md
└── CLAUDE.md                       # Ce fichier
```

---

## 5. Schéma de données (Vercel Postgres)

### Tables principales

```sql
-- Users & Profiles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    full_name VARCHAR(255),
    level ENUM('primaire', 'college', 'lycee', 'universite'),
    class_details VARCHAR(50),              -- ex: "6eme", "2nde_A"
    university_domain VARCHAR(100),         -- ex: "ia", "informatique"
    avatar_url TEXT,
    bio TEXT,
    language VARCHAR(10) DEFAULT 'fr',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Structure
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    level VARCHAR(50),                     -- primaire, college, lycee, universite
    icon_url TEXT
);

CREATE TABLE levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    level_number INT,
    description TEXT,
    theme VARCHAR(100)
);

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id),
    level_id INTEGER REFERENCES levels(id),
    title VARCHAR(255),
    description TEXT,
    total_questions INT,
    passing_score INT DEFAULT 70,
    video_url TEXT,                        -- Vidéo associée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id, level_id)
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id),
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'short_answer') DEFAULT 'multiple_choice',
    order_index INT,
    difficulty INT DEFAULT 1,
    explanation TEXT
);

CREATE TABLE answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_index INT
);

-- User Progress & Scores
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    quiz_id INTEGER REFERENCES quizzes(id),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    score INT,
    hearts_remaining INT,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    UNIQUE(user_id, quiz_id)
);

CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    badge_name VARCHAR(100),
    description TEXT,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_name)
);

-- Content Cache (Claude generated)
CREATE TABLE content_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(500) UNIQUE NOT NULL,
    quiz_id INTEGER REFERENCES quizzes(id),
    content_type VARCHAR(50),              -- 'questions', 'topo', 'explanation'
    generated_content JSONB NOT NULL,
    token_cost INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    hit_count INT DEFAULT 0,
    last_accessed TIMESTAMP
);

-- Chat History
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message_text TEXT NOT NULL,
    role ENUM('user', 'assistant') DEFAULT 'user',
    context_subject_id INTEGER REFERENCES subjects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes pour performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_cache_key ON content_cache(cache_key);
CREATE INDEX idx_cache_expiry ON content_cache(expires_at);
CREATE INDEX idx_chat_user ON chat_messages(user_id, created_at DESC);
```

---

## 6. Architecture système

### 6.1 Authentification
1. **Register** → POST `/api/auth/register` → hash password → créer user BD
2. **Login** → POST `/api/auth/login` → vérifier credentials → session NextAuth
3. **Middleware** → `middleware.ts` valide token JWT → protège routes `/dashboard`, `/learning`, `/chat`

### 6.2 Moteur de Quiz (Réutilisable)

**Component: `QuizEngine.tsx`**
```typescript
interface QuizEngineProps {
  quizId: string;
  onComplete: (score: number, hearts: number) => void;
  startingHearts?: number;  // default 3
}

State:
- currentQuestion: number
- userAnswers: Answer[]
- hearts: number
- score: number
- loading: boolean

Behavior:
- Affiche 1 question à la fois
- Clique réponse → sauvegarde + vérification
- Mauvaise réponse → hearts--
- hearts === 0 → reset niveau
- Tous questions répondues → calcul score → onComplete()
```

### 6.3 Génération de contenu + Cache

**Flow:**

```
Client: GET /api/content/generate?subject=maths&level=primaire
            ↓
Server:
  1. Calculer cache_key = `${subject}_${level}_questions_v1`
  2. SELECT * FROM content_cache WHERE cache_key = ...
     ├─ HIT  → Retourner JSON + update hit_count
     └─ MISS → (à l'étape 3)
  3. Appeler Claude API:
     - System prompt (avec cache_control ephemeral)
     - User: "Générer 10 questions primaire français..."
     - Réponse: JSON questions[]
  4. INSERT INTO content_cache (cache_key, generated_content, expires_at, token_cost)
  5. Retourner JSON client
```

**Token Optimization:**
- System prompt fixe → Prompt Caching Claude (80% réduction tokens)
- Expiration cache : 24h ou après 100 hits
- Priorité warmup : Primaire Français → Maths → Collège Sciences

### 6.4 Chat IA

**Endpoint:** POST `/api/chat`

```typescript
Body: {
  message: string,
  context_quiz_id?: number,
  conversation_history: Message[]
}

Response: {
  reply: string,
  tokens_used: number
}
```

**Logic:**
- Créer context enrichi si `context_quiz_id` (niveau actuel, matière, question)
- Appeler Claude avec historique limité (derniers 10 messages pour pérf)
- Adapter tonalité réponse à l'âge utilisateur (du profil)
- Sauvegarder message dans `chat_messages` pour historique

---

## 7. Plan d'implémentation par étape

### **Phase 1 : Fondations (Semaine 1)**

**1.1 Scaffolding Next.js**
- `npx create-next-app@latest boussole-du-savoir --typescript --tailwind --app`
- Setup env vars (.env.example, .env.local)
- Routes de base page.tsx, layout.tsx
- **Validation** : `npm run dev` → localhost:3000 OK

**1.2 Base de données Vercel Postgres**
- Créer projet Vercel (lien GitHub)
- Provisionner "Vercel Postgres"
- Exécuter schema.sql complet
- Créer 3-5 subjects + levels test (hardcoded)
- **Validation** : `psql <DB_URL>` → SELECT COUNT(*) FROM users = 0

**1.3 Authentification NextAuth.js**
- Installer `next-auth`, `bcryptjs`
- Routes `/api/auth/[...nextauth]` + config
- Pages login/register
- Middleware protection `/dashboard`
- **Validation** : 
  - Créer user → BD
  - Login → redirect dashboard
  - Logout → redirect login

**Budget tokens** : ~2 000 (setup, pas appels Claude)

---

### **Phase 2 : Quiz & Contenu (Semaine 2)**

**2.1 Seed contenu initial**
- Créer 5 subjects : Français, Maths, Sciences, Histoire, Géo
- 3 niveaux par subject (primaire, collège, université)
- 10-15 quizzes hardcoded en BD
- Script `seed-content.ts`
- **Validation** : Dashboard affiche grille niveaux

**2.2 QuizEngine Component**
- Créer `components/learning/QuizEngine.tsx`
- Gère : questions, réponses, cœurs, score
- API POST `/api/user/progress` → sauvegarder résultat
- Animations Framer Motion transitions
- **Validation** : Quiz complet → score affiché & sauvegardé

**2.3 Génération Claude (Test)**
- Endpoint POST `/api/content/generate`
- Prompt: "Générer 5 questions quiz {subject} {level}..."
- Retourne JSON questions
- **PAS de cache BD encore** (test appels Claude)
- **Validation** : GET /api/content/generate?subject=maths&level=primaire → JSON valide

**Budget tokens** : ~10 000 (5 appels test × 2000)

---

### **Phase 3 : Cache & Optimisation (Semaine 3)**

**3.1 Implémenter cache BD**
- Table `content_cache` déjà en schema
- Fonction `getCachedOrGenerateContent(cacheKey)`
- Format clé : `${subject}_${level}_${contentType}_v1`
- Expiration 24h
- **Validation** : 
  - Appel 1 → génère, 2000 tokens, sauve BD
  - Appel 2 (même clé) → cache hit, 0 tokens

**3.2 Claude Prompt Caching**
- Ajouter `cache_control: { "type": "ephemeral" }` system prompt
- Messages réutilisables (instructions pédagogiques)
- Mesurer `cache_creation_input_tokens` vs `cache_read_input_tokens`
- **Validation** : 
  - 3e appel même context → cache_read_input_tokens visible
  - Réduction ~80% tokens input

**3.3 Cache Warmup Job**
- Script `utils/seed/warmup-cache.ts`
- Génère populaires : Primaire Fr/Math, Collège Sciences
- GitHub Action `cache-warmup.yml` (quotidienne/hebdo)
- Endpoint POST `/api/cache/warmup`
- **Validation** : Tous quizzes populaires ont cache rempli

**Budget tokens** : ~30 000 (warmup initial, ~15 subjects × 3 levels × 2000, moins avec prompt caching)

---

### **Phase 4 : Profil & Progression (Semaine 4)**

**4.1 Profil utilisateur persistant**
- Routes `/api/user/profile` (GET/POST)
- Page `/dashboard/profile` édition
- Avatar, bio, classe, domaine université
- **Validation** : Logout → Login → Profil préservé

**4.2 Tracking progression**
- Routes `/api/user/progress` (GET/POST)
- Mise à jour après quiz
- Calculer streak, badges
- Page `/dashboard` affiche progression graphique
- **Validation** : Dashboard montre historique scores

**Budget tokens** : ~2 000 (pas appels Claude)

---

### **Phase 5 : Chat IA & Contenu Riche (Semaine 5)**

**5.1 Chat IA**
- Page `/chat` interface simple
- Endpoint `/api/chat` (POST)
- Historique conversation stockée
- Contexte enrichi si dans quiz
- **Validation** : Poser question → réponse pertinente

**5.2 Vidéos embarquées**
- Component `<VideoPlayer>` HTML5
- 3-5 vidéos tutorielles test (publiques)
- Lier à contenu quiz (optionnel)
- **Validation** : Vidéo joue, responsive

**Budget tokens** : ~30 000 (chat conversations test)

---

### **Phase 6 : Design & Illustrations (Semaine 6)**

**6.1 Design System Tailwind**
- Variables couleurs (Beige #F5E6D3, Bleu #2C5AA0)
- Typographie (Poppins)
- Components ui/ réutilisables
- Dark mode support
- **Validation** : Cohérence visuelle partout

**6.2 Illustrations**
- Assets par niveau : primaire coloré, collège/lycée équilibré, université pro
- Intégrer en `public/illustrations/`
- Component `<IllustrationLoader>`
- **Validation** : Illustrations chargent, thématiques

**Budget tokens** : 0 (design/assets)

---

### **Phase 7 : Déploiement & Monitoring (Semaine 7)**

**7.1 Vercel Deployment**
- Lier GitHub repo → Vercel
- Env vars (API_CLAUDE_KEY, DATABASE_URL)
- Preview deployments
- **Validation** : Live sur boussole-du-savoir.vercel.app

**7.2 Monitoring**
- Vercel Analytics
- Log tokens usage Claude
- Dashboard stats (users, quizzes)
- **Validation** : Stats visibles, logs parsables

**Budget tokens** : 0

---

**Total estimé Phase 1-7** : ~74 000 tokens (bien en-dessous des usages réalistes avec cache efficace)

---

## 8. Points clés d'implémentation

### Cache Strategy
1. **BD (Vercel Postgres)** : Stocker JSON généré clé `${subject}_${level}_${contentType}_v1`
2. **Claude Prompt Caching** : System prompt fixe → 80% réduction input tokens
3. **Expiration** : 24h ou 100 hits (flexible)

### Token Budget
- **Warmup** : 15 subjects × 3 levels × 2000 = 60 000 (avec prompt cache: ~20 000)
- **Monthly active** (100 users, 5 quizzes/mois) : ~250 000 brut → ~50 000 net (cache 80%)

### Critical Gateways
- ✓ Phase 1.3 OK → Safe to spend tokens Phase 2-3
- ✓ Phase 3.1 + 3.2 OK → Reduce costs 50%+ → Scale feasible
- ✓ Cache warmup stable → Prod ready

---

## 9. Tech Decisions & Rationales

| Feature | Choice | Why |
|---------|--------|-----|
| Auth | NextAuth.js | Managed, secure, simple with Vercel |
| DB | Vercel Postgres | Native Vercel integration, serverless, free tier |
| Frontend | Next.js App Router | Modern, performant, Vercel optimized |
| Cache | DB + Prompt Caching | BD persistent, API prompt cache for tokens |
| LLM | Claude API | Powerful, affordable, Prompt Caching support |
| Styling | Tailwind + Custom | Fast dev, consistent design system |
| Video | HTML5 + react-player | Simple, no extra dependencies |

---

## 10. Environment Variables

```env
# .env.local (NEVER commit)

# Database
DATABASE_URL=postgres://...@...

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Claude API
CLAUDE_API_KEY=sk-ant-...

# Optional
VERCEL_ENV=development
```

---

## 11. Running the Project

```bash
# Install dependencies
npm install

# Setup database (run migrations)
npm run db:migrate

# Seed initial content
npm run seed

# Warmup cache (optional)
npm run cache:warmup

# Dev server
npm run dev

# Build for prod
npm run build
npm start

# Deploy to Vercel (automatic on push to main)
git push origin main
```

---

## 12. Key Contacts & Resources

- **Creator** : Chérif (tchérif@digiglesolutions.com)
- **Repo** : github.com/[username]/boussole-du-savoir
- **Deployment** : boussole-du-savoir.vercel.app
- **Claude API Docs** : https://claude.ai/docs
- **Vercel Docs** : https://vercel.com/docs

---

**Last updated** : 2026-07-26
**Status** : Architecture ready, awaiting Phase 1 implementation
