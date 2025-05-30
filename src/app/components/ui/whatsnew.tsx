"use client";

import { useEffect, useState } from "react";

export default function WhatsNewBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if banner was shown before
    const seen = localStorage.getItem("whatsNewSeen");
    if (!seen) {
      setShowBanner(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("whatsNewSeen", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center z-50">
      <p className="max-w-xl">
        🎉 What&apos;s New: You can now upload your favorite EPUBs and PDFs and
        read them on the website!
      </p>
      <button
        onClick={handleClose}
        className="ml-4 bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded"
        aria-label="Close what's new banner"
      >
        ✕
      </button>
    </div>
  );
}
