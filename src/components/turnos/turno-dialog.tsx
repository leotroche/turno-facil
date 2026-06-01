import { toast } from 'react-toastify'

import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import type { TurnoConCantidadReservas } from '@/types/types'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { TurnoForm } from './turno-form'

type TurnoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  turno?: TurnoConCantidadReservas
}

export function TurnoDialog({ open, onOpenChange, turno }: TurnoDialogProps) {
  const { crear, actualizar } = useTurnosMutations()

  const isUpdating = !!turno

  const handleSuccess = (message: string) => {
    onOpenChange(false)
    toast.success(message)
  }

  const handleSubmit = async (data: TurnoFormValues) => {
    if (isUpdating) {
      actualizar.mutate(
        { id: turno.id, updates: data },
        { onSuccess: () => handleSuccess('Turno modificado correctamente') },
      )
      return
    }

    crear.mutate(data, { onSuccess: () => handleSuccess('Turno creado correctamente') })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-2xl" aria-describedby={undefined}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>{isUpdating ? 'Modificar turno' : 'Crear nuevo turno'}</DialogTitle>
        </DialogHeader>

        <TurnoForm key={turno?.id ?? 'create'} initialValues={turno} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
