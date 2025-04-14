import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { makeStore } from "../store";
import { setUser } from "../slices/userslice";

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // You can still dispatch a simplified user to Redux
        const { uid, email, displayName, photoURL } = user;
        makeStore().dispatch(setUser({ uid, email, displayName, photoURL }));
      }

      resolve(user); // Return the full Firebase User object
      unsubscribe();
    });
  });
}
