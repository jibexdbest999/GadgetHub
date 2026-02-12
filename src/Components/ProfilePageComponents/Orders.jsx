import React, { useState, useEffect, useContext } from 'react'
import OrdersCard from "../ProfilePageComponents/OrdersCard"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios";
import { toast } from "react-toastify"
import { useParams } from "react-router"
import { products } from "../../productData.js"

export default function Orders() {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ activeTab, setActiveTab ] = useState("active")
 useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://gadgethub-server.onrender.com/api/orders/myOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

const handleCancel = async (id) => {
  try {
    await axios.patch(
      `https://gadgethub-server.onrender.com/api/orders/${id}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, orderStatus: "cancelled" } : o
      )
    );
    toast.error("Order cancelled")

  } catch (err) {
    console.error("Failed to cancel order:", err);
  }
};

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "active") return o.orderStatus === "pending" || o.orderStatus === "processing";
    if (activeTab === "completed") return o.orderStatus === "delivered";
    if (activeTab === "cancelled") return o.orderStatus === "cancelled";
    return true;
  });
    const { id } = useParams()
    const productId = Number(id);
    const product = products.find((p) => Number(p.id) === productId);

  return (
    <div>
        <h1 className="text-[24px] font-semibold">My Orders</h1>
        <div className="flex border-b border-b-[#EEEAEA] w-full pt-5">
            <button onClick={()=> setActiveTab("active")} className={`text-[18px] font-semibold flex gap-2 w-1/3 h-[46px] items-center justify-center hover:cursor-pointer ${activeTab === "active" ? "border-b-[#6C4CF1] border-b-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>Active ({orders.filter(o => o.orderStatus === "pending" || o.orderStatus === "processing").length})</button>

            <button onClick={()=> setActiveTab("completed")} className={`text-[18px] font-semibold flex gap-2 w-1/3 h-[46px] items-center justify-center hover:cursor-pointer ${activeTab === "completed" ? "border-b-[#6C4CF1] border-b-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>Completed ({orders.filter(o => o.orderStatus === "delivered").length}) </button>

             <button onClick={()=> setActiveTab("cancelled")} className={`text-[18px] font-semibold flex gap-2 w-1/3 h-[46px] items-center justify-center hover:cursor-pointer ${activeTab === "cancelled" ? "border-b-[#6C4CF1] border-b-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>Cancelled ({orders.filter(o => o.orderStatus === "cancelled").length})</button>
        </div>
       <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrdersCard key={order._id} order={order} onCancel={handleCancel}  setActiveTab={setActiveTab} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No orders found.</p>
        )}
      </div>
    </div>
  )
}
