import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { validateEmail, validatePassword } from '../utils/validators'
import '../styles/Auth.css'

const ERROR_MESSAGES = {
  'auth/invalid-credential': 'Credenciales inválidas. Verificá email y contraseña',
  'auth/too-many-requests': 'Demasiados intentos. Intentá más tarde',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email',
  'auth/invalid-email': 'El email no es válido',
  'auth/weak-password': 'La contraseña es muy débil',
}

function AuthForm({ mode }) {
  const isLogin = mode === 'login'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()

  function validate() {
    const emailError = validateEmail(email)
    if (emailError) { setError(emailError); return false }

    const passwordError = validatePassword(password)
    if (passwordError) { setError(passwordError); return false }

    if (!isLogin && password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }

    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validate()) return

    try {
      setLoading(true)
      if (isLogin) {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || `Error al ${isLogin ? 'iniciar sesión' : 'registrar'}. Intentá de nuevo`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

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
              placeholder={isLogin ? '••••••••' : 'Mínimo 6 caracteres'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {!isLogin && (
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
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading
              ? (isLogin ? 'Ingresando...' : 'Registrando...')
              : (isLogin ? 'Ingresar' : 'Registrarse')
            }
          </button>
        </form>

        <p className="auth-link">
          {isLogin ? (
            <>¿No tenés cuenta? <Link to="/register">Registrate</Link></>
          ) : (
            <>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthForm
