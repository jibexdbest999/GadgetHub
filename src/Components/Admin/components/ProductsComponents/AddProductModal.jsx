import React, { useState, useEffect, useContext } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import Button from "../../../Button"
import AddedSuccessModal from "./AddedSuccessModal"
import { AdminContext } from '../../../../Context/AdminContext'

export default function AddProductModal({showModal, setShowModal}) {
      const { addProduct } = useContext(AdminContext);
      const [showSuccess, setShowSuccess] = useState(false);

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [product, setProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: ""
    })
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev,[name]: value }))
    }
    const handleFile = (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }

    const handleDrop = (e) => {
     e.preventDefault()
     handleFile(e.dataTransfer.files[0])
    }

    const handleDragOver = (e) => {
     e.preventDefault()
    }
    const handleFileInput = (e) => {
     handleFile(e.target.files[0])
    }





    const [specs, setSpecs] = useState([
     { key: "", value: "" }])

    if (!showModal) return null;
    const closeModal = ()=>{
        setShowModal(false)
    }
    const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }])
    }

    const updateSpec = (index, field, value) => {
     const updatedSpecs = [...specs]
     updatedSpecs[index][field] = value
     setSpecs(updatedSpecs)
    }

    const removeSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index))
    }
    const handleSubmit = async (e) => {
     e.preventDefault()

     const specifications = {}
      specs.forEach(spec => {
        if (spec.key && spec.value) {
        specifications[spec.key] = spec.value
       }
      })

     const formPayload = new FormData()
      formPayload.append("image", image)
      formPayload.append("name", formData.name)
      formPayload.append("description", formData.description)
      formPayload.append("category", formData.category)
      formPayload.append("brand", formData.brand)
      formPayload.append("price", formData.price)
      formPayload.append("specifications", JSON.stringify(specifications))
      try {
      const createdProduct = await addProduct(formPayload);
      setShowSuccess(true);
      setProduct(createdProduct); 
      setFormData({ name: "", description: "", category: "", brand: "", price: "" });
      setImage(null);
      setPreview(null);
      setSpecs([{ key: "", value: "" }]);
      } catch (error) {
      console.error(error);
      }
    }


    useEffect(() => {
     return () => {
    if (preview) URL.revokeObjectURL(preview)
    }}, [preview])






  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" >
        {showSuccess && (<AddedSuccessModal     setShowSuccess={setShowSuccess}
        onClose={() => setShowModal(false)} product={product}/>)}

        <div className="bg-white rounded-xl shadow-lg w-[99%] max-w-md relative max-h-[600px] overflow-y-auto">
            <div className="p-6">
                <h1 className="text-[22px] font-semibold">Add New Product</h1>
                <button className="absolute top-3 right-5" onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="border-t border-b border-[#E7E4E4] py-5 px-6" action="">
                <label className="text-[14px] font-semibold" htmlFor="name">Product Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 h-11 rounded-md text-[#A3A2A2] border my-2" placeholder="Enter product name" type="text" />

                <label className="text-[14px] font-semibold" htmlFor="description">Product Description *</label>
                <input  name="description" value={formData.description} onChange={handleChange}  className="w-full p-3 h-11 rounded-md text-[#A3A2A2] border my-2" placeholder="Enter product description" type="text" />

                <div className="w-full flex justify-between gap-5">
                    <div className="w-1/2">
                         <label className="text-[14px] font-semibold" htmlFor="category">Category *</label>
                         <select  name="category" value={formData.category} onChange={handleChange}  className="w-full p-3 h-11 rounded-md text-[#A3A2A2] border my-2">
                            <option value="">Select Category</option>
                              <option value="SmartPhones">Smart Phones</option>
                              <option value="Wearables">Wearables</option>
                              <option value="Laptops">Laptops</option>
                              <option value="Accessories">Accessories</option>
                              <option value="Gaming">Gaming</option>
                              <option value="SmartHomes">Smart Homes</option>

                         </select>

                    </div>
                      <div className="w-1/2">
                         <label className="text-[14px] font-semibold" htmlFor="brand">Brand Name *</label>
                         <input name="brand"
                         value={formData.brand}
                         onChange={handleChange}
                         placeholder="Enter brand" 
                         className="w-full p-3 h-11 rounded-md text-[#A3A2A2] border my-2" type="text" />

                    </div>
                </div>

                <label className="text-[14px] font-semibold" htmlFor="price">Price *</label>
                <input
                name="price"
                value={formData.price} onChange={handleChange} className="w-full p-3 h-11 rounded-md text-[#A3A2A2] border my-2" placeholder="Enter product price" type="number"/>

                
                <p className="text-[14px] font-semibold mt-4 mb-2"> Product Specification</p>
                <div className="flex flex-col gap-3">{specs.map((spec, index) => (<div key={index} className="flex gap-3 items-center">
                     <input type="text" placeholder="Spec name (e.g Display)" className="w-1/2 p-3 h-11 rounded-md border text-sm" value={spec.key} onChange={(e)=> updateSpec(index, "key", e.target.value) }/>
                     <input
                     type="text" placeholder="Spec value (e.g 6.7 OLED)" className="w-1/2 p-3 h-11 rounded-md border text-sm" value={spec.value} onChange={(e) => updateSpec(index, "value", e.target.value) }/>{specs.length > 1 && (
                         <button type="button" onClick={() => removeSpec(index)} className="text-red-500 text-sm" > ✕ </button> )}</div>))}</div>
                         
                         <button type="button" onClick={addSpec} className="mt-3 text-[#6C4CF1] text-sm font-semibold"> + Add Specification</button>

                <label className="text-[14px] font-semibold block my-2" htmlFor="image">Product Image *</label>

                <div
                onDrop={handleDrop}
                onDragOver={handleDragOver} className="border border-[#E6EFF5] rounded-md p-6 text-center cursor-pointer hover:bg-[#F3F0FF] transition"
                onClick={() => document.getElementById("imageUpload").click()}>
                    {preview ? (
                         <img src={preview} alt="Preview"
                         className="mx-auto h-[126px] w-[577px] object-contain"/>) : ( 
                         <div className="flex flex-col mx-auto items-center justify-center gap-2">
                         <span><IoCloudUploadOutline size={30} /></span>
                         <p className="text-[14px] text-[#494747]"> Drag & drop product image here or click to upload (JPG/PNG, max 5mb)</p>
                         </div>)
                    }
                    <input id="imageUpload" type="file" accept="image/*" hidden onChange={handleFileInput}/>
                </div>

            <div  className="flex justify-between gap-8 py-5 px-6">
                <Button type="submit" className="text-white hover:bg-[#6b51cf] h-12 w-[267px]" content="Update Product" />
                <button type="button" onClick={closeModal}  className="text-[#EE2020] border border-[#EE2020] h-12 w-[267px] hover:text-[white] hover:bg-[#EE2020] rounded-md">Cancel</button>

            </div>
            </form>

        </div>
    </div>
  )
}
