import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
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
  mockUseTurnos.mockReturnValue({
    turnos: [mockTurno],
    isPending: false,
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AlumnoTurnos />
      </MemoryRouter>
    </QueryClientProvider>,
  )

  expect(screen.getByText('Juan Alumno')).toBeDefined()
  expect(screen.getByText(/Legajo 99999/i)).toBeDefined()
  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
  expect(screen.getByText('Prof. Rodríguez')).toBeDefined()
})
