import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { MdExplore, MdLogin } from "react-icons/md";

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

  const navRoutes = [
    { label: "Home", route: "/", icon: <FaHome size={20} /> },
    { label: "Account", route: "/account", icon: <FaUser size={20} /> },
    { label: "Library", route: "/library", icon: <IoLibrary size={20} /> },
    { label: "Explore", route: "/explore", icon: <MdExplore size={20} /> },
  ];

  return (
    <nav className="p-4 space-y-4">
  {navRoutes.map((nav) => {
  const isActive =
    nav.route === "/"
      ? pathname === "/" // exact match for Home
      : pathname.startsWith(nav.route);

  return (
    <Link
      key={nav.label}
      href={nav.route}
      className={`flex items-center gap-2 ${
        isActive
          ? "text-blue-400"
          : "text-black dark:text-gray-100 hover:text-ceruleanBlue dark:hover:text-blue-400"
      }`}
    >
      {nav.icon} {nav.label}
    </Link>
  );
})}

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
