'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'left' | 'right' | 'up';

type ScrollRevealSectionProps = {
  children: React.ReactNode;
  direction?: Direction;
};

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const offset =
      direction === 'left' ? -80 : direction === 'right' ? 80 : 60;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: direction === 'up' ? offset : 0,
          x: direction === 'left' || direction === 'right' ? offset : 0,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default ScrollRevealSection;


