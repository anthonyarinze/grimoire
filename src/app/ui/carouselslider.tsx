"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Book } from "../lib/types";

const categories = [
  "fiction",
  "mystery",
  "fantasy",
  "science fiction",
  "romance",
  "history",
];

const fetchPopularBooksByCategory = async (
  category: string
): Promise<Book[]> => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      category
    )}&orderBy=relevance&maxResults=3`
  );

  if (!response.ok) throw new Error(`Failed to fetch books for ${category}`);

  const data = await response.json();
  return data.items || [];
};

const fetchAllPopularBooks = async (): Promise<{
  [category: string]: Book[];
}> => {
  const bookPromises = categories.map(async (category) => {
    const books = await fetchPopularBooksByCategory(category);
    return { category, books };
  });

  const results = await Promise.all(bookPromises);
  return results.reduce((acc, { category, books }) => {
    acc[category] = books;
    return acc;
  }, {} as { [category: string]: Book[] });
};

export default function PopularBooksCarousel() {
  const [popularBooks, setPopularBooks] = useState<{
    [category: string]: Book[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchAllPopularBooks();
        setPopularBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) return <p className="text-center">Loading recommendations...</p>;

  return (
    <div className="w-full max-w-4xl h-full my-5 shadow-md relative -z-50 rounded-md">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="w-full"
      >
        {Object.entries(popularBooks).map(([category, books]) => (
          <SwiperSlide key={category} className="p-4  rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              Popular {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              Titles
            </h2>
            <div className="flex justify-between items-start p-4">
              {books.map((book) => (
                <div key={book.id} className="flex flex-col items-center w-28">
                  <Image
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "/placeholder.png"
                    }
                    alt={book.volumeInfo.title}
                    width={100}
                    height={130}
                    className="rounded shadow-md p-2 cursor-pointer -z-50"
                  />
                  <p className="text-xs text-center mt-2">
                    {book.volumeInfo.title}
                  </p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
