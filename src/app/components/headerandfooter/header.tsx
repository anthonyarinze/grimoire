"use client";

import React, { useState } from "react";
import { Menu, X, User, Book, LogOut, Loader } from "lucide-react";
import SearchBar from "../searchbar/searchbar";
import Link from "next/link";
import { useLogout } from "@/app/hooks/uselogout";

export default function Header() {
  const { logout, isPending } = useLogout();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Header */}
      <header className="h-[4.5rem] px-4 flex items-center font-black justify-between bg-white shadow-lg sticky top-0 z-50">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-black">
          <Menu size={28} />
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
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 space-y-4">
          <Link
            href="/account"
            className="flex items-center text-black gap-2 hover:text-gray-700"
          >
            <User size={20} /> Account
          </Link>
          <Link
            href="/library"
            className="flex items-center text-black gap-2 hover:text-gray-700"
          >
            <Book size={20} /> Library
          </Link>
          <button
            className="flex items-center text-black gap-2 hover:text-red-600"
            onClick={logout}
            disabled={isPending}
          >
            {isPending ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <>
                <LogOut size={20} /> Sign Out
              </>
            )}
          </button>
        </nav>
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
