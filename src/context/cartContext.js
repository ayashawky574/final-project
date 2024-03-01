import axios from "axios";
import { createContext, useState } from "react";

export let cartContext=createContext();
export default function CartContextProvider(props){
    const [cartNumber ,setCartNumber] = useState(0)
    let BaseUrl = `https://ecommerce.routemisr.com`;
    let header={
        token : localStorage.getItem('userToken')
    }
   
    function addToCart(id){
        return axios.post(`${BaseUrl}/api/v1/cart`,{
            productId:id
        },
        {
            headers:header
        })
    }
    function getToCart(){
        return axios.get(`${BaseUrl}/api/v1/cart`,
          
        {
            headers:header
        })
    } function updateCart(id,count){
        return axios.put(`${BaseUrl}/api/v1/cart/${id}`,{
            count:count
        },
        {
            headers:header
        })
    }
    
    function deleteCart(id){
        return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
        {
            headers:header
        })
    }
    function checkoutPayment(id ,formdata){
        return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
       {
        shippingAddress:formdata
       }, {
            headers:header
        })
    }
    return <cartContext.Provider value={{addToCart ,setCartNumber ,cartNumber,getToCart,updateCart,deleteCart,checkoutPayment}}>
        {props.children}
    </cartContext.Provider>

}