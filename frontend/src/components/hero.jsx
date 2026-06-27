import { useState, useEffect, useRef } from "react";

const productItems = ["Search Dashboard", "Clean Data", "Smart Categories", "Market Alerts"];
const solutionItems = ["Buyers", "Agents", "Investors"];
const trustedBrands = ["Zillow", "Trulia", "Redfin", "CoStar", "LoopNet", "CBRE", "JLL", "Cushman & Wakefield", "Realtor.com", "Keller Williams"];

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out curve
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  // Format number with commas
  const formatted = count.toLocaleString();

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}

function Dropdown({ label, items, dark }) {
  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold transition ${dark
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-slate-700 hover:bg-white hover:text-slate-950"
          }`}
      >
        {label}
        <span className={`text-xs ${dark ? "text-white/50" : "text-gray-500"}`}>▾</span>
      </button>
      <div className="invisible absolute left-0 top-full z-20 mt-2 w-52 rounded-md border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <a
            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
            className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-gray-100 hover:text-gray-900"
            key={item}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Full-bleed skyline background ── */}
      <img
        src="/city-skyline.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-bottom"
      />

      {/* Dark overlay — moody sky, high contrast */}
      <div className="absolute inset-0 bg-black/65" />
      {/* Stronger darkening at bottom for building depth */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black tracking-normal text-white">
            Markit
          </a>

          <div className="hidden items-center gap-1 md:flex">
            <Dropdown label="Product" items={productItems} dark />
            <Dropdown label="Solutions" items={solutionItems} dark />
            <a
              className="rounded-md px-3 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="#sources"
            >
              Data Sources
            </a>
            <a
              className="rounded-md px-3 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="rounded-md px-3 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="#resources"
            >
              Resources
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-gray-400"
              href="#signin"
            >
              Sign In
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-6 pb-10 pt-6 lg:min-h-[calc(100vh-80px)] lg:pb-16 lg:pt-8">
          <div className="mx-auto max-w-6xl text-center">

            <h1 className="text-6xl font-black leading-[1.02] tracking-tight text-white md:text-8xl lg:text-9xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Messy Listings In.{" "}
              <span className="text-gray-400">
                Market Clarity
              </span>{" "}
              Out.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white">
              Markit aggregates raw property data from major CRE platforms and
              real estate sites, then cleans and categorizes it into actionable
              insight for buyers, agents, and investors.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                className="rounded-md bg-white px-6 py-3 text-center text-sm font-black text-black shadow-lg shadow-black/20 transition hover:bg-gray-400"
                href="#search"
              >
                START SEARCH HERE
              </a>
              <a
                className="rounded-md border border-white/25 bg-white/5 px-6 py-3 text-center text-sm font-black text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
                href="#sources"
              >
                See Data Sources
              </a>
            </div>
          </div>

          {/* Social proof counters */}
          <div className="pt-10">
            <div className="mx-auto grid gap-8 sm:grid-cols-3 lg:max-w-3xl">
              {[
                { label: "Property Index", target: 50000, suffix: "+" },
                { label: "Data Points Processed", target: 2400000, suffix: "+" },
                { label: "Sources Ingested", target: 120, suffix: "+" },
              ].map(({ label, target, suffix }) => (
                <div className="text-center" key={label}>
                  <p className="text-3xl font-black text-white md:text-4xl">
                    <CountUp target={target} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Brands Scroller */}
          <div className="mt-20 overflow-hidden relative w-full mx-auto max-w-[90%]">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
              Trusted by industry leaders
            </p>
            {/* Scroller container */}
            <div className="flex overflow-hidden relative">
              <div className="flex w-max animate-marquee items-center gap-12 pr-12 sm:gap-24 sm:pr-24">
                {[...trustedBrands, ...trustedBrands].map((brand, i) => (
                  <span
                    key={i}
                    className="inline-block text-2xl font-bold text-gray-400/50 transition hover:text-gray-300 whitespace-nowrap"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            {/* Fade overlays for smooth entry/exit */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

