import React from 'react'
import AppLayout from "../Layouts/AppLayout"
import ServiceAds from "../Components/HomePage Components/ServiceAd"
import { FaGreaterThan } from "react-icons/fa";
import { products } from "../productData.js"
import ProductsProperties from "../Components/ProductDetailsPageComponents/ProductsProperties"
import { useParams } from "react-router"
import MayLike from "../Components/ProductDetailsPageComponents/MayLike"
import { Link } from "react-router"

export default function ProductDetailsPage() {
    const { id } = useParams()
    const productId = Number(id);
    const product = products.find((p) => Number(p.id) === productId);

  return (
   <AppLayout>
     <div className="py-2 px-5 container mx-auto">
                 <h1 className="flex items-center gap-1 py-2 text-[16px] text-[#5F6C72]">
                  <Link to="/">Home</Link>
                    <span className="text-[12px] text-[#434545]"><FaGreaterThan /></span>
                    <Link to="/products"><span className="text-[#5F6C72]">All Categories</span></Link>
                    <span className="text-[12px] text-[#434545]"><FaGreaterThan /></span>
                    <span className="text-[#191C1F]">{product ? product.name : "Product not found"}</span>
                 </h1>
    <div>
       {product ? (
    <ProductsProperties product={product} />
        ) : (
    <div className="py-8">
      <p className="text-center text-gray-600">Product not found.</p>
    </div>
     )}
    </div> 
    </div>
    <MayLike />
    <ServiceAds />
   </AppLayout>
  )
}
