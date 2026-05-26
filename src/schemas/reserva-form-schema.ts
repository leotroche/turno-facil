import { z } from 'zod'

export const reservaFormSchema = z.object({
  alumno: z
    .string()
    .min(1, 'El nombre es requerido')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),

  legajo: z
    .string()
    .min(7, 'El legajo debe tener al menos 7 dígitos')
    .max(8, 'El legajo no puede tener más de 8 dígitos')
    .regex(/^\d+$/, 'El legajo solo puede contener números'),
})

export type ReservaFormValues = z.infer<typeof reservaFormSchema>
