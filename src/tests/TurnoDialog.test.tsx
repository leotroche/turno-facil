import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'

import { TurnoDialog } from '@/components/turnos/turno-dialog'

import { mockTurno } from './mocks'

// 1. Mockeamos las funciones que interactúan con Supabase
const mockCrear = vi.fn()
const mockActualizar = vi.fn()

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    crear: { mutate: mockCrear },
    actualizar: { mutate: mockActualizar },
  }),
}))

beforeEach(() => {
  mockCrear.mockClear()
  mockActualizar.mockClear()
})

test('modo creación: renderiza vacío y muestra errores de validación', async () => {
  render(<TurnoDialog open={true} onOpenChange={vi.fn()} />)

  expect(screen.getByRole('heading', { name: 'Crear nuevo turno' })).toBeDefined()

  // Enviar formulario directamente (los campos obligatorios están vacíos)
  const btnSubmit = screen.getByRole('button', { name: 'Crear turno' })
  fireEvent.click(btnSubmit)

  await waitFor(() => {
    const errores = screen.getAllByText(/requerido/i)
    expect(errores.length).toBeGreaterThan(0)

    // Verificamos que la mutación no se haya llamado porque el form es inválido
    expect(mockCrear).not.toHaveBeenCalled()
  })
})

test('modo edición: precarga los datos y llama a actualizar', async () => {
  render(<TurnoDialog open={true} turno={mockTurno} onOpenChange={vi.fn()} />)

  // Verificamos que estemos en modo edición
  expect(screen.getByRole('heading', { name: 'Modificar turno' })).toBeDefined()

  const inputMateria = document.querySelector('input[name="materia"]') as HTMLInputElement

  expect(inputMateria).not.toBeNull()

  expect(inputMateria.value).toBe(mockTurno.materia)

  // Cambiamos el valor del input
  fireEvent.change(inputMateria, { target: { value: 'Base de Datos' } })

  // Hacemos click en modificar
  const btnSubmit = screen.getByRole('button', { name: 'Modificar turno' })
  fireEvent.click(btnSubmit)

  // Verificamos que se llame a la función de actualizar con los datos correctos
  await waitFor(() => {
    expect(mockActualizar).toHaveBeenCalledTimes(1)
    expect(mockActualizar.mock.calls[0][0].id).toBe(mockTurno.id)
    expect(mockActualizar.mock.calls[0][0].updates.materia).toBe('Base de Datos')
  })
})
