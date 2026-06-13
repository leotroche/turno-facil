import { Navigate, Outlet } from 'react-router'

import { LoadingState } from '@/components/loading-state'
import { useAuth } from '@/context/auth'

type Props = {
  role: 'alumno' | 'docente'
}

export function ProtectedLayout({ role }: Props) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) return <LoadingState />

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (user && user.rol !== role) return <Navigate to={`/${user.rol}`} replace />

  return <Outlet />
}
