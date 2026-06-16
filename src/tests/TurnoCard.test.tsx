import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { TurnoCard } from '@/components/turnos/turno-card'

import { mockTurno } from './mocks'

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    reservar: { mutate: vi.fn(), isPending: false },
  }),
}))

test('renderiza correctamente los datos del turno y permite abrir la reserva', () => {
  render(<TurnoCard turno={mockTurno} reservado={false} />)

  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
  expect(screen.getByText('Prof. Rodríguez')).toBeDefined()
  expect(screen.getByText(/14:00 - 16:00/)).toBeDefined()
  expect(screen.getByText(/15 de 20 disponibles/i)).toBeDefined()

  const btnReservar = screen.getByRole('button', { name: /reservar/i })

  expect(btnReservar).not.toBeDisabled()

  fireEvent.click(btnReservar)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

test('deshabilita el botón si el turno está lleno', () => {
  const turnoLleno = {
    ...mockTurno,
    estado: 'lleno',
    cantidad_reservas: 20,
  }

  render(<TurnoCard turno={turnoLleno} reservado={false} />)

  const btnReservar = screen.getByRole('button', { name: /sin cupos/i })

  expect(btnReservar).toBeDisabled()
})

test('deshabilita el botón si el turno está cerrado', () => {
  const turnoCerrado = {
    ...mockTurno,
    estado: 'cerrado',
  }

  render(<TurnoCard turno={turnoCerrado} reservado={false} />)

  const btnReservar = screen.getByRole('button', { name: /cerrado/i })

  expect(btnReservar).toBeDisabled()
})
