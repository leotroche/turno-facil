import type { Tables, TablesUpdate } from '@/lib/supabase/database.types'

// ------------------------------------------------------------

export type Perfil = Tables<'perfiles'>

export type TurnoRow = Tables<'turnos'>
export type TurnoRowUpdate = TablesUpdate<'turnos'>

// ------------------------------------------------------------

export type Docente = {
  id: string
  nombre: string | null
  legajo: string | null
  rol: string
}

export type Turno = {
  id: string
  materia: string
  tipo: string
  descripcion: string | null
  fecha: string
  hora_inicio: string
  hora_fin: string
  ubicacion: string
  cupo_maximo: number
  estado: string
  creado_en: string

  docente: Docente
  cantidad_reservas: number
}
