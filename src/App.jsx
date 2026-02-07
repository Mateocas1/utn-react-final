import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'

function App() {
  const { user } = useAuth()

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="app">
          <Navbar />
          <main className="main-content">
            {/* Nested routes */}
            <Outlet />
          </main>
        </div>
      ),
      children: [
        {
          path: '/login',
          element: user ? <Navigate to="/dashboard" replace /> : <Login />,
        },
        {
          path: '/register',
          element: user ? <Navigate to="/dashboard" replace /> : <Register />,
        },
        {
          path: '/dashboard',
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/',
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: '*',
          element: <div style={{padding:'2rem',textAlign:'center'}}>Página no encontrada</div>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
