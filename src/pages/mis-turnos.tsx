import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnosGrid } from '@/components/turnos/turnos-grid'
import { useMisTurnos } from '../hooks/useMisTurnos.ts'

export function MisTurnosPage() {
  const {
    turnos,
    isPending,
  } = useMisTurnos()

  let content

  if (isPending) {
    content = (
      <LoadingState message="Cargando tus turnos..." />
    )
  } else if (turnos.length === 0) {
    content = (
      <EmptyState message="No tenés turnos reservados" />
    )
  } else {
    content = (
      <TurnosGrid turnos={turnos} mode="mis-turnos" />
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold">
          Mis Turnos
        </h2>

        <p className="text-muted-foreground text-sm">
          Tus reservas activas
        </p>
      </header>

      {content}
    </section>
  )
}