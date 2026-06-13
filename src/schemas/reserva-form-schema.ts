import { z } from 'zod'

export const reservaFormSchema = z.object({
  turno_id: z.string().min(1, 'Requerido'),
  alumno_id: z.string().min(1, 'Requerido'),
})

export type ReservaFormValues = z.infer<typeof reservaFormSchema>
