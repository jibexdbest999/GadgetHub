import React from 'react'
import Button from "../../Components/Button"
import Avatar from "../../assets/reviewAvatar.jpg"
import StarVector from "../../assets/starVector.png"

export default function Review() {
  return (
    <div>
        <div className="flex items-center justify-between py-5">
            <h1 className="text-[20px] font-semibold">Customer Reviews</h1>
            <Button content="Write a Review" className="border w-[178px] text-white rounded-md h-12" />
        </div>

        <div className="bg-[#F4F4F3] h-[235px] my-4 w-full rounded-md p-5">
            <div className="flex items-center gap-4 py-3">
                <img loading="lazy" className="w-[35px] h-[35px] rounded-full" src={Avatar} alt="" />
                <div>
                    <p>Michael Chen</p>
                    <div className="flex items-center gap-2">
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <p>4.8</p>
                    </div>
                </div>

            </div>
            <h1 className="text-[18px] font-bold">Worth Every Penny</h1>
            <p className="py-3 text-[14px] text-[#5F6C72]">The titanium design feels premium and the camera quality is outstanding. Battery life easily gets me through a full day of heavy use. Upgraded from iPhone 13 Pro and the difference is night and day. The A17 Pro chip is incredibly fast and the Action button is more useful than I expected.</p>
            <p className="text-[#5F6C72]">2025-03-15</p>
        </div>

         <div className="bg-[#F4F4F3] h-[235] my-4 w-full rounded-md p-5">
            <div className="flex items-center gap-4 py-3">
                <img loading="lazy" className="w-[35px] h-[35px] rounded-full" src={Avatar} alt="" />
                <div>
                    <p>Michael Chen</p>
                    <div className="flex items-center gap-2">
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <img loading="lazy" src={StarVector} alt="" />
                        <p>4.8</p>
                    </div>
                </div>

            </div>
            <h1 className="text-[18px] font-bold">Worth Every Penny</h1>
            <p className="py-3 text-[14px] text-[#5F6C72]">The titanium design feels premium and the camera quality is outstanding. Battery life easily gets me through a full day of heavy use. Upgraded from iPhone 13 Pro and the difference is night and day. The A17 Pro chip is incredibly fast and the Action button is more useful than I expected.</p>
            <p className="text-[#5F6C72]">2025-03-15</p>
        </div>

        <button className="text-center flex mx-auto text-[#056EC8] my-2 text-[14px]">Load More...</button>

    </div>
  )
}
