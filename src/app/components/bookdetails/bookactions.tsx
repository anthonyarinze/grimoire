"use client";

import { useState } from "react";
import { FcReading } from "react-icons/fc";
import { IoCheckmarkDone, IoLibrary } from "react-icons/io5";

const statuses = [
  { label: "Want to Read", icon: <IoLibrary size={20} /> },
  { label: "Reading", icon: <FcReading size={20} /> },
  { label: "Finished", icon: <IoCheckmarkDone size={20} /> },
];

export default function BookActions() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {statuses.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => setSelectedStatus(label)}
          className={`px-4 py-2 flex items-center gap-2 rounded-md font-semibold transition ${
            selectedStatus === label
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
