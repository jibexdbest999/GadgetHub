import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import Logo from "../assets/GadgetHub Logo.png";
import paymentVector from "../assets/onlinePaymentVector.png";
import { FaGreaterThan } from "react-icons/fa";
import CustomerDetailsForm from "../Components/CheckoutPage Components/CustomerDetailsForm";
import DeliveryDetails from "../Components/CheckoutPage Components/DeliveryDetails";
import PaymentMethod from "../Components/CheckoutPage Components/PaymentMethod";
import OrderSummary from "../Components/CheckoutPage Components/OrderSummary";
import { CartContext } from "../Context/ShoppingCartContext";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import OrderReceived from "../Components/CheckoutPage Components/OrderReceived";
import PreviewOrder from "../Components/CheckoutPage Components/PreviewOrder";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const [orderData, setOrderData] = useState({
    customer: {},
    deliveryMethod: "",
    paymentMethod: "",
  });

  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Load Paystack script once
  useEffect(() => {
    if (window.PaystackPop) return setPaystackLoaded(true);
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    script.onerror = () => toast.error("Paystack failed to load");
    document.body.appendChild(script);
  }, []);

  // Named callback function
  async function paystackCallback(response, orderId) {
    try {
      await axios.post("https://gadgethub-server-giwj.onrender.com/api/payments/verify", {
        reference: response.reference,
      });

      await axios.patch(`https://gadgethub-server-giwj.onrender.com/api/orders/${orderId}/payment`, {
        paymentStatus: "paid",
        paymentMethod: "creditcard",
      });

      toast.success(`Payment successful. Ref: ${response.reference}`);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Payment verification failed. Order not updated.");
    }
  }

  const handleCreditCardPayment = async (orderId, amount) => {
    if (!paystackLoaded) {
      toast.error("Paystack not loaded. Refresh the page.");
      return;
    }
    if (!orderData.customer.email || amount <= 0) {
      toast.error("Invalid payment details.");
      return;
    }

    try {
      const { data } = await axios.post("https://gadgethub-server-giwj.onrender.com/api/payments/card-init", {
        email: orderData.customer.email,
        amount,
      });

      const { reference } = data;

      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: orderData.customer.email,
        amount: amount * 100,
        reference,
        callback: (response) => paystackCallback(response, orderId),
        onClose: () => toast.error("Payment cancelled"),
      });

      handler.openIframe();
    } catch (err) {
      console.error(err);
      toast.error("Credit card payment failed");
    }
  };

  const handleConfirmOrder = async () => {
    if (!orderData.paymentMethod || !orderData.deliveryMethod) {
      toast.error("Please complete all checkout steps");
      return;
    }

    const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
      console.log("ORDER PAYLOAD", {
        items: cart,
        deliveryMethod: orderData.deliveryMethod,
        paymentMethod: orderData.paymentMethod,
        totalAmount: amount,
      });

      const orderRes = await axios.post(
        "https://gadgethub-server-giwj.onrender.com/api/orders/",
        {
          customer: orderData.customer,
          items: cart,
          deliveryMethod: orderData.deliveryMethod,
          paymentMethod: orderData.paymentMethod,
          totalAmount: amount,
          paymentStatus: orderData.paymentMethod === "delivery" ? "pending" : "pending",
          deliveryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = orderRes.data.order._id;
      setCart([]);
    //   const { saveAddress, address, state, city } = orderData.customer;
    //   if (saveAddress && address && state && city) {
    //     try {
    // await axios.post(
    //   "https://gadgethub-server.onrender.com/api/user/auth/address",
    //   { address, state, city },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    //   } catch (err) {
    //   console.error("Failed to save address", err);
    //  }
    //  }
    //  await refreshUser()

      if (orderData.paymentMethod === "delivery") {
        toast.success("Order placed successfully. Pay on delivery.");
        setShowModal(true);
        setShowPreview(false);
        return;
      }

      if (orderData.paymentMethod === "creditcard") {
        handleCreditCardPayment(orderId, amount);
        return;
      }

      if (orderData.paymentMethod === "paystack" || orderData.paymentMethod === "paypal") {
        const paymentRes = await axios.post("https://gadgethub-server-giwj.onrender.com/api/payments/initialize", {
          orderId,
          method: orderData.paymentMethod,
        });

        if (orderData.paymentMethod === "paystack") {
          window.location.href = paymentRes.data.authorization_url;
        } else if (orderData.paymentMethod === "paypal") {
          window.location.href = paymentRes.data.approvalUrl;
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order or initialize payment");
    }
  };

  const handlePreviewOrder = () => {
    if (!orderData.paymentMethod || !orderData.deliveryMethod) {
      toast.error("Please complete all checkout steps");
      return;
    }
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col w-full">
      {showPreview && (
        <PreviewOrder
          orderData={orderData}
          cart={cart}
          onBack={() => setShowPreview(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
      {showModal && <OrderReceived showModal={showModal} setShowModal={setShowModal} />}

      <div className="hidden lg:flex bg-[#191C1F] text-white">
        <div className="flex container mx-auto items-center justify-between w-full h-[7vh] px-5">
          <h1>
            <span className="text-[#ACACAC]">Mon-Sat:</span> 9:00 AM - 5:30 PM
          </h1>
          <h1 className="text-[#ACACAC]">Visit our showroom in 12 Street Address City, Lagos</h1>
          <h1>Call Us: (+234) 01234 5678</h1>
        </div>
      </div>

      <div className="flex justify-between px-3 py-3 container mx-auto">
        <Link to="/">
          <img loading="lazy" className="w-[152px] h-[39px]" src={Logo} alt="" />
        </Link>
        <div className="flex items-center gap-2">
          <img loading="lazy" className="w-4 h-4 lg:w-6 lg:h-6" src={paymentVector} alt="" />
          <p className="text-[14px] lg:text-[18px]">secure & safe payment</p>
        </div>
      </div>

      <div className="py-2 px-5 container mx-auto">
        <h1 className="flex items-center gap-1 text-[16px] text-[#5F6C72]">
          <Link to="/">Home</Link>
          <span className="text-[12px] text-[#434545]">
            <FaGreaterThan />
          </span>
          <Link to="/cartpage">
            <span className="text-[#5F6C72]">Cart</span>
          </Link>
          <span className="text-[12px] text-[#434545]">
            <FaGreaterThan />
          </span>
          <span className="text-[#191C1F]">Checkout</span>
        </h1>
      </div>

      <div className="py-2 px-5 flex flex-col lg:flex lg:flex-row justify-between gap-5 container mx-auto w-full">
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <CustomerDetailsForm
            onChange={(data) =>
              setOrderData((prev) => ({
                ...prev,
                customer: data,
                deliveryMethod: data.hasAddress ? "doorstep" : "pickup",
              }))
            }
          />
          <DeliveryDetails
            deliveryMethod={orderData.deliveryMethod}
            addressExists={Boolean(orderData.customer.address?.trim())}
            onChange={(value) =>
              setOrderData((prev) => ({ ...prev, deliveryMethod: value }))
            }
          />
          <PaymentMethod
            onChange={(value) =>
              setOrderData((prev) => ({ ...prev, paymentMethod: value }))
            }
          />
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSummary  deliveryMethod={orderData.deliveryMethod} paymentMethod={orderData.paymentMethod}
          onConfirm={()=> { if (!token) { navigate("/login")}
        else {
          handlePreviewOrder()
        }}} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
