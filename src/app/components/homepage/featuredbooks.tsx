"use client";

import { useTrendingBooks } from "@/app/hooks/usetrendingbooks";
import BookCard from "./bookcard";
import Link from "next/link";
import Spinner from "../ui/spinner";

export default function FeaturedBooksGrid() {
  const { books, isLoading, isError } = useTrendingBooks();

  return (
    <section className="px-6 py-12 bg-gray-50 text-black">
      <h2 className="text-3xl font-bold text-center mb-10">Trending Books</h2>

      {isLoading && <Spinner />}

      {isError && (
        <p className="text-center text-red-500">
          Failed to load trending books.
        </p>
      )}

      {!isLoading && books && (
        <>
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3">
            {books.slice(0, 10).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/explore"
              className="inline-block px-6 py-3 bg-ceruleanBlue text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Explore More
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
