"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { fetchBooksByAuthor } from "@/app/lib/api";
import { Book } from "@/app/lib/types";

interface MoreByAuthorProps {
  author: string | string[];
}

export default function MoreByAuthor({ author }: MoreByAuthorProps) {
  // ✅ Normalize author data to extract only the first author
  const firstAuthor = Array.isArray(author) // If it's an array, take the first element
    ? author[0].trim()
    : author.includes(",") // If it's a comma-separated string, split and take the first part
    ? author.split(",")[0].trim()
    : author.trim(); // Otherwise, just use it directly

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booksByAuthor", firstAuthor],
    queryFn: () => fetchBooksByAuthor(firstAuthor),
    enabled: !!author,
  });

  if (isLoading) return <p>Loading books by {firstAuthor}...</p>;
  if (isError) return <p>Failed to load books by {firstAuthor}.</p>;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">More by {firstAuthor}</h2>

      {/* ✅ Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 whitespace-nowrap">
          {data?.items.length > 0 ? (
            data.items.map((book: Book) => (
              <div
                key={book.id}
                className="text-wrap text-center flex items-start"
              >
                <Link
                  href={`/book/${book.id}`}
                  className="flex flex-col w-[160px] text-center shrink-0"
                >
                  <Image
                    src={book.volumeInfo.imageLinks?.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full object-cover rounded-md shadow-md"
                    width={160}
                    height={240}
                  />
                  <p className="mt-2 text-sm font-medium">
                    {book.volumeInfo.title}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No other books found by this author.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
