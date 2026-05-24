import { useQuery } from '@tanstack/react-query'

import type { Tables } from '@/lib/supabase/database.types'
import { obtenerTurnoPorId, obtenerTurnos } from '@/services/turno.service'
import type { TurnoConCantidadReservas } from '@/types/types'

// --------------------------------------------------------------------------------

export function useTurnos() {
  const { data, isPending, error } = useQuery<TurnoConCantidadReservas[]>({
    queryKey: ['turnos'],
    queryFn: obtenerTurnos,
  })

  return {
    turnos: data ?? [],
    isPending,
    error,
  }
}

// --------------------------------------------------------------------------------

export function useTurno(id: string) {
  const { data, isPending, error } = useQuery<Tables<'turnos'>>({
    queryKey: ['turnos', id],
    queryFn: () => obtenerTurnoPorId(id),
    enabled: !!id,
  })

  return {
    turno: data,
    isPending,
    error,
  }
}
