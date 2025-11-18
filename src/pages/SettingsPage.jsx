import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            {/* <div className="flex items-center justify-between p-4 bg-white rounded shadow">
              <span>Dark Mode</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
              </label>
            </div> */}

            <div className="flex items-center justify-between p-4 bg-white rounded shadow">
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                className="w-6 h-6 accent-slate-800"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            </div>

            <div className="p-4 bg-white rounded shadow">
              <label className="block mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
          </div>
        );

      case "account":
        return (
          <div className="p-4 bg-white rounded shadow space-y-4">
            <h2 className="font-bold text-lg mb-2">Account Settings</h2>
            <p>Change your password, manage account info, etc.</p>
            <button className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-indigo-700 transition">
              Update Password
            </button>
          </div>
        );

      case "notifications":
        return (
          <div className="p-4 bg-white rounded shadow space-y-4">
            <h2 className="font-bold text-lg mb-2">Notification Settings</h2>
            <p>Manage email, SMS, and app notifications.</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-slate-800" /> Email Alerts
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-slate-800" /> SMS Alerts
              </label>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "general" ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "account" ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "notifications" ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </li>
          {/* <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100`}
            onClick={() => alert("Appearance settings coming soon")}
          >
            Appearance
          </li> */}
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">{renderTabContent()}</main>
    </div>
  );
}
