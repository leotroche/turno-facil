import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { TablesUpdate } from '@/lib/supabase/database.types'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import { eliminarTurno, actualizarTurno, crearTurno, crearReserva } from '@/services/turno.service'

export function useTurnosMutations() {
  const queryClient = useQueryClient()

  const invalidarTurnos = () => queryClient.invalidateQueries({ queryKey: ['turnos'] })

  // ------------------------------------------------------------

  const crear = useMutation({
    mutationFn: (nuevoTurno: TurnoFormValues) => crearTurno(nuevoTurno),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turnos'] })
    },
  })

  // ------------------------------------------------------------

  const actualizar = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TablesUpdate<'turnos'> }) =>
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

  const reservar = useMutation({
    mutationFn: (reserva: { turno_id: string; alumno: string; legajo: string }) =>
      crearReserva(reserva),
    onSuccess: invalidarTurnos,
  })

  // ------------------------------------------------------------

  return {
    crear,
    actualizar,
    eliminar,
    reservar,
  }
}
