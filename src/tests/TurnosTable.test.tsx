import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import { TurnosTable } from '@/components/turnos/turnos-table'
import type { TurnoConCantidadReservas } from '@/types/types'

import { mockTurno } from './mocks'

// Creamos un segundo turno para probar que renderiza múltiples filas y estados
const mockTurnos: TurnoConCantidadReservas[] = [
  mockTurno,
  {
    ...mockTurno,
    id: 't-456',
    materia: 'Sistemas Operativos',
    estado: 'cerrado',
    cantidad_reservas: 20,
  },
]

test('renderiza correctamente las columnas y los datos de múltiples turnos', () => {
  render(
    <TurnosTable
      turnos={mockTurnos}
      onUpdate={vi.fn()}
      onDelete={vi.fn()}
      onClose={vi.fn()}
      onReopen={vi.fn()}
    />,
  )

  // 1. Verificamos que las cabeceras principales estén en la tabla
  expect(screen.getByRole('columnheader', { name: /materia/i })).toBeDefined()
  expect(screen.getByRole('columnheader', { name: /estado/i })).toBeDefined()
  expect(screen.getByRole('columnheader', { name: /acciones/i })).toBeDefined()

  // 2. Verificamos que los datos de ambos turnos aparezcan
  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
  expect(screen.getByText('Sistemas Operativos')).toBeDefined()

  // 3. Verificamos que los badges de estado se rendericen
  expect(screen.getByText('disponible')).toBeDefined()
  expect(screen.getByText('cerrado')).toBeDefined()
})

test('el menú de acciones de la fila dispara los callbacks del componente padre', async () => {
  const user = userEvent.setup()
  const onUpdateMock = vi.fn()
  const onCloseMock = vi.fn()

  render(
    <TurnosTable
      turnos={[mockTurno]}
      onUpdate={onUpdateMock}
      onDelete={vi.fn()}
      onClose={onCloseMock}
      onReopen={vi.fn()}
    />,
  )

  // Buscamos el botón del dropdown de la fila
  const trigger = screen.getByRole('button')

  // --- Probamos Modificar ---
  await user.click(trigger)
  const btnModificar = await screen.findByRole('menuitem', { name: /modificar/i })
  await user.click(btnModificar)

  expect(onUpdateMock).toHaveBeenCalledWith(mockTurno)

  // --- Probamos Cerrar ---
  await user.click(trigger)
  const btnCerrar = await screen.findByRole('menuitem', { name: /cerrar turno/i })
  await user.click(btnCerrar)

  expect(onCloseMock).toHaveBeenCalledWith(mockTurno.id)
})
