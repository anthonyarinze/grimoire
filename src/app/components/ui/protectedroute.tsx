"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    // loading user
    return (
      <div className="flex justify-center dark:bg-gray-900 items-center p-4">
        <FaSpinner className="text-gray-500 dark:text-gray-400 animate-spin text-2xl" />
      </div>
    );
  }

  // 👈 Auth check is done and user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center dark:bg-gray-900 h-screen">
        <p className="text-red-500 dark:text-gray-400">
          You must be logged in to access this page.
        </p>
      </div>
    );
  }

  // 👌 Authenticated
  return <>{children}</>;
}
