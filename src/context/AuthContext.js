"use client"; // Required for React hooks in Next.js App Router

import { createContext, useState, useContext, useEffect } from "react";

// Create context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser).email); // ✅ Extract only email
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Remove corrupted data
    }
  }, []);

  // Login function (only saving email & token)
  const login = (userData, token) => {
    setUser(userData.email); // ✅ Only storing the email in state
    localStorage.setItem("user", JSON.stringify({ email: userData.email })); // ✅ Store only email in localStorage
    localStorage.setItem("userToken", token); // ✅ Store token separately
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
