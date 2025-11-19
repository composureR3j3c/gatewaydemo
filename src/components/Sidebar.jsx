import {
  Menu,
  X,
  Gauge,
  GitBranch,
  Plug,
  Settings,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
 import "/src/logo.css";
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop sidebar (md and up) - keep existing behavior/UI unchanged */}
      <aside
        id="sidebar"
        className={`hidden md:flex ${open ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex-col border-r border-slate-800`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <span
            className="text-xl font-mono font-bold tracking-wide double-underline"
          >
            {open ? "Portus GW" : "PGW"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          <NavItem open={open} icon={<Gauge />} link={"/"} label="Dashboard" />
          <NavItem open={open} icon={<GitBranch />} link={"/routes"} label="Routes" />
          <NavItem open={open} icon={<Plug />} label="Plugins" link={"/plugins"} />
          <NavItem open={open} icon={<Activity />} label="Metrics" link={"/metrics"} />
          <NavItem open={open} icon={<Settings />} label="Settings" link={"/settings"} />
        </nav>
      </aside>

      {/* Mobile overlay (smaller screens) - appears when `open` is true */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="sidebar">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              if (typeof onClose === "function") onClose();
            }}
          />

          {/* panel (slide-in) */}
          <div className="relative w-64 bg-slate-900 text-white h-full border-r border-slate-800 shadow-lg transform transition-transform duration-200 translate-x-0">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <span className="text-xl font-mono font-bold tracking-wide">Portus GW</span>
              <button
                onClick={() => {
                  if (typeof onClose === "function") onClose();
                }}
                className="p-2 rounded-md hover:bg-slate-800"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <nav className="flex-1 mt-4 space-y-1 px-3">
              <NavItem
                open={true}
                icon={<Gauge />}
                link={"/"}
                label="Dashboard"
                onClose={onClose}
                closeOnClick={true}
              />
              <NavItem
                open={true}
                icon={<GitBranch />}
                link={"/routes"}
                label="Routes"
                onClose={onClose}
                closeOnClick={true}
              />
              <NavItem
                open={true}
                icon={<Plug />}
                label="Plugins"
                link={"/plugins"}
                onClose={onClose}
                closeOnClick={true}
              />
              <NavItem
                open={true}
                icon={<Activity />}
                label="Metrics"
                link={"/metrics"}
                onClose={onClose}
                closeOnClick={true}
              />
              <NavItem
                open={true}
                icon={<Settings />}
                label="Settings"
                link={"/settings"}
                onClose={onClose}
                closeOnClick={true}
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}


function NavItem({ open, icon, label, link, onClose, closeOnClick }) {
  return (
    <Link
      className="
        flex items-center gap-3 w-full
        text-gray-300 hover:text-white hover:bg-slate-800
        px-3 py-2 rounded-lg transition-all
      "
      to={link}
      onClick={() => {
        if (closeOnClick && typeof onClose === "function") onClose();
      }}
    >
      {icon}
      {open && <span className="text-sm">{label}</span>}
    </Link>
  );
}
