"use client";

import React from "react";
import { useUser } from "../hooks/useuser";
import { UserState } from "@/app/lib/types";
import UserWelcome from "./accountcomponents/userwelcome";
import StatCard from "./accountcomponents/statcard";
import { useLibrary } from "../hooks/useLibrary";
import AccountSettings from "./accountcomponents/accountsettings";

export default function Account() {
  const { isAuthenticated, user } = useUser();
  const currentUser = user as UserState;
  const { library } = useLibrary();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          You must be signed in to access your account information.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <UserWelcome user={currentUser} />
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard label="Total" value={library.length} />
        <StatCard
          label="Want to Read"
          value={
            library.filter((book) => book.status === "Want to Read").length
          }
        />
        <StatCard
          label="Reading"
          value={library.filter((book) => book.status === "Reading").length}
        />
        <StatCard
          label="Finished"
          value={library.filter((book) => book.status === "Finished").length}
        />
      </section>

      {/* Account settings */}
      <AccountSettings />
    </main>
  );
}
