"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md mx-auto mt-4 rounded"
      />
      <p className="mt-2 text-gray-600">${product.price}</p>
      <p className="text-yellow-500">Rating: {product.rating}⭐</p>
      <p className="mt-4">{product.description}</p>
      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
        disabled={!product.stock}
      >
        {product.stock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductDetail;
