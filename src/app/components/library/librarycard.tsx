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

const statusColors: Record<string, string> = {
  "Want to Read": "bg-yellow-100 text-yellow-600",
  Reading: "bg-blue-100 text-blue-600",
  Finished: "bg-green-100 text-green-600",
};

export default function LibraryCard({
  book,
  onRemove,
  isPending,
}: LibraryCardProps) {
  return (
    <div className="relative">
      <Link
        className="bg-white shadow-md rounded-md p-3 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition"
        href={`/book/${book.id}`}
      >
        {/* Book Cover */}
        <Image
          src={book.cover || "/placeholder.png"}
          alt={book.title}
          width={100}
          height={150}
          className="object-cover rounded-md shadow w-[100px] h-[150px]"
        />

        {/* Book Info */}
        <h3 className="mt-2 text-sm font-medium text-black truncate">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 truncate">
          {book.authors?.join(", ")}
        </p>

        {/* Status Label */}
        <span
          className={`mt-2 px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600 ${
            statusColors[book.status]
          }`}
        >
          {book.status}
        </span>
      </Link>

      {/* Remove Button - outside the <Link> */}
      <button
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault(); // Prevent <Link> navigation
          e.stopPropagation(); // Stop bubbling up to Link
          onRemove(book.id);
        }}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-10"
      >
        {isPending ? (
          <FaSpinner className="animate-spin" size={20} />
        ) : (
          <IoClose size={20} />
        )}
        <ToolTip text="Remove" />
      </button>
    </div>
  );
}
