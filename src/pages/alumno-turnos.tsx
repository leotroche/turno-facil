import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnosGrid } from '@/components/turnos/turnos-grid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth'
import { useTurnos } from '@/hooks/useTurnos'

export function AlumnoTurnos() {
  const { turnos, isPending } = useTurnos()
  const { user, logout } = useAuth()

  let content

  if (isPending) {
    content = <LoadingState message="Cargando turnos..." />
  } else if (turnos.length === 0) {
    content = <EmptyState message="No hay turnos programados" />
  } else {
    content = <TurnosGrid turnos={turnos} />
  }

  return (
    <section className="flex flex-col gap-10">
      <header className="bg-card flex w-full items-center justify-between rounded-2xl border px-8 py-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge>Alumno</Badge>

            {user?.legajo && <Badge variant="secondary">{user.legajo}</Badge>}
          </div>

          <h2 className="text-2xl font-semibold">{user?.nombre}</h2>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refrescar
          </Button>

          <Button variant="destructive" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <div className="w-full">{content}</div>
    </section>
  )
}
