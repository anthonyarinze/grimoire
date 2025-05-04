"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingBooks } from "../lib/functions";

export function useTrendingBooks() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trendingBooks"],
    retry: 1,
    queryFn: fetchTrendingBooks,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  return { books, isLoading, isError };
}
