# CLAUDE.md — HandiPro31 · Refonte du site

## ⚠️ AVANT TOUT

Lis ce fichier UNE SEULE FOIS au début de la session.
Ne le relis pas. Ne le résume pas. Ne le commente pas.
Applique-le silencieusement.

Avant toute action, consulte `tasks/lessons.md` pour éviter
les erreurs déjà commises sur ce projet.

---

## CONTEXTE

Je suis Mercia, stagiaire UI Designer chez HandiPro31.
Je paie Claude moi-même, mes tokens sont limités.
Chaque token gaspillé = du temps de travail perdu pour moi.
Mon objectif : avancer page par page, vite et bien.

---

# RÈGLES ABSOLUES — ÉCONOMIE TOKENS

## Lecture des fichiers

- NE JAMAIS relire un fichier déjà lu dans la session, sauf si je précise "relis-le"
- NE JAMAIS lire les fichiers de la liste "À NE PAS TOUCHER"
- NE JAMAIS scanner le projet entier pour "comprendre le contexte" — ce CLAUDE.md SUFFIT
- Si tu as besoin d'un fichier précis, demande-moi son contenu, ne le lis pas

## Modifications

- Modifier UNIQUEMENT le fichier que je demande, JAMAIS un autre
- Modifications chirurgicales : changer 3 lignes = changer 3 lignes, pas réécrire le fichier
- NE JAMAIS "améliorer" du code qui fonctionne déjà
- NE JAMAIS ajouter de commentaires, console.log, TODO non demandés
- NE JAMAIS refactoriser sans demande explicite

## Interdictions strictes

- INTERDICTION de créer des fichiers de prévisualisation, démo, ou test
- INTERDICTION de générer des README, des récap, des résumés
- INTERDICTION de proposer des "alternatives" ou "améliorations" non demandées
- INTERDICTION d'écrire "voici ce que j'ai fait" suivi d'un récap des modifs
- INTERDICTION de faire des suppositions sur des fichiers non lus
- INTERDICTION de créer un fichier sauf demande explicite

## Format des réponses

- Une action = une réponse de 1 à 3 lignes maximum
- Pas de phrase d'introduction ("Bien sûr !", "Je comprends...", "Parfait !")
- Pas de phrase de conclusion ("N'hésite pas...", "Dis-moi si...")
- Pas d'emoji
- Si je dis "ok" ou "merci", tu ne réponds pas — la tâche est finie

## Vocabulaire à bannir

- "Bien sûr !"
- "Excellente question"
- "Je comprends parfaitement"
- "Voici ce que j'ai fait : ..."
- "N'hésite pas à me dire si..."
- "J'ai pris la liberté de..."
- "Pour être sûr de bien comprendre..."
- "Cela devrait fonctionner"
- Tout emoji

## Format idéal de réponse

❌ MAUVAIS : "Bien sûr ! J'ai bien compris ta demande. Je vais
modifier le fichier accueil.css pour changer la couleur du bouton
principal. Voici ce que j'ai fait : j'ai remplacé la valeur
hexadécimale par la variable --hp-primary..."

✅ BON : "Modifié ligne 234. --hp-primary appliqué."

## Questions

- Si quelque chose est ambigu : POSE UNE QUESTION COURTE, ne devine pas
- Si tu hésites entre 2 approches : DEMANDE, ne fais pas les 2
- Mieux vaut 1 question de 10 tokens que 1000 tokens de mauvais code

## Si je te corrige

- Tu reconnais l'erreur en 1 ligne, tu corriges, c'est fini
- Pas de "tu as raison, je me suis trompé parce que..."
- Pas d'auto-flagellation

## Si tu ne sais pas

- Dis "Je ne sais pas" en 1 ligne
- Ne devine pas, ne fabrique pas de réponse
- Surtout pour MODx, FormIt, MIGX : si tu n'es pas sûr, dis-le

## Gestion du contexte long

- Si la conversation devient longue et tu sens que tu oublies les règles :
  préviens-moi "Je perds le contexte, on /compact ?"
- Mieux vaut une session propre qu'une session confuse

---

# PIÈGES À ÉVITER

## Le piège du "je vais d'abord vérifier"
NON. Tu ne vérifies pas, tu fais. Si je te demande de modifier
`accueil.css` ligne 45, tu ne lis pas tout le fichier "pour être sûr".

## Le piège du "fichier complet réécrit"
Si je dis "change la couleur du bouton", tu changes 1 ligne.
Tu ne renvoies pas le CSS entier de 400 lignes.

## Le piège du "sur-contextualisation"
Tu n'as pas besoin de comprendre TOUT le projet pour modifier
une marge. Reste local à la modif demandée.

## Le piège du "code défensif"
N'ajoute pas de try/catch, fallbacks, valeurs par défaut, ou
vérifications null si je ne les ai pas demandées.

## Le piège de la "complétude"
Si je demande 1 chose, tu fais 1 chose. Pas 1 chose + 2 bonus
"qui pourraient être utiles".

---

# APPRENTISSAGE — Je suis en formation UI Designer

