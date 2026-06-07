import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

import { LoadingState } from '@/components/loading-state'
import { supabase } from '@/lib/supabase/client'

export function PublicLayout() {
  const [loading, setLoading] = useState(true)
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        setLoading(false)
        return
      }

      const { data: perfil } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', session.user.id)
        .single()

      if (!perfil) {
        setLoading(false)
        return
      }

      setRedirectTo(perfil.rol === 'docente' ? '/docentes' : '/alumnos')

      setLoading(false)
    }

    check()
  }, [])

  if (loading) return <LoadingState />

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
