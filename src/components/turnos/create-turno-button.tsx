import { CalendarPlus } from 'lucide-react'

import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type CreateTurnoButtonProps = {
  onClick: () => void
}

export function CreateTurnoButton({ onClick }: CreateTurnoButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onClick} className="fixed right-8 bottom-8 size-16 rounded-full">
          <CalendarPlus className="size-8" />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Crear nuevo turno</TooltipContent>
    </Tooltip>
  )
}
