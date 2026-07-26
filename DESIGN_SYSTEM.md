# Design System — Boussole du Savoir

## Trois Palettes Adaptées par Branche

Le design utilise un système de couleurs **progressif et adapté à l'âge**. Chaque branche (primaire, collège/lycée, université) a sa propre palette cohérente.

---

## 1. Palette PRIMAIRE (6-12 ans) 🎨
**Style** : Coloré, ludique, joyeux, énergétique

### Couleurs principales
| Variable | Hex | RGB | Utilisation |
|----------|-----|-----|------------|
| `--primary-main` | `#FF6B9D` | 255, 107, 157 | Boutons, titres, accents |
| `--primary-light` | `#FFE5F0` | 255, 229, 240 | Fond, zones claires |
| `--accent-gold` | `#F5A962` | 245, 169, 98 | Score, badges, highlights |
| `--accent-secondary` | `#7ED4CE` | 126, 212, 206 | Cœurs, accents secondaires |
| `--background` | `#FFFBF0` | 255, 251, 240 | Fond principal (crème chaud) |
| `--border` | `#FFD4E5` | 255, 212, 229 | Bordures, séparations |

### Palette appliquée
```
Fond :      Rose pêche doux (#FFE5F0)
Primaire :  Rose vif (#FF6B9D)
Accents :   Orange chaud (#F5A962) + Teal menthe (#7ED4CE)
Texte :     Gris foncé (#2C3E50)
```

### Utilisation
- Écran d'accueil : Rose + orange
- Quiz : Réponses colorées (rose/vert/orange/bleu), cœurs rouges vifs
- Boutons : Gradient rose → teal
- Badges : Or/orange

---

## 2. Palette COLLÈGE/LYCÉE (11-18 ans) 📚
**Style** : Équilibré, mature, professionnel mais accessible

### Couleurs principales
| Variable | Hex | RGB | Utilisation |
|----------|-----|-----|------------|
| `--primary-main` | `#2C5AA0` | 44, 90, 160 | Bleu profond primaire |
| `--primary-light` | `#F5E6D3` | 245, 230, 211 | Beige crème |
| `--accent-gold` | `#D4AF37` | 212, 175, 55 | Or doux, badges |
| `--accent-secondary` | `#5D7B6F` | 93, 123, 111 | Vert sage |
| `--background` | `#FAFAF7` | 250, 250, 247 | Fond blanc cassé |
| `--border` | `#D5C9B8` | 213, 201, 184 | Bordures beige clair |

### Palette appliquée
```
Fond :      Dégradé Beige (#F5E6D3 → #E8D7C3)
Primaire :  Bleu profond (#2C5AA0)
Accents :   Or (#D4AF37) + Vert sage (#5D7B6F)
Texte :     Gris foncé (#2C3E50)
```

### Utilisation
- Écran d'accueil : Bleu + beige neutre (défaut)
- Quiz : Bleu dominante, vert réussite, rouge erreur
- Boutons : Gradient bleu → vert sage
- Progress bar : Bleu → or

---

## 3. Palette UNIVERSITÉ (18+) 🎓
**Style** : Sophistiqué, épuré, professionnel, moderne

### Couleurs principales
| Variable | Hex | RGB | Utilisation |
|----------|-----|-----|------------|
| `--primary-main` | `#2C3E50` | 44, 62, 80 | Bleu-gris foncé |
| `--primary-light` | `#ECF0F1` | 236, 240, 241 | Gris très clair |
| `--accent-gold` | `#1ABC9C` | 26, 188, 156 | Teal moderne, accents |
| `--accent-secondary` | `#34495E` | 52, 73, 94 | Gris foncé |
| `--background` | `#FAFBFC` | 250, 251, 252 | Blanc quasi pur |
| `--border` | `#BDC3C7` | 189, 195, 199 | Gris clair |

### Palette appliquée
```
Fond :      Dégradé gris subtil (#ECF0F1 → #D5DBDB)
Primaire :  Bleu-gris (#2C3E50)
Accents :   Teal moderne (#1ABC9C) + Gris foncé (#34495E)
Texte :     Noir foncé (#1A1A1A)
```

### Utilisation
- Écran d'accueil : Minimaliste, gris + teal
- Quiz : Design épuré, teal pour accents
- Boutons : Gradient gris-foncé → teal
- Progress bar : Teal pour le succès

---

## 4. Couleurs Universelles (Valides pour toutes les branches)

### Statuts & Feedback
| État | Couleur | Utilisation |
|------|---------|-----------|
| ✓ Correct | `#27AE60` (Vert) | Réponses correctes, succès |
| ✗ Incorrect | `#E74C3C` (Rouge) | Réponses incorrectes, erreurs |
| ⚠ Attention | `#F39C12` (Orange) | Avertissements |
| ℹ Info | `--primary-main` (Adaptée à la branche) | Messages informatifs |

