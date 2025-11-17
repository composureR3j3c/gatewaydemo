import { useState } from "react";
import EditPluginModal from "../components/modals/EditPluginModal";
import AddPluginModal from "../components/modals/AddPluginModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

export default function PluginsPage() {
  const [plugins, setPlugins] = useState([
      {
    id: 1,
    label: "Rate Limiting",
    name: "rate-limiting",
    enabled: true,
    config: {
      second: 10,
      minute: 500,
      hour: 10000,
      policy: "local",
    },
  },
  {
    id: 2,
    label: "API Key Auth",
    name: "key-auth",
    enabled: false,
    config: {
      key_names: ["apiKey"],
      hide_credentials: false,
      ttl: 0,
    },
  },
  {
    id: 3,
    label: "JWT Auth",
    name: "jwt",
    enabled: true,
    config: {
      uri_param_names: ["jwt"],
      cookie_names: ["jwt"],
      claims_to_verify: ["exp"],
    },
  },
  {
    id: 4,
    label: "ACL",
    name: "acl",
    enabled: false,
    config: {
      allow: ["admin"],
      deny: [],
      hide_groups_header: false,
    },
  },
  {
    id: 5,
    label: "CORS",
    name: "cors",
    enabled: true,
    config: {
      origins: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      headers: ["*"],
      exposed_headers: ["X-Auth"],
      credentials: true,
      max_age: 3600,
    },
  },
  {
    id: 6,
    label: "IP Restriction",
    name: "ip-restriction",
    enabled: true,
    config: {
      allow: ["192.168.0.0/24"],
      deny: ["10.0.0.0/8"],
    },
  },
  {
    id: 7,
    label: "Request Transformer",
    name: "request-transformer",
    enabled: true,
    config: {
      add_headers: { "X-New-Header": "value" },
      remove_headers: ["X-Old-Header"],
      add_query: { token: "123" },
      remove_query: ["debug"],
    },
  },
  {
    id: 8,
    label: "Response Transformer",
    name: "response-transformer",
    enabled: true,
    config: {
      add_headers: { "X-Response-Header": "value" },
      remove_headers: ["X-Remove-Header"],
    },
  },
   
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Plugins</h1>

        <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
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
                  <td className="py-3 space-x-3">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs"
                      onClick={() => setEditData(p)}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-3 py-1 ${p.enabled ?'bg-red-700':'bg-green-700'} text-white rounded-lg text-xs`}
                      onClick={() => {
                        updatePlugin({ ...p, enabled: !p.enabled });
                      }}
                    >
                      {p.enabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <AddPluginModal close={() => setShowAdd(false)} save={addPlugin} />
      )}
      {editData && (
        <EditPluginModal
          plugin={editData}
          close={() => setEditData(null)}
          save={updatePlugin}
        />
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
