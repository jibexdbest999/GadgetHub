import React, { useContext } from 'react'
import AppLayout from "../Layouts/AppLayout"
import CartItem from "../Components/CartPageComponents/CartItem"
import { CartContext } from "../Context/ShoppingCartContext"
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router"
import OrderSummary from "../Components/CartPageComponents/OrderSummary"
import RecentlyViewed from "../Components/CartPageComponents/RecentlyViewed"

export default function CartPage() {
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleContinueShopping = (e)=>{
    e.preventDefault();
    navigate("/products")
  }
  return (
    <AppLayout>
       { cart.length === 0 ? 
       <div className="h-[400px] flex items-center justify-center">
       <div className="flex flex-col items-center justify-center text-center mx-auto h-[282px]">
       <h1><span className="bg-[#F4F1FF] text-dark rounded-full h-[99px] w-[99px] flex items-center justify-center"><IoCartOutline size={50} /></span></h1>
       <h1 className="text-[28px] font-semibold"> Your Cart Is Empty!</h1>
       <p className="text-[#5F6C72] text-[18px] font-normal">Browse all categories and discover our new arrivals</p>
       <button onClick={handleContinueShopping} className="bg-[#6C4CF1] rounded-md text-white h-[48px] w-[182px] my-2">Start Shopping</button>
       </div>
       </div> : <>
       <div className="cartFrame">
        <h1>Shopping Cart</h1>
      </div>
      <div className="flex flex-col lg:flex lg:flex-row justify-between gap-5 px-5 py-5">
      <div className="w-full lg:w-2/3">
         {cart.map((item) => (
        <CartItem key={item.id} {...item}/>
       ))}
      </div>
      <div className="w-full lg:w-1/3">
         <OrderSummary />
      </div>
      </div>
      </> }

     <RecentlyViewed />
    </AppLayout>
  )
}
