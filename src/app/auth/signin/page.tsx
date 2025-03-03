"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { signInWithGoogle, signInWithEmail } from "@/app/lib/slices/authslice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
      .unwrap()
      .then(() => router.push("/")); // Redirect after sign-in
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInWithEmail({ email, password }))
      .unwrap()
      .then(() => router.push("/"));
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="w-full p-2 bg-blue-500 mt-3 text-white rounded-md mb-4 hover:bg-blue-600"
        >
          Sign in with Google
        </button>

        <span className="flex gap-1">
          <h3>Don&apos;t have an account? </h3>
          <Link href="/signup">
            <h3 className="hover:underline hover:text-blue-600"> Register</h3>
          </Link>
        </span>
      </div>
    </div>
  );
}
