import { createContext, useContext, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'
import type { LoginFormValues, RegisterFormValues } from '@/schemas/user-form-schema'

type Perfil = Tables<'perfiles'>

type AuthContextType = {
  user: Perfil | null
  loading: boolean
  isAuthenticated: boolean
  login: (data: LoginFormValues) => Promise<void>
  register: (data: RegisterFormValues) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Perfil | null>(null)
  const [loading, setLoading] = useState(true)

  // --------------------------------------------------
  // CARGAR PERFIL
  // --------------------------------------------------

  const loadUser = async () => {
    const { data: auth } = await supabase.auth.getUser()

    if (!auth.user) {
      setUser(null)
      setLoading(false)
      return
    }

    const { data } = await supabase.from('perfiles').select('*').eq('id', auth.user.id).single()

    setUser(data)
    setLoading(false)
  }

  useEffect(() => {
    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const login = async ({ email, password }: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    await loadUser()
  }

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------

  const register = async ({ nombre, email, password, legajo }: RegisterFormValues) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre, legajo } },
    })

    if (error) throw error

    await loadUser()
  }

  // --------------------------------------------------

  const isAuthenticated = !!user

  // --------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// --------------------------------------------------

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }

  return context
}
