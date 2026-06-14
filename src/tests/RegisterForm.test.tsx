import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { toast } from 'react-toastify'
import { expect, test, vi, beforeEach } from 'vitest'

import { RegisterForm } from '@/components/register-form'

const mockRegister = vi.fn()
vi.mock('@/context/auth', () => ({
  useAuth: () => ({ register: mockRegister }),
}))

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('valida las reglas de longitud mínima para contraseña y legajo', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>,
  )

  await user.type(container.querySelector('input[name="password"]') as HTMLInputElement, '123')
  await user.type(container.querySelector('input[name="legajo"]') as HTMLInputElement, '12')

  await user.click(screen.getByRole('button', { name: /crea tu cuenta/i }))

  expect(await screen.findByText(/mínimo 6 caracteres/i)).toBeDefined()
  expect(await screen.findByText(/mínimo 3 caracteres/i)).toBeDefined()
  expect(mockRegister).not.toHaveBeenCalled()
})

test('registra exitosamente y muestra notificación', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>,
  )

  await user.type(
    container.querySelector('input[name="nombre"]') as HTMLInputElement,
    'María Gómez',
  )
  await user.type(
    container.querySelector('input[name="email"]') as HTMLInputElement,
    'maria@unq.edu.ar',
  )
  await user.type(
    container.querySelector('input[name="password"]') as HTMLInputElement,
    'password123',
  )
  await user.type(container.querySelector('input[name="legajo"]') as HTMLInputElement, '876543')

  await user.click(screen.getByRole('button', { name: /crea tu cuenta/i }))

  await waitFor(() => {
    expect(mockRegister).toHaveBeenCalledWith({
      nombre: 'María Gómez',
      email: 'maria@unq.edu.ar',
      password: 'password123',
      legajo: '876543',
    })
    expect(toast.success).toHaveBeenCalledWith('Usuario registrado exitosamente')
  })
})
