import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

export default function Dashboard() {
  const { userId } = useAuth()
  const [restaurant, setRestaurant] = useState(null)
  const [menu, setMenu] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false)
  const [menuForm, setMenuForm] = useState({ name: "", price: "", category: "" })
  const [restaurantForm, setRestaurantForm] = useState({ name: "", description: "" })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await api.get("/restaurants")
      const allRestaurants = res.data
      const myRestaurant = allRestaurants.find(r => 
  r.ownerId === userId || r.ownerId === userId?.toString()
)
      if (myRestaurant) {
        setRestaurant(myRestaurant)
        const menuRes = await api.get(`/restaurants/${myRestaurant._id}/menu`)
        setMenu(menuRes.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createRestaurant = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await api.post("/restaurants", restaurantForm)
      setRestaurant(res.data)
      setShowCreateRestaurant(false)
      toast.success("Restaurant created!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create restaurant")
    } finally {
      setSubmitting(false)
    }
  }

  const addMenuItem = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post(`/restaurants/${restaurant._id}/menu`, {
        ...menuForm,
        price: Number(menuForm.price)
      })
      toast.success("Menu item added!")
      setMenuForm({ name: "", price: "", category: "" })
      setShowAddMenu(false)
      const menuRes = await api.get(`/restaurants/${restaurant._id}/menu`)
      setMenu(menuRes.data)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add item")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Restaurant Dashboard</h1>
          <p className="text-orange-100">Manage your restaurant, menu and orders</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* No restaurant yet */}
        {!restaurant ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <span className="text-6xl">🍽️</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
              You don't have a restaurant yet
            </h2>
            <p className="text-gray-500 mb-6">Create your restaurant to start receiving orders</p>
            <button
              onClick={() => setShowCreateRestaurant(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition shadow-md"
            >
              + Create Restaurant
            </button>

            {/* Create Restaurant Form */}
            {showCreateRestaurant && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Create Restaurant</h3>
                  <form onSubmit={createRestaurant} className="space-y-4">
                    <input
                      placeholder="Restaurant name"
                      value={restaurantForm.name}
                      onChange={e => setRestaurantForm({...restaurantForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                    />
                    <textarea
                      placeholder="Description"
                      value={restaurantForm.description}
                      onChange={e => setRestaurantForm({...restaurantForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 resize-none"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateRestaurant(false)}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                      >
                        {submitting ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Restaurant Info Card */}
            <div className="bg-white rounded-3xl shadow-md p-6 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                  🍽️
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{restaurant.name}</h2>
                  <p className="text-gray-500 text-sm">{restaurant.description}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${
                    restaurant.isOpen ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                  }`}>
                    {restaurant.isOpen ? "● Open" : "● Closed"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-500">{menu.length}</p>
                <p className="text-gray-400 text-sm">Menu items</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl shadow p-5 text-center">
                <p className="text-3xl font-bold text-orange-500">{menu.length}</p>
                <p className="text-gray-500 text-sm mt-1">Menu Items</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 text-center">
                <p className="text-3xl font-bold text-green-500">Active</p>
                <p className="text-gray-500 text-sm mt-1">Status</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 text-center">
                <p className="text-3xl font-bold text-blue-500">⭐ 4.5</p>
                <p className="text-gray-500 text-sm mt-1">Rating</p>
              </div>
            </div>

            {/* Menu Section */}
            <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Menu Items</h3>
                <button
                  onClick={() => setShowAddMenu(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl transition shadow text-sm"
                >
                  + Add Item
                </button>
              </div>

              {menu.length === 0 ? (
                <div className="text-center py-10">
                  <span className="text-4xl">🍽️</span>
                  <p className="text-gray-400 mt-2">No menu items yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {menu.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
                          🍕
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          {item.category && (
                            <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">₹{item.price}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.isAvailable
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        }`}>
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Menu Item Modal */}
      {showAddMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add Menu Item</h3>
            <form onSubmit={addMenuItem} className="space-y-4">
              <input
                placeholder="Item name (e.g. Margherita Pizza)"
                value={menuForm.name}
                onChange={e => setMenuForm({...menuForm, name: e.target.value})}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <input
                placeholder="Price (e.g. 299)"
                type="number"
                value={menuForm.price}
                onChange={e => setMenuForm({...menuForm, price: e.target.value})}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <input
                placeholder="Category (e.g. Pizza, Burger)"
                value={menuForm.category}
                onChange={e => setMenuForm({...menuForm, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMenu(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                >
                  {submitting ? "Adding..." : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}