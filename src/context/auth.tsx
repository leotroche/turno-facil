// import { createContext, useContext, useEffect, useState } from 'react'

// import { supabase } from '@/lib/supabase/client'
// import type { Tables } from '@/lib/supabase/database.types'

// type Perfil = Tables<'perfiles'>

// type AuthContextType = {
//   user: Perfil | null
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// })

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<Perfil | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadUser = async () => {
//       const { data: auth } = await supabase.auth.getUser()

//       if (!auth.user) {
//         setUser(null)
//         setLoading(false)
//         return
//       }

//       const { data } = await supabase.from('perfiles').select('*').eq('id', auth.user.id).single()

//       setUser(data)
//       setLoading(false)
//     }

//     loadUser()
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
import { createContext, useContext, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'
import type { LoginFormValues, RegisterFormValues } from '@/schemas/user-form-schema'

type Perfil = Tables<'perfiles'>

type AuthContextType = {
  user: Perfil | null
  loading: boolean
  login: (data: LoginFormValues) => Promise<void>
  register: (data: RegisterFormValues) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
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
    // 1. verificar legajo
    const { data: existente, error: existenteError } = await supabase
      .from('perfiles')
      .select('id')
      .eq('legajo', legajo)
      .maybeSingle()

    if (existenteError) throw existenteError

    if (existente) {
      throw new Error('El legajo ya está registrado')
    }

    // 2. crear auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    const userId = data.user?.id

    if (!userId) {
      throw new Error('No se pudo obtener el usuario creado')
    }

    // 3. completar perfil
    const { error: perfilError } = await supabase
      .from('perfiles')
      .update({ nombre, legajo })
      .eq('id', userId)

    if (perfilError) {
      if (perfilError.code === '23505') {
        throw new Error('El legajo ya está registrado')
      }
      throw perfilError
    }

    await loadUser()
  }

  // --------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
