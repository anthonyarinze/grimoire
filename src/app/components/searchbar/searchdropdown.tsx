import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchItem from "./searchitem";
import { Book } from "../../lib/types";
import { useDebouncedCallback } from "use-debounce";
import ProgressBar from "../../ui/progressbar";

const fetchBooks = async (query: string): Promise<{ items: Book[] }> => {
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
  return data;
};

export default function SearchDropdown({ query }: { query: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedFetchBooks = useDebouncedCallback((query: string) => {
    return fetchBooks(query);
  }, 400);

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["books", query],
    queryFn: () => debouncedFetchBooks(query).then((result) => result),
    enabled: !!query,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (fetchError) return <p>Error: {fetchError.message}</p>;

  return (
    isOpen && (
      <div ref={dropdownRef} className="relative">
        <div className="flex flex-col top-full z-50 list-none overflow-y-auto max-h-[300px] absolute rounded-sm bg-gray-100 shadow-md w-full scrollbar-hide">
          {isLoading ? (
            <ProgressBar />
          ) : (
            <>
              {/* Top gradient for scroll cue */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none"></div>
              {/* Content */}
              <SearchItem results={data?.items || []} />
              {/* Bottom gradient for scroll cue */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none"></div>
            </>
          )}
        </div>
      </div>
    )
  );
}
