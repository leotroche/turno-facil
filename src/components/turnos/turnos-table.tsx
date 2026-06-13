import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatFecha, formatHora } from '@/lib/utils'
import type { Turno } from '@/types/types'

import { Badge } from '../ui/badge'
import { TurnoActionDropdown } from './turno-action-dropdown'

type Props = {
  turnos: Turno[]
  onUpdate: (turno: Turno) => void
  onDelete: (id: string) => void
  onClose: (id: string) => void
  onReopen: (id: string) => void
}

export function TurnosTable({ turnos, onUpdate, onDelete, onClose, onReopen }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* TIEMPO */}
          <TableHead>Fecha</TableHead>
          <TableHead>Horario</TableHead>

          {/* CONTENIDO */}
          <TableHead>Materia</TableHead>
          <TableHead>Tipo</TableHead>

          {/* LOGÍSTICA */}
          <TableHead>Ubicación</TableHead>

          {/* CAPACIDAD */}
          <TableHead>Cupo</TableHead>
          <TableHead>Reservas</TableHead>

          {/* ESTADO */}
          <TableHead>Estado</TableHead>

          {/* ACCIONES */}
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {turnos.map((turno) => {
          const isFull = turno.estado === 'lleno'
          const isClosed = turno.estado === 'cerrado'

          return (
            <TableRow key={turno.id}>
              {/* TIEMPO */}
              <TableCell>{formatFecha(turno.fecha)}</TableCell>
              <TableCell>
                {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}
              </TableCell>

              {/* CONTENIDO */}
              <TableCell>{turno.materia}</TableCell>
              <TableCell>{turno.tipo}</TableCell>

              {/* LOGÍSTICA */}
              <TableCell>{turno.ubicacion}</TableCell>

              {/* CAPACIDAD */}
              <TableCell>{turno.cupo_maximo}</TableCell>
              <TableCell>{turno.cantidad_reservas}</TableCell>

              {/* ESTADO */}
              <TableCell>
                <Badge variant={isFull ? 'destructive' : isClosed ? 'secondary' : 'success'}>
                  {turno.estado}
                </Badge>
              </TableCell>

              {/* ACCIONES */}
              <TableCell className="text-right">
                <TurnoActionDropdown
                  turno={turno}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onClose={onClose}
                  onReopen={onReopen}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
