import React from "react";

export default function BookNotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
      <p className="text-gray-600">
        Sorry, we couldn&apos;t find that book in our system :/
      </p>
    </div>
  );
}
