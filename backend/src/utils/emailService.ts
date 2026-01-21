import nodemailer, { Transporter } from 'nodemailer';

/**
 * Interface pour les données du message de contact
 */
interface ContactEmailData {
  email: string;
  message: string;
  ipAddress?: string;
}

/**
 * Crée un transporteur Nodemailer configuré pour Gmail SMTP
 * @returns {Transporter} Instance de transporteur Nodemailer
 * @throws {Error} Si les variables d'environnement EMAIL sont manquantes
 */
const createTransporter = (): Transporter => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      'Configuration email manquante. Vérifiez les variables d\'environnement EMAIL_*'
    );
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10),
    secure: false, // true pour port 465, false pour 587
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 secondes
    greetingTimeout: 10000,
  });
};

/**
 * Génère le template HTML professionnel pour l'email de contact
 * @param {ContactEmailData} data - Données du message de contact
 * @returns {string} Template HTML formaté
 */
const generateEmailTemplate = (data: ContactEmailData): string => {
  const { email, message, ipAddress } = data;
  const timestamp = new Date().toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'long',
  });

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau message de contact</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #667eea;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #667eea;
          font-size: 15px;
          word-wrap: break-word;
        }
        .message-box {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          border-left: 4px solid #667eea;
          white-space: pre-wrap;
          font-size: 15px;
          line-height: 1.8;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #e0e0e0;
        }
        .metadata {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-size: 13px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 Nouveau Message de Contact</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Email de l'expéditeur</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${message}</div>
          </div>

          <div class="metadata">
            <div>
              <strong>📅 Date:</strong> ${timestamp}
            </div>
            ${ipAddress ? `<div><strong>🌐 IP:</strong> ${ipAddress}</div>` : ''}
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0;">Ce message a été envoyé depuis le formulaire de contact de votre portfolio.</p>
          <p style="margin: 5px 0 0 0;">Pour répondre, envoyez un email directement à <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Envoie un email de contact avec retry logic en cas d'échec
 * @param {ContactEmailData} data - Données du message de contact
 * @param {number} retries - Nombre de tentatives restantes (défaut: 3)
 * @returns {Promise<boolean>} True si l'email a été envoyé, false sinon
 * @throws {Error} Si toutes les tentatives échouent
 */
export const sendContactEmail = async (
  data: ContactEmailData,
  retries: number = 3
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const htmlContent = generateEmailTemplate(data);

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📬 Nouveau message de contact - ${data.email}`,
      html: htmlContent,
      text: `Nouveau message de contact\n\nDe: ${data.email}\n\nMessage:\n${data.message}\n\nDate: ${new Date().toLocaleString('fr-FR')}\nIP: ${data.ipAddress || 'Non disponible'}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      `[${new Date().toISOString()}] ✓ Email envoyé avec succès - ID: ${info.messageId}`
    );

    return true;
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ✗ Erreur lors de l'envoi de l'email:`,
      error
    );

    // Retry logic
    if (retries > 0) {
      console.log(
        `[${new Date().toISOString()}] ⟳ Nouvelle tentative (${retries} restantes)...`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Attendre 2 secondes
      return sendContactEmail(data, retries - 1);
    }

    throw new Error(
      `Impossible d'envoyer l'email après plusieurs tentatives: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    );
  }
};
