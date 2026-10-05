import { createContext, useContext, useState, useEffect, useRef } from 'react'

const WishlistContext = createContext()

let toastIdCounter = 0

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('bb_wishlist')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [toasts, setToasts] = useState([])
  const wishlistRef = useRef(wishlist)

  useEffect(() => {
    localStorage.setItem('bb_wishlist', JSON.stringify(wishlist))
    wishlistRef.current = wishlist
  }, [wishlist])

  const showToast = (type, item) => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { ...item, type, id }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleWishlist = (item) => {
    const inRef = wishlistRef.current.find((w) => w.id === item.id)

    setWishlist((prev) => {
      const inPrev = prev.find((w) => w.id === item.id)
      if (inPrev) return prev.filter((w) => w.id !== item.id)
      return [...prev, item]
    })

    wishlistRef.current = inRef
      ? wishlistRef.current.filter((w) => w.id !== item.id)
      : [...wishlistRef.current, item]

    if (inRef) showToast('removed', item)
    else showToast('added', item)
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id))
  }

  const isInWishlist = (id) => wishlist.some((w) => w.id === id)

  const clearWishlist = () => setWishlist([])

  const wishlistCount = wishlist.length

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
        toasts,
        removeToast
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}