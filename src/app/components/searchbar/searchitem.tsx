"use client";

import React from "react";
import { Book } from "@/app/lib/types";
import Image from "next/image";
import BookLink from "../ui/booklink";
import SearchItemDetails from "./searchitemdetails";

export default function SearchItem({ results }: Book) {
  return (
    <div className="flex flex-col text-black gap-2">
      <ul className="list-none p-0 m-0">
        {results?.map((book: Book) => (
          <BookLink key={book.id} bookId={book.id}>
            <li className="flex items-start gap-2 p-2 content-start overflow-hidden hover:bg-gray-200 cursor-pointer">
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
          </BookLink>
        ))}
      </ul>
    </div>
  );
}
