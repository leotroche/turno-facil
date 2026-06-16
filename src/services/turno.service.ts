import { supabase } from '@/lib/supabase/client'
import type { ReservaFormValues } from '@/schemas/reserva-form-schema'
import type { TurnoFormValues } from '@/schemas/turno-form-schema'
import type { Turno, TurnoRow, TurnoRowUpdate } from '@/types/types'

// ------------------------------------------------------------
// SERVICIOS PARA TURNOS
// ------------------------------------------------------------

export async function obtenerTurnos(): Promise<Turno[]> {
  const { data, error } = await supabase
    .from('turnos')
    .select(`
      *,
      docente:perfiles!turnos_docente_id_fkey (
        id,
        nombre,
        legajo,
        rol
      ),
      reservas(id)
    `)
    .order('fecha', { ascending: true })

  if (error) throw error

  return data.map(({ reservas, docente, docente_id: _, ...turno }) => ({
    ...turno,
    docente: docente,
    cantidad_reservas: reservas.length,
  }))
}

// ------------------------------------------------------------

export async function obtenerTurnoPorId(id: string): Promise<Turno> {
  const { data, error } = await supabase
    .from('turnos')
    .select(`
      *,
      docente:perfiles!turnos_docente_id_fkey (
        id,
        nombre,
        legajo,
        rol
      ),
      reservas(id)
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  return {
    ...data,
    docente: data.docente,
    cantidad_reservas: data.reservas.length,
  }
}

// ------------------------------------------------------------

export async function crearTurno(nuevoTurno: TurnoFormValues): Promise<TurnoRow> {
  const { data, error: authError } = await supabase.auth.getUser()

  if (authError || !data?.user) throw new Error('No autenticado')

  const userId = data.user.id

  const { data: turno, error } = await supabase
    .from('turnos')
    .insert({ ...nuevoTurno, docente_id: userId })
    .select()
    .single()

  if (error) throw error
  return turno
}

// ------------------------------------------------------------

export async function actualizarTurno(id: string, updates: TurnoRowUpdate): Promise<TurnoRow> {
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
// SERVICIOS PARA RESERVAS
// ------------------------------------------------------------

export async function crearReserva(reserva: ReservaFormValues): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    throw new Error('No autenticado')
  }

  const { error } = await supabase.from('reservas').insert({
    turno_id: reserva.turno_id,
    alumno_id: authData.user.id,
  })

  if (error) throw error
}
// ------------------------------------------------------------

export async function obtenerMisTurnos(): Promise<Turno[]> {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    throw new Error('No autenticado')
  }

  const userId = authData.user.id

  const { data, error } = await supabase
    .from('reservas')
    .select(`
      turno:turnos (
        *,
        docente:perfiles!turnos_docente_id_fkey (
          id,
          nombre,
          legajo,
          rol
        ),
        reservas(id)
      )
    `)
    .eq('alumno_id', userId)

  if (error) throw error

  return data.map(({ turno }: any) => ({
    ...turno,
    docente: turno.docente,
    cantidad_reservas: turno.reservas.length,
  }))
}

// ------------------------------------------------------------

export async function cancelarReserva(turnoId: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    throw new Error('No autenticado')
  }

  const userId = authData.user.id

  const { error } = await supabase
    .from('reservas')
    .delete()
    .eq('turno_id', turnoId)
    .eq('alumno_id', userId)

  if (error) throw error
}
