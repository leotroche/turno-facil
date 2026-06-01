import { supabase } from '@/lib/supabase/client'

export interface Credenciales {
  email: string
  password: string
}

export async function registrarUsuario({ email, password }: Credenciales) {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) throw error
  return data
}
