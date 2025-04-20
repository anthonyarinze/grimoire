import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { errorNotifier } from "../notifications";

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch {
    errorNotifier("Error signing out. Please try again.");
  }
};
