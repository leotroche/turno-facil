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
import type { Turno } from '@/types/types'

export function DocenteTurnos() {
  const { user, logout } = useAuth()
  const { turnos, isPending } = useTurnos()
  const { eliminar, actualizar } = useTurnosMutations()

  const [open, setOpen] = useState(false)
  const [selectedTurno, setSelectedTurno] = useState<Turno>()

  const handleCreate = () => {
    setSelectedTurno(undefined)
    setOpen(true)
  }

  const handleUpdate = (turno: Turno) => {
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
        {/* INFO */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge>Docente</Badge>
            {user?.legajo && <Badge variant="secondary">Legajo {user.legajo}</Badge>}
          </div>

          <h2 className="text-2xl font-semibold">{user?.nombre}</h2>

          <p className="text-muted-foreground text-sm">Gestión de turnos académicos</p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button onClick={handleCreate}>
            <CalendarPlus />
            Nuevo turno
          </Button>

          <Button variant="outline" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {content}

      <TurnoDialog open={open} onOpenChange={setOpen} turno={selectedTurno} />
    </section>
  )
}
