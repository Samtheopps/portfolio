# 🏗️ Architecture du Système de Contact

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                      │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ ContactButton   │→ │ ContactModal │→ │ ContactForm      │  │
│  │ (Déclencheur)   │  │ (Container)  │  │ (Validation+API) │  │
│  └─────────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP POST
                             │ /api/contact
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express)                        │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────────┐  │
│  │ Rate       │→ │ Validators │→ │ contactController       │  │
│  │ Limiter    │  │ (express-  │  │ (Business Logic)        │  │
│  │            │  │ validator) │  └─────────────┬───────────┘  │
│  └────────────┘  └────────────┘                │               │
│                                                 ▼               │
│                              ┌──────────────────────────────┐  │
│                              │ Contact Model (Mongoose)     │  │
│                              └──────────┬───────────────────┘  │
│                                         │                       │
│                                         ▼                       │
│                              ┌──────────────────────────────┐  │
│                              │ MongoDB Database             │  │
│                              │ (contacts collection)        │  │
│                              └──────────────────────────────┘  │
│                                                                 │
│                              ┌──────────────────────────────┐  │
│                              │ emailService (Nodemailer)    │  │
│                              │ → Gmail SMTP                 │  │
│                              └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Flux de données détaillé

### 1. Utilisateur clique sur "Contact Me"
```
ContactButton → setState(isModalOpen = true) → ContactModal s'affiche
```

### 2. Utilisateur remplit et soumet le formulaire
```
ContactForm
  ↓
react-hook-form (validation client Zod)
  ↓
onSubmit() → fetch POST /api/contact
  ↓
{
  email: "user@example.com",
  message: "Hello...",
  honeypot: "" // Vide = humain
}
```

### 3. Backend traite la requête
```
Express Server
  ↓
CORS check (origin autorisé ?)
  ↓
Rate Limiter (< 3 req/heure ?)
  ↓
express-validator (email valide ? message 10-5000 chars ?)
  ↓
contactController.handleContactForm()
  ├─ Honeypot check (vide ?)
  ├─ Récupération IP client
  ├─ Création document Contact (status: pending)
  ├─ Save MongoDB
  ├─ emailService.sendContactEmail()
  │   ├─ Création transporteur Nodemailer
  │   ├─ Génération template HTML
  │   ├─ Envoi via Gmail SMTP
  │   └─ Retry logic (3 tentatives)
  ├─ Update status → 'sent' ou 'failed'
  └─ Response JSON { success: true, message: "..." }
```

### 4. Frontend reçoit la réponse
```
ContactForm
  ↓
if (response.ok && result.success)
  ├─ Afficher message succès ✅
  ├─ Reset formulaire
  └─ Fermer modal après 2s
else
  └─ Afficher message erreur ❌
```

## Composants Frontend

### ContactButton.tsx
**Responsabilité** : Déclencheur de la modal
- State local `isModalOpen`
- Bouton stylisé avec animations
- Ouvre ContactModal

**Props** : Aucune (standalone)

