import { CalendarPlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnoDialog } from '@/components/turnos/turno-dialog'
import { TurnosTable } from '@/components/turnos/turnos-table'
import { Button } from '@/components/ui/button'
import { useTurnos } from '@/hooks/useTurnos'
import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import type { TurnoConCantidadReservas } from '@/types/types'

export function AdminTurnos() {
  const { turnos, isPending } = useTurnos()
  const { eliminar, actualizar } = useTurnosMutations()

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

  const handleDelete = (id: string) => {
    eliminar.mutate(id, {
      onSuccess: () => toast.success('Turno eliminado correctamente'),
      onError: () => toast.error('Error al eliminar el turno'),
    })
  }

  const handleClose = (id: string) => {
    actualizar.mutate(
      { id, updates: { estado: 'cerrado' } },
      {
        onSuccess: () => toast.success('Turno cerrado correctamente'),
        onError: () => toast.error('Error al cerrar el turno'),
      },
    )
  }

  const handleReopen = (id: string) => {
    actualizar.mutate(
      { id, updates: { estado: 'disponible' } },
      {
        onSuccess: () => toast.success('Turno reabierto correctamente'),
        onError: () => toast.error('Error al reabrir el turno'),
      },
    )
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
        onDelete={handleDelete}
        onClose={handleClose}
        onReopen={handleReopen}
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
