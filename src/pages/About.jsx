import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IconMail,
  IconPhone,
  IconLocation,
  IconBread,
  IconCroissant,
  IconCake,
  IconHeart,
  IconStar,
  IconCupcake
} from '../components/Icons'

const aboutImages = [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&q=60&fm=webp',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60&fm=webp'
]

const features = [
  {
    icon: <IconBread width={30} height={30} />,
    title: 'Finest Ingredients',
    desc: 'Real butter, fresh cream, and unbleached flour — no shortcuts.'
  },
  {
    icon: <IconCroissant width={30} height={30} />,
    title: 'Baked Fresh Daily',
    desc: 'Everything is baked in-store every morning with love.'
  },
  {
    icon: <IconCake width={30} height={30} />,
    title: '300+ Varieties',
    desc: 'From artisan pastries to gourmet cakes and desserts.'
  },
  {
    icon: <IconHeart width={30} height={30} />,
    title: 'Family First',
    desc: "We treat our customers as family — no ingredient we wouldn't feed our own."
  }
]

const stats = [
  { value: '10+', label: 'Years of Baking' },
  { value: '300+', label: 'Products' },
  { value: '15K+', label: 'Happy Customers' },
  { value: '12', label: 'Categories' }
]

export default function About() {
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % aboutImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="about-page fade-in">
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-label">— OUR STORY</span>
          <h1 className="about-title">About Bakerz Bite</h1>
          <p className="about-subtitle">
            Since its launch, Bakerz Bite has developed into a reputable bakery &
            café, specializing in baked goods passionately made from the finest
            ingredients.
          </p>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="about-stats">
        {stats.map((s, i) => (
          <div className="about-stat" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="about-content">
        <div className="container">
          <div className="row g-4 align-items-center">
            {/* Image Slider */}
            <div className="col-lg-6">
              <div className="about-image-card">
                <div className="about-slider">
                  {aboutImages.map((img, i) => (
                    <div
                      key={i}
                      className={`about-slide ${i === currentImg ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>

                {/* Floating badge with SVG */}
                <div className="about-image-badge">
                  <span className="about-badge-icon">
                    <IconCupcake width={32} height={32} />
                  </span>
                  <div>
                    <strong>Handcrafted</strong>
                    <small>With Love</small>
                  </div>
                </div>

                {/* Dots */}
                <div className="about-slider-dots">
                  {aboutImages.map((_, i) => (
                    <button
                      key={i}
                      className={`about-slider-dot ${i === currentImg ? 'active' : ''}`}
                      onClick={() => setCurrentImg(i)}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="col-lg-6">
              <div className="about-text-block">
                <h2>What We Stand For</h2>
                <p>
                  We offer more than <strong>300 different kinds of baked goods</strong>,
                  including artisan pastries, gourmet cakes, desserts, and handcrafted
                  beverages.
                </p>
                <p>
                  We only use real butter, cream, and unbleached flour. We treat our
                  customers as family and will not use any ingredient we wouldn't feed
                  our own.
                </p>

                <div className="about-motto">
                  <span className="about-motto-icon">
                    <IconStar width={30} height={30} />
                  </span>
                  <div>
                    <small>OUR MOTTO</small>
                    <em>"Where smiles are served daily."</em>
                  </div>
                </div>

                <Link to="/menu" className="about-cta">
                  Explore Our Menu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="about-features">
        <div className="container">
          <div className="about-features-header">
            <span className="about-label">— WHY CHOOSE US</span>
            <h2>What Makes Us Special</h2>
          </div>

          <div className="about-features-grid">
            {features.map((f, i) => (
              <div className="about-feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="about-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="about-contact-cta">
        <div className="container">
          <div className="about-cta-card">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Visit us or drop a message.</p>

            <div className="about-contact-items">
              <a href="mailto:hello@bakerzbite.com" className="about-contact-item">
                <span className="about-contact-icon">
                  <IconMail width={26} height={26} />
                </span>
                <div>
                  <strong>Email</strong>
                  <small>hello@bakerzbite.com</small>
                </div>
              </a>

              <a href="tel:+919876543210" className="about-contact-item">
                <span className="about-contact-icon">
                  <IconPhone width={26} height={26} />
                </span>
                <div>
                  <strong>Phone</strong>
                  <small>+91 98765 43210</small>
                </div>
              </a>

              <div className="about-contact-item">
                <span className="about-contact-icon">
                  <IconLocation width={26} height={26} />
                </span>
                <div>
                  <strong>Address</strong>
                  <small>123 Bakery Lane, Mumbai</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}