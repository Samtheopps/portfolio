'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  duration?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.02,
  duration = 0.8
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    // Wrap each word in a span
    const text = el.innerText;
    const words = text.split(' ');
    
    el.innerHTML = words.map(word => 
      `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top;">
        <span class="word" style="display: inline-block; transform: translateY(100%); opacity: 0;">${word}</span>
      </span>`
    ).join(' ');

    const wordElements = el.querySelectorAll('.word');

    gsap.to(wordElements, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: stagger,
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete: () => {
        hasAnimated.current = true;
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [delay, stagger, duration]);

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
};

export default TextReveal;
