"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle Search Button Click
  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-full p-2 w-full max-w-md bg-white shadow-md max-sm:max-w-[65%]">
      {/* Search Icon */}
      <Search
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent px-2 text-gray-900 placeholder-gray-400"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchBar;
