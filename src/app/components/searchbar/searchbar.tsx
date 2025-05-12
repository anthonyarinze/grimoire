"use client";

import { useState } from "react";
import SearchDropdown from "./searchdropdown";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(query.trim()); // Ensure searchQuery updates
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative flex">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          placeholder="Search by Author, Title or ISBN"
          className="bg-gray-200 w-[14.5rem] md:w-[18rem] text-black dark:text-gray-300 border-gray-300 border p-2 rounded-md text-[0.8rem] dark:bg-gray-600"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (searchQuery) setSearchQuery(""); // Reset search when typing
          }}
          onKeyDown={handleKeyDown} // Trigger search only on Enter
        />
      </div>
      {searchQuery && (
        <SearchDropdown
          query={searchQuery}
          onSelectResult={() => {
            setQuery(""); // Clear input
            setSearchQuery(""); // Close dropdown
          }}
        />
      )}
    </div>
  );
}
