import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import SearchModal from './SearchModal'
import WishlistButton from './WishlistButton'
import UserMenu from './UserMenu'
import LoginModal from './LoginModal'
import { IconSearch, IconCart } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/offers', label: 'Offers' },
  { to: '/merchandise', label: 'Merchandise' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/sitemap', label: 'Sitemap' }
]

export default function Navbar() {
  const [now, setNow] = useState(new Date())
  const [visits, setVisits] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const countedRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)

    if (!countedRef.current) {
      countedRef.current = true
      const stored = localStorage.getItem('bb_visitor_count')
      const base = stored ? parseInt(stored, 10) : 1247
      const next = base + 1
      localStorage.setItem('bb_visitor_count', next)
      setVisits(next)
    }

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
  const timeStr = now.toLocaleTimeString('en-IN')

  return (
    <>
      <div className="bb-topstrip">
        <div className="bb-topstrip-inner">
          <span>{dateStr} | {timeStr}</span>
          <span>
            Total Visits: <strong>{visits.toLocaleString()}</strong>
            &nbsp;•&nbsp;
            <span className="bb-live-dot"></span> LIVE
          </span>
        </div>
      </div>

      <nav className="bb-navbar">
        <div className="bb-nav-inner">
          <NavLink to="/" className="bb-logo">
            <img
              src="/logo.png"
              alt="Bakerz Bite"
              className="bb-logo-brand"
            />
          </NavLink>

          <div className="bb-nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `bb-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
{/* Right Actions */}
<div className="bb-nav-actions">
  {/* Search */}
  

  {/* Wishlist */}
  <WishlistButton />

          <button
  className="bb-header-icon bb-cart-btn"
  aria-label="Cart"
  onClick={() => navigate('/cart')}
>
  <IconCart width={18} height={18} aria-hidden="true" />
  {cartCount > 0 && (
    <span className="bb-cart-badge">{cartCount}</span>
  )}
</button>

            <UserMenu onOpenLogin={() => setLoginOpen(true)} />

            <button
              className={`bb-hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`bb-mobile-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      ></div>

      <aside className={`bb-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="bb-mobile-header">
          <img
            src="/logo.png"
            alt="Bakerz Bite"
            className="bb-mobile-logo"
          />
          <button
            className="bb-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="bb-mobile-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `bb-mobile-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>{l.label}</span>
              <span className="bb-mobile-arrow">↗</span>
            </NavLink>
          ))}
        </nav>

        <div className="bb-mobile-footer">
          <p>Where smiles are served daily</p>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}