**État** :
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
```

---

### ContactModal.tsx
**Responsabilité** : Container accessible de la modal
- Gestion overlay + backdrop
- Focus trap (tab reste dans modal)
- Fermeture ESC/click overlay
- Animations fade-in/slide-up
- Prévention scroll body

**Props** :
```typescript
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Accessibilité** :
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="modal-title"`
- Focus automatique sur ouverture
- Restauration focus à la fermeture

---

### ContactForm.tsx
**Responsabilité** : Logique formulaire + validation + API
- Gestion formulaire avec react-hook-form
- Validation Zod schema
- Champ honeypot invisible
- Appel API POST /api/contact
- Gestion états (loading, success, error)
- Messages feedback utilisateur

**Props** :
```typescript
interface ContactFormProps {
  onSuccess?: () => void; // Callback après envoi réussi
}
```

**État** :
```typescript
const [isLoading, setIsLoading] = useState(false);
const [submitStatus, setSubmitStatus] = useState<{
  type: 'success' | 'error' | null;
  message: string;
}>({ type: null, message: '' });
```

**Validation Zod** :
```typescript
const contactSchema = z.object({
  email: z.string().min(1).email().max(254),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0), // Doit être vide
});
```

## Modules Backend

### server.ts
**Responsabilité** : Point d'entrée Express
- Configuration middleware (helmet, cors, etc.)
- Connexion MongoDB
- Montage des routes
- Démarrage serveur

**Middleware ordre** :
1. `helmet()` - Sécurité headers
2. `cors()` - CORS contrôlé
3. `express.json()` - Parse JSON (limite 10kb)
4. `mongoSanitize()` - Anti-injection NoSQL
5. Routes applicatives

---

### config/database.ts
**Responsabilité** : Connexion MongoDB
- Pool de connexions (min 5, max 10)
- Timeouts configurés
- Event listeners (error, disconnect)
- Fermeture gracieuse (SIGINT)

**Fonction principale** :
```typescript
export const connectDatabase = async (): Promise<void>
```

---

### models/Contact.ts
**Responsabilité** : Schema Mongoose Contact

**Interface** :
```typescript
export interface IContact extends Document {
  email: string;
  message: string;
  ipAddress?: string;
  status: 'pending' | 'sent' | 'failed';
  honeypot?: string;
  createdAt: Date;
}
```

**Index** :
- `{ email: 1, createdAt: -1 }`
- `{ status: 1, createdAt: -1 }`

**Validation Mongoose** :
- Email : regex pattern, required, trim, lowercase
- Message : 10-5000 chars, required, trim
- Status : enum ['pending', 'sent', 'failed']

---

### middleware/rateLimiter.ts
**Responsabilité** : Limiter les requêtes par IP

**Configuration** :
```typescript
windowMs: 3600000 // 1 heure
max: 3            // 3 requêtes max
```

**Réponse si dépassé (429)** :
```json
{
  "success": false,
  "message": "Trop de tentatives...",
  "retryAfter": "1 heure"
}
```

---

### utils/emailService.ts
**Responsabilité** : Envoi emails via Nodemailer

**Fonction principale** :
```typescript
export const sendContactEmail = async (
  data: ContactEmailData,
  retries: number = 3
): Promise<boolean>
```

**Features** :
- Template HTML professionnel avec gradient
- Retry logic (3 tentatives avec 2s de délai)
- Timeout 10s par tentative
- Logs détaillés avec timestamp

**Template contient** :
- Email expéditeur (cliquable)
- Message (pre-wrap)
- Date/heure (format français)
- IP address (traçabilité)

---

### controllers/contactController.ts
**Responsabilité** : Business logic du contact

**Fonction principale** :
```typescript
export const handleContactForm = async (
  req: Request,
  res: Response
): Promise<Response>
```

**Étapes** :
1. ✓ Validation express-validator
2. ✓ Check honeypot (spam ?)
3. ✓ Récupération IP (avec x-forwarded-for)
4. ✓ Save Contact en DB (status: pending)
5. ✓ Envoi email via emailService
6. ✓ Update status ('sent' ou 'failed')
7. ✓ Response JSON

**Fonction bonus** :
```typescript
export const getContactStats = async (
  req: Request,
  res: Response
): Promise<Response>
```
Retourne : `{ total, sent, failed, pending }`

---

### routes/contact.ts
**Responsabilité** : Définition routes API

**Routes** :
```
POST /api/contact
  - Middleware: contactRateLimiter
  - Middleware: contactValidators (express-validator)
  - Handler: handleContactForm

GET /api/contact/stats
  - Handler: getContactStats
```

**Validators** :
```typescript
body('email').trim().isEmail().normalizeEmail()
body('message').trim().isLength({ min: 10, max: 5000 })
body('honeypot').optional().isString()
```

## Sécurité

### Protection Anti-Spam

1. **Honeypot** (Backend + Frontend)
   - Champ invisible pour humains
   - Si rempli → bot détecté
   - Réponse "succès" pour tromper les bots

2. **Rate Limiting**
   - 3 requêtes/heure max par IP
   - Fenêtre glissante 1 heure
   - Headers `RateLimit-*` dans réponse

3. **Validation stricte**
   - Frontend (Zod) + Backend (express-validator)
   - Email : format valide, max 254 chars
   - Message : 10-5000 chars obligatoire

### Protection Injections

1. **express-mongo-sanitize**
   - Supprime `$`, `.` dans les données utilisateur
   - Empêche injections NoSQL type `{ $gt: "" }`

2. **Validation Mongoose**
   - Schema strict avec types
   - Regex pattern pour email
   - maxlength appliqué

### Protection DoS

1. **Limite taille requête**
   - `express.json({ limit: '10kb' })`
   - Bloque requêtes > 10kb

2. **Rate Limiting**
   - Empêche flood de requêtes

3. **Timeouts**
   - MongoDB socket timeout : 45s
   - Nodemailer timeout : 10s
   - Évite connexions qui traînent

### Sécurité Headers (Helmet)

Helmet configure automatiquement :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security`
- etc.

