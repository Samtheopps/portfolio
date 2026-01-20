'use client';

import ScrollRevealSection from '@/components/ScrollRevealSection';
import ScrollResetOnTop from '@/components/ScrollResetOnTop';
import Aurora from '@/components/Aurora';
import DarkVeil from '@/components/DarkVeil';
import LogoLoop from '@/components/LogoLoop';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiAmazonwebservices,
  SiDocker,
  SiFigma,
  SiGraphql,
  SiTailwindcss,
  SiGit,
  SiGithubactions,
  SiThreedotjs,
} from 'react-icons/si';
import type {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from '@/components/StaggeredMenu';

const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), {
  ssr: false,
});

const menuItems: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Go to about page', link: '/about' },
  { label: 'Projects', ariaLabel: 'Go to projects section', link: '/#projects' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '/#contact' },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

// Skills data
const skills = [
  { name: 'Frontend Development', level: 5, icon: '⚡' },
  { name: 'Backend Development', level: 4, icon: '🔧' },
  { name: 'UI/UX Design', level: 4, icon: '🎨' },
  { name: 'Mobile Development', level: 3, icon: '📱' },
  { name: 'DevOps & Cloud', level: 4, icon: '☁️' },
];

// Experience data
const experiences = [
  {
    year: '2023 - Present',
    role: 'Senior Full Stack Developer',
    company: 'Tech Company',
    description: 'Leading development of modern web applications using React, Node.js, and cloud technologies.',
  },
  {
    year: '2021 - 2023',
    role: 'Full Stack Developer',
    company: 'Startup Inc.',
    description: 'Built scalable applications and contributed to architecture decisions for growing products.',
  },
  {
    year: '2019 - 2021',
    role: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Created responsive and accessible user interfaces for various client projects.',
  },
];

