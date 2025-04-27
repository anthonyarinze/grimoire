"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { errorNotifier, successNotifier } from "@/app/lib/notifications";
import LibraryCard from "@/app/components/library/librarycard";
import { LibraryBooks } from "@/app/lib/types";
import { queryClient } from "@/app/lib/queryClient";
import Spinner from "../components/ui/spinner";
import { useAppSelector } from "../lib/hooks";
import ProtectedRoute from "../components/ui/protectedroute";

const filters = ["All", "Want to Read", "Reading", "Finished"];

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [removingBookId, setRemovingBookId] = useState<string | null>(null);

  // Fetch user's library
  const { data: library = [], isLoading } = useQuery({
    queryKey: ["userLibrary", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      const userLibraryRef = doc(db, "libraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      if (!userLibrarySnap.exists()) return [];

      const books = Object.values(userLibrarySnap.data()).filter(
        (book) => book && book.id // Ensure book is not null
      );

      return books;
    },
    enabled: !!user?.uid,
  });

  // Mutation to remove a book from the library
  const { mutate: removeBook } = useMutation({
    mutationFn: async (bookId: string) => {
      if (!user?.uid) return;
      setRemovingBookId(bookId); // Set the book ID being removed
      const userLibraryRef = doc(db, "libraries", user.uid);
      await updateDoc(userLibraryRef, { [bookId]: null }); // Removes the book entry
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLibrary", user?.uid] });
      successNotifier("Book removed from library!");
    },
    onError: () => {
      errorNotifier("Failed to remove book. Try again.");
    },
    onSettled: () => {
      setRemovingBookId(null); // Reset the removing book ID when done
    },
  });

  // Filter books based on the selected status
  const filteredBooks =
    selectedFilter === "All"
      ? library
      : library?.filter(
          (book: LibraryBooks) => book?.status === selectedFilter
        );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-black mb-4">📚 My Library</h1>

        {/* Filter Buttons */}
        <div className="flex space-x-3 md:text-base text-sm overflow-scroll scrollbar-hide mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`md:px-4 md:py-2 p-[0.7rem] rounded-md  font-semibold transition ${
                selectedFilter === filter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        {filteredBooks?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBooks.map(
              (book: LibraryBooks) =>
                book && (
                  <LibraryCard
                    key={book.id}
                    book={book}
                    onRemove={removeBook}
                    isPending={removingBookId === book.id}
                  />
                )
            )}
          </div>
        ) : (
          <p className="text-black">No books found in this category.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
