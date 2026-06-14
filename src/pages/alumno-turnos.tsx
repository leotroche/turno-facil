import { format } from 'date-fns'
import { useState } from 'react'

import { EmptyState } from '@/components/empty-state'
import { FiltroFecha } from '@/components/filtros/fecha'
import { FiltroMateria } from '@/components/filtros/materia'
import { LoadingState } from '@/components/loading-state'
import { TurnosGrid } from '@/components/turnos/turnos-grid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth'
import { useTurnos } from '@/hooks/useTurnos'
import { normalizar } from '@/lib/utils'

export function AlumnoTurnos() {
  const { turnos, isPending } = useTurnos()
  const { user, logout } = useAuth()

  // FILTROS
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState<Date | undefined>(undefined)

  const turnosFiltrados = turnos.filter((t) => {
    const coincideMateria =
      !materia || materia === '__all__' || normalizar(t.materia) === normalizar(materia)

    const coincideFecha = !fecha || t.fecha.slice(0, 10) === format(fecha, 'yyyy-MM-dd')

    return coincideMateria && coincideFecha
  })

  let content

  if (isPending) {
    content = <LoadingState message="Cargando turnos..." />
  } else if (turnosFiltrados.length === 0) {
    content = <EmptyState message="No hay turnos para los filtros seleccionados" />
  } else {
    content = <TurnosGrid turnos={turnosFiltrados} />
  }

  return (
    <section className="flex flex-col gap-10">
      <header className="bg-card flex w-full items-center justify-between rounded-2xl border px-8 py-6 shadow-sm">
        {/* INFO */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge>Alumno</Badge>

            {user?.legajo && <Badge variant="secondary">Legajo {user.legajo}</Badge>}
          </div>

          <h2 className="text-2xl font-semibold">{user?.nombre}</h2>

          <p className="text-muted-foreground text-sm">Turnos disponibles</p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {/* FILTROS */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-medium">Filtrar turnos</h3>
          <p className="text-muted-foreground text-sm">Filtrá los turnos por materia o fecha.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <FiltroMateria value={materia} onValueChange={setMateria} />

          <FiltroFecha value={fecha} onChange={setFecha} />
        </div>
      </div>
      <div className="w-full">{content}</div>
    </section>
  )
}
