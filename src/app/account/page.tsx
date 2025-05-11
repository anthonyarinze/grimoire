"use client";

import React, { useState } from "react";
import UserWelcome from "./accountcomponents/userwelcome";
import StatCard from "./accountcomponents/statcard";
import { useLibrary } from "../hooks/useLibrary";
import AccountSettings from "./accountcomponents/accountsettings";
import EditProfileModal from "./accountcomponents/editprofilemodal";
import { useAppSelector } from "../lib/hooks";
import ProtectedRoute from "../components/ui/protectedroute";

export default function Account() {
  const user = useAppSelector((state) => state.auth.user);
  const { library, isLoading } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProtectedRoute>
      <main className="p-6 dark:bg-gray-900 min-h-screen">
        {/* User welcome */}
        <UserWelcome />

        {/* Edit profile */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 mt-4 text-black bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Edit Profile
        </button>

        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialDisplayName={user?.displayName ?? ""}
          initialPhotoUrl={user?.photoURL}
          userId={user?.uid}
        />

        {/* Reading stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard
            label="Total"
            isLoading={isLoading}
            value={library.length}
          />
          <StatCard
            label="Want to Read"
            isLoading={isLoading}
            value={
              library.filter((book) => book.status === "Want to Read").length
            }
          />
          <StatCard
            label="Reading"
            isLoading={isLoading}
            value={library.filter((book) => book.status === "Reading").length}
          />
          <StatCard
            label="Finished"
            isLoading={isLoading}
            value={library.filter((book) => book.status === "Finished").length}
          />
        </section>

        {/* Account settings */}
        <AccountSettings />
      </main>
    </ProtectedRoute>
  );
}
