import React, { useState, useContext } from 'react'
import DeleteAcctModal from "../SettingsComponents/DeleteAcctModal"
import { AuthContext } from "../../Context/AuthContext"
import { toast } from "react-toastify"

export default function Settings() {
  const [ showModal, setShowModal ] = useState(false)
  const { deleteAccount } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await deleteAccount();
      setShowModal(false);
      toast.error("Account deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div>
      <h1 className="text-[24px] font-semibold">Account Settings</h1>
      <p className="text-[#807D7E] text-[16px]">Manage your preferences and security</p>
      <div className="my-6">
        <div className="border border-[#E6EFF5] rounded-md p-4">
          <h1 className="text-[18px]">Security Settings</h1>
        <button className="text-[#6C4CF1] underline pt-2">Change Password</button>
        </div>
      </div>

      <div>
        <div className="border border-[#E6EFF5] rounded-md p-4">
          <h1 className="text-[18px] pb-2">Notification</h1>
          <div className="flex justify-between items-center pb-2">
            <label htmlFor="order-toggle">Order Updates</label>
            
            <div className="toggle-container">
            <input id="order-toggle" name="orderUpdates" className="toggle-input" type="checkbox"/>
            <label htmlFor="order-toggle" className="toggle-label"></label>
            </div>
          </div>

           <div className="flex justify-between items-center">
            <label htmlFor="offer-toggle">Promotion & Offers</label>
            
            <div className="toggle-containerOffer">
            <input id="offer-toggle" name="promoOffers" className="toggle-inputOffer" type="checkbox"/>
            <label htmlFor="offer-toggle" className="toggle-labelOffer"></label>
            </div>
          </div>

           <div className="flex justify-between items-center pt-2">
            <label htmlFor="reminder-toggle">App Reminders</label>
            
            <div className="toggle-containerReminder">
            <input id="reminder-toggle" name="reminder" className="toggle-inputReminder" type="checkbox"/>
            <label htmlFor="reminder-toggle" className="toggle-labelReminder"></label>
            </div>
          </div>

        </div>
      </div>

      <div className="my-4">
        <div className="border border-[#E6EFF5] rounded-md p-4">
          <h1 classNmae="font-semibold text-[#EE2020]">Danger Zone</h1>
          <div className="bg-[#FFEDED] px-3 py-2 my-2">
            <h1>Once you delete your account, there is no going back. Please be certain.</h1>
            <button onClick={() => setShowModal(true)}
            className="bg-[#EE2020] rounded-md h-11 w-35 text-white my-2">Delete Account </button>
          </div>
        </div>
      </div>

      {<DeleteAcctModal
        onDelete={handleDelete}
        showModal={showModal}
        setShowModal={setShowModal}
      />}
    </div>
  )
}
