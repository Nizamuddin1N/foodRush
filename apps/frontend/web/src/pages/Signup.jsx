import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER"
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.post("/auth/signup", form)

    alert("Signup successful")
    navigate("/login")
  }

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="USER">User</option>
          <option value="RESTAURANT">Restaurant</option>
        </select>

        <button type="submit">Signup</button>

      </form>
    </div>
  )
}