import { MoreHorizontal, Pencil, Unlock, Trash2, Lock } from 'lucide-react'

import type { TurnoConCantidadReservas } from '@/types/types'

import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
} from '../ui/dropdown-menu'

type Props = {
  turno: TurnoConCantidadReservas
  onUpdate: (turno: TurnoConCantidadReservas) => void
  onDelete: (id: string) => void
  onClose: (id: string) => void
  onReopen: (id: string) => void
}

export function TurnoActionDropdown({ turno, onUpdate, onDelete, onClose, onReopen }: Props) {
  const isClosed = turno.estado === 'cerrado'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuItem
          onClick={() => onUpdate(turno)}
          className="cursor-pointer gap-3 px-3 py-2"
        >
          <Pencil />
          Modificar
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => (isClosed ? onReopen(turno.id) : onClose(turno.id))}
          className="cursor-pointer gap-3 px-3 py-2"
        >
          {isClosed ? <Unlock /> : <Lock />}

          {isClosed ? 'Reabrir turno' : 'Cerrar turno'}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-destructive cursor-pointer gap-3 px-3 py-2"
            >
              <Trash2 />
              Eliminar
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar turno?</AlertDialogTitle>

              <AlertDialogDescription>
                Esta acción no se puede deshacer. El turno se eliminará permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>

              <AlertDialogAction variant="destructive" onClick={() => onDelete(turno.id)}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
