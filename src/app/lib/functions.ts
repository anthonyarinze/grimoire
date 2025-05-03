// utility functions for the app

import { infoNotifier } from "./notifications";
import { Book, OpenLibraryWork, TrendingBook } from "./types";

export const fetchBookDetails = async (
  bookId: string
): Promise<Book | null> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );

    if (!response.ok) {
      throw new Error("Network error while fetching book details.");
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};

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

export async function fetchTrendingBooks(): Promise<TrendingBook[]> {
  const res = await fetch("/api/trending");

  if (!res.ok)
    throw new Error("Failed to fetch trending books. Please try again later.");

  const data = await res.json();

  const books: OpenLibraryWork[] = data.works;

  const filteredBooks = books.filter((book) => {
    return (
      Array.isArray(book.language) &&
      book.language.includes("eng") &&
      book.availability?.isbn
    );
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

// fetch google books by isbn
export async function searchGoogleBooksByISBN(
  isbn: string
): Promise<string | null> {
  const res = await fetch(`/api/search-isbn?isbn=${isbn}`);

  if (!res.ok) return null;

  const data = await res.json();

  if (data.fallback) {
    infoNotifier("Redirected to the English edition of this book.");
  }

  return data.id || null;
}
