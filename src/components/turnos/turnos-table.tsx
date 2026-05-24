import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TurnoConCantidadReservas } from '@/types/types'

import { Badge } from '../ui/badge'
import { TurnoActionDropdown } from './turno-action-dropdown'

type Props = {
  turnos: TurnoConCantidadReservas[]
  onUpdate: (turno: TurnoConCantidadReservas) => void
  onDelete: (id: string) => void
  onClose: (id: string) => void
  onReopen: (id: string) => void
}

export function TurnosTable({ turnos, onUpdate, onDelete, onClose, onReopen }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Horario</TableHead>

          <TableHead>Materia</TableHead>
          <TableHead>Tipo</TableHead>

          <TableHead>Docente</TableHead>
          <TableHead>Ubicación</TableHead>

          <TableHead>Cupo</TableHead>
          <TableHead>Reservas</TableHead>

          <TableHead>Estado</TableHead>

          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {turnos.map((turno) => {
          const isFull = turno.estado === 'lleno'
          const isClosed = turno.estado === 'cerrado'

          return (
            <TableRow key={turno.id}>
              <TableCell>{turno.fecha}</TableCell>

              <TableCell>
                {turno.hora_inicio} - {turno.hora_fin}
              </TableCell>

              <TableCell>{turno.materia}</TableCell>

              <TableCell>{turno.tipo}</TableCell>

              <TableCell>{turno.docente}</TableCell>

              <TableCell>{turno.ubicacion}</TableCell>

              <TableCell>{turno.cupo_maximo}</TableCell>

              <TableCell>{turno.cantidad_reservas}</TableCell>

              <TableCell>
                <Badge variant={isFull ? 'destructive' : isClosed ? 'secondary' : 'success'}>
                  {turno.estado}
                </Badge>
              </TableCell>

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
