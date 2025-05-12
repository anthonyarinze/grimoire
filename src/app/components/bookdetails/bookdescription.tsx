"use client";

import React, { useState } from "react";

interface BookDescriptionProps {
  description: string;
}

export default function BookDescription({ description }: BookDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative text-lg text-gray-800 dark:text-gray-300">
      <div
        className={`transition-all duration-500 ${
          isExpanded ? "line-clamp-none" : "line-clamp-4"
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Read More / Show Less Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-ceruleanBlue font-semibold dark:text-blue-500 hover:underline"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </section>
  );
}
