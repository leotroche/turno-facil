import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useTurnosMutations } from '@/hooks/useTurnosMutations'

const estadoInicial = {
  materia: '',
  tipo: '',
  descripcion: '',
  docente: '',
  ubicacion: '',
  fecha: '',
  hora_inicio: '',
  hora_fin: '',
  cupo_maximo: 1,
}

export function TurnoForm() {
  const navigate = useNavigate()
  const { crear } = useTurnosMutations()
  const [formData, setFormData] = useState(estadoInicial)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const hoy = new Date().toISOString().split('T')[0]
    if (formData.fecha < hoy) return setError('La fecha no puede estar en el pasado.')
    if (formData.hora_fin <= formData.hora_inicio)
      return setError('La hora de fin debe ser posterior a la hora de inicio.')
    if (formData.cupo_maximo <= 0) return setError('El cupo máximo debe ser mayor a 0.')

    crear.mutate(
      { ...formData, cupo_maximo: Number(formData.cupo_maximo), estado: 'disponible' },
      {
        onSuccess: () => navigate('/turnos'),
        onError: (err) => {
          setError('Ocurrió un error al crear el turno. Intenta de nuevo.')
          console.error(err)
        },
      },
    )
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Crear Nuevo Turno</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="materia">Materia</FieldLabel>
              <Input
                id="materia"
                name="materia"
                value={formData.materia}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tipo">Tipo</FieldLabel>
              <Input
                id="tipo"
                name="tipo"
                placeholder="Consulta TP, Revisión de Parcial..."
                value={formData.tipo}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="docente">Docente</FieldLabel>
              <Input
                id="docente"
                name="docente"
                value={formData.docente}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="ubicacion">Ubicación</FieldLabel>
              <Input
                id="ubicacion"
                name="ubicacion"
                placeholder="Aula 205, Meet Online..."
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="fecha">Fecha</FieldLabel>
              <Input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="cupo_maximo">Cupo Máximo</FieldLabel>
              <Input
                type="number"
                id="cupo_maximo"
                name="cupo_maximo"
                min="1"
                value={formData.cupo_maximo}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="hora_inicio">Hora de inicio</FieldLabel>
              <Input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={formData.hora_inicio}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="hora_fin">Hora de fin</FieldLabel>
              <Input
                type="time"
                id="hora_fin"
                name="hora_fin"
                value={formData.hora_fin}
                onChange={handleChange}
                required
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="descripcion">Descripción (opcional)</FieldLabel>
            <Input
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Field>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/turnos')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={crear.isPending}>
            {crear.isPending ? 'Creando...' : 'Crear Turno'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
