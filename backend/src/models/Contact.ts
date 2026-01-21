import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface TypeScript pour le document Contact
 */
export interface IContact extends Document {
  email: string;
  message: string;
  ipAddress?: string;
  status: 'pending' | 'sent' | 'failed';
  honeypot?: string;
  createdAt: Date;
}

/**
 * Schema Mongoose pour le modèle Contact
 * Stocke les messages de contact avec protection anti-spam
 */
const contactSchema = new Schema<IContact>(
  {
    email: {
      type: String,
      required: [true, 'L\'email est obligatoire'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Format d\'email invalide'
      ],
    },
    message: {
      type: String,
      required: [true, 'Le message est obligatoire'],
      minlength: [10, 'Le message doit contenir au moins 10 caractères'],
      maxlength: [5000, 'Le message ne peut pas dépasser 5000 caractères'],
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    honeypot: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

/**
 * Index pour optimiser les requêtes par email et date
 */
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

/**
 * Modèle Contact pour interagir avec la collection MongoDB
 */
const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
