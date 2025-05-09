// utility functions for the app

import { Book } from "./types";

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

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
