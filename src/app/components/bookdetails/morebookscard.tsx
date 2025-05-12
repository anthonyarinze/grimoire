import React from "react";
import BookLink from "../ui/booklink";
import Image from "next/image";
import { Book } from "@/app/lib/types";

interface MoreBooksCardProps {
  book: Book;
}

export default function MoreBooksCard({ book }: MoreBooksCardProps) {
  return (
    <>
      {book.id ? (
        <BookLink bookId={book.id}>
          <div className="text-wrap items-center flex flex-col w-[150px] h-auto text-center shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-2 transition transform hover:scale-105 hover:brightness-105">
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
              alt={book.volumeInfo.title}
              width={145}
              height={200}
              className="rounded w-[145px] h-[200px] mb-2 object-cover"
            />
            <p className="text-sm font-medium truncate line-clamp-2 text-center text-wrap text-black dark:text-white">
              {book.volumeInfo.title}
            </p>
          </div>
        </BookLink>
      ) : null}
    </>
  );
}
