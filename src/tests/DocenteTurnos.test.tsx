import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi, beforeEach } from 'vitest'

import { DocenteTurnos } from '@/pages/docente-turnos'

import { mockTurno } from './mocks'

vi.mock('@/context/auth', () => ({
  useAuth: () => ({
    user: { nombre: 'Profe Rodríguez', legajo: '12345', rol: 'docente' },
    logout: vi.fn(),
  }),
}))

const mockEliminar = vi.fn()
const mockActualizar = vi.fn()

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    crear: { mutate: vi.fn() },
    actualizar: { mutate: mockActualizar },
    eliminar: { mutate: mockEliminar },
  }),
}))

const mockUseTurnos = vi.fn()
vi.mock('@/hooks/useTurnos', () => ({
  useTurnos: () => mockUseTurnos(),
}))

beforeEach(() => {
  mockEliminar.mockClear()
  mockActualizar.mockClear()
  mockUseTurnos.mockClear()
})

test('renderiza la vista de docente mostrando sus turnos y sus datos', () => {
  mockUseTurnos.mockReturnValue({ turnos: [mockTurno], isPending: false })

  render(<DocenteTurnos />)

  expect(screen.getByText('Profe Rodríguez')).toBeDefined()
  expect(screen.getByText(/Legajo 12345/i)).toBeDefined()

  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
})

test('abre el modal de creación al hacer click en el botón', async () => {
  const user = userEvent.setup()
  mockUseTurnos.mockReturnValue({ turnos: [], isPending: false })

  render(<DocenteTurnos />)

  const btnCrear = screen.getByRole('button', { name: /nuevo turno/i })
  await user.click(btnCrear)

  expect(await screen.findByRole('heading', { name: 'Crear nuevo turno' })).toBeDefined()
})
