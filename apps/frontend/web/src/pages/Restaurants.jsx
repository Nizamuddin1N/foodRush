import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

export default function Restaurants(){

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {

    const fetchRestaurants = async () => {

      const res = await api.get("/restaurants")

      setRestaurants(res.data)

    }

    fetchRestaurants()

  }, [])

  return (

    <div>

      <h1>Restaurants</h1>

      {restaurants.map(r => (

        <div key={r._id}>

          <h3>{r.name}</h3>

          <p>{r.description}</p>

          <Link to={`/restaurant/${r._id}`}>
            View Menu
          </Link>

        </div>

      ))}

    </div>

  )

}