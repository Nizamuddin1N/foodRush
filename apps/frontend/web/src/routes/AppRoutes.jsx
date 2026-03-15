import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Restaurants from "../pages/Restaurants"
import Menu from "../pages/Menu"
import Cart from "../pages/Cart"
import Payment from "../pages/Payment"
import Orders from "../pages/Orders"
import Navbar from "../components/Navbar"
import ProtectedRoute from "../components/ProtectedRoute"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public browsing */}
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Menu />} />
        

        {/* Protected routes */}
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/payment/:orderId" element={
          <ProtectedRoute><Payment /></ProtectedRoute>
        } />
        <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}