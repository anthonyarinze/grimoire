import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const isISBN = /^[0-9]{10,13}$/.test(query);
    const url = isISBN
      ? `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}`
      : `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch from Google Books API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
