"use client";

import Link from "next/link";

export default function BookNotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
        Oops! 📚
      </h1>
      <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay">
        We couldn&apos;t find the book you were looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-ceruleanBlue text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
