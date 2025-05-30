import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { LibraryBooks } from "@/app/lib/types";

export async function addBookToLibrary(uid: string, book: LibraryBooks) {
  if (!book || !book.id) throw new Error("Invalid book object");

  const userLibraryRef = doc(db, "libraries", uid);

  const cleanedBook = Object.fromEntries(
    Object.entries(book).filter(([, value]) => value !== undefined)
  ) as Partial<LibraryBooks>;

  await updateDoc(userLibraryRef, {
    [book.id]: cleanedBook,
  });
}
