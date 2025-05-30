import { useState } from "react";
import { MdClose } from "react-icons/md";

type UploadModalProps = {
  file: File | null;
  onClose: () => void;
  onConfirm: (status: "Want to Read" | "Reading" | "Finished") => void;
};

type BookStatus = "Want to Read" | "Reading" | "Finished";

export default function UploadModal({
  file,
  onClose,
  onConfirm,
}: UploadModalProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<BookStatus>("Want to Read");

  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Upload Book</h2>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          File: <span className="font-medium">{file.name}</span>
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Choose status:
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as BookStatus)}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-sm dark:text-white"
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onConfirm(selectedStatus)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
