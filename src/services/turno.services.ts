import { supabase } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

// ------------------------------------------------------------

export async function obtenerTurnos() {
  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .order('nombre_cliente', { ascending: true })
  if (error) throw error
  return data
}

// ------------------------------------------------------------

export async function obtenerTurnoPorId(id: string) {
  const { data, error } = await supabase.from('turnos').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

// ------------------------------------------------------------

export async function actualizarTurno(
  id: string,
  updates: Partial<{ estado: Tables<'turnos'>['estado'] }>,
) {
  const { error } = await supabase.from('turnos').update(updates).eq('id', id)
  if (error) throw error
}

// ------------------------------------------------------------

export async function eliminarTurno(id: string) {
  const { error } = await supabase.from('turnos').delete().eq('id', id)
  if (error) throw error
}
