import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth'
import { cn } from '@/lib/utils'
import { type RegisterFormValues, registerSchema } from '@/schemas/user-form-schema'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { register } = useAuth()

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al registrar usuario')
    }
  }

  const { isSubmitting } = form.formState

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
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
                <Input {...form.register('nombre')} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.nombre?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...form.register('email')} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Contraseña</FieldLabel>
                <Input {...form.register('password')} type="password" disabled={isSubmitting} />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Legajo</FieldLabel>
                <Input {...form.register('legajo')} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.legajo?.message}</FieldError>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Creando cuenta...' : 'Crea tu cuenta'}
                </Button>

                <FieldDescription className="text-center">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
