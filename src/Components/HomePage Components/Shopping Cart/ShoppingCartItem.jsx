import React, { useContext } from 'react'
import { CartContext } from "../../../Context/ShoppingCartContext"
import { HiMiniMinus } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function ShoppingCartItem({id,image,name,description,quantity,price}) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  return (
    <div className="flex items-center gap-4">
      <img loading="lazy" className="w-[78px] h-[97px] object-contain" src={image} alt="" />
      <div className="w-full ">
        <div className="flex justify-between items-center relative">
        <div>
        <h1 className="text-[16px]">{name}</h1>
        <p className="text-[#5F6C72] text-[14px] py-1">{description}</p>
        </div>
        <button className="text-[24px] text-[#950101] absolute top-0 right-0" onClick={()=> removeFromCart(id)}><RiDeleteBin7Line /></button>
        </div>

        <div className="flex justify-between">
          <p className="text-[#5F6C72]">{quantity} X <span className="text-[#8F3B03]">{price}</span></p>
          <div className="flex gap-3 items-center justify-between">
            <button onClick={() => decreaseQuantity(id)}
            className="bg-[#F4F4F3] flex items-center justify-center rounded-md w-[26px] h-5"><HiMiniMinus /></button>
            <span>{quantity}</span>
            <button onClick={() => increaseQuantity(id)}
            className="bg-[#6C4CF1] text-white flex items-center justify-center rounded-md w-[26px] h-5"><LuPlus size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
