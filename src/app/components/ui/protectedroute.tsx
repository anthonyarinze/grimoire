"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.user);

  if (user === undefined) {
    // 👈 Undefined means we are still loading
    return (
      <div className="flex justify-center items-center p-4">
        <FaSpinner className="text-gray-500 animate-spin text-2xl" />
      </div>
    );
  }

  // 👈 Auth check is done and user is not logged in
  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          You must be logged in to access this feature.
        </p>
      </div>
    );
  }

  // 👌 Authenticated
  return <>{children}</>;
}
