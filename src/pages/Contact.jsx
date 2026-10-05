import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Save to localStorage
    const stored = localStorage.getItem('bb_contact_messages')
    const messages = stored ? JSON.parse(stored) : []
    messages.push({ ...form, date: new Date().toLocaleString() })
    localStorage.setItem('bb_contact_messages', JSON.stringify(messages))

    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })

    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="container my-5 fade-in">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We'd love to hear from you!</p>
      </div>

      {/* Contact Form (full width, centered) */}
      <div className="contact-form-card">
        {submitted && (
          <div className="contact-success">
            ✓ Thank you! Your message has been sent successfully.
          </div>
        )}

        <h2 className="contact-form-title">Send us a Message</h2>
        <p className="contact-form-subtitle">
          Fill out the form below and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="contact-label">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                className="contact-input"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="contact-label">
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                className="contact-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="contact-label">
                Phone <span>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="contact-input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="contact-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="contact-input"
                placeholder="What is this about?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="contact-label">
                Message <span>*</span>
              </label>
              <textarea
                name="message"
                className="contact-input contact-textarea"
                placeholder="Tell us how we can help you..."
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="contact-submit-btn">
                Send Message →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}