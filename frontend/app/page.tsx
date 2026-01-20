'use client';

import ScrollRevealSection from '@/components/ScrollRevealSection';
import ScrollResetOnTop from '@/components/ScrollResetOnTop';
import Aurora from '@/components/Aurora';
import SplitText from '@/components/SplitText';
import DarkVeil from '@/components/DarkVeil';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from '@/components/StaggeredMenu';

const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), {
  ssr: false,
});

const menuItems: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#top' },
  { label: 'About', ariaLabel: 'Go to about page', link: '/about' },
  { label: 'Projects', ariaLabel: 'Go to projects page', link: '/projects' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

// Données des projets
const projects = [
  {
    id: 1,
    title: 'Project One',
    category: 'Web Development',
    image: '/images/project-1.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    category: 'Mobile App',
    image: '/images/project-2.jpg',
    link: '#',
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAurora, setShowAurora] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Attendre que les fonts soient chargées
    if (document.fonts.status === 'loaded') {
      setIsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowAurora(window.scrollY < window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main 
      id="top" 
      className={`min-h-screen bg-neutral-950 text-neutral-100 relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        marginRight: isMenuOpen ? 'clamp(260px, 38vw, 420px)' : '0',
        width: isMenuOpen ? 'calc(100% - clamp(260px, 38vw, 420px))' : '100%',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Fond Aurora */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: showAurora ? 1 : 0 }}
      >
        <Aurora
          colorStops={["#00a3d7", "#00364a", "#94e3fe"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <ScrollResetOnTop />
      
      {/* Menu */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen
        colors={['#00a3d7', '#94e3fe']}
        logoUrl="/vercel.svg"
        accentColor="#00a3d7"
        isFixed
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="flex h-screen items-center justify-center relative z-10 px-4">
        <div 
          className="text-neutral-100 text-center w-full"
          style={{
            fontFamily: "'Bigilla', sans-serif",
            fontSize: isMenuOpen ? 'clamp(1.5rem, 6vw, 4rem)' : 'clamp(2rem, 8vw, 6rem)',
            letterSpacing: isMenuOpen ? '0.1em' : 'clamp(0.1em, 2vw, 0.4em)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <SplitText
            text="SAMI OUSMAAL"
            className="text-neutral-100"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section
        id="about"
        className="relative z-10 py-16 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <ScrollRevealSection direction="up">
            <p className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-8">About Me</p>
          </ScrollRevealSection>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Texte */}
            <ScrollRevealSection direction="up">
              <div>
                <h2 
                  className="text-2xl sm:text-3xl md:text-5xl leading-tight mb-6 md:mb-8"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  HEY. I'M SAMI.<br />
                  <span className="text-neutral-400">
                    A FULL-STACK DEVELOPER BASED IN PARIS.
                  </span>
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Diplômé d'un Bachelor en développement full-stack, je suis passionné par la création d'applications web modernes et performantes. Je me spécialise actuellement dans le Big Data et l'Intelligence Artificielle.
                </p>
              </div>
            </ScrollRevealSection>

            {/* Image */}
            <ScrollRevealSection direction="right">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-800">
                <img
                  src="/images/image1.jpg"
                  alt="Portrait de Sami Ousmaal"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section
        id="projects"
        className="relative z-10 py-16 md:py-24"
      >
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DarkVeil
            hueShift={35}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={2}
            scanlineFrequency={0}
            warpAmount={0.05}
            resolutionScale={1}
          />
          {/* Gradient overlays for smooth transitions */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <ScrollRevealSection direction="up">
            <div className="flex items-baseline justify-between mb-16">
              <div>
                <span className="text-neutral-500 text-sm uppercase tracking-[0.3em]">featured</span>
                <h2 
                  className="text-4xl md:text-6xl mt-2"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  WORK
                </h2>
              </div>
              <a 
                href="/projects" 
                className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider hidden md:block"
              >
                View all projects →
              </a>
            </div>
          </ScrollRevealSection>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <ScrollRevealSection key={project.id} direction="up">
                <a 
                  href={project.link}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-800 mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 
                        className="text-2xl md:text-3xl mb-2 group-hover:text-cyan-400 transition-colors"
                        style={{ fontFamily: "'Bigilla', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-neutral-500">{project.category}</p>
                    </div>
                    <span className="text-neutral-600 text-sm">0{index + 1}</span>
                  </div>
                </a>
              </ScrollRevealSection>
            ))}
          </div>

          {/* Mobile view all link */}
          <div className="mt-12 text-center md:hidden">
            <a 
              href="/projects" 
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              View all projects →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FOOTER ===== */}
      <footer
        id="contact"
        className="relative z-10 py-16 md:py-40"
      >
        {/* Soft divider line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Contact marquee text */}
          <ScrollRevealSection direction="up">
            <div className="overflow-hidden mb-16">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(8)].map((_, i) => (
                  <span 
                    key={i}
                    className="text-4xl sm:text-6xl md:text-8xl font-bold mx-2 sm:mx-4 text-transparent"
                    style={{ 
                      fontFamily: "'Bigilla', sans-serif",
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                    }}
                  >
                    CONTACT
                  </span>
                ))}
              </div>
            </div>
          </ScrollRevealSection>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left - CTA */}
            <ScrollRevealSection direction="up">
              <div>
                <p className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-6">
                  Feel like collaborating?
                </p>
                <h3 
                  className="text-3xl md:text-5xl mb-8"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  LET'S WORK<br />TOGETHER
                </h3>
                <a 
                  href="mailto:sami@example.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-lg font-medium"
                >
                  Contact Me
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </ScrollRevealSection>

            {/* Right - Links */}
            <ScrollRevealSection direction="up">
              <div className="space-y-8">
                <div>
                  <p className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4">Email</p>
                  <a 
                    href="mailto:sami@example.com" 
                    className="text-xl md:text-2xl hover:text-cyan-400 transition-colors"
                  >
                    sami@example.com
                  </a>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4">Socials</p>
                  <div className="flex gap-6">
                    <a href="https://github.com" className="text-xl hover:text-cyan-400 transition-colors">GitHub</a>
                    <a href="https://linkedin.com" className="text-xl hover:text-cyan-400 transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>

          {/* Bottom */}
          <div className="mt-24 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
            <p>© 2026 Sami Ousmaal. All rights reserved.</p>
            <p>Designed & Built with passion</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

