"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { FcReading } from "react-icons/fc";
import { IoCheckmarkDone, IoLibrary } from "react-icons/io5";
import {
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/lib/queryClient";
import {
  errorNotifier,
  infoNotifier,
  successNotifier,
} from "@/app/lib/notifications";

const statuses = [
  { label: "Want to Read", icon: <IoLibrary size={20} /> },
  { label: "Reading", icon: <FcReading size={20} /> },
  { label: "Finished", icon: <IoCheckmarkDone size={20} /> },
];

export default function BookActions() {
  const selectedBook = useAppSelector((state) => state.search.selectedBook);
  const user = useAppSelector((state) => state.user);

  // Fetch book status from firestore using react query
  const { data: bookStatus, isLoading } = useQuery({
    queryKey: ["bookStatus", user?.uid, selectedBook?.id],
    queryFn: async () => {
      if (!user?.uid || !selectedBook?.id) return null;
      const userLibraryRef = doc(db, "libraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);
      return userLibrarySnap.exists()
        ? userLibrarySnap.data()[selectedBook.id]?.status || null
        : null;
    },
    enabled: !!user?.uid && !!selectedBook?.id, // Only fetch if user and book id are truthy
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // mutation to update firestore
  const { mutate: updateBookStatus, isPending } = useMutation({
    mutationFn: async (status: string) => {
      if (!user?.uid || !selectedBook?.id) {
        infoNotifier("Please login to update your library.");
        return;
      }

      const userLibraryRef = doc(db, "libraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      // Check if book already exists
      const existingBook = userLibrarySnap.exists()
        ? userLibrarySnap.data()[selectedBook.id]
        : null;

      if (existingBook?.status === status) {
        // ✅ Remove book from library if clicked twice
        await setDoc(
          userLibraryRef,
          { [selectedBook.id]: deleteField() }, // Remove the book entry
          { merge: true }
        );
        successNotifier("Book removed from your library!");
      } else {
        // ✅ Update book status in Firestore
        const bookData = {
          id: selectedBook.id,
          title: selectedBook.volumeInfo.title,
          authors: selectedBook.volumeInfo.authors,
          cover: selectedBook.volumeInfo.imageLinks?.thumbnail,
          status,
          addedAt: existingBook?.addedAt || serverTimestamp(),
          lastModified: serverTimestamp(),
        };

        await setDoc(
          userLibraryRef,
          { [selectedBook.id]: bookData },
          { merge: true }
        );
        successNotifier("Book status updated successfully!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookStatus", user?.uid, selectedBook?.id],
      });
    },
    onError: () => {
      errorNotifier("Failed to update book status. Please try again.");
    },
  });

  return (
    <>
      {/* {Full screen loading overlay} */}
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="text-white text-4xl animate-spin" />
            <p className="text-white mt-2 z-50">Updating library...</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {statuses.map(({ label, icon }) => (
          <button
            key={label}
            disabled={isLoading || isPending}
            onClick={() => updateBookStatus(label)}
            className={`px-4 py-2 flex items-center gap-2 rounded-md font-semibold transition ${
              bookStatus === label
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
