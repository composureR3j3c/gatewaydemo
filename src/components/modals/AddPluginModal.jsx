import { useState } from "react";

export default function AddPluginModal({ close, save }) {
  const [name, setName] = useState("");
  const [config, setConfig] = useState({});

  const submit = () => {
    if (!name) return;
    save({ name, enabled: true, config });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Add Plugin</h2>

        <label className="block mb-2 text-sm font-medium">Plugin Name</label>
        <input
          className="w-full p-2 border rounded"
          placeholder="Rate Limiting, API Key Auth..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end mt-6 gap-2">
          <button onClick={close} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
