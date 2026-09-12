import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

// Gate a route behind authentication. `admin` requires the admin role.
export default function RequireAuth({ children, admin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="auth-loading">Caricamento…</div>
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (admin && !isAdmin) return <Navigate to="/app" replace />
  return children
}
