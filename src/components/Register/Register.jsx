import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  
  const [isloading , setloading] = useState(false)
  const [errMsg , setErr] = useState(null)
  let navigate = useNavigate()
    let phonereg = /^01[0-9]{9}$/
  let x =Yup.object({
    name : Yup.string().min(3,"min name is 3").max(10, "max name is 10").required("name is requried"),
    phone : Yup.string().matches(phonereg , "phone is invalid").required('phone is required'),
    email : Yup.string().email("email is invalid").required("email is required"),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{5}$/).required("password is required"),
    rePassword : Yup.string().oneOf([Yup.ref('password')] , "not match").required("rePassword is required")
  })
  async function signup(values){
    setloading(true)
  let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values).catch((error)=>{
   setErr(error.response.data.message)
   setloading(false)
  })
 if(data.message == "success"){
  navigate("/signin")
 }
isloading(false)
}
  // function validate(values){
  //   let errors={};
  //   let phonereg = /^01[0-9]{9}$/
  //   let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //   if(!values.name){
  //     errors.name="name is required";
  //   }else if(values.name.length <3){
  //     errors.name="name min length is 3";
  //   }else if(values.name.length > 10){
  //     errors.name = "name max length is 10";
  //   }
  //   if(!values.phone){
  //     errors.phone="phone is required";
  //   }else if(!phonereg.test(values.phone)){
  //     errors.phone= "phone is invaled"
  //   }
  //   return errors;
  // }
  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:"",
      password:"",
      rePassword:''
    },validationSchema: x,
    onSubmit:signup
  })
  return (
    <div className='w-75 m-auto  p-4 shadow bg-light my-5'>
      <h2 className='mainColor text-center'>Register Now</h2>
    <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
      <label htmlFor="name" >Name :</label>
      <input id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="name" type="text" value={formik.values.name} />
      {formik.errors.name && formik.touched.name ? <div><span className='text-danger mb-2'>{formik.errors.name}</span></div>:""}
      <label htmlFor="name" >Phone :</label>
      <input id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="phone" type="tel" value={formik.values.phone} />
      {formik.errors.phone && formik.touched.phone ?<div><span className='text-danger mb-2' >{formik.errors.phone}</span></div> : "" }
      <label htmlFor="email" >Email :</label>
      <input id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="email" type="email" value={formik.values.email} />
      {formik.errors.email && formik.touched.email ?<div><span className='text-danger mb-2' >{formik.errors.email}</span></div> : "" }
      
      <label htmlFor="password" >Password :</label>
      <input id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="password" type="password" value={formik.values.password} />
      {formik.errors.password && formik.touched.password ?<div><span className='text-danger mb-2' >{formik.errors.password}</span></div> : "" }
      <div>
      <label htmlFor="repassword" >rePassword :</label>
      <input id='repassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name="rePassword" type="password" value={formik.values.rePassword} />
      {formik.errors.rePassword && formik.touched.rePassword ?<div><span className='text-danger mb-2' >{formik.errors.rePassword}</span></div> : "" }
      </div>
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
     
     <p className="text-muted mt-3">I have account <Link to="/signin" className="mainColor fw-bold">Login</Link></p>
      
        </form>
    </div>
  )
}
