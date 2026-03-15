import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  const addToCart = (item) => {

    const existing = cart.find(i => i.menuItemId === item.menuItemId)

    if(existing){
      setCart(cart.map(i =>
        i.menuItemId === item.menuItemId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ))
    }else{
      setCart([...cart,{ ...item, quantity:1 }])
    }

  }

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(i => i.menuItemId !== menuItemId))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)