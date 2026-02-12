import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../Context/AuthContext"

export default function CustomerDetailsForm({ onChange }) {
  const [saveAddress, setSaveAddress] = useState(false)
  const [nigeriaData, setNigeriaData] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: user.phoneNumber || ""
      }))
    }
  }, [user])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const getNigerianData = async () => {
      try {
        const response = await fetch("https://temikeezy.github.io/nigeria-geojson-data/data/full.json")
        const data = await response.json()
        // console.log(data);
        setNigeriaData(data)
        const stateNames = data.map((data)=> data.state)
        setStates(stateNames);
        // console.log(stateNames);
      } catch (error) {
        console.error("Error loading data", error)
      }
    };
    getNigerianData()
  }, []);

  useEffect(() => {
    if (selectedState && nigeriaData.length > 0) {
      const stateData = nigeriaData.find((nigerian)=> nigerian.state === selectedState );
      if (stateData) {
        setLgas(stateData.lgas.map((lga)=> lga.name))
      }
    } else {
      setLgas([])
    }
  }, [selectedState, nigeriaData]);

  useEffect(()=>{
    onChange({
      ...formData,
      state : selectedState,
      city : selectedCity,
      saveAddress,
      hasAddress: Boolean(formData.address?.trim())
    })
  }, [formData, selectedState, selectedCity, saveAddress])


  return (
    <div>
        <form className="p-4 border border-[#E8E6E6] rounded-md">
            <h1 className="text-[24px] font-semibold pb-3">Customer Details</h1>
            <label className="text-[18px]" htmlFor="full name">Full Name</label>
            <input name="fullName"
        value={formData.fullName}
        onChange={handleChange} className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" type="text" placeholder="Enter your full name" />

            <div className="flex items-center justify-between gap-5 my-2">
              <div className="w-1/2">
                <label className="text-[18px]" htmlFor="">Email Address</label>
                <input  name="email"
            value={formData.email}
            onChange={handleChange} className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" type="email" placeholder="Enter your email address" />
              </div>
              <div className="w-1/2">
                <label className="text-[18px]" htmlFor="">Phone Number</label>
                <input  name="phone"
            value={formData.phone}
            onChange={handleChange} className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" type="tel" placeholder="+234" />
              </div>
            </div>

            <label className="text-[18px]" htmlFor="">Delivery Address</label>
            <input  name="address"
        value={formData.address}
        onChange={handleChange} className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" type="text" placeholder="Enter your delivery address" />

            <div className="flex items-center justify-between gap-5 my-2">
              <div className="flex flex-col w-1/2">
                <label className="text-[18px]" htmlFor="state">State</label>
                <select className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" value={selectedState} onChange={(e)=> {setSelectedState(e.target.value); setSelectedCity("")}} id="state">
                  <option value="">Please Select</option>
                  {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
                </select>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-[18px]" htmlFor="city">City</label>
                <select className="block w-full my-2 px-3 py-2 text-[#9F9E9E] border border-[#E8E6E6] rounded-md" value={selectedCity} onChange={(e)=> setSelectedCity(e.target.value)} disabled={!selectedState} id="city">
                  <option value="">Please Select</option>
                  {lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
                </select>
              </div>
            </div>

           <div className="flex items-center gap-2 pt-2">
             <input className="h-5 w-5 border border-[#E8E6E6] rounded-md" type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
             <p>Save my information for a faster checkout</p>
           </div>

        </form>
    </div>
  )
}
