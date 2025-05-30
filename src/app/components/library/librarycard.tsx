"use client";

import Image from "next/image";
import { LibraryBooks } from "@/app/lib/types";
import { IoClose } from "react-icons/io5";
import ToolTip from "@/app/components/ui/tooltip";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getEpubCover, getPdfCover, unsanitizeKey } from "@/app/lib/functions";

interface LibraryCardProps {
  book: LibraryBooks;
  onRemove: (bookId: LibraryBooks) => void;
  isPending: boolean;
}

const statusColors: Record<string, string> = {
  "Want to Read": "bg-yellow-100 text-yellow-600 dark:text-yellow-400",
  Reading: "bg-blue-100 text-blue-600 dark:text-blue-400",
  Finished: "bg-green-100 text-green-600 dark:text-green-400",
};

export default function LibraryCard({
  book,
  onRemove,
  isPending,
}: LibraryCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      if (!book.uploaded || coverUrl) return;

      try {
        // Import the function dynamically to avoid server-side issues
        const { getDownloadUrl } = await import("@/app/lib/functions");

        // Dynamically get the signed URL
        const signedUrl = await getDownloadUrl(book.id);

        if (!signedUrl) return;

        const unsanitizedKey = unsanitizeKey(book.id);

        const cover = unsanitizedKey.endsWith("epub")
          ? await getEpubCover(signedUrl)
          : await getPdfCover(signedUrl);

        if (cover) setCoverUrl(cover);
      } catch {
        throw new Error("Failed to fetch signed URL or cover.");
      }
    };

    fetchCover();
  }, [book, coverUrl]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={book.id}
        initial={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Link
          href={book.uploaded ? `/read/${book.id}` : `/book/${book.id}`}
          className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-md p-3 flex flex-col items-center text-center cursor-pointer transition transform hover:scale-105 hover:brightness-105 hover:shadow-lg dark:hover:shadow-xl"
        >
          <Image
            src={
              book.uploaded
                ? coverUrl || "/placeholder.png"
                : book.cover || "/placeholder.png"
            }
            alt={book.title}
            width={100}
            height={150}
            className="object-cover rounded-md shadow w-[100px] h-[150px]"
          />

          <h3 className="mt-2 text-sm font-medium text-black dark:text-white max-w-[100px] truncate">
            {book.title}
          </h3>

          {book.uploaded && (
            <span className="mt-2 inline-block text-[10px] font-medium bg-blue-100 text-blue-600 dark:text-blue-400 dark:bg-blue-900 px-2 py-0.5 rounded-md">
              Uploaded Book
            </span>
          )}

          {!book.uploaded && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {book.authors?.join(", ")}
            </p>
          )}

          <span
            className={`mt-2 px-2 py-1 text-xs rounded-md ${
              statusColors[book.status]
            } dark:bg-opacity-20`}
          >
            {book.status}
          </span>
        </Link>

        <button
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(book);
          }}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-10"
        >
          {isPending ? (
            <FaSpinner className="animate-spin" size={20} />
          ) : (
            <IoClose size={20} />
          )}
          <ToolTip text="Remove" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
