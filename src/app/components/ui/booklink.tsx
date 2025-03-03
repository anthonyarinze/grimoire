"use client";

import { useAppDispatch } from "@/app/lib/hooks";
import { setSelectedBook } from "@/app/lib/slices/searchSlice";
import { Book } from "@/app/lib/types";
import Link from "next/link";

interface BookLinkProps {
  book: Book;
  chilren: React.ReactNode;
}

function BookLink({ book, children }: BookLinkProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedBook(book));
  };

  return (
    <Link
      href={`/book/${book.id}`}
      className="block hover:opacity-80 transition"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export default BookLink;
