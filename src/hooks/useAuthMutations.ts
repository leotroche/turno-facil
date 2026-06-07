import { useMutation } from '@tanstack/react-query'

import { register } from '@/services/auth.service'

export function useAuthMutations() {
  const registar = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      register({ email, password }),
  })

  return { registar }
}
