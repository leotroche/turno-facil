import { CalendarX } from 'lucide-react'

export function EmptyState({ message = 'No hay datos' }) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
      <CalendarX className="size-24" />
      <p className="text-2xl">{message}</p>
    </div>
  )
}
