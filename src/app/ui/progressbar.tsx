import React from "react";

export default function ProgressBar() {
  return (
    <div className="relative w-full h-12 bg-gray-300 overflow-hidden flex flex-col items-center justify-center space-y-2">
      <div className="animate-bounce top-0 text-xl">📖</div>
      <div className="absolute left-0 bottom-0 h-1 w-full bg-gray-600 animate-progress"></div>
    </div>
  );
}
