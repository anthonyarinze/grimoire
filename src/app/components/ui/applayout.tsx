"use client";

import { usePathname } from "next/navigation";
import Header from "../headerandfooter/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/auth/login", "/auth/signup"];

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
