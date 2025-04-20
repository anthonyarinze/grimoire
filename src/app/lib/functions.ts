import { Book } from "./types";

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
