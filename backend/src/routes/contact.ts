import { Router } from 'express';
import { body } from 'express-validator';
import { handleContactForm, getContactStats } from '../controllers/contactController';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

/**
 * Validateurs express-validator pour le formulaire de contact
 */
const contactValidators = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email trop long'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Le message doit contenir entre 10 et 5000 caractères')
    .notEmpty()
    .withMessage('Le message ne peut pas être vide'),
  
  body('honeypot')
    .optional()
    .isString()
    .withMessage('Honeypot invalide'),
];

/**
 * @route   POST /api/contact
 * @desc    Envoie un message de contact
 * @access  Public (avec rate limiting)
 * @body    { email: string, message: string, honeypot?: string }
 * @returns { success: boolean, message: string }
 */
router.post(
  '/',
  contactRateLimiter,
  contactValidators,
  handleContactForm
);

/**
 * @route   GET /api/contact/stats
 * @desc    Récupère les statistiques des messages de contact (optionnel pour admin)
 * @access  Public (à sécuriser en production avec auth)
 * @returns { success: boolean, stats: { total, sent, failed, pending } }
 */
router.get('/stats', getContactStats);

export default router;
