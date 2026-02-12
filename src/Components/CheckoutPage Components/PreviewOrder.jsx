import React from 'react'

export default function PreviewOrder({ orderData, cart, onBack, onConfirm }) {
  return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] lg:w-[600px] p-6 rounded-md max-h-[90vh] overflow-y-auto">

        <h1 className="text-2xl font-semibold mb-4">Review Your Order</h1>

        <section className="mb-4 text-dark">
          <h2 className="font-semibold">Customer Details</h2>
          <label className="text-[14px]" htmlFor="">Full Name</label>
          <p className="block w-full my-2 px-3 py-2  border border-[#E8E6E6] rounded-md">{orderData.customer.fullName}</p>
          <label className="text-[14px]" htmlFor="">Email Address</label>
          <p className="block w-full my-2 px-3 py-2 border border-[#E8E6E6] rounded-md">{orderData.customer.email}</p>
          <label className="text-[14px]" htmlFor="">Phone Number</label>
          <p className="block w-full my-2 px-3 py-2  border border-[#E8E6E6] rounded-md">{orderData.customer.phone}</p>
          <label className="text-[14px]" htmlFor="">Address</label>
          <p className="block w-full my-2 px-3 py-2  border border-[#E8E6E6] rounded-md" >{orderData.customer.address}</p>
          <label className="text-[14px]" htmlFor="">State and City</label>
          <p className="block w-full my-2 px-3 py-2  border border-[#E8E6E6] rounded-md"> {orderData.customer.state}, {orderData.customer.city}</p>
        </section>


        <section className="mb-4 text-dark">
          <h2 className="font-semibold">Delivery Method</h2>
          <p className="block w-full my-2 px-3 py-2 border border-[#E8E6E6] rounded-md">{orderData.deliveryMethod}</p>
        </section>


        <section className="mb-4 text-dark">
          <h2 className="font-semibold">Payment Method</h2>
          <p className="block w-full my-2 px-3 py-2 border border-[#E8E6E6] rounded-md">{orderData.paymentMethod}</p>
        </section>

        <section className="mb-4">
          <h2 className="font-semibold">Items</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-lg">
              <span>{item.name} × {item.quantity}</span>
              <span>₦{item.price * item.quantity}</span>
            </div>
          ))}
        </section>

        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-[#6C4CF1] text-[#6C4CF1] hover:bg-[#6C4CF1] hover:text-white bg-white rounded-md"
          >
            Edit Order
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#6C4CF1] text-white rounded-md"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  )
}
