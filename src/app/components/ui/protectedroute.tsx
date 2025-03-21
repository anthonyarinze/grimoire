import { useUser } from "@/app/hooks/useuser";
import React from "react";
import Spinner from "./spinner";

export default function ProtectedRoute({ children }) {
  const { isLoading } = useUser();

  if (isLoading) return <Spinner />;
  return <div className="flex h-screen text-lg">{children}</div>;
}
