'use client';

import React, { useState } from 'react';
import ContactModal from './ContactModal';

/**
 * Composant bouton qui ouvre la modal de contact
 * @returns {JSX.Element} Bouton "Contact Me" avec modal
 */
export default function ContactButton(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-lg font-medium"
        aria-label="Ouvrir le formulaire de contact"
      >
        Contact Me
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      {/* Modal de contact */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
