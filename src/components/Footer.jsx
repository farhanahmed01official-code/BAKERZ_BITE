import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  IconFacebook,
  IconInstagram
} from './Icons'

export default function Footer() {
  const { cartCount, cartTotal } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <footer className="bb-footer">
        <div className="bb-footer-inner">
          <div className="bb-footer-col logo-col">
            <img
              src="/logo.png"
              alt="Bakerz Bite"
              className="bb-footer-brand-img"
            />
          </div>

          <div className="bb-footer-col">
            <h4 className="bb-footer-heading">Quick Links</h4>
            <ul className="bb-footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><Link to="/offers">Offers</Link></li>
            </ul>
          </div>

          <div className="bb-footer-col phone-col">
            <div className="bb-phone-mockup">
              <div className="bb-phone-screen">
                <div className="bb-phone-notch"></div>
                <div className="bb-phone-header">
                  <span className="bb-phone-logo">🧁</span>
                  <span className="bb-phone-brand">Bakerz Bite</span>
                </div>
                <div className="bb-phone-search">Search bakery items...</div>
                <div className="bb-phone-cats">
                  <span>🎂</span>
                  <span>🥐</span>
                  <span>🍪</span>
                  <span>🥧</span>
                </div>
                <div className="bb-phone-grid">
                  <div className="bb-phone-item">
                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80" alt="" />
                  </div>
                  <div className="bb-phone-item">
                    <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80" alt="" />
                  </div>
                  <div className="bb-phone-item">
                    <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&q=80" alt="" />
                  </div>
                  <div className="bb-phone-item">
                    <img src="https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=200&q=80" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bb-footer-col app-col">
            <h4 className="bb-footer-heading app-heading">
              Freshly Baked,<br />Just a Tap Away!
            </h4>

            <div className="bb-social-icons">
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Visit our Facebook page" title="Facebook">
                <IconFacebook width={18} height={18} aria-hidden="true" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Visit our Instagram page" title="Instagram">
                <IconInstagram width={18} height={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="bb-footer-bottom">
          <div className="bb-footer-bottom-inner">
            <p className="bb-footer-bottom-text">
              Powered by <strong>Bakerz Bite</strong> | Privacy Policy | FAQs
            </p>

            <button
              className="bb-cart-pill"
              onClick={() => navigate('/cart')}
            >
              <span className="bb-cart-pill-count">{cartCount}</span>
              <span>View Cart</span>
              <strong>Rs. {cartTotal.toLocaleString()}</strong>
              <span className="bb-cart-pill-arrow">→</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}