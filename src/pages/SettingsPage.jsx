// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import { Save, Settings, Shield, Gauge } from "lucide-react";
import settingsJson from "/src/data/settings.json";

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingsJson);

  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("gateway-settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const update = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    localStorage.setItem("gateway-settings", JSON.stringify(settings));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Settings
      </h1>

      {/* GENERAL */}
      <Section title="General Gateway Settings">
        <Input
          label="Gateway Name"
          value={settings.gatewayName}
          onChange={(e) => update("gatewayName", e.target.value)}
        />

        <Input
          label="Base URL"
          value={settings.baseUrl}
          onChange={(e) => update("baseUrl", e.target.value)}
        />

        <Select
          label="Mode"
          value={settings.mode}
          onChange={(e) => update("mode", e.target.value)}
          options={["development", "staging", "production"]}
        />

        <Toggle
          label="Enable Debug Logs"
          checked={settings.debugLogs}
          onChange={(e) => update("debugLogs", e.target.checked)}
        />
      </Section>

      {/* TRAFFIC */}
      <Section title="Traffic & Rate Control">
        <Input
          label="Global Rate Limit (req/min)"
          type="number"
          value={settings.globalRateLimit}
          onChange={(e) => update("globalRateLimit", e.target.value)}
        />

        <Input
          label="Burst Limit"
          type="number"
          value={settings.burstLimit}
          onChange={(e) => update("burstLimit", e.target.value)}
        />

        <Input
          label="Window (seconds)"
          type="number"
          value={settings.windowSeconds}
          onChange={(e) => update("windowSeconds", e.target.value)}
        />
      </Section>

      {/* SECURITY */}
      <Section title="Security Settings" icon={<Shield className="w-5 h-5" />}>
        <Toggle
          label="Enable CORS"
          checked={settings.enableCors}
          onChange={(e) => update("enableCors", e.target.checked)}
        />

        <Input
          label="Allowed Origins"
          value={settings.allowedOrigins}
          onChange={(e) => update("allowedOrigins", e.target.value)}
        />

        <Input
          label="JWT Expiry (seconds)"
          type="number"
          value={settings.jwtExpiry}
          onChange={(e) => update("jwtExpiry", e.target.value)}
        />

        <Toggle
          label="Enable Key Authentication"
          checked={settings.enableKeyAuth}
          onChange={(e) => update("enableKeyAuth", e.target.checked)}
        />

        <Textarea
          label="Allowed IPs (comma-separated)"
          value={settings.allowedIps}
          onChange={(e) => update("allowedIps", e.target.value)}
        />
      </Section>

      {/* NODE SETTINGS */}
      <Section
        title="Node & Engine Settings"
        icon={<Gauge className="w-5 h-5" />}
      >
        <Input
          label="Health Check Interval (sec)"
          type="number"
          value={settings.healthCheckInterval}
          onChange={(e) => update("healthCheckInterval", e.target.value)}
        />

        <Input
          label="Sync Interval (sec)"
          type="number"
          value={settings.syncInterval}
          onChange={(e) => update("syncInterval", e.target.value)}
        />

        <Input
          label="Retry Count"
          type="number"
          value={settings.retryCount}
          onChange={(e) => update("retryCount", e.target.value)}
        />

        <Input
          label="Timeout (ms)"
          type="number"
          value={settings.timeoutMs}
          onChange={(e) => update("timeoutMs", e.target.value)}
        />
      </Section>

      {/* NOTIFICATIONS */}
      <Section
        title="Notification Settings"
        icon={<Settings className="w-5 h-5" />}
      >
        <div className="flex items-center justify-between p-3 bg-white rounded shadow  ">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            className="w-6 h-6 accent-slate-800"
            checked={settings.notifications}
            onChange={(e) => update("notifications", e.target.checked)}
          />
        </div>
        <Input
          type="email"
          value={settings.email}
          // label={"Email"}
          onChange={(e) => update("email", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
        />
        <Toggle
          type="checkbox"
          label={"Email Alerts"}
          className="accent-slate-800"
          checked={settings.emailAlert}
          onChange={(e) => update("emailAlert", e.target.checked)}
        />
        <Toggle
          type="checkbox"
          label={"SMS Alerts"}
          className="accent-slate-800"
          checked={settings.smsAlert}
          onChange={(e) => update("smsAlert", e.target.checked)}
        />
      </Section>

      {/* SAVE BUTTON */}
      <div>
        <button
          onClick={saveSettings}
          className="px-5 py-2 bg-slate-800 text-white rounded-lg flex items-center gap-2 shadow hover:bg-slate-600"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-5 shadow rounded-xl border">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        className="border rounded-lg p-2 bg-gray-50 focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col col-span-1 md:col-span-2">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <textarea
        {...props}
        className="border rounded-lg p-2 bg-gray-50 h-24 focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <select
        {...props}
        className="border rounded-lg p-2 bg-gray-50 focus:ring focus:ring-blue-300"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 mt-6 cursor-pointer accent-slate-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
