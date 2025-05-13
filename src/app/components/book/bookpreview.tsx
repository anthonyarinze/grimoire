"use client";

import { Book } from "@/app/lib/types";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { IoMdClose } from "react-icons/io";
import { VscOpenPreview } from "react-icons/vsc";

interface BookPreviewProps {
  book: Book;
}

interface GoogleBooksViewer {
  load: (bookId: string) => void; // Only one argument
}

export default function BookPreview({ book }: BookPreviewProps) {
  const [showModal, setShowModal] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<GoogleBooksViewer | undefined>(undefined);

  const industryIdentifiers = book.volumeInfo.industryIdentifiers;
  const isbn =
    industryIdentifiers?.find((id) => id.type === "ISBN_13")?.identifier ??
    industryIdentifiers?.find((id) => id.type === "ISBN_10")?.identifier;

  const viewability = book.accessInfo?.viewability;
  const isEmbeddable =
    isbn && (viewability === "PARTIAL" || viewability === "ALL_PAGES");

  // Load and initialize the Google Embedded Viewer when modal opens
  useEffect(() => {
    if (!showModal || !isbn || !viewerRef.current) return;

    const initializeViewer = () => {
      if (typeof window !== "undefined" && window.google?.books) {
        const viewer = new window.google.books.DefaultViewer(
          viewerRef.current!
        );
        viewer.load(`ISBN:${isbn}`);
        viewerInstanceRef.current = viewer;
      }
    };
    if (window.google?.books) {
      initializeViewer();
    } else {
      // Wait for the script to load, then initialize
      window.__initGoogleBooksViewer = initializeViewer;
    }

    return () => {
      viewerRef.current?.replaceChildren(); // Clean up viewer DOM
    };
  }, [showModal, isbn]);

  if (!isEmbeddable) return null;

  return (
    <>
      {/* Google Books API Script */}
      <Script
        src="https://www.google.com/books/jsapi.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.google && window.google.books) {
            window.google.books.load();
            window.google.books.setOnLoadCallback(() => {
              if (window.__initGoogleBooksViewer) {
                window.__initGoogleBooksViewer();
              }
            });
          }
        }}
      />

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-ceruleanBlue text-white px-4 py-2 flex items-center justify-center gap-1 rounded hover:bg-blue-700 transition"
        >
          <VscOpenPreview size={20} /> Read Preview
        </button>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl h-[80vh] flex flex-col">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-3 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
                aria-label="Close"
              >
                <IoMdClose />
              </button>

              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Book Preview
                </h2>
              </div>

              <div className="flex-1 overflow-hidden p-4">
                <div
                  ref={viewerRef}
                  className="w-full h-full border rounded bg-white dark:bg-gray-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
