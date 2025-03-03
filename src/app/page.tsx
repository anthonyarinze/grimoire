"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/auth/signin");
    }
  }, [user, router]);

  return null; // This page only redirects
}
