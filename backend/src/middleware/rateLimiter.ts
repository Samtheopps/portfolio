import rateLimit from 'express-rate-limit';

/**
 * Crée un limiteur de requêtes pour l'endpoint de contact
 * Limite à 3 requêtes par heure par IP pour prévenir le spam
 * @returns {rateLimit.RateLimitRequestHandler} Middleware Express de rate limiting
 */
export const contactRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10), // 1 heure par défaut
  max: parseInt(process.env.RATE_LIMIT_MAX || '3', 10), // 3 requêtes max
  message: {
    success: false,
    message: 'Trop de tentatives d\'envoi de message. Veuillez réessayer dans 1 heure.',
    retryAfter: '1 heure',
  },
  standardHeaders: true, // Retourne les infos rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
  skipSuccessfulRequests: false, // Compte toutes les requêtes, même réussies
  skipFailedRequests: false,
  handler: (req, res) => {
    console.error(
      `[${new Date().toISOString()}] ⚠ Rate limit dépassé - IP: ${req.ip}`
    );
    res.status(429).json({
      success: false,
      message: 'Trop de tentatives d\'envoi de message. Veuillez réessayer dans 1 heure.',
      retryAfter: '1 heure',
    });
  },
});
