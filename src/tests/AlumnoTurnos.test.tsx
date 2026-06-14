import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'

import { AlumnoTurnos } from '@/pages/alumno-turnos'
import type { Turno } from '@/types/types'

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

const turnosDePrueba: Turno[] = [
  {
    id: 't-1',
    materia: 'Programación Orientada a Objetos',
    tipo: 'Laboratorio',
    descripcion: 'Revisión de TP',
    fecha: '2026-06-15T14:00:00Z',
    hora_inicio: '14:00',
    hora_fin: '16:00',
    ubicacion: 'Laboratorio 3',
    cupo_maximo: 20,
    estado: 'disponible',
    creado_en: '2026-06-01',
    docente: { id: 'd-1', nombre: 'Prof. Rodríguez', legajo: '111', rol: 'docente' },
    cantidad_reservas: 5,
  },
  {
    id: 't-2',
    materia: 'Bases de Datos',
    tipo: 'Teoría',
    descripcion: 'Clase Normal',
    fecha: '2026-06-20T10:00:00Z',
    hora_inicio: '10:00',
    hora_fin: '12:00',
    ubicacion: 'Aula 5',
    cupo_maximo: 30,
    estado: 'disponible',
    creado_en: '2026-06-01',
    docente: { id: 'd-2', nombre: 'Prof. Gómez', legajo: '222', rol: 'docente' },
    cantidad_reservas: 10,
  },
]

beforeEach(() => {
  mockUseTurnos.mockClear()
})

test('renderiza la vista inicial mostrando todos los turnos disponibles', () => {
  mockUseTurnos.mockReturnValue({ turnos: turnosDePrueba, isPending: false })
  render(<AlumnoTurnos />)

  expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
  expect(screen.getByText('Prof. Rodríguez')).toBeDefined()

  expect(screen.getByText('Bases de Datos')).toBeDefined()
  expect(screen.getByText('Prof. Gómez')).toBeDefined()
})

test('filtra los turnos correctamente al escribir el nombre de un profesor', async () => {
  const user = userEvent.setup()
  mockUseTurnos.mockReturnValue({ turnos: turnosDePrueba, isPending: false })
  render(<AlumnoTurnos />)

  const inputProfesor = screen.getByPlaceholderText(/profesor/i)

  await user.type(inputProfesor, 'Gómez')

  await waitFor(() => {
    expect(screen.getByText('Bases de Datos')).toBeDefined()
    expect(screen.getByText('Prof. Gómez')).toBeDefined()

    expect(screen.queryByText('Programación Orientada a Objetos')).toBeNull()
    expect(screen.queryByText('Prof. Rodríguez')).toBeNull()
  })
})

test('muestra el EmptyState si ningún turno coincide con los filtros', async () => {
  const user = userEvent.setup()
  mockUseTurnos.mockReturnValue({ turnos: turnosDePrueba, isPending: false })
  render(<AlumnoTurnos />)

  const inputProfesor = screen.getByPlaceholderText(/profesor/i)

  await user.type(inputProfesor, 'Profesor Inexistente')

  await waitFor(() => {
    expect(screen.getByText('No hay turnos para los filtros seleccionados')).toBeDefined()
  })

  expect(screen.queryByText('Bases de Datos')).toBeNull()
  expect(screen.queryByText('Programación Orientada a Objetos')).toBeNull()
})

test('filtra los turnos correctamente al seleccionar una materia', async () => {
  window.HTMLElement.prototype.hasPointerCapture = vi.fn()
  window.HTMLElement.prototype.releasePointerCapture = vi.fn()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()

  mockUseTurnos.mockReturnValue({ turnos: turnosDePrueba, isPending: false })
  render(<AlumnoTurnos />)

  const selectTrigger = screen.getByRole('combobox')
  fireEvent.click(selectTrigger)

  const opcionBases = await screen.findByRole('option', { name: 'Bases de Datos' })
  fireEvent.click(opcionBases)

  await waitFor(() => {
    expect(screen.getAllByText('Bases de Datos').length).toBeGreaterThan(0)
    expect(screen.getByText('Prof. Gómez')).toBeDefined()

    expect(screen.queryByText('Programación Orientada a Objetos')).toBeNull()
  })
})

test('filtra los turnos correctamente al seleccionar una fecha', async () => {
  const user = userEvent.setup()
  mockUseTurnos.mockReturnValue({ turnos: turnosDePrueba, isPending: false })
  render(<AlumnoTurnos />)

  const btnFecha = screen.getByRole('button', { name: /seleccionar fecha/i })
  await user.click(btnFecha)

  const dias15 = await screen.findAllByText('15')

  await user.click(dias15[0])

  await waitFor(() => {
    expect(screen.getByText('Programación Orientada a Objetos')).toBeDefined()
    expect(screen.getByText('Prof. Rodríguez')).toBeDefined()

    expect(screen.queryByText('Bases de Datos')).toBeNull()
  })
})
