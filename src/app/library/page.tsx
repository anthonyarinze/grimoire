"use client";

import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { db } from "@/app/lib/firebase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { errorNotifier, successNotifier } from "@/app/lib/notifications";
import LibraryCard from "@/app/components/library/librarycard";
import { useUser } from "@/app/hooks/useUser";
import { LibraryBooks } from "@/app/lib/types";
import { queryClient } from "@/app/lib/queryClient";

const filters = ["All", "Want to Read", "Reading", "Finished"];

export default function LibraryPage() {
  const { isAuthenticated } = useUser();
  const user = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("All");

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
  const { mutate: removeBook, isPending } = useMutation({
    mutationFn: async (bookId: string) => {
      if (!user?.uid) return;
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
  });

  // Filter books based on the selected status
  const filteredBooks =
    selectedFilter === "All"
      ? library
      : library?.filter(
          (book: LibraryBooks) => book?.status === selectedFilter
        );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          You must be signed in to access your library.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📚 My Library</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
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
      {isLoading ? (
        <p>Loading your library...</p>
      ) : filteredBooks?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBooks.map(
            (book: LibraryBooks) =>
              book && (
                <LibraryCard
                  key={book.id}
                  book={book}
                  onRemove={removeBook}
                  isPending={isPending}
                />
              )
          )}
        </div>
      ) : (
        <p className="text-gray-500">No books found in this category.</p>
      )}
    </div>
  );
}
