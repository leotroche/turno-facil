import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { Tables } from '@/lib/supabase/database.types'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import { eliminarTurno, actualizarTurno, crearTurno } from '@/services/turno.service'

export function useTurnosMutations() {
  const queryClient = useQueryClient()

  // ------------------------------------------------------------

  const crear = useMutation({
    mutationFn: (nuevoTurno: TurnoFormValues) => crearTurno(nuevoTurno),

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
