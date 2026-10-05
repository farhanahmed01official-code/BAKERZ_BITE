import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=60&fm=webp'

export default function ProductCard({ item, onClick }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [added, setAdded] = useState(false)
  const [imgSrc, setImgSrc] = useState(item.image)
  const [imgError, setImgError] = useState(false)
  const [justBookmarked, setJustBookmarked] = useState(false)

  const bookmarked = isInWishlist(item.id)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(item, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleWishlist(item)
    setJustBookmarked(true)
    setTimeout(() => setJustBookmarked(false), 800)
  }

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true)
      setImgSrc(FALLBACK_IMG)
    }
  }

  return (
    <div className="product-card">
      <div className="pc-image" onClick={() => onClick(item)}>
               <img
          src={imgSrc}
          alt={`${item.name} — ${item.category || 'bakery item'}`}
          onError={handleImgError}
          loading="lazy"
          decoding="async"
          width="300"
          height="200"
        />

        {/* Bookmark button */}
        <button
          className={`pc-bookmark-btn ${bookmarked ? 'active' : ''} ${justBookmarked ? 'pulse' : ''}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove from wishlist' : 'Add to wishlist'}
          title={bookmarked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="product-card-body">
        <h5 onClick={() => onClick(item)}>{item.name}</h5>
        <p className="text-muted small">{item.description}</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Rs {item.price}</strong>
          <span className="stars">
            {'★'.repeat(Math.round(item.rating))}
            {'☆'.repeat(5 - Math.round(item.rating))}
          </span>
        </div>

        <div className="pc-actions">
          <button className="pc-details-btn" onClick={() => onClick(item)}>
            Details
          </button>
          <button
            className={`pc-add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}