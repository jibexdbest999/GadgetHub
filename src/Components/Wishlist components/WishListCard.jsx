import React, { useContext } from 'react'
import PropTypes from "prop-types"
import Button from "../Button";
import {CartContext} from "../../Context/ShoppingCartContext"
import {LikeContext} from "../../Context/LikeContext"
import { Link } from "react-router"
import { GoTrash } from "react-icons/go";

export default function WishListCard({id,image,name,description,rating,reviews,price,displayPrice}) {
  const { addToCart } = useContext(CartContext)
  const { removeFromLikes } = useContext(LikeContext)
  
  const deleteFromWishList= (e)=>{
    e.preventDefault()
    removeFromLikes(id)
  }

  return (
    <div>
    <div className="relative w-full lg:w-[295px] border border-[#E8E6E6] rounded-md">
        <button onClick={deleteFromWishList} className="bg-[#FFF1F1] absolute top-3 right-3 rounded-full flex items-center justify-center text-[#EE2020] w-8 h-8" ><GoTrash size=
        {20} /></button>
        
        <img loading="lazy" className="w-full object-cover rounded-t-md h-[274px]" src={image} alt="" />

    <div className="w-full p-4 border-t border-t-[#E8E6E6]">
          <Link to={`/product/${id}`} className="flex flex-col gap-2">
            <p className="text-[16px]">{name}</p>
            <p className="text-[#5F6C72] text-[14px]">{description}</p>
            <div className="flex gap-2 items-center text-[#5F6C72]">
                <p>{rating ? <span>{rating}</span> : <span>0</span>}</p>
                <p>({reviews  ? <span>{reviews}</span> : <span>0</span>})</p>
            </div>
            <p className="text-[18px]">{displayPrice}</p>
        </Link>
          <Button onClick={()=> addToCart({id,image,name,price,description})} className=" w-full h-12 text-[16px] mt-2 rounded-md text-white font-semibold" content="Add To Cart" />
    </div>
    </div>
    </div>
  )
}

WishListCard.propTypes = {
    id : PropTypes.number.isRequired,
    image : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    rating : PropTypes.number.isRequired,
    reviews : PropTypes.number.isRequired,
    price : PropTypes.string.isRequired,
    displayPrice : PropTypes.string.isRequired
}
