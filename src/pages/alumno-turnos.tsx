import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { EmptyState } from '@/components/empty-state'
import { FiltroFecha } from '@/components/filtros/fecha'
import { FiltroMateria } from '@/components/filtros/materia'
import { FiltroProfesor } from '@/components/filtros/profesor'
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
  const navigate = useNavigate()

  // FILTROS
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [profesor, setProfesor] = useState('')

  const turnosFiltrados = turnos.filter((t) => {
    const coincideMateria =
      !materia || materia === '__all__' || normalizar(t.materia ?? '').includes(normalizar(materia))

    const coincideFecha = !fecha || t.fecha.slice(0, 10) === format(fecha, 'yyyy-MM-dd')

    const coincideProfesor =
      !profesor || normalizar(t.docente?.nombre ?? '').includes(normalizar(profesor))

    return coincideMateria && coincideFecha && coincideProfesor
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
          <Button onClick={() => navigate('/alumno/mis-turnos')}>Mis Turnos</Button>

          <Button variant="outline" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {/* FILTROS */}
      <div className="bg-card space-y-4 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs">Materia · Fecha · Profesor</p>
        <div className="flex flex-wrap gap-4">
          <FiltroMateria value={materia} onValueChange={setMateria} />

          <FiltroFecha value={fecha} onChange={setFecha} />

          <FiltroProfesor value={profesor} onChange={setProfesor} />
        </div>
      </div>
      <div className="w-full">{content}</div>
    </section>
  )
}
