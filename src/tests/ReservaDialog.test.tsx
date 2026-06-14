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

  const inputAlumno = screen.getByPlaceholderText(/juan pérez/i)
  const inputLegajo = screen.getByPlaceholderText(/12345678/i)

  fireEvent.change(inputAlumno, { target: { value: '' } })
  fireEvent.change(inputLegajo, { target: { value: '' } })

  const btnSubmit = screen.getByRole('button', { name: /confirmar reserva/i })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    const errores = screen.getAllByText(/requerido/i)
    expect(errores.length).toBeGreaterThan(0)
  })
})

test('llama a la mutación reservar con los datos correctos', async () => {
  render(<ReservaDialog turno={mockTurno} open={true} onOpenChange={vi.fn()} />)

  const inputAlumno = screen.getByPlaceholderText(/juan pérez/i)
  const inputLegajo = screen.getByPlaceholderText(/12345678/i)

  fireEvent.change(inputAlumno, { target: { value: 'Marcos Senesi' } })
  fireEvent.change(inputLegajo, { target: { value: '999999' } })

  const btnSubmit = screen.getByRole('button', { name: /confirmar reserva/i })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    expect(mockMutate).toHaveBeenCalledTimes(1)
    expect(mockMutate).toHaveBeenCalledWith(
      { turno_id: 't-123', alumno_id: 'Marcos Senesi' },
      expect.any(Object),
    )
  })
})
