import { useState } from 'react'
import offers from '../data/offers.json'
import {
  IconCroissant,
  IconCake,
  IconCookie,
  IconGift,
  IconHeart,
  IconStar,
  IconClock
} from '../components/Icons'

// Map icon names to SVG components
const ICON_MAP = {
  croissant: IconCroissant,
  cake: IconCake,
  cookie: IconCookie,
  gift: IconGift,
  heart: IconHeart,
  star: IconStar
}

export default function Offers() {
  const [copied, setCopied] = useState(null)

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  return (
    <div className="container my-5 fade-in">
      {/* Header */}
      <div className="offers-header">
        <h1> Special Offers</h1>
        <p>Grab these amazing deals before they're gone!</p>
      </div>

      {/* Offers Grid */}
      <div className="row g-4 mt-4">
        {offers.map((o) => {
          const IconComponent = ICON_MAP[o.icon] || IconStar

          return (
            <div className="col-12 col-md-6 col-lg-4" key={o.id}>
              <div className="offer-card-v2">
                {/* Ribbon */}
                <div
                  className="offer-ribbon"
                  style={{ background: o.color }}
                >
                  Limited Time
                </div>

                {/* Icon circle with SVG */}
                <div
                  className="offer-icon-circle"
                  style={{
                    background: `linear-gradient(135deg, ${o.color}, ${o.color}dd)`
                  }}
                >
                  <IconComponent
                    width={32}
                    height={32}
                    style={{ stroke: '#fff' }}
                  />
                </div>

                {/* Content */}
                <div className="offer-body">
                  <h3 className="offer-title">{o.title}</h3>
                  <p className="offer-subtitle">{o.subtitle}</p>
                  <p className="offer-desc">{o.description}</p>

                  {/* Code */}
                  <div className="offer-code-box">
                    <span className="offer-code-label">Use Code</span>
                    <div className="offer-code-row">
                      <strong className="offer-code-value">{o.code}</strong>
                      <button
                        className={`offer-copy-btn ${
                          copied === o.id ? 'copied' : ''
                        }`}
                        onClick={() => handleCopy(o.code, o.id)}
                      >
                        {copied === o.id ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Valid till */}
                  <div className="offer-valid">
                    <IconClock
                      width={14}
                      height={14}
                      style={{ verticalAlign: 'middle', marginRight: 4 }}
                    />
                    Valid till{' '}
                    {new Date(o.validTill).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom note */}
      <div className="offers-note">
        <p>
          💡 <strong>Tip:</strong> Apply the code at checkout to avail the
          discount. Offers cannot be combined.
        </p>
      </div>
    </div>
  )
}