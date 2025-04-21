"use client";

import React from "react";
import { useAppSelector } from "@/app/lib/hooks";
import Link from "next/link";

export default function UserWelcomeSection() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <section className="px-6 py-12 bg-gradient-to-b text-black from-white to-gray-50 text-center">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-4">
          Welcome back, {user.displayName || "Reader"} 👋
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Let’s pick up where you left off! Browse your library, explore new
          reads, or revisit your favorites.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/library"
            className="inline-block px-6 py-3 bg-ceruleanBlue text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Go to My Library
          </Link>
          <Link
            href="/discover"
            className="inline-block px-6 py-3 border border-ceruleanBlue text-ceruleanBlue rounded-md font-medium hover:bg-blue-50 transition"
          >
            Discover Books
          </Link>
        </div>
      </div>
    </section>
  );
}
