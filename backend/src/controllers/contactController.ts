import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact';
import { sendContactEmail } from '../utils/emailService';
import { isMongoConnected } from '../config/database';

/**
 * Récupère l'adresse IP réelle du client en tenant compte des proxies
 * @param {Request} req - Requête Express
 * @returns {string} Adresse IP du client
 */
const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
};

/**
 * Contrôleur pour traiter les demandes de contact
 * @param {Request} req - Requête Express contenant { email, message, honeypot }
 * @param {Response} res - Réponse Express
 * @returns {Promise<Response>} Réponse JSON avec le statut de l'opération
 * @throws {Error} En cas d'erreur serveur
 */
export const handleContactForm = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // 1. Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(
        `[${new Date().toISOString()}] ✗ Validation échouée:`,
        errors.array()
      );
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: errors.array().map((err) => ({
          field: err.type === 'field' ? err.path : 'unknown',
          message: err.msg,
        })),
      });
    }

    const { email, message, honeypot } = req.body;

    // 2. Vérification honeypot (protection anti-spam)
    if (honeypot && honeypot.trim() !== '') {
      console.warn(
        `[${new Date().toISOString()}] ⚠ Tentative de spam détectée - Honeypot rempli - IP: ${getClientIp(req)}`
      );
      // Répondre comme si tout était normal pour tromper les bots
      return res.status(200).json({
        success: true,
        message: 'Message envoyé avec succès',
      });
    }

    const clientIp = getClientIp(req);

    console.log(
      `[${new Date().toISOString()}] → Nouveau message de contact - Email: ${email} - IP: ${clientIp}`
    );

    let contactEntry: any = null;

    // 3. Créer l'entrée en base de données UNIQUEMENT si MongoDB est connecté
    if (isMongoConnected()) {
      try {
        contactEntry = new Contact({
          email,
          message,
          ipAddress: clientIp,
          status: 'pending',
          honeypot: honeypot || '',
        });

        await contactEntry.save();

        console.log(
          `[${new Date().toISOString()}] ✓ Message sauvegardé en BD - ID: ${contactEntry._id}`
        );
      } catch (dbError) {
        console.warn(
          `[${new Date().toISOString()}] ⚠ Erreur sauvegarde BD (non bloquant):`,
          dbError
        );
      }
    } else {
      console.log(
        `[${new Date().toISOString()}] ⚠ MongoDB non connecté - Message non sauvegardé`
      );
    }

    // 4. Tenter d'envoyer l'email
    try {
      await sendContactEmail({
        email,
        message,
        ipAddress: clientIp,
      });

      // 5. Mettre à jour le statut en 'sent' si DB disponible
      if (contactEntry) {
        contactEntry.status = 'sent';
        await contactEntry.save();
        console.log(
          `[${new Date().toISOString()}] ✓ Message traité avec succès - ID: ${contactEntry._id}`
        );
      } else {
        console.log(
          `[${new Date().toISOString()}] ✓ Email envoyé avec succès (sans sauvegarde BD)`
        );
      }

      return res.status(200).json({
        success: true,
        message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      });
    } catch (emailError) {
      // 6. En cas d'échec d'envoi, marquer comme 'failed' si DB disponible
      if (contactEntry) {
        contactEntry.status = 'failed';
        await contactEntry.save();
        console.error(
          `[${new Date().toISOString()}] ✗ Échec d'envoi email - ID: ${contactEntry._id}`,
          emailError
        );
      } else {
        console.error(
          `[${new Date().toISOString()}] ✗ Échec d'envoi email`,
          emailError
        );
      }

      return res.status(500).json({
        success: false,
        message:
          'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard ou me contacter directement par email.',
      });
    }
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ✗ Erreur serveur dans handleContactForm:`,
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Erreur serveur. Veuillez réessayer plus tard.',
    });
  }
};

/**
 * Contrôleur pour obtenir des statistiques sur les messages de contact (optionnel, pour admin)
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @returns {Promise<Response>} Statistiques JSON
 */
export const getContactStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB non connecté - Statistiques non disponibles',
      });
    }

    const total = await Contact.countDocuments();
    const sent = await Contact.countDocuments({ status: 'sent' });
    const failed = await Contact.countDocuments({ status: 'failed' });
    const pending = await Contact.countDocuments({ status: 'pending' });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        sent,
        failed,
        pending,
      },
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ✗ Erreur lors de la récupération des stats:`,
      error
    );
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
    });
  }
};
