import { Badge, PersonStanding, PersonStandingIcon, PrinterCheck } from "lucide-react";
import { useState } from "react";
import profileData from "../data/profile.json";

export default function ProfilePage() {
  const [user, setUser] = useState(profileData);

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({ ...user });

  const save = () => {
    setUser(form);
    setEditing(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <PersonStanding className="w-6 h-6" />
        Profile
      </h1>
      <h1 className="text-3xl font-semibold text-gray-900"></h1>

      <div className="bg-white shadow rounded-2xl p-6 max-w-3xl space-y-8">
        {/* Avatar + Basic */}
        <div className="flex items-center gap-6">
          <img
            src={user.avatar}
            alt="avatar"
            className="h-24 w-24 rounded-full shadow"
          />

          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-blue-600 font-medium">{user.role}</p>
          </div>
        </div>

        <div className="border-t pt-4" />

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            {editing ? (
              <input
                className="mt-1 w-full p-2 border rounded-lg"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            ) : (
              <div className="mt-1 text-gray-800 font-medium">{user.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            {editing ? (
              <input
                className="mt-1 w-full p-2 border rounded-lg"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            ) : (
              <div className="mt-1 text-gray-800 font-medium">{user.email}</div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            {editing ? (
              <input
                className="mt-1 w-full p-2 border rounded-lg"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            ) : (
              <div className="mt-1 text-gray-800 font-medium">{user.phone}</div>
            )}
          </div>

          {/* Organization */}
          <div>
            <label className="text-sm text-gray-600">Organization</label>
            {editing ? (
              <input
                className="mt-1 w-full p-2 border rounded-lg"
                value={form.organization}
                onChange={(e) =>
                  setForm({ ...form, organization: e.target.value })
                }
              />
            ) : (
              <div className="mt-1 text-gray-800 font-medium">
                {user.organization}
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4" />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-500"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditing(false);
                  setForm(user);
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-500"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
