import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi, tokens } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hydrate from an existing token on first mount.
  useEffect(() => {
    let alive = true
    async function hydrate() {
      if (!tokens.access) {
        setLoading(false)
        return
      }
      try {
        const me = await authApi.me()
        if (alive) setUser(me)
      } catch {
        tokens.clear()
      } finally {
        if (alive) setLoading(false)
      }
    }
    hydrate()
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const resp = await authApi.login(email, password)
    setUser(resp.user)
    return resp.user
  }, [])

  const register = useCallback(async (email, password, name) => {
    const resp = await authApi.register(email, password, name)
    setUser(resp.user)
    return resp.user
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
  }, [])

  const refreshMe = useCallback(async () => {
    const me = await authApi.me()
    setUser(me)
    return me
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    refreshMe,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
