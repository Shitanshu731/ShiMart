"use client"; // Required for React hooks in Next.js App Router

import { createContext, useState, useContext, useEffect, useMemo } from "react";

// Create context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser)); // ✅ Load full user details
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Remove corrupted data
    }
  }, []);

  // Login function (only saving necessary details)
  const login = (userData) => {
    setLoggedInUser(userData.user); // ✅ Store full user data
    localStorage.setItem("user", JSON.stringify(userData.user)); // ✅ Store full user object
    sessionStorage.setItem("userToken", userData.token); // ✅ Store token in session storage
  };

  // Logout function
  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("userToken"); // ✅ Remove token on logout
  };

  // Memoize context value for better performance
  const authContextValue = useMemo(
    () => ({ loggedInUser, login, logout }),
    [loggedInUser]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
