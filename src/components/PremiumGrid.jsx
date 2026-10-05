import PremiumProductCard from './PremiumProductCard'
import PremiumBanner from './PremiumBanner'

const premiumItems = [
  {
    id: 'pm1',
    name: 'Premio Malteser Cake',
    description: 'Indulge in layers of chocolaty bliss, interlaced with the crunch of malt...',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=60&fm=webp',
    price: 1059,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm2',
    name: 'Premio Three Milk Vanilla Cake',
    description: 'Savor the divine indulgence of our Three Milk Cake, where a velvety...',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60&fm=webp',
    price: 1686,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm3',
    name: 'Ferrero Rocher',
    description: 'Rich chocolate cake topped with golden Ferrero Rocher for a luxurious...',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=60&fm=webp',
    price: 1212,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm4',
    name: 'Premio Cake Raffaello Classic',
    description: 'Indulge in the luxurious taste of Premio Cake Raffaello Classic, a soft...',
    image: 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&q=60&fm=webp',
    price: 1822,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm5',
    name: 'Three Milk Cake',
    description: 'A classic tres leches cake, moist and delicious with a creamy topping.',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=60&fm=webp',
    price: 1450,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm6',
    name: 'Premio Coffee Cake',
    description: 'Rich coffee-flavored cake with a smooth mocha cream and a hint of...',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=60&fm=webp',
    price: 1280,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm7',
    name: 'Premio Raffaello',
    description: 'Delicate coconut and almond cake with white chocolate shavings on top.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=60&fm=webp',
    price: 1620,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  },
  {
    id: 'pm8',
    name: 'Ferrero Classic',
    description: 'A chocolate hazelnut delight topped with rich Nutella and Ferrero...',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=60&fm=webp',
    price: 1720,
    weights: ['450GM', '1000GM'],
    category: 'cakes'
  }
]

export default function PremiumGrid({ onSelect }) {
  return (
    <section className="bb-premium-section">
      {/* Slider Banner */}
      <PremiumBanner />

      {/* Heading + Grid */}
      <div className="bb-premium-inner">
        <header className="bb-premium-head">
          <h2> Premio Cakes</h2>
          <p>Handcrafted with the finest ingredients</p>
        </header>

        <div className="bb-premium-grid">
          {premiumItems.map((item) => (
            <PremiumProductCard
              key={item.id}
              item={item}
              onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}