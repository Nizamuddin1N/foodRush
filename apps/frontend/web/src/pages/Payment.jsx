import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Payment() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [paid, setPaid] = useState(false)

  const pay = async () => {
    setLoading(true)
    setError("")
    try {
      await api.post("/payments", { orderId })
      toast.success("Payment successful! 🎉")
      setPaid(true)
      setTimeout(() => navigate("/orders"), 2500)
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.")
      toast.error("Payment failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-2">Your order has been confirmed.</p>
          <p className="text-gray-400 text-sm">Redirecting to orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💳</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            <p className="text-gray-500 mt-1">Secure checkout</p>
          </div>

          {/* Order ID */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Order ID</p>
            <p className="text-gray-400 font-mono text-xs">{orderId.slice(0,8).toUpperCase()}...</p>
          </div>

          {/* Simulated payment form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                defaultValue="4242 4242 4242 4242"
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry</label>
                <input
                  type="text"
                  defaultValue="12/26"
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  defaultValue="***"
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={pay}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-4 px-6 rounded-2xl transition duration-200 shadow-lg text-lg"
          >
            {loading ? "Processing..." : "Pay Now 🔒"}
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            🔒 Secured by FoodRush Payment Gateway
          </p>
        </div>
      </div>
    </div>
  )
}