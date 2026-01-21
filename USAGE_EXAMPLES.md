/**
 * EXEMPLE D'UTILISATION DU SYSTÈME DE CONTACT
 * 
 * Ce fichier montre comment intégrer le bouton de contact dans vos pages Next.js
 */

// ========================================
// EXEMPLE 1 : Page simple avec bouton centré
// ========================================

import ContactButton from '@/components/ContactButton';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          John Doe
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Développeur Full Stack
        </p>
        <ContactButton />
      </div>
    </main>
  );
}


// ========================================
// EXEMPLE 2 : Section contact dans un portfolio
// ========================================

import ContactButton from '@/components/ContactButton';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl">Développeur passionné</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Mes Projets</h2>
          {/* Vos projets ici */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Une idée de projet ?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discutons ensemble de votre prochain projet. 
            Je serais ravi de collaborer avec vous !
          </p>
          <ContactButton />
        </div>
      </section>
    </div>
  );
}


// ========================================
// EXEMPLE 3 : Utilisation dans un footer
// ========================================

import ContactButton from '@/components/ContactButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Colonne 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">À propos</h3>
              <p className="text-gray-400">
                Développeur Full Stack passionné par les technologies web modernes.
              </p>
            </div>

            {/* Colonne 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Liens</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>

            {/* Colonne 3 - Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-4">
                Envie de travailler ensemble ?
              </p>
              <ContactButton />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


// ========================================
// EXEMPLE 4 : Utilisation avec Modal contrôlée manuellement
// ========================================

'use client';

import { useState } from 'react';
import ContactModal from '@/components/ContactModal';

export default function CustomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Ma Page Custom</h1>
      
      {/* Plusieurs boutons peuvent ouvrir la même modal */}
      <div className="space-y-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Ouvrir contact (Bouton 1)
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Ouvrir contact (Bouton 2)
        </button>
      </div>

      {/* Modal réutilisable */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}


// ========================================
// EXEMPLE 5 : Utilisation du formulaire seul (sans modal)
// ========================================

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-2">Contactez-moi</h1>
          <p className="text-gray-600 mb-8">
            Remplissez le formulaire ci-dessous et je vous répondrai rapidement.
          </p>
          
          <ContactForm onSuccess={() => {
            alert('Message envoyé !');
            // Redirection ou autre action
          }} />
        </div>
      </div>
    </div>
  );
}
