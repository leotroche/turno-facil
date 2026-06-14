import { Input } from '../ui/input'

interface FiltroProfesorProps {
  value: string
  onChange: (value: string) => void
}

export function FiltroProfesor({ value, onChange }: FiltroProfesorProps) {
  return (
    <Input
      placeholder="Profesor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-60"
    />
  )
}
