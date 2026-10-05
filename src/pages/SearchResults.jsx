import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import data from '../data/products.json'

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const [selected, setSelected] = useState(null)

  const allItems = Object.values(data).flat()

  const q = query.toLowerCase().trim()
  const results = q
    ? allItems.filter((item) => {
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.ingredients || []).some((ing) => ing.toLowerCase().includes(q)) ||
          (item.tags || []).some((tag) => tag.toLowerCase().includes(q))
        )
      })
    : []

  return (
    <div className="container my-5 fade-in">
      <div className="search-results-header">
        <h1 className="search-results-title">
          {query ? (
            <>
              Search results for <span className="search-results-q">"{query}"</span>
            </>
          ) : (
            'Search'
          )}
        </h1>
        <p className="search-results-count">
          {results.length} {results.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {query && results.length === 0 && (
        <div className="search-empty">
          <div className="search-empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching for "cake", "croissant", "cookie", or "pie".</p>
          <Link to="/menu" className="search-empty-btn">
            Browse Full Menu →
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <div className="row g-4 mt-2">
          {results.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <ProductCard item={item} onClick={setSelected} />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}