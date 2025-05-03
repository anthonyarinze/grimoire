// src/app/api/trending/route.ts
export async function GET() {
  try {
    const res = await fetch("https://openlibrary.org/trending/daily.json");

    if (!res.ok) {
      return new Response("Failed to fetch data from OpenLibrary", {
        status: res.status,
      });
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
