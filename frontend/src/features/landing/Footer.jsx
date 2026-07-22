import { Link } from "react-router-dom";
import SectionBackdrop from "./SectionBackdrop";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-zinc-950 pt-24 pb-16 text-white">
      <SectionBackdrop variant="footer" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Copyright */}
          <div className="flex flex-col lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              {/* Custom 'M' with Checkmark Logo */}
              <svg className="h-8 w-8 text-white" viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 28V8L12 18L20 8V28"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 20L20 26L32 10"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold tracking-tight text-white">Markit</span>
            </Link>
            <p className="mt-6 max-w-xs text-lg font-medium text-zinc-400">
              Messy listings in. Market clarity out.
            </p>
            <div className="mt-auto pt-16 text-sm text-zinc-600">
              © 2026 Markit. All rights reserved.
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Product</h3>
            <ul className="mt-6 flex flex-col space-y-4">
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Data Sources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Resources</h3>
            <ul className="mt-6 flex flex-col space-y-4">
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Legal</h3>
            <ul className="mt-6 flex flex-col space-y-4">
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-zinc-400 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
