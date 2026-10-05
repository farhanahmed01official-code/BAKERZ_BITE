import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bb_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('bb_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('bb_user')
    }
  }, [user])

  const login = ({ email, password }) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password required' }
    }

    const name = email.split('@')[0]
    const displayName = name.charAt(0).toUpperCase() + name.slice(1)

    const newUser = {
      id: Date.now(),
      name: displayName,
      email: email
    }

    setUser(newUser)
    return { success: true }
  }

  const signup = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { success: false, error: 'All fields required' }
    }
    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters' }
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email
    }

    setUser(newUser)
    return { success: true }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}