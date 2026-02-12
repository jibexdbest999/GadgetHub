import React, { useState, useContext } from 'react'
import Logo from "../assets/GadgetHub Logo.png"
import Input from "../Components/Input"
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router"
import ShoppingCartModal from "./HomePage Components/Shopping Cart/ShoppingCartModal"
import { CartContext } from "../Context/ShoppingCartContext"
import { LikeContext } from "../Context/LikeContext"
import { useNavigate } from "react-router"
import { AuthContext } from "../Context/AuthContext"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Components/Button"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { cart } = useContext(CartContext)
  const { likes } =  useContext(LikeContext)
  const { user,logout } = useContext(AuthContext)
  const [ menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = ()=>{
    setMenuOpen(!menuOpen)
  }

  const icons= [
        {
        id: 1,
        icon: <FiShoppingCart />,
        linkTo: "/cart"
    },
    {
        id: 2,
        icon: <FaRegHeart />,
        linkTo: ""
    },
    {
        id: 3,
        icon: <GoPerson />,
        linkTo: "/profile"
    }
    ]

  const filters = [
        {
            id: 1,
            name: "All Categories",
            linkTo: "/products"
        },
          {
            id: 2,
            name: "Smart Phones",
            linkTo: ""
        },
          {
            id: 3,
            name: "Laptop",
            linkTo: ""
        },
          {
            id: 4,
            name: "Wearables",
            linkTo: ""
        },
          {
            id: 5,
            name: "Gaming",
            linkTo: ""
        },
        {
            id:6,
            name: "Accessories",
            linkTo: "",
        },
        {
            id:7,
            name:"Smart Homes",
            linkTo: "",
        }

    ]


  const UserMenu = ()=>{
    const [isOpen, setIsOpen] = useState(false)
    const handleLogout= ()=>{
      logout()
      setIsOpen(false)
      navigate("/login")
    }

    return (
      <div className="flex relative gap-2">
        <div className="flex gap-2 items-center">
          {icons.map((icon)=> (icon.id === 1 && <button className="relative cursor-pointer" onClick={showCart}  key={icon.id}>
                  <span className="text-3xl">{icon.icon}</span>
                  {cart.length > 0 && (
                    <span className="bg-[#6C4CF1] text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                      {cart.length}
                      </span>
                    )}
                    </button>) )}
         <div onClick={()=> setIsOpen(!isOpen)} className="flex items-center cursor-pointer gap-1">
          <img loading="lazy" className="h-[30px] w-[30px] rounded-full" src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"} alt={user.firstName} />
          <p className="text-[18px] font-semibold">Hello {user.firstName}</p>
         </div>
        </div>
        <button> {isOpen ? <FaChevronUp /> : <FaChevronDown />}</button>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }} className="absolute top-full right-0 flex flex-col bg-white rounded-md w-[185px] p-3 z-10 gap-1">
            <Link to="/profile">Profile</Link>
            <Link to="/help">Help</Link>
            <button onClick={handleLogout} className="text-[#E60E0E] text-left">Logout</button>
          </motion.div>
        )}

      </div>
    )
  }

  const showCart=()=>{setShowModal(true)}

  
  const handleSearch = (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;
  navigate(`/products?search=${searchQuery}`);
 };


  return (
    <div className="flex flex-col w-full">
       {showModal && <ShoppingCartModal showModal={showModal} setShowModal={setShowModal} />}
        <div className="hidden lg:flex bg-[#191C1F] text-white">
           <div className="flex container mx-auto items-center justify-between w-full h-[60px] px-5">
             <h1><span className="text-[#ACACAC]">Mon-Sat:</span> 9:00 AM - 5:30 PM</h1>
            <h1 className="text-[#ACACAC]">Visit our showroom in 12 Street Address City, Lagos</h1>
            <h1>Call Us: (+234) 01234 5678</h1>
           </div>
        </div>

        <div className="container mx-auto flex items-center justify-between gap-0 lg:gap-25 h-[100px] py-10 lg:py-2 px-5">

               <div className="flex justify-between w-full lg:hidden">
               <div className="flex gap-2 items-center">
                 {/* <button onClick={toggleMenu} className="text-2xl">
                {menuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
              </button> */}
              <Link to="/"><img className="w-[152px] h-[39px]" src={Logo} alt="" /></Link>
               </div>

              <div className="flex gap-5 items-center">
               {icons.map((icon) => {
                if (icon.id === 1) {
                   return (
                   <button onClick={showCart} className="relative" key={icon.id}>
                    <span className="text-3xl">{icon.icon}</span>
                    {cart.length > 0 && (
                      <span className="bg-[#6C4CF1] text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                        {cart.length}
                        </span>)}
                        </button>
                        );}
                        if (icon.id === 2) {
                           return (
                           <Link to={icon.linkTo} key={icon.id} className="relative">
                             <span className="text-3xl">{icon.icon}</span>
                              {likes.length > 0 && (
                                <span className="bg-[#6C4CF1] text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                                  {likes.length}</span>)}
                            </Link>);}
                            if (icon.id === 3) {
                              return (
                                 <Link to={user ? icon.linkTo : "/login"} key={icon.id} className="relative">
                                  <span className="text-3xl">{icon.icon}</span>
                            </Link>
                              )
                            }
                            
                  return null;})}
              </div>
              
               </div>

            <Link to="/"><img loading="lazy" className="w-[152px] h-[39px] hidden lg:flex" src={Logo} alt="" /></Link>

            <form onSubmit={handleSearch} className="hidden lg:flex relative h-[60px] lg:w-[556px]">
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="w-full h-full rounded-md border-[#ACACAC]" placeholder="Search for a gadget..." />
                <div className="absolute right-3 top-3" ><span><CiSearch size={30} /></span></div>
            </form>

             <div className="gap-5 hidden lg:flex">
          { user ? <UserMenu /> :
            <div className="flex gap-5 items-center">
              {icons.map((icon) => ( icon.id === 1 ? (
                <button onClick={showCart} className="relative" key={icon.id}>
                  <span className="text-3xl">{icon.icon}</span>
                  {cart.length > 0 && (
                    <span className="bg-[#6C4CF1] text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                      {cart.length}
                      </span>
                    )}
                    </button>
                    ) :  icon.id === 2 ? (
              <Link to={icon.linkTo} key={icon.id} className="relative">
                <span className="text-3xl">{icon.icon}</span>
                {likes.length > 0 && (
                  <span className="bg-[#6C4CF1] text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                    {likes.length}
                  </span>
                )}
              </Link>) :  (
                <Button onClick={()=> navigate("/login")} className="w-[84px] h-[48px] text-white" content="Login" />
              )
                    ))}
                </div>}
              </div>


              {/* <AnimatePresence>
                {menuOpen && (
                  <motion.div  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 w-[70vw] h-screen bg-gray-50 bg-opacity-95 shadow-md py-6 px-6 md:hidden rounded-b-lg z-[9999]">
                     <button onClick={toggleMenu} className="lg:hidden text-2xl">
                     {menuOpen ? <IoCloseSharp size={30} /> : <GiHamburgerMenu />}</button>


            
                  </motion.div>
                )}
              </AnimatePresence> */}
        </div>


        <div className="flex bg-[#191C1F] text-white mt-1">
            <div className="hidden lg:flex items-center container mx-auto h-[65px] text-sm lg:text-lg px-5 gap-8">
                {filters.map((filter)=>{
                return <Link key={filter.id} to={filter.linkTo}>{filter.name}</Link>
            })}
            </div>
        </div>

    </div>
  )
}
