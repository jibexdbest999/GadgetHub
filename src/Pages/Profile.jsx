import React, { useState, useContext } from 'react'
import AppLayout from "../Layouts/AppLayout"
import { AuthContext } from "../Context/AuthContext"
import { RxPerson } from "react-icons/rx";
import { BiSolidShoppingBags } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import Card from "../Components/Wishlist components/WishListCard"
import { LikeContext } from "../Context/LikeContext"
import Orders from "../Components/ProfilePageComponents/Orders"
import LogoutModal from "../Components/LogoutModal"
import UserInfo from "../Components/ProfilePageComponents/UserInfo"
import Settings from "../Components/SettingsComponents/Settings"

export default function Profile({ customerDetails}) {
    const { user, logout } = useContext(AuthContext)
    const [ activeTab, setActiveTab ] = useState("myInfo")
    const { likes, getLikesCount } = useContext(LikeContext)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <AppLayout>
        <div className="container mx-auto px-5 lg:py-3">
            <div className="grid lg:flex gap-5 lg:py-4 h-auto w-full">

           <div className="w-full lg:w-[367px]">
             <h1 className="text-[28px] font-semibold">Hello <span>{user?.firstName}</span></h1>
            <p className="text-[#807D7E] text-[16px]">Welcome to your Account</p>
            
            <div className="border border-[#CDCACA] p-3 flex flex-col gap-4 rounded-md my-5">
                <button onClick={()=> setActiveTab("myInfo")} className={`text-[18px] font-semibold flex gap-2 w-full h-11 items-center pl-5 hover:cursor-pointer ${activeTab === "myInfo" ? "border-l-[#6C4CF1] border-l-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>
                   <span><RxPerson size={30} /></span> My Info
                </button>

                <button onClick={()=> setActiveTab("myOrders")} className={`text-[18px] font-semibold flex gap-2 w-full h-11 items-center pl-5 hover:cursor-pointer ${activeTab === "myOrders" ? "border-l-[#6C4CF1] border-l-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>
                    <span><BiSolidShoppingBags size={30} /></span> My Orders
                </button>

                  <button onClick={()=> setActiveTab("myWishlist")} className={`text-[18px] font-semibold flex gap-2 w-full h-11 items-center pl-5 hover:cursor-pointer ${activeTab === "myWishlist" ? "border-l-[#6C4CF1] border-l-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>
                    <span><CiHeart size={30} /></span> Wishlist
                </button>

                <button onClick={()=> setActiveTab("settings")} className={`text-[18px] font-semibold flex gap-2 w-full h-11 items-center pl-5 hover:cursor-pointer ${activeTab === "settings" ? "border-l-[#6C4CF1] border-l-2 bg-[#F3F0FF] text-dark" : "text-[#807D7E] bg-none border-0"}`}>
                    <span><IoSettingsOutline size={30} /></span> Account Settings
                </button>

                 <button onClick={()=> setShowLogoutModal(true)} className={`text-[18px] font-semibold text-[#EE2020] flex gap-2 w-full h-11 items-center pl-5  bg-none border-0 hover:cursor-pointer`}>
                    <span><PiSignOut size={30} /></span> Sign Out
                </button>
            </div>
           </div>

           <div className="w-full">
            {activeTab === "myInfo" && <UserInfo orderData={{ customer : customerDetails }} /> }

                { activeTab === "myOrders" && <div>
                  <Orders />
                  </div>}


                 {activeTab === "myWishlist" && <div>
                    <h1 className="text-[24px] font-semibold">Wishlist</h1>
                   {likes.length > 0 && <p>{getLikesCount()} items saved for later</p>}

                    <div className="my-6">
                        {getLikesCount() === 0 ? <p className="font-semibold text-lg text-dark text-center">No products in wishlist</p> : <div className="grid lg:grid-cols-3 gap-5 justify-between">
                    {likes.map((item) => (
                      <Card key={item.id} {...item} />
                    ))}
                  </div>}
                    </div>                    
                    </div>}

                    {activeTab === "settings" && <div>
                      <Settings />
                      
                      </div>}

                    
           </div>
            </div>
        </div>

        {showLogoutModal && (
          <LogoutModal 
          onClose={() => setShowLogoutModal(false)} 
          onConfirm={logout}
          />
        )}
    </AppLayout>
  )
}
