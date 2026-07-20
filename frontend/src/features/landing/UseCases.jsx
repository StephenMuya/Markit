import { useEffect, useRef } from "react";

export default function UseCases() {
  const checkIcon = (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );

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
    <section className="bg-zinc-950 py-24 text-white" ref={sectionRef}>
      <div className="mx-auto w-full max-w-[120rem] px-6 lg:px-12">

        {/* Section Header */}
        <header className="mb-20 text-center">
          <h2 data-fade data-delay="0" style={f()} className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
            Use Cases
          </h2>
          <p data-fade data-delay="100" style={f()} className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            Engineered for every angle of the market.
          </p>
          <p data-fade data-delay="200" style={f()} className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400">
            Whether you are hunting for yield, pricing a listing, or searching for a headquarters, Markit restructures the web&apos;s data to fit your exact workflow.
          </p>
        </header>

        {/* Cards — rod shape by default, expand on hover */}
        <div className="flex flex-col gap-5">

          {/* ── Card 1: Agents (Blue Theme) ── */}
          <article data-fade data-delay="0" style={f()} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-blue-500/[0.04] hover:border-blue-500/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.1)]">
            
            {/* Icon */}
            <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 h-36 w-36 text-blue-500/10 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-500/20 lg:h-44 lg:w-44" aria-hidden="true">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.896 2.083-2.001 2.083H5.75c-1.105 0-2.001-.989-2.001-2.083v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v.011a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-.011M12 10.5v-1.5m0 0a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5m6 0v-1.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5m-3-1.5h6" />
              </svg>
            </div>

            {/* Rod */}
            <div className="relative z-10 flex items-center justify-between px-10 py-7 lg:px-14">
              <div className="pr-24">
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-blue-400/80 lg:text-sm">For Agents</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white lg:text-[1.75rem] lg:leading-snug">
                  Close deals faster with unified market clarity.
                </h3>
              </div>
            </div>

            {/* Expandable */}
            <div className="relative z-10 grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-10 px-10 pb-10 pt-2 lg:flex-row lg:items-start lg:justify-between lg:px-14 lg:pb-14">
                  <p className="max-w-2xl pr-8 text-lg leading-relaxed text-zinc-400">
                    Stop wasting hours cross-referencing broken links and duplicate listings. Markit aggregates the entire market so you can pull comps, analyze trends, and match leads in seconds.
                  </p>
                  <ul className="w-full shrink-0 space-y-6 lg:w-[30rem]">
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-blue-500/20 group-hover:text-blue-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Automated Comp Pulling</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Instantly generate comparative market analyses from normalized data.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-blue-500/20 group-hover:text-blue-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Real-Time Market Alerts</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Be the first to know when a property hits any of our 120+ tracked sources.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-blue-500/20 group-hover:text-blue-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Client-Ready Exports</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Package clean, branded data to send directly to your buyers.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ── Card 2: Investors (Emerald Theme) ── */}
          <article data-fade data-delay="0" style={f()} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-emerald-500/[0.04] hover:border-emerald-500/20 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]">

            {/* Icon */}
            <div className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 h-36 w-36 text-emerald-500/10 transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-500/20 lg:h-44 lg:w-44" aria-hidden="true">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>

            {/* Rod */}
            <div className="relative z-10 flex flex-row-reverse items-center justify-between px-10 py-7 lg:px-14">
              <div className="pl-24">
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-emerald-400/80 lg:text-sm">For Investors</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white lg:text-[1.75rem] lg:leading-snug">
                  Find the signal in the noise.
                </h3>
              </div>
            </div>

            {/* Expandable */}
            <div className="relative z-10 grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-10 px-10 pb-10 pt-2 lg:flex-row-reverse lg:items-start lg:justify-between lg:px-14 lg:pb-14">
                  <p className="max-w-2xl pl-8 text-lg leading-relaxed text-zinc-400">
                    Identify high-yield opportunities before the broader market reacts. Our structured data engine gives you the analytical edge to filter by the metrics that actually matter.
                  </p>
                  <ul className="w-full shrink-0 space-y-6 lg:w-[30rem]">
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Advanced Metric Filtering</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Search by cap rate, price per square foot, and yield.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Trend Visualization</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Track asset class performance across zip codes over time.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Off-Market Indicators</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Spot patterns in time-on-market data to identify motivated sellers.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ── Card 3: Buyers (Purple Theme) ── */}
          <article data-fade data-delay="0" style={f()} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-purple-500/[0.04] hover:border-purple-500/20 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.1)]">

            {/* Icon */}
            <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 h-36 w-36 text-purple-500/10 transition-all duration-500 group-hover:scale-110 group-hover:text-purple-500/20 lg:h-44 lg:w-44" aria-hidden="true">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>

            {/* Rod */}
            <div className="relative z-10 flex items-center justify-between px-10 py-7 lg:px-14">
              <div className="pr-24">
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-purple-400/80 lg:text-sm">For Buyers</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white lg:text-[1.75rem] lg:leading-snug">
                  Discover the right property without the hassle.
                </h3>
              </div>
            </div>

            {/* Expandable */}
            <div className="relative z-10 grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-10 px-10 pb-10 pt-2 lg:flex-row lg:items-start lg:justify-between lg:px-14 lg:pb-14">
                  <p className="max-w-2xl pr-8 text-lg leading-relaxed text-zinc-400">
                    Get a complete, unvarnished view of available properties matching your exact criteria. We strip away the marketing fluff and duplicates so you can find exactly what you need.
                  </p>
                  <ul className="w-full shrink-0 space-y-6 lg:w-[30rem]">
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-purple-500/20 group-hover:text-purple-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Hyper-Specific Search</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Filter by strict zoning data, exact square footage, and property class.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-purple-500/20 group-hover:text-purple-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Unified Watchlists</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Save properties from dozens of different brokers into one centralized board.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-purple-500/20 group-hover:text-purple-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">True-Data View</span>
                        <span className="mt-0.5 block text-base text-zinc-400">See standardized property details without conflicting information from different listings.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ── Card 4: Developers (Amber Theme) ── */}
          <article data-fade data-delay="0" style={f()} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-amber-500/[0.04] hover:border-amber-500/20 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.1)]">

            {/* Icon */}
            <div className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 h-36 w-36 text-amber-500/10 transition-all duration-500 group-hover:scale-110 group-hover:text-amber-500/20 lg:h-44 lg:w-44" aria-hidden="true">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>

            {/* Rod */}
            <div className="relative z-10 flex flex-row-reverse items-center justify-between px-10 py-7 lg:px-14">
              <div className="pl-24">
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-amber-500/80 lg:text-sm">For Developers</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white lg:text-[1.75rem] lg:leading-snug">
                  Scout viable land and development plays.
                </h3>
              </div>
            </div>

            {/* Expandable */}
            <div className="relative z-10 grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-10 px-10 pb-10 pt-2 lg:flex-row-reverse lg:items-start lg:justify-between lg:px-14 lg:pb-14">
                  <p className="max-w-2xl pl-8 text-lg leading-relaxed text-zinc-400">
                    Stop hunting across disparate county records and outdated zoning maps. We compile land parcels, zoning data, and adjacent comps to help you underwrite your next project.
                  </p>
                  <ul className="w-full shrink-0 space-y-6 lg:w-[30rem]">
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-amber-500/20 group-hover:text-amber-400">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Zoning &amp; Parcel Data</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Filter specifically for vacant land, lot size, and buildable square footage.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-amber-500/20 group-hover:text-amber-400">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Surrounding Comps</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Instantly analyze the neighborhood&apos;s current asset values and recent sales.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-amber-500/20 group-hover:text-amber-400">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Off-Market Potential</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Identify underutilized parcels by comparing lot size to existing building footprints.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ── Card 5: Appraisers (Rose Theme) ── */}
          <article data-fade data-delay="0" style={f()} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-rose-500/[0.04] hover:border-rose-500/20 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.1)]">

            {/* Icon */}
            <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 h-36 w-36 text-rose-500/10 transition-all duration-500 group-hover:scale-110 group-hover:text-rose-500/20 lg:h-44 lg:w-44" aria-hidden="true">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>

            {/* Rod */}
            <div className="relative z-10 flex items-center justify-between px-10 py-7 lg:px-14">
              <div className="pr-24">
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-rose-400/80 lg:text-sm">For Appraisers</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white lg:text-[1.75rem] lg:leading-snug">
                  Build accurate models with clean, structured data.
                </h3>
              </div>
            </div>

            {/* Expandable */}
            <div className="relative z-10 grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-10 px-10 pb-10 pt-2 lg:flex-row lg:items-start lg:justify-between lg:px-14 lg:pb-14">
                  <p className="max-w-2xl pr-8 text-lg leading-relaxed text-zinc-400">
                    Say goodbye to manual data entry and messy spreadsheets. Markit delivers standardized, analysis-ready property data directly into your valuation models.
                  </p>
                  <ul className="w-full shrink-0 space-y-6 lg:w-[30rem]">
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-rose-500/20 group-hover:text-rose-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Data Normalization</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Every property detail is standardized, stripping away duplicate entries and bad formatting.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-rose-500/20 group-hover:text-rose-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Historical Accuracy</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Access point-in-time data to see how property values and rents have shifted.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-5 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors duration-500 group-hover:bg-rose-500/20 group-hover:text-rose-300">{checkIcon}</div>
                      <div>
                        <span className="block text-lg font-medium text-white">Direct Integration</span>
                        <span className="mt-0.5 block text-base text-zinc-400">Export clean CSVs or pipe data directly into your existing underwriting tools.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
