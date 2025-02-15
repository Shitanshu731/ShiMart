"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SearchBar from "./SearchBar";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";
import { X } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const { loggedInUser } = useAuth();

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-md">
        <h1 className="text-slate-600 font-bold shadow-lg">Shicommerce</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center space-x-4">
          <h1 className="text-slate-500">
            {loggedInUser ? `${loggedInUser.userName}` : ""}
          </h1>
          <Image
            className="cursor-pointer hover:shadow-lg hover:scale-105 rounded-2xl duration-100"
            src="/profileIcon.jpeg"
            height={40}
            width={40}
            alt="profileIcon"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform z-10 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out p-4`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>

        <ProfileSidebar />
      </div>
    </div>
  );
};

export default Navbar;
