import axios from 'axios';
import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';


const Mpesa = () => {
  

  // extract the product received from get product using useLocation
  const {product}=useLocation().state ||{};
  const [phone,setPhone]=useState("")
  const[loading,setLoading]=useState("")
  const [message,setMessage]=useState("")
  console.log(product)


  // image url
  const imgurl="https://ianson.alwaysdata.net/static/images/"
  const handlesubmit=async(e)=>{
    e.preventDefault()
    setLoading("PLease wait as we process your request...")

const formData=new FormData()
formData.append("phone",phone);
formData.append("amount",product.product_cost);


const response=await axios.post("https://ianson.alwaysdata.net/api/mpesa_payment",formData)
setMessage(response.data.message)
setLoading("")

  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8 card shadow p-3 bg-success">

        <h3 className="text-white">Lipa na Mpesa</h3>
        <h2 className="text-primary">{loading}</h2>
        <h2 className="text-success">{message}</h2>


        <img src={imgurl+product.product_photo} alt="" />
        <div className="card-body">
          <h4 className="text-white">{product.product_name}</h4>
          <p className="text-white">{product.product_description}</p>
          <b className="text-warning">Cost:Kshs{product.product_cost}</b>

          <form action="" onSubmit={handlesubmit}>
            <input type="tell" placeholder="+2540710105588" className="form-control" onChange={(e)=>setPhone(e.target.value)} /><br />
            <input type="submit" value="make payment" className="btn btn-outline-warning w-100" />
          </form>
 
         
     
        </div>
      </div>
    </div>
   
  )
}

export default Mpesa


