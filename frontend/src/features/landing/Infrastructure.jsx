export default function Infrastructure() {
  return (
    <section className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto w-full max-w-[120rem] px-6 lg:px-12">
        {/* Section Header */}
        <header className="mb-20 text-center">
          <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
            Infrastructure
          </h2>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            Built for speed. Powered by scale.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400">
            We handle the heavy lifting of data engineering so you can focus on closing deals. Here is what is running under the hood.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Card 1: Daily Automated Syncs (Large) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-8 lg:p-14">
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/20"></div>
            
            <div className="relative z-10 mb-16">
              <div className="inline-flex items-center space-x-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                 <span className="relative flex h-3 w-3">
                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                 </span>
                 <span className="text-sm font-semibold tracking-wide uppercase">Live Sync Active</span>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-semibold tracking-tight text-white lg:text-5xl">Daily Automated Syncs</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl">
                The market never sleeps, and neither do our scrapers. Our database syncs every 24 hours, ensuring you are never looking at stale comps or ghost listings.
              </p>
            </div>
          </article>

          {/* Card 2: One-Click Exports (Medium) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-4 lg:p-12">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"></div>

            <div className="relative z-10 mb-12 flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-bold tracking-widest text-zinc-300 shadow-inner">
                .CSV
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">One-Click Exports</h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Need the raw data? Export any filtered search directly to CSV or Excel instantly for your own custom modeling.
              </p>
            </div>
          </article>

          {/* Card 4: Historical Archiving (Small) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-3 lg:p-10">
            <div className="relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
              {/* Clock Icon */}
              <svg className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">Historical Archiving</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We save the data others delete. Access years of historical pricing and time-on-market trends.
              </p>
            </div>
          </article>

          {/* Card 5: Duplicate Detection (Small) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-3 lg:p-10">
            <div className="relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
              {/* Shield/Check Icon */}
              <svg className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">Duplicate Detection</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Our AI automatically flags and merges listings posted by multiple brokers, giving you a single source of truth.
              </p>
            </div>
          </article>

          {/* Card 3: Developer API (Medium) */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-span-6 lg:p-12">
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl transition-all duration-700 group-hover:bg-pink-500/20"></div>

            <div className="relative z-10 mb-10 w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 font-mono text-sm shadow-2xl">
              <div className="mb-4 flex items-center space-x-2 border-b border-white/10 pb-3">
                <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20"></div>
                <div className="h-3 w-3 rounded-full border border-amber-500/50 bg-amber-500/20"></div>
                <div className="h-3 w-3 rounded-full border border-emerald-500/50 bg-emerald-500/20"></div>
                <span className="ml-2 text-xs text-zinc-500">api_response.json</span>
              </div>
              <div className="text-zinc-300">
                <div><span className="text-pink-400">&quot;property&quot;</span>: {'{'}</div>
                <div className="pl-6"><span className="text-pink-400">&quot;id&quot;</span>: <span className="text-blue-400">&quot;mkt_98237&quot;</span>,</div>
                <div className="pl-6"><span className="text-pink-400">&quot;price&quot;</span>: <span className="text-emerald-400">4500000</span>,</div>
                <div className="pl-6"><span className="text-pink-400">&quot;cap_rate&quot;</span>: <span className="text-emerald-400">0.058</span>,</div>
                <div className="pl-6"><span className="text-pink-400">&quot;status&quot;</span>: <span className="text-amber-400">&quot;Active&quot;</span></div>
                <div>{'}'}</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-between md:flex-row md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">Developer API</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-400">
                  Plug our normalized, clean CRE data directly into your own proprietary brokerage tools or internal dashboards.
                </p>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
