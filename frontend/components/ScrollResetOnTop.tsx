'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Recharge la page quand l'utilisateur remonte tout en haut.
 * Utile pour réinitialiser les animations GSAP / état client.
 */
const ScrollResetOnTop = () => {
  const router = useRouter();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;

      // Quand on revient tout en haut (avec une petite tolérance)
      if (y <= 0 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        router.refresh();
      }

      // Si on redescend, on autorise un nouveau reset plus tard
      if (y > 20 && hasTriggeredRef.current) {
        hasTriggeredRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [router]);

  return null;
};

export default ScrollResetOnTop;


