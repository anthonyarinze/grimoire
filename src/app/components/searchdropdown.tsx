import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../lib/hooks";
import { setSearchResults } from "../lib/slices/searchSlice";
import SearchItem from "./searchitem";
import { Book } from "../lib/types";
import { useDebouncedCallback } from "use-debounce";

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
  const dispatch = useAppDispatch();

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
    onSuccess: (data) => {
      dispatch(setSearchResults(data.items || []));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (fetchError) return <p>Error: {fetchError.message}</p>;

  return (
    <div className="flex flex-col top-full z-50 list-none overflow-y-auto max-h-[300px] absolute rounded-sm bg-gray-100 shadow-md w-full scrollbar-hide">
      {fetchError && <p className="text-red-500 mt-2">{fetchError.message}</p>}
      <SearchItem results={data?.items || []} />
    </div>
  );
}
