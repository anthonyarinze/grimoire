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
          <div className="text-wrap items-center flex flex-col w-[150px] h-auto text-center shrink-0">
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
              alt={book.volumeInfo.title}
              width={128}
              height={192}
              className="rounded mb-2 w-auto h-auto object-cover"
            />
            <p className="text-sm font-medium truncate text-start justify-start text-wrap">
              {book.volumeInfo.title}
            </p>
          </div>
        </BookLink>
      ) : null}
    </>
  );
}
