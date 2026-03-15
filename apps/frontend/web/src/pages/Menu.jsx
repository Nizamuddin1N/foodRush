import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../api/axios"
import { useCart } from "../context/CartContext"

export default function Menu() {
  const { id } = useParams()
  const { addToCart, cart } = useCart()
  const [menu, setMenu] = useState([])
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addedItems, setAddedItems] = useState({})

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, restRes] = await Promise.all([
          api.get(`/restaurants/${id}/menu`),
          api.get(`/restaurants`)
        ])
        setMenu(menuRes.data)
        const found = restRes.data.find(r => r._id === id)
        setRestaurant(found)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleAddToCart = (item) => {
    addToCart({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      restaurantId: id
    })
    setAddedItems(prev => ({ ...prev, [item._id]: true }))
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item._id]: false }))
    }, 1500)
  }

  const getItemQty = (itemId) => {
    const found = cart.find(i => i.menuItemId === itemId)
    return found ? found.quantity : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-orange-200 hover:text-white text-sm mb-4 inline-block transition">
            ← Back to Restaurants
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              🍕
            </div>
            <div>
              <h1 className="text-3xl font-bold">{restaurant?.name || "Restaurant"}</h1>
              <p className="text-orange-100 mt-1">{restaurant?.description || "Delicious food"}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-orange-200">
                <span>⭐ 4.5 rating</span>
                <span>🕐 25-35 min</span>
                <span className={`font-semibold ${restaurant?.isOpen ? "text-green-300" : "text-red-300"}`}>
                  {restaurant?.isOpen ? "● Open" : "● Closed"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          {cartCount > 0 && (
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-xl transition shadow-md"
            >
              🛒 View Cart ({cartCount} items)
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-8 bg-gray-200 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : menu.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🍽️</span>
            <p className="text-gray-500 text-xl mt-4">No menu items yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => {
              const qty = getItemQty(item._id)
              const justAdded = addedItems[item._id]
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      {item.isAvailable ? (
                        <span className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">Available</span>
                      ) : (
                        <span className="text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">Unavailable</span>
                      )}
                    </div>
                    {item.category && (
                      <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    )}
                    <p className="text-2xl font-bold text-gray-900 mt-3">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.isAvailable}
                    className={`mt-4 w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      justAdded
                        ? "bg-green-500 text-white scale-95"
                        : qty > 0
                        ? "bg-orange-100 text-orange-600 border-2 border-orange-400 hover:bg-orange-500 hover:text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
                  >
                    {justAdded ? "✓ Added!" : qty > 0 ? `Add More (${qty} in cart)` : "Add to Cart"}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}