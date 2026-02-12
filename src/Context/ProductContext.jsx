import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: "https://gadgethub-server.onrender.com/api/products",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query) => {
    try {
      if (!query) {
        fetchProducts();
        return;
      }
      const res = await api.get(`/search?q=${query}`);
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchProducts,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};