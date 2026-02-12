import React from 'react'
import Button from "../Button"
import { GoTrash } from "react-icons/go";

export default function DeleteAcctModal({ onDelete,showModal, setShowModal}) {
      if (!showModal) return null;
    
    const closeModal = () => {
    setShowModal(false)
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md p-6 text-center flex flex-col items-center gap-3">
        <span className="bg-[#FFF1F1] text-[#EE2020] rounded-full h-[99px] w-[99px] flex items-center justify-center">
          <GoTrash size={50} />
        </span>

        <p className="text-[28px] font-semibold">Delete Account</p>
        <p className="text-[20px] text-[#686565]">
          Are you sure you want to delete your account?
        </p>

        <div className="flex gap-4">
          <Button
            onClick={onDelete}
            className="w-[156px] h-10 text-white bg-[#EE2020] hover:bg-[#9a1d1d]"
            content="Delete Account"
          />
          <button
            onClick={closeModal}
            className="w-[109px] h-10 text-[#A3A2A2] border border-[#A3A2A2] rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

