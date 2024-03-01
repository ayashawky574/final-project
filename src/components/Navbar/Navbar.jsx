import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/TokenContet'
import { cartContext } from '../../context/cartContext';
export default function Navbar() {
  let {setToken,userToken} = useContext(userContext);
  let {cartNumber ,getToCart,setCartNumber}=useContext(cartContext)
  let navigate =useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/signin")
  } useEffect(()=>{
    (async()=>{
     let data= await getToCart()
    setCartNumber(data.data.numOfCartItems)
   })()},[])
  return (
    <>
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
    >
      <div className="container">
        <Link className="navbar-brand" href="#">
        <i class="fa-solid fa-cart-shopping mainColor mx-2"></i>
          <span className='fw-bold'>FreshCart</span></Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ?
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            
          <li className="nav-item">
            <Link className="nav-link " to="/home">Home</Link>
          </li>
        
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/brands">Brands</Link>
          </li>
          
        </ul> : ""}
          
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

          {
            userToken == null ? 
            <>
                        <li className="nav-item">
              <Link className="nav-link " to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/Signup">Login</Link>
            </li>
            </>
            :""
          }

            {userToken !== null ? <>
              <li className='nav-item d-flex align-items-center'>
           <i class="fa-brands fa-instagram mx-2"></i>
           <i class="fa-brands fa-facebook mx-2"></i>
           <i class="fa-brands fa-tiktok mx-2"></i>
           <i class="fa-brands fa-twitter mx-2"></i>
           <i class="fa-brands fa-linkedin mx-2"></i>
           <i class="fa-brands fa-youtube mx-2"></i>
           </li>
           <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <i className='fa-solid fa-shopping-cart mainColor'></i>
              <span className='badge bgColor text-light'>{cartNumber}</span>
            </Link>
          </li>
           <li onClick={()=>{logout()}} className="nav-item">
              <Link className="nav-link " to="/Signup">Logout</Link>
            </li>
            </> :""}
            
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}
