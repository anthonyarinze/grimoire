import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string | string[];
    cover: string;
    isbn: string | null;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const displayAuthor =
    typeof book.author === "string"
      ? book.author
      : book.author?.join(", ").slice(0, 60) || "Unknown Author";

  return (
    <div className="relative">
      <Link
        href={`/redirect/isbn/${book.isbn}`}
        className="bg-white shadow-md rounded-md p-3 flex flex-col items-center cursor-pointer text-center hover:shadow-lg transition"
      >
        <Image
          src={book.cover || "/placeholder.png"}
          alt={book.title}
          width={100}
          height={150}
          className="object-cover rounded-md shadow w-[100px] h-[150px]"
        />
        <h3 className="mt-2 text-sm font-medium truncate text-black">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500">{displayAuthor}</p>
      </Link>
    </div>
  );
}
