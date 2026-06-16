import type { Turno } from '@/types/types'

import { TurnoCard } from './turno-card'

type Props = {
  turnos: Turno[]
  mode?:
    | 'default'
    | 'mis-turnos'
}

export function TurnosGrid({ turnos, mode = 'default' }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {turnos.map((turno) => (
        <TurnoCard key={turno.id} turno={turno} mode={mode} />
      ))}
    </div>
  )
}
