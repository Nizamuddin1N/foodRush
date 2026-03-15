import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { token, logout, role } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow">
            <span className="text-xl">🍕</span>
          </div>
          <span className="text-xl font-bold text-gray-900">FoodRush</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Link
                to="/orders"
                className="text-gray-600 hover:text-orange-500 font-medium text-sm transition hidden sm:block"
              >
                My Orders
              </Link>
              <Link to="/profile"className="text-gray-600 hover:text-orange-500 font-medium text-sm transition hidden sm:block">
                Profile
              </Link>
              {/* ← ADD THIS BLOCK HERE */}
              {role === "RESTAURANT" && (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-orange-500 font-medium text-sm transition hidden sm:block"
                >
                  Dashboard
                </Link>
              )}

              <Link to="/cart" className="relative">
                <div className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-xl transition">
                  <span>🛒</span>
                  <span className="text-sm">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 font-medium text-sm transition px-3 py-2 rounded-xl hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-500 font-medium text-sm transition px-4 py-2 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition shadow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}