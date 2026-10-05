import { useEffect, useState } from 'react'

export default function VisitorCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('bb_visitor_count')
    const base = stored ? parseInt(stored, 10) : 1247
    const next = base + 1
    localStorage.setItem('bb_visitor_count', next)
    setCount(next)
  }, [])

  return (
    <span className="visitor-count">
      👥 Visitors: {count.toLocaleString()}
    </span>
  )
}