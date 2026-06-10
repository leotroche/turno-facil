import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnosGrid } from '@/components/turnos/turnos-grid'
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
      {/* HEADER */}
      <header className="bg-card flex w-full items-center justify-between rounded-2xl border px-8 py-6 shadow-sm">
        {/* USER INFO */}
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs tracking-wide uppercase">
            Sesión activa
          </span>

          <h2 className="text-3xl leading-tight font-semibold">Alumno: {user?.nombre}</h2>

          {user?.legajo && (
            <span className="text-muted-foreground text-sm">
              Legajo: <span className="font-medium">{user.legajo}</span>
            </span>
          )}
        </div>
        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refrescar
          </Button>

          <Button variant="destructive" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {/* CONTENT WRAPPER */}
      <div className="w-full">{content}</div>
    </section>
  )
}
