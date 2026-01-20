# Portfolio

Projet portfolio professionnel avec Next.js (frontend) et Express (backend).

## Structure du projet

```
portfolio/
├── frontend/              # Application Next.js
│   ├── app/              # Pages Next.js (App Router)
│   ├── components/       # Composants réutilisables
│   ├── lib/              # Utilitaires et helpers
│   ├── types/            # Types TypeScript
│   └── hooks/            # React hooks personnalisés
├── backend/               # Serveur Express
│   └── src/
│       ├── routes/       # Routes Express
│       ├── controllers/  # Contrôleurs
│       ├── middleware/   # Middleware Express
│       └── utils/        # Utilitaires
└── .github/              # Workflows CI/CD
```

## Installation

1. Installer toutes les dépendances :
```bash
npm run install:all
```

Ou manuellement :
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Développement

Pour démarrer le frontend et le backend simultanément :
```bash
npm run dev
```

Ou séparément :
- Frontend (Next.js) : `npm run dev:frontend` (port 3000)
- Backend (Express) : `npm run dev:backend` (port 3001)

## Build

Pour construire les deux projets :
```bash
npm run build
```

## Workflow Git

Ce projet utilise un workflow Git professionnel :

- **`main`** : Code stable en production
- **`dev`** : Branche d'intégration
- **`feature/*`** : Branches de fonctionnalités

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour plus de détails.

## Technologies

- **Frontend** : Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend** : Express, TypeScript, Node.js
- **CI/CD** : GitHub Actions

