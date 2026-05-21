import { TurnoForm } from '@/components/turno-form'

export default function CrearTurnoPage() {
  return (
    <div className="w-full px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Administración de Turnos</h1>
        <p className="text-muted-foreground mt-2">
          Completa los datos para habilitar un nuevo espacio de consulta académica.
        </p>
      </div>

      <TurnoForm />
    </div>
  )
}
