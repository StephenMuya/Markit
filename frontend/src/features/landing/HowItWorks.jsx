import { useEffect, useRef } from "react";
import SectionBackdrop from "./SectionBackdrop";

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-fade]");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const delay = entry.target.dataset.delay || "0";

          if (entry.isIntersecting) {
            // Fade IN — restore staggered delay and full duration
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.style.transitionDuration = "0.7s";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          } else {
            // Fade OUT — instant reset (no delay, fast fade) so next entry looks fresh
            entry.target.style.transitionDelay = "0ms";
            entry.target.style.transitionDuration = "0.3s";
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(28px)";
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Base style — starts invisible, transition values managed by observer
  const f = () => ({
    opacity: 0,
    transform: "translateY(28px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 text-white" ref={sectionRef}>
      <SectionBackdrop variant="process" />
      <div className="w-full px-6 lg:px-12">
        <div className="relative mx-auto w-full max-w-[120rem]">
          {/* Section tag — matches Infrastructure & UseCases */}
          <div
            data-fade
            data-delay="0"
            style={f(0)}
            className="mb-16 text-center"
          >
            <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
              How It Works
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[800px]">

            {/* ── Header card (Left top) ── */}
            <header
              data-fade
              data-delay="0"
              style={f(0)}
              className="group relative flex flex-col justify-center items-center overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.03] lg:col-start-1 lg:row-start-1 lg:p-14"
            >
              <img
                src="/how-it-works-hero.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none opacity-20 transition-opacity duration-700 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-zinc-950/60" />

              <div className="relative z-10 text-center">
                <h2
                  data-fade
                  data-delay="120"
                  style={f(120)}
                  className="uppercase font-semibold leading-none tracking-tighter whitespace-nowrap text-[clamp(2.5rem,6vw,8rem)]"
                >
                  The Pipeline
                </h2>
                <p
                  data-fade
                  data-delay="260"
                  style={f(260)}
                  className="mt-4 text-3xl text-zinc-400 whitespace-nowrap tracking-wide"
                >
                  From raw fragments to structured insights.
                </p>
              </div>
            </header>

            {/* ── Step 1: Ingest (Left bottom) ── */}
            <article
              data-fade
              data-delay="150"
              style={f(150)}
              className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.03] lg:col-start-1 lg:row-start-2 lg:p-14"
            >
              <img
                src="/how-it-works-ingest.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none opacity-20 transition-opacity duration-700 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-transparent" />

              <div
                data-fade
                data-delay="300"
                style={f(300)}
                className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase"
              >
                01 / Ingest
              </div>
              <h3
                data-fade
                data-delay="400"
                style={f(400)}
                className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl"
              >
                The Scraping Engine
              </h3>
              <p
                data-fade
                data-delay="520"
                style={f(520)}
                className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400"
              >
                We scan and scrape raw, real-time property listings from over 120+ major CRE platforms and fragmented real estate sites simultaneously.
              </p>
            </article>

            {/* ── Step 2: Clean & Categorize (Right top) ── */}
            <article
              data-fade
              data-delay="100"
              style={f(100)}
              className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.03] lg:col-start-2 lg:row-start-1 lg:p-14"
            >
              <img
                src="/how-it-works-process.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none opacity-20 transition-opacity duration-700 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-transparent" />

              <div
                data-fade
                data-delay="250"
                style={f(250)}
                className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase"
              >
                02 / Clean &amp; Categorize
              </div>
              <h3
                data-fade
                data-delay="370"
                style={f(370)}
                className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl"
              >
                The Processing Engine
              </h3>
              <p
                data-fade
                data-delay="490"
                style={f(490)}
                className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400"
              >
                Our engine automatically normalizes text, strips duplicates, and parses messy details into structured categories tailored for agents, buyers, and investors.
              </p>
            </article>

            {/* ── Step 3: Deliver (Right bottom) ── */}
            <article
              data-fade
              data-delay="250"
              style={f(250)}
              className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.03] lg:col-start-2 lg:row-start-2 lg:p-14"
            >
              <img
                src="/how-it-works-deliver.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none opacity-20 transition-opacity duration-700 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-transparent" />

              <div
                data-fade
                data-delay="400"
                style={f(400)}
                className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase"
              >
                03 / Deliver
              </div>
              <h3
                data-fade
                data-delay="520"
                style={f(520)}
                className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl"
              >
                The Dashboard Experience
              </h3>
              <p
                data-fade
                data-delay="640"
                style={f(640)}
                className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400"
              >
                The finalized data lands directly in your unified, lightning-fast dashboard, ready for you to filter, analyze, and act on instantly.
              </p>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}