// Tools/Technologies with icons
const techLogos = [
  { node: <SiReact className="text-[#61DAFB]" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript className="text-[#3178C6]" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiNodedotjs className="text-[#339933]" />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiPython className="text-[#3776AB]" />, title: 'Python', href: 'https://python.org' },
  { node: <SiPostgresql className="text-[#4169E1]" />, title: 'PostgreSQL', href: 'https://postgresql.org' },
  { node: <SiMongodb className="text-[#47A248]" />, title: 'MongoDB', href: 'https://mongodb.com' },
  { node: <SiAmazonwebservices className="text-[#FF9900]" />, title: 'AWS', href: 'https://aws.amazon.com' },
  { node: <SiDocker className="text-[#2496ED]" />, title: 'Docker', href: 'https://docker.com' },
  { node: <SiFigma className="text-[#F24E1E]" />, title: 'Figma', href: 'https://figma.com' },
  { node: <SiGraphql className="text-[#E10098]" />, title: 'GraphQL', href: 'https://graphql.org' },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiGit className="text-[#F05032]" />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithubactions />, title: 'CI/CD', href: 'https://github.com/features/actions' },
  { node: <SiThreedotjs />, title: 'Three.js', href: 'https://threejs.org' },
];

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAurora, setShowAurora] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
      setShowAurora(window.scrollY < window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
      className={`bg-[#0a0a0a] text-white min-h-screen relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <ScrollResetOnTop />
      
      {/* Aurora Background - Hero only */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${showAurora ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Aurora
          colorStops={['#00a3d7', '#00364a', '#94e3fe']}
          amplitude={1.2}
          blend={0.5}
          speed={0.5}
        />
      </div>

      {/* Menu */}
      <StaggeredMenu
        position="right"
        colors={['#0a0a0a', '#111111']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl="/vercel.svg"
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        accentColor="#00a3d7"
        isFixed={true}
        changeMenuColorOnOpen={true}
        closeOnClickAway={true}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl w-full">
          <ScrollRevealSection direction="up">
            <span className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4 block">
              About Me
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8"
              style={{ fontFamily: "'Bigilla', sans-serif" }}
            >
              HEY. I'M SAMI.
            </h1>
          </ScrollRevealSection>
          
          <ScrollRevealSection direction="up">
            <p className="text-xl md:text-2xl lg:text-3xl text-neutral-300 max-w-4xl leading-relaxed">
              A <span className="text-cyan-400">Full Stack Developer</span> based in Paris. 
              I craft digital experiences that blend creativity with technical excellence. 
              Passionate about clean code and beautiful interfaces.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection direction="up">
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="/cv/cv-sami.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-lg font-medium"
              >
                Download CV
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-colors text-lg"
              >
                Get in Touch
              </a>
            </div>
          </ScrollRevealSection>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-neutral-500">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BIO SECTION ===== */}
      <section className="relative z-10 py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <ScrollRevealSection direction="up">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                <Image
                  src="/images/profile.jpg"
                  alt="Sami - Profile"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-cyan-400/50 rounded-lg" />
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-white/20 rounded-lg" />
              </div>
            </ScrollRevealSection>

            {/* Content */}
            <div>
              <ScrollRevealSection direction="up">
                <span className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4 block">
                  Who I Am
                </span>
                <h2
                  className="text-4xl md:text-5xl mb-8"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  THE STORY
                </h2>
              </ScrollRevealSection>

              <ScrollRevealSection direction="up">
                <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                  <p>
                    I'm a developer who believes that great software is born from the intersection 
                    of thoughtful design and robust engineering. With over 5 years of experience 
                    in the industry, I've had the privilege of working on diverse projects—from 
                    startups to enterprise solutions.
                  </p>
                  <p>
                    My journey began with a curiosity for how things work on the web. That curiosity 
                    evolved into a passion for creating seamless digital experiences that not only 
                    look beautiful but also perform exceptionally well.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to 
                    open-source projects, or enjoying a good cup of coffee while sketching new ideas.
                  </p>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section className="relative z-10 py-32 md:py-48">
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
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <ScrollRevealSection direction="up">
            <div className="text-center mb-20">
              <span className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4 block">
                Skills
              </span>
              <h2
                className="text-4xl md:text-6xl"
                style={{ fontFamily: "'Bigilla', sans-serif" }}
              >
                WHAT I DO
              </h2>
            </div>
          </ScrollRevealSection>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <ScrollRevealSection key={skill.name} direction="up">
                <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl">{skill.icon}</span>
                    <span className="text-neutral-500 text-sm">
                      {String(index + 1).padStart(2, '0')}/05
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-4 group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>
                  {/* Skill level bars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < skill.level ? 'bg-cyan-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>

          {/* Tools Marquee */}
          <ScrollRevealSection direction="up">
            <div className="mt-24">
              <p className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-8 text-center">
                Technologies I work with
              </p>
              <div className="h-[80px] relative overflow-hidden">
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  direction="left"
                  logoHeight={50}
                  gap={60}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#0a0a0a"
                  ariaLabel="Technologies I work with"
                />
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section className="relative z-10 py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollRevealSection direction="up">
            <div className="mb-20">
              <span className="text-neutral-500 text-sm uppercase tracking-[0.3em] mb-4 block">
                Experience
              </span>
              <h2
                className="text-4xl md:text-6xl"
                style={{ fontFamily: "'Bigilla', sans-serif" }}
              >
                MY JOURNEY
              </h2>
            </div>
          </ScrollRevealSection>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <ScrollRevealSection key={index} direction="up">
                <div className="group grid md:grid-cols-[200px_1fr] gap-8 py-12 border-t border-white/10 hover:border-cyan-400/30 transition-colors">
                  <div>
                    <span className="text-neutral-500 text-sm uppercase tracking-wider">
                      {exp.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-medium mb-2 group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-cyan-400 mb-4">{exp.company}</p>
                    <p className="text-neutral-400 leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 py-32 md:py-48">
        {/* Soft divider line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <ScrollRevealSection direction="up">
            {/* Animated text */}
            <div className="overflow-hidden mb-12">
              <div className="flex justify-center whitespace-nowrap animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="text-5xl md:text-7xl font-bold mx-6 text-transparent"
                    style={{
                      fontFamily: "'Bigilla', sans-serif",
                      WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                    }}
                  >
                    FEEL LIKE COLLABORATING?
                  </span>
                ))}
              </div>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection direction="up">
            <p className="text-neutral-400 text-xl mb-12 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Let's create something amazing together.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection direction="up">
            <a
              href="mailto:sami@example.com"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-xl font-medium"
            >
              Let's Talk
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollRevealSection>

          {/* Social links */}
          <ScrollRevealSection direction="up">
            <div className="mt-20 flex justify-center gap-8">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-neutral-500 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Sami. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
