import { Navigate, Outlet } from 'react-router'

import { LoadingState } from '@/components/loading-state'
import { useAuth } from '@/context/auth'

export function PublicLayout() {
  const { loading, isAuthenticated, user } = useAuth()

  if (loading) return <LoadingState />

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.rol}`} replace />
  }

  return <Outlet />
}
