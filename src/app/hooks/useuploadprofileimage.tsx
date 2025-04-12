import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/lib/firebase";

export async function uploadProfileImage(file: File, userId: string) {
  const storageRef = ref(storage, `profile-images/${userId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
