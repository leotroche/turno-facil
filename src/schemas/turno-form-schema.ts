import { z } from 'zod'

export const turnoFormSchema = z
  .object({
    materia: z.string().min(1, 'Requerido').max(100, 'Máx. 100 caracteres'),

    tipo: z.string().min(1, 'Requerido'),

    descripcion: z.string().max(300, 'Máx. 300 caracteres').optional().nullable(),

    fecha: z.string().min(1, 'Requerido'),

    hora_inicio: z
      .string()
      .min(1, 'Requerido')
      .refine((val) => val >= '08:00' && val <= '22:00', {
        message: 'Fuera de horario (08:00–22:00)',
      }),

    hora_fin: z
      .string()
      .min(1, 'Requerido')
      .refine((val) => val >= '08:00' && val <= '22:00', {
        message: 'Fuera de horario (08:00–22:00)',
      }),

    docente_id: z.string().min(1, 'Requerido'),

    ubicacion: z.string().min(1, 'Requerido').max(100, 'Máx. 100 caracteres'),

    cupo_maximo: z.number().int('Solo enteros').positive('Debe ser mayor a 0').max(100, 'Máx. 100'),
  })
  .refine((data) => data.hora_inicio < data.hora_fin, {
    message: 'La hora de inicio debe ser menor a la de fin',
    path: ['hora_fin'],
  })

export type TurnoFormValues = z.infer<typeof turnoFormSchema>
