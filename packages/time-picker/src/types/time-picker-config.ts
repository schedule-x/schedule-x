import { Signal } from '@preact/signals'
import { TimePickerPlacement } from './placement'
import { TimePickerAppContext } from './time-picker-app.context'

export type TimePickerConfigExternal = {
  dark?: boolean
  placement?: TimePickerPlacement
  initialValue?: string
  onChange?: (value: string) => void
  onEscapeKeyDown?: ($app: TimePickerAppContext) => void
  teleportTo?: HTMLElement | null
  label?: string | null
  name?: string
  is12Hour?: boolean
}

export type TimePickerConfig = Omit<
  {
    [p in keyof TimePickerConfigExternal]-?: Signal<TimePickerConfigExternal[p]>
  },
  'initialValue' | 'onChange'
>
