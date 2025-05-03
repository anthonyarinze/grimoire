import { Book } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json({ error: "Missing ISBN" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await res.json();

    if (!data.items || data.totalItems === 0) {
      return NextResponse.json({ error: "No book found" }, { status: 404 });
    }

    const firstItem = data.items[0];
    const language = firstItem.volumeInfo?.language;

    if (language === "en") {
      return NextResponse.json({ id: firstItem.id, fallback: false });
    }

    // Attempt fallback: find any English edition in the results
    const englishEdition = data.items.find(
      (item: Book) => item.volumeInfo?.language === "en"
    );

    if (englishEdition) {
      return NextResponse.json({ id: englishEdition.id, fallback: true });
    }

    return NextResponse.json(
      { error: "No English edition found" },
      { status: 404 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
