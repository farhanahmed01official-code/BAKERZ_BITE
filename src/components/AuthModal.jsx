import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock, IconUser, IconClose } from './Icons'

export default function AuthModal({ isOpen, mode, onClose, onSwitchMode }) {
  const { login, signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = isLogin
        ? login({ email: form.email, password: form.password })
        : signup({
            name: form.name,
            email: form.email,
            password: form.password
          })

      setLoading(false)

      if (result.success) {
        setForm({ name: '', email: '', password: '' })
        onClose()
      } else {
        setError(result.error)
      }
    }, 400)
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          <IconClose width={14} height={14} />
        </button>

        <div className="auth-modal-header">
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}{' '}
            <span className="auth-brand">Bakerz Bite</span>
          </h2>
          <p className="auth-subtitle">
            {isLogin
              ? 'Sign in to continue'
              : 'Join the Bakerz Bite family'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <IconUser width={16} height={16} />
              </span>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="auth-input-wrap">
            <span className="auth-input-icon">
              <IconMail width={16} height={16} />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="auth-input-wrap">
            <span className="auth-input-icon">
              <IconLock width={16} height={16} />
            </span>
            <input
              type="password"
              placeholder="Password (min 4 chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              minLength={4}
              required
            />
          </div>

          {error && <div className="auth-error">⚠ {error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className="auth-link"
            onClick={() => {
              setError('')
              onSwitchMode(isLogin ? 'signup' : 'login')
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}