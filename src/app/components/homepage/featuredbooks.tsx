import React from "react";
import BookCard from "./bookcard";

const sampleBooks = [
  { id: "1", title: "The Night Circus", author: "Erin Morgenstern" },
  { id: "2", title: "Project Hail Mary", author: "Andy Weir" },
  { id: "3", title: "Atomic Habits", author: "James Clear" },
  // Add more for a real setup
];

export default function FeaturedBooksGrid() {
  return (
    <section className="px-6 py-12 bg-gray-50 text-black">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
