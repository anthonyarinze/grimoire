"use client";

import { useAppSelector } from "@/app/lib/hooks";

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user); // Assuming you have user state in Redux

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          You must be signed in to access your library.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Your Library</h1>
      <p className="text-gray-700">
        This is where your saved books will appear.
      </p>
    </main>
  );
}
