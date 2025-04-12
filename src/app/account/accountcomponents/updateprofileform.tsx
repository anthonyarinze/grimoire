"use client";

import React, { useState } from "react";
import { successNotifier, errorNotifier } from "@/app/lib/notifications";
import { useUser } from "@/app/hooks/useuser";
import { useUpdateProfile } from "@/app/hooks/useupdateprofile";

export default function UpdateProfileForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const user = useUser();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const { update, isPending } = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update({ displayName, photoUrl });
      successNotifier("Profile updated successfully!");
      onSuccess(); // Close modal on success
    } catch (error) {
      errorNotifier("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Profile Picture URL"
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </>
  );
}
