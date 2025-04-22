"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { infoNotifier } from "@/app/lib/notifications";
import Link from "next/link";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string | string[];
    cover: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleAddToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      infoNotifier("Please log in to add books to your library.");
      router.push("/auth/login");
      return;
    }

    // Add to library logic here
  };

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const displayAuthor =
    typeof book.author === "string"
      ? book.author
      : book.author?.join(", ").slice(0, 60) || "Unknown Author";

  return (
    <div className="relative">
      <Link
        href={`/book/${book.id}`}
        className="bg-white shadow-md rounded-md p-3 flex flex-col items-center cursor-pointer text-center hover:shadow-lg transition"
      >
        <Image
          src={book.cover || "/placeholder.png"}
          alt={book.title}
          width={100}
          height={150}
          className="object-cover rounded-md shadow w-[100px] h-[150px]"
        />
        <h3 className="mt-2 text-sm font-medium text-black">
          {truncate(book.title, 50)}
        </h3>
        <p className="text-xs text-gray-500">{displayAuthor}</p>

        <button
          onClick={handleAddToLibrary}
          className="mt-2 text-xs px-3 py-1 bg-ceruleanBlue text-white rounded hover:bg-blue-700 transition"
        >
          Add to Library
        </button>
      </Link>
    </div>
  );
}
