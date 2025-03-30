import Image from "next/image";
import { LibraryBooks } from "@/app/lib/types";
import { IoClose } from "react-icons/io5";
import ToolTip from "@/app/components/ui/tooltip";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

interface LibraryCardProps {
  book: LibraryBooks;
  onRemove: (bookId: string) => void;
  isPending: boolean;
}

export default function LibraryCard({
  book,
  onRemove,
  isPending,
}: LibraryCardProps) {
  return (
    <Link
      className="bg-white shadow-md rounded-md p-3 flex flex-col items-center text-center relative cursor-pointer hover:shadow-lg transition"
      href={`/book/${book.id}`}
    >
      {/* Remove Button */}
      <button
        disabled={isPending}
        onClick={() => onRemove(book.id)}
        className="absolute top-2 right-2 p-1 z-50 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        {isPending ? (
          <FaSpinner className="animate-spin" size={20} />
        ) : (
          <IoClose size={20} />
        )}
        <ToolTip text="Remove" />
      </button>

      {/* Book Cover */}
      <Image
        src={book.cover}
        alt={book.title}
        width={100}
        height={150}
        className="object-cover rounded-md shadow"
      />

      {/* Book Info */}
      <h3 className="mt-2 text-sm font-medium">{book.title}</h3>
      <p className="text-xs text-gray-500">{book.authors?.join(", ")}</p>

      {/* Status Label */}
      <span className="mt-2 px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600">
        {book.status}
      </span>
    </Link>
  );
}
