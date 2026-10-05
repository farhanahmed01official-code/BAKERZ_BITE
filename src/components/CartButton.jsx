import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { IconCart } from './Icons'

export default function CartButton() {
  const { cartCount } = useCart()
  const navigate = useNavigate()

  return (
    <button
      className="bb-header-icon bb-cart-btn"
      aria-label="Cart"
      onClick={() => navigate('/cart')}
    >
      <IconCart width={18} height={18} />
      {cartCount > 0 && (
        <span className="bb-cart-badge">{cartCount}</span>
      )}
    </button>
  )
}