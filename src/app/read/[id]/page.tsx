// this page is used to render the book reader for PDF and EPUB files uploaded by users

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getDownloadUrl, unsanitizeKey } from "@/app/lib/functions";
import Spinner from "@/app/components/ui/spinner";

// Dynamically import readers
const PDFViewer = dynamic(() => import("@/app/components/viewers/pdfviewer"), {
  ssr: false,
});

const EpubViewer = dynamic(
  () => import("@/app/components/viewers/epubviewer"),
  {
    ssr: false,
  }
);

export default function ReaderPage() {
  const { id } = useParams();
  const [bookUrl, setBookUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState<boolean | null>(null);
  const unsanitizedId = id && !Array.isArray(id) ? unsanitizeKey(id) : null;

  useEffect(() => {
    async function fetchBook() {
      if (!id || Array.isArray(id)) {
        setBookUrl(null);
        return;
      }

      const extension = unsanitizedId?.split(".").pop()?.toLowerCase();
      setIsPdf(extension === "pdf");

      try {
        const url = await getDownloadUrl(id);
        setBookUrl(url);
      } catch {
        setBookUrl(null); // Or set an error state
      }
    }

    fetchBook();
  }, [id, unsanitizedId]);

  if (!bookUrl || isPdf === null) return <Spinner />;

  if (bookUrl === null && isPdf !== null) {
    return <p className="text-center text-red-500">Failed to load book.</p>;
  }

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      {isPdf ? <PDFViewer url={bookUrl} /> : <EpubViewer url={bookUrl} />}
    </div>
  );
}
