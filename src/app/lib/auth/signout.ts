import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};