### CORS Contrôlé

```typescript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST'],
})
```

Seul le frontend autorisé peut appeler l'API.

## Performance

### Backend

1. **Connexion MongoDB poolée**
   - Pool min 5, max 10 connexions
   - Réutilisation des connexions

2. **Index MongoDB**
   - Requêtes rapides sur email et status
   - `{ email: 1, createdAt: -1 }`

3. **Validation efficace**
   - express-validator sans boucles
   - Validation synchrone rapide

### Frontend

1. **Lazy loading modal**
   - Modal rendue seulement si `isOpen`
   - Pas de surcharge DOM inutile

2. **Debouncing implicite**
   - Rate limiter empêche spamming
   - Bouton désactivé pendant loading

3. **Code splitting Next.js**
   - Composants peuvent être chargés à la demande
   - `'use client'` pour composants interactifs uniquement

## Variables d'Environnement

### Backend (.env)
```env
MONGODB_URI           # Connexion MongoDB
EMAIL_HOST            # smtp.gmail.com
EMAIL_PORT            # 587 (STARTTLS)
EMAIL_USER            # Gmail address
EMAIL_PASS            # Gmail App Password (16 chars)
EMAIL_TO              # Email destination
RATE_LIMIT_WINDOW_MS  # Fenêtre rate limit (ms)
RATE_LIMIT_MAX        # Nombre max requêtes
PORT                  # Port serveur (5000)
NODE_ENV              # development/production
FRONTEND_URL          # URL frontend pour CORS
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL   # URL backend API (http://localhost:5000)
```

## Logs Backend

Format des logs :
```
[2026-01-21T14:30:00.000Z] ✓ Message sauvegardé en BD - ID: 507f1f77...
[2026-01-21T14:30:01.000Z] ✓ Email envoyé avec succès - ID: 1a2b3c4d...
[2026-01-21T14:30:02.000Z] ⚠ Rate limit dépassé - IP: 192.168.1.1
[2026-01-21T14:30:03.000Z] ✗ Erreur lors de l'envoi email: ...
```

Symboles :
- ✓ Succès
- ✗ Erreur
- ⚠ Warning
- → Action en cours
- ⟳ Retry

## Tests Manuels

### Test email
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","message":"Test message avec plus de 10 caracteres","honeypot":""}'
```

### Test rate limit
```bash
for i in {1..4}; do
  curl -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","message":"Test rate limit","honeypot":""}'
  echo ""
done
```

### Test honeypot
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"bot@spam.com","message":"Spam message","honeypot":"http://spam.com"}'
```
→ Devrait répondre 200 mais ne pas envoyer d'email

### Test validation
```bash
# Email invalide
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid","message":"Test","honeypot":""}'

# Message trop court
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","message":"Short","honeypot":""}'
```

## Améliorations Futures Possibles

1. **Authentification admin**
   - Route `/api/contact/stats` sécurisée
   - JWT ou session-based auth

2. **Dashboard admin**
   - Voir tous les messages
   - Marquer comme lu/non lu
   - Répondre directement

3. **Tests automatisés**
   - Jest + Supertest pour backend
   - React Testing Library pour frontend
   - Tests E2E avec Playwright

4. **Captcha**
   - Google reCAPTCHA v3
   - Alternative au honeypot

5. **Webhooks**
   - Notification Slack/Discord lors d'un nouveau message
   - Intégration Zapier

6. **Analytics**
   - Tracking taux de conversion
   - Temps de réponse moyen

7. **Internationalisation**
   - Messages en plusieurs langues
   - i18n avec next-intl

8. **Attachments**
   - Upload fichiers (CV, portfolio, etc.)
   - Multer + validation types MIME

---

**Dernière mise à jour** : 21 janvier 2026
