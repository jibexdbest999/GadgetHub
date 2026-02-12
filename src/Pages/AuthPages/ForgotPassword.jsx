import React, { useState, useContext } from 'react'
import ResetLayout from "../../Layouts/ResetLayout"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import { useNavigate } from "react-router"
import { AuthContext } from "../../Context/AuthContext"
import { toast } from "react-toastify"

const initialFormData = {
  email : ""
}
export default function ForgotPassword() {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState(initialFormData)
  const [ error, setError ] = useState("")
  const [ submitError, setSubmitError ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false) 
  const { forgotPassword } = useContext(AuthContext)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
    setError("")
  }

  const formValidate = ()=>{
    const { email } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!email.trim()) {
    setError("Email is required")
    return false
    }else if (!emailRegex.test(email)) {
    setError("Invalid email")
    return false
    }
    return true
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!formValidate()) return;
    console.log(formData);
    setError("")
    setIsLoading(true)
    setSubmitError("")
    try {
      await forgotPassword(formData)
      setFormData(initialFormData)
      toast.success("Reset password link sent to your email")
      navigate("/emailconfirmation", { state : {email : formData.email}})
    } catch (error) {
      // console.log(error);
      setSubmitError(error.message || "Failed to send, please try again")
      toast.error("Failed to send reset link, try again")
    }finally{
      setIsLoading(false)
    }
  }
   const handleCancel = (e)=>{
    e.preventDefault()
    navigate("/")
   }


  return (
    <ResetLayout 
    title="Forgot Password?"
    description="“Enter the email linked to your account. We’ll send you a link to reset your password.”"
    >
      {submitError && <p className="text-red-600 font-semibold">{submitError}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="Email">Email</label>
            <Input onChange={handleChange} value={formData.email} name="email" type="email" className="w-full" placeholder="Enter your email" />
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            <Button disabled={isLoading} type="submit" className="mt-2 w-full text-white font-semibold text-[18px] rounded-md h-[54px]" content={isLoading ? "Loading..." : "Send Reset Link"}   />
            <Button onClick={handleCancel} type="button" content="Cancel"  className="text-red-900 font-semibold bg-transparent hover:bg-[#F3F0FF] h-[54px] text-[16px] mt-3 w-full" />
        </form>
    </ResetLayout>
  )
}
