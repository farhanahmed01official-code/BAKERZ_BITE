import { useState } from 'react'

const faqs = [
  { q: 'Do you offer home delivery?', a: 'Yes, we deliver within 10 km of our store. Delivery is free on orders above Rs 500.' },
  { q: 'Are your products eggless?', a: 'We have both egg and eggless options. Please ask our staff or check the product details for specifics.' },
  { q: 'Can I customize a cake?', a: 'Absolutely! Call us at least 24 hours in advance for custom cakes. We can customize flavours, designs, and messages.' },
  { q: 'What are your store timings?', a: 'We are open from 9 AM to 10 PM, all days of the week. On public holidays, timings may vary.' },
  { q: 'Do you take bulk orders?', a: 'Yes, we take bulk orders for events and parties. Contact us for special pricing and advance booking.' },
  { q: 'Do you have vegan options?', a: 'We have a growing selection of vegan pastries and cakes. Please ask our staff for today\'s options.' },
  { q: 'How do I store my cake?', a: 'Refrigerate cream cakes and consume within 2-3 days. Dry cakes can be stored at room temperature in an airtight container.' }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="container my-5 fade-in">
      <h1 className="text-center faq-title">Frequently Asked Questions</h1>
      <p className="text-center faq-subtitle">
        Everything you need to know about Bakerz Bite
      </p>

      <div className="faq-list mt-4">
        {faqs.map((f, i) => (
          <div
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
            key={i}
          >
            <button
              className="faq-question"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <span>{f.q}</span>
              <svg
                className="faq-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="faq-answer">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}