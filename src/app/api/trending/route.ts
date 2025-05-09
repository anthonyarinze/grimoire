import { shuffleArray } from "@/app/lib/functions";
import { NYTBook } from "@/app/lib/types";
import { NextResponse } from "next/server";

const NYT_API_KEY = process.env.NEXT_NYT_API_KEY;

const LISTS = [
  "hardcover-fiction",
  "hardcover-nonfiction",
  "young-adult",
  "science",
  "business",
];

export async function GET() {
  try {
    const results = await Promise.all(
      LISTS.map(async (list) => {
        const res = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?api-key=${NYT_API_KEY}`
        );
        if (!res.ok) return null;
        const json = await res.json();

        const enrichedBooks = await Promise.all(
          json.results.books.map(async (book: NYTBook) => {
            const isbn = book.primary_isbn13;
            let googleData = null;

            try {
              const googleRes = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
              );
              const googleJson = await googleRes.json();
              googleData = googleJson.items?.[0] ?? null;
            } catch {
              googleData = null;
            }

            return googleData;
          })
        );
        const shuffledEnrichedBooks = shuffleArray(enrichedBooks);

        return { list, books: shuffledEnrichedBooks };
      })
    );

    const filtered = results.filter(Boolean);
    return NextResponse.json({ lists: filtered });
  } catch (err) {
    console.error("NYT fetch error", err);
    return new NextResponse("Failed to fetch trending books", { status: 500 });
  }
}
