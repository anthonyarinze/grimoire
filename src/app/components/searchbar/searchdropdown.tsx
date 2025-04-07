import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchItem from "./searchitem";
import ProgressBar from "./progressbar";
import { fetchBooks } from "@/app/lib/api";

export default function SearchDropdown({
  query,
  onSelectResult,
}: {
  query: string;
  onSelectResult: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooks(query),
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
      <div ref={dropdownRef} className="relative z-50">
        <div className="flex flex-col top-full z-50 list-none overflow-y-auto max-h-[300px] absolute rounded-sm bg-gray-100 shadow-md w-full scrollbar-hide">
          {isLoading ? (
            <ProgressBar />
          ) : (
            <>
              {/* Top gradient for scroll cue */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none"></div>
              {/* Content */}
              <SearchItem
                results={data?.items || []}
                onSelect={onSelectResult}
              />
              {/* Bottom gradient for scroll cue */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none"></div>
            </>
          )}
        </div>
      </div>
    )
  );
}
