import mongoose from 'mongoose';

/**
 * Connecte l'application à la base de données MongoDB (optionnel)
 * @returns {Promise<boolean>} true si connecté, false sinon
 */
export const connectDatabase = async (): Promise<boolean> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[${new Date().toISOString()}] ✓ MongoDB connecté avec succès`);

    // Gestion des événements de connexion
    mongoose.connection.on('error', (err) => {
      console.error(`[${new Date().toISOString()}] ✗ Erreur MongoDB:`, err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn(`[${new Date().toISOString()}] ⚠ MongoDB déconnecté`);
    });

    // Fermeture gracieuse
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log(`[${new Date().toISOString()}] MongoDB connexion fermée (SIGINT)`);
      process.exit(0);
    });

    return true;
  } catch (error) {
    console.warn(`[${new Date().toISOString()}] ⚠ MongoDB non disponible - Le système fonctionnera sans sauvegarde en DB`);
    console.warn(`[${new Date().toISOString()}] ⚠ Pour activer MongoDB: brew services start mongodb-community`);
    return false;
  }
};

/**
 * Vérifie si MongoDB est connecté
 * @returns {boolean} true si connecté
 */
export const isMongoConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
