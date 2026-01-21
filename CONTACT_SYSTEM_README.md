# 📬 Système de Contact Sécurisé - Portfolio MERN

Un système de contact complet et sécurisé pour portfolio, avec backend Express.js/MongoDB et frontend Next.js/React.

## 🚀 Stack Technique

### Backend
- **Express.js** - Framework Node.js
- **MongoDB** avec **Mongoose** - Base de données NoSQL
- **Nodemailer** - Envoi d'emails via SMTP Gmail
- **express-validator** - Validation des données
- **helmet** - Sécurité des headers HTTP
- **express-rate-limit** - Limitation de requêtes (anti-spam)
- **express-mongo-sanitize** - Protection contre injections NoSQL

### Frontend
- **Next.js 14** - Framework React
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas
- **Tailwind CSS** - Styling

## 📁 Structure du Projet

```
portfolio/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # Configuration MongoDB
│   │   ├── controllers/
│   │   │   └── contactController.ts # Logique métier contact
│   │   ├── middleware/
│   │   │   └── rateLimiter.ts       # Rate limiting (3 req/heure)
│   │   ├── models/
│   │   │   └── Contact.ts           # Schema Mongoose Contact
│   │   ├── routes/
│   │   │   └── contact.ts           # Routes API contact
│   │   ├── utils/
│   │   │   └── emailService.ts      # Service Nodemailer
│   │   └── server.ts                # Point d'entrée Express
│   ├── .env.example                 # Variables d'environnement exemple
│   └── package.json
│
└── frontend/
    ├── components/
    │   ├── ContactButton.tsx        # Bouton déclencheur modal
    │   ├── ContactModal.tsx         # Modal accessible avec animations
    │   └── ContactForm.tsx          # Formulaire avec validation
    ├── .env.example
    └── package.json
```

## 🛠️ Installation et Configuration

### 1. Backend Setup

#### a) Installation des dépendances
```bash
cd backend
npm install
```

#### b) Configuration MongoDB

Assurez-vous que MongoDB est installé et en cours d'exécution :

```bash
# Vérifier si MongoDB est installé
mongod --version

# Démarrer MongoDB (macOS avec Homebrew)
brew services start mongodb-community

# Ou démarrer manuellement
mongod --dbpath /path/to/data/db
```

#### c) Configuration Gmail SMTP

Pour utiliser Gmail pour envoyer des emails, vous devez créer un **App Password** :

1. Connectez-vous à votre compte Google
2. Allez dans **Paramètres de sécurité** : https://myaccount.google.com/security
3. Activez la **Validation en deux étapes** (si pas déjà fait)
4. Allez dans **Mots de passe des applications**
5. Sélectionnez "Mail" et votre appareil
6. Google génère un mot de passe de 16 caractères
7. Copiez ce mot de passe (vous ne pourrez pas le revoir)

#### d) Configuration des variables d'environnement

Créez un fichier `.env` à partir de `.env.example` :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos valeurs :

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-app-password-16-caracteres
EMAIL_TO=destination@email.com

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=3600000  # 1 heure
RATE_LIMIT_MAX=3              # 3 requêtes max

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### e) Démarrage du serveur backend

```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm run build
npm start
```

Le serveur démarre sur **http://localhost:5000**

### 2. Frontend Setup

#### a) Installation des dépendances
```bash
cd frontend
npm install
```

#### b) Configuration des variables d'environnement

Créez un fichier `.env.local` :

```bash
cp .env.example .env.local
```

Modifiez le fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### c) Démarrage de l'application frontend

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application démarre sur **http://localhost:3000**

## 🧪 Tester le Système

### 1. Test de l'API Backend directement

#### Test de santé
```bash
curl http://localhost:5000/api/health
```

Réponse attendue :
```json
{
  "status": "OK",
  "timestamp": "2026-01-21T...",
  "uptime": 42.123
}
```

#### Test d'envoi de message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "message": "Ceci est un message de test avec plus de 10 caractères.",
    "honeypot": ""
  }'
```

Réponse succès :
```json
{
  "success": true,
  "message": "Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais."
}
```

#### Test du rate limiting
Envoyez 4 requêtes rapidement, la 4ème devrait être bloquée :

```bash
# Répéter cette commande 4 fois
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Test rate limit","honeypot":""}'
```

Réponse 4ème requête (HTTP 429) :
```json
{
  "success": false,
  "message": "Trop de tentatives d'envoi de message. Veuillez réessayer dans 1 heure.",
  "retryAfter": "1 heure"
}
```

#### Voir les statistiques
```bash
curl http://localhost:5000/api/contact/stats
```

Réponse :
```json
{
  "success": true,
  "stats": {
    "total": 5,
    "sent": 3,
    "failed": 1,
    "pending": 1
  }
}
```

### 2. Test du Frontend

1. Ouvrez **http://localhost:3000**
2. Importez et utilisez le composant `ContactButton` dans votre page :

```tsx
import ContactButton from '@/components/ContactButton';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ContactButton />
    </div>
  );
}
```

3. Cliquez sur le bouton "Contact Me"
4. Remplissez le formulaire et envoyez
5. Vérifiez :
   - L'email reçu
   - Les logs backend dans le terminal
   - L'entrée dans MongoDB

### 3. Vérifier MongoDB

```bash
# Connexion à MongoDB
mongosh

