"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { FcReading } from "react-icons/fc";
import { IoCheckmarkDone, IoLibrary } from "react-icons/io5";
import { getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { FaSpinner } from "react-icons/fa";

const statuses = [
  { label: "Want to Read", icon: <IoLibrary size={20} /> },
  { label: "Reading", icon: <FcReading size={20} /> },
  { label: "Finished", icon: <IoCheckmarkDone size={20} /> },
];

export default function BookActions() {
  const selectedBook = useAppSelector((state) => state.search.selectedBook);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add a loading state
  const user = useAuth();

  const handleStatusChange = async (status: string) => {
    if (!user?.uid) {
      alert("Please login to manage your library.");
      return;
    }

    setLoading(true);
    // ✅ Add a loading state to prevent multiple clicks
    setSelectedStatus(status);
    // ✅ Update the user's book status in the database

    try {
      const userLibraryRef = doc(db, "libraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      // Check if the book already exists in Firestore
      const existingBook = userLibrarySnap.exists()
        ? userLibrarySnap.data()[selectedBook.id]
        : null;

      const bookData = {
        id: selectedBook?.id,
        title: selectedBook?.volumeInfo.title,
        authors: selectedBook?.volumeInfo.authors,
        cover: selectedBook?.volumeInfo.imageLinks?.thumbnail,
        status: status,
        addedAt: existingBook?.addedAt || serverTimestamp(),
        lastModified: serverTimestamp(),
      };

      if (userLibrarySnap.exists()) {
        // Update book status in firestore
        await setDoc(
          userLibraryRef,
          { [selectedBook?.id]: bookData },
          { merge: true }
        );
        alert("Book status updated successfully!");
      } else {
        // Create a library if it doesn't exist
        await setDoc(userLibraryRef, { [selectedBook?.id]: bookData });
        alert("Book added to your library!");
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      alert("Failed to update book status. Please try again.");
    } finally {
      setLoading(false);
      // ✅ Reset the loading state after the operation
    }
  };

  return (
    <>
      {/* {Full screen loading overlay} */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="text-white text-4xl animate-spin" />
            <p className="text-white mt-2">Updating library...</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {statuses.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => handleStatusChange(label)}
            className={`px-4 py-2 flex items-center gap-2 rounded-md font-semibold transition ${
              selectedStatus === label
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
