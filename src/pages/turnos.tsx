import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnoCard } from '@/components/turno-card'
import { useTurnos } from '@/hooks/useTurnos'

export default function Turnos() {
  const { turnos, isPending } = useTurnos()

  if (isPending) {
    return <LoadingState message="Cargando turnos..." />
  }

  if (turnos.length === 0) {
    return <EmptyState message="No hay turnos programados" />
  }

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-6xl">Turnos Programados</h2>

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {turnos.map((turno) => (
          <TurnoCard key={turno.id} turno={turno} />
        ))}
      </div>
    </section>
  )
}
