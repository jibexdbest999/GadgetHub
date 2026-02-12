import React from 'react'
import PropTypes from "prop-types"

export default function SalesCard({id, name, image, displayPrice, description, oldPrice}) {
  return (
    <div className="p-4 flex bg-white items-center gap-[24px] rounded-md w-[370px] h-[126px]">

        <img loading="lazy" className="border-1 border-[#E3E3E3] w-[90px] h-[90px]" src={image} alt={name} />

        <div className="gap-4">
        <p className="text-[16px] font-semibold ">{name}</p>
        <p className="text-[#5F6C72] text-[14px]">{description}</p>
        <div className="flex items-center gap-5">
            <p className="text-[#EA4335] text-[18px] font-semibold">{displayPrice}</p>
            <p className="text-[#5F6C72] text-[12px] line-through ">{oldPrice}</p>
        </div>
        </div>

    </div>
  )
}
SalesCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    displayPrice: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
}