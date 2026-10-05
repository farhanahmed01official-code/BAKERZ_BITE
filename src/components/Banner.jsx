import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const heroImages = [
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=1200&q=60&fm=webp&auto=format',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=60&fm=webp&auto=format'
]

export default function Banner() {
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bb-hero-new">
      <div className="bb-hero-bg">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`bb-hero-slide-img ${i === currentImg ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
            role="img"
            aria-label={`Bakery hero image ${i + 1}`}
          />
        ))}
        <div className="bb-hero-bg-overlay"></div>
      </div>

      <div className="bb-hero-content-new">
        <div className="bb-hero-inner">
          <div className="bb-hero-left">
            <span className="bb-hero-label">BAKERZ BITE, FRESHLY BAKED</span>

            <h1 className="bb-hero-headline">
              Real Ingredients<br />
              <span className="bb-hero-headline-accent">True Flavor</span>
            </h1>

            <p className="bb-hero-desc">
              Bakerz Bite brings you artisan pastries, gourmet cakes, and handcrafted
              desserts — all made fresh daily with <strong>real butter</strong>,
              <strong> fresh cream</strong>, and <strong>unbleached flour</strong>.
              One bakery, endless delights.
            </p>

            <div className="bb-hero-links">
              <Link to="/cakes">Cakes</Link>
              <Link to="/bakery">Breads</Link>
              <Link to="/ice-cream">Pastries</Link>
              <Link to="/cookies">Cookies</Link>
              <Link to="/merchandise">Merchandise</Link>
              <Link to="/offers">Offers</Link>
            </div>
          </div>

          <div className="bb-hero-right"></div>
        </div>

        <div className="bb-hero-stats">
          <div className="bb-stat">
            <strong>300+</strong>
            <span>PRODUCTS</span>
          </div>
          <div className="bb-stat">
            <strong>50+</strong>
            <span>CAKE DESIGNS</span>
          </div>
          <div className="bb-stat">
            <strong>12</strong>
            <span>CATEGORIES</span>
          </div>
          <div className="bb-stat">
            <strong>15K+</strong>
            <span>HAPPY CUSTOMERS</span>
          </div>
          <div className="bb-stat">
            <strong>10</strong>
            <span>YEARS OF LOVE</span>
          </div>
        </div>
      </div>

      <div className="bb-hero-img-dots">
        {heroImages.map((_, i) => (
          <button
            key={i}
            className={`bb-hero-img-dot ${i === currentImg ? 'active' : ''}`}
            onClick={() => setCurrentImg(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}