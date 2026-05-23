import type { Tables } from '@/lib/supabase/database.types'

export type Turno = Tables<'turnos'>

export type TurnoConCantidadReservas = Turno & {
  cantidad_reservas: number
}
