import { Book } from "./types";

export const fetchBookDetails = async (
  bookId: string
): Promise<Book | null> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );

    if (!response.ok) {
      console.error("Error fetching book details:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network error fetching book details:", error);
    return null;
  }
};
