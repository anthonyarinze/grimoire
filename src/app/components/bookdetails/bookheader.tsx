"use client";

import Image from "next/image";
import { Book } from "@/app/lib/types";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  book: Book;
}

export default function BookHeader({ book }: Props) {
  const { volumeInfo } = book;

  return (
    <div className="flex flex-row flex-wrap gap-4 shadow-md dark:shadow-lg bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      {/* Book Image */}
      <div className="flex-shrink-0">
        {volumeInfo.imageLinks?.thumbnail ? (
          <Image
            src={volumeInfo.imageLinks.thumbnail || "/placeholder.png"}
            height={300}
            width={200}
            alt={volumeInfo.title}
            className="w-[150px] sm:w-[200px] md:w-[250px] h-auto rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-[150px] sm:w-[200px] md:w-[250px] h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 rounded-lg">
            No Image
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="flex items-center justify-between gap-2">
            <h2 className="text-black dark:text-gray-300 md:text-2xl font-bold text-xl line-clamp-2">
              {volumeInfo.title}
            </h2>
            {volumeInfo.previewLink && (
              <a
                href={volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
                title="Preview Book"
              >
                <FaExternalLinkAlt size={24} />
              </a>
            )}
          </span>

          <h3 className="text-black dark:text-gray-200 text-base md:text-xl font-semibold">
            Authors: {volumeInfo.authors?.join(", ") || "N/A"}
          </h3>

          {/* Average Rating */}
          {volumeInfo.averageRating !== undefined && (
            <p className="text-black dark:text-gray-200 mt-2">
              Rating: {volumeInfo.averageRating} ⭐
            </p>
          )}
        </div>

        {/* Publisher & Categories */}
        <h2 className="text-black dark:text-gray-300 text-lg md:font-bold line-clamp-3">
          📅 Published: {volumeInfo.publishedDate || "Unknown"} | 📚 Genres:{" "}
          {volumeInfo.categories?.join(", ") || "N/A"}
        </h2>
      </div>
    </div>
  );
}
