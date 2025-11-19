import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RoutesPage from "./pages/RoutesPage";
import Dashboard from "./pages/Dashboard";
import PluginsPage from "./pages/PluginsPage";
import MetricsPage from "./pages/MetricsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import APIKeysPage from "./pages/APIKeysPage";
import Login from "./pages/Login";
// import MetricsPage from "./pages/MetricsPage";
// import LogsPage from "./pages/LogsPage";
// import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [open, setOpen] = useState(true);
  const auth = localStorage.getItem("auth");
  //http://localhost:5173/?user=admin@test.com&password=admin
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  const password = params.get("password");
  if (user === "admin@test.com" && password === "admin") {
    localStorage.setItem("auth", "true");
    window.location.replace("/");
  }

  if (!auth) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar open={open} />

      <div className="flex flex-col flex-1">
        <Topbar toggle={() => setOpen(!open)} />

        <div className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/plugins" element={<PluginsPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            {/* <Route path="/logs" element={<LogsPage />} /> */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/apikeys" element={<APIKeysPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
