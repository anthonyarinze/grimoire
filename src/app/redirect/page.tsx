"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/app/components/ui/spinner";
import { searchGoogleBooksByISBN } from "@/app/lib/functions";

export default function RedirectToBookPage() {
  const router = useRouter();
  const params = useSearchParams();
  const isbn = params.get("isbn");

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
    <Suspense fallback={<Spinner />}>
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    </Suspense>
  );
}
