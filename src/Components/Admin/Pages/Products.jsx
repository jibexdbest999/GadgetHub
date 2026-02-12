import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { AdminContext } from "../../../Context/AdminContext";
import { useNavigate, Link } from "react-router";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

import Input from "../../Input";
import ProductsTable from "../components/ProductsComponents/ProductsTable";
import AddProductModal from "../components/ProductsComponents/AddProductModal";
import DeleteModal from "../components/ProductsComponents/DeleteModal";
import LogoutModal from "../../LogoutModal";

export default function Products() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { products, fetchProducts, searchProducts, deleteProduct } = useContext(AdminContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchQuery, setSearchQuery] = useState({
    q: "",
    brand: "",
    category: "",
  });

  const addProduct = () => setShowModal(true);
  const handleCancelDelete = () => {
    setSelectedProduct(null);
    setShowDelete(false);
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    const updatedQuery = { ...searchQuery, [name]: value };
    setSearchQuery(updatedQuery);

    if (value.trim() || Object.values(updatedQuery).some((v) => v)) {
      searchProducts(updatedQuery);
    } else {
      fetchProducts();
    }
  };

  const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex relative gap-2">
        <div className="flex gap-2 items-center">
          <span className="flex items-center justify-center rounded-full w-[25px] h-[25px] bg-[#F5F7FA]">
            <IoMdNotificationsOutline size={20} />
          </span>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center cursor-pointer h-10 gap-1"
          >
            <img
            loading="lazy"
              className="h-[30px] w-[30px] rounded-full"
              src={
                user?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"
              }
              alt={user?.firstName}
            />
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold">Admin {user?.firstName}</p>
              <p className="text-[14px]">{user?.email}</p>
            </div>
          </div>
        </div>

        <button>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 flex flex-col bg-white rounded-md w-[185px] p-3 z-10 gap-1"
          >
            <Link to="/settings">Account Settings</Link>
            <button
              onClick={() => {
                setShowLogoutModal(true);
                setIsOpen(false);
              }}
              className="text-[#E60E0E] text-left"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#FFFFFF] w-full h-screen">
      {showModal && <AddProductModal showModal={showModal} setShowModal={setShowModal} />}
      {showDelete && selectedProduct && <DeleteModal product={selectedProduct} onClose={handleCancelDelete} />}

      <div className="flex justify-between items-center py-5 px-5 border-b border-[#E6EFF5]">
        <div className="relative h-11 w-1/2">
          <Input
            name="q"
            value={searchQuery.q}
            onChange={handleSearch}
            placeholder="Search orders, products..."
            className="w-full h-11 pl-10"
          />
          <span className="absolute left-3 top-1/3">
            <CiSearch size={20} />
          </span>
        </div>
        {user && <UserMenu />}
      </div>

      <div className="px-5 py-2 flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-semibold">Products</h1>
          <p className="text-[16px]">Manage your product inventory.</p>
        </div>
        <button
          onClick={addProduct}
          className="text-white flex items-center justify-center gap-2 w-[171px] h-12 bg-[#6C4CF1] hover:bg-white hover:text-[#6C4CF1] hover:border hover:border-[#6C4CF1] rounded-md"
        >
          <GoPlus size={20} />
          Add Product
        </button>
      </div>

      <div className="px-5 py-2">
        <div className="p-5 flex justify-between gap-5 border border-[#E7E4E4] mt-3 rounded-md">
          <div className="relative h-11 w-2/3">
            <Input
              name="q"
              value={searchQuery.q}
              onChange={handleSearch}
              placeholder="Search product name..."
              className="h-11 w-full pl-10"
            />
            <span className="absolute left-3 top-1/3">
              <CiSearch size={20} />
            </span>
          </div>

          <div className="flex items-center relative gap-3">
            <span className="absolute left-3">
              <FiFilter />
            </span>
            <select
              name="category"
              value={searchQuery.category}
              onChange={handleSearch}
              className="border border-[#E8E6E6] h-11 w-[219px] rounded-md text-left pl-8"
            >
              <option value="">All Categories</option>
              <option value="SmartPhones">SmartPhones</option>
              <option value="Laptops">Laptops</option>
              {/* <option value=""></option> */}
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 py-2">
        <div className="border border-[#E7E4E4] mt-3 rounded-md">
          <h1 className="text-[#1D1C1C] text-[20px] font-semibold px-5 pt-2">Products</h1>
          <ProductsTable products={products} onDelete={deleteProduct} />
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout();
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
