# Portfolio

Projet portfolio avec Next.js (frontend) et Express (backend).

## Structure du projet

```
portfolio/
├── frontend/          # Application Next.js
├── backend/           # Serveur Express
└── package.json       # Configuration monorepo
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

## Technologies

- **Frontend** : Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend** : Express, TypeScript, Node.js

