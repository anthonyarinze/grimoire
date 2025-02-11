"use client";

import React from "react";
import { Book } from "../../lib/types";
import Image from "next/image";
import SearchItemDetails from "./searchitemdetails";
import { useAppDispatch } from "../../lib/hooks";
import { setSelectedBook } from "../../lib/slices/searchSlice";

interface Props {
  results: Book[];
}

export default function SearchItem({ results }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2">
      <ul className="list-none p-0 m-0">
        {results?.map((book) => (
          <li
            key={book.id}
            className="flex items-start gap-2 p-2 content-start overflow-hidden hover:bg-gray-200 cursor-pointer"
            onClick={() => dispatch(setSelectedBook(book))}
          >
            <Image
              src={book.volumeInfo.imageLinks?.smallThumbnail || null}
              alt={book.volumeInfo.title}
              width={60}
              height={70}
              className=" rounded min-h-[70px] min-w-[60px]"
            />
            <div className="w-full h-full space-y-4">
              <SearchItemDetails
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors}
                isMature={book.volumeInfo.maturityRating}
                rating={book.volumeInfo.averageRating}
                pageCount={book.volumeInfo.pageCount}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
