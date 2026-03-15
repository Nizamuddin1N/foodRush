import { useCart } from "../context/CartContext"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, addToCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const createOrder = async () => {
    if (cart.length === 0) return
    setLoading(true)
    setError("")
    try {
      const orderData = {
        restaurantId: cart[0].restaurantId,
        items: cart.map(i => ({
          menuItemId: i.menuItemId,
          quantity: i.quantity
        }))
      }
      const res = await api.post("/orders", orderData)
      const orderId = res.data.orderId || res.data.id
      clearCart()
      navigate(`/payment/${orderId}`)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <span className="text-8xl mb-6">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some delicious items to get started!</p>
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition shadow-md"
        >
          Browse Restaurants
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-gray-400 hover:text-gray-600 transition">←</Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
            {itemCount} items
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-6">
          {cart.map((item, i) => (
            <div
              key={item.menuItemId}
              className={`flex items-center justify-between p-5 ${
                i < cart.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  🍕
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-orange-500 font-medium text-sm">₹{item.price} each</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                  <button
                    onClick={() => removeFromCart(item.menuItemId)}
                    className="text-gray-600 hover:text-red-500 font-bold w-5 h-5 flex items-center justify-center transition"
                  >
                    −
                  </button>
                  <span className="font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-gray-600 hover:text-green-500 font-bold w-5 h-5 flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-gray-900 w-16 text-right">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Order Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({itemCount} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span className="text-green-500 font-medium">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{Math.round(total * 0.05)}</span>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>₹{total + Math.round(total * 0.05)}</span>
          </div>
        </div>

        <button
          onClick={createOrder}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl transition duration-200 shadow-lg text-lg"
        >
          {loading ? "Placing Order..." : `Place Order · ₹${total + Math.round(total * 0.05)}`}
        </button>
      </div>
    </div>
  )
}