import React, { useState, useContext} from 'react'
import { AuthContext } from "../../../Context/AuthContext"
import { useNavigate, Link } from "react-router"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { motion } from "framer-motion"
import { IoMdNotificationsOutline } from "react-icons/io";
import LogoutModal from "../../LogoutModal"

export default function Dashboard() {
      const { user,logout } = useContext(AuthContext)
      const navigate = useNavigate()
      const [showLogoutModal, setShowLogoutModal] = useState(false)


      const UserMenu = ()=>{
        const [isOpen, setIsOpen] = useState(false)

        return (
          <div className="flex relative gap-2">
            <div className="flex gap-2 items-center">
                <span className="flex items-center justify-center rounded-full w-[25px] h-[25px] bg-[#F5F7FA]"><IoMdNotificationsOutline size={30} /></span>
              
             <div onClick={()=> setIsOpen(!isOpen)} className="flex items-center cursor-pointer h-10 gap-1">
              <img className="h-[30px] w-[30px] rounded-full" src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"} alt={user.firstName} />
             <div className="flex flex-col gap-1">
                 <p className="text-[14px] font-semibold">Admin {user.firstName}</p>
                 <p className="text-[14px]">{user.email}</p>
             </div>
             </div>
            </div>
            <button> {isOpen ? <FaChevronUp /> : <FaChevronDown />}</button>
    
            {isOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }} className="absolute top-full right-0 flex flex-col bg-white rounded-md w-[185px] p-3 z-10 gap-1">
                <Link to="/settings">Account Settings</Link>
                <button     onClick={() => {
                setShowLogoutModal(true)
                setIsOpen(false)
              }}className="text-[#E60E0E] text-left">Sign Out</button>
              </motion.div>
            )}
    
          </div>
        )
      }
  return (
        <div className="bg-[#FFFFFF]  w-full h-screen">
           <div className="flex justify-between items-center py-5 px-5 border-b-1 border-b-[#E6EFF5] ">
             <h1 className="text-[24px] font-semibold">Dashboard</h1>
            <div>
                { user && <UserMenu />}
            </div>
           </div>
           <div className="bg-[#6C4CF1] text-white px-5 m-3 rounded-md h-[100px] flex flex-col justify-center">
            <h1 className="text-[20px] font-semibold">Welcome back, Admin 👋</h1>
            <p>Here’s a quick snapshot of your Orders.</p>
           </div>

                 {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout()
            navigate("/login")
          }} />)}
        </div>
  )
}
