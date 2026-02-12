import React, { useContext } from 'react'
import PropTypes from "prop-types"
import { CiHeart } from "react-icons/ci";
import Button from "../Components/Button";
import {CartContext} from "../Context/ShoppingCartContext"
import {LikeContext} from "../Context/LikeContext"
import { FaHeart } from "react-icons/fa"; 
import { Link } from "react-router"

export default function ProductCard({id,image,name,description,rating,reviews,price,isNew,displayPrice}) {
  const { addToCart } = useContext(CartContext)
  const { addToLikes, removeFromLikes, isLiked } = useContext(LikeContext)
  const toggleLike = () => {
    if (isLiked(id)) {
      removeFromLikes(id);
    } else {
      addToLikes({ id,image,name,description,rating,reviews,price,isNew,displayPrice});
    }
  };
  function saveRecentlyViewed(product) {
  let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  viewed = viewed.filter(p => p.id !== product.id);
  viewed.unshift(product);

  if (viewed.length > 10) viewed = viewed.slice(0, 10);

  localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
}

  return (
    <div>
    <div className="relative w-full lg:w-[295px] border border-[#E8E6E6] rounded-md">
        {isNew ? <span className="bg-[#EE2020] absolute top-3 left-3 rounded-xl flex items-center justify-center w-[50px] h-[23px] text-white text-[12px]">New</span> : <span></span>}
        <button onClick={toggleLike} className="absolute top-3 right-3 rounded-full bg-white flex items-center justify-center h-7 w-7">
          { isLiked(id) ? (
          <FaHeart size={23} className="text-red-500" />
        ) : (
          <CiHeart size={25} />
        )}</button>
        <img loading="lazy" className="w-full object-cover rounded-t-md h-[274px]" src={image} alt="" />

    <div className="w-full p-4 border-t border-t-[#E8E6E6]">
          <Link to={`/product/${id}`} className="flex flex-col gap-2"
          onClick={() => saveRecentlyViewed({id,image,name,description,rating,reviews,price,isNew,displayPrice})}
          >
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

ProductCard.propTypes = {
    id : PropTypes.number.isRequired,
    image : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    rating : PropTypes.number.isRequired,
    reviews : PropTypes.number.isRequired,
    price : PropTypes.string.isRequired,
    isNew : PropTypes.bool.isRequired,
    displayPrice : PropTypes.string.isRequired
}
