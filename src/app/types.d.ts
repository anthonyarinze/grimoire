declare global {
  interface Window {
    google?: {
      books?: {
        load: () => void;
        setOnLoadCallback: (callback: () => void) => void;
        DefaultViewer: new (container: HTMLElement) => {
          load: (bookId: string) => void;
        };
      };
    };
    __initGoogleBooksViewer?: () => void;
  }
}

export {};
