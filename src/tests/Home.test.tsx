import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { HomePage } from '@/pages/home'

test('debe mostrar el título y disparar la acción al hacer clic en el botón', () => {
  // 1. Espiamos la consola para ver si el mensaje se imprime
  const consoleSpy = vi.spyOn(console, 'log')

  // 2. Renderizamos el componente
  render(<HomePage />)

  // 3. Verificamos que el título exista en la pantalla
  const titulo = screen.getByText(/turno fácil web/i)
  expect(titulo).toBeDefined()

  // 4. Buscamos el botón por su texto y simulamos el clic
  const boton = screen.getByRole('button', { name: /sacar turno/i })
  fireEvent.click(boton)

  // 5. Verificamos que el console.log se haya ejecutado con el texto exacto
  expect(consoleSpy).toHaveBeenCalledWith('Turno solicitado')

  // Limpiamos el espía
  consoleSpy.mockRestore()
})
