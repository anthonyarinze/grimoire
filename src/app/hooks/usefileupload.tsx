import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";

type UploadResult =
  | { success: true; key: string; downloadUrl?: string }
  | { success: false; error: string; downloadUrl?: string };

export function useFileUpload() {
  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      const auth = getAuth(app);
      const token = await auth.currentUser?.getIdToken();

      if (!token) return { success: false, error: "User not authenticated." };

      if (file.size > 10 * 1024 * 1024) {
        return {
          success: false,
          error: "File exceeds 10MB single upload size limit.",
        };
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok)
        return { success: false, error: data.error || "Upload failed." };

      return { success: true, key: data.key, downloadUrl: data.downloadUrl };
    } catch {
      return {
        success: false,
        error: "Internal server error. Please try again later.",
      };
    }
  };

  return { uploadFile };
}
