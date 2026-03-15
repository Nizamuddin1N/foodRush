import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Restaurants from "../pages/Restaurants"
import Menu from "../pages/Menu"

export default function AppRoutes(){

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Restaurants/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant/:id" element={<Menu/>}/>
        <Route path="/signup" element={<Signup />} />

      </Routes>

    </BrowserRouter>
  )

}