import { Spinner } from '@/components/ui/spinner'

export function LoadingState({ message = 'Cargando...' }) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
      <Spinner className="size-24" />
      <p className="text-2xl">{message}</p>
    </div>
  )
}
