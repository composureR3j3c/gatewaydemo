import { useState } from "react";

export default function EditPluginModal({ plugin, close, save }) {
  // All templates combined
  const templateFields = {
    "rate-limiting": [
      { key: "second", label: "Requests / Second", type: "number" },
      { key: "minute", label: "Requests / Minute", type: "number" },
      { key: "hour", label: "Requests / Hour", type: "number" },
      { key: "policy", label: "Policy", type: "text" },
    ],

    "key-auth": [
      { key: "key_names", label: "Key Names (comma separated)", type: "list" },
      { key: "hide_credentials", label: "Hide Credentials", type: "checkbox" },
      { key: "ttl", label: "TTL", type: "number" },
    ],

    jwt: [
      { key: "uri_param_names", label: "URI Param Names", type: "list" },
      { key: "cookie_names", label: "Cookie Names", type: "list" },
      { key: "claims_to_verify", label: "Claims to Verify", type: "list" },
    ],

    acl: [
      { key: "allow", label: "Allow Groups", type: "list" },
      { key: "deny", label: "Deny Groups", type: "list" },
      {
        key: "hide_groups_header",
        label: "Hide Groups Header",
        type: "checkbox",
      },
    ],

    cors: [
      { key: "origins", label: "Origins", type: "list" },
      { key: "methods", label: "Methods", type: "list" },
      { key: "headers", label: "Headers", type: "list" },
      { key: "exposed_headers", label: "Exposed Headers", type: "list" },
      { key: "credentials", label: "Credentials", type: "checkbox" },
      { key: "max_age", label: "Max Age", type: "number" },
    ],

    "ip-restriction": [
      { key: "allow", label: "Allowed IPs", type: "list" },
      { key: "deny", label: "Denied IPs", type: "list" },
    ],

    "request-transformer": [
      { key: "add_headers", label: "Add Headers", type: "kv" },
      { key: "remove_headers", label: "Remove Headers", type: "list" },
      { key: "add_query", label: "Add Query Params", type: "kv" },
      { key: "remove_query", label: "Remove Query Params", type: "list" },
    ],

    "response-transformer": [
      { key: "add_headers", label: "Add Headers", type: "kv" },
      { key: "remove_headers", label: "Remove Headers", type: "list" },
    ],
  };

  const [config, setConfig] = useState({ ...plugin.config });

  const updateField = (key, rawValue, type) => {
    let value = rawValue;

    if (type === "number") value = Number(rawValue);
    if (type === "list") value = rawValue.split(",").map((v) => v.trim());
    if (type === "checkbox") value = rawValue;

    if (type === "kv") {
      const lines = rawValue.split("\n");
      const obj = {};
      lines.forEach((line) => {
        const [k, v] = line.split("=");
        if (k && v) obj[k.trim()] = v.trim();
      });
      value = obj;
    }

    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const fields = templateFields[plugin.name] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center to overflow-y-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 m-auto
      ">
        <h2 className="text-xl font-semibold mb-4">Edit Plugin</h2>

        <div className="font-medium mb-4 p-2 bg-gray-100 rounded">
          {plugin.name}
        </div>

        {fields.map(({ key, label, type }) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>

            {type === "checkbox" ? (
              <input
                type="checkbox"
                checked={config[key] || false}
                onChange={(e) => updateField(key, e.target.checked, type)}
              />
            ) : type === "kv" ? (
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="key=value"
                value={
                  config[key]
                    ? Object.entries(config[key])
                        .map(([k, v]) => `${k}=${v}`)
                        .join("\n")
                    : ""
                }
                onChange={(e) => updateField(key, e.target.value, type)}
              />
            ) : (
              <input
                className="w-full p-2 border rounded"
                type={type === "number" ? "number" : "text"}
                value={
                  Array.isArray(config[key])
                    ? config[key].join(",")
                    : config[key] ?? ""
                }
                onChange={(e) => updateField(key, e.target.value, type)}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={close}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              save({ ...plugin, config });
              close();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
