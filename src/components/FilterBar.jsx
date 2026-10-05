export default function FilterBar({ categories, active, onChange }) {
  return (
    <div className="text-center my-4">
      <button
        className={`filter-btn ${active === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          className={`filter-btn ${active === c ? 'active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </button>
      ))}
    </div>
  )
}