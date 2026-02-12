import React, { useEffect, useState } from 'react'
import ProductCard from "../ProductCard"

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || []
    setRecentProducts(stored)
  }, [])

  if (recentProducts.length === 0) return null

  return (
    <div className="container mx-auto px-5 py-5">
      <h1 className="text-[28px] font-semibold">Recently Viewed</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
        {recentProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}