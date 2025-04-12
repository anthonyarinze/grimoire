// hooks/usedeleteaccount.ts
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { errorNotifier, successNotifier } from "../lib/notifications";
import { FirebaseError } from "firebase/app";

export function useDeleteAccount() {
  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in.");

      // Optional: delete user library from Firestore
      const userLibraryRef = doc(db, "libraries", user.uid);
      await deleteDoc(userLibraryRef);

      // Delete user account
      await deleteUser(user);
    },
    onSuccess: () => {
      successNotifier("Account successfully deleted.");
    },
    onError: (error: FirebaseError) => {
      if (error.code === "auth/requires-recent-login") {
        errorNotifier("Please sign in again to delete your account.");
      } else {
        errorNotifier("Failed to delete account.");
      }
    },
  });

  return { deleteAccount, isPending };
}
