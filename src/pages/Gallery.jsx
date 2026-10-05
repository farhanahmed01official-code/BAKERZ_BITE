import { useState, useEffect } from 'react'

// Banner slider images
const bannerSlides = [
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&q=60&fm=webp',
    title: 'Our Gallery',
    subtitle: 'A peek into our freshly baked world'
  },
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=60&fm=webp',
    title: 'Freshly Baked',
    subtitle: 'Every single day with love'
  },
  {
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1000&q=60&fm=webp',
    title: 'Handcrafted',
    subtitle: 'Cookies, cakes & pastries'
  },
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=60&fm=webp',
    title: 'Artisan Breads',
    subtitle: 'Baked fresh from the oven'
  },
  {
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&q=60&fm=webp',
    title: 'Sweet Moments',
    subtitle: 'Capturing every delicious bite'
  }
]

// Gallery images
const images = [
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=60&fm=webp', name: 'Fresh Bread' },
  { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=60&fm=webp', name: 'Croissant' },
  { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60&fm=webp', name: 'Donut' },
  { url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&q=60&fm=webp', name: 'Cupcake' },
  { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=60&fm=webp', name: 'Cake' },
  { url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=60&fm=webp', name: 'Cookies' },
  { url: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&q=60&fm=webp', name: 'Baguette' },
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=60&fm=webp', name: 'Pastry' },
  { url: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=60&fm=webp', name: 'Pudding' },
  { url: 'https://images.unsplash.com/photo-1585478259715-16c1c4a0f1b1?w=400&q=60&fm=webp', name: 'Bagel' },
  { url: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=60&fm=webp', name: 'Muffin' },
  { url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=60&fm=webp', name: 'Cinnamon Roll' },
  { url: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&q=60&fm=webp', name: 'Scone' },
  { url: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&q=60&fm=webp', name: 'Éclair' },
  { url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=60&fm=webp', name: 'Macaron' },
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=60&fm=webp', name: 'Danish' },
  { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=60&fm=webp', name: 'Brownie' },
  { url: 'https://images.unsplash.com/photo-1533134242457-8c4c1a6e0c60?w=400&q=60&fm=webp', name: 'Cheesecake' },
  { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60&fm=webp', name: 'Fruit Tart' },
  { url: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&q=60&fm=webp', name: 'Cream Puff' },
  { url: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&q=60&fm=webp', name: 'Palmiers' },
  { url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=60&fm=webp', name: 'Focaccia' },
  { url: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=400&q=60&fm=webp', name: 'Pretzel' },
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=60&fm=webp', name: 'Danish Roll' },
  { url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&q=60&fm=webp', name: 'Loaf Cake' },
  { url: 'https://images.unsplash.com/photo-1626803775151-61d756612f97?w=400&q=60&fm=webp', name: 'Jelly Donut' },
  { url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=60&fm=webp', name: 'Granola Bar' },
  { url: 'https://images.unsplash.com/photo-1600617953089-8b8e3f1c58d7?w=400&q=60&fm=webp', name: 'Apple Turnover' },
  { url: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&q=60&fm=webp', name: 'Pain au Chocolat' },
  { url: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400&q=60&fm=webp', name: 'Berry Danish' }
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Banner slider auto-change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ===== Banner Slider ===== */}
      <section className="bb-gallery-banner">
        {bannerSlides.map((slide, i) => (
          <div
            key={i}
            className={`bb-gallery-slide ${i === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bb-gallery-banner-overlay"></div>
          </div>
        ))}

        <div className="bb-gallery-banner-content">
          <h1 className="bb-gallery-banner-title">
            {bannerSlides[currentSlide].title}
          </h1>
          <p className="bb-gallery-banner-sub">
            {bannerSlides[currentSlide].subtitle}
          </p>
        </div>

        <div className="bb-gallery-banner-dots">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              className={`bb-gallery-banner-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== Gallery Grid ===== */}
      <div className="container my-5 fade-in">
        <div className="gallery-header">
          <h2 className="text-center">Our Beautiful Creations</h2>
          <p className="text-center text-muted">
            {images.length} freshly baked delights
          </p>
        </div>

        <div className="row g-3 mt-4">
          {images.map((img, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={i}>
              <div className="gallery-item" onClick={() => setLightbox(img)}>
                <img src={img.url} alt={img.name} className="gallery-img" />
                <div className="gallery-label">{img.name}</div>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div className="modal-overlay" onClick={() => setLightbox(null)}>
            <div className="gallery-lightbox" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.url} alt={lightbox.name} />
              <div className="gallery-lightbox-caption">{lightbox.name}</div>
              <button
                className="gallery-lightbox-close"
                onClick={() => setLightbox(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}