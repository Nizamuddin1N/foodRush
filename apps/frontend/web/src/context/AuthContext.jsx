import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

// Decode JWT without library
const decodeToken = (token) => {
  try {
    const base64 = token.split('.')[1]
    const decoded = JSON.parse(atob(base64))
    return decoded
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const decoded = token ? decodeToken(token) : null
  const role = decoded?.role || null
  const userId = decoded?.userId || null

  const login = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, role, userId }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)