import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface FiltroFechaProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

export function FiltroFecha({ value, onChange }: FiltroFechaProps) {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-60 justify-start text-left">
          <CalendarIcon className={cn(value ? 'text-foreground' : 'text-muted-foreground')} />

          <span className={cn(value ? 'text-foreground' : 'text-muted-foreground')}>
            {value ? format(value, 'dd/MM/yyyy') : 'Seleccionar fecha'}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} disabled={{ before: hoy }} />
      </PopoverContent>
    </Popover>
  )
}
