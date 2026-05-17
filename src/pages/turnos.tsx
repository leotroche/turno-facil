'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useMutationTurnos } from '@/hooks/useMutationTurnos'
import { useTurnos } from '@/hooks/useTurnos'

function estadoBadge(estado: string | null) {
  if (estado === 'confirmado') return <Badge>Confirmado</Badge>
  if (estado === 'cancelado') return <Badge variant="destructive">Cancelado</Badge>
  return <Badge variant="secondary">Pendiente</Badge>
}

export default function Turnos() {
  const { data, isLoading } = useTurnos()
  const { eliminar, actualizar } = useMutationTurnos()

  if (isLoading) return <p className="p-4">Cargando turnos...</p>

  if (!data || data.length === 0) return <p className="p-4">No hay turnos disponibles.</p>

  return (
    <>
      <h2 className="text-6xl">Turnos</h2>

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((t) => (
          <Card key={t.id} className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.nombre_cliente}</h3>
              {estadoBadge(t.estado)}
            </div>

            <p className="text-muted-foreground text-sm">{t.servicio}</p>

            <div className="text-sm">
              📅 {t.fecha} <br />⏰ {t.hora}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => actualizar.mutate({ id: t.id, updates: { estado: 'confirmado' } })}
              >
                Confirmar
              </Button>

              <Button variant="destructive" size="sm" onClick={() => eliminar.mutate(t.id)}>
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
