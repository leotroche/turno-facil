import { z } from 'zod'

// ------------------------------------------------------------

const nombre = z.string().min(1, 'Requerido')

const email = z.string().trim().min(1, 'Requerido').pipe(z.email('Email inválido'))

const password = z.string().min(6, 'Mínimo 6 caracteres')

const legajo = z.string().min(3, 'Mínimo 3 caracteres')

// ------------------------------------------------------------

export const registerSchema = z.object({
  nombre,
  email,
  password,
  legajo,
})

export type RegisterFormValues = z.infer<typeof registerSchema>

// ------------------------------------------------------------

export const loginSchema = z.object({
  email,
  password,
})

export type LoginFormValues = z.infer<typeof loginSchema>

// ------------------------------------------------------------
