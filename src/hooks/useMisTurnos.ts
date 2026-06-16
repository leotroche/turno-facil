import { useQuery } from '@tanstack/react-query'

import { obtenerMisTurnos } from '@/services/turno.service'
import type { Turno } from '@/types/types'

export function useMisTurnos() {
  const { data, isPending, error } = useQuery<Turno[]>({
    queryKey: ['mis-turnos'],
    queryFn: obtenerMisTurnos,
  })

  return {
    turnos: data ?? [],
    isPending,
    error,
  }
}
