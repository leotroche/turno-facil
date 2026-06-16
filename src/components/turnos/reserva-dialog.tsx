import { toast } from 'react-toastify'

import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import { useAuth } from '@/context/auth'
import type { Turno } from '@/types/types'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

type Props = {
  turno: Turno
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservaDialog({
  turno,
  open,
  onOpenChange,
}: Props) {
  const { reservar } = useTurnosMutations()
  const { user } = useAuth()

  const handleReservar = () => {
    if (!user?.id) {
      toast.error('Usuario no autenticado')
      return
    }

    reservar.mutate(
      {
        turno_id: turno.id,
        alumno_id: user.id,
      },
      {
        onSuccess: () => {
          toast.success(
            'Reserva realizada correctamente',
          )

          onOpenChange(false)
        },

        onError: () => {
          toast.error(
            'Ya reservaste este turno o ocurrió un error',
          )
        },
      },
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="sm:max-w-md"
        aria-describedby={undefined}
      >
        <DialogHeader className="border-b pb-4">
          <DialogTitle>
            Confirmar reserva
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <p className="font-medium">
              {turno.materia}
            </p>

            <p className="text-muted-foreground text-sm">
              {turno.docente.nombre}
            </p>
          </div>

          <div className="rounded-lg border p-4 text-sm">
            <p>
              <strong>Fecha:</strong>{' '}
              {turno.fecha}
            </p>

            <p>
              <strong>Horario:</strong>{' '}
              {turno.hora_inicio} -{' '}
              {turno.hora_fin}
            </p>

            <p>
              <strong>Ubicación:</strong>{' '}
              {turno.ubicacion}
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancelar
            </Button>

            <Button
              onClick={handleReservar}
              disabled={reservar.isPending}
            >
              {reservar.isPending
                ? 'Reservando...'
                : 'Confirmar reserva'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}