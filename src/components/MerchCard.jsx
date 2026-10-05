import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const FALLBACK = 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&q=60&fm=webp'

export default function MerchCard({ item, onAdd, added }) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [imgSrc, setImgSrc] = useState(item.image)
  const [tried, setTried] = useState(false)
  const [justBookmarked, setJustBookmarked] = useState(false)

  const bookmarked = isInWishlist(item.id)

  const handleError = () => {
    if (!tried) {
      setTried(true)
      setImgSrc(FALLBACK)
    }
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleWishlist(item)
    setJustBookmarked(true)
    setTimeout(() => setJustBookmarked(false), 800)
  }

  return (
    <div className="merch-card">
      <div className="merch-img-wrap">
        <img src={imgSrc} alt={item.name} onError={handleError} loading="lazy" />

        {item.tags && item.tags[0] && (
          <span className="merch-tag">{item.tags[0]}</span>
        )}

        {/* Bookmark button */}
        <button
          className={`pc-bookmark-btn merch-bookmark ${bookmarked ? 'active' : ''} ${justBookmarked ? 'pulse' : ''}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove from wishlist' : 'Add to wishlist'}
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

      <div className="merch-body">
        <h3 className="merch-name">{item.name}</h3>
        <p className="merch-desc">{item.description}</p>

        <div className="merch-price-row">
          <span className="merch-price">Rs {item.price}</span>
          <span className="merch-rating">★ {item.rating}</span>
        </div>

        <button
          className={`merch-add-btn ${added ? 'added' : ''}`}
          onClick={() => onAdd(item)}
        >
          {added ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  )
}