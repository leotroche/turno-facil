/* eslint-disable jsx-a11y/aria-role */
import { render, screen } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'

import { ProtectedLayout } from '@/layouts/protected-layout'
import { PublicLayout } from '@/layouts/public-layout'

vi.mock('react-router', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate-mock">Redirigiendo a {to}</div>,
  Outlet: () => <div data-testid="outlet-mock">Contenido Protegido</div>,
}))

const mockUseAuth = vi.fn()
vi.mock('@/context/auth', () => ({
  useAuth: () => mockUseAuth(),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('ProtectedLayout: muestra LoadingState si la sesión está cargando', () => {
  mockUseAuth.mockReturnValue({ loading: true, isAuthenticated: false, user: null })
  render(<ProtectedLayout role="alumno" />)

  expect(screen.getByText(/cargando\.\.\./i)).toBeDefined()
})

test('ProtectedLayout: redirige a /login si no está autenticado', () => {
  mockUseAuth.mockReturnValue({ loading: false, isAuthenticated: false, user: null })
  render(<ProtectedLayout role="alumno" />)
  expect(screen.getByText('Redirigiendo a /login')).toBeDefined()
})

test('ProtectedLayout: redirige al dashboard de su rol si intenta acceder a un rol distinto', () => {
  mockUseAuth.mockReturnValue({ loading: false, isAuthenticated: true, user: { rol: 'alumno' } })
  render(<ProtectedLayout role="docente" />)
  expect(screen.getByText('Redirigiendo a /alumno')).toBeDefined()
})

test('ProtectedLayout: renderiza el Outlet si el usuario tiene permiso', () => {
  mockUseAuth.mockReturnValue({ loading: false, isAuthenticated: true, user: { rol: 'docente' } })
  render(<ProtectedLayout role="docente" />)
  expect(screen.getByTestId('outlet-mock')).toBeDefined()
})

test('PublicLayout: redirige al dashboard correspondiente si YA está autenticado', () => {
  mockUseAuth.mockReturnValue({ loading: false, isAuthenticated: true, user: { rol: 'docente' } })
  render(<PublicLayout />)
  expect(screen.getByText('Redirigiendo a /docente')).toBeDefined()
})