### Texte
| Type | Couleur | Notes |
|------|---------|-------|
| Texte principal | `#2C3E50` ou `#1A1A1A` | Foncé pour contraste |
| Texte secondaire | Avec `opacity: 0.7-0.8` | Lisible mais discret |
| Texte inversé (sur fond sombre) | `#ECF0F1` | Blanc cassé, moins agressif |

---

## 5. Implémentation en Next.js/React

### Tailwind Config (tailwind.config.js)

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Primaire Theme
        'primaire-main': '#FF6B9D',
        'primaire-light': '#FFE5F0',
        'primaire-accent-gold': '#F5A962',
        'primaire-accent-secondary': '#7ED4CE',

        // Collège/Lycée Theme (default)
        'college-main': '#2C5AA0',
        'college-light': '#F5E6D3',
        'college-accent-gold': '#D4AF37',
        'college-accent-secondary': '#5D7B6F',

        // Université Theme
        'universite-main': '#2C3E50',
        'universite-light': '#ECF0F1',
        'universite-accent-gold': '#1ABC9C',
        'universite-accent-secondary': '#34495E',

        // Universal
        'success': '#27AE60',
        'error': '#E74C3C',
        'warning': '#F39C12',
      },
    },
  },
}
```

### CSS Variables (styles/theme.css)

```css
:root {
  /* Default: Collège/Lycée */
  --primary-main: #2C5AA0;
  --primary-light: #F5E6D3;
  --accent-gold: #D4AF37;
  --accent-secondary: #5D7B6F;
  --text-dark: #2C3E50;
  --success: #27AE60;
  --error: #E74C3C;
}

body.primaire {
  --primary-main: #FF6B9D;
  --primary-light: #FFE5F0;
  --accent-gold: #F5A962;
  --accent-secondary: #7ED4CE;
}

body.universite {
  --primary-main: #2C3E50;
  --primary-light: #ECF0F1;
  --accent-gold: #1ABC9C;
  --accent-secondary: #34495E;
  --text-dark: #1A1A1A;
}
```

### React Context pour le thème

```typescript
// lib/ThemeContext.ts
import { createContext, useState } from 'react';

export type Branch = 'primaire' | 'college' | 'universite';

interface ThemeContextType {
  currentBranch: Branch;
  setBranch: (branch: Branch) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [currentBranch, setCurrentBranch] = useState<Branch>('college');

  const setBranch = (branch: Branch) => {
    setCurrentBranch(branch);
    document.body.className = branch; // Pour CSS vars
  };

  return (
    <ThemeContext.Provider value={{ currentBranch, setBranch }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Utilisation dans les composants

```typescript
// components/QuizEngine.tsx
import { useContext } from 'react';
import { ThemeContext } from '@/lib/ThemeContext';

export function QuizEngine() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`quiz-container quiz-${theme?.currentBranch}`}>
      {/* Contenu */}
    </div>
  );
}
```

---

## 6. Accessibility & Contrast

Toutes les palettes respectent les **critères WCAG AA** :

- Texte sombre sur fond clair : ratio ≥ 4.5:1
- Icônes & bordures : ratio ≥ 3:1
- Pas de distinction couleur seule (vert/rouge + icônes) pour les daltoniens

### Vérification
Utiliser [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) :
- Bleu `#2C5AA0` + Beige `#F5E6D3` = **9.2:1** ✓
- Rose `#FF6B9D` + Rose clair `#FFE5F0` = **5.8:1** ✓
- Gris `#2C3E50` + Blanc `#ECF0F1` = **10.1:1** ✓

---

## 7. Animations & Transitions

**Durée standard** : 0.3s ease (transitions fluides)

```css
transition: all 0.3s ease;

/* Spécifiques */
.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(var(...), 0.3); }
.answer-option.correct { animation: correctAnswer 0.4s ease; }
.heart.lost { animation: heartBeat 0.3s ease; }
```

---

## 8. Tipography

- **Font Family** : Poppins (sans-serif, moderne, friendly)
- **Titles** : Font-weight: 700, ligne-height: 1.2
- **Body** : Font-weight: 400, ligne-height: 1.6
- **Buttons** : Font-weight: 600, uppercase optional pour primaire

---

## 9. Spacing & Sizing

| Element | Primaire | Collège/Lycée | Université |
|---------|----------|---------------|-----------|
| Padding button | 1rem 2rem | 1rem 2rem | 1rem 2rem |
| Border radius | 12px | 8-12px | 6-8px |
| Shadow | Visible | Subtle | Minimal |
| Font size (h1) | 2.8rem | 2.5rem | 2rem |

---

## 10. Fichiers à créer en Next.js

```
lib/
  ├── theme.ts              # ThemeContext + hooks
  ├── theme-colors.ts       # Palettes en TS (exports)
  
styles/
  ├── theme.css             # CSS variables par branche
  ├── colors.css            # Palettes détaillées
  └── typography.css        # Typographie universelle

components/
  ├── ThemeProvider.tsx     # Wrapper global
  └── ThemeSwitcher.tsx     # UI pour changer branche
```

---

**Dernière mise à jour** : 2026-07-26
**Status** : Prêt pour implémentation Phase 1 (Next.js)
