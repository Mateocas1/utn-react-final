import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
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

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>Gestión de Productos</Link>
      </div>

      <button
        className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/about" onClick={closeMenu}>Acerca de</Link>

        {user ? (
          <>
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            <span className="navbar-email">{user.email}</span>
            <button onClick={() => { handleLogout(); closeMenu(); }} className="navbar-logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Ingresar</Link>
            <Link to="/register" onClick={closeMenu}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
