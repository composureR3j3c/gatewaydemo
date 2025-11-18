export default function Topbar({ toggle }) {
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

      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center 
      ">
        <img
          src="https://ui-avatars.com/api/?name=John+Doe&size=32&color=#fff"
          // {logo}
          alt="User"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
        </div>
    </div>
  );
}
