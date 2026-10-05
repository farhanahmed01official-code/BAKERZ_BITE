import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import FilterBar from '../components/FilterBar'
import data from '../data/products.json'

// Banner slider for Menu page
const bannerSlides = [
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=60&fm=webp',
    title: 'Our Full Menu',
    subtitle: 'Over 300 freshly baked items'
  },
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&q=60&fm=webp',
    title: 'Handcrafted Cakes',
    subtitle: 'For every special occasion'
  },
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=60&fm=webp',
    title: 'Artisan Pastries',
    subtitle: 'Flaky, buttery, freshly made'
  },
  {
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1000&q=60&fm=webp',
    title: 'Sweet Delights',
    subtitle: 'Cookies, brownies & more'
  },
  {
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=1000&q=60&fm=webp',
    title: 'Seasonal Specials',
    subtitle: 'Fresh pies and tarts'
  }
]

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catFromUrl = searchParams.get('cat') || 'all'

  const [filter, setFilter] = useState(catFromUrl)
  const [selected, setSelected] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setFilter(catFromUrl)
  }, [catFromUrl])

  // Banner slider auto-change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    if (newFilter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: newFilter })
    }
  }

  const allItems = Object.values(data).flat()
  const filtered =
    filter === 'all' ? allItems : allItems.filter((i) => i.category === filter)

  return (
    <>
      {/* ===== Banner Slider ===== */}
      <section className="bb-menu-banner">
        {bannerSlides.map((slide, i) => (
          <div
            key={i}
            className={`bb-menu-slide ${i === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bb-menu-banner-overlay"></div>
          </div>
        ))}

        <div className="bb-menu-banner-content">
          <h1 className="bb-menu-banner-title">
            {bannerSlides[currentSlide].title}
          </h1>
          <p className="bb-menu-banner-sub">
            {bannerSlides[currentSlide].subtitle}
          </p>
        </div>

        <div className="bb-menu-banner-dots">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              className={`bb-menu-banner-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== Menu Content ===== */}
      <div className="container my-5 fade-in">
        <div className="menu-page-header">
          <h2 className="text-center">
            {filter === 'all'
              ? 'All Items'
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </h2>
          <p className="text-center text-muted">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'} — click any for details
          </p>
        </div>

        <FilterBar
          categories={Object.keys(data)}
          active={filter}
          onChange={handleFilterChange}
        />

        <div className="row g-4">
          {filtered.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <ProductCard item={item} onClick={setSelected} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-5">
            <h3>No items found</h3>
            <p className="text-muted">Try another category.</p>
          </div>
        )}
      </div>

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}