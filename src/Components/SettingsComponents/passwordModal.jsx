import React from 'react'

export default function passwordModal({showModal, setShowModal, }) {
  if (!showModal) return null;
    
    const closeModal = () => {
    setShowModal(false)
  };

  return (
    <div>
        <div className="">
            <button
            className="absolute top-3 right-5 text-gray-600 hover:text-black"
            onClick={closeModal}
          >
            ✕
          </button>
          <form action="">
            <label htmlFor="currentPassword">Current Password</label>
            <input className="w-full h-4 rounded-md px-3" type="password" />


          </form>
        </div>
    </div>
  )
}
