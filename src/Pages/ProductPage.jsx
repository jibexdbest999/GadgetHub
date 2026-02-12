import React, { useState } from 'react'
import AppLayout from "../Layouts/AppLayout"
import ProductCard from "../Components/ProductCard"
import { FaGreaterThan } from "react-icons/fa";
import { products } from "../productData.js"
import FilterSideBar from "../Components/ProductPage Components/FilterSideBar"
import vector from "../assets/doublearrowright.png"
import ServiceAd from "../Components/HomePage Components/ServiceAd"
import { useSearchParams, Link } from "react-router";


export default function ProductPage() {

    const [activeFilters, setActiveFilters] = useState({
        category: null,
        price: null,
        brands: [],
        rating: null,
        availability: null,});

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

   const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name?.toLowerCase().includes(query);
      const matchesBrand = product.brand?.toLowerCase().includes(query);
      const matchesCategory = product.category?.toLowerCase().includes(query);
      if (!matchesName && !matchesBrand && !matchesCategory) return false;
    }

    if (activeFilters.category && product.category !== activeFilters.category)
      return false;

    if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand))
      return false;

    if (activeFilters.price) {
      const { min, max } = activeFilters.price;
      if ((min !== null && product.price < min) || (max !== null && product.price > max))
        return false;
    }

    if (activeFilters.rating) {
      const rating = product.rating;
      if (activeFilters.rating === 4.5 && rating < 4.5) return false;
      if (activeFilters.rating === 4 && rating < 4) return false;
      if (activeFilters.rating === 3.5 && rating > 3.5) return false;
      }

    if (activeFilters.availability === "inStock" && !product.isInStock)
      return false;

    return true;
  });


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  return (
   <AppLayout>
    <div className="px-5 py-1 lg:py-4 mx-auto container">
         <div className="hidden lg:flex items-center gap-1">
          <h1 className="flex items-center gap-1 text-[16px] text-[#5F6C72]">
          <Link to="/">Home</Link>  
         </h1>
         <span className="text-[12px] text-[#434545]"><FaGreaterThan /></span>
         <span className="font-semibold">All Categories</span> 
         </div>
        <div className="flex justify-between items-center">
            <div className="py-2">
                {searchQuery ? (<h1 className="text-[24px] font-semibold">Search results for “{searchQuery}”</h1>) : (<><h1 className="text-[24px] font-semibold">All Categories</h1><p className="text-[15px]">Showing 1 - 15 of 2000 photos</p></>)}
            </div>
            <div className="flex items-center lg:gap-3">Sort by <select className="border border-[#E8E6E6] h-[49px] w-[100px] rounded-md text-center font-semibold"><option value="">Newest</option></select></div>
        </div>

        <div className="grid lg:flex lg:justify-between py-4 w-full">
           <FilterSideBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
           
           <div className="flex flex-col items-center py-4 lg:py-0">
             <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {currentProducts.map((product)=>{
                return <ProductCard key={product.id} {...product} />
            })}

            </div>
            
             <div className="pagination flex gap-2 mt-10 items-center">
              {/* <button 
                className="border border-[#E8E6E6] rounded-md h-10 w-10 flex justify-center items-center"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button> */}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`h-10 w-10 flex justify-center items-center rounded-md ${
                    page === currentPage ? "bg-[#6C4CF1] text-white" : "border border-[#E8E6E6]"
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                className="border border-[#E8E6E6] rounded-md h-10 w-10 flex justify-center items-center"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <img loading="lazy" src={vector} alt="" />
              </button>
            </div>
           </div>

        </div>
    </div>
    <ServiceAd />
   </AppLayout>
  )
}
