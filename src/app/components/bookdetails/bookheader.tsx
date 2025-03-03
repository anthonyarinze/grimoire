"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function BookHeader() {
  const selectedBook = useAppSelector((state) => state.search.selectedBook);

  // Handle case where selectedBook is null/undefined
  if (!selectedBook || !selectedBook.volumeInfo) {
    return <p className="text-red-500">No book selected.</p>;
  }

  const { volumeInfo } = selectedBook;

  return (
    <div className="flex bg-green-300 p-4 rounded-lg">
      {/* Book Image */}
      {volumeInfo.imageLinks?.thumbnail ? (
        <Image
          src={volumeInfo.imageLinks.thumbnail}
          height={300}
          width={200}
          alt={volumeInfo.title}
          className="rounded-lg shadow-lg"
        />
      ) : (
        <div className="w-[200px] h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Book Details */}
      <div className="flex flex-col ml-4">
        <span className="flex items-center justify-between gap-1">
          <h2 className="text-black font-bold text-2xl line-clamp-2">
            {volumeInfo.title}
          </h2>
          {volumeInfo.previewLink && (
            <a
              href={volumeInfo.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
              title="Preview Book"
            >
              <ExternalLink size={24} />
            </a>
          )}
        </span>
        <h3 className="text-black text-xl font-semibold">
          Authors:{" "}
          {volumeInfo.authors?.length > 0
            ? volumeInfo.authors.join(", ")
            : "N/A"}
        </h3>

        {/* Average Rating */}
        {volumeInfo.averageRating !== undefined && (
          <p className="text-black mt-2">
            Rating: {volumeInfo.averageRating} ⭐
          </p>
        )}
      </div>

      {/* Publisher & Categories */}
    </div>
  );
}
