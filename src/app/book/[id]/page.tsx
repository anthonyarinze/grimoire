"use client";

import BookActions from "@/app/components/bookdetails/bookactions";
import BookHeader from "@/app/components/bookdetails/bookheader";
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

  if (isLoading)
    return <p className="text-gray-500">Loading book details...</p>;
  if (error) return <p className="text-red-500">Error loading book.</p>;
  if (!book) return <p className="text-red-500">No book found.</p>;

  return (
    <main className="m-2 p-3 w-[95%] text-black flex flex-col">
      <BookHeader book={book} />
      <BookActions />
    </main>
  );
}
