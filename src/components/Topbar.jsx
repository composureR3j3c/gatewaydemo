import { useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar({ toggle }) {
  const [open, setOpen] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const DropdownItem = ({ label, danger, link }) => (
    <div
      onClick={() => setOpen(!open)}
      className={` rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition ${
        danger ? "text-red-600" : "text-gray-700"
      }`}
    >
      <Link to={link} className="m-2 block px-2 py-2">
        <span className="text-sm">{label}</span>
      </Link>
    </div>
  );
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-5 border-b border-gray-200">
      <button
        onClick={toggle}
        className="p-2 rounded-lg hover:bg-gray-200 transition text-gray-700 text-xl"
      >
        ☰
      </button>

      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
        Enterprise Gateway Manager
      </h2>

      {/* // Avatar + Profile Menu */}
      <div className="relative">
        <img
          onClick={() => {
            setOpen(!open);
            // setTimeout(() => {
            //   setOpen(false);
            // }, 3000);
          }}
          src="https://ui-avatars.com/api/?name=John+Doe&background=475569&color=fff&size=64"
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer select-none"
        />

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border p-4 z-50 animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=475569&color=fff&size=64"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">
                  john.doe@example.com
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  Administrator
                </div>
              </div>
            </div>

            <div className="border-t my-2"></div>

            <div className="space-y-1">
              <DropdownItem label="Profile" link={"/profile"} />
              <DropdownItem label="Settings" link={"/settings"} />
              <DropdownItem label="API Keys" link={"/apikeys"} />
            </div>

            <div className="border-t my-2"></div>

            <div
              className={`rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition text-red-600 }
            `}
            >
              <button
                className="m-2 block px-2 py-2 w-full text-left"
                onClick={() => {
                  setOpen(!open);
                  localStorage.removeItem("auth");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
