import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

type CreateTurnoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTurnoDialog({ open, onOpenChange }: CreateTurnoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo turno</DialogTitle>
        </DialogHeader>

        <div>TURNO FORM</div>
      </DialogContent>
    </Dialog>
  )
}
