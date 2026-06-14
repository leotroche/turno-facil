import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { toast } from 'react-toastify'
import { expect, test, vi, beforeEach } from 'vitest'

import { LoginForm } from '@/components/login-form'

const mockLogin = vi.fn()
vi.mock('@/context/auth', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('muestra errores de validación si se envía vacío o con email inválido', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )

  const btnSubmit = screen.getByRole('button', { name: /iniciar sesión/i })

  await user.click(btnSubmit)

  const erroresRequerido = await screen.findAllByText(/requerido/i)
  expect(erroresRequerido.length).toBeGreaterThan(0)

  const inputEmail = container.querySelector('input[name="email"]') as HTMLInputElement
  await user.type(inputEmail, 'correo-sin-arroba.com')
  await user.click(btnSubmit)

  expect(await screen.findByText(/email inválido/i)).toBeDefined()
  expect(mockLogin).not.toHaveBeenCalled()
})

test('llama a la función login y muestra un toast de éxito si los datos son correctos', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )

  const inputEmail = container.querySelector('input[name="email"]') as HTMLInputElement
  const inputPassword = container.querySelector('input[name="password"]') as HTMLInputElement

  await user.type(inputEmail, 'alumno@unq.edu.ar')
  await user.type(inputPassword, 'password123')

  const btnSubmit = screen.getByRole('button', { name: /iniciar sesión/i })
  await user.click(btnSubmit)

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenCalledWith({ email: 'alumno@unq.edu.ar', password: 'password123' })
    expect(toast.success).toHaveBeenCalledWith('Usuario iniciado sesión exitosamente')
  })
})

test('muestra un toast de error si falla la autenticación', async () => {
  const user = userEvent.setup()
  mockLogin.mockRejectedValue(new Error('Credenciales inválidas'))

  const { container } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )

  await user.type(
    container.querySelector('input[name="email"]') as HTMLInputElement,
    'alumno@unq.edu.ar',
  )
  await user.type(
    container.querySelector('input[name="password"]') as HTMLInputElement,
    'malpassword',
  )
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Credenciales inválidas')
  })
})
