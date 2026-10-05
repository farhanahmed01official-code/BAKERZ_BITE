import { useState } from 'react'
import Banner from '../components/Banner'
import PopularItems from '../components/PopularItems'
import TrendingBanner from '../components/TrendingBanner'
import PremiumGrid from '../components/PremiumGrid'
import PastriesBanner from '../components/PastriesBanner'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import FilterBar from '../components/FilterBar'
import data from '../data/products.json'

export default function Home() {
  const allItems = Object.values(data).flat()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered =
    filter === 'all' ? allItems : allItems.filter((i) => i.category === filter)

  return (
    <>
      <Banner />
      <PopularItems onSelect={setSelected} />
      <TrendingBanner />

      <div className="container my-5">
        <h2 className="text-center mb-2">Our Menu</h2>
        <p className="text-center text-muted">Click any item for details</p>

        <FilterBar
          categories={Object.keys(data)}
          active={filter}
          onChange={setFilter}
        />

        <div className="row g-4">
          {filtered.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <ProductCard item={item} onClick={setSelected} />
            </div>
          ))}
        </div>
      </div>

      <PremiumGrid onSelect={setSelected} />

      {/* Pastries Banner — before footer */}
      <PastriesBanner />

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}