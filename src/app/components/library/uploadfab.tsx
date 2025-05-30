"use client";

import { useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import React from "react";

export default function UploadFAB({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) {
  const inuputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inuputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <>
      <input
        ref={inuputRef}
        type="file"
        accept=".pdf, .epub,"
        className="hidden"
        onChange={handleChange}
      />

      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition duration-300 ease-in-out flex items-center justify-center"
        aria-label="Upload Book"
      >
        <FaFileUpload className="w-5 h-5" />
      </button>
    </>
  );
}
