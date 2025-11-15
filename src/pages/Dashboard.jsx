import { useState } from "react";
import {
  Menu,
  X,
  Gauge,
  GitBranch,
  Plug,
  Settings,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">

      {/* Sidebar */}
      <aside
        className={`
          ${open ? "w-64" : "w-20"}
          bg-slate-900 text-white transition-all duration-300
          flex flex-col border-r border-slate-800
        `}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <span className="text-xl font-semibold tracking-wide">
            {open ? "API Gateway" : "AG"}
          </span>
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-5 h-5 text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          <NavItem open={open} icon={<Gauge />} label="Dashboard" />
          <NavItem open={open} icon={<GitBranch />} label="Routes" />
          <NavItem open={open} icon={<Plug />} label="Plugins" />
          <NavItem open={open} icon={<Activity />} label="Metrics" />
          <NavItem open={open} icon={<Settings />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome</h2>
            <p className="text-gray-600">
              This is the base layout of your enterprise API gateway demo.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

function NavItem({ open, icon, label }) {
  return (
    <button
      className="
        flex items-center gap-3 w-full
        text-gray-300 hover:text-white hover:bg-slate-800
        px-3 py-2 rounded-lg transition-all
      "
    >
      {icon}
      {open && <span className="text-sm">{label}</span>}
    </button>
  );
}
