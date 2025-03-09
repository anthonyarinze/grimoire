import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../slices/userslice";
import { makeStore } from "../store";

export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        const userData = { uid, email, displayName, photoURL };

        makeStore().dispatch(setUser(userData));
        resolve(userData);
      } else {
        resolve(null);
      }
      unsubscribe(); // unusbscrie user after first call
    });
  });
}
