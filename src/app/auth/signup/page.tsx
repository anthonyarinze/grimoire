"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { signUpWithEmail } from "@/app/lib/slices/authslice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/home"); // Redirect to home if authenticated
    }
  }, [user, router]);

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpWithEmail({ email, password }))
      .unwrap()
      .then(() => router.push("/home"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold text-black mb-4">Sign Up</h2>

        {error && <p className="text-red-500">{error.message}</p>}

        <form onSubmit={handleEmailSignUp} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border text-black rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border text-black rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <span className="flex gap-1 text-black mt-4">
          <h3>Already have an account? </h3>
          <Link
            href="/auth/signin"
            className="hover:underline hover:text-blue-600"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
