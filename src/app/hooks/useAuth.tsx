import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export function useAuth() {
  const [authState, setAuthState] = useState<{
    user: User | null;
    loading: boolean;
  }>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, loading: false });
    });

    return unsubscribe;
  }, []);

  return authState;
}
