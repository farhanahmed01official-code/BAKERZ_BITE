import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

let toastIdCounter = 0

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('bb_cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [toasts, setToasts] = useState([])

  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cart))
  }, [cart])

  const showToast = (item) => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { ...item, id }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + quantity } : c
        )
      }
      return [...prev, { ...item, quantity }]
    })
    showToast(item)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity } : c))
    )
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0)
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        toasts,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}