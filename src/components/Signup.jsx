import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
  
    // states
    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState("")
    const [error,setError]=useState("")

    // variables to hold user input
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const navigate=useNavigate()




    



    // function to submit the details to the server
    const handlesubmit=async(e)=>{
      e.preventDefault()
      setLoading("Please wait...")
      setError("")
    //   formdata
    const formData=new FormData()
    formData.append("username",username)
    formData.append("email",email)
    formData.append("password",password)
    formData.append("phone",phone)

   const submit = async (e)=>{
    e.preventDefault();
    setLoading("Please wait as we apload your data")
   }

    try {
        const data =new FormData()
        data.append("username",username)
        data.append("email",email)
        data.append("password",password)
        data.append("phone",phone)

        const response=await axios.post("https://ianson.alwaysdata.net/api/signup",formData)
        setLoading("")
        setSuccess(response.data.success)
        
    } catch (error) {
        setLoading("")
        setError(error.message)
        
    }

    }
    return(
        <div className="row mt-4 justify-content-center">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign up</h2>
                
                {/* form */}
                <form action="" onSubmit={handlesubmit}>
                    {/* binding states */}

             <h4 className="text-primary">{success}</h4>
             <h4 className="text-secondary">{loading}</h4>
             <h4 className="text-danger">{error}</h4>

                    <input type="text" placeholder="Enter Username" className="form-control" onChange={(e)=>setUsername(e.target.value)}/><br />
                    <input type="email" placeholder="Enter Email" className="form-control"  onChange={(e)=>setEmail(e.target.value)}/><br />
                   <input type="password" placeholder="Enter password" className="form-control" onChange={(e)=>setPassword(e.target.value)} /><br />
                    <input type="tel" placeholder="Enter phone number" className="form-control" onChange={(e)=>setPhone(e.target.value)} /><br />
                    <button type="submit" className="btn btn-outline-warning w-100">Signup</button><br />
                </form>
                <p>Already have an Account <Link to="/signin">Signin</Link></p>
            </div>
            
        </div>
    )

}

export default Signup