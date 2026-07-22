import SectionBackdrop from "./SectionBackdrop";

export default function CallToAction({ onSignInClick }) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-32 text-center text-white lg:py-48">
      <SectionBackdrop variant="default" />
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/20 blur-[120px]"></div>

      {/* Abstract grid pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]"></div>

      <style>{`
        @keyframes gradient-slide {
          to { background-position: -200% center; }
        }
        .animate-gradient-slide {
          animation: gradient-slide 5s linear infinite;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h2 className="text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="animate-gradient-slide block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_auto] bg-clip-text pb-2 text-transparent">
            Stop searching.
          </span>
          <span className="animate-gradient-slide block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent">
            Start analyzing.
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:text-2xl">
          Join the investors, agents, and buyers who are already leveraging Markit&apos;s structured
          data engine to find the signal in the noise.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <button
            type="button"
            onClick={onSignInClick}
            className="flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold tracking-wide text-zinc-950 transition-all hover:scale-105 hover:bg-zinc-200 active:scale-95 sm:w-auto"
          >
            Get Early Access
          </button>
          <button className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95 sm:w-auto">
            View Data Sources
          </button>
        </div>
      </div>
    </section>
  );
}
