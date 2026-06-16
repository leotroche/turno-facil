import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'

import { ReservaDialog } from '@/components/turnos/reserva-dialog'

import { mockTurno } from './mocks'

const mockMutate = vi.fn()

vi.mock('@/hooks/useTurnosMutations', () => ({
  useTurnosMutations: () => ({
    reservar: {
      mutate: mockMutate,
      isPending: false,
    },
  }),
}))

vi.mock('@/context/auth', () => ({
  useAuth: () => ({
    user: {
      id: 'u-123',
      nombre: 'Marcos Senesi',
    },
  }),
}))

beforeEach(() => {
  mockMutate.mockClear()
})

test('llama a la mutación reservar con los datos correctos', async () => {
  render(<ReservaDialog turno={mockTurno} open={true} onOpenChange={vi.fn()} />)

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirmar reserva/i,
    }),
  )

  await waitFor(() => {
    expect(mockMutate).toHaveBeenCalledTimes(1)

    expect(mockMutate).toHaveBeenCalledWith(
      {
        turno_id: mockTurno.id,
        alumno_id: 'u-123',
      },
      expect.any(Object),
    )
  })
})
// import '@testing-library/jest-dom'
// import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// import { beforeEach, expect, test, vi } from 'vitest'

// import { ReservaDialog } from '@/components/turnos/reserva-dialog'

// import { mockTurno } from './mocks'

// const mockMutate = vi.fn()

// vi.mock('@/hooks/useTurnosMutations', () => ({
//   useTurnosMutations: () => ({
//     reservar: {
//       mutate: mockMutate,
//       isPending: false,
//     },
//   }),
// }))

// vi.mock('@/context/auth', () => ({
//   useAuth: () => ({
//     user: {
//       id: 'u-123',
//       nombre: 'Marcos Senesi',
//     },
//   }),
// }))

// beforeEach(() => {
//   mockMutate.mockClear()
// })

// test('llama a la mutación reservar con los datos correctos', async () => {
//   render(
//     <ReservaDialog
//       turno={mockTurno}
//       open={true}
//       onOpenChange={vi.fn()}
//     />,
//   )

//   fireEvent.click(
//     screen.getByRole('button', {
//       name: /confirmar reserva/i,
//     }),
//   )

//   await waitFor(() => {
//     expect(mockMutate).toHaveBeenCalledTimes(1)

//     expect(mockMutate).toHaveBeenCalledWith(
//       {
//         turno_id: mockTurno.id,
//         alumno_id: 'u-123',
//       },
//       expect.any(Object),
//     )
//   })
// })
