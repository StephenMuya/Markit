import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]">
        <Navbar />
      </div>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
