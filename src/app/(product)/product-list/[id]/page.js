"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Minus, Plus, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("3.5");
  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";

  useEffect(() => {
    if (id) {
      axios
        .get(`${endpoint}/api/v1/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-200 to-gray-300 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 h-auto object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-500 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to list
          </button>

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-green-600 font-medium mt-2">{product.category}</p>
          <p className="text-yellow-500 mt-2">⭐ {product.rating} </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Size Selection */}
          <h3 className="font-semibold mt-6">Size:</h3>
          <Select onValueChange={setSelectedSize} defaultValue={selectedSize}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3.5">3.5 inch</SelectItem>
              <SelectItem value="4">4 inch</SelectItem>
              <SelectItem value="3">3 inch</SelectItem>
              <SelectItem value="4.5">4.5 inch</SelectItem>
            </SelectContent>
          </Select>

          {/* Quantity Selector */}
          <div className="flex items-center mt-6 space-x-4">
            <h3 className="font-semibold">Qty:</h3>
            <div className="flex items-center border rounded-lg">
              <button
                className="p-2 bg-gray-200 rounded-l-lg"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="p-2 bg-gray-200 rounded-r-lg"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Price */}
          <p className="mt-6 text-2xl font-bold text-gray-900">
            ${product.price}
          </p>

          {/* Add to Cart Button */}
          <Button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
            disabled={!product.stock}
          >
            {product.stock ? "ADD TO CART" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
