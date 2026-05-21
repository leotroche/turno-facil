import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { Tables } from '@/lib/supabase/database.types'
import { eliminarTurno, actualizarTurno, crearTurno } from '@/services/turno.service'

export function useTurnosMutations() {
  const queryClient = useQueryClient()

  // ------------------------------------------------------------

  const crear = useMutation({
    mutationFn: (nuevoTurno: Tables<'turnos'>) => crearTurno(nuevoTurno),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  const actualizar = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Tables<'turnos'>> }) =>
      actualizarTurno(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  const eliminar = useMutation({
    mutationFn: eliminarTurno,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  return {
    crear,
    actualizar,
    eliminar,
  }
}
