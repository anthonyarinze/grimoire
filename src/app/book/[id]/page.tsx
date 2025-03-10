"use client";

import BookActions from "@/app/components/bookdetails/bookactions";
import BookDesccription from "@/app/components/bookdetails/bookdescription";
import BookHeader from "@/app/components/bookdetails/bookheader";
import MoreByAuthor from "@/app/components/bookdetails/morebyauthor";
import Spinner from "@/app/components/ui/spinner";
import { fetchBookDetails } from "@/app/lib/functions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function BookDetails() {
  const { id } = useParams();
  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
    enabled: !!id, // Only fetch if id is truthy
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading book.</p>;
  if (!book) return <p className="text-red-500">No book found.</p>;

  return (
    <main className="m-2 p-3 w-[95%] h-full gap-5 text-black flex flex-col">
      <BookHeader book={book} />
      <BookActions />
      <BookDesccription description={book.volumeInfo.description} />
      <MoreByAuthor author={book.volumeInfo.authors} />
    </main>
  );
}
