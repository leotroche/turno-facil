import { useQuery } from '@tanstack/react-query'

import { obtenerTurnoPorId, obtenerTurnos } from '@/services/turno.service'
import type { Turno } from '@/types/types'

// --------------------------------------------------------------------------------

export function useTurnos() {
  const { data, isPending, error } = useQuery<Turno[]>({
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
  const { data, isPending, error } = useQuery<Turno>({
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
