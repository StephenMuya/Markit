const trustedBrands = [
  "Zillow",
  "Trulia",
  "Redfin",
  "CoStar",
  "LoopNet",
  "CBRE",
  "JLL",
  "Cushman & Wakefield",
  "Realtor.com",
  "Keller Williams",
];

export default function BrandScroller() {
  return (
    <aside
      className="relative mx-auto mt-20 w-full max-w-[90%] overflow-hidden"
      aria-labelledby="trusted-brands-heading"
    >
      <h2
        id="trusted-brands-heading"
        className="mb-6 text-center text-xs font-bold tracking-widest text-gray-500 uppercase"
      >
        Trusted by industry leaders
      </h2>
      <div className="relative flex overflow-hidden">
        <ul className="animate-marquee m-0 flex w-max list-none items-center gap-12 p-0 pr-12 sm:gap-24 sm:pr-24">
          {[...trustedBrands, ...trustedBrands].map((brand, i) => (
            <li
              key={`${brand}-${i}`}
              className="inline-block text-2xl font-bold whitespace-nowrap text-gray-400/50 transition hover:text-gray-300"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
      {/* Fade overlays for smooth entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent"></div>
    </aside>
  );
}
