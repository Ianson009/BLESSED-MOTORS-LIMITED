import axios from 'axios'
import React, { useState } from 'react'

const Addproduct = () => {

    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState("")
    const [error,setError]=useState("")

    // variables
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [cost,setCost]=useState("")
    const [photo,setPhoto]=useState("")
    
    // handle submit
    const handlesubmit=async(e)=>{
        e.preventDefault()
        setLoading("Please wait...")
        setError("")

        const formData=new FormData()
        formData.append("product_name",name)
        formData.append("product_description",description)
        formData.append("product_cost",cost)
        formData.append("product_photo",photo)

        try {
        const response=await axios.post("https://ianson.alwaysdata.net/api/add_product",formData)
        setLoading("")
        console.log(response)
         
        setSuccess(response.data.message)
            
        } catch (error)  {
            setLoading("")
            setError(error.message)
            console.log(error)
            
        }
       }


  return (
    <div className="row justify-content-center mt-3">
    <div className="col-md-6 card shadow p-4">
        <form action=""onSubmit={handlesubmit}>
            <h2>Add Product</h2>


            <h4 className="text-primary">{success}</h4>
            <h4 className="text-secondary">{loading}</h4>
            <h4 className="text-danger">{error}</h4>


            <input type="text" placeholder="Enter product name" className="form-control" onChange={(e)=>setName(e.target.value)} /> <br />
            <input type="text" placeholder="Enter product description" className="form-control" onChange={(e)=>setDescription(e.target.value)}/> <br />
            <input type="text" placeholder="Enter product cost" className="form-control" onChange={(e)=>setCost(e.target.value)} /> <br />
            <input type="file" className="form-control" accept="image/" onChange={(e)=>setPhoto(e.target.files[0])}/> <br />
            <input type="submit" value="Add product"className="w-100 btn-outline-warning"/><br />




        </form>

        </div>
    </div>
  )

}
export default Addproduct