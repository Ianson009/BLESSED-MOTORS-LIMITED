import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  
    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate()

    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    
    const handlesubmit=async(e)=>{
        e.preventDefault()
        setLoading("Please Wait...")
        setError("")

        
        const formData=new FormData()

        formData.append("email",email)
        formData.append("password",password)
        try {
            
        const response=await axios.post("https://ianson.alwaysdata.net/api/signin",formData);

        setLoading("")
        if (response.data.user){
            navigate("/getproduct")
            localStorage.setItem("user",JSON.stringify(response.data.user))
            setSuccess(response.data.message)
        }
        else{
            setError(response.data.message)
        }

        } catch (error) {
            setError(error.message)
            setLoading("")
            
        }
    }
    return(
        <div className="row mt-3 justify-content-center">
            <div className="col-md-6 card shadow p-4">
     <h2>Signin</h2>
     <form action="" onSubmit={handlesubmit}>
        {/* binding the variables */}

        <h4 className="text-success">{success}</h4>
        <h4 className="text-primary">{loading}</h4>
        <h4 className="text-danger">{error}</h4>

        <input type="email"placeholder="Enter email" className="form-control" required onChange={(e)=>setEmail(e.target.value) } /><br />
        <input type="password" placeholder="Enter password" className="form-control" required onChange={(e)=>setPassword(e.target.value)}/><br />
        <input type="submit" name="" id="" value="Signin" className="btn btn-outline-warning w-100" />
     </form>
     <p>I don't have an Account <Link to="/signup">Signup</Link></p>

            </div>
            
        </div>
    )
    }
    export default Signin 










