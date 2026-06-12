import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTurnosMutations } from '@/hooks/useTurnosMutations'
import { reservaFormSchema, type ReservaFormValues } from '@/schemas/reserva-form-schema'
import type { Turno } from '@/types/types'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type Props = {
  turno: Turno
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservaDialog({ turno, open, onOpenChange }: Props) {
  const { reservar } = useTurnosMutations()

  const form = useForm<ReservaFormValues>({
    resolver: zodResolver(reservaFormSchema),
    defaultValues: {
      alumno_id: '',
      turno_id: turno.id,
    },
  })

  const handleSubmit = (data: ReservaFormValues) => {
    reservar.mutate(
      { turno_id: turno.id, alumno_id: data.alumno_id },
      {
        onSuccess: () => {
          toast.success('Reserva realizada correctamente')
          onOpenChange(false)
          form.reset()
        },
        onError: () => {
          toast.error(
            'Error al realizar la reserva. Es posible que ya tengas una reserva para este turno.',
          )
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Reservar turno</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-2">
          <Field>
            <FieldLabel>Nombre completo</FieldLabel>
            <Input {...form.register('alumno_id')} placeholder="Juan Pérez" />
            <FieldError>{form.formState.errors.alumno_id?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Legajo</FieldLabel>
            <Input {...form.register('turno_id')} placeholder="12345678" />
            <FieldError>{form.formState.errors.turno_id?.message}</FieldError>
          </Field>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={reservar.isPending}>
              {reservar.isPending ? 'Reservando...' : 'Confirmar reserva'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
