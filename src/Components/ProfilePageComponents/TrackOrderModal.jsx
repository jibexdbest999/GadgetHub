import React from "react";
import orderIcon from "../../assets/Icon.png";
import clockIcon from "../../assets/clockVector.png";
import Truck from "../../assets/iconoir_delivery-truck.png"
import Pin from "../../assets/locationPin.png"
import DeliveredClock from "../../assets/icons8_checked.png"
export default function TrackOrderModal({ showTrackModal, setShowTrackModal, order }) {
  if (!showTrackModal) return null;

  const closeModal = () => {
    setShowTrackModal(false);
  };

  const { orderStatus, createdAt, deliveryDate } = order;
  const orderDate = new Date(createdAt).toLocaleString();
  const estimatedDelivery = deliveryDate
    ? new Date(deliveryDate).toDateString()
    : "N/A";

  const statusOrder = ["pending", "processing", "delivered", "cancelled"];
  const currentIndex = statusOrder.indexOf(orderStatus);

  const steps = [
    { key: "Order Placed", description: "Your order has been confirmed", icon: orderIcon, date: orderDate },
    { key: "Processing", description: "Your order is being prepared", icon: clockIcon },
    { key: "Shipped", description: "Your order is on its way", icon: Truck },
    { key: "Out For Delivery", description: "Your order is out for delivery", icon: Pin },
    { key: "Delivered", description: "Your order has been delivered", icon: DeliveredClock },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-md shadow-lg w-[99%] max-w-md relative pb-5">
        <div className="border-b border-b-[#E7E4E4] pb-2 mb-4">
          <h1 className="text-xl font-semibold p-3">Track Order</h1>
          <button
            className="absolute top-3 right-5 text-gray-600 hover:text-black"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="p-4 border border-[#C4C1C1] bg-[#F4F4F4] m-4 rounded-md">
          <p className="text-sm text-gray-500 pb-1">Estimated Delivery</p>
          <span className="font-medium">{estimatedDelivery}</span>
        </div>

        <div className="px-4">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;

            const circleClasses = isCompleted
              ? "flex rounded-full w-8 h-8 bg-[#6C4CF1] items-center justify-center relative"
              : "flex rounded-full w-8 h-8 border border-[#A8A8A8] items-center justify-center relative";

            const lineClasses = isCompleted
              ? "h-16 w-[0.9px] bg-[#6C4CF1] absolute top-7"
              : "h-16 w-[0.9px] bg-[#A8A8A8] absolute top-7";

            return (
              <div key={step.key} className={`flex gap-4 ${index !== 0 ? "pt-5" : ""}`}>
                <div className={circleClasses}>
                    <img loading="lazy" className="w-4 h-4 object-contain" src={step.icon} alt="" />
                    {index !== steps.length - 1 && (
                        <span className={`${isCompleted ? "bg-[#6C4CF1] h-15" : "bg-[#A8A8A8]"} 
                  absolute left-1/2 top-full w-[2px] h-10 transform -translate-x-1/2`}></span>)}
                  </div>
                <div>
                  <p className="text-[18px] font-semibold">{step.key}</p>
                  <p className="text-[16px] text-[#5F6C72]">{step.description}</p>
                  {step.date && (
                    <p className="text-[14px] text-[#949596]">{step.date}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}