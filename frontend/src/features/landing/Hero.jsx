import { Suspense, lazy } from "react";
import Navbar from "../navigation/Navbar";
import HeroContent from "./HeroContent";

const SocialProof = lazy(() => import("./SocialProof"));
const BrandScroller = lazy(() => import("./BrandScroller"));

export default function Hero({ onSignInClick }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Full-bleed skyline background ── */}
      <img
        src="/city-skyline.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom select-none"
      />

      {/* Dark overlay — moody sky, high contrast */}
      <div className="absolute inset-0 bg-black/65" />
      {/* Stronger darkening at bottom — fades into HowItWorks bg-zinc-950 */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <Navbar onSignInClick={onSignInClick} />

        {/* Hero content */}
        <article className="mx-auto flex max-w-7xl flex-col justify-center px-6 pt-6 pb-10 lg:min-h-[calc(100vh-80px)] lg:pt-8 lg:pb-16">
          <HeroContent />
          <Suspense
            fallback={<div className="mt-16 h-24 w-full animate-pulse rounded-md bg-white/5" />}
          >
            <SocialProof />
            <BrandScroller />
          </Suspense>
        </article>
      </div>
    </section>
  );
}
