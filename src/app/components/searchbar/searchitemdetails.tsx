import Image from "next/image";
import React from "react";
import mature from "../../../../public/mature.svg";
import { FaBookOpen, FaStar } from "react-icons/fa";
import ToolTip from "@/app/components/ui/tooltip";

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
          className="text-md font-semibold line-clamp-2"
          title={title} // Native Tooltip
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-full">
          {author || "Unknown Author"}
        </p>
      </div>

      {/* Rating, Page Count & Mature Tag */}
      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
        {rating !== undefined && (
          <div className="flex items-center space-x-1">
            <FaStar className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
        {pageCount && (
          <div className="flex items-center space-x-1">
            <FaBookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>{pageCount}</span>
          </div>
        )}
        {isMature && (
          <div className="relative group">
            <Image
              src={mature}
              alt="mature"
              height={18}
              width={18}
              className="cursor-pointer"
            />
            {/* Tooltip */}
            <ToolTip text="Mature Content" />
          </div>
        )}
      </div>
    </div>
  );
}
