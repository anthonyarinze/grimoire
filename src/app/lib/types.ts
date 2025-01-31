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
    pageCount?: number; // Optional
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
}
