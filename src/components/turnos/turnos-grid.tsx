import type { TurnoConCantidadReservas } from '@/types/types'

import { TurnoCard } from './turno-card'

export function TurnosGrid({ turnos }: { turnos: TurnoConCantidadReservas[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {turnos.map((turno) => (
        <TurnoCard key={turno.id} turno={turno} />
      ))}
    </div>
  )
}
