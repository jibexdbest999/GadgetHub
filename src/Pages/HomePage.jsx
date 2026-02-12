import React from 'react'
import AppLayout from "../Layouts/AppLayout"
import HeroSlider from "../Components/HomePage Components/HeroSlider"
import ServiceAds from "../Components/HomePage Components/ServiceAd"
import Brands from "../Components/HomePage Components/Brands"
import Trending from "../Components/HomePage Components/Trending"
import FlashDeals from "../Components/HomePage Components/FlashDeals"
import ShopByCategory from "../Components/HomePage Components/ShopByCategory"

export default function HomePage() {

  return (
    <AppLayout>
      <HeroSlider />
      <ServiceAds />
      <Trending />
      <ShopByCategory />
      <FlashDeals />
      <Brands />
    </AppLayout>
  )
}
