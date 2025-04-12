import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase"; // adjust path as needed
import { queryClient } from "../lib/queryClient";
import { UserState } from "../lib/types";

interface UpdateProfileData {
  displayName?: string;
  photoUrl?: string;
}

export function useUpdateProfile() {
  const {
    mutateAsync: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ displayName, photoUrl }: UpdateProfileData) => {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      await updateProfile(user, {
        displayName,
        photoURL: photoUrl,
      });

      //manually update the "user" cache with the new data
      queryClient.setQueryData(["user"], (prev: UserState) => ({
        ...prev,
        displayName,
        photoUrl,
      }));

      // Optionally return updated user
      return user;
    },
  });

  return { update, isPending, error };
}
