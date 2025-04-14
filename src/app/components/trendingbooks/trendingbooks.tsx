"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StackingBooksLoader from "../carousel/stackingbooksloader";
import BookLink from "../ui/booklink";
import { IoTrendingUp } from "react-icons/io5";
import placeholder from "../../../../public/placeholder.png";
import { Book } from "@/app/lib/types";

const categories = [
  "All",
  "Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Biography",
  "Business",
  "Philosophy",
];

const fetchTrendingBooks = async (category: string): Promise<Book[]> => {
  const query = category === "all" ? "bestseller" : category;
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      query
    )}&orderBy=relevance&maxResults=6`
  );

  if (!response.ok) throw new Error("Failed to fetch trending books");

  const data = await response.json();
  return data.items || [];
};

export default function TrendingBooks() {
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const books = await fetchTrendingBooks(selectedCategory);
        setTrendingBooks(books);
      } catch (error) {
        console.error("Error fetching trending books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [selectedCategory]); // Refetch when category changes

  return (
    <section className="my-10 w-full">
      <span className="flex items-center text-black justify-center space-x-2 mb-4">
        <h2 className=" text-2xl  font-bold">See what&apos;s trending</h2>
        <IoTrendingUp />
      </span>

      {/* Category filter bar */}
      <div className="flex space-x-3 overflow-x-auto px-4 mb-5 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 shadow-sm rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      {loading ? (
        <StackingBooksLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {trendingBooks.map((book) => (
            <BookLink key={book.id} bookId={book.id}>
              <div className="flex flex-col items-center">
                <Image
                  src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
                  alt={book.volumeInfo.title}
                  width={120}
                  height={160}
                  className="rounded shadow-md cursor-pointer hover:scale-105 transition"
                />
                <h2 className="text-sm text-black text-center mt-2">
                  {book.volumeInfo.title}
                </h2>
                <h3 className="text-sm text-gray-500 text-center mt-1">
                  {book.volumeInfo.authors?.join(", ")}
                </h3>
              </div>
            </BookLink>
          ))}
        </div>
      )}
    </section>
  );
}
