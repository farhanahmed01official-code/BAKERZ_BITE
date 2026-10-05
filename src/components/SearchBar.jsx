import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/products.json'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapperRef = useRef(null)
  const navigate = useNavigate()

  const allItems = Object.values(data).flat()

  const q = query.toLowerCase().trim()
  const matches = q
    ? allItems
        .filter((item) => {
          return (
            item.name.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            (item.ingredients || []).some((i) => i.toLowerCase().includes(q)) ||
            (item.tags || []).some((t) => t.toLowerCase().includes(q))
          )
        })
        .slice(0, 6)
    : []

useEffect(() => {
  const closeDropdown = (e) => {
    if (wrapperRef.current && e.target && wrapperRef.current.contains(e.target)) {
      return
    }
    setShowDropdown(false)
  }

  document.addEventListener('click', closeDropdown)
  document.addEventListener('mousedown', closeDropdown)
  window.addEventListener('scroll', closeDropdown, true)

  return () => {
    document.removeEventListener('click', closeDropdown)
    document.removeEventListener('mousedown', closeDropdown)
    window.removeEventListener('scroll', closeDropdown, true)
  }
}, [])
  useEffect(() => {
    setHighlighted(0)
  }, [query])

  const goToSearch = (val) => {
    navigate(`/search?q=${encodeURIComponent(val)}`)
    setShowDropdown(false)
    setQuery('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (matches.length > 0) {
      goToSearch(matches[highlighted].name)
    } else if (query.trim()) {
      goToSearch(query.trim())
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, matches.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <section className="bb-search-section">
      <div className="bb-search-container" ref={wrapperRef}>
        <form className="bb-search-box" onSubmit={handleSubmit}>
          <span className="bb-search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </span>
          <input
  type="text"
  className="bb-search-input"
  placeholder="Search for cakes, pastries, cookies..."
  value={query}
  onChange={(e) => {
    setQuery(e.target.value)
    setShowDropdown(true)
  }}
  onFocus={() => query && setShowDropdown(true)}
  onKeyDown={handleKeyDown}
  onClick={(e) => e.stopPropagation()}
/>
          <button type="submit" className="bb-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

       {showDropdown && q && (
  <div className="bb-search-dropdown" onClick={(e) => e.stopPropagation()}>
            {matches.length > 0 ? (
              <>
                {matches.map((item, i) => (
                  <div
                    key={item.id}
                    className={`bb-search-item ${i === highlighted ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHighlighted(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToSearch(item.name)}
                  >
                    <img src={item.image} alt={item.name} className="bb-search-item-img" />
                    <div className="bb-search-item-info">
                      <div className="bb-search-item-name">{item.name}</div>
                      <div className="bb-search-item-cat">{item.category}</div>
                    </div>
                    <div className="bb-search-item-price">Rs {item.price}</div>
                  </div>
                ))}
                <div
                  className="bb-search-see-all"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToSearch(query.trim())}
                >
                  See all results for "{query}" →
                </div>
              </>
            ) : (
              <div className="bb-search-noresults">
                <span className="bb-search-noresults-icon">🔍</span>
                No matches for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}