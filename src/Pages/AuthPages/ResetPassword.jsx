import React, { useState, useContext } from 'react'
import ResetLayout from "../../Layouts/ResetLayout"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import { AuthContext } from "../../Context/AuthContext"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { resetPassword } = useContext(AuthContext)
  const [ formData, setFormData ] = useState({password : "", confirmPassword : ""})
  const [errors, setErrors ]= useState({})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false)
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
  const toggleShowPassword= ()=> {setShowPassword(!showPassword)}
  const toggleShowConfirmPassword= ()=> {setShowConfirmPassword(!showConfirmPassword)}
  const [ submitError, setSubmitError ] = useState("")

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
    setErrors({...errors})
  }

  const formValidate = ()=>{
    const { password , confirmPassword } = formData;
    const newErrors = {}

    if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters"
    }
    if (!password || !confirmPassword) {
      newErrors.password = "Please provide all fields"
    }
    else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;
    setErrors({})
    setIsLoading(true)
    try {
      await resetPassword(token,formData)
      // console.log(token);
      
      setFormData({ password: "", confirmPassword: "" })
      toast.success("New Password created, Log in now!")
      navigate("/login")
    } catch (error) {
      // console.log(error)
      toast.error("Failed to create a new password, try again")
      setSubmitError(error.message || "Failed to create a new password, try again")
    }finally{
      setIsLoading(false)
    }
  }





  return (
    <ResetLayout
    title="Reset Your Password"
    description="You're just one step away from accessing your account.">
      {submitError && <p className="text-red-700 font-semibold">{submitError}</p>}
        <form onSubmit={handleSubmit} className="">
            <label htmlFor="newPassword">New Password</label>
            <div className="relative">
              <Input onChange={handleChange} value={formData.password} name="password" type={showPassword ? "text" : "password"} placeholder="Enter your new password" className="w-full my-2" />
            <button className="absolute top-1/2 right-3" type="button" onClick={toggleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <p className="text-gray-700 pb-5">Minimum of 8 characters, must include letters and numbers </p>

            <label htmlFor="confirmPassword">Confirm Password</label>  

           <div className="relative">
             <Input onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Enter your new password" className="w-full my-2" />
            <button className="absolute top-1/2 right-3" type="button" onClick={toggleShowConfirmPassword}>{showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
           </div>
           <p className="text-gray-700 pb-5">Must match the above field </p>
           {errors.confirmPassword && <span className="text-red-700 font-semibold w-md">{errors.confirmPassword}</span>}
           {errors.password && <span className="text-red-700 font-semibold">{errors.password}</span>}
            <Button content={isLoading ? "loading..." : "Update Password"} type="submit" className="mt-4 w-full text-white font-semibold text-[18px] rounded-md h-[54px]" />
        </form>
    </ResetLayout>
  )
}
