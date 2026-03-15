import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"

export default function Menu(){

  const { id } = useParams()

  const [menu,setMenu] = useState([])

  useEffect(()=>{

    const fetchMenu = async () =>{

      const res = await api.get(`/restaurants/${id}/menu`)

      setMenu(res.data)

    }

    fetchMenu()

  },[id])

  return (

    <div>

      <h2>Menu</h2>

      {menu.map(item => (

        <div key={item._id}>

          <h3>{item.name}</h3>

          <p>₹ {item.price}</p>

          <button>Add to Cart</button>

        </div>

      ))}

    </div>

  )

}