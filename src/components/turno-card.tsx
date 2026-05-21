import type { Tables } from '@/lib/supabase/database.types'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export function TurnoCard({ turno }: { turno: Tables<'turnos'> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{turno.materia}</CardTitle>

        <CardDescription>{turno.tipo}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Descripción</p>

          <p className="text-muted-foreground text-sm">{turno.descripcion}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Fecha</p>

            <p className="text-muted-foreground">{turno.fecha}</p>
          </div>

          <div>
            <p className="font-medium">Horario</p>

            <p className="text-muted-foreground">
              {turno.hora_inicio} - {turno.hora_fin}
            </p>
          </div>

          <div>
            <p className="font-medium">Docente</p>

            <p className="text-muted-foreground">{turno.docente}</p>
          </div>

          <div>
            <p className="font-medium">Ubicación</p>

            <p className="text-muted-foreground">{turno.ubicacion}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Cupos</p>

            <p className="text-muted-foreground text-sm">{turno.cupo_maximo} disponibles</p>
          </div>

          <Badge>{turno.estado}</Badge>
        </div>
      </CardContent>

      <CardFooter>
        <Button>Reservar</Button>
      </CardFooter>
    </Card>
  )
}
