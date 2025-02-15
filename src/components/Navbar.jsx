"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      Navbar
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
