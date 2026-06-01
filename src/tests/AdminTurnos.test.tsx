import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi, beforeEach } from 'vitest'

import { AdminTurnos } from '@/pages/admin-turnos'

import { mockTurno } from './mocks'

// 1. Mock de las mutaciones
const mockEliminar = vi.fn()
const mockActualizar = vi.fn()

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    crear: { mutate: vi.fn() },
    actualizar: { mutate: mockActualizar },
    eliminar: { mutate: mockEliminar },
  }),
}))

// 2. Mock dinámico de las queries
const mockUseTurnos = vi.fn()
vi.mock('@/hooks/useTurnos', () => ({
  useTurnos: () => mockUseTurnos(),
}))

beforeEach(() => {
  mockEliminar.mockClear()
  mockActualizar.mockClear()
  mockUseTurnos.mockClear()
})

// --- TESTS DE ESTADOS DE RENDERIZADO ---

test('muestra el estado de carga (LoadingState) cuando isPending es true', () => {
  // Simulamos que TanStack Query todavía está trayendo los datos
  mockUseTurnos.mockReturnValue({ turnos: [], isPending: true })

  render(<AdminTurnos />)

  expect(screen.getByText('Cargando turnos...')).toBeDefined()
})

test('muestra el estado vacío (EmptyState) cuando no hay turnos', () => {
  // Simulamos que ya cargó pero la base de datos devolvió un array vacío
  mockUseTurnos.mockReturnValue({ turnos: [], isPending: false })

  render(<AdminTurnos />)

  expect(screen.getByText('No hay turnos programados')).toBeDefined()
})

// --- TESTS DE INTERACCIÓN ---

test('renderiza la tabla y abre el modal de creación al hacer click en el botón', async () => {
  const user = userEvent.setup()

  // Simulamos que la base de datos devolvió nuestro turno de prueba
  mockUseTurnos.mockReturnValue({ turnos: [mockTurno], isPending: false })

  render(<AdminTurnos />)

  // Verificamos que el título y la tabla estén en pantalla
  expect(screen.getByText('Gestión de turnos')).toBeDefined()
  expect(screen.getByText(mockTurno.materia)).toBeDefined() // Dato dentro de la tabla

  // Hacemos click en "Crear turno"
  const btnCrear = screen.getByRole('button', { name: /crear turno/i })
  await user.click(btnCrear)

  // Verificamos que se abra el modal correcto
  expect(await screen.findByRole('heading', { name: 'Crear nuevo turno' })).toBeDefined()
})

test('conecta correctamente las acciones de la tabla con el hook de mutaciones', async () => {
  const user = userEvent.setup()
  mockUseTurnos.mockReturnValue({ turnos: [mockTurno], isPending: false })

  render(<AdminTurnos />)

  // Buscamos el botón de opciones de la primera fila
  const botonesMenu = screen.getAllByRole('button')
  const trigger = botonesMenu.find((btn) => btn.getAttribute('aria-haspopup') === 'menu')

  if (!trigger) throw new Error('No se encontró el botón del menú')

  // --- 1. Probamos Cerrar Turno ---
  await user.click(trigger)
  const btnCerrar = await screen.findByRole('menuitem', { name: /cerrar turno/i })
  await user.click(btnCerrar)

  // Verificamos que AdminTurnos llame a actualizar.mutate pasándole el estado: 'cerrado'
  expect(mockActualizar).toHaveBeenCalledWith(
    { id: mockTurno.id, updates: { estado: 'cerrado' } },
    expect.any(Object),
  )

  // --- 2. Probamos Eliminar Turno ---
  await user.click(trigger)
  const btnEliminarDropdown = await screen.findByRole('menuitem', { name: /eliminar/i })
  await user.click(btnEliminarDropdown)

  // Confirmamos en el modal de alerta
  const btnConfirmarEliminar = await screen.findByRole('button', { name: /eliminar/i })
  await user.click(btnConfirmarEliminar)

  // Verificamos que AdminTurnos llame a eliminar.mutate con el ID
  await waitFor(() => {
    expect(mockEliminar).toHaveBeenCalledWith(mockTurno.id, expect.any(Object))
  })
})
