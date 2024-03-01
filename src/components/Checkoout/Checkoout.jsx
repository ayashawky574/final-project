import { useFormik } from 'formik'
import React, { useContext,useEffect, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/TokenContet';
import { cartContext } from '../../context/cartContext';
export default function Checkoout() {
  let {checkoutPayment,getToCart} =useContext(cartContext)
  let id ="65d3a588fd7fcd003463a4a6"
  const [cartid,setcartid]=useState("")
  useEffect(()=>{
    (async()=>{
     let data= await getToCart()
   setcartid(data.data.data._id)
   })()},[])
  const [isloading , setloading] = useState(false)
  const [errMsg , setErr] = useState(null)
    async function payment(value){
    let data= await checkoutPayment(cartid,value)
    if(data.data.status == "success"){
      window.location = data.data.session.url
    }
  }
    
    let formik = useFormik({
      initialValues:{
        details:'',
        city:"",
        phone:""
      },
      onSubmit:payment
    })
    return (
      <div className='w-75 m-auto  p-4 shadow bg-light my-5'>
        <h2 className='mainColor text-center'>Payment form</h2>
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
       <label htmlFor="details" >details</label>
        <input id='details' onChange={formik.handleChange}  className='form-control mb-2' name="details" type="text" value={formik.values.details} />
        
        <label htmlFor="city" >city</label>
        <input id='city' onChange={formik.handleChange}  className='form-control mb-2' name="city" type="text" value={formik.values.city} />
        
        <label htmlFor="phone" >phone</label>
        <input id='phone' onChange={formik.handleChange}  className='form-control mb-2' name="phone" type="tel" value={formik.values.phone} />
        
       
       
        <button
         type="submit"  
         className="btn btn-success text-white">
          Pay
         
         </button> 
       
        
          </form>
      </div>
    
  
  )
}