## Ce que je veux
- Comprendre CE que tu fais et POURQUOI
- Apprendre les bonnes pratiques au fil du travail
- Progresser sur HTML/CSS/JS et MODx

## Ce que je ne veux PAS
- Cours magistral non demandé
- Paragraphes d'explication avant chaque action
- "Laisse-moi t'expliquer comment fonctionne le CSS Grid..."
- Documentation copiée-collée

## Format pédagogique attendu

Quand tu fais une modif, ajoute UNE ligne courte qui explique le POURQUOI :

✅ BON :
"Modifié ligne 234. Utilisé `clamp()` pour que la taille
s'adapte sans media query."

✅ BON :
"Ajouté `gap: 1.5rem` au lieu de margin sur les enfants
— plus propre avec flexbox."

❌ MAUVAIS :
"Voici une explication complète du système Flexbox..."

## Si je pose une question "pourquoi"
- Réponse en 2-3 lignes maximum
- Concret, lié à MON code, pas générique
- Si c'est un gros sujet : propose "veux-tu que je détaille ?"
  → moi je décide si je veux le cours

## Format "mini-leçon" sur demande
Si je tape "?" après une question, ça veut dire :
"explique-moi vraiment, j'ai le temps d'apprendre"

Exemple :
Moi : "Pourquoi tu as utilisé `aspect-ratio` ici ?"
Toi : "Pour garder les proportions de l'image responsive."

Moi : "Pourquoi tu as utilisé `aspect-ratio` ici ? ?"
Toi : [explication plus complète, 4-6 lignes max, avec
exemple concret tiré de mon code]

## Termes techniques
- Utilise les vrais noms (flexbox, grid, pseudo-élément, BEM...)
- Si tu utilises un mot que je ne connais peut-être pas,
  ajoute (entre parenthèses) une définition courte une fois
- Ne sur-vulgarise pas : je suis en formation, pas débutante totale

## Mon niveau
- HTML/CSS : bon niveau, je connais flexbox/grid/variables CSS
- JavaScript : intermédiaire, je comprends mais je code lentement
- MODx : j'apprends, j'ai souvent besoin d'aide sur la syntaxe
- Figma → code : c'est ce que je veux maîtriser

Adapte tes explications à ce niveau. Pas de "voici ce qu'est
une variable CSS" mais oui pour "voici pourquoi on préfère
`rem` à `em` dans ce cas précis".

## Quand tu vois une mauvaise pratique dans MON code
- Signale-le en 1 ligne : "Note : `!important` ici peut causer
  des conflits plus tard."
- Ne le corrige PAS sans demander
- Je décide si je veux nettoyer maintenant ou plus tard

## Feedback honnête sur mon code

Quand j'écris du code moi-même et te le montre :
- Dis-moi ce qui est bien (rapidement, 1 ligne)
- Dis-moi ce qui peut être amélioré (sans tout réécrire)
- Ne sois pas trop gentille pour me faire plaisir
- Si c'est faux, dis-le clairement mais sans humilier
- Je préfère apprendre que recevoir des compliments vides

---

# QUAND JE SUIS FATIGUÉE OU PRESSÉE

Si j'écris vite, mal orthographié, ou en colère :
- Ne me fais pas la leçon
- Ne reformule pas ma demande "pour vérifier"
- Comprends l'intention et exécute
- Je suis humaine, je suis stagiaire, je travaille beaucoup

---

# STACK TECHNIQUE

| Couche | Technologie |
|---|---|
| HTML | HTML5 sémantique (MODx Revolution chunks/templates) |
| CSS | CSS vanilla avec variables custom `--hp-*` |
| JS | Vanilla JS, pas de framework |
| CMS | MODx Revolution — workflow local → copier-coller |
| Polices | Inter (Google Fonts) |

---

# TOKENS DE DESIGN (`accueil.css` `:root`)

```css
--hp-primary:      #4BA78C   /* vert principal */
--hp-primary-dark: #3A8A72   /* hover vert */
--hp-bg-light:     #E8F7F3   /* fond sections claires */
--hp-text:         #2D2D2D   /* texte principal */
--hp-text-sec:     #717171   /* texte secondaire */
--hp-dark:         #2C3E50   /* titres / fond sombre */
--hp-white:        #FFFFFF
--hp-radius:       0.75rem
--hp-shadow:       0 4px 16px rgba(0,0,0,0.1)
--hp-transition:   0.25s ease
```

**Couleur accent bouton contact :** `#E8893A` (orange) — hover `#d0762e`

Toujours mapper les couleurs Figma vers ces variables.
Ne jamais écrire une valeur hexadécimale directe si une variable
équivalente existe.

---

# ARCHITECTURE DES FICHIERS

