import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import '../styles/Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

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
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    try {
      setLoading(true)
      await login(email, password)
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No existe un usuario con ese email')
          break
        case 'auth/wrong-password':
          setError('Contraseña incorrecta')
          break
        case 'auth/invalid-credential':
          setError('Credenciales inválidas. Verificá email y contraseña')
          break
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Intentá más tarde')
          break
        default:
          setError('Error al iniciar sesión. Intentá de nuevo')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar Sesión</h2>

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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-link">
          ¿No tenés cuenta? <a href="/register">Registrate</a>
        </p>
      </div>
    </div>
  )
}

export default Login
