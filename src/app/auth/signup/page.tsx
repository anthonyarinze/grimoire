"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { signUpWithEmail, signInWithGoogle } from "@/app/lib/redux/authSlice";
import { useRouter } from "next/navigation";
import { Google } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle email/password sign-up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signUpWithEmail(form)).unwrap();
      router.push("/library"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      router.push("/library");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {/* Form */}
        <form onSubmit={handleEmailSignUp} className="flex flex-col">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-2 border rounded mb-2"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 bg-red-600 text-white p-2 mt-2 rounded hover:bg-red-700 disabled:bg-red-400 w-full"
          disabled={loading}
        >
          <Google size={20} /> {loading ? "Loading..." : "Sign Up with Google"}
        </button>

        {/* Error message */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Already have an account? */}
        <p className="text-sm text-gray-600 mt-3 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
