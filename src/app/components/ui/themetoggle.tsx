"use client";

import { useTheme } from "@/app/context/themecontext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <MdLightMode className="w-5 h-5 text-yellow-400" />
      ) : (
        <MdDarkMode className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
}
