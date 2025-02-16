"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function CreateProduct() {
  const { loggedInUser } = useAuth(); // ✅ Hooks must be at the top level
  console.log(loggedInUser);
  // ✅ Prevent rendering before user authentication check
  // if (!loggedInUser) return <h1>Please Login to Access this Page</h1>;
  // if (loggedInUser.role !== "admin")
  // return <h1>Only Admins can Access this Page</h1>;

  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";

  // ✅ Hooks should not be inside conditions
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    stock: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Text Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload with Validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      if (image) {
        formDataObj.append("image", image);
      }

      const { data } = await axios.post(
        `${endpoint}/api/v1/products/createProduct?id=${loggedInUser._id}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Product created successfully!");
      setFormData({
        name: "",
        price: "",
        rating: "",
        stock: "", // ✅ Fixed from countInStock
        category: "",
        description: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      setMessage("❌ Error creating product.");
      console.error("Error:", error?.response?.data || error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-[6rem] max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg bg-gradient-to-r from-gray-100 via-blue-200 to-gray-300">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity" // ✅ Fixed from countInStock
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover" />
        )}
        {message && <p className="text-green-600">{message}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
