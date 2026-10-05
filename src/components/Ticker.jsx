import { useEffect, useState } from 'react'
import { IconClock, IconLocation, IconCupcake } from './Icons'

export default function Ticker() {
  const [now, setNow] = useState(new Date())
  const [location, setLocation] = useState('Detecting location...')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(
            `Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)}`
          )
        },
        () => setLocation('Location unavailable')
      )
    } else {
      setLocation('Geolocation not supported')
    }

    return () => clearInterval(timer)
  }, [])

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const timeStr = now.toLocaleTimeString('en-IN')

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <span className="ticker-item">
          <IconClock width={14} height={14} className="ticker-icon" />
          {dateStr}
        </span>

        <span className="ticker-sep">|</span>

        <span className="ticker-item">
          <IconClock width={14} height={14} className="ticker-icon" />
          {timeStr}
        </span>

        <span className="ticker-sep">|</span>

        <span className="ticker-item">
          <IconLocation width={14} height={14} className="ticker-icon" />
          {location}
        </span>

        <span className="ticker-sep">|</span>

        <span className="ticker-item">
          <IconCupcake width={14} height={14} className="ticker-icon" />
          Bakerz Bite — Where smiles are served daily!
        </span>

        {/* Space between loops */}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  )
}