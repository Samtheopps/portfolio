'use client';

import ScrollRevealSection from '@/components/ScrollRevealSection';
import ScrollResetOnTop from '@/components/ScrollResetOnTop';
import Aurora from '@/components/Aurora';
import DarkVeil from '@/components/DarkVeil';
import ContactButton from '@/components/ContactButton';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
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
  { label: 'Projects', ariaLabel: 'Go to projects page', link: '/projects' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

// Projects data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: 'Full Stack Web Application',
    description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory, payment processing, and admin dashboard.',
    image: '/images/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '/projects/ecommerce',
    year: '2025',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'AI Dashboard',
    subtitle: 'Data Visualization Platform',
    description: 'Interactive dashboard for AI model monitoring with real-time analytics, performance metrics, and automated reporting.',
    image: '/images/project-2.jpg',
    tags: ['React', 'D3.js', 'Python', 'FastAPI'],
    link: '/projects/ai-dashboard',
    year: '2025',
    category: 'Data Science',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    subtitle: 'iOS & Android Application',
    description: 'Secure mobile banking application with biometric authentication, instant transfers, and expense tracking.',
    image: '/images/project-3.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    link: '/projects/banking-app',
    year: '2024',
    category: 'Mobile Development',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure',
    subtitle: 'DevOps & Architecture',
    description: 'Scalable cloud infrastructure design with Kubernetes, CI/CD pipelines, and automated deployment strategies.',
    image: '/images/project-4.jpg',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    link: '/projects/cloud-infra',
    year: '2024',
    category: 'DevOps',
  },
  {
    id: 5,
    title: 'Social Media Platform',
    subtitle: 'Real-time Communication',
    description: 'Feature-rich social platform with real-time messaging, content sharing, and algorithmic feed curation.',
    image: '/images/project-5.jpg',
    tags: ['Next.js', 'Socket.io', 'Redis', 'PostgreSQL'],
    link: '/projects/social-platform',
    year: '2024',
    category: 'Web Development',
  },
  {
    id: 6,
    title: 'Portfolio Generator',
    subtitle: 'Open Source Tool',
    description: 'CLI tool for generating beautiful developer portfolios with customizable themes and automatic deployment.',
    image: '/images/project-6.jpg',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    link: '/projects/portfolio-generator',
    year: '2023',
    category: 'Open Source',
  },
];

// Categories for filtering
const categories = ['All', 'Web Development', 'Mobile Development', 'Data Science', 'DevOps', 'Open Source'];

export default function Projects() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setIsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main
      className={`bg-[#0a0a0a] text-white min-h-screen relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <ScrollResetOnTop />

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
      <section className="relative z-10 pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
        {/* Aurora Background - Hero only */}
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={['#00a3d7', '#00364a', '#94e3fe']}
            amplitude={1.2}
            blend={0.5}
            speed={0.5}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealSection direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
              <div>
                <span className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
                  Selected Work
                </span>
                <h1
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1]"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  FEATURED<br />PROJECTS
                </h1>
              </div>
              <p className="text-neutral-400 text-base sm:text-lg max-w-md md:text-right">
                A curated collection of projects showcasing my expertise in web development, 
                mobile apps, and cloud architecture.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Category Filter */}
          <ScrollRevealSection direction="up">
            <div className="mt-10 sm:mt-16 flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-cyan-400 text-black'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="relative z-10 py-16 md:py-24">
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
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid gap-6 sm:gap-8 md:gap-12">
            {filteredProjects.map((project, index) => (
              <ScrollRevealSection key={project.id} direction="up">
                <a
                  href={project.link}
                  className="group block"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`grid md:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-2xl transition-all duration-500 ${
                    hoveredProject === project.id ? 'bg-white/5' : 'bg-transparent'
                  }`}>
                    {/* Image - alternate sides */}
                    <div className={`relative aspect-[16/10] overflow-hidden rounded-xl ${
                      index % 2 === 1 ? 'md:order-2' : ''
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 z-10" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className={`absolute inset-0 bg-cyan-400/20 z-20 transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                      <div className={`flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                        <span className="text-cyan-400 text-xs sm:text-sm uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-neutral-600 text-xs sm:text-sm">
                          {project.year}
                        </span>
                      </div>
                      
                      <h2 
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 group-hover:text-cyan-400 transition-colors"
                        style={{ fontFamily: "'Bigilla', sans-serif" }}
                      >
                        {project.title}
                      </h2>
                      
                      <p className="text-neutral-500 text-base sm:text-lg mb-3 sm:mb-4">
                        {project.subtitle}
                      </p>
                      
                      <p className="text-neutral-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollRevealSection>
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CONTACT FOOTER ===== */}
      <footer
        id="contact"
        className="relative z-10 py-16 sm:py-24 md:py-40"
      >
        {/* Soft divider line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Contact marquee text */}
          <ScrollRevealSection direction="up">
            <div className="overflow-hidden mb-10 sm:mb-16">
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

          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start">
            {/* Left - CTA */}
            <ScrollRevealSection direction="up">
              <div>
                <p className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                  Feel like collaborating?
                </p>
                <h3 
                  className="text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-8"
                  style={{ fontFamily: "'Bigilla', sans-serif" }}
                >
                  LET'S WORK<br />TOGETHER
                </h3>
                <ContactButton />
              </div>
            </ScrollRevealSection>

            {/* Right - Links */}
            <ScrollRevealSection direction="up">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <p className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">Email</p>
                  <a 
                    href="mailto:sami@example.com" 
                    className="text-lg sm:text-xl md:text-2xl hover:text-cyan-400 transition-colors break-all"
                  >
                    sami@example.com
                  </a>
                </div>
                <div>
                  <p className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">Socials</p>
                  <div className="flex gap-4 sm:gap-6">
                    <a href="https://github.com" className="text-lg sm:text-xl hover:text-cyan-400 transition-colors">GitHub</a>
                    <a href="https://linkedin.com" className="text-lg sm:text-xl hover:text-cyan-400 transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>

          {/* Bottom */}
          <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-neutral-500 text-xs sm:text-sm">
            <p>© 2026 Sami. All rights reserved.</p>
            <p>Designed & Built with passion</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
