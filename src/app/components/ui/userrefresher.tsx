"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { setUser } from "@/app/lib/slices/userslice";
import { useAppDispatch } from "@/app/lib/hooks";

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
            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    }
  }, [user, loading, dispatch]);

  return (
    loading && (
      <div className="fixed top-4 right-4 z-50">
        <FaSpinner className="text-gray-500 animate-spin text-2xl" />
      </div>
    )
  );
}
