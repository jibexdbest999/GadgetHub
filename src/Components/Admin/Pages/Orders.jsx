import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { AdminContext } from "../../../Context/AdminContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router";

import Input from "../../Input";
import LogoutModal from "../../LogoutModal";
import OrdersTable from "../components/OrdersComponents/OrdersTable";

export default function Orders() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { orders, fetchOrders, searchOrders } = useContext(AdminContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState({
    q: "",     
    status: ""  
  });

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleSearch = (e) => {
    const { name, value } = e.target;
    const updatedQuery = { ...searchQuery, [name]: value };
    setSearchQuery(updatedQuery);

    if (Object.values(updatedQuery).some(v => v.trim() !== "")) {
      searchOrders(updatedQuery);
    } else {
      fetchOrders();
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
            className="flex items-center cursor-pointer gap-2"
          >
            <img
            loading="lazy"
              className="h-[30px] w-[30px] rounded-full"
              src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"}
              alt={user?.firstName}
            />
            <div>
              <p className="text-sm font-semibold">Admin {user?.firstName}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        <button>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 bg-white rounded-md w-[185px] p-3 z-10"
          >
            <Link to="/settings">Account Settings</Link>
            <button
              onClick={() => {
                setShowLogoutModal(true);
                setIsOpen(false);
              }}
              className="text-red-600 text-left mt-2"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="flex justify-between items-center py-5 px-5 border-b border-[#E7E4E4]">
        <div className="relative h-11 w-full max-w-md">
          <Input
            name="q"
            value={searchQuery.q}
            onChange={handleSearch}
            placeholder="Search orders…"
            className="h-11 pl-10 w-full"
          />
          <span className="absolute left-3 top-1/3"><CiSearch /></span>
        </div>
        {user && <UserMenu />}
      </div>

      <div className="px-5 py-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-gray-600">
          Manage and track all customer orders.
        </p>
      </div>

      <div className="px-5">
        <div className="p-5 flex gap-5 border border-[#E7E4E4] rounded-md">
          <div className="relative w-2/3">
            <Input
              name="q"
              value={searchQuery.q}
              onChange={handleSearch}
              placeholder="Search order ID or customer…"
              className="h-11 pl-10 w-full"
            />
            <span className="absolute left-3 top-1/3"><CiSearch /></span>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3"><FiFilter /></span>
            <select
              name="status"
              value={searchQuery.status}
              onChange={handleSearch}
              className="border border-[#E7E4E4] h-11 w-[220px] rounded-md pl-8"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        <OrdersTable orders={orders} />
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
