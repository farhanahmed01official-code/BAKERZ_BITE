import { useState } from 'react'

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const [feedbacks, setFeedbacks] = useState(() => {
    const stored = localStorage.getItem('bb_feedbacks')
    return stored ? JSON.parse(stored) : []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = [...feedbacks, { ...form, date: new Date().toLocaleString() }]
    setFeedbacks(updated)
    localStorage.setItem('bb_feedbacks', JSON.stringify(updated))
    setSubmitted(true)
    setForm({ name: '', email: '', rating: 5, comment: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="container my-5 fade-in">
      <h1 className="text-center">Feedback & Rating</h1>
      <p className="text-center text-muted">We'd love your feedback!</p>

      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {submitted && (
            <div className="alert alert-success">✅ Thank you for your feedback!</div>
          )}

          <form onSubmit={handleSubmit} className="feedback-form">
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-3"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              className="form-control mb-3"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Rating</label>
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className="star-select"
                  onClick={() => setForm({ ...form, rating: n })}
                >
                  {n <= form.rating ? '★' : '☆'}
                </span>
              ))}
            </div>

            <label>Comment</label>
            <textarea
              className="form-control mb-3"
              rows="3"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            ></textarea>

            <button type="submit" className="btn btn-primary w-100">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {feedbacks.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center">What Others Say</h3>
          <div className="row g-3 mt-2">
            {feedbacks.slice(-6).reverse().map((f, i) => (
              <div className="col-md-4" key={i}>
                <div className="feedback-item">
                  <strong>{f.name}</strong>
                  <div className="stars">
                    {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                  </div>
                  <p className="small mb-0">{f.comment}</p>
                  <small className="text-muted">{f.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}