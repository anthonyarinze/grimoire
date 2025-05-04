// utility functions for the app

import { Book, OpenLibraryWork, TrendingBook } from "./types";

export function getTimeOfDay() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "morning";
  } else if (currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export async function fetchBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search results. Please try again later.");
  }

  const data = await response.json();

  return data.items ?? [];
}

export async function fetchBookById(id: string): Promise<Book> {
  const response = await fetch(`/api/search?query=${id}&type=id`);

  if (!response.ok) {
    throw new Error("Failed to fetch book by ID");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function fetchTrendingBooks(): Promise<TrendingBook[]> {
  const res = await fetch("/api/trending");

  if (!res.ok)
    throw new Error("Failed to fetch trending books. Please try again later.");

  const data = await res.json();

  const books: OpenLibraryWork[] = data.works;

  const filteredBooks = books.filter((book) => {
    return book.availability && book.availability.isbn;
  });

  return filteredBooks.map((book) => ({
    id: book.key,
    title: book.title,
    author: book.author_name?.[0] || "Unknown Author",
    cover: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "/placeholder.png",
    isbn: book.availability!.isbn,
  }));
}
