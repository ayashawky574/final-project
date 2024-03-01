
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Navbar from "./components/Navbar/Navbar";
import Notfound from "./components/Notfound/Notfound";
import Details from "./components/Details/Details";
import Categories from "./components/Categories/Categories";
import Allorders from './components/Allorder/Allorders';
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserContextProvider from './context/TokenContet';
import CartContextProvider from './context/cartContext';
import Checkoout from "./components/Checkoout/Checkoout"
import { ToastContainer } from 'react-toastify';
const router =createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'navbar',element:<ProtectedRoute><Navbar/></ProtectedRoute>},
    {path:'notfound',element:<ProtectedRoute><Notfound/></ProtectedRoute>},
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute><Checkoout/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'signin',element:<Signin/>},
    {path:'signup',element:<Signup/>},
    {path:'register',element:<Register/>},
    {path:'*',element:<Notfound/>},

  ]}
])
function App() {
  
  return (
    <CartContextProvider>
   <UserContextProvider>
    <RouterProvider router={router}/>
         <ToastContainer/>

   </UserContextProvider>
   </CartContextProvider>
  );
}

export default App;
