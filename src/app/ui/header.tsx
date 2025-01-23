import React from "react";
import SearchBar from "../components/searchbar";

export default function Header() {
  return (
    <header className="sticky h-[4.5rem] px-4 flex flex-row items-center justify-between text-black bg-white shadow-lg">
      <h1 className="text-3xl font-bold">Grimoire</h1>
      <SearchBar />
    </header>
  );
}
