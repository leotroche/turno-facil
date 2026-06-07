'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { RegisterFormValues } from '@/schemas/user-form-schema'
import { register } from '@/services/auth.service'

type Usuario = {
  creado_en: string
  id: string
  legajo: string | null
  nombre: string | null
  rol: string
} | null

type AuthContextType = {
  usuario: Usuario
  loading: boolean

  registrar: (data: RegisterFormValues) => Promise<void>
  login: (email: string, password: string) => Promise<void>

  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario>(null)
  const [loading, setLoading] = useState(true)

  const cargarPerfil = async (userId: string) => {
    const { data } = await supabase.from('perfiles').select('*').eq('id', userId).single()
    setUsuario(data)
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    setUsuario(null)
  }

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        await cargarPerfil(session.user.id)
      }

      setLoading(false)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        await cargarPerfil(session.user.id)
      } else {
        setUsuario(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        registrar: register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
