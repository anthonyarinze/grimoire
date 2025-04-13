import React, { useState } from "react";
import { useUpdateProfile } from "@/app/hooks/useupdateprofile";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialDisplayName: string;
  initialPhotoUrl: string | null;
  userId: string;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialDisplayName,
  initialPhotoUrl,
}: Props) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl ?? "");
  const [previewError, setPreviewError] = useState(false);
  const { update, isPending } = useUpdateProfile();

  // Acceptable extensions
  const isValidImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/.test(url);
  };

  const isImageValid = photoUrl === "" || isValidImageUrl(photoUrl);

  const isDisplayNameValid = displayName.trim().length > 0;
  const isFormValid = isDisplayNameValid && isImageValid;

  const resetForm = () => {
    setDisplayName(initialDisplayName);
    setPhotoUrl(initialPhotoUrl ?? "");
    setPreviewError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return; // Prevent submission if form is invalid

    await update({ displayName, photoUrl });
    onClose();
    resetForm(); // Reset form after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
            {!isDisplayNameValid && (
              <p className="text-xs text-red-500 mt-1">
                Display name is required.
              </p>
            )}
          </div>

          {/* Upload + Preview */}
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            {photoUrl && isValidImageUrl(photoUrl) && (
              <Image
                src={previewError ? "/default-avatar.png" : photoUrl}
                height={96}
                width={96}
                alt="Profile preview"
                className="rounded-full object-cover mt-2 mb-2"
                onError={() => setPreviewError(true)}
                onLoad={() => setPreviewError(false)}
              />
            )}

            <input
              type="text"
              name="photoUrl"
              placeholder="Image URL"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
                setPreviewError(false); // Reset preview error if user types again
              }}
              className="border p-2 rounded w-full"
            />

            <p className="text-xs text-gray-500 mt-1">
              I only support image links that point directly to a photo hosted
              online for now. Valid formats: .jpg, .jpeg, .png, .gif, .webp
            </p>

            {!isValidImageUrl(photoUrl) && photoUrl && (
              <p className="text-xs text-red-500 mt-1">
                That doesn’t look like a valid image URL.
              </p>
            )}
          </div>
          {photoUrl && !isImageValid && (
            <p className="text-red-500 text-sm mt-1">
              I only support image links that point directly to a photo hosted
              online (e.g., ending in .jpg, .png, etc). I hope to incorporate
              image upload in the future.
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !isFormValid}
              className={`px-4 py-2 rounded transition text-white ${
                isPending || !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
