import { fetchBookDetails } from "@/app/lib/functions";
import { notFound } from "next/navigation";
import React from "react";

function BookDetails({ params }: { params: { id: string } }) {
  const book = await fetchBookDetails(params.id);
  console.log("🚀 ~ BookDetails ~ book:", book);

  if (!book) return notFound();
  return <main className="m-5 p-3 text-black flex flex-col">Test</main>;
}

export default BookDetails;
