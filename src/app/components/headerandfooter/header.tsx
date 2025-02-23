import React from "react";
import SearchBar from "../searchbar/searchbar";

export default function Header() {
  return (
    <header className="h-[4.5rem] px-4 flex flex-row items-center justify-between text-black bg-white shadow-lg sticky top-0 z-50">
      <h1 className="md:text-3xl text-2xl font-bold">Grimoire</h1>
      <SearchBar />
    </header>
  );
}
