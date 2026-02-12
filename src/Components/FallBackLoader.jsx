import React from 'react'
import { BounceLoader } from "react-spinners"

export default function FallBackLoader() {
  return (
    <div className="flex flex-col mx-auto items-center justify-center h-screen"><BounceLoader color="#6C4CF1" size={100} />
  <p className="text-lg lg:text-3xl pt-2 font-semibold">Loading...</p></div>
  )
}
