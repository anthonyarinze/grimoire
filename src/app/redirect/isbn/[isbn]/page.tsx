"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { infoNotifier } from "@/app/lib/notifications";

export default function RedirectToBookPage() {
  const router = useRouter();
  const params = useParams();

  const isbn = params.isbn as string;

  useEffect(() => {
    async function findAndRedirect() {
      try {
        const res = await fetch(`/api/search-isbn?isbn=${isbn}`);

        if (!res.ok) {
          const errorData = await res.json();
          infoNotifier(errorData.error || "Book not found.");
          router.replace("/book-not-found");
          return;
        }

        const { id, fallback } = await res.json();

        if (fallback) {
          infoNotifier("Redirected to the English version of this book.");
        }

        router.replace(`/book/${id}`);
      } catch {
        infoNotifier("Something went wrong. Please try again.");
        router.replace("/book-not-found");
      }
    }

    findAndRedirect();
  }, [isbn, router]);

  return null;
}
