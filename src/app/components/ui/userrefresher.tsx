"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/slices/authslice";

export default function UserRefresher() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    }
  }, [user, loading, dispatch]);

  if (!loading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <FaSpinner className="text-gray-500 animate-spin text-2xl" />
    </div>
  );
}
