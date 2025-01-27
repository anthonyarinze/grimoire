"use client";

import { useState } from "react";
import SearchDropdown from "./searchdropdown";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(query);
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
          placeholder="Search..."
          className="bg-gray-200 w-[14.5rem] border-gray-300 border p-2 rounded-md text-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <SearchDropdown query={searchQuery} />
    </div>
  );
}
