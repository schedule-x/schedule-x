import { Signal } from '@preact/signals'
import { TimePickerPlacement } from './placement'

export type TimePickerConfigExternal = {
  dark?: boolean
  placement?: TimePickerPlacement
  initialValue?: string
}

export type TimePickerConfig = Omit<
  {
    [p in keyof TimePickerConfigExternal]-?: Signal<TimePickerConfigExternal[p]>
  },
  'initialValue'
>
