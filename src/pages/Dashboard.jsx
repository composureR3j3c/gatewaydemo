import React, { useState, useEffect } from "react";
import routesJson from "/src/data/routes.json";
import pluginsJson from "/src/data/plugins.json";
import { BarChart3, Network, Plug, Plug2, Route } from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeConnections: 125,
    totalRoutes: 8,
    totalPlugins: 12,
    avgLatency: 120, // ms
    nodeVersion: "2.1.0",
    hostname: "gateway-node-01",
  });

  const [routes, setRoutes] = useState(routesJson);

  const [plugins, setplugins] = useState(pluginsJson);

  // Example: simulate live metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeConnections:
          prev.activeConnections + Math.floor(Math.random() * 5 - 2),
        avgLatency: 100 + Math.floor(Math.random() * 50),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900">
        API Gateway Dashboard
      </h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border shadow rounded-xl flex items-center gap-2 px-4">
          <div className="p-3 bg-blue-100 rounded-xl flex items-center gap-3">
            <Network className="w-5 h-5 text-blue-600" />
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-sm">Active Connections</span>
            <span className="text-2xl font-bold">
              {metrics.activeConnections}
            </span>
          </div>
        </div>
        <div className="bg-white border shadow rounded-xl flex items-center gap-2 px-4">
          <div className="p-3 bg-red-100 rounded-xl flex items-center gap-3">
            <Route className="w-5 h-5 text-red-600" />
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-sm">Total Routes</span>
            <span className="text-2xl font-bold">{routes.length}</span>
          </div>
        </div>
        <div className="bg-white border shadow rounded-xl flex items-center gap-2 px-4">
          <div className="p-3 bg-green-100 rounded-xl flex items-center justify-center">
            <Plug className="w-5 h-5 text-green-600" />
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-sm">Total Plugins</span>
            <span className="text-2xl font-bold">{plugins.length}</span>
          </div>
        </div>
        <div className="bg-white border shadow rounded-xl flex items-center gap-2 px-4">
          <div className="p-3 bg-purple-100 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-sm">Avg Latency</span>
            <span className="text-2xl font-bold">{metrics.avgLatency} ms</span>
          </div>
        </div>
      </div>

      {/* Node Info */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Node Info</h2>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
          <p className="text-gray-700 w-full sm:w-auto">
            Hostname: <span className="font-medium">{metrics.hostname}</span>
          </p>
          <p className="text-gray-700 w-full sm:w-auto">
            Version: <span className="font-medium">{metrics.nodeVersion}</span>
          </p>
          <p className="text-gray-700 w-full sm:w-auto">
            Uptime: <span className="font-medium">{Math.floor(Math.random() * 100)} hrs</span>
          </p>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Routes</h2>
        <div className="overflow-x-auto">
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
      </div>

      {/* Plugins Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Plugins</h2>
        <div className="flex flex-wrap gap-2">
          {plugins.map((p) => (
            <span
              key={p.id}
              className={`px-2 py-1 rounded text-sm m-1 ${p.enabled ? "bg-green-200 text-green-800" : "bg-slate-200 text-gray-700"}`}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
