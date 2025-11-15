import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  return (
    <div
      className={`h-full transition-all duration-300 shadow-xl bg-slate-900 text-slate-200 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 font-bold text-xl tracking-wide text-amber-400">
        GATEWAY
      </div>

      <ul className="mt-6 space-y-2 px-3 text-sm">
        <li>
          <Link
            to="/routes"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            📡 <span className={open ? "inline" : "hidden"}>Routes</span>
          </Link>
        </li>

        <li>
          <Link
            to="/plugins"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            🔌 <span className={open ? "inline" : "hidden"}>Plugins</span>
          </Link>
        </li>

        <li>
          <Link
            to="/logs"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            📜 <span className={open ? "inline" : "hidden"}>Logs</span>
          </Link>
        </li>

        <li>
          <Link
            to="/metrics"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            📊 <span className={open ? "inline" : "hidden"}>Metrics</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
