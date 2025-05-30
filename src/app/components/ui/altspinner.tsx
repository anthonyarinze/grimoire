import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

export default function AltSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-white">
        <PiSpinnerBold className="animate-spin text-4xl" />
        <p className="text-sm text-gray-600">Uploading book...</p>
      </div>
    </div>
  );
}
