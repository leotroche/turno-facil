import { useMisTurnos } from '@/hooks/useMisTurnos'
import type { Turno } from '@/types/types'

import { TurnoCard } from './turno-card'

type Props = {
  turnos: Turno[]
}

export function TurnosGrid({ turnos }: Props) {
  const { turnos: misTurnos = [] } = useMisTurnos()

  const misTurnosIds = new Set(misTurnos.map((turno) => turno.id))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {turnos.map((turno) => (
        <TurnoCard key={turno.id} turno={turno} reservado={misTurnosIds.has(turno.id)} />
      ))}
    </div>
  )
}
