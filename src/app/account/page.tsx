"use client";

import React from "react";
import { useUser } from "../hooks/useuser";

export default function Account() {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
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
      <h1 className="text-2xl font-bold">Your Account</h1>
      <p className="text-gray-700">
        This is where your saved account information will appear.
      </p>
    </main>
  );
}
