import { Book } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="relative transition-transform duration-200 hover:scale-105 hover:brightness-105">
      <Link
        href={`/book/${book.id}`}
        className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-md w-full p-3 flex flex-col items-center cursor-pointer text-center hover:shadow-lg dark:hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
      >
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
          alt={book.volumeInfo.title}
          width={100}
          height={150}
          className="object-cover rounded-md shadow w-[100px] h-[150px]"
        />
        <h3 className="mt-2 w-full text-sm font-medium truncate text-black dark:text-gray-100">
          {book.volumeInfo.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {book.volumeInfo.authors?.[0] || "Unknown author"}
        </p>
        <span className="mt-2 px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {book.volumeInfo.categories?.[0] || "No Category"}
        </span>
      </Link>
    </div>
  );
}
