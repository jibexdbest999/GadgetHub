import React, { useContext } from 'react'
import AuthLayout from "../../Layouts/AuthLayout"
import Input from "../../Components/Input"
import { GoEyeClosed, GoEye  } from "react-icons/go";
import Button from "../../Components/Button"
import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { AuthContext } from "../../Context/AuthContext"
import { toast } from "react-toastify"

const initialFormData = {
  email : "",
  password : ""
}

export default function Login() {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState(initialFormData)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errors, setErrors ] = useState({})
  const [ submitError, setSubmitError ] = useState("")
  const [ showPassword, setShowPassword ] = useState(false)
  const toggleShowPassword = ()=> { setShowPassword(!showPassword) }
  const { SignIn } = useContext(AuthContext)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const formValidation = ()=>{
    const { email, password } = formData
    const newErrors = {}
    const emailRegex =  /^\S+@\S+\.\S+$/

    if (!email) {
      newErrors.email = "Email is required"
    }else if (!emailRegex.test(email)) {
      newErrors.email= "Invalid Email, please provide a valid email address"
    }
    if (!password) {
      newErrors.password = "Password is required"
    }else if (password.length < 8 ) {
      newErrors.password = "Password must be 8 or more characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (!formValidation()) return;
    console.log(formData);
    setIsLoading(true)
    setErrors({})
    try {
     const user = await SignIn(formData)
      setFormData(initialFormData)
      toast.success("Login successful")
      if (user.role?.toLowerCase() === "admin") {
      navigate("/admin");
     } else {
     navigate("/");
     }

    } catch (error) {
      setSubmitError(error.message || "Login failed")
      toast.error("Login failed, try again!")
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
    title="Login"
    paragraph="Don’t have an account yet?" 
    auth="Sign up now"
    to="/signup">
      {submitError && <p className="text-red-600 font-semibold">{submitError}</p>}
        <form className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <Input onChange={handleChange} type="email" className="my-2" placeholder="Enter your email" name="email" value={formData.email}  />
            {errors.email && <p className="text-red-900 font-semibold">{errors.email}</p>}
            <label htmlFor="password">Password</label>
            <div className="relative">
                <Input  onChange={handleChange} type={ showPassword ? "text" : "password"} className="mt-2 w-full" placeholder="Enter your password"   name="password" value={formData.password} />
                <button type="button" onClick={toggleShowPassword} className="absolute top-1/2 right-3">{ showPassword ? <GoEye /> : <GoEyeClosed />  }</button>
            </div>
                 { errors.password && <p className="text-red-900 font-semibold">{errors.password }</p>}
           <Link to="/forgotpassword"><p>Forgot your password?</p></Link>

            <Button onClick={handleSubmit} content={ isLoading ? "Loading" : "Login"} type="submit" className="text-white h-[54px] mt-5 font-semibold" />
        </form>
    </AuthLayout>
  )
}
