import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const apiProducts = axios.create({
    baseURL: "https://gadgethub-server-giwj.onrender.com/api/products",
    headers: { Authorization: `Bearer ${token}` },
  });

  const apiOrders = axios.create({
    baseURL: "https://gadgethub-server-giwj.onrender.com/api/orders",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiProducts.get("/");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

const searchProducts = async ({ q, brand, category }) => {
  setLoading(true);
  try {
    const params = {};
    if (q) params.q = q;
    if (brand) params.brand = brand;
    if (category) params.category = category;

    const res = await apiProducts.get("/search", { params });
    setProducts(res.data.products);
  } catch (err) {
    console.error("Error searching products:", err);
  } finally {
    setLoading(false);
  }
};


  const addProduct = async (formData) => {
    try {
      const res = await apiProducts.post("/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) => [...prev, res.data.product]);
      return res.data.product;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiProducts.delete(`/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const editProduct = async (id, updatedData) => {
    try {
      const res = await apiProducts.put(`/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data.product : p))
      );
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await apiOrders.get("/admin/all");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

const searchOrders = async ({ q, status, paymentStatus }) => {
  setLoading(true);
  try {
    const params = {};
    if (q) params.q = q;
    if (status) params.status = status;
    if (paymentStatus) params.paymentStatus = paymentStatus;

    const res = await apiOrders.get("/search", { params });
    setOrders(res.data.orders);
  } catch (err) {
    console.error("Error searching orders:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);


  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        loading,
        fetchProducts,
        fetchOrders,
        searchProducts,
        searchOrders,
        addProduct,
        deleteProduct,
        editProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
