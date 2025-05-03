// TypeScript interfaces for the Google Books API response and user state
// and for the library books in Firestore
// and for the open library api call
export interface Book {
  etag: string;
  id: string;
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
  addedAt: string;
  authors: string[];
  cover: string;
  id: string;
  lastModified: string;
  status: string;
  title: string;
}

export interface OpenLibraryWork {
  title: string;
  author_name?: string[];
  cover_i?: number;
  key: string;
  edition_count: number;
  first_publish_year?: number;
  language: string[];
  availability: {
    isbn: string | null;
  };
}

export interface TrendingBook {
  id: string;
  title: string;
  author: string | string[];
  cover: string;
  isbn: string | null;
}
