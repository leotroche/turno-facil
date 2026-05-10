import { supabase } from '@/lib/supabase/client'

interface SignInData {
  email: string
  password: string
}

export async function register({ email, password }: SignInData) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}
