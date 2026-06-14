import { NUCLEO_BASICO, NUCLEO_AVANZADO, NUCLEO_INICIAL } from '@/constants/materias'

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '../ui/select'

interface FiltroMateriaProps {
  value: string
  onValueChange: (value: string) => void
}

export function FiltroMateria({ value, onValueChange }: FiltroMateriaProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-100">
        <SelectValue placeholder="Todas las materias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="__all__"
          className="data-[state=checked]:bg-accent px-4 py-2 data-[state=checked]:font-medium"
        >
          Todas las materias
        </SelectItem>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>Nucleo Inicial</SelectLabel>

          {NUCLEO_INICIAL.map((materia) => (
            <SelectItem
              key={materia}
              value={materia}
              className="data-[state=checked]:bg-accent px-4 py-2 data-[state=checked]:font-medium"
            >
              {materia}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Nucleo Básico</SelectLabel>

          {NUCLEO_BASICO.map((materia) => (
            <SelectItem
              key={materia}
              value={materia}
              className="data-[state=checked]:bg-accent px-4 py-2 data-[state=checked]:font-medium"
            >
              {materia}
            </SelectItem>
          ))}
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>Nucleo Avanzado</SelectLabel>

          {NUCLEO_AVANZADO.map((materia) => (
            <SelectItem
              key={materia}
              value={materia}
              className="data-[state=checked]:bg-accent px-4 py-2 data-[state=checked]:font-medium"
            >
              {materia}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
