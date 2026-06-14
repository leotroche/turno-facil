import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { AlumnoTurnos } from '@/pages/alumno-turnos'

import { mockTurno } from './mocks'

vi.mock('@/context/auth', () => ({
  useAuth: () => ({
    user: { nombre: 'Juan Alumno', legajo: '99999', rol: 'alumno' },
    logout: vi.fn(),
  }),
}))

const mockUseTurnos = vi.fn()
vi.mock('@/hooks/useTurnos', () => ({
  useTurnos: () => mockUseTurnos(),
}))

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    reservar: { mutate: vi.fn(), isPending: false },
  }),
}))

test('renderiza la vista del alumno con los turnos en formato grilla', () => {
  mockUseTurnos.mockReturnValue({ turnos: [mockTurno], isPending: false })

  render(<AlumnoTurnos />)

  expect(screen.getByText('Juan Alumno')).toBeDefined()
  expect(screen.getByText(/Legajo 99999/i)).toBeDefined()

  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
  expect(screen.getByText('Prof. Rodríguez')).toBeDefined()
})
