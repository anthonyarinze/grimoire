"use client";

import { useState } from "react";
import { ReactReader } from "react-reader";
import { useRouter } from "next/navigation";

export default function EpubViewer({ url }: { url: string }) {
  const router = useRouter();
  const [location, setLocation] = useState<string | number>(0);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Toolbar */}
      <div className="p-4 flex justify-start items-center border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <button
          onClick={() => router.push("/library")}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          ← Back to Library
        </button>
      </div>

      {/* Reader */}
      <div className="flex-1">
        <ReactReader
          url={url}
          location={location}
          locationChanged={setLocation}
        />
      </div>
    </div>
  );
}
