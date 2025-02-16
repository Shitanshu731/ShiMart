"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import Link from "next/link";

export default function ProductList() {
  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";
  const [allProducts, setAllProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [theme, setTheme] = useState("light");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Correctly fetching data
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/v1/products/`);
      setAllProducts(response.data); // ✅ Correct placement
    } catch (error) {
      alert("Error fetching products");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // ✅ Filtering products based on price
  const filteredProducts = allProducts.filter(
    (product) =>
      product.price >= priceFilter[0] && product.price <= priceFilter[1]
  );

  // ✅ Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortBy === "lowToHigh"
      ? a.price - b.price
      : sortBy === "highToLow"
      ? b.price - a.price
      : 0
  );

  return (
    <div
      className={`min-h-screen p-4 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-r from-gray-100 via-blue-200 to-gray-300 text-black"
      }`}
    >
      {/* Header with Mobile Filter Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Listings</h1>
        <Button
          className="lg:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Layout: Sidebar + Product List */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (Filters) */}
        <aside
          className={`lg:w-1/4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } ${isFilterOpen ? "block" : "hidden lg:block"}`}
        >
          <h2 className="font-bold text-lg mb-4">Filters</h2>

          {/* Price Filter */}
          <h3 className="font-semibold">Price</h3>
          <Slider
            min={0}
            max={2000}
            value={priceFilter}
            onValueChange={setPriceFilter}
          />
          <p className="text-sm text-gray-500">
            Range: ${priceFilter[0]} - ${priceFilter[1]}
          </p>

          {/* Sort By */}
          <h3 className="font-semibold mt-4">Sort By</h3>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Selector */}
          <h3 className="font-semibold mt-4">Theme</h3>
          <Select onValueChange={setTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <h3 className="font-semibold mt-4">Categories</h3>
          {["phones", "laptops", "headphones"].map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() =>
                  setSelectedCategories(
                    selectedCategories.includes(cat)
                      ? selectedCategories.filter((c) => c !== cat)
                      : [...selectedCategories, cat]
                  )
                }
              />
              <label htmlFor={cat} className="text-sm font-medium">
                {cat}
              </label>
            </div>
          ))}
        </aside>

        {/* Product List */}
        <main className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Card
                key={product._id}
                className={`p-4 shadow-lg rounded-lg transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <Link href={`/product-list/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded"
                  />
                  <CardContent className="text-center">
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-yellow-500">
                      Rating : {product.rating}⭐
                    </p>
                    <Button className="mt-2 w-full" disabled={!product.stock}>
                      {product.stock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))
          ) : (
            <p className="text-center w-full">No products found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
