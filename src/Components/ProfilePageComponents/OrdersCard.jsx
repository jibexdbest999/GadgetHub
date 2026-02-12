import React, { useState } from 'react'
import Button from "../Button"
import TrackOrderModal from "./TrackOrderModal"
import { useNavigate } from "react-router"


export default function OrdersCard({ order, onCancel, setActiveTab }) {
  const { _id, items, orderNumber, totalAmount, orderStatus, createdAt, deliveryDate } = order;
  const [showTrackModal, setShowTrackModal] = useState(false);
  const navigate = useNavigate();
  const product = items[0];
  const orderDate = new Date(createdAt).toDateString();
  const estimatedDelivery = deliveryDate ? new Date(deliveryDate).toDateString() : "N/A";

  const statusColors = {
    shipped: "bg-[#F3F0FF] text-[#6C4CF1]",
    processing: "bg-[#E4F2FF] text-[#056EC8]",
    delivered: "bg-[#E8FFED] text-[#009320]",
    cancelled: "bg-[#FFEDED] text-[#EE2020]",
    pending: "bg-[#E4F2FF] text-[#056EC8]",
  };

  const handlePrimaryAction = () => {
    if (orderStatus === "delivered") {
      setActiveTab("completed");
      navigate("/checkout", { state: { product } });
    } else if (["pending", "processing"].includes(orderStatus)) {
      setShowTrackModal(true);
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#E8E6E6] p-6 sm:p-4 w-full relative">
      <span className={`w-[82px] h-[40px] text-[16px] rounded-xl flex items-center justify-center absolute right-[20px] ${statusColors[orderStatus]}`}>
        {orderStatus}
      </span>

       <div className="flex-col lg:flex lg:flex-row gap-4">
        <img
        loading="lazy"
          className="w-[78px] h-[97px] object-cover rounded-md"
          src={product.image}
          alt={product.name}
        />
        <div className="flex-1 lg:space-y-1 relative py-2 lg:p-0">
          <h1 className="font-semibold text-[16px] text-[#191C1F]">{product.name}</h1>
          <p className="text-[14px] text-[#A2A3A3]">{product.description}</p>
          <p className="text-[14px] text-[#848182]">
            Order <span className="font-medium">{orderNumber}</span>
          </p>
          <p className="text-[16px] text-[#535051]">Placed on {orderDate}</p>
          <p className="text-sm text-green-600 font-medium">
            Est Delivery: {estimatedDelivery}
          </p>
          <div className="flex gap-5 pt-2 lg:p-0 lg:absolute bottom-[30px] left-[300px] whitespace-nowrap">
            <p>Qty: {product.quantity}</p>
            <p className="text-[16px] font-semibold">₦{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>


      <div className="flex flex-col lg:flex lg:flex-row gap-4 pt-5">
        {orderStatus !== "cancelled" && (
          <Button
            onClick={handlePrimaryAction}
            className="h-[48px] w-[133px] text-white"
            content={orderStatus === "delivered" ? "Buy Again" : "Track Order"}
          />
        )}

        <button  className="text-[#6C4CF1] border border-[#6C4CF1] w-[129px] h-[48px] rounded-md">
          View Details
        </button>

        {["pending", "processing"].includes(orderStatus) && (
          <button
            onClick={() => onCancel(_id)}
            className="text-[#EE2020] w-[143px] h-[48px]"
          >
            Cancel Order
          </button>
        )}
      </div>

      {showTrackModal && (
        <TrackOrderModal
          showTrackModal={showTrackModal}
          setShowTrackModal={setShowTrackModal}
          order={order}
          onClose={() => setShowTrackModal(false)}
        />
      )}
    </div>
  );
}