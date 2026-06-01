import { useMutation } from '@tanstack/react-query'

import { registrarUsuario } from '@/services/auth.service'

export function useAuthMutations() {
  const registar = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registrarUsuario({ email, password }),
  })

  return { registar }
}
