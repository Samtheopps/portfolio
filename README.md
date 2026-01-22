# 🚀 Portfolio

Portfolio personnel moderne et interactif construit avec **Next.js 14** et **Express.js**, présentant des animations fluides et un système de contact sécurisé.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Fonctionnalités

### Frontend
- 🎨 **Design moderne** avec Tailwind CSS et animations GSAP
- 📱 **Responsive** - Optimisé pour mobile, tablette et desktop
- ⚡ **Performance** - Next.js App Router avec optimisations automatiques
- 🌊 **Animations fluides** - Aurora background, scroll reveals, text animations
- 🍔 **Menu interactif** - Menu latéral avec animations staggered
- 📬 **Formulaire de contact** - Modal accessible avec validation Zod

### Backend
- 🔒 **Sécurité renforcée** - Helmet, CORS, rate limiting, sanitization
- 📧 **Envoi d'emails** - Nodemailer avec template HTML professionnel
- 🛡️ **Anti-spam** - Rate limiting (3 req/h) + honeypot
- 🗄️ **Base de données** - MongoDB avec Mongoose
- ✅ **Validation** - express-validator sur toutes les entrées

---

## 🛠️ Stack Technique

| Frontend | Backend |
|----------|---------|
| Next.js 14 (App Router) | Express.js |
| React 18 | MongoDB / Mongoose |
| TypeScript | Nodemailer |
| Tailwind CSS | Helmet / CORS |
| GSAP & Motion | express-rate-limit |
| React Hook Form + Zod | express-validator |
| Lucide React Icons | express-mongo-sanitize |

---

## 📁 Structure du Projet

```
portfolio/
├── frontend/                   # Application Next.js
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── about/             # Page À propos
│   │   └── projects/          # Page Projets
│   ├── components/             # Composants React
│   │   ├── Aurora.tsx         # Background animé
│   │   ├── ContactButton.tsx  # Bouton contact + modal
│   │   ├── ContactForm.tsx    # Formulaire validé
│   │   ├── ContactModal.tsx   # Modal accessible
│   │   ├── ScrollFloat.tsx    # Animation texte au scroll
│   │   ├── ScrollRevealSection.tsx
│   │   ├── SplitText.tsx      # Animation split text
│   │   ├── StaggeredMenu.tsx  # Menu latéral animé
│   │   └── TextReveal.tsx     # Révélation de texte
│   ├── lib/                    # Utilitaires
│   └── types/                  # Types TypeScript
│
├── backend/                    # Serveur Express
│   └── src/
│       ├── server.ts          # Point d'entrée
│       ├── config/
│       │   └── database.ts    # Connexion MongoDB
│       ├── controllers/
│       │   └── contactController.ts
│       ├── middleware/
│       │   └── rateLimiter.ts # Rate limiting
│       ├── models/
│       │   └── Contact.ts     # Modèle Mongoose
│       ├── routes/
│       │   └── contact.ts     # Routes API
│       └── utils/
│           └── emailService.ts # Service email
│
└── package.json               # Scripts monorepo
```

---

## 🚀 Installation

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Compte Gmail (pour l'envoi d'emails)

### 1. Cloner le projet
```bash
git clone <repo-url>
cd portfolio
```

### 2. Installer les dépendances
```bash
npm run install:all
```

### 3. Configuration Backend

Créer `backend/.env` :
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-app-password-16-chars
EMAIL_TO=destination@email.com

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

> 💡 **Gmail App Password** : Allez dans [Google Account Security](https://myaccount.google.com/security) → Validation en 2 étapes → Mots de passe des applications

### 4. Configuration Frontend

Créer `frontend/.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 💻 Développement

### Démarrer le projet complet
```bash
npm run dev
```
- Frontend : http://localhost:3000
- Backend : http://localhost:5000

### Démarrer séparément
```bash
npm run dev:frontend   # Next.js sur port 3000
npm run dev:backend    # Express sur port 5000
```

---

## 🏗️ Build & Production

```bash
# Build complet
npm run build

# Build séparé
npm run build:frontend
npm run build:backend
```

---

## 📡 API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Envoyer un message |
| `GET` | `/api/contact/stats` | Statistiques des messages |

### Exemple d'envoi de message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "message": "Bonjour, ceci est un message de test.",
    "honeypot": ""
  }'
```

---

## 🔒 Sécurité

| Protection | Description |
|------------|-------------|
| **Helmet** | Headers HTTP sécurisés |
| **CORS** | Origine contrôlée |
| **Rate Limiting** | 3 requêtes/heure par IP |
| **Honeypot** | Détection automatique des bots |
| **Validation** | Côté client (Zod) + serveur (express-validator) |
| **Sanitization** | Protection injection NoSQL |

---

## 🎨 Composants d'Animation

| Composant | Description |
|-----------|-------------|
| `Aurora` | Background avec effet aurora borealis |
| `ScrollFloat` | Texte qui flotte et disparaît au scroll |
| `TextReveal` | Révélation mot par mot au scroll |
| `SplitText` | Animation lettre par lettre |
| `ScrollRevealSection` | Sections qui apparaissent au scroll |
| `StaggeredMenu` | Menu avec animations décalées |

---

## 📝 Scripts Disponibles

```bash
npm run dev           # Dev frontend + backend
npm run dev:frontend  # Dev frontend uniquement
npm run dev:backend   # Dev backend uniquement
npm run build         # Build complet
npm run install:all   # Installer toutes les dépendances
```

---

## 🌿 Workflow Git

- **`main`** : Code stable en production
- **`dev`** : Branche d'intégration
- **`feature/*`** : Branches de fonctionnalités

---

## 📄 Licence

MIT

---

<p align="center">
  Développé avec ❤️ par <strong>Sami</strong>
</p>

