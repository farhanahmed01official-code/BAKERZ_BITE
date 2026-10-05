import { useEffect, useState } from 'react'

export default function WishlistToast({ toasts = [], removeToast }) {
  const safeToasts = Array.isArray(toasts) ? toasts : []

  return (
    <div className="bb-wishlist-toast-container">
      {safeToasts.map((toast) => (
        <WishlistToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast && removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

function WishlistToastItem({ toast, onClose }) {
  const [leaving, setLeaving] = useState(false)
  const isAdded = toast.type === 'added'

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2700)
    const removeTimer = setTimeout(() => onClose && onClose(), 3000)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(removeTimer)
    }
  }, [onClose])

  return (
    <div className={`bb-wishlist-toast ${isAdded ? 'added' : 'removed'} ${leaving ? 'leaving' : ''}`}>
      {/* Icon */}
      <div className="bb-wlt-icon">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill={isAdded ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      {/* Info */}
      <div className="bb-wlt-info">
        <div className="bb-wlt-title">
          {isAdded ? '❤ Added to Wishlist' : '− Removed from Wishlist'}
        </div>
        <div className="bb-wlt-name">{toast.name}</div>
      </div>

      {/* Close */}
      <button className="bb-wlt-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  )
}