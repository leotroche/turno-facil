import { Button } from './components/ui/button'

export function App() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">Turno Fácil</h1>
        <Button onClick={() => console.log('Turno solicitado')}>Sacar turno</Button>
      </div>
    </div>
  )
}
