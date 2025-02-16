"use client";

import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-full p-2 w-full max-w-md bg-white shadow-md max-sm:max-w-[65%]">
      {/* Search Icon */}
      <Search
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={onSearch}
      />

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent px-2 text-gray-900 placeholder-gray-400"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
    </div>
  );
};

export default SearchBar;
