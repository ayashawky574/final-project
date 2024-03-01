import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {cartContext} from "../../context/cartContext"
import {toast} from "react-toastify"

export default function Details() {
  let {addToCart,setCartNumber}=useContext(cartContext)

  const [prodDetails , setDetails] = useState(null)
  let params = useParams()
  let productId = params.id
  async function getProduct(){
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  setDetails(data.data)
  }
  async function addTomyCart(id){
    let {data}=  await addToCart(id)
    if(data.status == "success"){
      console.log("hi");
      toast(data.message);
      setCartNumber(data.numOfCartItems)
    }
    }
  useEffect(()=>{
    getProduct()
  },[])
  return (
    <div className='container'>
      <div className="row p-5">
        <div className="col-md-3">
          <img src={prodDetails?.imageCover} alt="cover" className='w-100'/>
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <h2>
            {prodDetails?.title}
          </h2>
          <p>
            {prodDetails?.description}
          </p>
          <div>
            <div className='d-flex flex-column justify-content-between'>
            <p>{prodDetails?.category.name}</p>
            <p><span className='mainColor'>Price</span>{prodDetails?.price}</p>
            <p><span className='mainColor'>{prodDetails?.ratingsAverage}</span><i className='fa-solid fa-star ratingColor'></i></p>
            </div>
            

            <button className='btn bgColor text-light w-100' onClick={()=>{addTomyCart(prodDetails._id)}}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
