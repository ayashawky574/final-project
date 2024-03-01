import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
 const [data,setdata] =useState([])
 const [cartPrice,setPrice] =useState([])
 let {getToCart,updateCart,deleteCart,setCartNumber}= useContext(cartContext)
 useEffect(()=>{
  (async()=>{
   let data= await getToCart()
  setdata(data.data.data.products)
  setPrice(data.data.data.totalCartPrice)
 })()},[])
async function removeProduct(id){
  let data = await deleteCart(id)
  setdata(data.data.data.products)
  setCartNumber(data.data.numOfCartItems)

 }
async function updateProduct(id , count){
  if (count ==0) {
    deleteCart(id)
  }else{  let data = await updateCart(id,count)
    setdata(data.data.data.products)
    setCartNumber(data.data.numOfCartItems)}


 }
  return (
       <div className='container'>
      <h2>Shopping Cart</h2>
      <Link to="/checkout" className='text-end'>
        <button className='btn bgColor text-light'>Onlinepayment</button>
      </Link>
        <div className="row">
          <div className="col-md-11 bgColor-light shadow p-5 m-auto my-5">
            <h3><span className='mainColor fw-bold'>Total Price</span> {cartPrice}</h3>
            {data.map((product)=>{
                return <div className="row border-bottom py-5" key={product._id}>
                  <div className="col-md-2">
                    <img src={product.product.imageCover} alt="cover" className='w-100' />
                  </div>
                  <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <div>
                    <h5>{product.product.title}</h5>
                    <p>{product.price}</p>
                    <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'> Remove</i></button>
                    </div>
                    <div>
                  <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className='btn btn-outline-success'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className='btn btn-outline-success'>-</button>

                  </div>
                  </div>
               
                </div>
            })}
          </div>
        </div>
    </div>
   
  )
}
