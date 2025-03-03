import { Book } from "./types";

export const fetchBookDetails = async (bookId: string): Promise<Book[]> => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  );

  if (!response.ok)
    throw new Error("Failed to fetch book details. Please try again later.");

  const data = await response.json();
  return data;
};
