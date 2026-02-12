import React, { useState, useEffect } from 'react'
import moneyBag from "../../assets/moneyBag.png"
import creditCard from "../../assets/ATMCard.png"
import payPal from "../../assets/payPal.png"

export default function PaymentMethod({ onChange }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
    })


    //  useEffect(() => {
    // if (selectedOption === "creditcard") {
    //   onChange({ method: selectedOption, cardData })
    // } else {
    //   onChange({ method: selectedOption })
    // }
    // }, [selectedOption, cardData])

     useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

    const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <form className="p-4 border rounded-md border-[#E8E6E6]">
        <h1 className="text-[24px] font-semibold">Select Payment Method</h1>

        <div
        className={`flex items-center p-3 justify-between my-2 rounded-md h-[54px] w-full 
        border-[1.5px] ${selectedOption === "delivery" ? "border-[#6C4CF1]" : "border-[#E8E6E6]"}`}
      >
        <div className="flex gap-3">
            <input
          type="radio"
          name="payment"
          value="delivery"
          checked={selectedOption === "delivery"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-5 h-5 accent-[#6C4CF1]"
        />
        <label>Pay On Delivery</label>
        </div>
        <img src={moneyBag} alt="" />
      </div>

      <div
        className={`flex items-center p-3 justify-between my-2 rounded-md h-[54px] w-full 
        border-[1.5px] ${selectedOption === "creditcard" ? "border-[#6C4CF1]" : "border-[#E8E6E6]"}`}
      >
        <div className="flex gap-3">
            <input
          type="radio"
          name="payment"
          value="creditcard"
          checked={selectedOption === "creditcard"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-5 h-5 accent-[#6C4CF1]"
        />
        <label>Pay With Credit Card</label>
        </div>
        <img src={creditCard} alt="" />
      </div>
       {selectedOption === "creditcard" && (
          <div className="mt-3 flex flex-col gap-3">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              placeholder="1234 5678 3456 6677"
              className="w-full px-3 py-2 border border-[#E8E6E6] rounded-md"
            />
            <label htmlFor="cardholder name">Cardholder Name *</label>
            <input
              type="text"
              name="cardHolder"
              value={cardData.cardHolder}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-[#E8E6E6] rounded-md"
            />
            <div className="flex gap-3 w-full">
             <div className="flex flex-col w-1/2">
              <label htmlFor="expiryDate">Expiry Date *</label>
               <input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleCardChange}
                placeholder="MM/YY"
                className="flex-1 px-3 py-2 border border-[#E8E6E6] rounded-md"
              />
             </div>
             <div className="flex flex-col w-1/2">
              <label htmlFor="cvv">CVV *</label>
               <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-[#E8E6E6] rounded-md"
              />
             </div>
            </div>
          </div>
        )}

       <div
        className={`flex items-center p-3 justify-between my-2 rounded-md h-[54px] w-full 
        border-[1.5px] ${selectedOption === "paypal" ? "border-[#6C4CF1]" : "border-[#E8E6E6]"}`}
      >
        <div className="flex gap-3">
            <input
          type="radio"
          name="payment"
          value="paypal"
          checked={selectedOption === "paypal"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-5 h-5 accent-[#6C4CF1]"
        />
        <label>Pay With Pay Pal</label>
        </div>
        <img src={payPal} alt="" />
      </div>

      <div
        className={`flex items-center p-3 justify-between my-2 rounded-md h-[54px] w-full 
        border-[1.5px] ${selectedOption === "paystack" ? "border-[#6C4CF1]" : "border-[#E8E6E6]"}`}
      >
        <div className="flex gap-3">
            <input
          type="radio"
          name="payment"
          value="paystack"
          checked={selectedOption === "paystack"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-5 h-5 accent-[#6C4CF1]"
        />
        <label>Pay With Paystack</label>
        </div>
        <img className="w-10 h-10" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX///8LpNsAn9nC5fVMs+EAodqOyumRz+ur1+74/f41r98AntmEy+ry+v3Q6/dyxOe54fOu2/Df8vrp+PwAptyj2PBMt+JduuTM6/d9yOmX0+2r2/GMzuvavb78AAAB9klEQVR4nO3ca3LaMBSAUSPikuDyjCFN0/2vsxBm8reOJperOuesgG+UYElI7joAAAAAAAAAAAAAAAAAaMzmsPoRYrXMTrs5jKWPUYb1MbvuYj8s4vTjJruv6wL7rok/s/u6ZeQQXgofsgO7xz60cLF+Si8sChUqVKhQocJvUDj7OU30vPQlOzB6bTEcsvsugxj5j1gaGMJL4jiUKLvsuJun/SrGqYU9DAC+xnb3EGm3zQ58jdrU/9jcf80NXMVOva+GVWbgJnh9+K5k/nqxv0vhPrEwegX8rn/MLLzLGCpUqFChQoWNF87+iX+4yxhm7gtv45cWl8VF6hJxHf9n2q8zA7vjGJ3Yj8k7w8dz3K7+1XDO3/p+XkZ6zs4DuIuo79Jf6ecwbiKfh8m73Tehc5pyzs7rouel5ZTdF7226PMHMXp9mH/qa/7n2r7B2USFChUqVKjw34Wzf+IHn8VoYF4afJ6m/M4ODD4T1cRN58hzbWVsYzs47Gziyyn9awaAr1Jz72nfwpN8qqq7a8P4lv25J6u9f9jC3clpquecqcfTP6H+HnDqQadPqF8Blz/Zn32a+l2MBl6QNIlChe1TqLB9CmdQOPs5zfznpfNfW1S/v3TIP+00VdU7aMvi/wmse4/wWxs/SAAAAAAAAAAAAAAAAABAnb9hfTgEVrM7gQAAAABJRU5ErkJggg==" alt="" />
      </div>
    </form>
  )
}
