import { useUser } from "@/app/hooks/useuser";
import React from "react";
import Spinner from "./spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading } = useUser();

  if (isLoading) return <Spinner />;
  return <main className="flex h-screen text-lg">{children}</main>;
}
