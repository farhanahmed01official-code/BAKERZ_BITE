export default function PremiumProductCard({ item, onClick }) {
  const weights = item.weights || ['450GM', '1000GM']

  return (
    <div className="bb-premium-card">
      {/* Image */}
      <div className="bb-premium-img-wrap" onClick={() => onClick?.(item)}>
        <img src={item.image} alt={item.name} />
      </div>

      {/* Content */}
      <div className="bb-premium-body">
        <h3 className="bb-premium-title" onClick={() => onClick?.(item)}>
          {item.name}
        </h3>

        <p className="bb-premium-desc">{item.description}</p>

        {/* Weight pills */}
        <div className="bb-premium-weights">
          {weights.map((w, i) => (
            <span
              className={`bb-weight-pill ${i === 0 ? 'active' : ''}`}
              key={w}
            >
              {w}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="bb-premium-price">
          From <strong>Rs. {item.price}</strong>
        </div>

        {/* Add button */}
        <button
          className="bb-premium-add"
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(item)
          }}
        >
          ADD
        </button>
      </div>
    </div>
  )
}