# Utiliser la base de données
use portfolio

# Lister les contacts
db.contacts.find().pretty()

# Compter les messages par statut
db.contacts.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
```

## 🔒 Sécurité Implémentée

### Backend
- ✅ **Helmet** - Headers HTTP sécurisés
- ✅ **CORS** - Origine contrôlée
- ✅ **Rate Limiting** - 3 requêtes/heure max par IP
- ✅ **MongoDB Sanitization** - Protection contre injections NoSQL
- ✅ **Validation stricte** - express-validator sur toutes les données
- ✅ **Limite de taille** - 10kb max pour les requêtes
- ✅ **Honeypot** - Champ invisible pour détecter les bots
- ✅ **Trust proxy** - Récupération correcte de l'IP réelle

### Frontend
- ✅ **Validation Zod** - Schéma strict côté client
- ✅ **Honeypot** - Champ caché invisible
- ✅ **Gestion erreurs** - Messages clairs pour l'utilisateur
- ✅ **Accessibilité** - Focus trap, ESC, ARIA labels

## 📧 Template Email

L'email envoyé contient :
- **Email de l'expéditeur** (cliquable)
- **Message formaté** (pre-wrap pour conserver les sauts de ligne)
- **Date et heure** (format français complet)
- **Adresse IP** (pour traçabilité)
- **Design professionnel** (gradient purple/indigo, responsive)

## 🐛 Troubleshooting

### Problème : MongoDB ne se connecte pas
```bash
# Vérifier si MongoDB est en cours d'exécution
ps aux | grep mongod

# Relancer MongoDB
brew services restart mongodb-community
```

### Problème : Email non envoyé
- Vérifiez que l'**App Password Gmail** est correct (16 caractères)
- Vérifiez que la **validation en deux étapes** est activée sur Gmail
- Consultez les logs backend pour l'erreur exacte
- Testez avec un autre compte email si nécessaire

### Problème : CORS error
- Vérifiez que `FRONTEND_URL` dans `.env` backend correspond à l'URL frontend
- Vérifiez que `NEXT_PUBLIC_API_URL` dans `.env.local` frontend est correct

### Problème : Rate limit trop strict en développement
Modifiez `.env` backend :
```env
RATE_LIMIT_WINDOW_MS=60000  # 1 minute au lieu de 1 heure
RATE_LIMIT_MAX=10           # 10 requêtes au lieu de 3
```

## 📝 Utilisation dans votre Portfolio

### Exemple d'intégration dans une page Next.js

```tsx
// app/page.tsx ou pages/index.tsx
import ContactButton from '@/components/ContactButton';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Mon Portfolio
        </h1>
        
        {/* ... Votre contenu ... */}
        
        <div className="flex justify-center mt-12">
          <ContactButton />
        </div>
      </section>
    </main>
  );
}
```

### Personnalisation du style

Le bouton et la modal utilisent **Tailwind CSS** et peuvent être facilement personnalisés :

- `ContactButton.tsx` : Modifiez les classes du bouton
- `ContactModal.tsx` : Changez les couleurs du header
- `ContactForm.tsx` : Adaptez les styles des inputs

## 🚀 Déploiement en Production

### Backend (exemple avec Render, Railway, etc.)

1. Créez une base MongoDB sur **MongoDB Atlas**
2. Mettez à jour `MONGODB_URI` avec l'URL Atlas
3. Configurez toutes les variables d'environnement sur votre plateforme
4. Déployez le dossier `backend/`

### Frontend (exemple avec Vercel)

1. Configurez `NEXT_PUBLIC_API_URL` avec l'URL de votre backend en production
2. Déployez avec `vercel` ou connectez votre repo GitHub

## 📚 Documentation JSDoc

Tous les fichiers backend et frontend contiennent une documentation JSDoc complète :
- Description des fonctions
- Types des paramètres
- Valeurs de retour
- Erreurs possibles

## 📄 Licence

Ce système de contact est open source et peut être utilisé librement dans vos projets.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Développé avec ❤️ pour les développeurs de portfolio**
