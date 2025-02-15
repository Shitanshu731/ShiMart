"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };
  const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-md">
      <h1 className="text-slate-600 font-bold shadow-lg">Shicommerce</h1>
      <SearchBar onSearch={handleSearch} />
      <Button
        variant={user ? "destructive" : "secondary"}
        onClick={
          user
            ? logout
            : () => {
                router.push("/login");
              }
        }
      >
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default Navbar;
