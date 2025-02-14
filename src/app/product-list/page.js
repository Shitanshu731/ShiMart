"use client";
import { useState } from "react";
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

const products = [
  {
    id: 1,
    name: "Fusion Equinox",
    price: 1199,
    rating: 4,
    reviews: 36,
    image: "/fusion.jpg",
    category: "Pastel_Colors",
    stock: true,
  },
  {
    id: 2,
    name: "Momentum Prime",
    price: 699,
    rating: 1.7,
    reviews: 14,
    image: "/momentum.jpg",
    category: "Digital_Painting",
    stock: false,
  },
  {
    id: 3,
    name: "Ascend Velocity",
    price: 1899,
    rating: 2.4,
    reviews: 9,
    image: "/ascend.jpg",
    category: "Fantasy",
    stock: true,
  },
  {
    id: 4,
    name: "Ascend Velocity",
    price: 1899,
    rating: 2.4,
    reviews: 9,
    image: "/ascend.jpg",
    category: "Fantasy",
    stock: true,
  },
  {
    id: 5,
    name: "Ascend Velocity",
    price: 1899,
    rating: 2.4,
    reviews: 9,
    image: "/ascend.jpg",
    category: "Fantasy",
    stock: true,
  },
];

export default function ProductList() {
  const [priceFilter, setPriceFilter] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [theme, setTheme] = useState("light");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceFilter[0] && product.price <= priceFilter[1]
  );

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
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"
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

      {/* Flexbox Layout: Sidebar + Product List */}
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
          {["Pastel_Colors", "Digital_Painting", "Fantasy"].map((cat) => (
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
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className={`p-4 shadow-lg rounded-lg transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />
              <CardContent className="text-center">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-yellow-500">
                  {product.rating}⭐ ({product.reviews} reviews)
                </p>
                <Button className="mt-2 w-full" disabled={!product.stock}>
                  {product.stock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
