import React, { Suspense, lazy } from "react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router"
import ScrollToTop from "./Components/ScrollToTop"
import AdminRoute from "./Components/Admin/components/ProtectAdminRoute"
import FallBackLoader from "./Components/FallBackLoader"
import ProtectRoute from "./Components/ProtectRoute"

const HomePage = lazy(() => import("./Pages/HomePage"));
const Login = lazy(() => import("./Pages/AuthPages/Login"));
const SignUp = lazy(() => import("./Pages/AuthPages/SignUp"));
const ForgotPassword = lazy(() => import("./Pages/AuthPages/ForgotPassword"));
const EmailConfirm = lazy(() => import("./Pages/AuthPages/EmailConfirmation"));
const ResetPassword = lazy(() => import("./Pages/AuthPages/ResetPassword"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const ProductDetailsPage = lazy(() => import("./Pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const CheckoutPage = lazy(() => import("./Pages/CheckoutPage"));
const Profile = lazy(() => import("./Pages/Profile"));
const AdminLogin = lazy(() => import("./Pages/AuthPages/AdminLogin.jsx"));

// Admin pages
const Dashboard = lazy(() => import("./Components/Admin/Pages/Dashboard"));
const AdminLayout = lazy(() => import("./Components/Admin/Layout/AdminLayout"));
const Orders = lazy(() => import("./Components/Admin/Pages/Orders"));
const Products = lazy(() => import("./Components/Admin/Pages/Products"));


function App() {

  return (
    <>
    <Router>
      <Suspense fallback={<FallBackLoader />} >
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/emailconfirmation" element={<EmailConfirm />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/profile" element={<ProtectRoute><Profile /></ProtectRoute>} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      
       <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        {/* <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<AdminSettings />} /> */}
        </Route>

      </Routes>
       <ScrollToTop />

      </Suspense>
    </Router>
    </>
  ) 
}

export default App
