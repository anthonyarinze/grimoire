// utility functions for the app

import { Book } from "./types";
import ePub from "epubjs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

export function getTimeOfDay() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "morning";
  } else if (currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export async function fetchBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search results. Please try again later.");
  }

  const data = await response.json();

  return data.items ?? [];
}

export async function fetchBookById(id: string): Promise<Book> {
  const response = await fetch(`/api/search?query=${id}&type=id`);

  if (!response.ok) {
    throw new Error("Failed to fetch book by ID");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sanitizeKey(key: string): string {
  const base64 = btoa(key); // Standard base64
  // Convert to URL-safe base64 (no padding, + => -, / => _)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function unsanitizeKey(sanitized: string): string {
  // Pad the string to make it valid base64 length
  let base64 = sanitized.replace(/-/g, "+").replace(/_/g, "/");
  const paddingNeeded = 4 - (base64.length % 4);
  if (paddingNeeded !== 4) {
    base64 += "=".repeat(paddingNeeded);
  }
  return atob(base64);
}

export async function getEpubCover(url: string): Promise<string | null> {
  const book = ePub(url);
  await book.ready;

  const coverUrl = await book.coverUrl(); // This handles cover extraction
  return coverUrl;
}

// Set the workerSrc once before calling getDocument
if (typeof window !== "undefined" && !GlobalWorkerOptions.workerSrc) {
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`; // Replace with your actual version
}
export async function getPdfCover(url: string): Promise<string> {
  const loadingTask = pdfjsLib.getDocument(url);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  const canvas = document.createElement("canvas");
  const viewport = page.getViewport({ scale: 1 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2D context from canvas");
  }

  await page.render({ canvasContext: context, viewport }).promise;

  return canvas.toDataURL(); //base64 image url
}

export const getUserIdToken = (): Promise<string> => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // Stop listening once we get a user

      if (!user) {
        reject(new Error("User not authenticated"));
      } else {
        const token = await user.getIdToken(true);
        resolve(token);
      }
    });
  });
};

// lib/functions/getDownloadUrl.ts

const signedUrlCache = new Map<string, string>();

/**
 * Returns a signed URL from /api/getsignedurl for the given book ID.
 * Caches the URL in memory to reduce API calls.
 * Expects an unsanitized key (e.g., book ID) as input.
 */
export async function getDownloadUrl(bookId: string): Promise<string | null> {
  if (signedUrlCache.has(bookId)) {
    return signedUrlCache.get(bookId)!;
  }

  try {
    const res = await fetch(
      `/api/getsignedurl?key=${encodeURIComponent(unsanitizeKey(bookId))}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch signed URL.");
      return null;
    }

    const { signedUrl } = await res.json();

    if (!signedUrl) {
      throw new Error("No signed URL returned");
      return null;
    }

    signedUrlCache.set(bookId, signedUrl); // cache it
    return signedUrl;
  } catch {
    throw new Error("Error fetching signed URL.");
    return null;
  }
}
