import { toast } from 'react-toastify'

import { useAuth } from '@/context/auth'
import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import { formatFecha, formatHora } from '@/lib/utils'
import type { Turno } from '@/types/types'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

type Props = {
  turno: Turno
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservaDialog({ turno, open, onOpenChange }: Props) {
  const { reservar } = useTurnosMutations()
  const { user } = useAuth()

  const handleReservar = () => {
    if (!user?.id) {
      toast.error('Usuario no autenticado')
      return
    }

    reservar.mutate(
      { turno_id: turno.id, alumno_id: user.id },
      {
        onSuccess: () => {
          toast.success('Reserva realizada correctamente')
          onOpenChange(false)
        },
        onError: () => toast.error('Ya reservaste este turno o ocurrió un error'),
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Confirmar reserva</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{turno.materia}</h3>

            <p className="text-muted-foreground text-sm">{turno.docente.nombre}</p>
          </div>

          <div className="bg-muted/40 space-y-3 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Fecha</span>
              <span className="font-medium">{formatFecha(turno.fecha)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Horario</span>
              <span className="font-medium">
                {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Ubicación</span>
              <span className="font-medium">{turno.ubicacion}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Verificá los datos antes de confirmar la reserva.
          </p>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>

            <Button onClick={handleReservar} disabled={reservar.isPending}>
              {reservar.isPending ? 'Reservando...' : 'Confirmar reserva'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
