"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login, loggedInUser } = useAuth();
  const router = useRouter();

  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loggedInUser) {
      router.push("/");
      console.log(loggedInUser);
      alert("You are logged in!");
    }
  }, [loggedInUser, router]);

  const fetchUser = async (credentials) => {
    try {
      const response = await fetch(`${endpoint}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        login(data);
        console.log("Login successful");
        router.push("/");
      } else {
        console.log("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(credentials); // Pass the credentials to fetchUser
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-blue-200 to-gray-300 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email} // Ensure the input is controlled
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              value={credentials.password} // Ensure the input is controlled
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white py-2 rounded-xl transition-all"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
