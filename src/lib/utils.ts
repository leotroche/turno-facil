import { clsx, type ClassValue } from 'clsx'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

// ------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ------------------------------------------------------------

export function formatFecha(fecha: string) {
  return format(parseISO(fecha), "EEEE, d 'de' MMMM", { locale: es })
}

// ------------------------------------------------------------

export function formatHora(hora: string) {
  return hora.slice(0, 5)
}
