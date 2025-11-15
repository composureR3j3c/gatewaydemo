import { useState } from "react";

export default function RoutesPage() {
  const [routes, setRoutes] = useState([
    { id: 1, name: 'User API', path: '/users', upstream: 'http://localhost:9001' },
    { id: 2, name: 'Payments API', path: '/payments', upstream: 'http://localhost:9002' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Routes</h1>
        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-500 transition">
          + Add Route
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Path</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Upstream</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {routes.map(route => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{route.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{route.path}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{route.upstream}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}