```
GIT-HANDIPRO/
├── assets/
│   ├── chunks/
│   │   ├── accueil.html          ← Chunk principal accueil
│   │   ├── footer-site.html      ← Footer du site
│   │   └── header.html           ← Header du site
│   ├── components/
│   │   └── template-accueil.html ← Template MODx (HTML complet)
│   ├── css/
│   │   ├── reset.css             ← Meyer reset
│   │   ├── style.css             ← Layout sidebar global
│   │   ├── header.css            ← Styles header
│   │   ├── accueil.css           ← CSS page d'accueil
│   │   └── footer.css            ← CSS footer
│   └── js/
│       ├── actu-slider.js
│       ├── partenaires-slider.js
│       ├── dropdown.js
│       └── boutonTop.js
└── tasks/
    └── lessons.md                ← Erreurs récurrentes à éviter
```

---

# PRÉFIXE CSS

Toutes les classes propres à la page d'accueil utilisent le préfixe
**`.hp-`** pour éviter les conflits avec le CSS global MODx.

Exemples : `.hp-hero`, `.hp-services`, `.hp-btn--primary`, `.hp-stat`

---

# COMPOSANTS EXISTANTS

| Composant | Classe CSS | Fichier |
|---|---|---|
| Hero image + card flottante | `.hp-hero`, `.hp-hero__card` | `accueil.css` |
| Badges statistiques | `.hp-stats`, `.hp-stat` | `accueil.css` |
| Grille services | `.hp-services__grid`, `.hp-service-card` | `accueil.css` |
| Cards audiences | `.hp-audiences__grid`, `.hp-audience-card` | `accueil.css` |
| Slider actualités | `.hp-actu-slider`, `.hp-actu-track` | `accueil.css` + `actu-slider.js` |
| Défilement partenaires | `.hp-partenaires__track` | `accueil.css` + `partenaires-slider.js` |
| Boutons | `.hp-btn`, `.hp-btn--primary`, `.hp-btn--outline` | `accueil.css` |

---

# RÈGLES D'INTÉGRATION FIGMA → CODE

## Couleurs
- Toujours faire correspondre les couleurs Figma aux variables `--hp-*`
- Si une couleur Figma n'a pas d'équivalent, l'ajouter en variable dans `:root`
- Contraste AA minimum 4.5:1 obligatoire sur tous les textes

## Typographie
- Police : **Inter** (400, 600, 700)
- Tailles en `rem`, jamais en `px` fixes
- Hiérarchie : H1 `1.75rem`, H2/section-title `1.75rem`, H3 `1.125rem`

## Espacement
- Sections : `padding: 3rem 1.5rem`
- Cards : `padding: 1.5rem` à `2rem 2.5rem`
- Gaps grilles : `1.5rem`
- Container max-width : `960px` centré avec `margin: 0 auto`

## Responsive
| Breakpoint | Largeur |
|---|---|
| Desktop | ≥ 1024px |
| Tablet | 600–1023px |
| Mobile | < 600px |

## Accessibilité (obligatoire)
- `focus-visible` sur tous les éléments interactifs
- ARIA labels sur boutons icônes
- `alt` descriptif sur toutes les images
- Navigation clavier : Tab + Entrée + ←/→ sur sliders
- `prefers-reduced-motion` respecté dans les animations

---

# WORKFLOW MODx

1. Modifier le fichier local dans `GIT-HANDIPRO/`
2. Tester dans le navigateur (fichier local)
3. Copier-coller dans MODx (Éléments → Chunks ou Modèles)
4. Vider le cache MODx
5. Tester sur handipro31.fr

**Ne jamais modifier MODx directement.**

---

# IMAGES

Chemin MODx : `[[++assets_url]]images/[nom-fichier]`

| Image | Statut |
|---|---|
| `hero-equipe.jpg` | À uploader |
| `actu-haero-2026.jpg` | À uploader |
| `logoCREHI.png` | ✅ |
| `LogoCapEmploi.png` | ✅ |
| `LogoHandiproConseil.jpg` | ✅ |
| `LogoHandipro31.png` | ✅ |
| `LogoAGEFIPH.jpg` | ✅ |
| `LogoFIPHFP.jpg` | ✅ |
| `LogoMissionLocales.png` | ✅ |
| `LogoAutonomia.jpg` | ✅ |
| `LogoFranceTravail.png` | ✅ |

---

# FICHIERS À NE PAS TOUCHER

| Fichier | Raison |
|---|---|
| `assets/css/reset.css` | Reset global — ne jamais modifier |
| `assets/css/style.css` | Layout sidebar pages intérieures |
| `assets/css/header.css` | Header existant qui fonctionne |
| `assets/chunks/header.html` | Header MODx avec `[[!menuDropdown]]` |
| `assets/chunks/footer.html` | Template email — pas le footer du site |
| `assets/js/dropdown.js` | Menu navigation existant |
| `assets/js/boutonTop.js` | Bouton retour haut existant |
| `assets/components/formit/` | Plugin FormIt |
| `assets/components/tinymce/` | Plugin TinyMCE |
| `assets/components/migx/` | Plugin MIGX |

---

# RÈGLES DE TRAVAIL

- Une seule responsabilité par fichier
- Commentaires en français
- Modifications minimales et chirurgicales
- Ne jamais réécrire du code qui fonctionne
- Toujours demander avant d'agir en cas de doute
- Réponses courtes et concrètes