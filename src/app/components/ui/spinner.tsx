import React from "react";
import { FaBookOpen } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900 text-black dark:text-gray-300 flex-col">
      <FaBookOpen className="w-12 h-12 text-gray-500 dark:text-gray-400 animate-spin" />
      <h3>Loading...</h3>
    </div>
  );
}
