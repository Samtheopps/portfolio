# Guide de Contribution

## Structure des Branches

### Branches principales

- **`main`** : Code stable en production. Ne jamais commit directement dessus.
- **`dev`** : Branche d'intégration pour toutes les features testées.

### Workflow de développement

1. **Créer une nouvelle feature** :
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/nom-de-la-feature
   ```

2. **Développer et commiter** :
   ```bash
   git add .
   git commit -m "feat: description de la feature"
   git push -u origin feature/nom-de-la-feature
   ```

3. **Créer une Pull Request** :
   - Ouvrir une PR `feature/...` → `dev` sur GitHub
   - Attendre la review et merge

4. **Merger dev vers main** :
   - Quand plusieurs features sont stables sur `dev`
   - Créer une PR `dev` → `main` pour une release

## Convention de commits

Utiliser le format [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `docs:` : Documentation
- `style:` : Formatage, CSS
- `refactor:` : Refactoring
- `test:` : Tests
- `chore:` : Tâches de maintenance

Exemple : `feat: add contact form validation`

## Structure du code

### Frontend
```
frontend/
├── app/              # Pages Next.js (App Router)
├── components/       # Composants réutilisables
├── lib/              # Utilitaires et helpers
├── types/            # Types TypeScript
└── hooks/            # React hooks personnalisés
```

### Backend
```
backend/
├── src/
│   ├── routes/       # Routes Express
│   ├── controllers/  # Contrôleurs
│   ├── models/       # Modèles de données
│   ├── middleware/   # Middleware Express
│   └── utils/        # Utilitaires
```



