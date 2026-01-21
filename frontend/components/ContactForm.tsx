'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Schema de validation Zod pour le formulaire de contact
 */
const contactSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide')
    .max(254, 'Email trop long'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(5000, 'Le message ne peut pas dépasser 5000 caractères'),
  honeypot: z.string().max(0, 'Champ invalide'), // Doit être vide
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Interface des props du composant ContactForm
 */
interface ContactFormProps {
  onSuccess?: () => void;
}

/**
 * Composant formulaire de contact avec validation et protection anti-spam
 * @param {ContactFormProps} props - Props du composant
 * @returns {JSX.Element} Formulaire de contact
 */
export default function ContactForm({ onSuccess }: ContactFormProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      message: '',
      honeypot: '',
    },
  });

  /**
   * Soumet le formulaire de contact à l'API backend
   * @param {ContactFormData} data - Données validées du formulaire
   */
  const onSubmit = async (data: ContactFormData): Promise<void> => {
    // Vérification honeypot côté client
    if (data.honeypot && data.honeypot.trim() !== '') {
      console.warn('Spam détecté (honeypot rempli)');
      // Ne pas soumettre, mais afficher un message de succès pour tromper les bots
      setSubmitStatus({
        type: 'success',
        message: 'Message envoyé avec succès !',
      });
      reset();
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          message: data.message,
          honeypot: data.honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Message envoyé avec succès !',
        });
        reset();

        // Fermer la modal après 2 secondes
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        // Gestion des erreurs spécifiques
        if (response.status === 429) {
          setSubmitStatus({
            type: 'error',
            message: 'Trop de tentatives. Veuillez réessayer dans 1 heure.',
          });
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || 'Une erreur est survenue. Veuillez réessayer.',
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Impossible de se connecter au serveur. Veuillez réessayer plus tard.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Champ Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider">
          Email <span className="text-cyan-400">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="your.email@example.com"
          className={`w-full px-4 py-3 bg-neutral-900 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none text-white placeholder-neutral-600 ${
            errors.email ? 'border-red-500 bg-red-500/10' : 'border-neutral-700 hover:border-neutral-600'
          }`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Champ Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider">
          Message <span className="text-cyan-400">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          placeholder="Write your message here... (minimum 10 characters)"
          className={`w-full px-4 py-3 bg-neutral-900 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none resize-none text-white placeholder-neutral-600 ${
            errors.message ? 'border-red-500 bg-red-500/10' : 'border-neutral-700 hover:border-neutral-600'
          }`}
          disabled={isLoading}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Champ Honeypot (caché pour attraper les bots) */}
      <input
        {...register('honeypot')}
        type="text"
        name="website"
        id="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
        }}
        aria-hidden="true"
      />

      {/* Messages de feedback */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-xl ${
            submitStatus.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
          role="alert"
        >
          <div className="flex items-center">
            <span className="text-lg mr-2">
              {submitStatus.type === 'success' ? '✓' : '✗'}
            </span>
            <p className="font-medium">{submitStatus.message}</p>
          </div>
        </div>
      )}

      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-full font-medium text-black transition-all duration-300 flex items-center justify-center gap-3 ${
          isLoading
            ? 'bg-neutral-600 cursor-not-allowed text-neutral-400'
            : 'bg-white hover:bg-cyan-400 transform hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      {/* Note de confidentialité */}
      <p className="text-xs text-neutral-600 text-center">
        Your data is handled securely and will never be shared.
      </p>
    </form>
  );
}
