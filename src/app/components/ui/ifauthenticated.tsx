// components/ui/IfAuthenticated.tsx
import { useAppSelector } from "@/app/lib/hooks";
import React from "react";

export default function IfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) return null;
  return <>{children}</>;
}
