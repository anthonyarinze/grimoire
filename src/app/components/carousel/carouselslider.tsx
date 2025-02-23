"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Book } from "../lib/types";
import StackingBooksLoader from "./stackingbooksloader";

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

  if (loading) return <StackingBooksLoader />;

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-[95%] h-full m-5 shadow-md relative -z-50 rounded-md"
      >
        {Object.entries(popularBooks).map(([category, books]) => (
          <SwiperSlide key={category} className="p-4  rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-black">
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
                  <p className="text-xs text-black text-center mt-2">
                    {book.volumeInfo.title}
                  </p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
