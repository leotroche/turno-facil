import { useQueryClient, useMutation } from '@tanstack/react-query'

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
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TurnoFormValues> }) =>
      actualizarTurno(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  const eliminar = useMutation({
    mutationFn: (id: string) => eliminarTurno(id),

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
