import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { turnoFormSchema, type TurnoFormValues } from '@/schemas/turno-form-schema'

import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type TurnoFormProps = {
  initialValues?: Partial<TurnoFormValues>
  onSubmit: (data: TurnoFormValues) => void | Promise<void>
}

export function TurnoForm({ initialValues, onSubmit }: TurnoFormProps) {
  const now = new Date()

  const form = useForm<TurnoFormValues>({
    resolver: zodResolver(turnoFormSchema),
    defaultValues: {
      materia: '',
      tipo: '',
      descripcion: '',

      fecha: format(addDays(now, 1), 'yyyy-MM-dd'),
      hora_inicio: '08:00',
      hora_fin: '10:00',

      docente: '',
      ubicacion: '',
      cupo_maximo: 25,

      ...initialValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Materia</FieldLabel>
          <Input {...form.register('materia')} />
          <FieldError>{form.formState.errors.materia?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Tipo</FieldLabel>
          <Input {...form.register('tipo')} />
          <FieldError>{form.formState.errors.tipo?.message}</FieldError>
        </Field>

        <Field className="col-span-2">
          <FieldLabel>Descripción (opcional)</FieldLabel>
          <Textarea {...form.register('descripcion')} className="resize-none" />
          <FieldError>{form.formState.errors.descripcion?.message}</FieldError>
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field>
          <FieldLabel>Fecha</FieldLabel>
          <Input type="date" className="dark:scheme-dark" {...form.register('fecha')} />
          <FieldError>{form.formState.errors.fecha?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Hora inicio</FieldLabel>
          <Input type="time" className="dark:scheme-dark" {...form.register('hora_inicio')} />
          <FieldError>{form.formState.errors.hora_inicio?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Hora fin</FieldLabel>
          <Input type="time" className="dark:scheme-dark" {...form.register('hora_fin')} />
          <FieldError>{form.formState.errors.hora_fin?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Docente</FieldLabel>
          <Input type="text" {...form.register('docente')} />
          <FieldError>{form.formState.errors.docente?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Ubicación</FieldLabel>
          <Input type="text" {...form.register('ubicacion')} />
          <FieldError>{form.formState.errors.ubicacion?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Cupo máximo</FieldLabel>
          <Input
            type="number"
            className="dark:scheme-dark"
            min="1"
            max="50"
            {...form.register('cupo_maximo', { valueAsNumber: true })}
          />
          <FieldError>{form.formState.errors.cupo_maximo?.message}</FieldError>
        </Field>
      </FieldGroup>

      <div className="flex justify-end border-t pt-4">
        <Button type="submit">{initialValues ? 'Modificar turno' : 'Crear turno'}</Button>
      </div>
    </form>
  )
}
