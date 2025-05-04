import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "query"; // "query" | "isbn" | "id"

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    let url = "";

    switch (type) {
      case "id":
        url = `https://www.googleapis.com/books/v1/volumes/${query}`;
        break;

      case "isbn":
        url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}`;
        break;

      case "query":
      default:
        url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`;
        break;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch from Google Books API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
