import { useQuery } from '@tanstack/react-query'

import type { Tables } from '@/lib/supabase/database.types'
import { obtenerTurnoPorId, obtenerTurnos } from '@/services/turno.services'

export function useTurnos() {
  return useQuery<Tables<'turnos'>[]>({
    queryKey: ['turnos'],
    queryFn: obtenerTurnos,
  })
}

export function useTurnoById(id: string) {
  return useQuery<Tables<'turnos'> | null>({
    queryKey: ['turnos', id],
    queryFn: () => obtenerTurnoPorId(id),
  })
}
