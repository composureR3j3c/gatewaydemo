import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RoutesPage from "./pages/RoutesPage";
// import PluginsPage from "./pages/PluginsPage";
// import MetricsPage from "./pages/MetricsPage";
// import LogsPage from "./pages/LogsPage";
// import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar open={open} />

      <div className="flex flex-col flex-1">
        <Topbar toggle={() => setOpen(!open)} />

        <div className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<RoutesPage />} />
            <Route path="/routes" element={<RoutesPage />} />
            {/* <Route path="/plugins" element={<PluginsPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/settings" element={<SettingsPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}
