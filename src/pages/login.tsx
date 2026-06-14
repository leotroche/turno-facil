import { LoginForm } from '@/components/login-form'

export function LoginPage() {
  return (
    <div className="grid h-[80dvh] w-full place-items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center gap-4">
          <img src="/favicon.svg" alt="TurnoFácil" className="h-16 w-16" />
          <h1 className="text-4xl font-semibold tracking-tight">Turno Fácil</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
