import { z } from 'zod'

export const registerSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),

  email: z.string().trim().min(1, 'Requerido').pipe(z.email('Email inválido')),

  password: z.string().min(6, 'Mínimo 6 caracteres'),

  legajo: z.string().min(3, 'Mínimo 3 caracteres'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Requerido').pipe(z.email('Email inválido')),

  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
