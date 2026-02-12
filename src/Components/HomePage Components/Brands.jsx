import React from 'react'
import Sony from "../../assets/Sony.png"
import Apple from "../../assets/Apple.png"
import Samsung from "../../assets/Samsung.png"
import Oraimo from "../../assets/Oraimo.png"
import HP from "../../assets/Hp.png"
import Bose from "../../assets/Bose.png"

export default function Brands() {
    const brands = [Sony,Apple,Samsung,Oraimo,HP,Bose]

  return (
    <div className="container mx-auto flex flex-col px-5 py-10 hidden lg:flex">
       <div className="flex flex-col justify-center">
         <h1 className="text-[28px] font-semibold">Trusted Brands</h1>
        <p className="text-[18px]">We partner with the world's leading technology brands</p>
       </div>
        <div className="flex justify-between items-center gap-5">
            {brands.map((brand,index)=>{
                const styles = [
                    { width: "138px", },
                    {  height:"75px" },
                    { width: "158px",},
                    { width: "110px",},
                    { height: "74px",},
                    { width: "159px", height:"" }];
                return <img loading="lazy" key={index} src={brand} style={styles[index]} alt="" />
            })}
        </div>
    </div>
  )
}
