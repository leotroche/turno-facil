import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/App'
import { actualizarTurno, eliminarTurno } from '@/services/turno.services'

export function useMutationTurnos() {
  // ------------------------------------------------------------

  const eliminar = useMutation({
    mutationFn: eliminarTurno,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  const actualizar = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<{ estado: 'confirmado' | 'cancelado' | 'pendiente' }>
    }) => actualizarTurno(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  return { eliminar, actualizar }
}
