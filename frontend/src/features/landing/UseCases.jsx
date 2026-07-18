export default function UseCases() {
  return (
    <section className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto w-full max-w-[120rem] px-6 lg:px-12">
        {/* Section Header */}
        <header className="mb-20 text-center">
          <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
            Use Cases
          </h2>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            Engineered for every angle of the market.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400">
            Whether you are hunting for yield, pricing a listing, or searching for a headquarters, Markit restructures the web&apos;s data to fit your exact workflow.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Agents (Spans full width on desktop) */}
          <article className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-2 lg:p-14">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-zinc-800/20 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/30"></div>
            
            <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Side: Header & Body */}
              <div className="max-w-2xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                  {/* Briefcase Icon */}
                  <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.896 2.083-2.001 2.083H5.75c-1.105 0-2.001-.989-2.001-2.083v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v.011a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-.011M12 10.5v-1.5m0 0a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5m6 0v-1.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5m-3-1.5h6" />
                  </svg>
                </div>
                <div className="text-base font-semibold tracking-tight text-zinc-500 uppercase">For Agents</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
                  Close deals faster with unified market clarity.
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-zinc-400 lg:text-xl">
                  Stop wasting hours cross-referencing broken links and duplicate listings. Markit aggregates the entire market so you can pull comps, analyze trends, and match leads in seconds.
                </p>
              </div>

              {/* Right Side: Features */}
              <div className="w-full shrink-0 lg:w-[28rem]">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-lg font-medium text-white">Automated Comp Pulling</span>
                      <span className="mt-1 block text-base text-zinc-400">Instantly generate comparative market analyses from normalized data.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-lg font-medium text-white">Real-Time Market Alerts</span>
                      <span className="mt-1 block text-base text-zinc-400">Be the first to know when a property hits any of our 120+ tracked sources.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-lg font-medium text-white">Client-Ready Exports</span>
                      <span className="mt-1 block text-base text-zinc-400">Package clean, branded data to send directly to your buyers.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* Card 2: Investors (Bottom Left) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:p-14">
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>
            
            <div className="relative z-10 mb-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                {/* Trending Icon */}
                <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <div className="text-base font-semibold tracking-tight text-zinc-500 uppercase">For Investors</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Find the signal in the noise.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                Identify high-yield opportunities before the broader market reacts. Our structured data engine gives you the analytical edge to filter by the metrics that actually matter.
              </p>
            </div>

            <div className="relative z-10">
              <ul className="space-y-4 border-t border-white/10 pt-8">
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">Advanced Metric Filtering:</span>
                    <span className="ml-1 text-zinc-400">Search by cap rate, price per square foot, and yield.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">Trend Visualization:</span>
                    <span className="ml-1 text-zinc-400">Track asset class performance across zip codes over time.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">Off-Market Indicators:</span>
                    <span className="ml-1 text-zinc-400">Spot patterns in time-on-market data to identify motivated sellers.</span>
                  </div>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 3: Buyers (Bottom Right) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:p-14">
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>
            
            <div className="relative z-10 mb-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                {/* Building Icon */}
                <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="text-base font-semibold tracking-tight text-zinc-500 uppercase">For Buyers</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Discover the right property without the hassle.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                Get a complete, unvarnished view of available properties matching your exact criteria. We strip away the marketing fluff and duplicates so you can find exactly what you need.
              </p>
            </div>

            <div className="relative z-10">
              <ul className="space-y-4 border-t border-white/10 pt-8">
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">Hyper-Specific Search:</span>
                    <span className="ml-1 text-zinc-400">Filter by strict zoning data, exact square footage, and property class.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">Unified Watchlists:</span>
                    <span className="ml-1 text-zinc-400">Save properties from dozens of different brokers into one centralized board.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-zinc-500"></div>
                  <div>
                    <span className="font-medium text-white">True-Data View:</span>
                    <span className="ml-1 text-zinc-400">See standardized property details without conflicting information from different listings.</span>
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
