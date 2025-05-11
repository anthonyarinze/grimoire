import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ToastContainer } from "react-toastify";
import AppLayout from "./components/ui/applayout";
import UserRefresher from "./components/ui/userrefresher";
import { ThemeProvider } from "./context/themecontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grimoire",
  description: "Discover and manage your reading journey.",
  icons: {
    icon: "/abstract.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              <UserRefresher />
              <AppLayout>{children}</AppLayout>
            </QueryClientProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
