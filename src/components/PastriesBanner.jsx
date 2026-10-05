import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const bannerSlides = [
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=60&fm=webp',
    title: 'Butter Croissants',
    subtitle: 'Flaky, golden, freshly baked'
  },
  {
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=1000&q=60&fm=webp',
    title: 'Chocolate Éclairs',
    subtitle: 'Cream-filled perfection'
  },
  {
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=1000&q=60&fm=webp',
    title: 'Pain au Chocolat',
    subtitle: 'Dark chocolate wrapped in flaky dough'
  },
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=60&fm=webp',
    title: 'Danish Pastries',
    subtitle: 'Fresh berry filled delights'
  },
  {
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=1000&q=60&fm=webp',
    title: 'Cinnamon Rolls',
    subtitle: 'Warm, gooey, irresistible'
  },
  {
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=1000&q=60&fm=webp',
    title: 'Blueberry Muffins',
    subtitle: 'Bursting with fresh berries'
  },
  {
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=1000&q=60&fm=webp',
    title: 'Apple Turnovers',
    subtitle: 'Spiced apple wrapped in puff pastry'
  },
  {
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&q=60&fm=webp',
    title: 'Sweet Delights',
    subtitle: 'Baked with love every morning'
  }
]

const pastries = [
  {
    id: 'pb1',
    name: 'Butter Croissant',
    description: 'Flaky, buttery, freshly baked every morning.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=350&q=60&fm=webp',
    price: 120,
    rating: 4.6,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb2',
    name: 'Chocolate Éclair',
    description: 'Cream-filled choux pastry with rich chocolate glaze.',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=350&q=60&fm=webp',
    price: 150,
    rating: 4.7,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb3',
    name: 'Pain au Chocolat',
    description: 'Flaky croissant dough wrapped around dark chocolate.',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=350&q=60&fm=webp',
    price: 160,
    rating: 4.8,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb4',
    name: 'Danish Pastry',
    description: 'Buttery Danish pastry with fresh berry filling.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=60&fm=webp',
    price: 180,
    rating: 4.7,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb5',
    name: 'Cream Puff',
    description: 'Light choux pastry filled with sweet vanilla cream.',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=350&q=60&fm=webp',
    price: 110,
    rating: 4.6,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb6',
    name: 'Cinnamon Roll',
    description: 'Soft roll swirled with cinnamon and topped with icing.',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=350&q=60&fm=webp',
    price: 180,
    rating: 4.9,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb7',
    name: 'Apple Turnover',
    description: 'Flaky puff pastry filled with spiced apple compote.',
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=350&q=60&fm=webp',
    price: 160,
    rating: 4.6,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb8',
    name: 'Berry Danish',
    description: 'Buttery Danish topped with fresh berries and cream.',
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=350&q=60&fm=webp',
    price: 220,
    rating: 4.7,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb9',
    name: 'Blueberry Muffin',
    description: 'Soft muffin packed with juicy wild blueberries.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=350&q=60&fm=webp',
    price: 140,
    rating: 4.7,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  },
  {
    id: 'pb10',
    name: 'Almond Croissant',
    description: 'Buttery croissant filled with almond cream and flakes.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=350&q=60&fm=webp',
    price: 200,
    rating: 4.8,
    weights: ['450GM', '1000GM'],
    category: 'pastries'
  }
]

function PastryCard({ item }) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(item.weights[0])

  const bookmarked = isInWishlist(item.id)

  const handleAdd = () => {
    addToCart(item, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleWishlist(item)
  }

  return (
    <div className="premium-pastry-card">
      <div className="ppc-img-wrap">
        <img src={item.image} alt={item.name} loading="lazy" />

        <button
          className={`pc-bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          aria-label="Bookmark"
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

      <div className="ppc-body">
        <h3 className="ppc-name">{item.name}</h3>
        <p className="ppc-desc">{item.description}</p>

        <div className="ppc-weights">
          {item.weights.map((w) => (
            <button
              key={w}
              className={`ppc-weight-pill ${selectedWeight === w ? 'active' : ''}`}
              onClick={() => setSelectedWeight(w)}
            >
              {w}
            </button>
          ))}
        </div>

        <div className="ppc-price">
          From <strong>Rs. {item.price}</strong>
        </div>

        <button
          className={`ppc-add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ ADDED' : 'ADD'}
        </button>
      </div>
    </div>
  )
}

export default function PastriesBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bb-pastries-section">
      {/* ===== Banner Slider ===== */}
      <div className="bb-pastries-slider">
        {bannerSlides.map((slide, i) => (
          <div
            key={i}
            className={`bb-pastries-slide ${i === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bb-pastries-slide-overlay"></div>
          </div>
        ))}

        <div className="bb-pastries-slide-content">
          <h3 className="bb-pastries-slide-title">
            {bannerSlides[currentSlide].title}
          </h3>
          <p className="bb-pastries-slide-sub">
            {bannerSlides[currentSlide].subtitle}
          </p>
        </div>

        <div className="bb-pastries-slider-dots">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              className={`bb-pastries-slider-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="bb-pastries-header">
        <span className="bb-pastries-label">— FRESHLY BAKED DAILY</span>
        <h2 className="bb-pastries-title">
          Artisan <span className="bb-pastries-accent">Pastries</span>
        </h2>
        <p className="bb-pastries-sub">
          Flaky croissants, buttery danishes, and golden éclairs — baked fresh
          every morning with real butter and love.
        </p>
      </div>

      {/* Grid */}
      <div className="bb-pastries-grid">
        {pastries.map((item) => (
          <PastryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}