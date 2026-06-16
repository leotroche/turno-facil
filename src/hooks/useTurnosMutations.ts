import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { ReservaFormValues } from '@/schemas/reserva-form-schema'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import { eliminarTurno, actualizarTurno, crearTurno, crearReserva, cancelarReserva } from '@/services/turno.service'
import type { TurnoRowUpdate } from '@/types/types'

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
    mutationFn: ({ id, updates }: { id: string; updates: TurnoRowUpdate }) =>
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
    mutationFn: (reserva: ReservaFormValues) => crearReserva(reserva),
    onSuccess: invalidarTurnos,
  })

  // ------------------------------------------------------------

  const cancelar = useMutation({ mutationFn: ( turnoId: string,) => cancelarReserva(turnoId,),
    onSuccess: () => { queryClient.invalidateQueries({
          queryKey: [
            'mis-turnos',
          ],
        },
      )

      queryClient.invalidateQueries(
        {
          queryKey: [
            'turnos',
          ],
        },
      )
    },
  })

  // ------------------------------------------------------------

  return {
    crear,
    actualizar,
    eliminar,
    reservar,
    cancelar,
  }
}
