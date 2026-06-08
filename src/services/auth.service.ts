import { supabase } from '@/lib/supabase/client'
import type { LoginFormValues, RegisterFormValues } from '@/schemas/user-form-schema'

export async function register({ nombre, email, password, legajo }: RegisterFormValues) {
  // 1. Verificamos legajo
  const { data: usuarioExistente, error: usuarioExistenteError } = await supabase
    .from('perfiles')
    .select('id')
    .eq('legajo', legajo)
    .maybeSingle()

  if (usuarioExistenteError) {
    throw usuarioExistenteError
  }

  if (usuarioExistente) {
    throw new Error('El legajo ya está registrado')
  }

  // 2. Crear usuario auth
  const { data: usuarioCreado, error: usuarioCreadoError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (usuarioCreadoError) {
    throw usuarioCreadoError
  }

  const userId = usuarioCreado.user?.id

  if (!userId) {
    throw new Error('No se pudo obtener el usuario creado')
  }

  // 3. Completar perfil creado por trigger
  const { error: perfilError } = await supabase
    .from('perfiles')
    .update({ nombre, legajo })
    .eq('id', userId)

  if (perfilError) {
    // protección final por UNIQUE(legajo)
    if (perfilError.code === '23505') {
      throw new Error('El legajo ya está registrado')
    }

    throw perfilError
  }

  return usuarioCreado
}

// ------------------------------------------------------------------------------------------

export async function login({ email, password }: LoginFormValues) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw error
  }

  return data
}
