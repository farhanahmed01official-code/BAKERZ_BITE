import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/products.json'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const allItems = Object.values(data).flat()

  const q = query.toLowerCase().trim()
  const matches = q
    ? allItems
        .filter((item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        )
        .slice(0, 5)
    : []

  // Reset on open
  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  const handleItemClick = (name) => {
    navigate(`/search?q=${encodeURIComponent(name)}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="bb-search-modal-overlay" onClick={onClose}>
      <div className="bb-search-modal" onClick={(e) => e.stopPropagation()}>
        <form className="bb-search-modal-form" onSubmit={handleSubmit}>
          <span className="bb-search-modal-icon">🔍</span>
          <input
            type="text"
            className="bb-search-modal-input"
            placeholder="Search for cakes, pastries, cookies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="button" className="bb-search-modal-close" onClick={onClose}>
            ✕
          </button>
        </form>

        {q && (
          <div className="bb-search-modal-results">
            {matches.length > 0 ? (
              <>
                {matches.map((item) => (
                  <div
                    key={item.id}
                    className="bb-search-modal-item"
                    onClick={() => handleItemClick(item.name)}
                  >
                    <img src={item.image} alt={item.name} />
                    <div>
                      <div className="bb-search-modal-item-name">{item.name}</div>
                      <div className="bb-search-modal-item-cat">{item.category}</div>
                    </div>
                    <span className="bb-search-modal-item-price">Rs {item.price}</span>
                  </div>
                ))}
                <div
                  className="bb-search-modal-see-all"
                  onClick={handleSubmit}
                >
                  See all results for "{query}" →
                </div>
              </>
            ) : (
              <div className="bb-search-modal-empty">
                No matches for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}