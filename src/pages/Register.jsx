import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import '../styles/Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()

  function validateForm() {
    if (!email.trim()) {
      setError('El email es obligatorio')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('El email no es válido')
      return false
    }
    if (!password) {
      setError('La contraseña es obligatoria')
      return false
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    try {
      setLoading(true)
      await register(email, password)
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Ya existe una cuenta con ese email')
          break
        case 'auth/invalid-email':
          setError('El email no es válido')
          break
        case 'auth/weak-password':
          setError('La contraseña es muy débil')
          break
        default:
          setError('Error al registrar. Intentá de nuevo')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Crear Cuenta</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repetí tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a>
        </p>
      </div>
    </div>
  )
}

export default Register
