import { NavLink } from 'react-router-dom'
import {
  IconHome,
  IconFire,
  IconCake,
  IconIceCream,
  IconCookie,
  IconCheese,
  IconBread,
  IconCroissant
} from './Icons'

const categories = [
  { to: '/', label: 'Home', icon: <IconHome /> },
  { to: '/trending', label: 'Trending', icon: <IconFire /> },
  { to: '/cakes', label: 'Cakes', icon: <IconCake /> },
  { to: '/ice-cream', label: 'Ice Cream', icon: <IconIceCream /> },
  { to: '/sweets', label: 'Sweets', icon: <IconCookie /> },
  { to: '/dairy', label: 'Dairy', icon: <IconCheese /> },
  { to: '/bakery', label: 'Bakery', icon: <IconBread /> },
  { to: '/cookies', label: 'Cookies', icon: <IconCroissant /> }
]

export default function CategoryStrip() {
  return (
    <section className="bb-categories">
      <div className="bb-categories-inner">
        {categories.map((c, i) => (
          <NavLink
            to={c.to}
            end={c.to === '/'}
            className={({ isActive }) =>
              `bb-category ${isActive ? 'active' : ''}`
            }
            key={i}
          >
            <span className="bb-category-icon">{c.icon}</span>
            <span className="bb-category-label">{c.label}</span>
          </NavLink>
        ))}
      </div>
    </section>
  )
}