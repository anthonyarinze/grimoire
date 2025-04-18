import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Header from "./components/headerandfooter/header";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer position="top-center" autoClose={3000} />
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            {/* The Header component is always rendered */}
            <Header />
            <main>{children}</main>{" "}
            {/* Wrap children in a <main> tag for better structure */}
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
