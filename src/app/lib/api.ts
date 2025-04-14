import { Book } from "./types";

export async function fetchBooksByAuthor(author: string) {
  if (!author) throw new Error("Author name is required");

  try {
    // ✅ Normalize author data to extract only the first author
    const firstAuthor = Array.isArray(author) // If it's an array, take the first element
      ? author[0].trim()
      : author.includes(",") // If it's a comma-separated string, split and take the first part
      ? author.split(",")[0].trim()
      : author.trim(); // Otherwise, just use it directly
    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
      firstAuthor
    )}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return { books: [] }; // Return empty array on failure
  }
}

export async function fetchBooks(query: string): Promise<{ items: Book[] }> {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results.");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export async function fetchBookById(id: string): Promise<Book> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch book details.");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
