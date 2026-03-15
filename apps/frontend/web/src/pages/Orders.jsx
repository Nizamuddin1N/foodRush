import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

const STATUS_CONFIG = {
  CREATED: { color: "bg-blue-100 text-blue-600", icon: "📋", label: "Order Placed" },
  CONFIRMED: { color: "bg-yellow-100 text-yellow-600", icon: "✅", label: "Confirmed" },
  PREPARING: { color: "bg-orange-100 text-orange-600", icon: "👨‍🍳", label: "Preparing" },
  OUT_FOR_DELIVERY: { color: "bg-purple-100 text-purple-600", icon: "🛵", label: "On the way" },
  DELIVERED: { color: "bg-green-100 text-green-600", icon: "🎉", label: "Delivered" },
  PAYMENT_RECEIVED: { color: "bg-green-100 text-green-600", icon: "💚", label: "Payment Received" },
}

export default function Orders() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">📦</span>
            <p className="text-gray-500 text-xl mt-4 mb-6">No orders yet</p>
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.CREATED
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Order ID</p>
                      <p className="font-mono text-sm text-gray-700">{order.id}</p>
                    </div>
                    <span className={`${statusCfg.color} text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                      {statusCfg.icon} {statusCfg.label}
                    </span>
                  </div>

                  {/* Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name || item.menuItemId} × {item.quantity}</span>
                            {item.price && <span className="text-gray-500">₹{item.price * item.quantity}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-gray-500 text-sm">Total: </span>
                      <span className="font-bold text-gray-900">₹{order.total_amount || order.totalAmount || "—"}</span>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      }) : ""}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}