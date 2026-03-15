import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

const FOOD_EMOJIS = ["🍕", "🍔", "🍜", "🌮", "🍱", "🥘", "🍣", "🥗"]
const BG_COLORS = [
  "from-orange-400 to-red-400",
  "from-yellow-400 to-orange-400",
  "from-green-400 to-teal-400",
  "from-blue-400 to-indigo-400",
  "from-pink-400 to-rose-400",
  "from-purple-400 to-pink-400",
]

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants")
        setRestaurants(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hungry? We've got you 🍽️
          </h1>
          <p className="text-orange-100 text-lg mb-8">
            Order food from the best restaurants near you
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-base"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {search ? `Results for "${search}"` : "All Restaurants"}
          </h2>
          <span className="text-gray-500 text-sm">{filtered.length} restaurants</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🍽️</span>
            <p className="text-gray-500 text-xl mt-4">No restaurants found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <Link
                key={r._id}
                to={`/restaurant/${r._id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image area */}
                <div className={`h-44 bg-gradient-to-br ${BG_COLORS[i % BG_COLORS.length]} flex items-center justify-center relative`}>
                  <span className="text-7xl">{FOOD_EMOJIS[i % FOOD_EMOJIS.length]}</span>
                  {r.isOpen && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      OPEN
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition">
                    {r.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {r.description || "Delicious food delivered to your door"}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      ⭐ <span className="text-gray-600 font-medium">4.5</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      🕐 <span>25-35 min</span>
                    </div>
                    <span className="text-orange-500 font-semibold text-sm group-hover:underline">
                      View Menu →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}