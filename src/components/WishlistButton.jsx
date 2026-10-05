import { useWishlist } from '../context/WishlistContext'
import { useNavigate } from 'react-router-dom'
import { IconBookmark } from './Icons'

export default function WishlistButton() {
  const { wishlistCount } = useWishlist()
  const navigate = useNavigate()

  return (
    <button
      className="bb-header-icon bb-wishlist-btn"
      aria-label="Wishlist"
      onClick={() => navigate('/wishlist')}
      title="My Wishlist"
    >
      <IconBookmark width={18} height={18} aria-hidden="true" />
      {wishlistCount > 0 && (
        <span className="bb-cart-badge bb-wishlist-badge">
          {wishlistCount}
        </span>
      )}
    </button>
  )
}