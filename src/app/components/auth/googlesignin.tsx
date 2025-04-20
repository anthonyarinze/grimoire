import { auth } from "@/app/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../ui/button";
import google from "../../../../public/google.svg";
import Image from "next/image";
import { errorNotifier } from "@/app/lib/notifications";

export default function GoogleSignIn() {
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch {
      errorNotifier("Error signing in with Google. Please try again.");
    }
  };

  return (
    <Button onClick={handleSignIn} variant="google" size="medium">
      <Image src={google} alt="Google Logo" />
      Sign In With Goodle
    </Button>
  );
}
