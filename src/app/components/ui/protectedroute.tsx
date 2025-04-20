import { useAppSelector } from "@/app/lib/hooks";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return <main className="flex h-screen text-lg">{children}</main>;
}
