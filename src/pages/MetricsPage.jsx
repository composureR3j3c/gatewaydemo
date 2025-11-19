// src/pages/MetricsPage.jsx
import React from "react";
import metricsJson from "/src/data/metrics.json";
import {
  BarChart3,
  Activity,
  Server,
  Clock,
  Gauge,
  Network,
} from "lucide-react";

export default function MetricsPage() {
  const metrics = metricsJson;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Metrics</h1>

      {/* --- GRID — SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
          label="Total Requests"
          value={metrics.requests.toLocaleString()}
        />
        <MetricCard
          icon={<Activity className="w-5 h-5 text-green-600" />}
          label="Success Rate"
          value={`${metrics.successRate}%`}
        />
        <MetricCard
          icon={<Clock className="w-5 h-5 text-purple-600" />}
          label="Avg Latency"
          value={`${metrics.avgLatency} ms`}
        />
        <MetricCard
          icon={<Gauge className="w-5 h-5 text-orange-600" />}
          label="Active Plugins"
          value={metrics.activePlugins}
        />
      </div>

      {/* --- TRAFFIC GRAPH (BAR MOCK) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-5 rounded-xl shadow border space-y-4  overflow-auto 
      ">
        <h2 className="text-lg font-medium mb-3">Traffic (Mock)</h2>

        <div className="px-3 flex items-end justify-   
         gap-6 h-40">
          {metrics.traffic.map((t) => (
            <div key={t.label} className="flex flex-col items-center hover:py-1">
              <div
                className="bg-slate-600 w-6 rounded-md transition-all hover:bg-slate-900 hover:cursor-pointer"
                style={{ height: `${(t.count / 8000) * 120}px` }}
              ></div>
              <span className="text-xs mt-1 text-gray-600">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow border overflow-x-auto">
        <h2 className="text-lg font-medium mb-3">Traffic Yesterday (Mock)</h2>

        <div className="px-3 flex items-end justify-   
         gap-6 h-40">
          {metrics.traffic2.map((t) => (
            <div key={t.label} className="flex flex-col items-center hover:py-1
            ">
              <div
                className="bg-slate-300 w-6 rounded-md transition-all hover:bg-slate-600 hover:cursor-pointer"
                style={{ height: `${(t.count / 8000) * 120}px` }}
              ></div>
              <span className="text-xs mt-1 text-gray-600">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
</div>
      {/* --- NODE HEALTH TABLE --- */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5 text-gray-800" />
          <h2 className="text-lg font-medium">Node Stats</h2>
        </div>

  <div className="overflow-x-auto">
  <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-2">Node</th>
              <th className="pb-2">CPU</th>
              <th className="pb-2">Memory</th>
              <th className="pb-2">Connections</th>
            </tr>
          </thead>
          <tbody>
            {metrics.nodes.map((n) => (
              <tr key={n.id} className="border-b last:border-none">
                <td className="py-2">{n.id}</td>
                <td>{n.cpu}%</td>
                <td>{n.mem}%</td>
                <td>{n.connections}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* --- PLUGIN ACTIVITY MOCK --- */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <div className="flex items-center gap-2 mb-3">
          <Network className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-medium">Plugin Activity (Mock)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["rate-limiting", "jwt", "cors"].map((plugin) => (
            <div
              key={plugin}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="font-semibold capitalize">{plugin}</div>
              <div className="text-sm text-gray-600 mt-2">
                Requests: {Math.floor(Math.random() * 9000) + 1000}
              </div>
              <div className="text-sm text-gray-600">
                Blocks: {Math.floor(Math.random() * 120)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="p-4 bg-white border shadow rounded-xl flex items-center gap-3">
      <div className="p-3 bg-gray-100 rounded-xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
