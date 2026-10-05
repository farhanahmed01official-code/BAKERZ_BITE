import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import data from '../data/products.json'

export default function CategoryPage({ categoryKey, title, subtitle, heroImage }) {
  const [selected, setSelected] = useState(null)

  // 'all' = saari categories ka data, warna specific category
  const items =
    categoryKey === 'all'
      ? Object.values(data).flat()
      : data[categoryKey] || []

  return (
    <>
      {/* Hero Banner */}
      <section
        className="bb-cat-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bb-cat-hero-overlay"></div>
        <div className="bb-cat-hero-content">
          <nav className="bb-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>{title}</span>
          </nav>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <span className="bb-cat-count">{items.length} items</span>
        </div>
      </section>

      {/* Products Grid */}
      <div className="container my-5 fade-in">
        {items.length > 0 ? (
          <div className="row g-4">
            {items.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={item.id}
              >
                <ProductCard item={item} onClick={setSelected} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h3>No items in this category yet</h3>
            <p className="text-muted">Coming soon!</p>
            <Link to="/menu" className="btn-primary mt-3 d-inline-block">
              Browse Full Menu
            </Link>
          </div>
        )}
      </div>

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}