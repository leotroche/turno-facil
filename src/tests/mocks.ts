import type { Turno } from '@/types/types'

export const mockTurno: Turno = {
  id: 't-123',
  materia: 'Programación Orientada a Objetos',
  tipo: 'Laboratorio',
  descripcion: 'Revisión de TP',
  fecha: '2026-06-15',
  hora_inicio: '14:00',
  hora_fin: '16:00',
  ubicacion: 'Laboratorio 3',
  cupo_maximo: 20,
  estado: 'disponible',
  creado_en: new Date().toISOString(),
  docente: {
    id: 'd-1',
    nombre: 'Prof. Rodríguez',
    legajo: '12345',
    rol: 'docente',
  },
  cantidad_reservas: 5,
}
