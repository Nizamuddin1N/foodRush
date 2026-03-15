import { useEffect, useState } from "react"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

export default function Profile() {
  const { userId, role } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/user")
        setOrders(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount), 0)
  const delivered = orders.filter(o => o.status === "DELIVERED").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl">
            {role === "RESTAURANT" ? "🍽️" : "👤"}
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full mt-2 inline-block ${
              role === "RESTAURANT"
                ? "bg-yellow-400/30 text-yellow-100"
                : "bg-white/20 text-white"
            }`}>
              {role === "RESTAURANT" ? "🍽️ Restaurant Owner" : "🛍️ Customer"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-orange-500">{orders.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-green-500">{delivered}</p>
            <p className="text-gray-500 text-sm mt-1">Delivered</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-blue-500">₹{totalSpent}</p>
            <p className="text-gray-500 text-sm mt-1">Total Spent</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-sm text-gray-700">
                #{userId?.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Role</span>
              <span className="font-semibold text-gray-800">{role}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-500">Member since</span>
              <span className="text-gray-700">March 2026</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl">📦</span>
              <p className="text-gray-400 mt-2">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-mono text-sm font-semibold text-gray-800">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.items?.length || 0} items · {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.total_amount}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-600" :
                      order.status === "CONFIRMED" ? "bg-yellow-100 text-yellow-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}