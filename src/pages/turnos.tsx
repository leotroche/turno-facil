import { useState } from 'react'

import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { CreateTurnoButton } from '@/components/turnos/create-turno-button'
import { CreateTurnoDialog } from '@/components/turnos/create-turno-dialog'
import { TurnosGrid } from '@/components/turnos/turnos-grid'
import { useTurnos } from '@/hooks/useTurnos'

export default function Turnos() {
  const { turnos, isPending } = useTurnos()
  const [open, setOpen] = useState(false)

  let content

  if (isPending) {
    content = <LoadingState message="Cargando turnos..." />
  } else if (turnos.length === 0) {
    content = <EmptyState message="No hay turnos programados" />
  } else {
    content = <TurnosGrid turnos={turnos} />
  }

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-6xl">Turnos Programados</h2>

      {content}

      <CreateTurnoButton onClick={() => setOpen(true)} />

      <CreateTurnoDialog open={open} onOpenChange={setOpen} />
    </section>
  )
}
