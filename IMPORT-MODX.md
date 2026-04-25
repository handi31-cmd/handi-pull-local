# Guide d'import MODx — Page d'accueil HandiPro31
> Version v2 — alignée Figma — 17/04/2026
> Procéder fichier par fichier, dans l'ordre indiqué. Tester après chaque étape.

---

## ORDRE D'IMPORT

### 1. `assets/css/accueil.css` ⚠️ REMPLACER
**MODx :** Gestionnaire de fichiers → `assets/css/accueil.css`
**Action :** Remplacer le contenu complet par le fichier local.
**Risque :** Aucun — fichier dédié à la page d'accueil uniquement.
**Test :** Vérifier que les couleurs de fond des sections changent (vert, blanc, orange).

---

### 2. `assets/css/footer.css` ⚠️ MODIFIER (2 points uniquement)
**MODx :** Gestionnaire de fichiers → `assets/css/footer.css`
**Action :** 2 modifications chirurgicales UNIQUEMENT :
- Les `h4` : `color: #4BA78C` + `border-bottom: 2px solid #4BA78C` (était `#fff`)
- `.hp-footer-logo img` : supprimer `filter: brightness(0) invert(1)`

**⛔ NE PAS TOUCHER** au reste du fichier — styles footer existants du site.
**Test :** Titres "Navigation / Informations / Contact" passent en vert, logo HandiPro31 en couleur.

---

### 3. `assets/js/actu-slider.js` — NOUVEAU FICHIER
**MODx :** Gestionnaire de fichiers → `assets/js/` → Uploader le fichier.
**Action :** Upload simple, n'écrase rien.
**Test :** Slider actualités fonctionne (prev/next/dots).

---

### 4. `assets/js/partenaires-slider.js` — NOUVEAU FICHIER
**MODx :** Gestionnaire de fichiers → `assets/js/` → Uploader le fichier.
**Action :** Upload simple, n'écrase rien.
**Test :** Animation défilement partenaires active, pausée au survol.

---

### 5. `assets/chunks/footer-site.html` — NOUVEAU CHUNK
**MODx :** Éléments → Chunks → Créer → Nom : `footerSite`
**Action :** Coller le contenu du fichier local. Remplacer les `[[~alias]]` par les vrais IDs de ressources MODx.
**⛔ NE PAS CONFONDRE** avec `footer.html` (template email — ne pas toucher).
**Test :** Footer s'affiche avec carte, 3 colonnes, copyright.

---

### 6. `assets/chunks/accueil.html` — CHUNK PRINCIPAL
**MODx :** Éléments → Chunks → Créer (ou modifier) → Nom : `ChunkAccueil`
**Action :** Coller le contenu du fichier local. Remplacer les `[[~alias]]` par les vrais IDs.
**Alias MODx à vérifier :**
| Placeholder | Ressource cible |
|---|---|
| `[[~contact]]` | Page Contact |
| `[[~crehi]]` | Page CREHI |
| `[[~capemploi]]` | Page Cap Emploi |
| `[[~handiproconseil]]` | Page HandiPro Conseil |
| `[[~candidats]]` | Page Candidats |
| `[[~employeurs]]` | Page Employeurs |
| `[[~partenaires]]` | Page Partenaires |
| `[[~actu_haero]]` | Article Haéro |

**Test :** Page d'accueil affiche les 6 sections dans l'ordre.

---

### 7. `assets/components/template-accueil.html` — TEMPLATE MODx
**MODx :** Éléments → Modèles → Modifier "Template Accueil" (ou créer)
**Action :** Coller le contenu du fichier local.
**Vérifie que ces lignes sont présentes :**
```
<link rel="stylesheet" href="[[++assets_url]]css/accueil.css" />
<link rel="stylesheet" href="[[++assets_url]]css/footer.css" />
<script src="[[++assets_url]]js/actu-slider.js" defer></script>
<script src="[[++assets_url]]js/partenaires-slider.js" defer></script>
```
**Test :** Assigner ce template à la Resource Accueil → vider le cache → tester sur handipro31.fr.

---

## IMAGES À UPLOADER AVANT L'IMPORT

| Image | Emplacement MODx | Statut |
|---|---|---|
| `hero-equipe.jpg` | `assets/images/` | ⬜ À uploader |
| `actu-haero-2026.jpg` | `assets/images/` | ⬜ À uploader |
| `logo-fondation-handicap.png` | `assets/images/` | ⬜ À uploader |
| `logoCREHI.png` | `assets/images/` | ✅ Existe |
| `LogoCapEmploi.png` | `assets/images/` | ✅ Existe |
| `LogoHandiproConseil.jpg` | `assets/images/` | ✅ Existe |
| `LogoHandipro31.png` | `assets/images/` | ✅ Existe |
| `LogoAGEFIPH.jpg` | `assets/images/` | ✅ Existe |
| `LogoFIPHFP.jpg` | `assets/images/` | ✅ Existe |
| `LogoMissionLocales.png` | `assets/images/` | ✅ Existe |
| `LogoAutonomia.jpg` | `assets/images/` | ✅ Existe |
| `LogoFranceTravail.png` | `assets/images/` | ✅ Existe |

---

## FICHIERS À NE PAS TOUCHER

| Fichier | Raison |
|---|---|
| `assets/css/reset.css` | Reset global — ne jamais modifier |
| `assets/css/style.css` | Layout sidebar pages intérieures |
| `assets/css/header.css` | Header existant qui fonctionne |
| `assets/chunks/header.html` | Header MODx avec `[[!menuDropdown]]` |
| `assets/chunks/footer.html` | Template email — pas le footer du site |
| `assets/js/dropdown.js` | Menu navigation existant |
| `assets/js/boutonTop.js` | Bouton retour haut existant |
| Tous les fichiers `assets/components/formit/` | Plugin FormIt |
| Tous les fichiers `assets/components/tinymce/` | Plugin TinyMCE |
| Tous les fichiers `assets/components/migx/` | Plugin MIGX |

---

## CHECKLIST FINALE AVANT MISE EN LIGNE

- [ ] Images hero-equipe.jpg et actu-haero-2026.jpg uploadées
- [ ] Tous les `[[~alias]]` remplacés par les vrais IDs
- [ ] Cache MODx vidé (`Outils → Vider le cache`)
- [ ] Test desktop 1280px
- [ ] Test tablette 768px (DevTools)
- [ ] Test mobile 375px (DevTools)
- [ ] Navigation clavier Tab/Entrée fonctionnelle
- [ ] Slider actualités prev/next/dots fonctionnel
- [ ] Défilement partenaires actif
- [ ] Footer carte Google Maps affichée
- [ ] Aucune régression sur les autres pages du site
