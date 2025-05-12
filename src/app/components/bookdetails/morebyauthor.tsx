"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/app/lib/types";
import MoreBooksCard from "./morebookscard";
import { fetchBooks } from "@/app/lib/functions";

interface MoreByAuthorProps {
  author: string | string[];
  bookId: string;
}

export default function MoreByAuthor({ author, bookId }: MoreByAuthorProps) {
  const firstAuthor = Array.isArray(author)
    ? author[0].trim()
    : author.includes(",")
    ? author.split(",")[0].trim()
    : author.trim();

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booksByAuthor", firstAuthor],
    queryFn: () => fetchBooks(`inauthor:"${firstAuthor}"`),
    enabled: !!author,
  });

  if (isLoading) return <p>Loading books by {firstAuthor}...</p>;
  if (isError) return <p>Failed to load books by {firstAuthor}.</p>;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">More by {firstAuthor}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 whitespace-nowrap">
          {books.filter((book) => book.id !== bookId).length > 0 ? (
            books
              .filter((book) => book.id !== bookId)
              .map((book: Book) => <MoreBooksCard key={book.id} book={book} />)
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No other books found by this author.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
