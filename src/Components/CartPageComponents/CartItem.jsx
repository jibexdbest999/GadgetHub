import React, { useContext} from 'react'
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiMiniMinus } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { CartContext } from "../../Context/ShoppingCartContext"
import PropTypes from "prop-types"

export default function CartItem({id, image, name,description,quantity,price,isInStock}) {
      const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
    
  return (
    <div className="p-4 border border-[#E8E6E6]">

       <div>

         <div className="flex justify-between ">

           <div className="flex items-center gap-2">
             <div className="w-[78px] h-[97px] rounded-sm">
                <img loading="lazy" className="object-contain" src={image} alt={name} />
            </div>
            <div>
                <h1 className="text-[16px] font-medium">{name}</h1>
                <p className="text-[#5F6C72] text-[14px] font-normal">{description}</p>
                { isInStock && <p className="text-[#009320] font-normal">{isInStock}</p>}
            </div>
           </div>

        <div>
            <h1 className="text-[22px]">₦{(price * quantity).toLocaleString()}</h1>
        </div>
        </div>


       </div>

       <div className="flex justify-between items-center">
        <button onClick={()=> removeFromCart(id)} className="text-[#950101] text-[16px] flex items-center gap-2"><span><RiDeleteBin7Line size={24} /></span> Remove Item</button>

        <div className="flex items-center justify-between gap-2">
            <button onClick={() => decreaseQuantity(id)} className="bg-[#F4F4F3] flex items-center justify-center text-dark h-[34px] w-[42px]"><HiMiniMinus  /></button>
            <span className="text-[20px]">{quantity}</span>
            <button onClick={() => increaseQuantity(id)}  className="bg-[#6C4CF1] flex items-center justify-center text-white h-[34px] w-[42px]"><LuPlus size={14} /></button>
        </div>
       </div>
    </div>
  )
}

CartItem.propTypes = {
    id : PropTypes.number.isRequired,
    image : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    isInStock : PropTypes.bool.isRequired,
    price : PropTypes.number.isRequired,
    quantity : PropTypes.number.isRequired,
}
