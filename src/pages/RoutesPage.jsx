// src/pages/RoutesPage.jsx
import { useState } from "react";

export default function RoutesPage() {
  const [routes, setRoutes] = useState([
    { id: 1, name: "User API", path: "/users", upstream: "http://localhost:9001" },
    { id: 2, name: "Payments API", path: "/payments", upstream: "http://localhost:9002" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({ name: "", path: "", upstream: "" });
  const [selected, setSelected] = useState(null);

  const addRoute = () => {
    if (!form.name || !form.path || !form.upstream) return;

    const newRoute = {
      id: routes.length + 1,
      ...form,
    };

    setRoutes([...routes, newRoute]);
    setForm({ name: "", path: "", upstream: "" });
    setShowAddModal(false);
  };

  const openEdit = (route) => {
    setSelected(route);
    setForm({ name: route.name, path: route.path, upstream: route.upstream });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setRoutes(
      routes.map((r) =>
        r.id === selected.id ? { ...selected, ...form } : r
      )
    );

    setShowEditModal(false);
    setSelected(null);
    setForm({ name: "", path: "", upstream: "" });
  };

  const confirmDelete = (route) => {
    setSelected(route);
    setShowDeleteModal(true);
  };

  const deleteRoute = () => {
    setRoutes(routes.filter((r) => r.id !== selected.id));
    setShowDeleteModal(false);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Routes</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-500 transition"
        >
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
            {routes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{route.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{route.path}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{route.upstream}</td>
                <td className="px-6 py-4 text-sm text-gray-800 flex space-x-3">
                  <button
                    onClick={() => openEdit(route)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(route)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Add New Route</h2>

            <input
              type="text"
              placeholder="Route Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Path (ex: /users)"
              value={form.path}
              onChange={(e) => setForm({ ...form, path: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Upstream URL"
              value={form.upstream}
              onChange={(e) => setForm({ ...form, upstream: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addRoute}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Route Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Edit Route</h2>

            <input
              type="text"
              placeholder="Route Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Path"
              value={form.path}
              onChange={(e) => setForm({ ...form, path: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Upstream URL"
              value={form.upstream}
              onChange={(e) => setForm({ ...form, upstream: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Delete Route?</h2>
            <p className="text-gray-700 text-sm">
              Are you sure you want to delete <strong>{selected?.name}</strong>?
            </p>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteRoute}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

