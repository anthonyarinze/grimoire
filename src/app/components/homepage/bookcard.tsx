"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { infoNotifier } from "@/app/lib/notifications";

interface BookCardProps {
  id: string;
  title: string;
  author: string | string[];
  cover: string;
}

export default function BookCard({ book }: BookCardProps) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleAddToLibrary = () => {
    if (!user) {
      infoNotifier("Please log in to add books to your library.");
      router.push("/auth/login");
      return;
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition bg-white">
      <Image
        src={book.cover || "/placeholder.png"}
        alt={book.title}
        width={150}
        height={200}
        className="mx-auto rounded w-[150px] h-[200px] object-cover"
      />
      <div className="mt-4 text-center">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        <button
          className="mt-3 text-sm px-4 py-2 bg-ceruleanBlue text-white rounded hover:bg-blue-700 transition"
          onClick={handleAddToLibrary}
        >
          Add to Library
        </button>
      </div>
    </div>
  );
}
