"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/app/components/ui/spinner";
import { searchGoogleBooksByISBN } from "@/app/lib/functions";

export default function RedirectToBookPage() {
  const router = useRouter();
  const params = useParams();

  const isbn = params.isbn as string; // cast it (it's a string)

  useEffect(() => {
    async function findAndRedirect() {
      if (!isbn) {
        router.push("/book-not-found");
        return;
      }

      const googleBookId = await searchGoogleBooksByISBN(isbn);

      if (googleBookId) {
        router.push(`/book/${googleBookId}`);
      } else {
        router.push("/book-not-found");
      }
    }

    findAndRedirect();
  }, [isbn, router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
