import { CalendarPlus } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnoDialog } from '@/components/turnos/turno-dialog'
import { TurnosTable } from '@/components/turnos/turnos-table'
import { Button } from '@/components/ui/button'
import { useTurnos } from '@/hooks/useTurnos'
import type { TurnoConCantidadReservas } from '@/types/types'

export function AdminTurnos() {
  const { turnos, isPending } = useTurnos()

  const [open, setOpen] = useState(false)

  const [selectedTurno, setSelectedTurno] = useState<TurnoConCantidadReservas>()

  const handleCreate = () => {
    setSelectedTurno(undefined)
    setOpen(true)
  }

  const handleUpdate = (turno: TurnoConCantidadReservas) => {
    setSelectedTurno(turno)
    setOpen(true)
  }

  let content

  if (isPending) {
    content = <LoadingState message="Cargando turnos..." />
  } else if (turnos.length === 0) {
    content = <EmptyState message="No hay turnos programados" />
  } else {
    content = (
      <TurnosTable
        turnos={turnos}
        onUpdate={handleUpdate}
        onDelete={(id) => console.log('delete', id)}
        onClose={(id) => console.log('close', id)}
        onReopen={(id) => console.log('reopen', id)}
      />
    )
  }

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Gestión de turnos</h2>

        <Button onClick={handleCreate} size="lg">
          <CalendarPlus /> Crear turno
        </Button>
      </header>

      {content}

      <TurnoDialog open={open} onOpenChange={setOpen} turno={selectedTurno} />
    </section>
  )
}
