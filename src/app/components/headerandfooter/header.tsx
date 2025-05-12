"use client";

import React, { useState } from "react";
import SearchBar from "../searchbar/searchbar";
import Link from "next/link";
import { useLogout } from "@/app/hooks/uselogout";
import ConfirmDialog from "../ui/confirmdialog";
import { useAppSelector } from "@/app/lib/hooks";
import { IoClose, IoMenu } from "react-icons/io5";
import UserPages from "../ui/userpages";
import { successNotifier } from "@/app/lib/notifications";
import ThemeToggle from "../ui/themetoggle";

export default function Header() {
  const { logout, isPending } = useLogout();
  const user = useAppSelector((state) => state.auth.user);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogoutClick = () => {
    setShowConfirmLogout(true);
  };

  const handleConfirmLogout = async () => {
    setShowConfirmLogout(false);
    await logout();
    closeSidebar();
    successNotifier("Successfully logged out.");
  };

  return (
    <>
      {/* Header */}
      <header className="h-[4.5rem] px-4 flex items-center dark:border-b dark:border-gray-700 justify-between bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 text-black dark:text-gray-100">
        {/* Left: Sidebar toggle + Dark mode toggle */}
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="text-inherit">
            <IoMenu size={28} />
          </button>
          <ThemeToggle />
        </div>

        {/* Center: Search */}
        <SearchBar />
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center dark:text-gray-300 text-black justify-between text-inherit p-4 border-b border-gray-300 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl text-black font-bold">Grimoire</h1>
          </Link>
          <button onClick={closeSidebar} className="text-black dark:text-gray-300">
            <IoClose size={24} />
          </button>
        </div>

        <UserPages
          isAuthenticated={!!user}
          isPending={isPending}
          handleLogoutClick={handleLogoutClick}
        />
      </div>

      {/* Dark Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Confirm Logout Dialog */}
      <ConfirmDialog
        isOpen={showConfirmLogout}
        onCancel={() => setShowConfirmLogout(false)}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
        cancelText="Stay Logged In"
        isPending={isPending}
      />
    </>
  );
}
