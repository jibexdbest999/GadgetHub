import React, { useState, useContext} from 'react'
import ResetLayout from "../../Layouts/ResetLayout"
import Button from "../../Components/Button"
import { AuthContext } from "../../Context/AuthContext"
import { useNavigate, useLocation } from "react-router"
import { toast } from "react-toastify"

export default function EmailConfirmation() {
  const { forgotPassword } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation()
  const email = location.state?.email

  const handleBackToLogin = (e)=>{
    e.preventDefault()
    navigate("/login")
  }

  const handleResendEmail = async (e)=>{
    e.preventDefault()
   try {
     await forgotPassword({email})
    // console.log("Email resent to:", email);
    toast.success("Email reset sent")  
   } catch (error) {
    console.log(error);
    toast.error("Failed to resend reset email to:", email)
   }
  }



  return (
    <ResetLayout
    title="Check Your Email"
    description="Check your email address for instructions to reset your password.">
          <Button onClick={handleResendEmail} type="button" className="mt-2 w-full text-white font-semibold text-[18px] rounded-md h-[54px]" content="Resend email"  />
           <Button onClick={handleBackToLogin} type="button" content="Back to login" className="font-semibold bg-transparent hover:bg-[#F3F0FF] h-[54px] mt-3 text-[16px] w-full" />

    </ResetLayout>
  )
}
