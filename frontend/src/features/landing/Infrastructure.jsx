import { useEffect, useRef } from "react";
import SectionBackdrop from "./SectionBackdrop";

export default function Infrastructure() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-fade]");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const delay = entry.target.dataset.delay || "0";

          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.style.transitionDuration = "0.7s";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          } else {
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

  const f = () => ({
    opacity: 0,
    transform: "translateY(28px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 text-white" ref={sectionRef}>
      <SectionBackdrop variant="infrastructure" />
      <div className="mx-auto w-full max-w-[120rem] px-6 lg:px-12">
        {/* Section Header */}
        <header className="mb-16 text-center">
          <h2
            data-fade
            data-delay="0"
            style={f()}
            className="text-xs font-bold tracking-widest text-zinc-500 uppercase lg:text-sm"
          >
            Infrastructure
          </h2>
          <p
            data-fade
            data-delay="100"
            style={f()}
            className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Built for speed. Powered by scale.
          </p>
          <p
            data-fade
            data-delay="200"
            style={f()}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400 lg:text-xl"
          >
            We handle the heavy lifting of data engineering so you can focus on closing deals. Here
            is what is running under the hood.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* ── ROW 1 ── */}
          {/* Card 1: Daily Automated Syncs (8 cols) */}
          <article
            data-fade
            data-delay="0"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-8 lg:p-8"
          >
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/20"></div>

            <div className="relative z-10 mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Live Sync Active
                </span>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
                Daily Automated Syncs
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 lg:text-base">
                The market never sleeps, and neither do our scrapers. Our database syncs every 24
                hours, ensuring you are never looking at stale comps or ghost listings.
              </p>
            </div>
          </article>

          {/* Card 2: One-Click Exports (4 cols) */}
          <article
            data-fade
            data-delay="100"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-4 lg:p-8"
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20"></div>

            <div className="relative z-10 mb-8 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold tracking-widest text-zinc-300 shadow-inner">
                .CSV
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                One-Click Exports
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Need the raw data? Export any filtered search directly to CSV or Excel instantly for
                your own custom modeling.
              </p>
            </div>
          </article>

          {/* ── ROW 2 ── */}
          {/* Card 3: Webhooks (4 cols) */}
          <article
            data-fade
            data-delay="0"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-4 lg:p-8"
          >
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition-all duration-700 group-hover:bg-violet-500/20"></div>
            <div className="relative z-10 mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.15)]">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                Real-Time Webhooks
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Push live market events directly to your CRM or Slack channels the moment a matching
                property hits the wire.
              </p>
            </div>
          </article>

          {/* Card 4: Geo-Spatial Indexing (4 cols) */}
          <article
            data-fade
            data-delay="100"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-4 lg:p-8"
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl transition-all duration-700 group-hover:bg-teal-500/20"></div>
            <div className="relative z-10 mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                Geo-Spatial Indexing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                We map everything. Run complex radius searches, custom polygon bounds, and zoning
                overlays with millisecond latency.
              </p>
            </div>
          </article>

          {/* Card 5: Duplicate Detection (4 cols) */}
          <article
            data-fade
            data-delay="200"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-4 lg:p-8"
          >
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-zinc-500/10 blur-3xl transition-all duration-700 group-hover:bg-zinc-400/20"></div>
            <div className="relative z-10 mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
              <svg
                className="h-5 w-5 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                Duplicate Detection
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Our AI automatically flags and merges listings posted by multiple brokers, giving
                you a single source of truth.
              </p>
            </div>
          </article>

          {/* ── ROW 3 ── */}
          {/* Card 6: Historical Archiving (3 cols) */}
          <article
            data-fade
            data-delay="0"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-3 lg:p-8"
          >
            <div className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
              <svg
                className="h-5 w-5 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Historical Archiving
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                We save the data others delete. Access years of historical pricing and
                time-on-market trends.
              </p>
            </div>
          </article>

          {/* Card 7: LLC Unmasking (3 cols) */}
          <article
            data-fade
            data-delay="100"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-3 lg:p-8"
          >
            <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-700 group-hover:bg-indigo-500/20"></div>
            <div className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
              <svg
                className="h-5 w-5 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white">LLC Unmasking</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Our engine pierces corporate veils, linking properties to true owners.
              </p>
            </div>
          </article>

          {/* Card 8: Developer API (6 cols) */}
          <article
            data-fade
            data-delay="200"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-6 lg:p-8"
          >
            <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl transition-all duration-700 group-hover:bg-pink-500/20"></div>

            <div className="relative z-10 mb-6 w-full overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d0d] p-4 font-mono text-xs shadow-2xl">
              <div className="mb-3 flex items-center space-x-2 border-b border-white/10 pb-2">
                <div className="h-2.5 w-2.5 rounded-full border border-red-500/50 bg-red-500/20"></div>
                <div className="h-2.5 w-2.5 rounded-full border border-amber-500/50 bg-amber-500/20"></div>
                <div className="h-2.5 w-2.5 rounded-full border border-emerald-500/50 bg-emerald-500/20"></div>
                <span className="ml-2 text-[10px] text-zinc-500">api_response.json</span>
              </div>
              <div className="text-zinc-300">
                <div>
                  <span className="text-pink-400">&quot;property&quot;</span>: {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-pink-400">&quot;id&quot;</span>:{" "}
                  <span className="text-blue-400">&quot;mkt_98237&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-pink-400">&quot;price&quot;</span>:{" "}
                  <span className="text-emerald-400">4500000</span>,
                </div>
                <div className="pl-4">
                  <span className="text-pink-400">&quot;cap_rate&quot;</span>:{" "}
                  <span className="text-emerald-400">0.058</span>,
                </div>
                <div>{"}"}</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-between md:flex-row md:items-end">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                  Developer API
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Plug our normalized CRE data directly into your own tools.
                </p>
              </div>
            </div>
          </article>

          {/* ── ROW 4 ── */}
          {/* Card 9: Elastic Scaling (7 cols) */}
          <article
            data-fade
            data-delay="0"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-7 lg:p-8"
          >
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl transition-all duration-700 group-hover:bg-orange-500/20"></div>

            <div className="relative z-10 mb-8 flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-10 w-5 rounded-full border border-orange-500/30 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.15)] ${i === 4 ? "animate-pulse border-orange-400/50 bg-orange-400/30" : ""}`}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
                Elastic Scaling
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 lg:text-base">
                Built on Kubernetes for limitless horizontal scaling. We handle massive market data
                spikes and heavy API pulls seamlessly without ever throttling your endpoints.
              </p>
            </div>
          </article>

          {/* Card 10: Bank-Grade Security (5 cols) */}
          <article
            data-fade
            data-delay="100"
            style={f()}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.03] lg:col-span-5 lg:p-8"
          >
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-slate-500/10 blur-3xl transition-all duration-700 group-hover:bg-slate-500/20"></div>

            <div className="relative z-10 mb-8 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-inner">
                <svg
                  className="h-6 w-6 text-zinc-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase shadow-inner">
                SOC 2 Type II
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                Bank-Grade Security
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Enterprise-level encryption for all saved searches, user models, and proprietary
                data pipelines. Your competitive edge remains securely yours.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
