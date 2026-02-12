import React, {useContext} from 'react'
import {CartContext } from "../../Context/ShoppingCartContext"
import OrderItems from "./OrderItems"

export default function OrderSummary({onConfirm, paymentMethod, deliveryMethod}) {
    const {cart, totalPrice, getCartCount} = useContext(CartContext)
    let deliveryCost = deliveryMethod === "doorstep" ? 3000 : 0
    let subTotal = totalPrice
  return (
    <div className="border border-[#E8E6E6] p-3 rounded-md">
          <h1 className="text-[20px] font-semibold"> Order Summary ({getCartCount()})</h1>
        {cart.map((item)=>{
                return <OrderItems key={item.id} {...item} />
               })}


                <div className="border-b-[#E8E6E6] py-3 flex flex-col justify-between">
            <div className="flex justify-between">
                <p className="text-[#5F6C72] text-[18px]">Subtotal</p>
                <p className="text-[18px]">₦{subTotal}</p>
            </div>

             <div className="flex justify-between py-2">
                <p className="text-[#5F6C72] text-[18px]">Delivery Cost</p>
                <p className="text-[18px]">₦{deliveryCost}</p>
            </div>
        </div>

         <div className="flex justify-between">
         <p className="text-[18px] text-[#5F6C72]">Total</p>
         <p className="text-[22px]">₦{subTotal + deliveryCost}</p>
         </div>


         <button onClick={onConfirm} className="w-full h-12 rounded-md text-white bg-[#6C4CF1] hover:bg-[#F4F1FF] hover:text-[#6C4CF1] flex items-center justify-center my-5">
            Confirm Order
         </button>

         <p className="text-[16px] text-[#5F6C72] text-center">(Complete the steps in order to proceed)</p>
    </div>
  )
}
