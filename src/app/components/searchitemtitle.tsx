import Image from "next/image";
import React from "react";
import mature from "../../../public/mature.svg";

interface Props {
  title: string;
  author?: string;
  isMature: boolean;
}

export default function SearchItemTitle({ title, author, isMature }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 ">
        <h3 className="text-md font-semibold truncate">{title}</h3>
        {isMature === "MATURE" && (
          <Image src={mature} alt="mature" height={20} width={20} />
        )}
      </div>
      <p className="text-sm text-gray-600 truncate max-w-full">
        {author?.join(", ") || "Unknown Author"}
      </p>
    </div>
  );
}
