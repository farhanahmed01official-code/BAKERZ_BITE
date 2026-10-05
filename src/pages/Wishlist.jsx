import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="container my-5 text-center py-5 fade-in">
        <div className="wishlist-empty-icon">
          <svg
            viewBox="0 0 24 24"
            width="72"
            height="72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h1>Your Wishlist is Empty</h1>
        <p className="text-muted">
          Save your favourite items by clicking the bookmark icon.
        </p>
        <Link to="/menu" className="contact-submit-btn" style={{ display: 'inline-block', marginTop: 20 }}>
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="container my-5 fade-in">
      <div className="wishlist-header">
        <div>
          <span className="about-label">— SAVED ITEMS</span>
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-sub">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <button className="wishlist-clear-btn" onClick={clearWishlist}>
          Clear All
        </button>
      </div>

      <div className="row g-4">
        {wishlist.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
            <div className="wishlist-card">
              <div className="wishlist-img-wrap">
                <img src={item.image} alt={item.name} />
                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove"
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              <div className="wishlist-body">
                <h3 className="wishlist-name">{item.name}</h3>
                <p className="wishlist-desc">{item.description}</p>

                <div className="wishlist-price-row">
                  <span className="wishlist-price">Rs {item.price}</span>
                  <span className="wishlist-rating">★ {item.rating}</span>
                </div>

                <button
                  className="wishlist-add-btn"
                  onClick={() => addToCart(item, 1)}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}