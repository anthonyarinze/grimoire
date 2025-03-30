import React from "react";
import BookLink from "../ui/booklink";
import Image from "next/image";
import { Book } from "@/app/lib/types";
import placeholder from "../../../../public/placeholder.png";

interface MoreBooksCardProps {
  book: Book;
}

export default function MoreBooksCard({ book }: MoreBooksCardProps) {
  return (
    <BookLink bookId={book.id}>
      <div className="text-wrap items-start flex flex-col w-[180px] text-center shrink-0">
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
          alt={book.volumeInfo.title}
          className="w-full object-cover rounded-md shadow-md"
          width={160}
          height={240}
        />
        <p className="mt-2 text-sm font-medium">{book.volumeInfo.title}</p>
      </div>
    </BookLink>
  );
}
