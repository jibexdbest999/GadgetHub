import React from 'react'
import Package from "../../assets/Package.png"
import Headphones from "../../assets/Headphones.png"
import Trophy from "../../assets/Trophy.png"
import CreditCard from "../../assets/CreditCard.png"

export default function ServiceAd() {

    const ads =[
        {
        icon: Package,
        title: "Fast Delivery",
        content: "Delivery in 24/H"
    },
     {
        icon: Headphones,
        title: "Support 24/7",
        content: "Live contact/message"
    },
     {
        icon: Trophy,
        title: "24 Hours Return",
        content: "100% money-back guarantee"
    },
     {
        icon:  CreditCard,
        title: "Secure Payment",
        content: "Your money is safe"
    }]

  return (
    <div className="bg-[#18202F] py-6 px-5 hidden lg:flex">
        <div className="container mx-auto flex bg-white h-[108px] rounded-[4px]">
            {ads.map((ad,index)=>{
                return <div className="flex mx-auto lg:gap-15 xl:gap-30 items-center justify-center">
                    <div key={index} className="flex gap-2 items-center justify-center">
                        <img loading="lazy" src={ad.icon} alt={ad.title} className="w-6 h-6" />
                        <div>
                            <h3 className="text-[18px] font-semibold text-gray-800">{ad.title}</h3>
                            <p className="text-[14px] text-gray-500">{ad.content}</p>
                        </div>
                    </div>
                  {(index === 0 || index === 2) && (
                    <div className="h-15 w-0.5 bg-gray-300">
                    </div>) }
                </div>
            })}
        </div>
    </div>
  )
}
