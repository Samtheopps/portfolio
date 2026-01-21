'use client';

import React, { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';

/**
 * Interface des props du composant ContactModal
 */
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Composant modal pour le formulaire de contact
 * Accessible, avec animations et gestion du focus trap
 * @param {ContactModalProps} props - Props du composant
 * @returns {JSX.Element | null} Modal de contact ou null si fermée
 */
export default function ContactModal({ isOpen, onClose }: ContactModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * Gère la fermeture de la modal avec la touche ESC
   */
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Empêcher le scroll du body quand la modal est ouverte
      document.body.style.overflow = 'hidden';
      
      // Sauvegarder l'élément qui avait le focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus sur la modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      
      // Restaurer le focus sur l'élément précédent
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  /**
   * Focus trap: garde le focus à l'intérieur de la modal
   */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  /**
   * Gère le clic sur l'overlay (ferme la modal)
   */
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-neutral-800 px-6 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-2 block">
                Get in touch
              </span>
              <h2 
                id="modal-title" 
                className="text-2xl sm:text-3xl text-white"
                style={{ fontFamily: "'Bigilla', sans-serif" }}
              >
                CONTACT ME
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Fermer la modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400 hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-neutral-500 text-sm">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Body avec formulaire */}
        <div className="p-6">
          <ContactForm onSuccess={onClose} />
        </div>
      </div>

      {/* Animations CSS inline */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
