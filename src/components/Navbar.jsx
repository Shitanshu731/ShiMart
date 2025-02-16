"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SearchBar from "./SearchBar";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

const Navbar = () => {
  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setProducts, allProducts } = useProduct();
  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${endpoint}/api/v1/products/search?q=${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");

      // ✅ Store search results in sessionStorage
      setProducts(data);

      // ✅ Check if already on the product-list page before navigating
      if (router.pathname !== "/product-list") {
        router.push("/product-list");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { loggedInUser } = useAuth();

  return (
    <div className="fixed top-0 z-10 w-full">
      <div className="flex justify-between z-10 items-center p-4 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-[0_0_20px_5px_rgba(139,92,246,0.8)] hover:shadow-[0_0_30px_10px_rgba(99,102,241,1)] transition-shadow duration-300">
        <Image
          onClick={() => router.push("/")}
          src="/ecommerceLogo.png"
          height={40}
          width={40}
          alt="logo"
          className=" rounded-lg cursor-pointer max-lg:hidden"
        />
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
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
