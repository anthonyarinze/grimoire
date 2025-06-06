"use client";

import { useTrendingBooks } from "@/app/hooks/usetrendingbooks";
import BookCard from "./bookcard";
import Spinner from "../ui/spinner";

export default function FeaturedBooksGrid() {
  const { data, isLoading, isError } = useTrendingBooks();

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load trending books. Please try again later.
      </p>
    );
  }

  const books = (
    Array.isArray(data)
      ? data.flatMap((list) => (Array.isArray(list.books) ? list.books : []))
      : []
  ).filter(
    (book): book is NonNullable<typeof book> =>
      book !== null && book !== undefined
  );

  return (
    <section className="px-6 py-12 bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-300">
      <h2 className="text-3xl font-bold text-center mb-10">Trending Books</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {books.slice(0, 10).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
