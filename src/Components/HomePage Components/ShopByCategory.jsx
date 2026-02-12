import React from 'react'
import { products } from "../../productData.js"
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router"

export default function ShopByCategory() {
  const navigate = useNavigate()
  const toCategories = (e)=>{
    e.preventDefault();
    navigate("/products")
  }
  const categoryMap = new Map();

  products.forEach((product) => {
    if (product.category && !categoryMap.has(product.category)) {
      categoryMap.set(product.category, product);
    }
  });

  let uniqueCategoryProducts = Array.from(categoryMap.values());

  const categoryOrder = ["Wearables", "Laptops", "SmartPhones", "Accessories", "Gaming","Smart Homes"];
  uniqueCategoryProducts.sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );
  

  return (
    <div className="container mx-auto px-5 py-5 lg:py-20">
      <div className="flex justify-between">
              <div>
        <h1 className="text-[22px] lg:text-[28px] font-bold">Shop By Categories</h1>
        <p className="text-[#5F6C72] text-[16px] lg:text-[18px]">Find exactly what you're looking for</p>
      </div>
      <button onClick={toCategories} className="text-[#6C4CF1] flex gap-1 items-center font-semibold lg:hidden">View All <span><IoIosArrowRoundForward size={30} /></span></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-6 relative hidden lg:flex lg:justify-between">
        {uniqueCategoryProducts.map((product, index) => (
          <div key={index} className="text-center flex flex-col items-center justify-center">
            <img
            loading="lazy"
              src={product.image}
              alt={product.category}
              className="mx-auto bg-[#E3E3E3] rounded-full h-[188px] w-[188px] object-cover"
            />
            <p className="mt-2 font-semibold py-2">{product.category}</p>
            <p className="text-sm text-gray-500">Discover 50+ Products</p>
          </div>
        ))}
        <button onClick={toCategories} className="absolute right-4 top-15 bg-[#6C4CF1] h-12 w-12 rounded-full text-[35px] text-white flex items-center justify-center">
          <IoIosArrowRoundForward />
        </button>
      </div>

      <div className="flex overflow-x-auto gap-6 lg:hidden py-4 snap-x snap-mandatory scrollbar-hide">
        {uniqueCategoryProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 text-center flex flex-col items-center justify-center py-2 snap-start">
            <img
            loading="lazy"
              src={product.image}
              alt={product.category}
              className="mx-auto bg-[#E3E3E3] rounded-full 
                         h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] 
                         object-cover"
            />
            <p className="mt-2 font-semibold py-2 text-[12px] sm:text-[14px] md:text-[15px]">
              {product.category}
            </p>
            <p className="text-gray-500 text-[10px] sm:text-[12px] md:text-[13px]">
              Discover 50+ Products
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}