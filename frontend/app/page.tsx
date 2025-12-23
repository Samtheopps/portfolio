import ScrollRevealSection from '@/components/ScrollRevealSection';
import ScrollResetOnTop from '@/components/ScrollResetOnTop';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-slate-900">
      {/* Reset de la page quand on remonte tout en haut */}
      <ScrollResetOnTop />
      {/* Barre de navigation */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4 text-xs tracking-[0.25em] text-neutral-700">
          <span className="font-semibold">HOME</span>
          <nav className="flex gap-12">
            <a href="#about" className="hover:text-black transition-colors">
              ABOUT
            </a>
            <a href="#projects" className="hover:text-black transition-colors">
              PROJECT
            </a>
            <a href="#contact" className="hover:text-black transition-colors">
              CONTACT
            </a>
          </nav>
        </div>
      </header>

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

