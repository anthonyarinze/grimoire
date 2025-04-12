import React, { useState } from "react";
import { useUpdateProfile } from "@/app/hooks/useupdateprofile";
import { uploadProfileImage } from "@/app/hooks/useuploadprofileimage";
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
  userId,
}: Props) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const [isUploading, setUploading] = useState(false);
  const { update, isPending } = useUpdateProfile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalPhotoUrl = photoUrl;

    if (imageFile) {
      setUploading(true);
      finalPhotoUrl = await uploadProfileImage(imageFile, userId);
      setUploading(false);
    }

    await update({ displayName, photoUrl: finalPhotoUrl });
    onClose();
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
          </div>

          {/* Upload + Preview */}
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            {preview && (
              <Image
                src={preview}
                height={96}
                width={96}
                alt="Profile preview"
                className="rounded-full object-cover mt-2 mb-2"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

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
              disabled={isPending || isUploading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {isPending || isUploading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
