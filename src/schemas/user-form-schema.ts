import { z } from 'zod'

export const userRegisterSchema = z
  .object({
    nombre: z.string().min(1, 'Requerido'),
    apellido: z.string().min(1, 'Requerido'),

    email: z.email('Email inválido').min(1, 'Requerido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
  })

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>
