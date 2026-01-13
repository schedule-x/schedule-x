import { Signal } from '@preact/signals'
import { ColorDefinition } from '../../interfaces/calendar/calendar-config'

export interface Resource {
  label?: string
  labelHTML?: string
  id: string
  colorName?: string
  lightColors?: ColorDefinition
  darkColors?: ColorDefinition
  resources?: Resource[] // Only used for horizontal resource view
  isOpen?: Signal<boolean> // Only used for horizontal resource view
}
