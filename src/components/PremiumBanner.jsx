import { useEffect, useState } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&q=60&fm=webp',
    title: 'Premio Collection',
    subtitle: 'Handcrafted Premium Cakes'
  },
  {
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&q=60&fm=webp',
    title: 'Three Milk Cake',
    subtitle: 'Velvety. Creamy. Unforgettable.'
  },
  {
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1000&q=60&fm=webp',
    title: 'Ferrero Rocher',
    subtitle: 'Golden. Rich. Luxurious.'
  },
  {
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1000&q=60&fm=webp',
    title: 'Raffaello Classic',
    subtitle: 'Coconut. Almond. Divine.'
  },
  {
    image: 'https://images.unsplash.com/photo-1586985289906-406988974504?w=1000&q=60&fm=webp',
    title: 'Red Velvet Dreams',
    subtitle: 'Classic elegance in every bite'
  },
  {
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&q=60&fm=webp',
    title: 'Chocolate Indulgence',
    subtitle: 'Rich, fudgy, irresistible'
  },
  {
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1000&q=60&fm=webp',
    title: 'Cupcake Party',
    subtitle: 'Perfect for every celebration'
  },
  {
    image: 'https://images.unsplash.com/photo-1533134242457-8c4c1a6e0c60?w=1000&q=60&fm=webp',
    title: 'Cheesecake Heaven',
    subtitle: 'Creamy New York style'
  }
]

export default function PremiumBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="bb-premium-banner">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`bb-premium-slide ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="bb-premium-overlay"></div>
        </div>
      ))}

      <div className="bb-premium-banner-content">
        <h2 className="bb-premium-banner-title">{slides[current].title}</h2>
        <p className="bb-premium-banner-sub">{slides[current].subtitle}</p>
      </div>

      <button
        className="bb-premium-arrow left"
        onClick={goPrev}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="bb-premium-arrow right"
        onClick={goNext}
        aria-label="Next"
      >
        ›
      </button>

      <div className="bb-premium-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`bb-premium-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}