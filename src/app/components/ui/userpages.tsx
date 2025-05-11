import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

interface UserPagesProps {
  isAuthenticated: boolean;
  isPending: boolean;
  handleLogoutClick: () => void;
}

export default function UserPages({
  isAuthenticated,
  isPending,
  handleLogoutClick,
}: UserPagesProps) {
  const pathname = usePathname();
  return (
    <nav className="p-4 space-y-4">
      <Link
        href="/account"
        className={`flex items-center gap-2 ${
          pathname === "/account"
            ? "text-blue-400"
            : "text-black dark:text-gray-100 hover:text-ceruleanBlue dark:hover:text-blue-400"
        }`}
      >
        <FaUser size={20} /> Account
      </Link>

      <Link
        href="/library"
        className={`flex items-center gap-2 ${
          pathname.startsWith("/library")
            ? "text-blue-400"
            : "text-black dark:text-gray-100 hover:text-ceruleanBlue dark:hover:text-blue-400"
        }`}
      >
        <IoLibrary size={20} /> Library
      </Link>

      {isAuthenticated ? (
        <button
          className="flex items-center gap-2 text-black dark:text-gray-100 hover:text-red-600 dark:hover:text-red-500"
          onClick={handleLogoutClick}
          disabled={isPending}
        >
          {isPending ? (
            <FiLoader size={20} className="animate-spin" />
          ) : (
            <>
              <IoIosLogOut size={20} /> Sign Out
            </>
          )}
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-black dark:text-gray-100 hover:text-green-600 dark:hover:text-green-500"
        >
          <MdLogin size={20} />
          Login
        </Link>
      )}
    </nav>
  );
}
