import { useEffect, useState } from 'react'

export default function Toast({ toasts = [], removeToast }) {
  const safeToasts = Array.isArray(toasts) ? toasts : []

  return (
    <div className="bb-toast-container">
      {safeToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast && removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2700)
    const removeTimer = setTimeout(() => onClose && onClose(), 3000)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(removeTimer)
    }
  }, [onClose])

  return (
    <div className={`bb-toast ${leaving ? 'leaving' : ''}`}>
      <div className="bb-toast-img">
        <img src={toast.image} alt={toast.name} />
      </div>
      <div className="bb-toast-info">
        <div className="bb-toast-title">✓ Added to Cart</div>
        <div className="bb-toast-name">{toast.name}</div>
        <div className="bb-toast-price">Rs {toast.price}</div>
      </div>
      <button className="bb-toast-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  )
}