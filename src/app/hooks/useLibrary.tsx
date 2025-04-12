import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useAuth } from "./useAuth";
import { LibraryBooks } from "@/app/lib/types";

export function useLibrary() {
  const user = useAuth();

  const {
    data: library = [],
    isLoading,
    isError,
    error,
  } = useQuery<LibraryBooks[]>({
    queryKey: ["userLibrary", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      const userLibraryRef = doc(db, "libraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      if (!userLibrarySnap.exists()) return [];

      const books = Object.values(userLibrarySnap.data()).filter(
        (book) => book && book.id
      ) as LibraryBooks[];

      return books;
    },
    enabled: !!user?.uid,
  });

  return { library, isLoading, isError, error };
}
