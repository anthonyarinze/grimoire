"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Book } from "@/app/lib/types";

interface Props {
  book: Book;
}

export default function BookHeader({ book }: Props) {
  const { volumeInfo } = book;

  return (
    <div className="flex flex-row flex-wrap gap-4 shadow-md bg-gray-100 p-4 rounded-lg">
      {/* Book Image */}
      <div className="flex-shrink-0">
        {volumeInfo.imageLinks?.thumbnail ? (
          <Image
            src={volumeInfo.imageLinks.thumbnail}
            height={300}
            width={200}
            alt={volumeInfo.title}
            className="w-[150px] sm:w-[200px] md:w-[250px] h-auto rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-[150px] sm:w-[200px] md:w-[250px] h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Image
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="flex items-center justify-between gap-2">
            <h2 className="text-black md:text-2xl font-bold text-xl line-clamp-2">
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
          <h3 className="text-black text-base md:text-xl  font-semibold">
            Authors: {volumeInfo.authors?.join(", ") || "N/A"}
          </h3>

          {/* Average Rating */}
          {volumeInfo.averageRating !== undefined && (
            <p className="text-black mt-2">
              Rating: {volumeInfo.averageRating} ⭐
            </p>
          )}
        </div>

        {/* Publisher & Categories */}
        <h2 className="text-black text-lg md:font-bold line-clamp-3">
          📅 Published: {volumeInfo.publishedDate || "Unknown"} | 📚 Genres:{" "}
          {volumeInfo.categories?.join(", ") || "N/A"}
        </h2>
      </div>
    </div>
  );
}
