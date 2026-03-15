import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Restaurants from "../pages/Restaurants"
import Menu from "../pages/Menu"
import Cart from "../pages/Cart"
import Payment from "../pages/Payment"
import ProtectedRoute from "../components/ProtectedRoute"
import Navbar from "../components/Navbar"
import Orders from "../pages/Orders"


export default function AppRoutes(){

  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Restaurants/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant/:id" element={<Menu/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/payment/:orderId" element={<Payment/>}/>
        <Route path="/orders" element={<Orders/>}/>

      </Routes>

    </BrowserRouter>
  )

}