import { toast } from 'react-toastify'

import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import type { Turno } from '@/types/types'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { TurnoForm } from './turno-form'

type TurnoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  turno?: Turno
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
        {
          onSuccess: () => handleSuccess('Turno modificado correctamente'),
          onError: () => toast.error('Error al modificar el turno'),
        },
      )
      return
    }

    crear.mutate(data, {
      onSuccess: () => handleSuccess('Turno creado correctamente'),
      onError: () => toast.error('Error al crear el turno'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>{isUpdating ? 'Modificar turno' : 'Crear nuevo turno'}</DialogTitle>
        </DialogHeader>

        <TurnoForm key={turno?.id ?? 'create'} initialValues={turno} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
