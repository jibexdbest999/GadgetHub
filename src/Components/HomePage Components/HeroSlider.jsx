import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import ProMax from "../../assets/promax.png"
import PromAxPink from "../../assets/Free mockup of female hand holding iPhone 14 Pro (Mockuuups Studio).png"
import Pods from "../../assets/pods.png"
import PixelPhone from "../../assets/GooglePixel.png"
import "./HeroSlider.css"
import Button from "../../Components/Button"
import Iphone from "../../assets/iPhone 16 Plus Light.png"
import Xiaomi from "../../assets/Xiaomi.png"
import { useNavigate } from "react-router"

export default function HeroSlider() {
    const navigate = useNavigate()
    const handleShopNow =()=>{
        navigate("/products")
    }
  return (
   <div>
    
    <div className="container mx-auto px-5 lg:py-5">   
    <div className="hidden md:flex md:flex-col">

       <div>
        <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, el : ".swiperPagination" }}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
            <div className="flex justify-between items-center">
                <div className="bg-gradient-to-b from-[#0D1A56] via-[#4A5DAA] to-[#B4C6F7] relative text-white w-full lg:w-2/3 h-[560px] rounded-2xl flex flex-col justify-center items-center">
                <div className="absolute left-[75px] w-[70%]">
                    <p className="text-[24px]">Iphone 15 Pro Max</p>
                    <h1 className="text-[38px] py-1">FROM ₦1,000,000</h1>
                    <p className="text-[16px]">A17 Pro chip with 6-core GPU Pro camera <br /> system with 48MP main</p>
                    <Button onClick={handleShopNow} className="w-[118px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                </div>
                <img loading="lazy" src={ProMax} alt="" className="absolute bottom-0 right-0 w-[45%] h-[500.5372619628906px]" />
                </div>

                <div className="flex flex-col justify-between h-[560px] md:hidden lg:flex lg:w-1/3 ml-5">

                    <div className="bg-[#E8E6E6] flex gap-3 items-center justify-center p-5 h-[248px]  rounded-md">
                        <img loading="lazy" className="w-[160px] h-[160px]" src={Pods} alt="" />
                        <div className="w-[30%]">
                            <h1 className="text-[24px] font-semibold">Oriamo <br /> FlipBuds Pro</h1>
                             <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                    </div>

                     <div className="bg-[#191C1F] relative h-[248px] rounded-md">
                        <div className="absolute left-10 top-10 w-[40%]">
                            <p className="text-[#EBC80C] text-[14px] ">FLASH SALES</p>
                            <h1 className="text-[24px]  font-semibold text-white">New Google <br /> Pixel 6 Pro</h1>
                            <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                        <span className="bg-[#EFD33D] w-[90px] h-[35px] absolute right-10 top-10 z-88 flex items-center justify-center font-semibold rounded-xs">15% OFF</span>
                        <img loading="lazy" className="w-[50%] h-[192px] absolute bottom-1 -right-4" src={PixelPhone} alt="" />

                    </div>

                </div>
                
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="flex justify-between items-center">
                <div className="bg-gradient-to-b from-[#870F1C] via-[#E842A7] to-[#E37CDC] relative text-white w-full lg:w-2/3 h-[560px] rounded-2xl flex flex-col justify-center items-center">
                 <div className="absolute left-20 w-[70%]">
                     <p className="text-[24px]">Iphone 15 Pro Max</p>
                    <h1 className="text-[38px] py-1">FROM ₦1,000,000</h1>
                    <p className="text-[16px]">A17 Pro chip with 6-core GPU Pro camera <br /> system with 48MP main</p>
                     <Button onClick={handleShopNow} className=" w-[118px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                </div>
                <img loading="lazy" src={PromAxPink} alt="" className="absolute bottom-0 right-0 w-[45%] h-[460.5372619628906px]" />
                </div>

                <div className="flex flex-col justify-between h-[560px] hidden lg:flex lg:w-1/3 ml-5">

                    <div className="bg-[#E8E6E6] flex gap-3 items-center justify-center p-5 h-[248px] rounded-md">
                        <img loading="lazy" className="w-[160px] h-[160px]" src={Pods} alt="" />
                        <div className="w-[30%]">
                            <h1 className="text-[24px] font-semibold">Oriamo <br /> FlipBuds Pro</h1>
                             <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                    </div>

                     <div className="bg-[#191C1F] relative h-[248px] rounded-md">
                        <div className="absolute left-10 top-10 w-[60%]">
                            <p className="text-[#EBC80C] text-[14px]">FLASH SALES</p>
                            <h1 className="text-[24px] font-semibold text-white">Xiaomi Mi 11 <br /> Ultra <br /> 12GB+256GB</h1>
                             <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                        <span className="bg-[#EFD33D] w-[90px] h-[35px] absolute right-10 top-9 z-88 flex items-center justify-center font-semibold rounded-xs">15% OFF</span>
                        <img loading="lazy" className="w-[40%] h-[190px] absolute bottom-0 -right-4" src={Xiaomi} alt="" />

                    </div>

                </div>
                
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="flex justify-between items-center">
                <div className="bg-gradient-to-b from-[#0D1A56] via-[#4A5DAA] to-[#B4C6F7] relative text-white w-full lg:w-2/3 h-[560px] rounded-2xl flex flex-col justify-center items-center">
                <div className="absolute left-[75px] w-[70%]">
                    <p className="text-[24px]">Iphone 15 Pro Max</p>
                    <h1 className="text-[38px] py-1">FROM ₦1,000,000</h1>
                    <p className="text-[16px]">A17 Pro chip with 6-core GPU Pro camera <br /> system with 48MP main</p>
                    <Button onClick={handleShopNow} className="w-[118px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                </div>
                <img loading="lazy" src={ProMax} alt="" className="absolute bottom-0 right-0 w-[45%] h-[500.5372619628906px]" />
                </div>

                <div className="flex flex-col justify-between h-[560px] md:hidden lg:flex lg:w-1/3 ml-5">

                    <div className="bg-[#E8E6E6] flex gap-3 items-center justify-center p-5 h-[248px]  rounded-md">
                        <img loading="lazy" className="w-[160px] h-[160px]" src={Pods} alt="" />
                        <div className="w-[30%]">
                            <h1 className="text-[24px] font-semibold">Oriamo <br /> FlipBuds Pro</h1>
                             <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                    </div>

                     <div className="bg-[#191C1F] relative h-[248px] rounded-md">
                        <div className="absolute left-10 top-10 w-[40%]">
                            <p className="text-[#EBC80C] text-[14px] ">FLASH SALES</p>
                            <h1 className="text-[24px]  font-semibold text-white">New Google <br /> Pixel 6 Pro</h1>
                            <Button onClick={handleShopNow} className=" w-[80px] text-sm lg:text-[16px] lg:w-[100px] h-[38px] lg:h-[48px] mt-2 font-semibold text-white" content="Shop now" />
                        </div>
                        <span className="bg-[#EFD33D] w-[90px] h-[35px] absolute right-10 top-10 z-88 flex items-center justify-center font-semibold rounded-xs">15% OFF</span>
                        <img loading="lazy" className="w-[50%] h-[192px] absolute bottom-1 -right-4" src={PixelPhone} alt="" />

                    </div>

                </div>
                
            </div>
        </SwiperSlide>
        
      </Swiper>
       </div>

      <div className="swiperPagination text-center mt-2">
      </div>

    </div>
    </div>

    <div>
       <div className="md:hidden">
        <Swiper 
        modules={[Pagination]}
        pagination={{ clickable: true, el : ".swiperPaginationMobile" }}
        spaceBetween={30}
        slidesPerView={1}>
            <SwiperSlide>
        <div className="container lg:hidden mx-auto px-5 lg:px-10 lg:py-5">
       <div className="bg-gradient-to-b from-[#0D1A56] via-[#4A5DAA] to-[#B4C6F7] flex justify-between items-center px-10 py-5 rounded-lg">
         <div className="flex-col text-white">
            <h1 className="text-[14px]">Iphone 15 Pro Max</h1>
            <h1 className="text-[20px]">FROM  ₦1,000,000</h1>
            <p className="text-[10px]">A17 Pro chip with 6-core GPU Pro camera <br /> system with 48MP main</p>
            <Button onClick={handleShopNow} className=" w-[70px] h-[25px] mt-2 text-white font-semibold text-[10px]" content="Shop now" />
        </div>
        <img loading="lazy" className="w-[75px] object-fit h-[150px]" src={Iphone} alt="" />
       </div>
       </div>
            </SwiperSlide>


             <SwiperSlide>
        <div className="container lg:hidden mx-auto px-5 lg:px-10 lg:py-5">
       <div className="bg-gradient-to-b from-[#870F1C] via-[#E842A7] to-[#E37CDC] flex justify-between items-center px-10 py-5 rounded-lg ">
         <div className="flex-col gap-5 text-white">
           <h1 className="text-[14px]">Iphone 15 Pro Max</h1>
            <h1 className="text-[20px]">FROM  ₦1,000,000</h1>
            <p className="text-[10px]">A17 Pro chip with 6-core GPU Pro camera <br /> system with 48MP main</p>
            <Button onClick={handleShopNow} className=" w-[70px] h-[25px] mt-2 text-white font-semibold text-[10px]" content="Shop now" />
        </div>
        <img loading="lazy" className="w-[35%] object-fit h-[150px]" src={PromAxPink} alt="" />
       </div>
       </div>
            </SwiperSlide>
        </Swiper>
       </div>

      <div className="swiperPaginationMobile text-center mt-2 md:hidden">
      </div>
    </div>


   </div>
  )
}