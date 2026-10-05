import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  IconLogin,
  IconLogout,
  IconSettings,
  IconBookmark,
  IconCart
} from './Icons'

export default function UserMenu({ onOpenLogin }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (!user) {
    return (
      <button
        className="bb-btn-primary bb-login-btn"
        onClick={() => onOpenLogin()}
      >
        Log In
      </button>
    )
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bb-user-menu">
      <button
        className="bb-user-btn"
        onClick={() => setOpen(!open)}
        aria-label="User menu"
      >
        <span className="bb-user-avatar">{initials}</span>
        <span className="bb-user-name">{user.name.split(' ')[0]}</span>
        <span className={`bb-user-caret ${open ? 'open' : ''}`}>▾</span>
      </button>

      {open && (
        <>
          <div className="bb-user-backdrop" onClick={() => setOpen(false)} />
          <div className="bb-user-dropdown">
            <div className="bb-user-dropdown-header">
              <div className="bb-user-avatar large">{initials}</div>
              <div>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
            </div>

            <button
              className="bb-user-dropdown-item"
              onClick={() => {
                setOpen(false)
                navigate('/wishlist')
              }}
            >
              <IconBookmark width={16} height={16} /> My Wishlist
            </button>

            <button
              className="bb-user-dropdown-item"
              onClick={() => {
                setOpen(false)
                navigate('/cart')
              }}
            >
              <IconCart width={16} height={16} /> My Cart
            </button>

            <button
              className="bb-user-dropdown-item"
              onClick={() => {
                setOpen(false)
              }}
            >
              <IconSettings width={16} height={16} /> Settings
            </button>

            <div className="bb-user-dropdown-divider" />

            <button
              className="bb-user-dropdown-item logout"
              onClick={() => {
                logout()
                setOpen(false)
              }}
            >
              <IconLogout width={16} height={16} /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}