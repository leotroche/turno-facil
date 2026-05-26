import { supabase } from '@/lib/supabase/client'
import type { TablesUpdate } from '@/lib/supabase/database.types'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import type { Turno, TurnoConCantidadReservas } from '@/types/types'

// ------------------------------------------------------------

export async function obtenerTurnos(): Promise<TurnoConCantidadReservas[]> {
  const { data, error } = await supabase
    .from('turnos')
    .select('*, reservas(id)')
    .order('fecha', { ascending: true })

  if (error) throw error

  return data.map((turno) => ({
    ...turno,
    cantidad_reservas: turno.reservas.length,
  }))
}

// ------------------------------------------------------------

export async function obtenerTurnoPorId(id: string): Promise<Turno> {
  const { data, error } = await supabase.from('turnos').select('*').eq('id', id).single()

  if (error) throw error
  return data
}

// ------------------------------------------------------------

export async function crearTurno(nuevoTurno: TurnoFormValues): Promise<Turno> {
  const { data, error } = await supabase.from('turnos').insert([nuevoTurno]).select().single()

  if (error) throw error
  return data
}

// ------------------------------------------------------------

export async function actualizarTurno(id: string, updates: TablesUpdate<'turnos'>): Promise<Turno> {
  const { data, error } = await supabase
    .from('turnos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// ------------------------------------------------------------

export async function eliminarTurno(id: string): Promise<void> {
  const { error } = await supabase.from('turnos').delete().eq('id', id)

  if (error) throw error
}

// ------------------------------------------------------------

export async function crearReserva(reserva: {
  turno_id: string
  alumno: string
  legajo: string
}): Promise<void> {
  const { error } = await supabase.from('reservas').insert([reserva])

  if (error) throw error
}
