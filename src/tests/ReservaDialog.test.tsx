import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'

import { ReservaDialog } from '@/components/turnos/reserva-dialog'

import { mockTurno } from './mocks'

const mockMutate = vi.fn()

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    reservar: { mutate: mockMutate, isPending: false },
  }),
}))

beforeEach(() => {
  mockMutate.mockClear()
})

test('muestra errores de validación si el formulario se envía vacío o con datos inválidos', async () => {
  render(<ReservaDialog turno={mockTurno} open={true} onOpenChange={vi.fn()} />)

  const btnSubmit = screen.getByRole('button', { name: /confirmar reserva/i })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    expect(screen.getByText(/el nombre es requerido/i)).toBeDefined()
    expect(screen.getByText(/el legajo debe tener al menos 7 dígitos/i)).toBeDefined()
  })

  const inputNombre = screen.getByPlaceholderText(/juan pérez/i)
  const inputLegajo = screen.getByPlaceholderText(/12345678/i)

  fireEvent.change(inputNombre, { target: { value: 'Juan123' } })
  fireEvent.change(inputLegajo, { target: { value: 'ABCDEFG' } })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    expect(screen.getByText(/el nombre solo puede contener letras/i)).toBeDefined()
    expect(screen.getByText(/el legajo solo puede contener números/i)).toBeDefined()
  })
})

test('llama a la mutación reservar con los datos correctos', async () => {
  render(<ReservaDialog turno={mockTurno} open={true} onOpenChange={vi.fn()} />)

  const inputNombre = screen.getByPlaceholderText(/juan pérez/i)
  const inputLegajo = screen.getByPlaceholderText(/12345678/i)

  fireEvent.change(inputNombre, { target: { value: 'Carlos Gardel' } })
  fireEvent.change(inputLegajo, { target: { value: '1234567' } })

  const btnSubmit = screen.getByRole('button', { name: /confirmar reserva/i })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    expect(mockMutate).toHaveBeenCalledTimes(1)
    expect(mockMutate).toHaveBeenCalledWith(
      { turno_id: 't-123', alumno: 'Carlos Gardel', legajo: '1234567' },
      expect.any(Object),
    )
  })
})
