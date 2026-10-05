import { useState } from 'react'
import { useCart } from '../context/CartContext'
import MerchCard from '../components/MerchCard'
import merchandise from '../data/merchandise.json'

export default function Merchandise() {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(null)

  const handleAdd = (item) => {
    addToCart(item, 1)
    setAdded(item.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="container my-5 fade-in">
      <div className="merch-header">
        <h1> Baker's Merchandise</h1>
        <p>Take a piece of Bakerz Bite home</p>
      </div>

      <div className="row g-4 mt-4">
        {merchandise.map((m) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={m.id}>
            <MerchCard item={m} added={added === m.id} onAdd={handleAdd} />
          </div>
        ))}
      </div>
    </div>
  )
}