"use client";

import BookActions from "@/app/components/bookdetails/bookactions";
import BookDesccription from "@/app/components/bookdetails/bookdescription";
import BookHeader from "@/app/components/bookdetails/bookheader";
import MoreByAuthor from "@/app/components/bookdetails/morebyauthor";
import Spinner from "@/app/components/ui/spinner";
import { fetchBookById } from "@/app/lib/functions";
import { useAppDispatch } from "@/app/lib/hooks";
import { setSelectedBook } from "@/app/lib/slices/searchslice";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function BookDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const bookId = typeof id === "string" ? id : undefined;

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId!),
    enabled: !!bookId,
  });

  useEffect(() => {
    if (book) {
      dispatch(setSelectedBook(book));
    }
  }, [book, dispatch]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading book.</p>;
  if (!book) return <p className="text-red-500">No book found.</p>;

  return (
    <main className="h-full gap-5 dark:bg-gray-900 text-black dark:text-gray-300 p-5 flex flex-col">
      <BookHeader book={book} />
      <BookActions />
      <BookDesccription
        description={
          book.volumeInfo?.description ?? "No description available."
        }
      />
      <MoreByAuthor
        bookId={book.id}
        author={book.volumeInfo?.authors ?? ["Unknown author"]}
      />
    </main>
  );
}
