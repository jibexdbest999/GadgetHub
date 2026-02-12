import React from 'react'
import flashSale from "../../assets/sales.png"
import { products } from "../../productData.js"
import SalesCard from "./SalesCard"
import CountdownTimer from "../HomePage Components/CountdownTimer"

export default function FlashDeals() {
    const saleEndTime = new Date('2026-02-19T12:00:00');
  return (
    <div className="bg-[#FFF1EA] px-5 py-8 mt-[2]">
        <div className="container mx-auto">

            <div className="flex gap-3 items-center p-4">
                <img loading="lazy" className="w-[64px] h-[64px]" src={flashSale} alt="" />
                <div>
                    <p className="text-[28px]">Flash Deals</p>
                    <p className="text-[18px]">Limited time offers - grab them before they're gone!</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between lg:gap-10 items-center w-full">
                <div className="grid md:grid-cols-2 w-90% lg:w-2/3 gap-5">
                    {products.filter((product)=> product.isOnSale).map((product)=> <SalesCard  key={product.id} {...product} /> ) }
                </div>


                <div className="w-[350px] lg:w-1/3 bg-gradient-to-b from-[#5E4AEA] via-[#6B44EA] to-[#7B3DEA] text-center h-[275px] flex flex-col items-center justify-center rounded-md text-white gap-3 mt-6 lg:mt-0 p-3">
                   <div>
                    <p>Flash Sales Ends in</p>
                    <p className="text-[14px]">Dont miss out on these deals</p>
                   </div>

                    <CountdownTimer endTime={saleEndTime} />
                    <button className="text-[#6C4CF1] bg-white w-[80%] rounded-md py-3 hover:bg-[#6C4CF1] hover:text-white">View All deals</button>


                </div>
            </div>



        </div>
    </div>
  )
}
