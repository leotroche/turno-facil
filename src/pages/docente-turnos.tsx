import { CalendarPlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { EmptyState } from '@/components/empty-state'
import { LoadingState } from '@/components/loading-state'
import { TurnoDialog } from '@/components/turnos/turno-dialog'
import { TurnosTable } from '@/components/turnos/turnos-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth'
import { useTurnos } from '@/hooks/useTurnos'
import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import type { TurnoConCantidadReservas } from '@/types/types'

export function DocenteTurnos() {
  const { user, logout } = useAuth()
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
    <section className="flex flex-col gap-10">
      <header className="bg-card flex w-full items-center justify-between rounded-2xl border px-8 py-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge>Docente</Badge>

            {user?.legajo && <Badge variant="secondary">{user.legajo}</Badge>}
          </div>

          <h2 className="text-2xl font-semibold">{user?.nombre}</h2>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleCreate}>
            <CalendarPlus />
            Crear turno
          </Button>

          <Button variant="outline" onClick={() => window.location.reload()}>
            Refrescar
          </Button>

          <Button variant="destructive" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {content}

      <TurnoDialog open={open} onOpenChange={setOpen} turno={selectedTurno} />
    </section>
  )
}
