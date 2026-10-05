import data from '../data/products.json'
import { useWishlist } from '../context/WishlistContext'

const popularItems = [
  data.cakes?.[0],
  data.pastries?.[0],
  data.cookies?.[0],
  data.pies?.[0]
].filter(Boolean)

export default function PopularItems({ onSelect }) {
  const { toggleWishlist, isInWishlist } = useWishlist()

  return (
    <section className="bb-popular">
      <div className="bb-popular-inner">
        <header className="bb-popular-head">
          <h2> Popular Items</h2>
          <p>Most ordered right now</p>
        </header>

        <div className="bb-popular-grid">
          {popularItems.map((item) => {
            const bookmarked = isInWishlist(item.id)

            const handleBookmark = (e) => {
              e.stopPropagation()
              toggleWishlist(item)
            }

            return (
              <div
                className="bb-popular-card"
                key={item.id}
                onClick={() => onSelect?.(item)}
              >
                <div className="bb-popular-img-wrap">
                  <img src={item.image} alt={item.name} />

                  {/* Bookmark button */}
                  <button
                    className={`pc-bookmark-btn ${bookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    aria-label={
                      bookmarked ? 'Remove from wishlist' : 'Add to wishlist'
                    }
                    title={
                      bookmarked ? 'Remove from wishlist' : 'Add to wishlist'
                    }
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

                  {/* Add button */}
                  <button
                    className="bb-popular-add"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect?.(item)
                    }}
                    aria-label={`View ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <h3>{item.name}</h3>
                <p className="bb-popular-price">
                  From <strong>Rs {item.price}</strong>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}