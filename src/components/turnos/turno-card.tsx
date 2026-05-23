import { formatFecha, formatHora } from '@/lib/utils'
import type { TurnoConCantidadReservas } from '@/types/types'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

export function TurnoCard({ turno }: { turno: TurnoConCantidadReservas }) {
  const isFull = turno.estado === 'lleno'
  const isClosed = turno.estado === 'cerrado'

  const isDisabled = isFull || isClosed

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs tracking-wide uppercase">
            {turno.tipo}
          </CardDescription>

          <Badge
            className="capitalize"
            variant={isFull ? 'destructive' : isClosed ? 'secondary' : 'success'}
          >
            {turno.estado}
          </Badge>
        </div>

        <CardTitle className="text-lg leading-tight font-semibold">{turno.materia}</CardTitle>
      </CardHeader>

      {/* -------------------------------------------------------------------------------- */}

      <CardContent className="flex-1 space-y-4">
        {/* DESCRIPCIÓN */}

        <p className="text-muted-foreground leading-relaxed">{turno.descripcion}</p>

        {/* FECHA Y HORARIO */}

        <div className="border-border/60 space-y-1 border-y py-4">
          <p className="font-medium capitalize">{formatFecha(turno.fecha)}</p>
          <p className="text-muted-foreground text-xs">
            {formatHora(turno.hora_inicio)} a {formatHora(turno.hora_fin)} hs
          </p>
        </div>

        {/* DOCENTE Y UBICACIÓN */}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Docente</p>
            <p className="truncate font-medium">{turno.docente}</p>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Ubicación</p>
            <p className="truncate font-medium">{turno.ubicacion}</p>
          </div>
        </div>
      </CardContent>

      {/* -------------------------------------------------------------------------------- */}

      <CardFooter className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs">Cupos</p>
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
