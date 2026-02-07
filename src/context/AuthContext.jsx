import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../services/firebase'
import { AuthContext } from './AuthContextDef'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const register = useCallback((email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const login = useCallback((email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }, [])

  const logout = useCallback(() => {
    return signOut(auth)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    register,
    login,
    logout,
  }), [user, loading, register, login, logout])

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div style={{padding:'2rem',textAlign:'center'}}>Cargando sesión...</div> : children}
    </AuthContext.Provider>
  )
}
