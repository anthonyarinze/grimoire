import React from "react";
import { Book } from "../lib/types";
import Image from "next/image";
import SearchItemTitle from "./searchitemtitle";

interface Props {
  results: Book[];
}

export default function SearchItem({ results }: Props) {
  console.log("🚀 ~ SearchItem ~ results:", results);
  return (
    <div className="flex flex-col gap-2">
      <ul className="list-none p-0 m-0">
        {results?.map((book) => (
          <li
            key={book.id}
            className="flex items-start gap-2 p-2 content-start"
          >
            <Image
              src={book.volumeInfo.imageLinks?.smallThumbnail || null}
              alt={book.volumeInfo.title}
              width={60}
              height={70}
              className=" rounded min-h-[70px] min-w-[60px]"
            />
            <SearchItemTitle
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors}
              isMature={book.volumeInfo.maturityRating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
