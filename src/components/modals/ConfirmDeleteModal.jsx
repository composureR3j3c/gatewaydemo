export default function ConfirmDeleteModal({ item, close, confirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Delete Plugin
        </h2>
        <p className="text-gray-700">
          Are you sure you want to delete <strong>{item.name}</strong>?
        </p>

        <div className="flex justify-end mt-6 gap-2">
          <button onClick={close} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
