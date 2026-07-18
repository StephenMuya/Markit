export default function HowItWorks() {
  return (
    <section className="bg-zinc-950 py-24 text-white">
      <div className="w-full px-6 lg:px-12">
        {/* Bento Grid Container */}
        <div className="relative mx-auto w-full max-w-[120rem]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[800px]">
            {/* Section Header (Left top) */}
            <header className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-start-1 lg:row-start-1 lg:p-14">
              {/* Abstract large background element */}
              <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>
              
              <div className="relative z-10">
                <h2 className="text-7xl font-semibold leading-none tracking-tighter md:text-8xl lg:text-9xl xl:text-[9rem]">
                  How It Works
                </h2>
                <p className="mt-8 max-w-xl text-3xl text-zinc-400">
                  From raw fragments to structured insights.
                </p>
              </div>
            </header>

            {/* Step 1: Ingest (Left bottom) */}
            <article className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-start-1 lg:row-start-2 lg:p-14">
              <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>

              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                {/* Database Icon */}
                <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75C20.25 20.393 16.556 22.25 12 22.25s-8.25-1.857-8.25-4.125v-3.75m-16.5-3.75v3.75" />
                </svg>
              </div>
              <div className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase">01 / Ingest</div>
              <h3 className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">The Scraping Engine</h3>
              <p className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400">
                We scan and scrape raw, real-time property listings from over 120+ major CRE platforms and fragmented real estate sites simultaneously.
              </p>
            </article>

            {/* Step 2: Clean & Categorize (Right top) */}
            <article className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-start-2 lg:row-start-1 lg:p-14">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>

              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                {/* Filter / Cpu Icon */}
                <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </div>
              <div className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase">02 / Clean & Categorize</div>
              <h3 className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">The Processing Engine</h3>
              <p className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400">
                Our engine automatically normalizes text, strips duplicates, and parses messy details into structured categories tailored for agents, buyers, and investors.
              </p>
            </article>

            {/* Step 3: Deliver (Right bottom) */}
            <article className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.03] lg:col-start-2 lg:row-start-2 lg:p-14">
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-zinc-800/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-700/20"></div>

              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                {/* LayoutDashboard Icon */}
                <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-1.125 1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.125 1.125v-1.5c0-.621-.504-1.125-1.125-1.125M7.125 19.5h9.75m-9.75 0A1.125 1.125 0 016 18.375m1.125 1.125c-.621 0-1.125-.504-1.125-1.125m0 0v-1.5c0-.621.504-1.125 1.125-1.125m-1.125 1.125c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.125 2.625c-.621 0-1.125.504-1.125 1.125m1.125-1.125c.621 0 1.125.504 1.125 1.125m0 0v-1.5c0-.621.504-1.125 1.125-1.125m-1.125 1.125c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 18.375M18 18.375v-1.5m1.125 1.5A1.125 1.125 0 0118 16.875" />
                </svg>
              </div>
              <div className="relative z-10 text-base font-semibold tracking-tight text-zinc-500 uppercase">03 / Deliver</div>
              <h3 className="relative z-10 mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">The Dashboard Experience</h3>
              <p className="relative z-10 mt-4 text-lg leading-relaxed text-zinc-400">
                The finalized data lands directly in your unified, lightning-fast dashboard, ready for you to filter, analyze, and act on instantly.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
