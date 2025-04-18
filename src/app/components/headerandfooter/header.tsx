"use client";

import React, { useState } from "react";
import SearchBar from "../searchbar/searchbar";
import Link from "next/link";
import { useLogout } from "@/app/hooks/uselogout";
import ProtectedRoute from "../ui/protectedroute";
import { useUser } from "@/app/hooks/useuser";
import { IoClose, IoLibrary, IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { MdLogin } from "react-icons/md";

export default function Header() {
  const { logout, isPending } = useLogout();
  const { isAuthenticated } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Header */}
      <header className="h-[4.5rem] px-4 flex items-center font-black justify-between bg-white shadow-lg sticky top-0 z-50">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-black">
          <IoMenu size={28} />
        </button>
        <SearchBar />
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between text-black p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Grimoire</h1>
          </Link>
          <button onClick={closeSidebar}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <ProtectedRoute>
          <nav className="p-4 space-y-4">
            <Link
              href="/account"
              className="flex items-center text-black gap-2 hover:text-ceruleanBlue"
            >
              <FaUser size={20} /> Account
            </Link>
            <Link
              href="/library"
              className="flex items-center text-black gap-2 hover:text-ceruleanBlue"
            >
              <IoLibrary size={20} /> Library
            </Link>
            {isAuthenticated ? (
              <button
                className="flex items-center text-black gap-2 hover:text-red-600"
                onClick={() => logout()}
                disabled={isPending}
              >
                {isPending ? (
                  <FiLoader size={20} className="animate-spin">
                    Signing out...
                  </FiLoader>
                ) : (
                  <>
                    <IoIosLogOut size={20} /> Sign Out
                  </>
                )}
              </button>
            ) : (
              <button className="flex items-center text-black gap-2 hover:text-green-600">
                <MdLogin size={20} />
                <Link href="/auth/signin">Login</Link>
              </button>
            )}
          </nav>
        </ProtectedRoute>
      </div>

      {/* Dark Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
