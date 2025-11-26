import { useState } from "react";
import EditPluginModal from "../components/modals/EditPluginModal";
import AddPluginModal from "../components/modals/AddPluginModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import pluginsJson from "/src/data/plugins.json";

export default function PluginsPage() {
  const [plugins, setPlugins] = useState(pluginsJson);

  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  return (
    <> 
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Plugins</h1>

        <div className="bg-white shadow rounded-xl p-6 border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Id</th>
                <th className="py-2">Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plugins.map((p) => (
                <tr key={p.id} className="border-b last:border-none">
                  <td className="py-3">{p.id}</td>
                  <td className="py-3">{p.label}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
                      <button
                        className="w-full md:w-auto px-3 py-1 bg-slate-800 text-white rounded-lg text-xs"
                        onClick={() => setEditData(p)}
                      >
                        Edit
                      </button>

                      <button
                        className={`w-full md:w-auto px-3 py-1 ${p.enabled ? "bg-gray-400" : "bg-green-800 text-white"} rounded-lg text-xs`}
                        onClick={() => {
                          updatePlugin({ ...p, enabled: !p.enabled });
                        }}
                      >
                        {p.enabled ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddPluginModal close={() => setShowAdd(false)} save={addPlugin} />}
      {editData && (
        <EditPluginModal plugin={editData} close={() => setEditData(null)} save={updatePlugin} />
      )}
      {deleteData && (
        <ConfirmDeleteModal
          item={deleteData}
          close={() => setDeleteData(null)}
          confirm={() => {
            deletePlugin(deleteData.id);
            setDeleteData(null);
          }}
        />
      )}
    </>
  );

  function addPlugin(plugin) {
    setPlugins([...plugins, { ...plugin, id: Date.now() }]);
  }

  function updatePlugin(updated) {
    setPlugins(plugins.map((p) => (p.id === updated.id ? updated : p)));
  }

  function deletePlugin(id) {
    setPlugins(plugins.filter((p) => p.id !== id));
  }
}
