import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/TokenContet';
export default function Signin() {
   let {setToken}= useContext(userContext)
    const [isloading , setloading] = useState(false)
    const [errMsg , setErr] = useState(null)
    let navigate = useNavigate()
      let phonereg = /^01[0-9]{9}$/
    let x =Yup.object({
      email : Yup.string().email("email is invalid").required("email is required"),
      password : Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"enter avalid number").required("password is required"),
    })
    async function signin(values){
      setloading(true)
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values).catch((error)=>{
     setErr(error.response.data.message)
     setloading(false)
    })
   if(data.message == "success"){
    navigate("/home");
    localStorage.setItem("userToken" , data.token)
    setToken(data.token)
    setloading(false)

   }
  }
    
    let formik = useFormik({
      initialValues:{
        phone:'',
        email:"",
      },validationSchema: x,
      onSubmit:signin
    })
    return (
      <div className='w-75 m-auto  p-4 shadow bg-light my-5'>
        <h2 className='mainColor text-center'>Login</h2>
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
       <label htmlFor="email" >Email :</label>
        <input id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="email" type="email" value={formik.values.email} />
        {formik.errors.email && formik.touched.email ?<div><span className='text-danger mb-2' >{formik.errors.email}</span></div> : "" }
        
        <label htmlFor="password" >Password :</label>
        <input id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="password" type="password" value={formik.values.password} />
        {formik.errors.password && formik.touched.password ?<div><span className='text-danger mb-2' >{formik.errors.password}</span></div> : "" }
        
       
        {errMsg !== null ? 
        <p className='text-danger'>{errMsg}</p>: ""}
        <button
         disabled={!(formik.isValid && formik.dirty)} 
         type="submit"  
         class="btn " 
         className="btn btn-success text-white">
          Register
          {isloading ? 
            <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
            </span>
          :""}
        
         </button> 
       
       <p className="text-muted mt-3">I have account <Link to="/register" className="mainColor fw-bold">Register</Link></p>
        
          </form>
      </div>
    
  )
}
