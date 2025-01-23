"use client";

import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchItem from "./searchitem";

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = useDebouncedCallback(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResults(data.items || []); //items is the key for the book search results
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }, 400);

  return (
    <div className="relative flex flex-col">
      <div className="relative flex">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 border-gray-300 border p-2 rounded-md text-md"
          onChange={(e) => {
            setError(null);
            handleSearch(e.target.value);
          }}
        />
      </div>
      <SearchItem error={error} results={results} />
    </div>
  );
}
