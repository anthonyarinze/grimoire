import Image from "next/image";
import React from "react";
import mature from "../../../../public/mature.svg";
import { BookOpen, Star } from "lucide-react";

interface Props {
  title: string;
  author?: string;
  isMature: boolean;
  rating?: number;
  pageCount?: number;
}

export default function SearchItemDetails({
  title,
  author,
  isMature,
  rating,
  pageCount,
}: Props) {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <div>
        <h3
          className="text-md font-semibold line-clamp-2 cursor-default"
          title={title} // Native Tooltip
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 truncate max-w-full">
          {author?.join(", ") || "Unknown Author"}
        </p>
      </div>

      {/* Rating, Page Count & Mature Tag */}
      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
        {rating !== undefined && (
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
        {pageCount && (
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span>{pageCount}</span>
          </div>
        )}
        {isMature === "MATURE" && (
          <div className="relative group">
            <Image
              src={mature || null}
              alt="mature"
              height={18}
              width={18}
              className="cursor-pointer"
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max max-w-xs bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md group-hover:block z-50">
              Mature Content
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
