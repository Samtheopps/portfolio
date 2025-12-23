import ScrollRevealSection from '@/components/ScrollRevealSection';
import ScrollResetOnTop from '@/components/ScrollResetOnTop';
import ScrollReveal from '@/components/ScrollReveal';
import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from '@/components/StaggeredMenu';

const menuItems: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#top' },
  { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
  { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-neutral-50 text-slate-900">
      {/* Reset de la page quand on remonte tout en haut */}
      <ScrollResetOnTop />
      {/* Menu staggered à droite */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/vercel.svg"
        accentColor="#ff6b6b"
        isFixed
      />

      {/* Titre central */}
      <section className="flex h-screen items-center justify-center">
        <ScrollRevealSection direction="up">
          <h1 className="text-7xl md:text-8xl tracking-[0.4em] text-neutral-900">
            TITLE
          </h1>
        </ScrollRevealSection>
      </section>

      {/* Bloc texte gauche / image droite */}
      <section
        id="about"
        className="mx-auto flex max-w-5xl flex-col gap-16 px-8 pb-32 md:flex-row md:items-start"
      >
        <ScrollRevealSection direction="up">
          <div className="md:w-1/2 text-base leading-relaxed text-neutral-800">
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={5}
              blurStrength={10}
              textClassName="text-base md:text-lg font-normal text-neutral-800"
            >
              Voluptatem. Sed voluptatem odit ea autem amet est aliquid dolor est
              iusto laborum et harum neque. Et tenetur minus et dolore commodi aut
              velit eveniet et numquam quis est ipsum optio! Sed enim saepe et
              nostrum expedita id nemo asperiores et consequatur nihil in veniam
              molestiae. Et libero nemo et sunt aperiam qui consequatur repellat.
              Qui maxime eligendi id accusamus impedit in sequi provident eum
              delectus maxime ea galisum mollitia!
            </ScrollReveal>
          </div>
        </ScrollRevealSection>
        <ScrollRevealSection direction="right">
          <div className="md:w-1/2">
            <img
              src="/images/project-1.jpg"
              alt="Projet 1"
              className="h-80 w-full rounded-lg bg-neutral-300 object-cover"
            />
          </div>
        </ScrollRevealSection>
      </section>

      {/* Bloc image gauche / texte droite */}
      <section
        id="projects"
        className="mx-auto flex max-w-5xl flex-col-reverse gap-16 px-8 pb-40 md:flex-row md:items-start"
      >
        <ScrollRevealSection direction="left">
          <div className="md:w-1/2">
            <img
              src="/images/project-2.jpg"
              alt="Projet 2"
              className="h-80 w-full rounded-lg bg-neutral-300 object-cover"
            />
          </div>
        </ScrollRevealSection>
        <ScrollRevealSection direction="up">
          <div className="md:w-1/2 text-base leading-relaxed text-neutral-800">
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={-5}
              blurStrength={10}
              textClassName="text-base md:text-lg font-normal text-neutral-800"
            >
              Aut galisum exercitationem a inventore rerum et officiis assumenda.
              Ut iure maxime ut delectus nesciunt et eaque excepturi et recusandae
              corrupti non earum tempore sed provident voluptatem. Sed voluptatem
              odit ea autem amet est aliquid dolor est iusto laborum et harum
              neque. Et tenetur minus et dolore commodi aut velit eveniet et
              numquam quis est ipsum optio! Sed enim saepe et nostrum expedita id
              nemo asperiores et consequatur nihil in veniam molestiae. Et libero
              nemo et sunt aperiam qui consequatur repellat. Qui maxime eligendi
              id accusamus impedit in sequi provident eum delectus maxime ea
              galisum mollitia!
            </ScrollReveal>
          </div>
        </ScrollRevealSection>
      </section>

      {/* Pied / ancre contact */}
      <footer
        id="contact"
        className="border-t border-neutral-200 bg-neutral-50 py-8 text-center text-xs text-neutral-500"
      >
        Scroll pour naviguer, sections simples type wireframe. Tu pourras
        remplacer le texte et les blocs gris par tes vrais contenus et images.
      </footer>
    </main>
  );
}

