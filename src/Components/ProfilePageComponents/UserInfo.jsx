import React, { useContext } from 'react'
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "../../Context/AuthContext"
import { AiOutlineCamera } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";

export default function UserInfo() {
  const { user } = useContext(AuthContext);
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const defaultAddress = user?.addresses?.find(a => a.isDefault);

  // const handleSaveAddress = ()=>{

  // }


  return (
    <div>
      <h1 className="text-[24px] font-semibold">My Info</h1>
      <p className="text-[#807D7E] text-[16px]">Manage your personal information and addresses</p>

      <div className="my-6">
        <div className="border border-[#E6EFF5] rounded-md p-4">
          <div className="relative">
            <h1 className="text-[18px] font-semibold">Profile Information</h1>
            <button className="bg-[#FFF2F2] rounded-xl w-[68.99px] h-[25px] text-[#E60E0E] text-[12px] flex items-center gap-1 justify-center absolute top-2 right-3">
              <CiEdit /> Edit
            </button>
          </div>

          <div>
            <div className="w-[100px] h-[100px] relative rounded-full py-4">
              <img
              loading="lazy"
                className="w-[100px] h-[100px] rounded-full"
                src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"}
                alt=""
              />
              <button className="bg-[#6C4CF1] rounded-full w-8 h-8 flex items-center justify-center absolute -bottom-5 right-2 text-white">
                <AiOutlineCamera size={20} />
              </button>
            </div>

            <form className="pt-8">
              <label className="text-[#494747] text-[14px] py-2" htmlFor="name">Full Name</label>
              <p className="border border-[#E6EFF5] rounded-md py-2 px-3 text-[#191C1F] h-11">{fullName}</p>

              <div className="flex flex-col lg:flex-row justify-between gap-4 items-center w-full py-3">
                <div className="w-full lg:w-1/2">
                  <label className="text-[#494747] text-[14px] py-2" htmlFor="email">Email Address</label>
                  <p className="border border-[#E6EFF5] rounded-md py-2 px-3 text-[#191C1F] h-11 w-full">{user.email}</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label className="text-[#494747] text-[14px] py-2" htmlFor="phoneNumber">Phone Number</label>
                  <p className="border border-[#E6EFF5] rounded-md py-2 px-3 text-[#191C1F] h-11 w-full">{user.phoneNumber}</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="border border-[#E6EFF5] rounded-md p-4 my-4">
          <h1 className="text-[18px] font-semibold">Saved Address</h1>
          {defaultAddress ? (
            <div className="border border-[#E6EFF5] p-4 rounded-md mt-3">
              <div className="flex gap-3 items-start">
                <IoLocationOutline size={40} />
                <div>
                  <p className="font-semibold">Home</p>
                  <span className="bg-[#F7F1F1] rounded-full px-3 py-1 text-xs">Default</span>
                  <p>{`${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state}`}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button className="border border-[#E8E6E6] rounded-xl w-[68.99px] h-[25px] text-[12px] font-semibold flex items-center gap-1 justify-center">
                  <CiEdit /> Edit
                </button>
                <button className="bg-[#FFF2F2] text-[#E60E0E] rounded-xl w-[68.99px] h-[25px] text-[12px] font-semibold flex items-center gap-1 justify-center">
                  <GoTrash /> Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="border border-[#E6EFF5] p-4 rounded-md text-gray-600 mt-3">No address available</p>
          )}
          <button className="text-[#6C4CF1] pt-3">+ Add New Address</button>
        </div>

        <div className="border border-[#E6EFF5] rounded-md p-4 my-4">
          <h1 className="text-[18px] font-semibold">Payment methods</h1>
          <div className="border border-[#E6EFF5] p-4 rounded-md mt-3">
            No payment card added
          </div>
          <button className="text-[#6C4CF1] pt-3">+ Add New Payment card</button>
        </div>
      </div>
    </div>
  );
}