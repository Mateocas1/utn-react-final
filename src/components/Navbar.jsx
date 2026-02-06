import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Gestión de Productos</Link>
      </div>

      <div className="navbar-links">
        <Link to="/about">Acerca de</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="navbar-email">{user.email}</span>
            <button onClick={handleLogout} className="navbar-logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
