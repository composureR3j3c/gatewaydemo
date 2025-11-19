import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import keysData from "../data/keys.json";
import { Key, KeyIcon } from "lucide-react";

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState(keysData);

  const [newName, setNewName] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const createApiKey = () => {
    const key = `sk_${uuidv4().replace(/-/g, "").slice(0, 28)}`;
    const newKey = {
      id: Date.now(),
      name: newName || `Key ${apiKeys.length + 1}`,
      key,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setApiKeys([...apiKeys, newKey]);
    setShowNewModal(false);
    setNewName("");
  };

  const revokeApiKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy"), 2000);
    
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <KeyIcon className="w-6 h-6" />
        API Keys
      </h1>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-amber-600
           text-white rounded-lg hover:bg-amber-500 transition"
        >
          + Create New Key
        </button>
      </div>

      {/* Keys List */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Key</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {apiKeys.map((k) => (
              <tr key={k.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{k.name}</td>
                <td className="font-mono text-sm">
                  {k.key.slice(0, 6)}••••••••••••••••••
                </td>
                <td>{k.createdAt}</td>
                <td className="flex items-center justify-end gap-2 p-3
                 ">
                  <button
                    onClick={() => copyKey(k.key)}
                    className="px-3 py-1  rounded bg-gray-200 text-sm"
                  >
                    {copyLabel}
                  </button>
                  <button
                    onClick={() => revokeApiKey(k.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Key Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 p-5 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold">Create API Key</h2>

            <div className="mt-4">
              <label className="text-sm">Key Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                placeholder="My Service Key"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createApiKey}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
