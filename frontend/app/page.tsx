import PrismaticBurst from '@/components/PrismaticBurst';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background animé */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={2}
          speed={0.5}
          distort={1.0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={24}
          mixBlendMode="lighten"
          colors={['#ff007a', '#4d3dff', '#ffffff']}
        />
      </div>

      {/* Contenu de la page */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center p-24">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bienvenue sur mon Portfolio
          </h1>
          <p className="text-lg md:text-xl text-neutral-200">
            Projet initialisé avec Next.js, React et Express, avec un fond animé PrismaticBurst.
          </p>
        </div>
      </section>
    </main>
  );
}

