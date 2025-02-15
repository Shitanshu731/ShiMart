"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";

import SearchBar from "./SearchBar";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";

const Navbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const { loggedInUser } = useAuth();
  return (
    <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-md">
      <h1 className="text-slate-600 font-bold shadow-lg">Shicommerce</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex items-center space-x-4">
        <h1 className="text-slate-500">
          {loggedInUser ? `${loggedInUser.userName}` : ""}
        </h1>
        <Image
          src="/profileIcon.jpeg"
          height={40}
          width={40}
          alt="profileIcon"
        />
      </div>
      <ProfileSidebar />
    </div>
  );
};

export default Navbar;
