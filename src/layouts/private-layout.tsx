import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

import { LoadingState } from '@/components/loading-state'
import { supabase } from '@/lib/supabase/client'

export function PrivateLayout() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingState />

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
