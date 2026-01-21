import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import path from 'path';
import { connectDatabase } from './config/database';
import contactRoutes from './routes/contact';

// Charger .env.local en priorité, sinon .env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDatabase();

// Middleware de sécurité
app.use(helmet()); // Sécurise les headers HTTP

// Configuration CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  })
);

// Middleware de parsing avec limite de taille
app.use(express.json({ limit: '10kb' })); // Limite à 10kb pour prévenir les attaques DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Protection contre les injections NoSQL
app.use(mongoSanitize());

// Trust proxy (important pour récupérer la vraie IP derrière un proxy/load balancer)
app.set('trust proxy', 1);

// Routes principales
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API Backend Express Portfolio',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      stats: '/api/contact/stats',
    },
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes Contact
app.use('/api/contact', contactRoutes);

// Gestion des routes non trouvées
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl,
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Serveur Express démarré sur le port ${PORT}`);
  console.log(`[${new Date().toISOString()}] 🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[${new Date().toISOString()}] 📡 CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

