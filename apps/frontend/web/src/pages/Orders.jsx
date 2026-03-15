import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

const STEPS = [
  { key: "CREATED", icon: "📋", label: "Order Placed" },
  { key: "CONFIRMED", icon: "✅", label: "Confirmed" },
  { key: "PREPARING", icon: "👨‍🍳", label: "Preparing" },
  { key: "OUT_FOR_DELIVERY", icon: "🛵", label: "On the way" },
  { key: "DELIVERED", icon: "🎉", label: "Delivered" },
]

const getStepIndex = (status) => {
  return STEPS.findIndex(s => s.key === status)
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

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
              const currentStep = getStepIndex(order.status)
              const isExpanded = expandedOrder === order.id
              const isDelivered = order.status === "DELIVERED"

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                        isDelivered ? "bg-green-100" : "bg-orange-100"
                      }`}>
                        {isDelivered ? "🎉" : "🍕"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {order.items?.length || 0} items ·{" "}
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{order.total_amount}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isDelivered ? "bg-green-100 text-green-600" :
                          order.status === "CONFIRMED" ? "bg-yellow-100 text-yellow-600" :
                          order.status === "PREPARING" ? "bg-orange-100 text-orange-600" :
                          order.status === "OUT_FOR_DELIVERY" ? "bg-purple-100 text-purple-600" :
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {order.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-5">

                      {/* Status Timeline */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-4">
                          Order Timeline
                        </p>
                        <div className="flex items-center justify-between relative">
                          {/* Progress line */}
                          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0" />
                          <div
                            className="absolute top-5 left-0 h-1 bg-orange-500 z-0 transition-all duration-500"
                            style={{
                              width: currentStep === 0 ? "0%" :
                                     `${(currentStep / (STEPS.length - 1)) * 100}%`
                            }}
                          />

                          {STEPS.map((step, i) => {
                            const isDone = i <= currentStep
                            const isCurrent = i === currentStep
                            return (
                              <div key={step.key} className="flex flex-col items-center z-10 flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                                  isDone
                                    ? "bg-orange-500 border-orange-500 text-white"
                                    : "bg-white border-gray-200 text-gray-300"
                                } ${isCurrent ? "ring-4 ring-orange-200 scale-110" : ""}`}>
                                  {step.icon}
                                </div>
                                <p className={`text-xs mt-2 text-center font-medium ${
                                  isDone ? "text-orange-500" : "text-gray-300"
                                }`}>
                                  {step.label}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Items */}
                      {order.items && order.items.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">
                            Items Ordered
                          </p>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">🍕</span>
                                  <div>
                                    <p className="font-medium text-gray-800 text-sm">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      ₹{item.price} × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-bold text-gray-900">
                                  ₹{item.price * item.quantity}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Total */}
                          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                            <span className="font-bold text-gray-800">Total</span>
                            <span className="font-bold text-orange-500 text-lg">
                              ₹{order.total_amount}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}