"use client"; // Required for React hooks in Next.js App Router

import { createContext, useState, useContext, useEffect, useMemo } from "react";

// Create context
const ProductContext = createContext(null);

// Product Provider component
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    try {
      if (storedProducts) {
        setAllProducts(JSON.parse(storedProducts)); // ✅ Load full product details
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
      localStorage.removeItem("products"); // Remove corrupted data
    }
  }, []);

  // Set products function
  const setProducts = (products) => {
    setAllProducts(products);
    localStorage.setItem("products", JSON.stringify(products)); // ✅ Store products in localStorage
  };

  // Memoize context value for better performance
  const productContextValue = useMemo(
    () => ({ allProducts, setProducts }),
    [allProducts]
  );

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for consuming ProductContext
export const useProduct = () => useContext(ProductContext);
