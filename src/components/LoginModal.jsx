import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock, IconClose, IconCheck } from './Icons'

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen && !success) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = login({ email: form.email, password: form.password })
      setLoading(false)

      if (result.success) {
        setSuccess(true)
        setForm({ email: '', password: '' })

        setTimeout(() => {
          setSuccess(false)
          onClose()
        }, 1800)
      } else {
        setError(result.error)
      }
    }, 400)
  }

  return (
    <div className="auth-modal-overlay" onClick={success ? null : onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {!success && (
          <button className="auth-modal-close" onClick={onClose}>
            <IconClose width={14} height={14} />
          </button>
        )}

        {success ? (
          <div className="auth-success">
            <div className="auth-success-circle">
              <IconCheck width={48} height={48} />
            </div>
            <h2 className="auth-success-title">Login Successful</h2>
            <p className="auth-success-sub">Welcome back to Bakerz Bite!</p>
          </div>
        ) : (
          <>
            <div className="auth-modal-header">
              <h2 className="auth-title">
                Join <span className="auth-brand">Bakerz Bite</span>
              </h2>
              <p className="auth-subtitle">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <IconMail width={16} height={16} />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <IconLock width={16} height={16} />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              {error && <div className="auth-error">⚠ {error}</div>}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}