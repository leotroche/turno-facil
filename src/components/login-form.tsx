import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { loginSchema, type LoginFormValues } from '@/schemas/user-form-schema'
import { login } from '@/services/auth.service'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)
      toast.success('Usuario iniciado sesión exitosamente')
      navigate('/alumno')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión')
    }
  }

  return (
    <div className={cn('flex w-100 flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Inicia sesión</CardTitle>
          <CardDescription>Ingresa tus datos para iniciar sesión</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...form.register('email')} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Contraseña</FieldLabel>
                <Input {...form.register('password')} type="password" />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
              </Field>

              <Field>
                <Button type="submit">Iniciar sesión</Button>
                <FieldDescription className="text-center">
                  ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
