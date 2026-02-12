import React, { useState, useEffect, useContext } from "react"
import { GrShareOption } from "react-icons/gr"
import { CiHeart } from "react-icons/ci"
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2"
import Button from "../../Components/Button"
import Tabs from "../ProductDetailsPageComponents/ProductTabs"
import { FaHeart } from "react-icons/fa"; 
import {LikeContext} from "../../Context/LikeContext"
import { toast } from "react-toastify"
import { CartContext } from "../../Context/ShoppingCartContext"
import { useNavigate } from "react-router"

export default function ProductsProperties({product}) {
   const { addToLikes, removeFromLikes, isLiked } = useContext(LikeContext)
   const { addToCart } = useContext(CartContext)
   const navigate = useNavigate()
  if (!product) return null;
    const {
      id,
      price,
      description,
      image,
      imageGallery = [],
      name,
      brand,
      reviews,
      rating,
      isInStock,
      writeUp,
      displayPrice,
      color,
      colorOptions = [],
      storage,
      storageOptions = [],
    } = product;
  const [selectedImage, setSelectedImage] = useState(image)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
  setSelectedImage(product.image);

  if (colorOptions.length > 0) {
    const defaultColor =
      colorOptions.find(c => c.name === color) || colorOptions[0];
    setSelectedColor(defaultColor);
  } else {
    setSelectedColor(null);
  }

  if (storageOptions.length > 0) {
    setSelectedStorage(storage || storageOptions[0]);
  } else {
    setSelectedStorage("");
  }
}, [product]);


  const toggleLike = () => {
    if (isLiked(id)) {
      removeFromLikes(id);
    } else {
      addToLikes({ id, image, name, price, description });
    }
  };

  const handleShare = () => {
  const shareData = {
    title: name,
    text: `Check out this product: ${name} by ${brand}.`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log("Product shared successfully"))
      .catch((error) => console.error("Error sharing", error));
  } else {
    navigator.clipboard.writeText(shareData.url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((error) => console.error("Clipboard error", error));
  }
  };

   const handleBuyNow = () => {
    const cartItem = {
      id,
      name,
      price: Number(price),
      image,
      description,
      quantity,
      color: selectedColor?.name || null,
      storage: selectedStorage || null,
    };

    addToCart(cartItem);                      
    navigate("/cartpage");                       
  };

  const handleAddToCart = () => {
    const cartItem = {
      id,
      name,
      price: Number(price),
      image,
      description,
      quantity,
      color: selectedColor?.name || null,
      storage: selectedStorage || null,
    };

    addToCart(cartItem);
  };




  return (
    <section className="w-full py-6 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:h-[713px]">

          <div className="relative w-full lg:w-[520px] lg:h-[573px] bg-white rounded-lg">
            <img
            loading="lazy"
              src={selectedImage}
              alt={name}
              className="w-full lg:w-[520px] h-auto rounded-md border border-[#E8E6E6] object-contain"
            />

            <button onClick={handleShare} className="absolute top-3 right-14 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow">
              <GrShareOption size={18} />
            </button>

            <button onClick={toggleLike} className="absolute top-3 right-3 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow">
               { isLiked(id) ? (
                       <FaHeart size={23} className="text-red-500" />
                     ) : (
                       <CiHeart size={25} />
                     )}
            </button>
          </div>

          <div className="flex justify-between gap-2 items-center my-4 lg:gap-3">
            {[...imageGallery].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="w-[120px] h-28 rounded-md"
              >
                <img
                loading="lazy"
                  src={img}
                  alt=""
                  className={`object-cover rounded-md
                    ${
                      selectedImage === img
                        ? "border border-[#6C4CF1]"
                        : "border border-[#E8E6E6]"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-[713px] justify-between">
         <div className="flex flex-col justify-between h-[520px]">
             <p className="text-sm text-gray-400">{brand}</p>

          <h1 className="text-[32px] font-semibold">{name}</h1>

          <div className="flex items-center gap-2 text-[14px]">
            <span>{rating}</span>
            <span className="text-gray-400">({reviews} Reviews)</span>
            {isInStock && (
              <span className="flex items-center gap-1 text-[#009320]">
                <span className="h-2 w-2 rounded-full bg-[#009320]" />
                In Stock
              </span>
            )}
          </div>

          <p className="text-[18px] lg:text-[21px] text-gray-300">
            {writeUp}
          </p>

          <p className="text-[28px] font-semibold">{displayPrice}</p>

          {colorOptions.length > 0 && selectedColor && (<div><p className="text-sm mb-2">Color: <span className="font-medium">{selectedColor.name}</span></p>
          <div className="flex gap-3">
      {colorOptions.map((clr, index) => (
        <button
          key={index}
          onClick={() => setSelectedColor(clr)}
          className={`h-8 w-8 rounded-full border transition ${
            selectedColor.name === clr.name
              ? "border-[#6C4CF1]"
              : "border-[#E8E6E6]"
          }`}
          style={{ backgroundColor: clr.colorCode }}
          title={clr.name}
        />
      ))}</div>
      </div>)}

          {storageOptions.length > 0 && (
  <div>
    <p className="text-sm mb-2">Storage</p>

    <div className="flex gap-3 flex-wrap">
      {storageOptions.map(size => (
        <button
          key={size}
          onClick={() => setSelectedStorage(size)}
          className={`px-4 py-2 h-[35px] w-[70px] border rounded-md text-sm ${
            selectedStorage === size
              ? "border-[#6C4CF1] text-[#6C4CF1] bg-[#F4F1FF]"
              : "border-gray-500 text-gray-300"
          }`}
        >
          {size}
        </button>))}
        </div>
        </div>)}

          <div>
            <p className="text-sm mb-2">Quantity</p>
            <div className="flex items-center border border-[#E8E6E6] w-[145px] h-[39px] rounded-md">
              <button
                onClick={() => {if (quantity > 1) {
                setQuantity(quantity - 1);
                toast.info(`Quantity decreased to ${quantity - 1}`);
                } else {
                toast.warn("Minimum quantity is 1");}}}
                className="w-10 border-r border-[#E8E6E6] h-[39px] flex items-center justify-center"
              >
                <HiMiniMinus />
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                onClick={() => {setQuantity(quantity + 1)
                toast.success(`Quantity increased to ${quantity + 1}`);
                }}
                className="w-10 h-[39px] border-l border-[#E8E6E6] flex items-center justify-center"
              >
                <HiMiniPlus />
              </button>
            </div>
          </div>
         </div>


          <div className="space-y-3 pt-4">
            <Button
              onClick={handleBuyNow}
              content="Buy Now"
              className="w-full text-white rounded-md h-12"
            />
            <Button
              onClick={handleAddToCart}
              content="Add to Cart"
              className="w-full border border-[#6C4CF1] bg-white text-[#6C4CF1] hover:text-white rounded-md h-12"
            />
          </div>

        </div>

      </div>

      <Tabs product={product} />


    </section>
  )
}
