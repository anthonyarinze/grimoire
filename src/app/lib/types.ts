// TypeScript interfaces for the Google Books API response and user state
// and for the library books in Firestore

import { FieldValue } from "firebase/firestore";

// and for the open library api call
export interface Book {
  etag: string;
  id: string;
  accessInfo?: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    epub?: {
      isAvailable: boolean;
    };
    pdf?: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  volumeInfo: {
    title: string;
    authors?: string[]; // Optional, as some books may not have authors listed
    averageRating?: number; // Optional
    publisher?: string; // Optional
    publishedDate?: string; // Optional
    description?: string; // Optional
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    infoLink: string;
    readingModes?: {
      text: boolean;
      image: boolean;
    };
    pageCount?: number; // Optional
    printType?: string; // Optional
    categories?: string[]; // Optional
    maturityRating?: string; // Optional
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language?: string;
    previewLink?: string;
    canonicalVolumeLink?: string;
  };
}

export interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  loading: boolean;
}

export interface LibraryBooks {
  id: string;
  title: string;
  authors: string[];
  cover: string;
  status: string;
  addedAt: string | FieldValue; // Firestore timestamp
  lastModified: string | FieldValue;
  uploaded?: boolean;
  progress?: number; // for tracking reading %
}

export interface NYTBook {
  title: string;
  author: string;
  primary_isbn13: string;
}
