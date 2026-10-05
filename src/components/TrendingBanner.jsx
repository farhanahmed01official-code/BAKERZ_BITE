import { useNavigate } from 'react-router-dom'

const trending = [
  {
    id: 't1',
    name: 'Chocolate Truffle',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80',
    category: 'cakes',
    searchTerm: 'Chocolate Truffle Cake'
  },
  {
    id: 't2',
    name: 'Artisan Croissants',
    tag: 'Fresh Daily',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80',
    category: 'pastries',
    searchTerm: 'Butter Croissant'
  },
  {
    id: 't3',
    name: 'Gourmet Cookies',
    tag: 'Hot Selling',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&q=80',
    category: 'cookies',
    searchTerm: 'Choco Chip Cookie'
  },
  {
    id: 't4',
    name: 'Seasonal Pies',
    tag: 'Limited',
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=900&q=80',
    category: 'pies',
    searchTerm: 'Apple Pie'
  }
]

export default function TrendingBanner() {
  const navigate = useNavigate()

  const handleClick = (item) => {
    navigate(`/search?q=${encodeURIComponent(item.searchTerm)}`)
  }

  return (
    <section className="bb-trending">
      <h2 className="bb-trending-title">Trending</h2>
      <p className="bb-trending-sub">What everyone's ordering this week</p>

      <div className="bb-trending-grid">
        {trending.map((t) => (
          <div
            className="bb-trending-card"
            key={t.id}
            onClick={() => handleClick(t)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClick(t)
            }}
          >
            <img src={t.image} alt={t.name} />
            <div className="bb-trending-overlay"></div>
            <div className="bb-trending-info">
              <span className="bb-trending-tag">{t.tag}</span>
              <h3>{t.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}