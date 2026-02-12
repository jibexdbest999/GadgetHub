import React from 'react'
import Logo from "../assets/GadgetHub Logo.png"
import PropTypes from "prop-types"

export default function ResetLayout({title, description,children,}) {
  return (
    <div  className="flex flex-col justify-center items-center h-screen w-full px-5 lg:px-10 pt-5">
        <div className="flex flex-col justify-center items-center borderStyle rounded-md  p-5 lg:p-10">
            <img loading="lazy" src={Logo} alt="GadgetHub Logo" />
            <h1 className="text-[24px] font-semibold pt-8">{title}</h1>
            <p className="text-[16px] lg:w-[406px] text-center">{description}</p>
            <div className="w-full pt-5">
                {children}
            </div>
        </div>
    </div>
  )
}

ResetLayout.PropTypes = {
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}