"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { errorNotifier, successNotifier } from "@/app/lib/notifications";
import LibraryCard from "@/app/components/library/librarycard";
import { LibraryBooks } from "@/app/lib/types";
import { queryClient } from "@/app/lib/queryClient";
import { useAppSelector } from "../lib/hooks";
import ProtectedRoute from "../components/ui/protectedroute";
import Spinner from "../components/ui/spinner";
import UploadFAB from "../components/library/uploadfab";
import { useFileUpload } from "../hooks/usefileupload";
import AltSpinner from "../components/ui/altspinner";
import { addBookToLibrary } from "@/app/lib/firebase/mutations/library";
import UploadModal from "../components/library/uploadmodal";
import { sanitizeKey, unsanitizeKey } from "../lib/functions";

const filters = ["All", "Want to Read", "Reading", "Finished"];

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [removingBookId, setRemovingBookId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { uploadFile } = useFileUpload();

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

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
    mutationFn: async (book: LibraryBooks) => {
      if (!user?.uid) return;
      setRemovingBookId(book.id);

      // Remove from Firestore library
      const userLibraryRef = doc(db, "libraries", user.uid);
      await updateDoc(userLibraryRef, { [book.id]: null });

      // If uploaded, delete from R2 storage
      if (book.uploaded) {
        const res = await fetch("/api/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // expects the unsanitized key (.epub/.pdf) to delete the file
          // this is because the key in firestore is sanitized (no .epub/.pdf)
          body: JSON.stringify({ key: unsanitizeKey(book.id) }),
        });

        if (!res.ok) {
          throw new Error("Failed to delete file from storage");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLibrary", user?.uid] });
      successNotifier("Book removed from library!");
    },
    onError: () => {
      errorNotifier("Failed to remove book. Try again.");
    },
    onSettled: () => {
      setRemovingBookId(null);
    },
  });

  // Filter books based on the selected status
  const filteredBooks =
    selectedFilter === "All"
      ? library
      : library?.filter(
          (book: LibraryBooks) => book?.status === selectedFilter
        );

  // this runs wehn a user picks file via uploadfab
  const handleFileSelected = (file: File) => {
    setFileToUpload(file);
    setShowUploadModal(true);
  };

  // runs when user confirms status in modal and triggers upload
  const handleUploadConfirm = async (
    status: "Want to Read" | "Reading" | "Finished"
  ) => {
    if (!fileToUpload) return;

    setShowUploadModal(false);
    setIsUploading(true);

    try {
      const result = await uploadFile(fileToUpload);

      if (result.success) {
        const bookId = sanitizeKey(result.key); // Sanitize the key for Firestore
        const uploadedBook: LibraryBooks = {
          id: bookId,
          title: fileToUpload.name.replace(/\.(epub|pdf)$/i, ""),
          authors: [], // Authors can be extracted from metadata if available
          cover: "", // will be set later via effect
          status,
          uploaded: true,
          addedAt: serverTimestamp(),
          lastModified: serverTimestamp(),
          progress: 0, // Initial progress set to 0
        };

        if (user?.uid) {
          await addBookToLibrary(user.uid, uploadedBook);
          queryClient.invalidateQueries({
            queryKey: ["userLibrary", user.uid],
          });
        }

        successNotifier("Book uploaded successfully!");
      } else {
        errorNotifier("Failed to upload book: " + result.error);
      }
    } catch {
      errorNotifier("Unexpected error uploading book");
    } finally {
      setIsUploading(false);
      setFileToUpload(null);
    }
  };

  // runs when modal is closed
  const handleModalClose = () => {
    setShowUploadModal(false);
    setFileToUpload(null);
  };

  if (isLoading) <Spinner />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen mx-auto p-6 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-black dark:text-gray-300 mb-4">
          📚 My Library
        </h1>

        {/* Filter Buttons */}
        <div className="flex space-x-3 md:text-base text-sm overflow-scroll scrollbar-hide mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`md:px-4 md:py-2 p-[0.7rem] rounded-md dark:brightness-95 font-semibold transition ${
                selectedFilter === filter
                  ? "bg-blue-500 text-white dark:text-gray-300"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:hover:text-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-blue-500"
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
          <p className="text-black dark:text-gray-300">
            No books found in this category.
          </p>
        )}
      </div>
      {isUploading && <AltSpinner />}

      <UploadFAB onFileSelected={handleFileSelected} />

      {showUploadModal && (
        <UploadModal
          file={fileToUpload}
          onClose={handleModalClose}
          onConfirm={handleUploadConfirm}
        />
      )}
    </ProtectedRoute>
  );
}
