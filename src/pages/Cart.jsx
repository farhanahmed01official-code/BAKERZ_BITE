import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  })

const handleCheckout = (e) => {
  e.preventDefault()

  const order = {
    id: 'ORD-' + Date.now(),
    items: [...cart],
    total: cartTotal,
    customer: { ...form },
    date: new Date().toISOString()
  }
  const existing = localStorage.getItem('bb_orders')
  const orders = existing ? JSON.parse(existing) : []
  orders.push(order)
  localStorage.setItem('bb_orders', JSON.stringify(orders))

  clearCart()
  setForm({ name: '', phone: '', email: '', address: '', notes: '' })
  setOrderPlaced(true)
  setTimeout(() => {
    setOrderPlaced(false)
    setShowCheckout(false)
  }, 5000)
}

  // ===== EMPTY CART =====
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container my-5 fade-in text-center py-5">
        <div className="cart-empty-icon">🛒</div>
        <h1>Your Cart is Empty</h1>
        <p className="text-muted">Add some delicious items to get started!</p>
        <Link to="/menu" className="btn btn-primary mt-3">
          Browse Menu
        </Link>
      </div>
    )
  }

  // ===== ORDER PLACED =====
  if (orderPlaced) {
    return (
      <div className="container my-5 fade-in text-center py-5">
        <div className="order-success-icon">✓</div>
        <h1>Order Placed!</h1>
        <p className="text-muted">
          Thank you for your order. We'll contact you shortly.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container my-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Cart</h1>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Items list */}
        <div className="col-lg-8">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="text-muted small mb-1">{item.category}</p>
                <strong>Rs {item.price}</strong>
              </div>
              <div className="cart-item-qty">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Rs {(item.price * item.quantity).toLocaleString()}
              </div>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="col-lg-4">
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>Rs {cartTotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>Rs {cartTotal.toLocaleString()}</span>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button
                className="checkout-close"
                onClick={() => setShowCheckout(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="checkout-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="checkout-field">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-field">
                <label>Delivery Address *</label>
                <textarea
                  required
                  rows="3"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House no, street, city, pincode"
                />
              </div>

              <div className="checkout-field">
                <label>Special Notes (optional)</label>
                <textarea
                  rows="2"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special instructions?"
                />
              </div>

              <div className="checkout-total">
                <span>Total to pay</span>
                <strong>Rs {cartTotal.toLocaleString()}</strong>
              </div>

              <button type="submit" className="checkout-submit-btn">
                Place Order →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}