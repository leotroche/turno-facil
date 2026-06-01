import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import { TurnoActionDropdown } from '@/components/turnos/turno-action-dropdown'

import { mockTurno } from './mocks'

test('abre el dropdown y ejecuta las acciones correctamente', async () => {
  const user = userEvent.setup()

  const onUpdateMock = vi.fn()
  const onCloseMock = vi.fn()
  const onDeleteMock = vi.fn()
  const onReopenMock = vi.fn()

  render(
    <TurnoActionDropdown
      turno={mockTurno}
      onUpdate={onUpdateMock}
      onDelete={onDeleteMock}
      onClose={onCloseMock}
      onReopen={onReopenMock}
    />,
  )

  // El botón de los tres puntos
  const trigger = screen.getByRole('button')

  // --- 1. Probar Modificar ---
  await user.click(trigger)
  const btnModificar = await screen.findByRole('menuitem', { name: /modificar/i })
  await user.click(btnModificar)

  expect(onUpdateMock).toHaveBeenCalledWith(mockTurno)

  // --- 2. Probar Cerrar Turno ---
  await user.click(trigger)
  const btnCerrar = await screen.findByRole('menuitem', { name: /cerrar turno/i })
  await user.click(btnCerrar)

  expect(onCloseMock).toHaveBeenCalledWith(mockTurno.id)

  // --- 3. Probar Eliminar ---
  await user.click(trigger)
  const btnEliminarDropdown = await screen.findByRole('menuitem', { name: /eliminar/i })
  await user.click(btnEliminarDropdown)

  // Verificamos que se haya abierto el modal de confirmación buscando su título
  expect(await screen.findByRole('heading', { name: /¿eliminar turno\?/i })).toBeDefined()

  // Buscamos el botón de confirmación dentro del modal
  const btnConfirmarEliminar = screen.getByRole('button', { name: /eliminar/i })
  await user.click(btnConfirmarEliminar)

  // Comprobamos que la función onDelete haya sido llamada con el ID correcto
  await waitFor(() => {
    expect(onDeleteMock).toHaveBeenCalledWith(mockTurno.id)
  })
})
