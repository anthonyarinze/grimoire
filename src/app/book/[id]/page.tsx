import BookHeader from "@/app/components/bookdetails/bookheader";
import React from "react";

export default async function BookDetails() {
  return (
    <main className="m-2 p-3 w-[95%] text-black flex flex-col">
      <BookHeader />
    </main>
  );
}
