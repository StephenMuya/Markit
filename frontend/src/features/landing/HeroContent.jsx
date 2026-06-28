import { Link } from "react-router-dom";

export default function HeroContent() {
  return (
    <header className="mx-auto max-w-6xl text-center">
      <h1 className="font-nunito text-6xl leading-[1.02] font-black tracking-tight text-white md:text-8xl lg:text-9xl">
        Messy Listings In. <span className="text-gray-400">Market Clarity</span> Out.
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white">
        Markit aggregates raw property data from major CRE platforms and real estate sites, then
        cleans and categorizes it into actionable insight for buyers, agents, and investors.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          className="rounded-md bg-white px-6 py-3 text-center text-sm font-black text-black shadow-lg shadow-black/20 transition hover:bg-gray-400"
          to="/search"
        >
          START SEARCH HERE
        </Link>
        <a
          className="rounded-md border border-white/25 bg-white/5 px-6 py-3 text-center text-sm font-black text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
          href="#sources"
        >
          See Data Sources
        </a>
      </div>
    </header>
  );
}
