"use client";

import { usePathname } from "next/navigation";
import Header from "../headerandfooter/header";
import Footer from "../headerandfooter/footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/auth/login", "/auth/signup"];

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <main className="flex flex-col min-h-screen">
      {shouldShowHeader && <Header />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </main>
  );
}
