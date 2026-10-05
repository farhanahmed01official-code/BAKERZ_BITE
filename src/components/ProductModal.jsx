import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { IconShare, IconClose, IconMinus, IconPlus } from './Icons'

export default function ProductModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [instructions, setInstructions] = useState('')
  const [added, setAdded] = useState(false)
  const [shared, setShared] = useState(false)
  const { addToCart } = useCart()

  if (!item) return null

  const total = item.price * quantity

  const handleAdd = () => {
    addToCart(item, quantity)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
    }, 900)
  }

  const handleShare = async () => {
    const url = window.location.origin
    const text = `${item.name} — Rs. ${item.price} | Bakerz Bite`
    try {
      if (navigator.share) {
        await navigator.share({ title: item.name, text, url })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text}\n${url}`)
      }
      setShared(true)
      setTimeout(() => setShared(false), 1500)
    } catch (err) {
      // user cancelled — ignore
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bb-product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bb-pm-left">
          <img src={item.image} alt={item.name} />
          <div className="bb-pm-name-tag">{item.name}</div>
        </div>

        <div className="bb-pm-right">
          <div className="bb-pm-top-actions">
            <button
              className={`bb-pm-icon-btn ${shared ? 'shared' : ''}`}
              onClick={handleShare}
              aria-label="Share"
            >
              <IconShare width={18} height={18} />
            </button>
            <button
              className="bb-pm-icon-btn close"
              onClick={onClose}
              aria-label="Close"
            >
              <IconClose width={16} height={16} />
            </button>
          </div>

          <h2 className="bb-pm-price">Rs. {total}</h2>
          <p className="bb-pm-desc">{item.description}</p>

          {item.ingredients && item.ingredients.length > 0 && (
            <div className="bb-pm-section">
              <h4>Ingredients:</h4>
              <div className="bb-pm-ingredients">
                {item.ingredients.map((ing, i) => (
                  <span className="bb-pm-ing-chip" key={i}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bb-pm-section">
            <h4>Special Instructions</h4>
            <textarea
              className="bb-pm-textarea"
              placeholder="Please enter instructions about this item"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              maxLength={500}
            />
            <div className="bb-pm-char-count">{instructions.length}/500</div>
          </div>

          <div className="bb-pm-bottom">
            <div className="bb-pm-qty">
              <button
                className="bb-qty-btn remove"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease"
              >
                <IconMinus width={16} height={16} />
              </button>
              <span className="bb-qty-value">{quantity}</span>
              <button
                className="bb-qty-btn add"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase"
              >
                <IconPlus width={18} height={18} />
              </button>
            </div>

            <button
              className={`bb-add-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added to Cart' : `Rs. ${total}  |  Add to Cart →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}