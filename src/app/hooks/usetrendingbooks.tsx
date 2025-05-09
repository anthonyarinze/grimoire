import { useQuery } from "@tanstack/react-query";
import { Book } from "../lib/types";

export interface ListResult {
  list: string;
  books: Book[];
}

export function useTrendingBooks() {
  return useQuery<ListResult[]>({
    queryKey: ["trendingBooks"],
    queryFn: async () => {
      const res = await fetch("/api/trending");
      if (!res.ok) throw new Error("Failed to fetch trending books");

      const data: { lists: ListResult[] } = await res.json();
      return data.lists;
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
