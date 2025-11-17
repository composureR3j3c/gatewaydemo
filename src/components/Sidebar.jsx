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

export default function Sidebar({ open }) {
  return (
    <>
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
          {/* <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-5 h-5 text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-300" />
            )}
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          <NavItem open={open} icon={<Gauge />} link={"/"} label="Dashboard" />
          <NavItem open={open} icon={<GitBranch />} link={"/routes"} label="Routes" />
          <NavItem open={open} icon={<Plug />} label="Plugins" link={"/plugins"} />
          <NavItem open={open} icon={<Activity />} label="Metrics" />
          <NavItem open={open} icon={<Settings />} label="Settings" />
        </nav>
      </aside>
      </>
  );
}


function NavItem({ open, icon, label,link}) {
  return (
    <Link
      className="
        flex items-center gap-3 w-full
        text-gray-300 hover:text-white hover:bg-slate-800
        px-3 py-2 rounded-lg transition-all
      "
      to={link}
    >
      {icon}
      {open && <span className="text-sm">{label}</span>}
    </Link>
  );
}
