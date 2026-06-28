export default function Dropdown({ label, items, dark }) {
  return (
    <div className="group relative">
      <button
        aria-haspopup="menu"
        aria-expanded="false"
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold transition ${
          dark
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-slate-700 hover:bg-white hover:text-slate-950"
        }`}
      >
        {label}
        <span className={`text-xs ${dark ? "text-white/50" : "text-gray-500"}`}>▾</span>
      </button>
      <menu className="invisible absolute top-full left-0 z-20 m-0 mt-2 w-52 list-none rounded-md border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </a>
          </li>
        ))}
      </menu>
    </div>
  );
}
