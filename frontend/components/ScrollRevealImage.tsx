'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealImageProps = {
  src: string;
  alt: string;
};

const ScrollRevealImage: React.FC<ScrollRevealImageProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scroll-image',
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center px-6 py-24"
    >
      <div className="scroll-image relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/40" />
      </div>
    </div>
  );
};

export default ScrollRevealImage;


