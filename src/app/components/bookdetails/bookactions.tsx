"use client";

import { useState } from "react";

const statuses = ["Want to Read", "Reading", "Read"];

export default function BookActions() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setSelectedStatus(status)}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            selectedStatus === status
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
