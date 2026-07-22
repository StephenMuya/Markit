import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import { navigationContent } from "../../data/siteContent";

export default function Navbar({ onSignInClick }) {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <Link to="/" className="text-xl font-black tracking-normal text-white">
        Markit
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        <Dropdown label="Product" items={navigationContent.productItems} dark />
        <Dropdown label="Solutions" items={navigationContent.solutionItems} dark />
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
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-gray-400"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
