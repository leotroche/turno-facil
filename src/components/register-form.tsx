import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { type RegisterFormValues, registerSchema } from '@/schemas/user-form-schema'
import { register } from '@/services/auth.service'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      legajo: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data)
      toast.success('Usuario registrado exitosamente')
      navigate('/login')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al registrar usuario')
    }
  }

  return (
    <div className={cn('flex w-100 flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para crear tu cuenta</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input {...form.register('nombre')} />
                <FieldError>{form.formState.errors.nombre?.message}</FieldError>
              </Field>

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
                <FieldLabel>Legajo</FieldLabel>
                <Input {...form.register('legajo')} />
                <FieldError>{form.formState.errors.legajo?.message}</FieldError>
              </Field>

              <Field>
                <Button type="submit">Crea tu cuenta</Button>
                <FieldDescription className="text-center">
                  Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
