import { createContext, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [ user, setUser ] = useState(()=> {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null
    });
    const [token, setToken] = useState(()=> localStorage.getItem("token"))

    const SignUp = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_BASE_URL}/signup`,formData,{
                headers : {
                    "Content-Type" : "application/json"
                }
            })
           
            setUser(response.data.user)
            setToken(response.data.token)
            // console.log("Signup successful :" , response.data);
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))

            return response.data
        } catch (error) {
            console.error("signup failed :", error.response?.data || error.message);
            throw error.response?.data || error;
        }
    }

     const SignIn = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_BASE_URL}/signin`,formData,{
                headers : {
                    "Content-Type" : "application/json"
                }
            })
           
            setUser(response.data.user)
            setToken(response.data.token)
            // console.log("Login successful :" , response.data);
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            return response.data
        } catch (error) {
            console.error("Login failed :", error.response?.data || error.message);
            throw error.response?.data || error;
        }
    }

    const forgotPassword = async (formData)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_BASE_URL}/forgotPassword`,formData, {
                headers : {
                    "content-type" : "application/json"
                }
            })
            // console.log("Password reset request successful", response.data);
            return response.data
        } catch (error) {
            console.error("Password reset request failed:",error.response?.data || error.message)
            throw error.response?.data || error;
        }
    }

    const resetPassword = async (token,formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_BASE_URL}/resetPassword/${token}`,formData, {
                headers : {
                    "content-type" : "application/json"
                }
            })
            // console.log("password reset successful:", response.data);
            
            return response.data
        } catch (error) {
            console.error("Password reset failed:",error.response?.data || error.message)
            throw error.response?.data || error;
        }    
    }

    const refreshUser = async () => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_AUTH_BASE_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(response.data.user);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error("Failed to refresh user:", error.response?.data || error.message);
  }
};
const deleteAccount = async () => {
    if (!user || !token) return;
    try {
      const response = await axios.delete(`${import.meta.env.VITE_AUTH_BASE_URL}/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(null);
      setToken(null);
      localStorage.clear();
      sessionStorage.clear();
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };




    const logout = ()=>{
        setUser(null)
        setToken(null)
        localStorage.clear()
        sessionStorage.clear()
    }

    return (
        <AuthContext.Provider value={{SignUp,SignIn,user,token,logout,forgotPassword, resetPassword, refreshUser, deleteAccount}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};