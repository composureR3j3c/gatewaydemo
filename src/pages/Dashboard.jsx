import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeConnections: 125,
    totalRoutes: 8,
    totalPlugins: 12,
    avgLatency: 120, // ms
    nodeVersion: "2.1.0",
  });

  const routes = [
    { id: 1, name: "User API", path: "/users", upstream: "http://localhost:9001" },
    { id: 2, name: "Payments API", path: "/payments", upstream: "http://localhost:9002" },
  ];

  const plugins = [
    { id: 1, name: "Rate Limiting", enabled: true },
    { id: 2, name: "API Key Auth", enabled: false },
    { id: 3, name: "JWT Auth", enabled: true },
  ];

  // Example: simulate live metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 5 - 2),
        avgLatency: 100 + Math.floor(Math.random() * 50),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900">API Gateway Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Active Connections</span>
          <span className="text-2xl font-bold">{metrics.activeConnections}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Total Routes</span>
          <span className="text-2xl font-bold">{routes.length}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Total Plugins</span>
          <span className="text-2xl font-bold">{plugins.length}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Avg Latency</span>
          <span className="text-2xl font-bold">{metrics.avgLatency} ms</span>
        </div>
      </div>

      {/* Node Info */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Node Info</h2>
        <p className="text-gray-700">Version: <span className="font-medium">{metrics.nodeVersion}</span></p>
        <p className="text-gray-700">Uptime: <span className="font-medium">{Math.floor(Math.random() * 100)} hrs</span></p>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Routes</h2>
        <table className="min-w-full text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Path</th>
              <th className="px-4 py-2">Upstream</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {routes.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.path}</td>
                <td className="px-4 py-2">{r.upstream}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plugins Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Plugins</h2>
        <table className="min-w-full text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Enabled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {plugins.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${p.enabled ? "bg-green-600" : "bg-red-600"}`}>
                    {p.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
