"use client";

import React from "react";
import { useTrendingBooks } from "../hooks/usetrendingbooks";
import Spinner from "../components/ui/spinner";
import BookCard from "../components/homepage/bookcard";

export default function Explore() {
  const { data, isLoading, isError } = useTrendingBooks();

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load trending books. Please try again later.
      </p>
    );

  const books = (
    Array.isArray(data)
      ? data.flatMap((list) => (Array.isArray(list.books) ? list.books : []))
      : []
  ).filter(
    (book): book is NonNullable<typeof book> =>
      book !== null && book !== undefined
  );

  return (
    <main className="px-6 py-12 min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-3xl font-bold text-start pb-3">Explore 📚</h1>

      <section className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
}
