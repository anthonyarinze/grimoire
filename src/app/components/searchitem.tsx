import React from "react";

interface Props {
  error: [];
  results: [];
}

export default function SearchItem({ error, results }: Props) {
  return (
    <div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {results.length > 0 && (
        <ul className=" mt-8 bg-white shadow-md rounded-md">
          {results.map((book) => (
            <li key={book.id} className="p-2 border-b last:border-none">
              <h3 className="font-bold">{book.volumeInfo.title}</h3>
              <p className="text-sm text-gray-500">
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
