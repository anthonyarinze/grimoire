import { Book } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="relative">
      <Link
        href={`/book/${book.id}`}
        className="bg-white shadow-md rounded-md w-full p-3 flex flex-col items-center cursor-pointer text-center hover:shadow-lg transition"
      >
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
          alt={book.volumeInfo.title}
          width={100}
          height={150}
          className="object-cover rounded-md shadow w-[100px] h-[150px]"
        />
        <h3 className="mt-2 w-full text-sm font-medium truncate text-black">
          {book.volumeInfo.title}
        </h3>
        <p className="text-xs text-gray-500">
          {book.volumeInfo.authors?.[0] || "Unknown author"}
        </p>
        <span
          className={
            "mt-2 px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600"
          }
        >
          {book.volumeInfo.categories?.[0] || "No Category"}
        </span>
      </Link>
    </div>
  );
}
