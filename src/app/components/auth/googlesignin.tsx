"use client";

import { auth } from "@/app/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";

export default function GoogleSignIn() {
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return <Button onClick={handleSignIn}>Sign in with Google</Button>;
}
