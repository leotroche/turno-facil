import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { TurnoForm } from './turno-form'

type TurnoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTurnoDialog({ open, onOpenChange }: TurnoDialogProps) {
  const { crear } = useTurnosMutations()

  const handleSubmit = async (data: TurnoFormValues) => {
    crear.mutate(data, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear nuevo turno</DialogTitle>
        </DialogHeader>

        <TurnoForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
