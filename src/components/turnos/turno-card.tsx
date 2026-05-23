import { formatFecha, formatHora } from '@/lib/utils'
import type { TurnoConCantidadReservas } from '@/types/types'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

export function TurnoCard({ turno }: { turno: TurnoConCantidadReservas }) {
  const isFull = turno.estado === 'lleno'
  const isClosed = turno.estado === 'cerrado'

  const isDisabled = isFull || isClosed

  return (
    <Card className="space-y-2">
      <CardHeader className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs tracking-wide uppercase">
            {turno.tipo}
          </CardDescription>

          <Badge variant={isFull ? 'destructive' : isClosed ? 'secondary' : 'success'}>
            {turno.estado}
          </Badge>
        </div>

        <div className="space-y-1">
          <CardTitle className="font-medium">{turno.materia}</CardTitle>
          <CardDescription className="leading-relaxed">{turno.descripcion}</CardDescription>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-2 gap-x-12 gap-y-4">
        <div className="space-y-1">
          <p className="text-muted-foreground">Fecha</p>
          <p className="font-medium">{formatFecha(turno.fecha)}</p>
        </div>

        <div className="space-y-1">
          <p className="text-muted-foreground">Horario</p>
          <p className="font-medium">
            {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)} hs
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-muted-foreground">Docente</p>
          <p className="font-medium">{turno.docente}</p>
        </div>

        <div className="space-y-1">
          <p className="text-muted-foreground">Ubicación</p>
          <p className="font-medium">{turno.ubicacion}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-muted-foreground">Cupos</p>
          <p className="font-medium">
            {turno.cupo_maximo - turno.cantidad_reservas} de {turno.cupo_maximo} disponibles
          </p>
        </div>

        <Button disabled={isDisabled} variant={isDisabled ? 'secondary' : 'default'}>
          {isFull ? 'Sin cupos' : isClosed ? 'Cerrado' : 'Reservar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
